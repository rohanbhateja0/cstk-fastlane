# Newsletter Subscription Form

## Overview

The newsletter subscription system allows visitors to subscribe to news updates by filling out a form. When users click "Subscribe to receive news posts" in the News Banner, they are taken to a dedicated subscription form where they can enter their information.

## Features

- ✅ **Form-Based Subscription** - Dedicated page with a beautiful form
- ✅ **Data Collection** - Captures first name, last name, email, and phone number
- ✅ **Contentstack Integration** - Stores submissions as entries
- ✅ **Email Validation** - Built-in validation for email addresses
- ✅ **Success Feedback** - Shows confirmation message and auto-redirects
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Responsive Design** - Works on all devices

---

## How It Works

### User Flow

1. **User clicks "Subscribe to receive news posts"** in the News Banner on `/news` page
2. **Redirected to `/newsletter-subscribe`** - Beautiful form page
3. **Fills out the form:**
   - First Name (required)
   - Last Name (required)
   - Email (required, validated)
   - Phone Number (optional)
4. **Submits the form** - Data sent to Contentstack
5. **Success message displayed** - Auto-redirects to `/news` after 3 seconds

### Technical Flow

```
News Banner (CTA) → /newsletter-subscribe → API Route → Contentstack Entry → Success
```

---

## Contentstack Content Type

### `newsletter_subscription`

**Fields:**
- `title` (text, required) - Auto-generated: "{First Name} {Last Name} - {Email}"
- `first_name` (text, required) - Customer's first name
- `last_name` (text, required) - Customer's last name
- `email` (text, required) - Email address with validation
- `phone_number` (text, optional) - Phone number
- `subscription_status` (dropdown) - Status: active, inactive, unsubscribed
- `subscribed_at` (datetime) - Timestamp of subscription

---

## Components

### 1. Form Page: `app/newsletter-subscribe/page.tsx`

**Features:**
- Client-side form with React state management
- Real-time validation
- Loading states and error handling
- Success confirmation with auto-redirect
- Cancel button to return to news page

**Key Functions:**
```typescript
handleSubmit() - Validates and submits form data
handleChange() - Updates form state and clears errors
```

### 2. API Route: `app/api/newsletter-subscribe/route.ts`

**Endpoint:** `POST /api/newsletter-subscribe`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1 (555) 123-4567"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!",
  "entry_uid": "blt1234567890abcdef"
}
```

**Response (Error):**
```json
{
  "error": "Please provide a valid email address"
}
```

**Validation:**
- Checks required fields (firstName, lastName, email)
- Validates email format using regex
- Returns appropriate error messages

---

## Configuration

### News Banner Setup

**Update the News Banner CTA link:**

```typescript
// In Contentstack CMS
News Banner Entry > Call to Action > Link
- Title: "Subscribe to receive news posts"
- Href: "/newsletter-subscribe"
```

**Already configured in:** Entry UID `bltc2b666c403655ce3`

---

## Viewing Submissions

### In Contentstack CMS

1. Navigate to **Content Models** → **Newsletter Subscription**
2. View all entries in the list
3. Each entry shows:
   - Title: "{First Name} {Last Name} - {Email}"
   - Submission date
   - Status

### Entry Details

Click on any entry to see:
- Customer's full information
- Subscription timestamp
- Status (active/inactive/unsubscribed)

---

## Customization

### Styling

The form uses Tailwind CSS and can be customized in:
```
app/newsletter-subscribe/page.tsx
```

**Current Design:**
- Background: Gradient sky-950 to sky-800
- Form: White card with shadow
- Primary color: Sky-600 (Contentstack blue)
- Fonts: Zodiak (headings), Satoshi (body)

### Form Fields

To add/remove fields:

1. **Update Content Type** in Contentstack:
   ```bash
   Add new field to newsletter_subscription content type
   ```

2. **Update Form State**:
   ```typescript
   // app/newsletter-subscribe/page.tsx
   const [formData, setFormData] = useState({
     // Add your new field here
     newField: '',
   });
   ```

3. **Update API Route**:
   ```typescript
   // app/api/newsletter-subscribe/route.ts
   const entryData = {
     // Add your new field here
     new_field: req.body.newField,
   };
   ```

---

## Testing

### Test the Form Locally

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:**
   ```
   http://localhost:3000/newsletter-subscribe
   ```

3. **Test scenarios:**
   - ✅ Submit with all fields filled
   - ✅ Submit without required fields (should show error)
   - ✅ Submit with invalid email (should show error)
   - ✅ Submit with optional phone number empty
   - ✅ Click cancel button (should redirect to /news)
   - ✅ Check success message appears
   - ✅ Verify auto-redirect after success

### Verify in Contentstack

1. Open Contentstack CMS
2. Go to **Newsletter Subscription** content type
3. Check that new entry was created
4. Verify all fields are populated correctly

---

## API Integration

### Using the API Programmatically

```javascript
// Example: Submit from external source
const response = await fetch('https://yoursite.com/api/newsletter-subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1 (555) 987-6543',
  }),
});

