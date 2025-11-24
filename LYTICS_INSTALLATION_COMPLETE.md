# ✅ Lytics Web SDK Installation Complete!

The Lytics Web SDK has been successfully integrated into your Next.js application!

## 📦 What Was Installed

### Core Files

1. **`components/LyticsScript.tsx`**
   - Loads and initializes the Lytics SDK
   - Automatically sends page views
   - Includes TypeScript declarations for window.jstag
   - Handles missing configuration gracefully

2. **`components/context/LyticsContext.tsx`**
   - React Context Provider for Lytics SDK
   - `useLytics()` hook for easy access
   - `withLytics()` HOC for class components
   - Full TypeScript type definitions

3. **`components/examples/LyticsExample.tsx`**
   - Interactive demo component
   - Shows all tracking capabilities
   - Includes code examples
   - Real-time testing interface

4. **`app/[lang]/test-lytics/page.tsx`**
   - Test page at `/en-us/test-lytics`
   - Verify integration works
   - Interactive testing

### Layout Integration

**`app/[lang]/layout.tsx`** - Updated with:
- `<LyticsScript />` - SDK initialization
- `<LyticsProvider>` - Context wrapper
- Works alongside existing PersonalizeProvider

### Documentation

1. **`LYTICS_INTEGRATION.md`** - Complete integration guide:
   - Overview and features
   - Configuration steps
   - Usage examples (CTA, forms, e-commerce, etc.)
   - API reference
   - Best practices
   - Troubleshooting

2. **`LYTICS_QUICK_START.md`** - 5-minute setup guide:
   - Step-by-step instructions
   - Common use cases
   - Quick verification
   - Troubleshooting

---

## 🚀 Quick Start

### 1. Configure Environment Variable

Add to `.env.local`:

```bash
NEXT_PUBLIC_LYTICS_ACCOUNT_ID=ea3cf6b786f0f24b517bdd2c914f392b
```

> **Note:** Replace with your actual Lytics Account ID

### 2. Restart Development Server

```bash
npm run dev
```

### 3. Test the Integration

Visit: **http://localhost:3000/en-us/test-lytics**

Expected:
- ✅ "Lytics SDK is loaded and ready!"
- ✅ Your Lytics User ID displayed
- ✅ Interactive buttons that track events

---

## 💻 Usage Examples

### Track Button Click

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function MyButton() {
  const lytics = useLytics();

  const handleClick = () => {
    if (lytics) {
      lytics.send('button_clicked', {
        button_name: 'Get Started',
        page: window.location.pathname
      });
    }
  };

  return <button onClick={handleClick}>Get Started</button>;
}
```

### Identify User (on Login)

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { useEffect } from 'react';

export default function UserDashboard({ user }) {
  const lytics = useLytics();

  useEffect(() => {
    if (lytics && user) {
      lytics.identify({
        email: user.email,
        name: user.name,
        user_id: user.id,
        subscription_tier: user.tier
      });
    }
  }, [lytics, user]);

  return <div>Welcome, {user.name}!</div>;
}
```

