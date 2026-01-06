// scripts/seo/meta.ts
const { openai, safeParseJson, DEFAULT_MODEL } = require("../agents/openai_client");

async function generateMetaPack(opts: {
  slug: string;
  bucket: string;
  blogTitle: string;
  primaryQuery: string;
  previewContent: string;
  author: string;
  dateISO: string;
}) {
  const canonicalPath = `/blog/${opts.slug}`;

  const prompt = `
Generate SEO metadata for a blog post.

Constraints:
- metaTitle: 50–60 characters, include primaryQuery naturally, no clickbait
- metaDescription: 150–160 characters, clear benefit, no fluff
- ogTitle: can match metaTitle
- ogDescription: can match metaDescription
- canonicalPath: "${canonicalPath}"

Inputs:
Blog title: ${opts.blogTitle}
Primary query: ${opts.primaryQuery}
Category: ${opts.bucket}
Preview content:
${opts.previewContent}

Return STRICT JSON:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "ogTitle": "...",
  "ogDescription": "...",
  "canonicalPath": "${canonicalPath}",
  "jsonLd": {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "...",
    "datePublished": "${opts.dateISO}",
    "author": { "@type": "Person", "name": "${opts.author}" }
  }
}
`;

  const resp = await openai.responses.create({
    model: DEFAULT_MODEL,
    input: prompt,
  });

  const meta = safeParseJson(resp.output_text);

  meta.canonicalPath = meta.canonicalPath || canonicalPath;
  meta.jsonLd =
    meta.jsonLd ||
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.metaTitle || opts.blogTitle,
      datePublished: opts.dateISO,
      author: { "@type": "Person", name: opts.author },
    };

  return meta;
}

module.exports = { generateMetaPack };

export {};
