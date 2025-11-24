# 🎯 Lytics Web SDK Integration

Complete guide for using Lytics Web SDK in your Next.js application for behavioral tracking, user identification, and personalization.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

### What is Lytics?

Lytics is a Customer Data Platform (CDP) that helps you:
- Track user behavior across your website
- Build unified customer profiles
- Create audience segments
- Deliver personalized experiences
- Measure marketing campaign effectiveness

### What's Included

This integration provides:
- ✅ **LyticsScript** - Automatic SDK loading and initialization
- ✅ **LyticsContext** - React context for accessing Lytics SDK
- ✅ **useLytics** Hook - Easy-to-use React hook
- ✅ **TypeScript** Support - Full type definitions
- ✅ **Automatic** Page view tracking
- ✅ **Example** Components with usage patterns

---

## Quick Start

### 1. Get Your Lytics Account ID

1. Log in to your [Lytics account](https://app.lytics.io/)
2. Navigate to **Account Settings** → **API Tokens**
3. Copy your **Account ID** (looks like: `ea3cf6b786f0f24b517bdd2c914f392b`)

### 2. Configure Environment Variables

Add to your `.env.local` file:

```bash
# Lytics Configuration
NEXT_PUBLIC_LYTICS_ACCOUNT_ID=ea3cf6b786f0f24b517bdd2c914f392b
```

> **Note:** The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser.

### 3. Restart Development Server

```bash
npm run dev
```

### 4. Verify Integration

Visit the test page: `http://localhost:3000/en-us/test-lytics`

You should see:
- ✅ "Lytics SDK is loaded and ready!"
- ✅ Your Lytics User ID
- ✅ Interactive buttons for testing tracking

---

## Configuration

### Files Installed

The integration consists of these files:

```
components/
├── LyticsScript.tsx          # SDK loader (in layout)
├── context/
│   └── LyticsContext.tsx     # React context & hooks
└── examples/
    └── LyticsExample.tsx     # Usage examples

app/[lang]/
├── layout.tsx                # Updated with Lytics providers
└── test-lytics/
    └── page.tsx              # Test page
```

### Layout Integration

The Lytics SDK is integrated in `app/[lang]/layout.tsx`:

```typescript
import { LyticsProvider } from '@/components/context/LyticsContext';
import LyticsScript from '@/components/LyticsScript';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <LyticsScript />
        <LyticsProvider>
          {children}
        </LyticsProvider>
      </body>
    </html>
  );
}
```

### How It Works

1. **LyticsScript** loads the Lytics SDK on page load
2. **LyticsProvider** wraps your app and provides SDK access
3. **useLytics** hook gives components access to the SDK
4. **Automatic** page views are tracked on navigation

---

## Usage Examples

### Basic Event Tracking

Track custom events when users take actions:

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function CTAButton() {
  const lytics = useLytics();

  const handleClick = () => {
    // Track the click event
    if (lytics) {
      lytics.send('cta_clicked', {
        cta_name: 'Get Started',
        cta_location: 'hero_banner',
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
    
    // Continue with your click handler
    window.location.href = '/sign-up';
  };

  return (
    <button onClick={handleClick}>
      Get Started
    </button>
  );
}
```

### User Identification

Identify users when they log in or sign up:

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { useEffect } from 'react';

export default function UserProfile({ user }) {
  const lytics = useLytics();

  useEffect(() => {
    if (lytics && user) {
      // Identify the user with their attributes
      lytics.identify({
        email: user.email,
        name: user.name,
        user_id: user.id,
        subscription_tier: user.subscriptionTier,
        signup_date: user.signupDate,
        user_type: user.isPremium ? 'premium' : 'free',
        interests: user.interests || []
      });
    }
  }, [lytics, user]);

  return <div>Welcome, {user.name}!</div>;
}
```

### Form Tracking

Track form submissions:

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function ContactForm() {
  const lytics = useLytics();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Track form submission
    if (lytics) {
      lytics.send('form_submitted', {
        form_name: 'contact_form',
        form_type: 'lead_generation',
        email: formData.get('email'),
        company: formData.get('company'),
        page: window.location.pathname
      });
    }

    // Submit the form
    await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="company" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### E-commerce Tracking

Track product views and purchases:

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { useEffect } from 'react';

export default function ProductPage({ product }) {
  const lytics = useLytics();

  // Track product view
  useEffect(() => {
    if (lytics) {
      lytics.send('product_viewed', {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        product_price: product.price,
        currency: 'USD'
      });
    }
  }, [lytics, product]);

  const handleAddToCart = () => {
    if (lytics) {
      lytics.send('product_added_to_cart', {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        quantity: 1
      });
    }
    // Add to cart logic
  };

  const handlePurchase = () => {
    if (lytics) {
      lytics.send('purchase_completed', {
        order_id: 'ORDER-123',
        total_amount: product.price,
        currency: 'USD',
        products: [{
          product_id: product.id,
          product_name: product.name,
          quantity: 1,
          price: product.price
        }]
      });
    }
    // Purchase logic
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handlePurchase}>Buy Now</button>
    </div>
  );
}
```

### UTM Parameter Tracking

Track marketing campaign parameters:

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
        utm_campaign: searchParams.get('utm_campaign'),
        utm_term: searchParams.get('utm_term'),
        utm_content: searchParams.get('utm_content')
      };

      // Only send if at least one UTM parameter exists
      const hasUTM = Object.values(utmParams).some(v => v !== null);
      
      if (hasUTM) {
        lytics.identify(utmParams);
        lytics.send('campaign_visit', utmParams);
      }
    }
  }, [lytics, searchParams]);

  return null;
}
```

### Video Tracking

Track video engagement:

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function VideoPlayer({ videoId, videoTitle }) {
  const lytics = useLytics();

  const trackVideoEvent = (event: string, data = {}) => {
    if (lytics) {
      lytics.send(`video_${event}`, {
        video_id: videoId,
        video_title: videoTitle,
        ...data
      });
    }
  };

  return (
    <video
      onPlay={() => trackVideoEvent('play')}
      onPause={() => trackVideoEvent('pause')}
      onEnded={() => trackVideoEvent('completed')}
      onTimeUpdate={(e) => {
        const video = e.currentTarget;
        const percentWatched = (video.currentTime / video.duration) * 100;
        
        // Track 25%, 50%, 75% milestones
        if (percentWatched >= 25 && percentWatched < 30) {
          trackVideoEvent('progress', { percent_watched: 25 });
        }
        // ... similar for 50% and 75%
      }}
    >
      <source src={`/videos/${videoId}.mp4`} />
    </video>
  );
}
```

### Download Tracking

Track file downloads:

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function DownloadLink({ file }) {
  const lytics = useLytics();

  const handleDownload = () => {
    if (lytics) {
      lytics.send('file_downloaded', {
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        page: window.location.pathname
      });
    }
  };

  return (
    <a 
      href={file.url} 
      download 
      onClick={handleDownload}
    >
      Download {file.name}
    </a>
  );
}
```

---

## API Reference

### useLytics Hook

Access the Lytics SDK from any component:

```typescript
const lytics = useLytics();
```

**Returns:** `LyticsSDK | null`

### LyticsSDK Methods

#### send(eventName, data?)

Track a custom event.

```typescript
lytics.send('button_clicked', {
  button_name: 'CTA',
  page: '/homepage'
});
```

**Parameters:**
- `eventName` (string) - Name of the event
- `data` (object, optional) - Event properties

#### identify(attributes)

Identify a user with attributes.

```typescript
lytics.identify({
  email: 'user@example.com',
  name: 'John Doe',
  user_type: 'premium'
});
```

**Parameters:**
- `attributes` (object) - User attributes

#### pageView(data?)

Track a page view (usually automatic).

```typescript
lytics.pageView({
  page_title: 'Homepage',
  page_type: 'landing'
});
```

**Parameters:**
- `data` (object, optional) - Page view properties

#### getid(callback)

Get the Lytics user ID.

```typescript
lytics.getid((id) => {
  console.log('User ID:', id);
});
```

**Parameters:**
- `callback` (function) - Receives the user ID

#### setid(id)

Set a custom user ID.

```typescript
lytics.setid('custom-user-id-123');
```

**Parameters:**
- `id` (string) - User ID to set

#### loadEntity(entityName, callback)

Load an entity (user profile).

```typescript
lytics.loadEntity('user', (profile) => {
  console.log('Profile:', profile);
});
```

**Parameters:**
- `entityName` (string) - Entity type (usually 'user')
- `callback` (function) - Receives the entity data

#### getEntity(entityName)

Get a cached entity.

```typescript
const profile = lytics.getEntity('user');
```

**Parameters:**
- `entityName` (string) - Entity type

**Returns:** Entity data or undefined

---

## Best Practices

### 1. Always Check if Lytics is Loaded

```typescript
if (lytics) {
  lytics.send('event', data);
}
```

### 2. Track Meaningful Events

Focus on events that indicate user intent:
- ✅ CTA clicks
- ✅ Form submissions
- ✅ Video engagement
- ✅ Product interactions
- ❌ Mouse movements
- ❌ Scroll position (unless measuring engagement)

### 3. Use Consistent Event Names

```typescript
// Good - consistent naming
lytics.send('button_clicked', { button_name: 'CTA' });
lytics.send('form_submitted', { form_name: 'Contact' });

// Bad - inconsistent naming
lytics.send('ButtonClick', { name: 'CTA' });
lytics.send('formSubmit', { formname: 'Contact' });
```

### 4. Include Context in Event Data

```typescript
lytics.send('product_viewed', {
  product_id: '123',
  product_name: 'Widget',
  category: 'Tools',
  price: 29.99,
  currency: 'USD',
  page: window.location.pathname,  // ✅ Context
  referrer: document.referrer,      // ✅ Context
  timestamp: new Date().toISOString() // ✅ Context
});
```

### 5. Identify Users Early

Identify users as soon as you have their information:

```typescript
// On login
useEffect(() => {
  if (lytics && user) {
    lytics.identify({
      email: user.email,
      name: user.name,
      user_id: user.id
    });
  }
}, [lytics, user]);
```

### 6. Track UTM Parameters

Capture marketing attribution:

```typescript
useEffect(() => {
  if (lytics) {
    const params = new URLSearchParams(window.location.search);
    if (params.has('utm_source')) {
      lytics.identify({
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign')
      });
    }
  }
}, [lytics]);
```

### 7. Use TypeScript

Leverage type safety:

```typescript
interface ProductViewEvent {
  product_id: string;
  product_name: string;
  price: number;
  category: string;
}

const trackProductView = (data: ProductViewEvent) => {
  if (lytics) {
    lytics.send('product_viewed', data);
  }
};
```

### 8. Respect User Privacy

Check consent before tracking:

```typescript
const [hasConsent, setHasConsent] = useState(false);

useEffect(() => {
  const consent = localStorage.getItem('tracking_consent');
  setHasConsent(consent === 'true');
}, []);

const handleClick = () => {
  if (lytics && hasConsent) {
    lytics.send('button_clicked', data);
  }
};
```

---

## Troubleshooting

### Issue: "Lytics Not Configured" Message

**Cause:** Missing environment variable

**Solution:**
1. Add `NEXT_PUBLIC_LYTICS_ACCOUNT_ID` to `.env.local`
2. Restart dev server: `npm run dev`

### Issue: Events Not Appearing in Lytics

**Causes:**
- Account ID incorrect
- Lytics SDK not loaded
- Network blocked

**Solutions:**
1. Verify account ID in `.env.local`
2. Check browser console for errors
3. Open Network tab → Filter "lytics" → Check for requests
4. Verify no ad blockers are blocking Lytics

### Issue: TypeError: Cannot read property 'send' of null

**Cause:** Trying to use Lytics before it's loaded

**Solution:**
Always check if lytics exists:
```typescript
if (lytics) {
  lytics.send('event', data);
}
```

### Issue: User ID Not Persisting

**Cause:** Cookies being cleared or third-party cookie restrictions

**Solution:**
Use `setid` to set a custom ID:
```typescript
if (lytics && user) {
  lytics.setid(user.id);
}
```

### Issue: Duplicate Page Views

**Cause:** Manual pageView calls when automatic tracking is enabled

**Solution:**
Remove manual `pageView()` calls - the SDK tracks them automatically.

---

## Testing Your Integration

### 1. Visual Test

Visit: `http://localhost:3000/en-us/test-lytics`

Expected: Interactive test page with working buttons

### 2. Console Test

Open browser console and run:

```javascript
window.jstag.send('test_event', { test: true });
```

Expected: No errors, request in Network tab

### 3. Network Test

1. Open DevTools → Network tab
2. Filter by "lytics"
3. Navigate your site
4. Expected: POST requests to Lytics API

### 4. Lytics Dashboard Test

1. Log in to Lytics
2. Navigate to Data → Streams
3. Expected: Events appearing in real-time

---

## Additional Resources

- [Lytics Documentation](https://docs.lytics.com/)
- [Lytics Web SDK Reference](https://docs.lytics.com/docs/web-sdk)
- [Lytics Account Setup](https://app.lytics.io/)
- [Data Integration Guide](https://docs.lytics.com/docs/data-integration)

---

## Support

### Internal Resources
- Test Page: `/en-us/test-lytics`
- Example Component: `components/examples/LyticsExample.tsx`
- Context: `components/context/LyticsContext.tsx`

### External Resources
- [Lytics Support](https://www.lytics.com/support/)
- [Community Forum](https://community.lytics.com/)

---

**🎉 You're all set!** Start tracking user behavior and building better experiences with Lytics.


