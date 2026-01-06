// scripts/seo/cannibalization.ts
const { normalize, tokens, jaccard } = require("../agents/openai_client");

function containsAll(a: Set<string>, b: Set<string>): boolean {
  for (const x of b) if (!a.has(x)) return false;
  return true;
}

function cannibalizationGuard(opts: {
  candidateTitle: string;
  candidateSlug: string;
  primaryQuery: string;
  history: { primary_queries: string[]; titles: string[]; slugs: string[]; buckets: string[] };
  titleSimThreshold?: number;
  querySimThreshold?: number;
}) {
  const titleSimT = opts.titleSimThreshold ?? 0.55;
  const querySimT = opts.querySimThreshold ?? 0.65;

  const qNorm = normalize(opts.primaryQuery);
  const slugNorm = normalize(opts.candidateSlug);
  const titleNorm = normalize(opts.candidateTitle);

  if ((opts.history.primary_queries || []).map(normalize).includes(qNorm)) {
    return { ok: false, reason: `Primary query already used: "${opts.primaryQuery}"` };
  }
  if ((opts.history.slugs || []).map(normalize).includes(slugNorm)) {
    return { ok: false, reason: `Slug already used: "${opts.candidateSlug}"` };
  }
  if ((opts.history.titles || []).map(normalize).includes(titleNorm)) {
    return { ok: false, reason: `Exact title already used.` };
  }

  const qTok = tokens(opts.primaryQuery);
  const tTok = tokens(opts.candidateTitle);

  for (const prevQ of opts.history.primary_queries || []) {
    const prevTok = tokens(prevQ);
    const sim = jaccard(qTok, prevTok);
    if (sim >= querySimT) return { ok: false, reason: `Query too similar to: "${prevQ}" (sim=${sim.toFixed(2)})` };
    if (containsAll(qTok, prevTok) || containsAll(prevTok, qTok)) {
      return { ok: false, reason: `Query overlaps heavily with: "${prevQ}"` };
    }
  }

  for (const prevT of opts.history.titles || []) {
    const sim = jaccard(tTok, tokens(prevT));
    if (sim >= titleSimT) return { ok: false, reason: `Title too similar to: "${prevT}" (sim=${sim.toFixed(2)})` };
  }

  return { ok: true };
}

module.exports = { cannibalizationGuard };

export {};
