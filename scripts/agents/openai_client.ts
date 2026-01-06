// scripts/agents/openai_client.ts
require("dotenv").config();

const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5-pro";

// Default timeout for OpenAI calls (60 seconds)
const OPENAI_TIMEOUT_MS = 60_000;

// Helper to wrap OpenAI calls with timeout
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = OPENAI_TIMEOUT_MS, label: string = "OpenAI call"): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs / 1000}s`)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

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
  OPENAI_TIMEOUT_MS,
  withTimeout,
  safeParseJson,
  normalize,
  tokens,
  jaccard,
};

export {};
