// CommonJS TypeScript version (works with ts-node without ESM)
// Run: OPENAI_API_KEY=... UNSPLASH_ACCESS_KEY=... npx ts-node scripts/generate_blog.ts

require('dotenv').config();
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const ax = require('axios');
const { XMLParser } = require('fast-xml-parser');

/* =========================
   Types (TS-only)
========================= */
type Section = {
  heading?: string;
  text?: string;
  bullets?: string[];
  quote?: { text: string; author: string };
  videoImage?: string;
  videoId?: string;
};

type ImageCredit = {
  authorName?: string;
  authorUrl?: string;
  source?: 'Unsplash';
  photoUrl?: string;
};

type BlogPost = {
  id?: number;
  slug: string;
  img?: any;
  date: string;
  tag: string;
  title: string;
  author: string;
  content: string;
  sections: Section[];
  imageCredit?: ImageCredit;
};

type UnsplashTag = { title?: string };
type UnsplashPhoto = {
  id: string;
  urls: { raw: string };
  links: { html: string };
  user: { name?: string; links?: { html?: string } };
  description?: string;
  alt_description?: string;
  tags?: UnsplashTag[];
};
type UnsplashSearchResponse = { results: UnsplashPhoto[] };

/* =========================
   Config & Paths
========================= */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const allDataPath = path.join(__dirname, '../public/data/BlogData.ts');
const blogImageDir = path.join(__dirname, '../public/images');
const blogImageVarPrefix = 'aiImage';
const author = 'Issam Alzouby';

// History files
const USED_IMAGES_PATH = path.join(__dirname, 'used_images.json');       // Unsplash IDs we used
const USED_TOPICS_PATH = path.join(__dirname, 'topics_used.json');       // Titles/Tags we used
const BUCKET_HISTORY_PATH = path.join(__dirname, 'bucket_history.json'); // Buckets recently used

// Category buckets (rotated to enforce variety)
const BUCKETS: string[] = [
  'AI in Healthcare',
  'Robotics',
  'AI Ethics & Policy',
  'Creative AI',
  'Data Engineering & Retrieval (RAG)',
  'Edge AI & Hardware',
  'AI for Education',
  'AI for Climate & Science',
  'Business & Productivity',
  'Open-Source & Research'
];

// Feeds to watch
const FEEDS: string[] = [
  'https://openai.com/blog/rss.xml',
  'https://deepmind.google/discover/rss.xml',
  'https://ai.googleblog.com/atom.xml',
  'https://ai.facebook.com/blog/rss/',
  'https://www.anthropic.com/news.xml',
  'https://export.arxiv.org/rss/cs.LG'
];

/* =========================
   Generic Helpers
========================= */
function safeParseJson(s: string): any {
  try {
    return JSON.parse(s);
  } catch {
    const cleaned = s.replace(/```json|```/g, '').replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(cleaned);
  }
}

function getNextId(file: string): number {
  const idMatch = file.match(/id:\s*(\d+),/g);
  const existingIds = idMatch ? idMatch.map((m: string) => parseInt(m.match(/\d+/)![0])) : [];
  return existingIds.length ? Math.max(...existingIds) + 1 : 20;
}