const data = await response.json();
console.log(data.message); // "Thank you for subscribing to our newsletter!"
```

---

## Security Considerations

### Current Protections

1. **Server-Side Validation**
   - Email format validation
   - Required field checks
   - Type checking

2. **Rate Limiting** (Recommended)
   - Consider adding rate limiting to prevent spam
   - Implement CAPTCHA for production

3. **Environment Variables**
   - API keys stored securely in `.env.local`
   - Not exposed to client-side code

### Recommended Enhancements

```typescript
// Add to API route for production
import rateLimit from 'express-rate-limit';
import { validateRecaptcha } from '@/lib/recaptcha';

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

// In POST handler
const recaptchaValid = await validateRecaptcha(req.body.recaptchaToken);
if (!recaptchaValid) {
  return NextResponse.json({ error: 'Invalid captcha' }, { status: 400 });
}
```

---

## Environment Variables

Ensure these are set in `.env.local`:

```bash
# Contentstack Management API
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
CONTENTSTACK_REGION=NA  # or EU
```

---

## Troubleshooting

### Issue 1: Form Not Submitting

**Symptoms:** Form shows no response when clicking submit

**Solution:**
1. Check browser console for errors
2. Verify API route is accessible: `http://localhost:3000/api/newsletter-subscribe`
3. Check environment variables are set
4. Verify Contentstack credentials have correct permissions

### Issue 2: Entry Not Created in Contentstack

**Symptoms:** Form shows success but no entry in CMS

**Solution:**
1. Check API route console logs for errors
2. Verify management token has "write" permissions
3. Check content type UID is correct: `newsletter_subscription`
4. Verify all required fields are being sent

### Issue 3: Email Validation Failing

**Symptoms:** Valid emails show "invalid email" error

**Solution:**
- Check email regex pattern in API route
- Current pattern: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- Adjust pattern if needed for your requirements

---

## Future Enhancements

### Potential Features

1. **Email Confirmation**
   - Send confirmation email after subscription
   - Require email verification before activating

2. **Unsubscribe Link**
   - Add unsubscribe page
   - Update subscription_status to "unsubscribed"

3. **Preferences**
   - Allow users to select news categories
   - Set frequency preferences

4. **Double Opt-In**
   - Send verification email
   - Only activate after email confirmation

5. **Analytics**
   - Track subscription conversion rate
   - Monitor form abandonment

6. **Integration with Email Service**
   - Sync to Mailchimp/SendGrid
   - Automated email campaigns

---

## Quick Reference

### Key Files

```
📁 Project Structure
├── app/
│   ├── newsletter-subscribe/
│   │   └── page.tsx                    # Form page component
│   └── api/
│       └── newsletter-subscribe/
│           └── route.ts                # API endpoint
├── components/
│   └── NewsBanner.tsx                  # CTA button location
└── docs/
    └── pages/
        └── features/
            └── newsletter-subscription.md  # This file
```

### URLs

- Form Page: `/newsletter-subscribe`
- API Endpoint: `/api/newsletter-subscribe` (POST)
- News Page: `/news`

---

## Success Criteria

✅ **Feature is complete when:**

- [x] Content type created in Contentstack
- [x] API route handles form submissions
- [x] Form page is accessible and functional
- [x] News Banner links to form
- [x] Submissions create entries in Contentstack
- [x] Success message displays
- [x] User redirects to news page
- [x] All fields validate correctly
- [x] Error messages are user-friendly

---

**Implementation Complete! 🎉**

Users can now subscribe to your newsletter by clicking the button in the News Banner!

