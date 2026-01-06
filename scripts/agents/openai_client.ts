// scripts/agents/openai_client.ts
require("dotenv").config();

const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5-pros";

function safeParseJson(s: string): any {
  try {
    return JSON.parse(s);
  } catch {
    const cleaned = String(s || "")
      .replace(/```json|```/g, "")
      .replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(cleaned);
  }
}

function normalize(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string): Set<string> {
  const stop = new Set([
    "the","a","an","and","or","of","to","for","with","in","on","how","what","why","when",
    "is","are","vs","using","from","ai","ml","artificial","intelligence",
    "guide","intro","introduction","explained","deep","dive","week","latest","new"
  ]);
  return new Set(normalize(s).split(" ").filter(t => t && !stop.has(t)));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter(x => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union ? inter / union : 0;
}

module.exports = {
  openai,
  DEFAULT_MODEL,
  safeParseJson,
  normalize,
  tokens,
  jaccard,
};

export {};
