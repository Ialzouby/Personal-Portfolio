import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { prisma } from '@/lib/prisma';

const md = new MarkdownIt({ linkify: true, breaks: true });
const SALT = process.env.SALT_IP_HASH || "";

const Body = z.object({
  postSlug: z.string().min(1).max(200),
  authorName: z.string().min(1).max(60),
  authorEmail: z.string().email().optional(),
  content: z.string().min(3).max(2000),
  honeypot: z.string().optional(),
  turnstileToken: z.string().min(10),
});

function hashIp(ip: string) {
  return crypto.createHash("sha256").update(SALT + ip).digest("hex");
}

async function verifyTurnstile(token: string, ip?: string) {
  try {
    const r = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET || "",
          response: token,
          remoteip: ip ?? "",
        }),
        // Avoid Next.js caching
        cache: "no-store",
      }
    );
    const data = await r.json();
    return !!(data && data.success);
  } catch {
    return false;
  }
}

async function checkRate(ipHash: string, slug: string) {
  const window30s = new Date(Date.now() - 30 * 1000);
  const window1h = new Date(Date.now() - 60 * 60 * 1000);

  const [last30s, last1h] = await Promise.all([
    prisma.rateEvent.count({
      where: { ipHash, postSlug: slug, createdAt: { gte: window30s } },
    }),
    prisma.rateEvent.count({
      where: { ipHash, postSlug: slug, createdAt: { gte: window1h } },
    }),
  ]);

  if (last30s > 0) return "Too fast. Please wait a bit.";
  if (last1h >= 5) return "Rate limit exceeded. Try later.";

  await prisma.rateEvent.create({ data: { ipHash, postSlug: slug } });
  return null;
}

export async function POST(req: NextRequest) {
  // Same-origin enforcement
  const origin = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  const site = process.env.NEXT_PUBLIC_SITE_URL || origin;
  if (!site || !referer || !referer.startsWith(site)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 400 });
  }

  const ip =
    // @ts-ignore
    req.ip || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "0.0.0.0";

  const parsed = Body.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json({ error: "Bad input" }, { status: 400 });

  const {
    postSlug,
    authorName,
    authorEmail,
    content,
    honeypot,
    turnstileToken,
  } = parsed.data;

  if (honeypot) return NextResponse.json({ ok: true }, { status: 200 });

  // CAPTCHA
  const captchaOk = await verifyTurnstile(turnstileToken, ip);
  if (!captchaOk)
    return NextResponse.json({ error: "Captcha failed" }, { status: 400 });

  const ipHash = hashIp(ip);

  // Rate limit
  const rl = await checkRate(ipHash, postSlug);
  if (rl) return NextResponse.json({ error: rl }, { status: 429 });

  // Limit link spam
  const urlCount = (content.match(/https?:\/\//g) || []).length;
  if (urlCount > 2)
    return NextResponse.json({ error: "Too many links" }, { status: 400 });

  // Render Markdown then sanitize
  const html = sanitizeHtml(md.render(content), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "nofollow noopener",
        target: "_blank",
      }),
    },
  });

  const emailHash = authorEmail
    ? crypto
        .createHash("md5")
        .update(authorEmail.trim().toLowerCase())
        .digest("hex")
    : null;

  await prisma.comment.create({
    data: {
      postSlug,
      authorName,
      authorEmail,
      emailHash,
      contentMd: content,
      contentHtml: html,
      isApproved: false,
      isSpam: false,
      ipHash,
      userAgent: req.headers.get("user-agent") || null,
    },
  });

  return NextResponse.json({ ok: true, pending: true });
}

export async function GET(req: NextRequest) {
  const slug = new URL(req.url).searchParams.get("slug") || "";
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const items = await prisma.comment.findMany({
    where: { postSlug: slug, isApproved: true, isSpam: false },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(items);
}

