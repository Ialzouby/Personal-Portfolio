# Resend Email Integration Setup

This guide will help you set up Resend email integration for your contact form.

## Prerequisites

1. Create a Resend account at [https://resend.com](https://resend.com)
2. Get your API key from the Resend dashboard

## Setup Steps

### 1. Environment Variables

Create a `.env.local` file in your project root and add:

```env
RESEND_API_KEY=re_X8E8VvQx_AWpXnzfHfJnXNwtamj3KyAAT
```

### 2. Email Configuration ✅ COMPLETED

The email configuration has been updated with your email address:

```typescript
from: 'Portfolio Contact <onboarding@resend.dev>',
to: ['ialzouby@charlotte.edu'],
```

### 3. Domain Verification (Optional but Recommended)

For production use, verify your domain in Resend:
1. Go to your Resend dashboard
2. Navigate to Domains
3. Add and verify your domain
4. Update the `from` email in the API route to use your verified domain

### 4. Testing

1. Start your development server: `npm run dev`
2. Navigate to your contact page
3. Fill out and submit the contact form
4. Check your email for the received message

## Features

- ✅ Form validation
- ✅ Loading states
- ✅ Success/error notifications
- ✅ Form reset after successful submission
- ✅ Responsive design
- ✅ TypeScript support

## Troubleshooting

- **API Key Issues**: Make sure your Resend API key is correct and has proper permissions
- **Domain Issues**: For production, verify your domain in Resend dashboard
- **Email Not Received**: Check spam folder and Resend dashboard for delivery status
- **CORS Issues**: The API route is server-side, so CORS shouldn't be an issue

## Security Notes

- Never commit your `.env.local` file to version control
- The API key is only used server-side and is secure
- Form validation happens both client-side and server-side 