// read/write small arrays safely
function readJsonArraySafe(p: string): string[] {
  try {
    if (!fs.existsSync(p)) return [];
    const raw = fs.readFileSync(p, 'utf-8');
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function writeJsonArraySafe(p: string, arr: string[]): void {
  fs.writeFileSync(p, JSON.stringify(arr, null, 2));
}

// Pull last blog meta from BlogData.ts (lightweight parse)
function getLastBlogMetaFromDataTs(): { title: string; tag: string; content: string } {
  try {
    const file = fs.readFileSync(allDataPath, 'utf-8');
    const titles = [...file.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
    const tags = [...file.matchAll(/tag:\s*"([^"]+)"/g)].map(m => m[1]);
    const contents = [...file.matchAll(/content:\s*"([\s\S]*?)"\s*,/g)].map(m => m[1]);

    return {
      title: titles.length ? titles[titles.length - 1] : '',
      tag: tags.length ? tags[tags.length - 1] : '',
      content: contents.length ? contents[contents.length - 1] : ''
    };
  } catch {
    return { title: '', tag: '', content: '' };
  }
}

// Extract all previous titles/tags from BlogData.ts (for topic history)
function getAllTopicsFromBlogData(): string[] {
  try {
    const file = fs.readFileSync(allDataPath, 'utf-8');
    const titles = [...file.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
    const tags = [...file.matchAll(/tag:\s*"([^"]+)"/g)].map(m => m[1]);
    return [...titles, ...tags].filter(Boolean);
  } catch {
    return [];
  }
}

// Topic normalization & similarity
function normalizeTopic(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function topicTokens(s: string): Set<string> {
  const stop = new Set([
    'the','a','an','and','or','of','to','for','with','in','on','how','what','why','when','is','are','vs','using','from',
    'ai','ml','artificial','intelligence','week','guide','introduction','intro','explained','deep','dive'
  ]);
  return new Set(
    normalizeTopic(s)
      .split(' ')
      .filter(t => t && !stop.has(t))
  );
}
function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = new Set([...a].filter(x => b.has(x)));
  const union = new Set([...a, ...b]);
  return union.size ? inter.size / union.size : 0;
}

// Simple topic keyword extraction (to hard-block repeats)
function extractTopicHints(s: string | undefined): string[] {
  if (!s) return [];
  const lower = s.toLowerCase();
  const topics = [
    'diffusion','agents','rag','transformers','quantization','evals','safety','multimodal',
    'inference','rlhf','video generation','sora','search','fine-tuning','distillation'
  ];
  return topics.filter(t => lower.includes(t));
}

// Used-topic tracking
function getUsedTopics(): string[] {
  const fromFile = readJsonArraySafe(USED_TOPICS_PATH);
  const fromBlogs = getAllTopicsFromBlogData().map(normalizeTopic);
  return Array.from(new Set([...fromFile, ...fromBlogs]));
}
function saveUsedTopic(topic: string): void {
  const current = readJsonArraySafe(USED_TOPICS_PATH);
  const norm = normalizeTopic(topic);
  if (!current.map(normalizeTopic).includes(norm)) {
    current.push(topic);
    writeJsonArraySafe(USED_TOPICS_PATH, current);
  }
}
function isTopicTooSimilar(candidate: string, usedTopics: string[], threshold = 0.5): boolean {
  const candTokens = topicTokens(candidate);
  for (const t of usedTopics) {
    const sim = jaccard(candTokens, topicTokens(t));
    if (sim >= threshold) return true;
  }
  const hints = extractTopicHints(candidate);
  for (const used of usedTopics) {
    for (const h of hints) {
      if (used.includes(h)) return true;
    }
  }
  return false;
}

// Bucket rotation
function getBucketHistory(): string[] {
  return readJsonArraySafe(BUCKET_HISTORY_PATH);
}
function saveBucketChoice(bucket: string): void {
  const hist = getBucketHistory();
  hist.push(bucket);
  writeJsonArraySafe(BUCKET_HISTORY_PATH, hist.slice(-12)); // keep last 12
}
function getNextBucket(): string {
  const hist = getBucketHistory();
  const recent = new Set(hist.slice(-5).map(normalizeTopic));
  const available = BUCKETS.filter(b => !recent.has(normalizeTopic(b)));
  const choice = available.length ? available[0] : BUCKETS[(hist.length) % BUCKETS.length];
  saveBucketChoice(choice);
  return choice;
}

// News feed (one item)
async function getLatestTopicFromFeeds(): Promise<{ title: string; url: string; summary?: string } | null> {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  for (const feed of FEEDS) {
    try {
      const r = await ax.get(feed, { timeout: 12000 });
      const xml = parser.parse(r.data);
      const entry =
        xml?.feed?.entry?.[0] ||
        xml?.rss?.channel?.item?.[0] ||
        xml?.channel?.item?.[0];

      if (!entry) continue;

      let title = entry.title?._text || entry.title || '';
      let url =
        (Array.isArray(entry.link) ? entry.link?.[0]?.['@_href'] : entry.link?.['@_href']) ||
        entry.link ||
        entry.id ||
        entry.guid ||
        '';
      let summary =
        entry.summary?._text || entry.summary ||
        entry.description?._text || entry.description || '';

      title = String(title || '').trim();
      url = String(url || '').trim();
      summary = String(summary || '').trim();

      if (title && url) return { title, url, summary };
    } catch {
      // skip to next feed
    }
  }
  return null;
}

function getRecentTitlesForPrompt(n = 8): string[] {
  return getAllTopicsFromBlogData().slice(-n);
}

/* =========================
   Unsplash: topic-aware selection (no AI look, never reuse)
========================= */
const AI_BLACKLIST = [
  'ai','artificial intelligence','artificial-intelligence','neural','neuron','brain',
  'robot','android','cyborg','humanoid','face','portrait','golem','doll','uncanny','gore'
];

function looksLikeAI(photo: UnsplashPhoto): boolean {
  const hay = [
    photo.description || '',
    photo.alt_description || '',
    ...(photo.tags || []).map(t => t.title || '')
  ].join(' ').toLowerCase();
  return AI_BLACKLIST.some(b => hay.includes(b));
}

// Gentle negatives to keep it clean, plus topic positives we’ll add per-query
function buildUnsplashQuery(base: string, positives: string[] = []): string {
  const negatives = [
    '-robot','-face','-portrait','-humanoid',
    '-creepy','-scary','-dark','-gore','-uncanny','-doll',
    '-ai','-"artificial intelligence"','-neural','-brain'
  ];
  const safe = ['technology','computer','clean','minimal','circuitry','modern'];
  return [base, ...positives, ...safe, ...negatives].join(' ');
}

// From blog to tokens
function topicTokensFromBlog(blog: { title?: string; tag?: string; sections?: any[] }): Set<string> {
  const stop = new Set([
    'the','a','an','and','or','of','to','for','with','in','on','how','what','why','when','is','are','vs','using','from',
    'ai','ml','artificial','intelligence','week','guide','introduction','intro','explained','deep','dive'
  ]);
  const text = [
    blog.title || '',
    blog.tag || '',
    ...(blog.sections || []).map((s: any) => [s.heading || '', s.text || '', ...(s.bullets || [])].join(' ')),
  ].join(' ');
  return new Set(
    normalizeTopic(text).split(' ').filter(t => t && !stop.has(t))
  );
}

// Map topic/bucket → concrete visual concepts (queries). Try in order.
function buildTopicQueries(blog: { title?: string; tag?: string; sections?: any[] }, bucket: string): string[] {
  const t = (blog.title || '').toLowerCase();
  const tag = (blog.tag || '').toLowerCase();
  const b = (bucket || '').toLowerCase();

  const choose = (q: string) => q;

  // Bucket-first mapping
  if (b.includes('healthcare')) return [
    choose('hospital technology'),
    choose('medical devices closeup'),
    choose('health data dashboard'),
    choose('lab equipment technology')
  ];
  if (b.includes('robotics')) return [
    choose('industrial machinery detail'),
    choose('motors gears closeup'),
    choose('mechatronics circuit board')
  ];
  if (b.includes('ethics') || b.includes('policy')) return [
    choose('cybersecurity abstract'),
    choose('privacy data lock'),
    choose('governance technology')
  ];
  if (b.includes('creative')) return [
    choose('abstract technology minimal'),
    choose('light trails technology'),
    choose('colorful code screen')
  ];
  if (b.includes('retrieval') || b.includes('data engineering')) return [
    choose('fiber optics'),
    choose('server racks'),
    choose('database server'),
    choose('network cables')
  ];
  if (b.includes('edge') || b.includes('hardware')) return [
    choose('circuit board macro'),
    choose('silicon wafer'),
    choose('embedded device pcb')
  ];
  if (b.includes('education')) return [
    choose('laptop coding'),
    choose('keyboard closeup minimal'),
    choose('classroom technology')
  ];
  if (b.includes('climate') || b.includes('science')) return [
    choose('satellite data screen'),
    choose('lab instrumentation'),
    choose('environmental sensors')
  ];
  if (b.includes('productivity') || b.includes('business')) return [
    choose('lines of code on screen'),
    choose('analytics dashboard'),
    choose('cloud computing')
  ];
  if (b.includes('open-source') || b.includes('research')) return [
    choose('server rack'),
    choose('code editor screen'),
    choose('collaboration technology')
  ];

  // Tag/title-based fallback
  if (tag.includes('rag') || t.includes('retrieval')) return ['fiber optics', 'server racks', 'database server'];
  if (tag.includes('agents') || t.includes('agents')) return ['automation control panel', 'command line screen', 'workflow diagram screen'];
  if (tag.includes('quantization') || t.includes('quantization')) return ['silicon wafer', 'chip closeup', 'circuit board macro'];
  if (tag.includes('evals') || t.includes('eval')) return ['analytics dashboard', 'code test screen', 'quality metrics screen'];
  if (tag.includes('multimodal') || t.includes('multimodal')) return ['abstract technology', 'light trails', 'colorful data visuals'];
  if (tag.includes('safety') || t.includes('safety') || t.includes('security')) return ['cybersecurity', 'data lock', 'secure server room'];

  // Generic safe tech
  return ['circuit board macro', 'server racks', 'data center', 'abstract technology', 'keyboard closeup'];
}

// Score a photo for topical relevance based on overlap
function scorePhotoAgainstTopic(photo: UnsplashPhoto, tokens: Set<string>): number {
  const words = [
    photo.alt_description || '',
    photo.description || '',
    ...(photo.tags || []).map(t => t.title || '')
  ]
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  let score = 0;
  for (const w of words) {
    if (tokens.has(w)) score += 1;
  }
  // small boost for common tech words
  const boosts = ['server','rack','circuit','chip','silicon','dashboard','fiber','optic','keyboard','code','cloud','network'];
  for (const w of words) {
    if (boosts.includes(w)) score += 0.25;
  }
  return score;
}

// Used-image tracking
function getUsedImageIds(): string[] {
  return readJsonArraySafe(USED_IMAGES_PATH);
}
function saveUsedImageId(id: string): void {
  const used = getUsedImageIds();
  if (!used.includes(id)) {
    used.push(id);
    writeJsonArraySafe(USED_IMAGES_PATH, used);
  }
}

// Try multiple topic queries; rank, avoid AI-ish, avoid reuse, return best
async function selectBestUnsplashPhoto(
  queries: string[],
  topicTokens: Set<string>,
  perPage = 20,
  maxPages = 3
): Promise<UnsplashPhoto> {
  const used = new Set(getUsedImageIds());

  let bestScore = -Infinity;
  let bestPhoto: UnsplashPhoto | null = null;

  for (const rawQ of queries) {
    const q = buildUnsplashQuery(rawQ);
    for (let page = 1; page <= maxPages; page++) {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=landscape&page=${page}&per_page=${perPage}`;
      const resp = (await ax.get(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
        timeout: 15000
      })) as { data: UnsplashSearchResponse };

      const candidates = (resp.data?.results || [])
        .filter((p: UnsplashPhoto) => p?.id && !used.has(p.id))
        .filter((p: UnsplashPhoto) => !looksLikeAI(p));

      for (const p of candidates) {
        const score = scorePhotoAgainstTopic(p, topicTokens);
        if (score > bestScore) {
          bestScore = score;
          bestPhoto = p;
        }
      }
    }
    // Early stop if we found something clearly relevant
    if (bestScore >= 2 && bestPhoto) break;
  }

  if (!bestPhoto) {
    throw new Error(`No suitable Unsplash images for queries: ${queries.join(' | ')}`);
  }
  return bestPhoto;
}




/* =========================
   Content Generation
========================= */
async function generateBlogPost(weekNum: number, targetBucket: string): Promise<BlogPost> {
  const today = new Date().toISOString().split('T')[0];

  const last = getLastBlogMetaFromDataTs();
  const lastSummary = [last.title, last.tag, last.content].filter(Boolean).join(' | ');
  const lastForbidden = extractTopicHints(lastSummary).join(', ') || 'none';

  const usedTopics = getUsedTopics();
  const recentTitles = getRecentTitlesForPrompt(8);

  const newsSeed = await getLatestTopicFromFeeds(); // may be null
  const newsNote = newsSeed
    ? `Use this as optional context ONLY; do not paraphrase or copy:
SOURCE_TITLE: "${newsSeed.title}"
SOURCE_URL: ${newsSeed.url}
SOURCE_SUMMARY (may be incomplete): "${(newsSeed.summary || '').slice(0, 400)}"

Requirements:
- Your post MUST primarily fit the TARGET_CATEGORY below.
- If the news item doesn’t match the category, you may cite it in "Citations" but choose a better example within the category.
- Structure and phrasing must be original. Do NOT copy sentences.
`
    : `No external seed available — still adhere to the TARGET_CATEGORY below.`;

  const basePrompt = (extraAvoidNote = '') => `
You will output STRICT JSON only. No code fences.

TARGET_CATEGORY: ${targetBucket}

${newsNote}

Write like a smart, friendly human: conversational, confident, helpful. Use contractions, short sentences, and concrete examples. Add a light touch of wit (max 1–2 playful lines). Open with a punchy hook or tiny story in the first 1–2 sentences. Ask 1–2 rhetorical questions. Avoid clichés/buzzword soup/hype. No emojis.

Series: "How AI Works – From Basics to Cutting Edge".
Today is Week ${weekNum}.

Avoid repeating previous topics or angles. Here are recently covered titles/tags:
${recentTitles.map(t => `- ${t}`).join('\n')}

Do NOT repeat the previous post's topic(s) or angle:
PREVIOUS_TITLE: "${last.title}"
PREVIOUS_TAG: "${last.tag}"
PREVIOUS_SUMMARY: "${(last.content || '').slice(0, 600)}"
FORBIDDEN_TOPICS (must avoid): ${lastForbidden}

${extraAvoidNote}

Pick a timely AI topic that fits the TARGET_CATEGORY. Stay within the category.

JSON format:
{
  "title": "Clear, keyword-rich title (include the main AI term and a concrete benefit or use case)",
  "tag": "AI Education | ${targetBucket}",
  "content": "170–230 words. Start with a vivid hook or tiny story, then explain what this is and why it matters now. Include 2–4 natural SEO phrases users might search (e.g., 'edge AI hardware', 'healthcare AI models', 'robotics perception systems'). No keyword stuffing.",
  "sections": [
    { "heading": "What is [Topic]?", "text": "Crisp definition + 1–2 sentences of context/history + what's changed recently." },
    { "heading": "How It Works", "text": "Plain-language mechanics. Use an analogy and one concrete example. Keep paragraphs short." },
    { "heading": "Real-World Applications", "text": "Name at least 3 industries or product types with brief, specific examples (what it improves and how)." },
    { "heading": "Benefits & Limitations", "text": "Balanced view: strengths and trade-offs (cost/latency, data needs, bias/ethics, maintenance). Offer pragmatic guidance on when NOT to use it." },
    { "heading": "Latest Research & Trends", "text": "Call out notable papers, benchmarks, or company releases in the last 6–12 months and what they imply for practitioners." },
    { "heading": "Visual", "text": "A Mermaid diagram AS A PLAIN STRING. Start with the word 'mermaid' on its own line. DO NOT use semicolons in diagram lines. Example: 'mermaid\\nflowchart TD\\nA[Noise]-->B[Denoise]\\nB-->C[Image]'" },
    { "heading": "Glossary", "bullets": ["5–8 key terms with short, beginner-friendly definitions."] },
    { "heading": "Citations", "bullets": ["3–6 credible links (official docs, arXiv, major AI labs/blogs). Include full URLs. No quotes.${newsSeed ? ' Always include ' + newsSeed.url + ' as one optional source.' : ''}"] }
  ]
}

Rules:
- Sound human: use contractions, varied sentence lengths, concrete nouns/verbs.
- Add 1–2 rhetorical questions to invite curiosity.
- Humor is subtle; never undercut clarity.
- Cut filler. Every sentence should teach or clarify something.
- No code blocks; diagrams must be plain strings (no backticks).
- Do not invent facts or quotes; if unsure, omit.
- Stay within TARGET_CATEGORY.

Output only the JSON object.
`;

  // First attempt
  let res = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.25,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'You ONLY output strict JSON. No code fences.' },
      { role: 'user', content: basePrompt() }
    ],
    max_tokens: 1800
  });

  let raw = res.choices?.[0]?.message?.content || '{}';
  let blog = safeParseJson(raw) as BlogPost;

  // If topic still too similar, retry once with stronger instruction
  const candidateTopic = [blog.title, blog.tag].filter(Boolean).join(' ');
  const usedTopicsAll = getUsedTopics();
  if (isTopicTooSimilar(candidateTopic, usedTopicsAll)) {
    const avoidNote = `Your previous attempt overlapped with existing topics. You MUST choose a different theme within TARGET_CATEGORY that does not substantially overlap with: ${usedTopicsAll.slice(-15).join('; ')}. Avoid overused keywords like GPT-5, GPT-4, RAG, 'AI agents' unless absolutely necessary.`;
    res = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You ONLY output strict JSON. No code fences.' },
        { role: 'user', content: basePrompt(avoidNote) }
      ],
      max_tokens: 1800
    });
    raw = res.choices?.[0]?.message?.content || '{}';
    blog = safeParseJson(raw) as BlogPost;
  }

  // Guard: if news present and model copied title verbatim, tweak (REUSE the same newsSeed!)
  if (newsSeed && blog.title && newsSeed.title) {
    const a = blog.title.toLowerCase();
    const b = newsSeed.title.toLowerCase();
    if (a.includes(b)) {
      blog.title = `${blog.title} — Explained in Plain English`;
    }
  }

  blog.date = today;
  blog.author = author;
  return blog;
}

/* =========================
   Image download (topic-aware Unsplash)
========================= */
async function fetchUnsplashImage(
  blog: { title?: string; tag?: string; sections?: any[] },
  bucket: string,
  slug: string,
  id: number
): Promise<{ filename: string; importVar: string; credit: ImageCredit }> {
  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
  if (!UNSPLASH_KEY) throw new Error('Missing UNSPLASH_ACCESS_KEY in env');

  const TARGET_W = 1792;
  const TARGET_H = 1024;

  const tokens = topicTokensFromBlog(blog);
  const queries = buildTopicQueries(blog, bucket); // ordered, specific
  const photo = await selectBestUnsplashPhoto(queries, tokens, 20, 4);

  const downloadUrl = `${photo.urls.raw}&w=${TARGET_W}&h=${TARGET_H}&fit=crop`;
  const imgResp = (await ax.get(downloadUrl, {
    responseType: 'arraybuffer',
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  })) as { data: ArrayBuffer | Buffer };

  if (!fs.existsSync(blogImageDir)) fs.mkdirSync(blogImageDir, { recursive: true });

  const filename = `${slug}.jpg`;
  fs.writeFileSync(path.join(blogImageDir, filename), Buffer.from(imgResp.data as ArrayBuffer));

  // Record this image ID so we never reuse it
  saveUsedImageId(photo.id);

  const importVar = `${blogImageVarPrefix}_${id}`;
  const credit: ImageCredit = {
    authorName: photo.user?.name,
    authorUrl: photo.user?.links?.html,
    source: 'Unsplash',
    photoUrl: photo.links?.html
  };

  return { filename, importVar, credit };
}

/* =========================
   Injection into BlogData.ts
========================= */
function injectIntoAllData(
  blog: BlogPost,
  importVar: string,
  imageFilename: string,
  id: number
): void {
  let file = fs.readFileSync(allDataPath, 'utf-8');

  // Add image import (idempotent)
  const imageImport = `import ${importVar} from "@/../public/images/${imageFilename}";\n`;
  if (!file.includes(`import ${importVar} from`)) {
    file = imageImport + file;
  }

  // Build object to inject
  const blogObj: BlogPost = {
    id,
    slug: blog.slug,
    img: importVar as any,
    date: blog.date,
    tag: blog.tag,
    title: blog.title,
    author: blog.author,
    content: blog.content,
    sections: (blog.sections || []).map((section: Section) => ({
      heading: section.heading,
      text: section.text,
      bullets: section.bullets || undefined,
      quote: section.quote || undefined,
      videoImage: section.videoImage || undefined,
      videoId: section.videoId || undefined
    })),
    ...(blog.imageCredit ? { imageCredit: blog.imageCredit } : {})
  };

  // Validate (prevents undefined entries)
  if (!blogObj.id || !blogObj.slug || !blogObj.title || !blogObj.tag || !blogObj.date) {
    throw new Error('Generated blog object is incomplete; aborting write.');
  }

  // Serialize (leave img unquoted; keys unquoted)
  const blogString = JSON.stringify(blogObj, null, 2)
    .replace(/"img": "(aiImage_\d+)"/, 'img: $1')
    .replace(/"([^"]+)":/g, '$1:');

  // Append to end of `export const blogs = [ ... ];`
  const regex = /(export\s+const\s+blogs\s*=\s*\[)([\s\S]*)(\]\s*;)/;
  if (!regex.test(file)) {
    throw new Error('Could not locate `export const blogs = [ ... ];` in BlogData.ts');
  }
  file = file.replace(
    regex,
    (_m: string, p1: string, p2: string, p3: string) => `${p1}${p2},\n${blogString}\n${p3}`
  );

  fs.writeFileSync(allDataPath, file);
}

/* =========================
   MAIN
========================= */
(async () => {
  try {
    if (!fs.existsSync(blogImageDir)) fs.mkdirSync(blogImageDir, { recursive: true });

    const file = fs.readFileSync(allDataPath, 'utf-8');
    const id = getNextId(file);

    // Choose next category bucket to enforce variety
    const bucket = getNextBucket();

    // Generate post (news-seeded + bucket-locked + anti-repeat across history)
    const blog = await generateBlogPost(id, bucket);
    blog.id = id;
    blog.slug = `how-ai-works-id-${id}`;

    // Warn if still similar
    const usedTopics = getUsedTopics();
    const candidateTopic = [blog.title, blog.tag].filter(Boolean).join(' ');
    if (isTopicTooSimilar(candidateTopic, usedTopics)) {
      console.warn('⚠️ Topic still looks similar to a previous one. Consider re-running or editing manually.');
    }

    // Topic-aware Unsplash image (ranked + never reuse + non-AI vibe)
    const { filename, importVar, credit } = await fetchUnsplashImage(blog, bucket, blog.slug, id);
    blog.imageCredit = credit;

    // Inject into BlogData.ts
    injectIntoAllData(blog, importVar, filename, id);

    // Record topics so we avoid them later
    saveUsedTopic(blog.title);
    saveUsedTopic(blog.tag);

    console.log(`✅ Generated: [${bucket}] ${blog.title}`);
  } catch (err) {
    console.error('❌ Error generating blog post:', err);
    process.exitCode = 1;
  }
})();
