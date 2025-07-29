import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { name, email, phone, location, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

          // Send email using Resend
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