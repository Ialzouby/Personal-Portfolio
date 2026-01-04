// scripts/seo/cannibalization.ts
import { normalize, tokens, jaccard } from "../agents/openai_client";
import type { SeoHistory } from "./history";

function containsAll(a: Set<string>, b: Set<string>): boolean {
  for (const x of b) if (!a.has(x)) return false;
  return true;
}

export function cannibalizationGuard(opts: {
  candidateTitle: string;
  candidateSlug: string;
  primaryQuery: string;
  history: SeoHistory;
  titleSimThreshold?: number; // default 0.55
  querySimThreshold?: number; // default 0.65
}): { ok: boolean; reason?: string } {
  const titleSimT = opts.titleSimThreshold ?? 0.55;
  const querySimT = opts.querySimThreshold ?? 0.65;

  const qNorm = normalize(opts.primaryQuery);
  const slugNorm = normalize(opts.candidateSlug);
  const titleNorm = normalize(opts.candidateTitle);

  // exact collisions
  if (opts.history.primary_queries.map(normalize).includes(qNorm)) {
    return { ok: false, reason: `Primary query already used: "${opts.primaryQuery}"` };
  }
  if (opts.history.slugs.map(normalize).includes(slugNorm)) {
    return { ok: false, reason: `Slug already used: "${opts.candidateSlug}"` };
  }
  if (opts.history.titles.map(normalize).includes(titleNorm)) {
    return { ok: false, reason: `Exact title already used.` };
  }

  // similarity collisions
  const qTok = tokens(opts.primaryQuery);
  const tTok = tokens(opts.candidateTitle);

  for (const prevQ of opts.history.primary_queries) {
    const prevTok = tokens(prevQ);
    const sim = jaccard(qTok, prevTok);
    if (sim >= querySimT) return { ok: false, reason: `Query too similar to: "${prevQ}" (sim=${sim.toFixed(2)})` };
    if (containsAll(qTok, prevTok) || containsAll(prevTok, qTok)) {
      return { ok: false, reason: `Query overlaps heavily with: "${prevQ}"` };
    }
  }

  for (const prevT of opts.history.titles) {
    const sim = jaccard(tTok, tokens(prevT));
    if (sim >= titleSimT) return { ok: false, reason: `Title too similar to: "${prevT}" (sim=${sim.toFixed(2)})` };
  }

  return { ok: true };
}
