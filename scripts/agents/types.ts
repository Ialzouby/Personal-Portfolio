// scripts/agents/types.ts

export type Bucket =
  | "Models"
  | "Robotics"
  | "AI in Healthcare"
  | "Edge AI & Hardware"
  | "AI Ethics & Policy"
  | "Data/Infra"
  | "Creative AI";

export type ScoutEvent = {
  event: string; // concise factual description
  category: Bucket;
  why_it_matters: string; // 1–2 sentences, concrete
  sources: { url: string; title?: string; date?: string }[]; // 2–4
};

export type ScoutBrief = {
  week: string; // YYYY-MM-DD
  events: ScoutEvent[]; // 10–15 recommended
};

export type EditorScore = {
  index: number;
  bucket: Bucket;
  news_impact: number;     // 0–25
  seo_potential: number;   // 0–20
  diversity_penalty: number; // 0–6
  final_score: number;     // computed
  notes: string;
};

export type EditorDecision = {
  winner_index: number;
  winner_reason: string;
  scored: EditorScore[];
};

export type AnglePlan = {
  primary_query: string; // focus keyword
  secondary_queries: string[];
  search_intent: "Informational" | "Comparative" | "Transactional";
  recommended_title: string;
  recommended_slug: string; // kebab-case
  outline_h2s: string[];
};

export type MetaPack = {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  jsonLd: any;
};
