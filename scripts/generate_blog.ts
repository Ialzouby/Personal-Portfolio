// scripts/generate_blog.ts
// CommonJS TypeScript version (works with ts-node without ESM)
// Run:
//   OPENAI_API_KEY=... UNSPLASH_ACCESS_KEY=... npx ts-node scripts/generate_blog.ts

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const ax = require("axios");
const { XMLParser } = require("fast-xml-parser");

// --- NEW: news-aware SEO pipeline imports (agent modules) ---
const { scoutWeeklyNews } = require("./agents/scout");
const { chooseWeeklyWinner } = require("./agents/editor");
const { buildSeoAngle } = require("./agents/angle");
const { writeWeeklyPostJson } = require("./agents/writer");

// --- NEW: SEO tooling imports ---
const { readSeoHistory, appendSeoHistory } = require("./seo/history");
const { cannibalizationGuard } = require("./seo/cannibalization");
const { generateMetaPack } = require("./seo/meta");

// --- NEW: optional debug/audit saving ---
const { saveWeeklyJson } = require("./weekly_briefs/save");

/* =========================
   DESIRED TOPIC OVERRIDE
   - Set to null for automatic (biggest news) selection
   - Or specify a string to force a specific topic angle (optional)
========================= */
const DESIRED_TOPIC /** @type {string|null} */ = null;

/* =========================
   Types (TS-only, but fine in ts-node)
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
  source?: "Unsplash";
  photoUrl?: string;
};

type MetaPack = {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  jsonLd: any;
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
  meta?: MetaPack;
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
const allDataPath = path.join(__dirname, "../public/data/BlogData.ts");
const blogImageDir = path.join(__dirname, "../public/images");
const blogImageVarPrefix = "aiImage";
const author = "Issam Alzouby";

// History files
const USED_IMAGES_PATH = path.join(__dirname, "used_images.json"); // Unsplash IDs we used
const USED_TOPICS_PATH = path.join(__dirname, "topics_used.json"); // Titles/Tags we used

/* =========================
   Generic Helpers
========================= */
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

function isoDate(d = new Date()): string {
  return d.toISOString().split("T")[0];
}

function getNextId(file: string): number {
  const idMatch = file.match(/id:\s*(\d+),/g);
  const existingIds = idMatch ? idMatch.map((m: string) => parseInt(m.match(/\d+/)![0], 10)) : [];
  return existingIds.length ? Math.max(...existingIds) + 1 : 20;
}

// read/write small arrays safely
function readJsonArraySafe(p: string): string[] {
  try {
    if (!fs.existsSync(p)) return [];
    const raw = fs.readFileSync(p, "utf-8");
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
    const file = fs.readFileSync(allDataPath, "utf-8");
    const titles = [...file.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
    const tags = [...file.matchAll(/tag:\s*"([^"]+)"/g)].map((m) => m[1]);
    const contents = [...file.matchAll(/content:\s*"([\s\S]*?)"\s*,/g)].map((m) => m[1]);
    return {
      title: titles.length ? titles[titles.length - 1] : "",
      returnTag: "",
      tag: tags.length ? tags[tags.length - 1] : "",
      content: contents.length ? contents[contents.length - 1] : "",
    } as any;
  } catch {
    return { title: "", tag: "", content: "" };
  }
}

// Extract all previous titles/tags from BlogData.ts (for topic history)
function getAllTopicsFromBlogData(): string[] {
  try {
    const file = fs.readFileSync(allDataPath, "utf-8");
    const titles = [...file.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
    const tags = [...file.matchAll(/tag:\s*"([^"]+)"/g)].map((m) => m[1]);
    return [...titles, ...tags].filter(Boolean);
  } catch {
    return [];
  }
}

// Topic normalization & similarity (for “used topics” checks)
function normalizeTopic(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function topicTokens(s: string): Set<string> {
  const stop = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "for",
    "with",
    "in",
    "on",
    "how",
    "what",
    "why",
    "when",
    "is",
    "are",
    "vs",
    "using",
    "from",
    "ai",
    "ml",
    "artificial",
    "intelligence",
    "week",
    "guide",
    "introduction",
    "intro",
    "explained",
    "deep",
    "dive",
  ]);
  return new Set(
    normalizeTopic(s)
      .split(" ")
      .filter((t) => t && !stop.has(t))
  );
}
function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = new Set([...a].filter((x) => b.has(x)));
  const union = new Set([...a, ...b]);
  return union.size ? inter.size / union.size : 0;
}

