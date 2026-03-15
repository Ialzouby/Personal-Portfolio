import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "missing_api_key_at_build_time");

// ========================================
// 🛡️ SECURITY: Rate Limiting
// ========================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per hour per IP

function checkRateLimit(ip: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const remainingTime = Math.ceil((record.resetTime - now) / 1000 / 60); // minutes
    return { allowed: false, remainingTime };
  }

  // Increment count
  record.count++;
  return { allowed: true };
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
        cache: "no-store",
      }
    );
    const data = await r.json();
    return !!(data && data.success);
  } catch {
    return false;
  }
}

// ========================================
// 🛡️ SECURITY: Spam Detection
// ========================================
function detectSpam(name: string, email: string, message: string): { isSpam: boolean; reason?: string } {
  // 1. Check for excessive URLs
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const urlMatches = message.match(urlPattern) || [];
  if (urlMatches.length > 2) {
    return { isSpam: true, reason: 'Too many URLs detected' };
  }

  // 2. Check for common spam keywords
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'prize', 'winner',
    'click here', 'buy now', 'limited time', 'act now',
    'cryptocurrency', 'crypto investment', 'forex', 'binary option',
    'weight loss', 'diet pill', 'supplement',
  ];
  const lowerMessage = message.toLowerCase();
  const lowerName = name.toLowerCase();

  for (const keyword of spamKeywords) {
    if (lowerMessage.includes(keyword) || lowerName.includes(keyword)) {
      return { isSpam: true, reason: 'Spam keywords detected' };
    }
  }

  // 3. Check for excessive repetition (same character repeated)
  if (/(.)\1{10,}/.test(message)) {
    return { isSpam: true, reason: 'Excessive character repetition' };
  }

  // 4. Check for all caps (more than 70% uppercase)
  const uppercaseCount = (message.match(/[A-Z]/g) || []).length;
  const totalLetters = (message.match(/[A-Za-z]/g) || []).length;
  if (totalLetters > 20 && (uppercaseCount / totalLetters) > 0.7) {
    return { isSpam: true, reason: 'Excessive uppercase text' };
  }

  // 5. Check for very short messages (likely spam)
  if (message.trim().length < 10) {
    return { isSpam: true, reason: 'Message too short' };
  }

  // 6. Check for suspicious email patterns (temporary/disposable emails)
  const suspiciousEmailPatterns = [
    'tempmail', 'throwaway', 'guerrillamail', 'mailinator',
    '10minutemail', 'fakeinbox', 'trashmail'
  ];
  const lowerEmail = email.toLowerCase();
  for (const pattern of suspiciousEmailPatterns) {
    if (lowerEmail.includes(pattern)) {
      return { isSpam: true, reason: 'Suspicious email domain' };
    }
  }

  return { isSpam: false };
}

// Email template function
const createEmailTemplate = (name: string, email: string, phone: string, location: string, message: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; text-align: center; font-size: 28px;">New Contact Form Submission</h1>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 4px solid #667eea;">
        <h2 style="color: #333; margin-top: 0;">Contact Information</h2>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #667eea;">Name:</strong>
          <span style="margin-left: 10px;">${name}</span>
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #667eea;">Email:</strong>
          <span style="margin-left: 10px;">
            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
          </span>
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #667eea;">Phone:</strong>
          <span style="margin-left: 10px;">${phone || 'Not provided'}</span>
        </div>
        
        <div style="margin-bottom: 20px;">
          <strong style="color: #667eea;">Location:</strong>
          <span style="margin-left: 10px;">${location || 'Not provided'}</span>
        </div>
        
        <div>
          <strong style="color: #667eea;">Message:</strong>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 10px; border: 1px solid #e9ecef;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <p style="color: #666; margin: 0; font-size: 14px;">
          This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${email}" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reply to ${name}
        </a>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, location, message, _timestamp, _fillTime, turnstileToken } = body;

    // ========================================
    // 🛡️ SECURITY CHECK 1: Rate Limiting
    // ========================================
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      console.log(`🛡️ Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rateLimitCheck.remainingTime} minutes.`
        },
        { status: 429 }
      );
    }

    // ========================================
    // 🛡️ SECURITY CHECK 1.5: Turnstile Verification
    // ========================================
    if (!turnstileToken) {
      return NextResponse.json({ error: "Captcha validation missing" }, { status: 400 });
    }
    const captchaOk = await verifyTurnstile(turnstileToken, ip);
    if (!captchaOk) {
      console.log(`🛡️ Captcha failed for IP: ${ip}`);
      return NextResponse.json({ error: "Captcha validation failed" }, { status: 400 });
    }

    // ========================================
    // 🛡️ SECURITY CHECK 2: Required Fields
    // ========================================
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // ========================================
    // 🛡️ SECURITY CHECK 3: Email Format
    // ========================================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // ========================================
    // 🛡️ SECURITY CHECK 4: Form Fill Time
    // ========================================
    if (_fillTime && _fillTime < 3000) {
      console.log(`🛡️ Suspicious form fill time: ${_fillTime}ms from IP: ${ip}`);
      return NextResponse.json(
        { error: 'Please take your time filling out the form' },
        { status: 400 }
      );
    }

    // ========================================
    // 🛡️ SECURITY CHECK 5: Spam Detection
    // ========================================
    const spamCheck = detectSpam(name, email, message);
    if (spamCheck.isSpam) {
      console.log(`🛡️ Spam detected from IP: ${ip}. Reason: ${spamCheck.reason}`);
      return NextResponse.json(
        { error: 'Your message appears to be spam. Please revise and try again.' },
        { status: 400 }
      );
    }

    // ========================================
    // 🛡️ SECURITY CHECK 6: Length Validation
    // ========================================
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input exceeds maximum length' },
        { status: 400 }
      );
    }

    // ========================================
    // ✅ ALL CHECKS PASSED - Send Email
    // ========================================
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['ialzouby@charlotte.edu'],
      subject: `New Contact Form Submission from ${name}`,
      html: createEmailTemplate(name, email, phone, location, message),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log(`✅ Email sent successfully from ${email} (IP: ${ip})`);
    return NextResponse.json(
      {
        message: 'Email sent successfully! I\'ll get back to you soon.',
        data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
} 