// scripts/agents/scout.ts
export {};

const { openai, safeParseJson, normalize, DEFAULT_MODEL } = require("./openai_client");
const { AI_NEWS_DOMAINS } = require("./domains");

function isoDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

async function scoutWeeklyNews(opts: {
  usedTopics: string[];
  weekDate?: string;
  maxEvents?: number;
}) {
  const week = opts.weekDate ?? isoDate();
  const maxEvents = opts.maxEvents ?? 12;

  const prompt = `
You are an AI news scout.

Goal: Find the MOST IMPORTANT AI/tech developments from the last 7 days (relative to ${week}).
Use ONLY reputable sources and include links (2–4 per event).

Return ${maxEvents} events, diverse across:
Models, Robotics, AI in Healthcare, Edge AI & Hardware, AI Ethics & Policy, Data/Infra, Creative AI.

Avoid repeating themes similar to these previously used topics:
${opts.usedTopics.slice(-60).join(" | ")}

Return STRICT JSON:
{
  "week": "${week}",
  "events": [
    {
      "event": "factual description (1 sentence)",
      "category": "Models|Robotics|AI in Healthcare|Edge AI & Hardware|AI Ethics & Policy|Data/Infra|Creative AI",
      "why_it_matters": "1–2 sentences with concrete technical/product impact",
      "sources": [
        {"url":"https://...","title":"...","date":"YYYY-MM-DD"}
      ]
    }
  ]
}

Rules:
- 10–15 events if possible, otherwise as many as you can with strong sources.
- Each event must have 2–4 sources.
- Prefer primary sources (official labs, papers) when available.
- No hype. No opinions. No invented facts.
`;

  const resp = await openai.responses.create({
    model: DEFAULT_MODEL,
    tools: [
      {
        type: "web_search",
        filters: { domains: AI_NEWS_DOMAINS },
      },
    ],
    include: ["web_search_call.action.sources"],
    input: prompt,
  });

  const brief = safeParseJson(resp.output_text);

  // Clean up: remove empties + dedupe near-identical event strings
  const seen = new Set<string>();
  brief.events = (brief.events || [])
    .filter((e: any) => e?.event && e?.sources?.length >= 2)
    .filter((e: any) => {
      const key = normalize(e.event);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return brief;
}

module.exports = { scoutWeeklyNews };
