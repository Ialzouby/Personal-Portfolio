require('dotenv').config();
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');


// === CONFIG ===
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const allDataPath = path.join(__dirname, '../public/data/BlogData.ts');
const blogImageDir = path.join(__dirname, '../public/images');
const blogImageVarPrefix = 'aiImage';
const author = 'Issam Alzouby';

// === STEP 1: Generate AI blog post with DALL·E prompt ===
async function generateBlogPost(weekNum: number) {
  const today = new Date().toISOString().split('T')[0];

  const prompt = `
You are writing a weekly blog series called "How AI Works – From Basics to Transformers."
Today is Week ${weekNum}. This post should teach a specific AI concept building on previous weeks.
Use beginner-friendly language, analogies, and accurate technical content. It should also include figures and charts and be easy/fun to read.
Include:

- title
- tag (like: AI Education, Transformers)
- a short summary paragraph as "content"
- sections: 3–5, each with heading, text, optional bullets
- one REAL quote from a tech leader, DO NOT MAKE UP QUOTES, THEY MUST BE 100% TRUE AND STATED BY THE AUTHOR: { text, author }
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
});

  const raw = res.choices[0].message.content || '{}';
  const jsonString = raw.replace(/```json|```/g, '').trim();
  const blog = JSON.parse(jsonString);
  blog.date = today;
  const id = blog.id;

  blog.author = author;

  return blog;
}

// === STEP 2: Generate image from DALL·E and save locally ===
async function generateImage(prompt: string, slug: string, id: number) {
    const imageRes = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      size: '1792x1024',
    });
  
    if (!imageRes.data || !imageRes.data[0]?.url) {
      throw new Error('Image generation failed or no URL returned');
    }
  
    const imageUrl = imageRes.data[0].url;
    const filename = `${slug}.png`;
    const filepath = path.join(blogImageDir, filename);
    const importVar = `${blogImageVarPrefix}_${id}`;
  
    const axios = require('axios');
    const imageData = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(filepath, imageData.data);
  
    return { filename, importVar };
  }
  

// === STEP 3: Inject blog object into AllData.ts ===
function injectIntoAllData(blog: any, importVar: string, imageFilename: string, id: number) {
  let file = fs.readFileSync(allDataPath, 'utf-8');

  // 1. Add image import
  const imageImport = `import ${importVar} from "@/../public/images/${imageFilename}";\n`;
  if (!file.includes(importVar)) {
    file = imageImport + file;
  }

  // 2. Prepare the blog object
// Extract the highest existing ID from the file

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

// Custom serializer to leave img unquoted
const blogString = JSON.stringify(blogObj, null, 2)
  .replace(/"img": "(aiImage_\d+)"/, 'img: $1') // ✅ this removes quotes around the img import
  .replace(/"([^"]+)":/g, '$1:') // keeps keys unquoted

    
  file = file.replace(/(const blogs = \[)([\s\S]*?)(\];)/, `$1$2,\n${blogString}$3`);
  fs.writeFileSync(allDataPath, file);
}

// === MAIN ===
(async () => {
    try {
      if (!fs.existsSync(blogImageDir)) fs.mkdirSync(blogImageDir);

  
      // === Generate ID ===
      const file = fs.readFileSync(allDataPath, 'utf-8');
      const idMatch = file.match(/id:\s*(\d+),/g);
      const existingIds = idMatch ? idMatch.map((m: string) => parseInt(m.match(/\d+/)![0])) : [];
      const id = existingIds.length ? Math.max(...existingIds) + 1 : 20;

      const blog = await generateBlogPost(id); // ✅ pass ID as weekNum
      blog.id = id; // ✅ Set the ID here

      blog.slug = `how-ai-works-id-${id}`;

      const { filename, importVar } = await generateImage(blog.dalle_prompt, blog.slug, id);
      injectIntoAllData(blog, importVar, filename, id);
  
      console.log("✅ Weekly AI blog post generated successfully.");
    } catch (err) {
      console.error("❌ Error generating blog post:", err);
    }
  })();
  
