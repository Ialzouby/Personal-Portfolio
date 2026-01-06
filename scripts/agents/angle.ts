// scripts/agents/angle.ts
const { openai, safeParseJson, DEFAULT_MODEL, normalize, withTimeout, OPENAI_TIMEOUT_MS } = require("./openai_client");

async function buildSeoAngle(opts: {
  event: any;
  avoidQueries: string[];
  avoidTitles: string[];
  avoidSlugs: string[];
}) {
  const prompt = `
You are an SEO strategist for an AI explainer blog.

Convert this REAL event into an evergreen Google search target.

Event:
${JSON.stringify(opts.event, null, 2)}

Avoid cannibalization:
AVOID_PRIMARY_QUERIES:
${(opts.avoidQueries || []).slice(-120).join(" | ")}

AVOID_TITLES:
${(opts.avoidTitles || []).slice(-120).join(" | ")}

AVOID_SLUGS:
${(opts.avoidSlugs || []).slice(-120).join(" | ")}

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

  const resp = await withTimeout(
    openai.responses.create({
      model: DEFAULT_MODEL,
      input: prompt,
    }),
    OPENAI_TIMEOUT_MS,
    "Angle"
  );

  const plan = safeParseJson(resp.output_text);

  if (!plan.recommended_slug) {
    plan.recommended_slug = normalize(plan.recommended_title || plan.primary_query).replace(/\s+/g, "-").slice(0, 70);
  }

  return plan;
}

module.exports = { buildSeoAngle };

export {};
