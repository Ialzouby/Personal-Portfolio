// scripts/agents/scout.ts
const { openai, safeParseJson, normalize, DEFAULT_MODEL, withTimeout } = require("./openai_client");
const { AI_NEWS_DOMAINS } = require("./domains");

// Scout uses web_search - allow longer timeout and retries
const SCOUT_TIMEOUT_MS = 120_000; // 2 minutes
const SCOUT_MAX_RETRIES = 2;

function isoDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

// Simple delay helper
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scoutWeeklyNews(opts: {
  usedTopics: string[];
  weekDate?: string;
  maxEvents?: number;
}) {
  const week = opts.weekDate ?? isoDate();
  const maxEvents = opts.maxEvents ?? 8;

  // Simplified prompt - shorter = faster
  const prompt = `Find ${maxEvents} important AI/tech news from the past 7 days (as of ${week}).

Categories: Models, Robotics, Healthcare AI, Edge AI, AI Ethics, Data/Infra, Creative AI.

Avoid these topics: ${opts.usedTopics.slice(-20).join(", ")}

Return JSON:
{"week":"${week}","events":[{"event":"description","category":"category","why_it_matters":"impact","sources":[{"url":"...","title":"...","date":"YYYY-MM-DD"}]}]}

Rules: 2-3 sources per event. Factual only. No hype.`;

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= SCOUT_MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`⚠️ Scout retry ${attempt}/${SCOUT_MAX_RETRIES}...`);
        await delay(2000 * attempt); // Exponential backoff: 2s, 4s
      }

      // Use withTimeout wrapper - NO signal parameter in the API call
      const resp = await withTimeout(
        openai.responses.create({
          model: DEFAULT_MODEL,
          tools: [
            {
              type: "web_search",
              filters: { allowed_domains: AI_NEWS_DOMAINS },
            },
          ],
          input: prompt,
        }),
        SCOUT_TIMEOUT_MS,
        "Scout web_search"
      );

      const brief = safeParseJson(resp.output_text);
      return processScoutResults(brief, normalize);
    } catch (err: any) {
      lastError = err;
      if (err.message?.includes('timed out')) {
        console.log(`⚠️ Scout attempt ${attempt + 1} timed out after ${SCOUT_TIMEOUT_MS / 1000}s`);
      } else {
        console.log(`⚠️ Scout attempt ${attempt + 1} failed: ${err.message}`);
      }
    }
  }

  throw lastError || new Error("Scout failed after all retries");
}

function processScoutResults(brief: any, normalize: (s: string) => string) {
  // Clean up: remove empties + dedupe near-identical event strings
  const seen = new Set<string>();
  brief.events = (brief.events || [])
    .filter((e: any) => e?.event && e?.sources?.length >= 1) // Relaxed: allow 1+ sources
    .filter((e: any) => {
      const key = normalize(e.event);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return brief;
}

module.exports = { scoutWeeklyNews };

export {};