### Track Form Submission

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function ContactForm() {
  const lytics = useLytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lytics) {
      lytics.send('form_submitted', {
        form_name: 'contact_form',
        form_type: 'lead_generation'
      });
    }

    // Submit logic here
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track E-commerce Events

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function ProductCard({ product }) {
  const lytics = useLytics();

  const trackAddToCart = () => {
    if (lytics) {
      lytics.send('product_added_to_cart', {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        currency: 'USD'
      });
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={trackAddToCart}>Add to Cart</button>
    </div>
  );
}
```

### Track UTM Parameters

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CampaignTracker() {
  const lytics = useLytics();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (lytics) {
      const utmParams = {
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign')
      };

      const hasUTM = Object.values(utmParams).some(v => v !== null);
      
      if (hasUTM) {
        lytics.identify(utmParams);
      }
    }
  }, [lytics, searchParams]);

  return null;
}
```

---

## 🎯 Key Features

### ✅ Automatic Setup
- SDK loads automatically on page load
- Page views tracked automatically
- No manual initialization needed

### ✅ TypeScript Support
- Full type definitions included
- IntelliSense support in VSCode
- Type-safe API

### ✅ React Integration
- Context-based access
- Custom hooks (`useLytics`)
- HOC for class components

### ✅ Error Handling
- Graceful fallback if SDK not loaded
- Warnings for missing configuration
- Null checks built-in

### ✅ Best Practices
- Follows Next.js patterns
- Matches existing Personalize integration
- Production-ready code

---

## 📊 What You Can Track

### User Actions
- ✅ Button clicks
- ✅ Link clicks
- ✅ Form submissions
- ✅ Downloads
- ✅ Video engagement
- ✅ Scroll depth

### E-commerce
- ✅ Product views
- ✅ Add to cart
- ✅ Purchases
- ✅ Search queries

### Marketing
- ✅ UTM parameters
- ✅ Campaign attribution
- ✅ Traffic sources
- ✅ Referrers

### User Behavior
- ✅ Page views
- ✅ Time on page
- ✅ Navigation patterns
- ✅ Feature usage

---

## 🔍 Verification Steps

### 1. Visual Verification

Visit test page: `http://localhost:3000/en-us/test-lytics`

**Should see:**
- ✅ Green success message
- ✅ Your Lytics User ID
- ✅ Working test buttons

### 2. Console Verification

Open browser DevTools → Console

**Should see:**
```
Lytics: Initialized successfully
```

### 3. Network Verification

Open DevTools → Network tab → Filter "lytics"

**Should see:**
- ✅ Request to `c.lytics.io` (SDK load)
- ✅ POST requests when tracking events

### 4. Lytics Dashboard Verification

1. Log in to [Lytics](https://app.lytics.io/)
2. Navigate to **Data** → **Streams**
3. **Should see:** Events appearing in real-time

---

## 🛠️ Configuration

### Environment Variables

Only one variable needed:

```bash
# .env.local
NEXT_PUBLIC_LYTICS_ACCOUNT_ID=your_account_id_here
```

**Get your Account ID:**
1. Log in to Lytics
2. Go to **Account Settings** → **API Tokens**
3. Copy the **Account ID**

### Provider Hierarchy

The integration follows this structure:

```tsx
<html>
  <body>
    <LyticsScript />          {/* Loads SDK */}
    <PersonalizeProvider>     {/* Existing */}
      <LyticsProvider>        {/* New - Provides SDK access */}
        <RTLProvider>
          <YourApp />
        </RTLProvider>
      </LyticsProvider>
    </PersonalizeProvider>
  </body>
</html>
```

---

## 📚 Documentation References

### Quick Reference
- **Quick Start:** `LYTICS_QUICK_START.md`
- **Complete Guide:** `LYTICS_INTEGRATION.md`
- **Test Page:** `/en-us/test-lytics`

### Code References
- **SDK Loader:** `components/LyticsScript.tsx`
- **Context:** `components/context/LyticsContext.tsx`
- **Examples:** `components/examples/LyticsExample.tsx`

### External Links
- [Lytics Documentation](https://docs.lytics.com/)
- [Web SDK Reference](https://docs.lytics.com/docs/web-sdk)
- [Lytics Dashboard](https://app.lytics.io/)

---

## 🎓 Learning Path

### 1. Understand the Basics
Read: `LYTICS_QUICK_START.md`

### 2. Test the Integration
Visit: `/en-us/test-lytics` and click buttons

### 3. Review Examples
Check: `LYTICS_INTEGRATION.md` usage examples

### 4. Implement Tracking
Add to your components using `useLytics()` hook

### 5. Verify in Dashboard
Check Lytics dashboard for incoming data

---

## ⚡ Best Practices

### ✅ DO:
- Always check `if (lytics)` before using
- Use consistent event naming (snake_case)
- Include context in event data (page, timestamp)
- Identify users on login/signup
- Track UTM parameters
- Use TypeScript for type safety

### ❌ DON'T:
- Don't track PII without consent
- Don't use inconsistent naming
- Don't forget to check lytics exists
- Don't track excessive events
- Don't hardcode event properties

---

## 🐛 Troubleshooting

### Issue: "Lytics Not Configured"

**Cause:** Missing environment variable

**Fix:**
1. Add `NEXT_PUBLIC_LYTICS_ACCOUNT_ID` to `.env.local`
2. Restart server: `npm run dev`

### Issue: Events Not Appearing in Lytics

**Causes:**
- Wrong Account ID
- Ad blocker enabled
- Network issues

**Fixes:**
1. Verify Account ID is correct
2. Disable ad blockers
3. Check browser console for errors
4. Check Network tab for failed requests

### Issue: TypeScript Errors

**Cause:** Type definitions not loading

**Fix:**
Restart TypeScript server in VSCode:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

---

## 🎉 Next Steps

### 1. Add Tracking to Key Components
Start with high-value actions:
- CTA buttons
- Form submissions
- Product interactions

### 2. Identify Your Users
Add identification to login/signup flows

### 3. Track Campaign Parameters
Add UTM tracking to landing pages

### 4. Build Segments
Use tracked data to create audience segments in Lytics

### 5. Personalize Experiences
Combine with Contentstack Personalize for targeted content

---

## 📞 Support

### Internal Resources
- Test page: `/en-us/test-lytics`
- Quick start: `LYTICS_QUICK_START.md`
- Full guide: `LYTICS_INTEGRATION.md`

### External Resources
- [Lytics Help Center](https://www.lytics.com/support/)
- [Community Forum](https://community.lytics.com/)
- [API Documentation](https://docs.lytics.com/)

---

## 🚀 You're Ready!

The Lytics Web SDK is fully integrated and ready to use. Start tracking user behavior and building better customer experiences!

**Quick Links:**
- 🧪 [Test Page](http://localhost:3000/en-us/test-lytics)
- 📖 [Quick Start Guide](./LYTICS_QUICK_START.md)
- 📚 [Complete Integration Guide](./LYTICS_INTEGRATION.md)
- 🎯 [Lytics Dashboard](https://app.lytics.io/)

---

**Files Installed:**
- ✅ `components/LyticsScript.tsx`
- ✅ `components/context/LyticsContext.tsx`
- ✅ `components/examples/LyticsExample.tsx`
- ✅ `app/[lang]/test-lytics/page.tsx`
- ✅ `app/[lang]/layout.tsx` (updated)
- ✅ `LYTICS_INTEGRATION.md`
- ✅ `LYTICS_QUICK_START.md`
- ✅ `LYTICS_INSTALLATION_COMPLETE.md` (this file)

**Configuration Needed:**
1. Add `NEXT_PUBLIC_LYTICS_ACCOUNT_ID` to `.env.local`
2. Restart dev server

**That's it!** 🎊


