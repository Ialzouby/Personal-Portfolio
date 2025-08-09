"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type CommentItem = {
  id: string;
  authorName: string;
  contentHtml: string;
  createdAt: string;
};

export default function CommentsClient({ slug }: { slug: string }) {
  const [items, setItems] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [tsReady, setTsReady] = useState(false);
  const [tsToken, setTsToken] = useState("");
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  async function fetchItems() {
    setLoading(true);
    const r = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
    const j = await r.json();
    setItems(j);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, [slug]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      postSlug: slug,
      authorName: String(f.get('name') || ''),
      authorEmail: String(f.get('email') || ''),
      content: String(f.get('content') || ''),
      honeypot: String(f.get('website') || ''),
      turnstileToken: tsToken,
    };
    if (!payload.turnstileToken) {
      setMsg('Please complete the CAPTCHA');
      return;
    }
    const r = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json();
    if (j.ok) {
      setMsg('Thanks! Your comment is pending moderation.');
      (e.currentTarget as any).reset();
      fetchItems();
      // Reset CAPTCHA for next submission
      try {
        if (widgetId && (window as any).turnstile?.reset) {
          (window as any).turnstile.reset(widgetId);
          setTsToken("");
        }
      } catch {}
    } else {
      setMsg(j.error || 'Error');
    }
  }

  // Render Turnstile programmatically when script is ready
  useEffect(() => {
    if (!tsReady || !widgetRef.current || widgetId) return;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;
    const turnstile = (window as any).turnstile;
    if (!turnstile || !turnstile.render) return;
    const id = turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: (token: string) => setTsToken(token),
      'error-callback': () => setTsToken(''),
      'expired-callback': () => setTsToken(''),
    });
    setWidgetId(id);
  }, [tsReady, widgetId]);

  return (
    <div className="mt-10">
      {/* Comments list */}
      <h3 className="n5-color fs-three fw-semibold mb-2 mb-md-3">Comments</h3>
      <div className="line-divider my-3"></div>
      {loading ? (
        <p className="n4-color">Loading…</p>
      ) : (
        <div className="d-flex flex-column gap-3 gap-md-4">
          {items.map((c) => (
            <div
              key={c.id}
              className="px-4 px-md-6 py-3 py-md-4 rounded-3 w-100 brn4"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="n5-color fs-six fw-medium">{c.authorName}</span>
                <span className="n4-color fs-nine">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="n5-color" dangerouslySetInnerHTML={{ __html: c.contentHtml }} />
            </div>
          ))}
          {items.length === 0 && (
            <p className="n4-color">No comments yet. Be the first to reply!</p>
          )}
        </div>
      )}

      {/* Reply form */}
      <section className="reply-section mt-8 mt-md-15 p-4 p-md-6 brn4 rounded-3">
        <h4 className="n5-color fs-three mb-2 mb-md-3">Leave a Reply</h4>
        <p className="n4-color fs-eight mb-4">
          Your email address will not be published. Required fields are marked *
        </p>
        {msg && <p className="mt-2 n5-color">{msg}</p>}
        <form
          onSubmit={onSubmit}
          className="d-flex flex-column gap-2 gap-md-3 mt-2"
          autoComplete="off"
        >
          {/* Honeypot */}
          <input type="text" name="website" className="d-none" tabIndex={-1} />
          <div className="d-flex flex-wrap flex-md-nowrap align-items-center gap-2 gap-md-3">
            <input
              name="name"
              placeholder="First Name *"
              required
              className="px-4 px-md-8 py-2 py-md-3 w-100 brn4 rounded-3 n5-color"
            />
            <input
              name="email"
              placeholder="Email (optional)"
              type="email"
              className="px-4 px-md-8 py-2 py-md-3 w-100 brn4 rounded-3 n5-color"
            />
          </div>
          <textarea
            name="content"
            placeholder="Your Message: *"
            required
            rows={5}
            className="n5-color px-4 px-md-5 py-2 py-md-3 rounded-3 brn4 w-100"
          />
          <div className="mt-2" ref={widgetRef} />
          <button
            className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-3 rounded-pill mt-3"
            type="submit"
          >
            Post Comment
          </button>
        </form>
      </section>

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => setTsReady(true)}
      />
    </div>
  );
}