// Simple topic keyword extraction (to hard-block repeats)
function extractTopicHints(s: string | undefined): string[] {
  if (!s) return [];
  const lower = s.toLowerCase();
  const topics = [
    "diffusion",
    "agents",
    "rag",
    "transformers",
    "quantization",
    "evals",
    "safety",
    "multimodal",
    "inference",
    "rlhf",
    "video generation",
    "sora",
    "search",
    "fine-tuning",
    "distillation",
  ];
  return topics.filter((t) => lower.includes(t));
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

// recent titles for prompts (still useful)
function getRecentTitlesForPrompt(n = 8): string[] {
  return getAllTopicsFromBlogData().slice(-n);
}

/* =========================
   Unsplash: topic-aware selection (no AI look, never reuse)
========================= */
const AI_BLACKLIST = [
  "ai",
  "artificial intelligence",
  "artificial-intelligence",
  "neural",
  "neuron",
  "brain",
  "robot",
  "android",
  "cyborg",
  "humanoid",
  "face",
  "portrait",
  "golem",
  "doll",
  "uncanny",
  "gore",
];

function looksLikeAI(photo: UnsplashPhoto): boolean {
  const hay = [photo.description || "", photo.alt_description || "", ...(photo.tags || []).map((t) => t.title || "")]
    .join(" ")
    .toLowerCase();
  return AI_BLACKLIST.some((b) => hay.includes(b));
}

// Gentle negatives to keep it clean, plus topic positives we'll add per-query
function buildUnsplashQuery(base: string, positives: string[] = []): string {
  const negatives = [
    "-robot",
    "-face",
    "-portrait",
    "-humanoid",
    "-creepy",
    "-scary",
    "-dark",
    "-gore",
    "-uncanny",
    "-doll",
    "-ai",
    '-"artificial intelligence"',
    "-neural",
    "-brain",
  ];
  const safe = ["technology", "computer", "clean", "minimal", "circuitry", "modern"];
  return [base, ...positives, ...safe, ...negatives].join(" ");
}

// From blog to tokens
function topicTokensFromBlog(blog: { title?: string; tag?: string; sections?: any[] }): Set<string> {
  const stop = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "for",
    "with",
    "in",
    "on",
    "how",
    "what",
    "why",
    "when",
    "is",
    "are",
    "vs",
    "using",
    "from",
    "ai",
    "ml",
    "artificial",
    "intelligence",
    "week",
    "guide",
    "introduction",
    "intro",
    "explained",
    "deep",
    "dive",
  ]);
  const text = [
    blog.title || "",
    blog.tag || "",
    ...(blog.sections || []).map((s: any) => [s.heading || "", s.text || "", ...(s.bullets || [])].join(" ")),
  ].join(" ");
  return new Set(
    normalizeTopic(text)
      .split(" ")
      .filter((t) => t && !stop.has(t))
  );
}

// Map bucket → concrete visual concepts (queries). Try in order.
function buildTopicQueries(blog: { title?: string; tag?: string; sections?: any[] }, bucket: string): string[] {
  const b = (bucket || "").toLowerCase();
  const choose = (q: string) => q;

  if (b.includes("healthcare")) return [choose("hospital technology"), choose("medical devices closeup"), choose("health data dashboard"), choose("lab equipment technology")];
  if (b.includes("robot")) return [choose("industrial machinery detail"), choose("motors gears closeup"), choose("mechatronics circuit board")];
  if (b.includes("ethics") || b.includes("policy")) return [choose("cybersecurity abstract"), choose("privacy data lock"), choose("governance technology")];
  if (b.includes("creative")) return [choose("abstract technology minimal"), choose("light trails technology"), choose("colorful code screen")];
  if (b.includes("retrieval") || b.includes("data/infra") || b.includes("infra")) return [choose("fiber optics"), choose("server racks"), choose("database server"), choose("network cables")];
  if (b.includes("edge") || b.includes("hardware")) return [choose("circuit board macro"), choose("silicon wafer"), choose("embedded device pcb")];

  // Generic safe tech
  return ["circuit board macro", "server racks", "data center", "abstract technology", "keyboard closeup"];
}

