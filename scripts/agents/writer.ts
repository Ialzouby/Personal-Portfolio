// scripts/agents/writer.ts
const { openai, safeParseJson, DEFAULT_MODEL, withTimeout } = require("./openai_client");

// Writer generates full blog content, allow longer timeout (120s)
const WRITER_TIMEOUT_MS = 120_000;

async function writeWeeklyPostJson(opts: {
  weekNum: number;
  bucket: string;
  author: string;
  title: string;
  primaryQuery: string;
  secondaryQueries: string[];
  outlineH2s: string[];
  sources: { url: string; title?: string; date?: string }[];
}) {
You will output STRICT JSON only(no code fences).

Write an evergreen AI explainer optimized for Google search.

** TONE & STYLE GUIDELINES:**
- ** Human & Witty:** Write like a knowledgeable friend, not a robot or a textbook.Use a bit of humor / wit where appropriate(but don't overdo it).
  - ** Simple & Clear:** Avoid overly complex jargon("fancy words").Explain things simply so a general enthusiast can understand.
- ** Engaging:** Use short paragraphs, varying sentence structure, and active voice.

  TARGET_CATEGORY: ${ opts.bucket }
SERIES: "How AI Works – From Basics to Cutting Edge"
WEEK: ${ opts.weekNum }

SEO focus:
  PRIMARY_QUERY: ${ opts.primaryQuery }
SECONDARY_QUERIES: ${(opts.secondaryQueries || []).join(" | ")}

Use ONLY these sources for factual claims and include them in "Citations"(full URLs):
${ (opts.sources || []).map((s) => `- ${s.url}`).join("\n") }

Use this title(do not change it):
TITLE: ${ opts.title }

Suggested H2 outline(use as headings, you may slightly refine):
${ (opts.outlineH2s || []).map((h) => `- ${h}`).join("\n") }

Return STRICT JSON in this exact format:
{
  "title": "${opts.title}",
    "tag": "AI Education | ${opts.bucket}",
      "content": "170–230 words. Hook + what it is + why it matters now. Natural SEO phrases. No keyword stuffing.",
        "sections": [
          { "heading": "What is [Topic]?", "text": "..." },
          { "heading": "How It Works", "text": "..." },
          { "heading": "Real-World Applications", "text": "..." },
          { "heading": "Benefits & Limitations", "text": "..." },
          { "heading": "Latest Research & Trends", "text": "Ground this section in the sources above." },
          { "heading": "Visual", "text": "A Mermaid diagram as a plain string. Start with 'mermaid' on its own line. No backticks." },
          { "heading": "Glossary", "bullets": ["5–8 terms with short definitions"] },
          { "heading": "Citations", "bullets": ["FULL URL", "FULL URL", "FULL URL"] }
        ]
}

Rules:
- No invented facts.If unsure, omit.
- No dates in title.
- Balanced: include limitations and when NOT to use it.
- ** REMEMBER: Be witty, simple, and human.**
  `;

  const resp = await withTimeout(
    openai.responses.create({
      model: DEFAULT_MODEL,
      input: prompt,
    }),
    WRITER_TIMEOUT_MS,
    "Writer"
  );

  const blog = safeParseJson(resp.output_text);
  blog.author = opts.author;
  return blog;
}

module.exports = { writeWeeklyPostJson };

export {};
