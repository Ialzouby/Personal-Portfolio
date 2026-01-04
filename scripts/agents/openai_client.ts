// scripts/agents/openai_client.ts
require("dotenv").config();
const { OpenAI } = require("openai");

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prefer a single place to choose model.
// You can set OPENAI_MODEL=gpt-5 (or another) in env.
export const DEFAULT_MODEL: string = process.env.OPENAI_MODEL || "gpt-5";

export function safeParseJson(s: string): any {
  try {
    return JSON.parse(s);
  } catch {
    const cleaned = String(s || "")
      .replace(/```json|```/g, "")
      .replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(cleaned);
  }
}

export function normalize(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokens(s: string): Set<string> {
  const stop = new Set([
    "the","a","an","and","or","of","to","for","with","in","on","how","what","why","when",
    "is","are","vs","using","from","ai","ml","artificial","intelligence",
    "guide","intro","introduction","explained","deep","dive","week","latest","new"
  ]);
  return new Set(normalize(s).split(" ").filter(t => t && !stop.has(t)));
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter(x => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union ? inter / union : 0;
}