// Score a photo for topical relevance based on overlap
function scorePhotoAgainstTopic(photo: UnsplashPhoto, tokens: Set<string>): number {
  const words = [photo.alt_description || "", photo.description || "", ...(photo.tags || []).map((t) => t.title || "")]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  let score = 0;
  for (const w of words) {
    if (tokens.has(w)) score += 1;
  }
  // small boost for common tech words
  const boosts = ["server", "rack", "circuit", "chip", "silicon", "dashboard", "fiber", "optic", "keyboard", "code", "cloud", "network"];
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
async function selectBestUnsplashPhoto(queries: string[], topicTokens: Set<string>, perPage = 20, maxPages = 3): Promise<UnsplashPhoto> {
  const used = new Set(getUsedImageIds());

  let bestScore = -Infinity;
  let bestPhoto: UnsplashPhoto | null = null;

  for (const rawQ of queries) {
    const q = buildUnsplashQuery(rawQ);
    for (let page = 1; page <= maxPages; page++) {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=landscape&page=${page}&per_page=${perPage}`;
      const resp = (await ax.get(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
        timeout: 15000,
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
    throw new Error(`No suitable Unsplash images for queries: ${queries.join(" | ")}`);
  }
  return bestPhoto;
}

/* =========================
   Image download (topic-aware Unsplash)
========================= */
async function fetchUnsplashImage(blog: { title?: string; tag?: string; sections?: any[] }, bucket: string, slug: string, id: number): Promise<{ filename: string; importVar: string; credit: ImageCredit }> {
  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
  if (!UNSPLASH_KEY) throw new Error("Missing UNSPLASH_ACCESS_KEY in env");

  const TARGET_W = 1792;
  const TARGET_H = 1024;

  const tokens = topicTokensFromBlog(blog);
  const queries = buildTopicQueries(blog, bucket); // ordered, specific
  const photo = await selectBestUnsplashPhoto(queries, tokens, 20, 4);

  const downloadUrl = `${photo.urls.raw}&w=${TARGET_W}&h=${TARGET_H}&fit=crop`;
  const imgResp = (await ax.get(downloadUrl, {
    responseType: "arraybuffer",
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
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
    source: "Unsplash",
    photoUrl: photo.links?.html,
  };

  return { filename, importVar, credit };
}

/* =========================
   Injection into BlogData.ts
========================= */
function injectIntoAllData(blog: BlogPost, importVar: string, imageFilename: string, id: number): void {
  let file = fs.readFileSync(allDataPath, "utf-8");

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
      videoId: section.videoId || undefined,
    })),
    ...(blog.imageCredit ? { imageCredit: blog.imageCredit } : {}),
    ...(blog.meta ? { meta: blog.meta } : {}),
  };

  // Validate (prevents undefined entries)
  if (!blogObj.id || !blogObj.slug || !blogObj.title || !blogObj.tag || !blogObj.date) {
    throw new Error("Generated blog object is incomplete; aborting write.");
  }

  // Serialize (leave img unquoted; keys unquoted)
  const blogString = JSON.stringify(blogObj, null, 2)
    .replace(/"img": "(aiImage_\d+)"/, "img: $1")
    .replace(/"([^"]+)":/g, "$1:");

  // Append to end of `export const blogs = [ ... ];`
  const regex = /(export\s+const\s+blogs\s*=\s*\[)([\s\S]*)(\]\s*;)/;
  if (!regex.test(file)) {
    throw new Error("Could not locate `export const blogs = [ ... ];` in BlogData.ts");
  }
  file = file.replace(regex, (_m: string, p1: string, p2: string, p3: string) => `${p1}${p2},\n${blogString}\n${p3}`);

  fs.writeFileSync(allDataPath, file);
}

/* =========================
   Slug helpers
========================= */
function slugify(s: string): string {
  return normalizeTopic(s).replace(/\s+/g, "-").slice(0, 70);
}
function ensureSlugUnique(baseSlug: string, used: string[]): string {
  let slug = baseSlug;
  let i = 2;
  const normUsed = new Set(used.map((s) => (s || "").toLowerCase()));
  while (normUsed.has((slug || "").toLowerCase())) {
    slug = `${baseSlug}-${i}`;
    i++;
  }
  return slug;
}

/* =========================
   MAIN
========================= */
(async () => {
  try {
    if (!fs.existsSync(blogImageDir)) fs.mkdirSync(blogImageDir, { recursive: true });

    const file = fs.readFileSync(allDataPath, "utf-8");
    const id = getNextId(file);
    const today = isoDate();

    // Used topics from history + BlogData.ts
    const usedTopics = getUsedTopics();
    const recentTitles = getRecentTitlesForPrompt(10);

    // SEO history (for cannibalization + diversity penalty)
    const seoHist = readSeoHistory();

    // 1) SCOUT: discover important AI events this week (real web search inside agent)
    const brief = await scoutWeeklyNews({
      usedTopics,
      maxEvents: 12,
      weekDate: today,
    });
    saveWeeklyJson(`${brief.week}_scout.json`, brief);

    // 2) EDITOR: choose the single best story (biggest news + SEO potential - diversity penalty)
    const decision = await chooseWeeklyWinner({
      brief,
      recentBuckets: seoHist.buckets,
    });
    saveWeeklyJson(`${brief.week}_editor.json`, decision);

    const winner = brief.events[decision.winner_index];

    // If you override manually, keep the winner’s bucket but steer angle/writing topic
    const chosenBucket: string = winner.category;

    // 3) ANGLE: event → evergreen query/title/slug (with cannibalization retries)
    let angle;
    if (DESIRED_TOPIC) {
      // Forced angle mode: still use the week's sources, but steer the query/title.
      angle = {
        primary_query: DESIRED_TOPIC,
        secondary_queries: [],
        search_intent: "Informational",
        recommended_title: DESIRED_TOPIC,
        recommended_slug: slugify(DESIRED_TOPIC),
        outline_h2s: [],
      };
    } else {
      angle = await buildSeoAngle({
        event: winner,
        avoidQueries: seoHist.primary_queries,
        avoidTitles: seoHist.titles,
        avoidSlugs: seoHist.slugs,
      });

      for (let attempt = 0; attempt < 3; attempt++) {
        angle.recommended_slug = ensureSlugUnique(angle.recommended_slug, seoHist.slugs);

        const guard = cannibalizationGuard({
          candidateTitle: angle.recommended_title,
          candidateSlug: angle.recommended_slug,
          primaryQuery: angle.primary_query,
          history: seoHist,
        });

        if (guard.ok) break;

        angle = await buildSeoAngle({
          event: winner,
          avoidQueries: [...seoHist.primary_queries, angle.primary_query],
          avoidTitles: [...seoHist.titles, angle.recommended_title],
          avoidSlugs: [...seoHist.slugs, angle.recommended_slug],
        });
      }
    }

    saveWeeklyJson(`${brief.week}_angle.json`, angle);

    // 4) WRITER: generate blog JSON (your schema), grounded in the selected sources
    const blog = (await writeWeeklyPostJson({
      weekNum: id,
      bucket: chosenBucket,
      author,
      title: angle.recommended_title,
      primaryQuery: angle.primary_query,
      secondaryQueries: angle.secondary_queries || [],
      outlineH2s: angle.outline_h2s || [],
      sources: winner.sources,
    })) as BlogPost;

    blog.id = id;
    blog.slug = angle.recommended_slug || `how-ai-works-id-${id}`;
    blog.date = today;
    blog.author = author;

    // Optional: extra anti-repeat guard (only in auto mode)
    if (!DESIRED_TOPIC) {
      const candidateTopic = [blog.title, blog.tag].filter(Boolean).join(" ");
      if (isTopicTooSimilar(candidateTopic, usedTopics, 0.55)) {
        console.warn("⚠️ Title/tag still looks similar to a previous one. Consider re-running or editing manually.");
      }
    }

    // 5) META: generate SEO meta pack + JSON-LD
    const meta = await generateMetaPack({
      slug: blog.slug,
      bucket: chosenBucket,
      blogTitle: blog.title,
      primaryQuery: angle.primary_query,
      previewContent: blog.content,
      author,
      dateISO: blog.date,
    });
    blog.meta = meta;

    // 6) IMAGE: topic-aware Unsplash image (ranked + never reuse + non-AI vibe)
    const { filename, importVar, credit } = await fetchUnsplashImage(blog, chosenBucket, blog.slug, id);
    blog.imageCredit = credit;

    // 7) INJECT into BlogData.ts
    injectIntoAllData(blog, importVar, filename, id);

    // 8) Save topic history + SEO history
    if (!DESIRED_TOPIC) {
      saveUsedTopic(blog.title);
      saveUsedTopic(blog.tag);
    }

    appendSeoHistory({
      primary_query: angle.primary_query,
      title: blog.title,
      slug: blog.slug,
      bucket: chosenBucket,
    });

    console.log(`✅ Generated [${chosenBucket}] ${blog.title}`);
    console.log(`   slug: ${blog.slug}`);
    console.log(`   primary_query: ${angle.primary_query}`);
  } catch (err) {
    console.error("❌ Error generating blog post:", err);
    process.exitCode = 1;
  }
})();

export {};
