// scripts/agents/angle.ts
import { openai, safeParseJson, normalize, DEFAULT_MODEL } from "./openai_client";
import type { ScoutEvent, AnglePlan } from "./types";

function slugify(s: string): string {
  return normalize(s).replace(/\s+/g, "-").slice(0, 70);
}

export async function buildSeoAngle(opts: {
  event: ScoutEvent;
  avoidQueries: string[];
  avoidTitles: string[];
  avoidSlugs: string[];
}): Promise<AnglePlan> {
  const prompt = `
You are an SEO strategist for an AI explainer blog.

Convert this REAL event into an evergreen Google search target.

Event:
${JSON.stringify(opts.event, null, 2)}

Avoid cannibalization:
AVOID_PRIMARY_QUERIES:
${opts.avoidQueries.slice(-120).join(" | ")}

AVOID_TITLES:
${opts.avoidTitles.slice(-120).join(" | ")}

AVOID_SLUGS:
${opts.avoidSlugs.slice(-120).join(" | ")}

Return STRICT JSON:
{
  "primary_query": "2–8 word Google query (informational or comparative)",
  "secondary_queries": ["...","...","..."],
  "search_intent": "Informational|Comparative|Transactional",
  "recommended_title": "50–65 chars, includes primary_query naturally, no dates",
  "recommended_slug": "short kebab-case slug (no dates)",
  "outline_h2s": ["6–10 H2 headings"]
}

Rules:
- Title must stay relevant for 12+ months (no 'this week', no dates).
- No hype. No news headline framing.
- Prefer queries with stable long-tail search value.
`;

  const resp = await openai.responses.create({
    model: DEFAULT_MODEL,
    input: prompt,
  });

  const plan = safeParseJson(resp.output_text) as AnglePlan;
  if (!plan.recommended_slug) plan.recommended_slug = slugify(plan.recommended_title || plan.primary_query);
  return plan;
}
