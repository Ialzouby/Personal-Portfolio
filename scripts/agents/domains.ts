// scripts/agents/domains.ts
// Reduced to top 12 domains for faster web_search
const AI_NEWS_DOMAINS: string[] = [
  // Primary AI labs
  "openai.com",
  "anthropic.com",
  "deepmind.google",
  "huggingface.co",
  
  // Research
  "arxiv.org",
  
  // Top tech news (most reliable + fast)
  "techcrunch.com",
  "theverge.com",
  "technologyreview.com",
  "wired.com",
  
  // Business/general
  "reuters.com",
  "bloomberg.com",
  
  // NVIDIA (key for hardware news)
  "blogs.nvidia.com",
];

module.exports = { AI_NEWS_DOMAINS };

export {};
