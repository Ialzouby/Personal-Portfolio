// scripts/agents/editor.ts
export {};

const { openai, safeParseJson, DEFAULT_MODEL } = require("./openai_client");

async function chooseWeeklyWinner(opts: { brief: any; recentBuckets: string[] }) {
  const prompt = `
You are an AI editor. Pick ONE weekly story.

We will score each event:
A) News Impact (0–25): impact, credibility, audience size, novelty, momentum
B) SEO Potential (0–20): evergreen query value, explainer depth, authority gap, practical applicability
C) Diversity Penalty (0–6): penalize if category repeats recent buckets

Recent buckets used (most recent last):
${(opts.recentBuckets || []).slice(-8).join(" | ") || "none"}

Diversity penalty guideline:
- same bucket as last post: 2
- bucket appears 2+ times in last 4 posts: 4
- bucket appears 3+ times in last 6 posts: 6
Override rule: if News Impact ≥ 22, set diversity penalty to at most 2.

Return STRICT JSON:
{
  "winner_index": 0,
  "winner_reason": "...",
  "scored": [
    {
      "index": 0,
      "bucket": "Models|Robotics|AI in Healthcare|Edge AI & Hardware|AI Ethics & Policy|Data/Infra|Creative AI",
      "news_impact": 0,
      "seo_potential": 0,
      "diversity_penalty": 0,
      "final_score": 0,
      "notes": "..."
    }
  ]
}

Events:
${JSON.stringify(opts.brief.events, null, 2)}

Rules:
- final_score = news_impact + seo_potential - diversity_penalty
- Choose the highest final_score.
- Be conservative: don't inflate scores.
`;

  const resp = await openai.responses.create({
    model: DEFAULT_MODEL,
    input: prompt,
  });

  const decision = safeParseJson(resp.output_text);

  for (const s of decision.scored || []) {
    if (typeof s.final_score !== "number") {
      s.final_score = (s.news_impact || 0) + (s.seo_potential || 0) - (s.diversity_penalty || 0);
    }
  }

  return decision;
}

module.exports = { chooseWeeklyWinner };
