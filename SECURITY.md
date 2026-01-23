# 🛡️ Form Security Documentation

## Overview
This document outlines the multi-layered security measures implemented to protect the contact form from spam and malicious submissions.

## Security Layers

### 1. **Honeypot Field** 🍯
- **What it does**: Adds a hidden field that's invisible to humans but visible to bots
- **How it works**: If the hidden field is filled, the submission is silently rejected
- **Location**: `src/components/Pages/Contact/GetInTouch.tsx`
- **Effectiveness**: Blocks 40-60% of simple bots

```typescript
// Hidden honeypot field
<input
  type="text"
  name="website"
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

### 2. **Time-Based Validation** ⏱️
- **What it does**: Ensures the form takes at least 3 seconds to fill
- **How it works**: Tracks form load time and submission time
- **Why**: Bots typically submit forms instantly
- **Threshold**: Minimum 3 seconds
- **Effectiveness**: Blocks most automated spam bots

### 3. **Rate Limiting** 🚦
- **What it does**: Limits submissions per IP address
- **Limits**: 
  - Maximum 3 submissions per hour per IP
  - 1-hour cooldown window
- **Response**: Returns 429 status with retry time
- **Storage**: In-memory Map (consider Redis for production scaling)

```typescript
const MAX_REQUESTS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
```

### 4. **Spam Content Detection** 🔍
The system analyzes message content for common spam indicators:

#### A. URL Detection
- Rejects messages with more than 2 URLs
- Protects against link spam and phishing

#### B. Spam Keyword Filtering
Blocks messages containing:
- Pharmaceutical spam (viagra, cialis)
- Financial scams (cryptocurrency, forex, binary option)
- Get-rich-quick schemes (lottery, prize, winner)
- Weight loss/diet supplements
- Aggressive marketing (buy now, click here, act now)

#### C. Pattern Analysis
- **Character Repetition**: Blocks messages with 10+ repeated characters
- **ALL CAPS Detection**: Flags messages >70% uppercase
- **Minimum Length**: Requires at least 10 characters
- **Maximum Length**: Limits to 5000 characters

#### D. Disposable Email Detection
Blocks common temporary email services:
- tempmail, throwaway, guerrillamail
- mailinator, 10minutemail, fakeinbox
- trashmail, and similar services

### 5. **Enhanced Validation** ✅
- **Email Format**: Validates proper email structure
- **Required Fields**: Enforces name, email, and message
- **Length Limits**: 
  - Name: max 100 characters
  - Email: max 100 characters
  - Message: max 5000 characters

### 6. **Server-Side Logging** 📝
All security events are logged:
```
🛡️ Honeypot triggered - spam blocked
🛡️ Too fast submission - spam blocked
🛡️ Rate limit exceeded for IP: xxx.xxx.xxx.xxx
🛡️ Spam detected from IP: xxx.xxx.xxx.xxx. Reason: [reason]
✅ Email sent successfully from email@example.com (IP: xxx.xxx.xxx.xxx)
```

## Configuration

### Environment Variables
```env
RESEND_API_KEY=your_resend_api_key_here
```

### Adjusting Security Settings

#### Change Rate Limits
Edit `/src/app/api/send-email/route.ts`:
```typescript
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // Change time window
const MAX_REQUESTS_PER_WINDOW = 3; // Change max requests
```

#### Adjust Time Validation
Edit `/src/components/Pages/Contact/GetInTouch.tsx`:
```typescript
if (formFillTime < 3000) { // Change minimum time in milliseconds
```

#### Modify Spam Keywords
Edit the `spamKeywords` array in `/src/app/api/send-email/route.ts`

## Testing Security Features

### Test Honeypot
1. Open browser DevTools Console
2. Fill form normally - should work
3. Use console to fill honeypot: 
   ```javascript
   document.querySelector('input[name="website"]').value = 'spam'
   ```
4. Submit - should be silently blocked

### Test Rate Limiting
1. Submit form 3 times within an hour
2. 4th submission should be rejected with error message

### Test Time Validation
1. Fill form immediately after page load
2. Submit within 3 seconds - should show error

### Test Spam Detection
Try submitting messages with:
- Multiple URLs
- Spam keywords like "viagra", "casino"
- ALL CAPS TEXT
- Very short messages (< 10 chars)

## Monitoring & Analytics

### View Security Logs
Check your server/deployment logs for security events:
```bash
# If using Vercel
vercel logs

# If using local dev
# Check terminal output
```

### Success Rate Analysis
Monitor these metrics:
- Total form submissions
- Blocked submissions (check logs for 🛡️ emoji)
- Success rate after implementing security

## Future Enhancements

### Recommended Additional Security

1. **Google reCAPTCHA v3**
   - Invisible CAPTCHA
   - Score-based risk assessment
   - No user interaction required

2. **Redis for Rate Limiting**
   - Better for production at scale
   - Persistent across server restarts
   - Distributed rate limiting

3. **Email Verification**
   - Send confirmation email
   - Verify email ownership
   - Double opt-in system

4. **IP Reputation Services**
   - Check against known spam IPs
   - Use services like IPQualityScore or AbuseIPDB

5. **Machine Learning Spam Detection**
   - Train model on spam vs. legitimate messages
   - Adaptive learning over time

6. **CSRF Protection**
   - Generate tokens per session
   - Validate token on submission

## Security Best Practices

✅ **Currently Implemented:**
- Multi-layer defense
- Server-side validation
- Rate limiting
- Content analysis
- Logging and monitoring

⚠️ **Important Notes:**
- Rate limiting is in-memory (resets on server restart)
- Consider external services for production
- Regularly update spam keyword lists
- Monitor logs for false positives

## Support & Updates

For issues or suggestions, please review the security logs and adjust thresholds as needed. The system is designed to be configurable and can be tuned based on your specific spam patterns.

---

**Last Updated**: January 2026
**Maintained By**: Issam Alzouby
