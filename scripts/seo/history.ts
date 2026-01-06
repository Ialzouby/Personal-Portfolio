// scripts/seo/history.ts
const fs = require("fs");
const path = require("path");

const SEO_HISTORY_PATH = path.join(__dirname, "../seo_history.json");

type SeoHistory = {
  primary_queries: string[];
  titles: string[];
  slugs: string[];
  buckets: string[];
};

function readSeoHistory(): SeoHistory {
  try {
    if (!fs.existsSync(SEO_HISTORY_PATH)) {
      return { primary_queries: [], titles: [], slugs: [], buckets: [] };
    }
    const raw = fs.readFileSync(SEO_HISTORY_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      primary_queries: Array.isArray(parsed.primary_queries) ? parsed.primary_queries : [],
      titles: Array.isArray(parsed.titles) ? parsed.titles : [],
      slugs: Array.isArray(parsed.slugs) ? parsed.slugs : [],
      buckets: Array.isArray(parsed.buckets) ? parsed.buckets : [],
    };
  } catch {
    return { primary_queries: [], titles: [], slugs: [], buckets: [] };
  }
}

function writeSeoHistory(next: SeoHistory) {
  fs.writeFileSync(SEO_HISTORY_PATH, JSON.stringify(next, null, 2));
}

function appendSeoHistory(item: { primary_query: string; title: string; slug: string; bucket: string }) {
  const h = readSeoHistory();
  h.primary_queries.push(item.primary_query);
  h.titles.push(item.title);
  h.slugs.push(item.slug);
  h.buckets.push(item.bucket);

  // keep last 200
  h.primary_queries = h.primary_queries.slice(-200);
  h.titles = h.titles.slice(-200);
  h.slugs = h.slugs.slice(-200);
  h.buckets = h.buckets.slice(-200);

  writeSeoHistory(h);
}

module.exports = { readSeoHistory, writeSeoHistory, appendSeoHistory };

export {};
