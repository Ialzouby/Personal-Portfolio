import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// === CONFIG ===
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const allDataPath = path.join(__dirname, '../public/data/BlogData.ts');
const blogImageDir = path.join(__dirname, '../public/blog');
const blogImageVarPrefix = 'aiImage';
const author = 'Issam Alzouby';

// === STEP 1: Generate AI blog post with DALL·E prompt ===
async function generateBlogPost() {
  const today = new Date().toISOString().split('T')[0];
  const weekNum = Math.floor((Date.now() - new Date('2025-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

  const prompt = `
You are writing a weekly blog series called "How AI Works – From Basics to Transformers."
Today is Week ${weekNum}. This post should teach a specific AI concept building on previous weeks.
Use beginner-friendly language, analogies, and accurate technical content.
Include:

- title
- tag (like: AI Education, Transformers)
- a short summary paragraph as "content"
- sections: 3–5, each with heading, text, optional bullets
- one quote: { text, author }
- a DALL·E prompt as: dalle_prompt

Return it in JSON format:
{
  "title": "...",
  "tag": "...",
  "content": "...",
  "sections": [
    { "heading": "...", "text": "...", "bullets": ["...", "..."] },
    ...
  ],
  "quote": { "text": "...", "author": "..." },
  "dalle_prompt": "..."
}
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: 'json',
  });

  const blog = JSON.parse(res.choices[0].message.content || '{}');
  blog.date = today;
  blog.slug = `how-ai-works-week-${weekNum}`;
  blog.author = author;

  return blog;
}

// === STEP 2: Generate image from DALL·E and save locally ===
async function generateImage(prompt: string, slug: string): Promise<{ filename: string; importVar: string }> {
  const imageRes = await openai.images.generate({
    prompt,
    n: 1,
    size: '1024x1024',
  });

  const imageUrl = imageRes.data[0].url!;
  const filename = `${slug}.png`;
  const filepath = path.join(blogImageDir, filename);
  const importVar = `${blogImageVarPrefix}_${slug.replace(/-/g, '_')}`;

  const imageData = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(filepath, imageData.data);
  return { filename, importVar };
}

// === STEP 3: Inject blog object into AllData.ts ===
function injectIntoAllData(blog: any, importVar: string, imageFilename: string) {
  let file = fs.readFileSync(allDataPath, 'utf-8');

  // 1. Add image import
  const imageImport = `import ${importVar} from "@/../public/blog/${imageFilename}";\n`;
  if (!file.includes(importVar)) {
    file = imageImport + file;
  }

  // 2. Prepare the blog object
  const id = Math.floor(Math.random() * 100000);
  const blogObj = {
    id,
    slug: blog.slug,
    img: importVar,
    date: blog.date,
    tag: blog.tag,
    title: blog.title,
    author: blog.author,
    content: blog.content,
    sections: blog.sections.map((section: any) => {
      return {
        heading: section.heading,
        text: section.text,
        bullets: section.bullets || undefined,
        quote: section.quote || undefined,
        videoImage: section.videoImage || undefined,
        videoId: section.videoId || undefined,
      };
    }),
  };

  if (blog.quote) {
    blogObj.sections.push({ quote: blog.quote });
  }

  // 3. Insert into blogs array
  const blogString = JSON.stringify(blogObj, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
    .replace(/"([^"]+)"/g, `"$1"`); // ensure strings remain quoted
    
  file = file.replace(/(const blogs = \[)([\s\S]*?)(\];)/, `$1$2,\n${blogString}$3`);
  fs.writeFileSync(allDataPath, file);
}

// === MAIN ===
(async () => {
  try {
    if (!fs.existsSync(blogImageDir)) fs.mkdirSync(blogImageDir);

    const blog = await generateBlogPost();
    const { filename, importVar } = await generateImage(blog.dalle_prompt, blog.slug);
    injectIntoAllData(blog, importVar, filename);

    console.log("✅ Weekly AI blog post generated successfully.");
  } catch (err) {
    console.error("❌ Error generating blog post:", err);
  }
})();
