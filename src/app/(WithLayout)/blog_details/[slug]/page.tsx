// src/app/(WithLayout)/blog_details/[slug]/page.tsx
import { blogs } from "@/../public/data/BlogData";
import BlogDetailsClient from "./BlogDetailsClient";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog not found",
      description: "The requested blog post could not be found.",
    };
  }

  const meta = blog.meta;

  return {
    title: meta?.metaTitle ?? blog.title,
    description: meta?.metaDescription ?? (blog.content ? blog.content.replace(/\*\*/g, "").slice(0, 155) : ""),
    alternates: meta?.canonicalPath ? { canonical: meta.canonicalPath } : undefined,
    openGraph: {
      title: meta?.ogTitle ?? blog.title,
      description: meta?.ogDescription ?? (blog.content ? blog.content.replace(/\*\*/g, "").slice(0, 155) : ""),
      type: "article",
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return <div className="container mt-10">Blog not found.</div>;

  return (
    <>
      {/* ✅ JSON-LD: render server-side for SEO */}
      {blog.meta?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blog.meta.jsonLd) }}
        />
      )}

      {/* ✅ Keep your interactive UI client-side */}
      <BlogDetailsClient blog={blog} />
    </>
  );
}
