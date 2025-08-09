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
      <h3 className="fs-five fw-semibold mb-3">Comments</h3>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {items.map((c) => (
            <div key={c.id} className="brn4 rounded-3 p-3">
              <div className="fs-nine n4-color mb-1">
                {c.authorName} · {new Date(c.createdAt).toLocaleString()}
              </div>
              <div dangerouslySetInnerHTML={{ __html: c.contentHtml }} />
            </div>
          ))}
          {items.length === 0 && <p className="n4-color">No comments yet.</p>}
        </div>
      )}

      <h4 className="fs-six fw-semibold mt-5">Leave a reply</h4>
      {msg && <p className="mt-2">{msg}</p>}
      <form onSubmit={onSubmit} className="d-flex flex-column gap-2 mt-3" autoComplete="off">
        {/* Honeypot */}
        <input type="text" name="website" className="d-none" tabIndex={-1} />
        <input name="name" placeholder="Name" required className="px-3 py-2 brn4 rounded-3" />
        <input name="email" placeholder="Email (optional)" type="email" className="px-3 py-2 brn4 rounded-3" />
        <textarea name="content" placeholder="Write your comment…" required rows={5} className="px-3 py-2 brn4 rounded-3" />
        <div ref={widgetRef} />
        <button className="p-btn bg1-color fw-medium n11-color px-3 py-2 rounded-pill" type="submit">Post comment</button>
      </form>

      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer onLoad={() => setTsReady(true)} />
    </div>
  );
}

