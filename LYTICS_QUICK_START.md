# 🚀 Lytics Quick Start Guide

Get Lytics tracking up and running in 5 minutes!

## Step 1: Get Your Account ID

1. Log in to [Lytics](https://app.lytics.io/)
2. Go to **Account Settings** → **API Tokens**
3. Copy your **Account ID**

## Step 2: Add Environment Variable

Create or update `.env.local`:

```bash
NEXT_PUBLIC_LYTICS_ACCOUNT_ID=your_account_id_here
```

## Step 3: Restart Server

```bash
npm run dev
```

## Step 4: Test It Works

Visit: `http://localhost:3000/en-us/test-lytics`

You should see:
- ✅ "Lytics SDK is loaded and ready!"
- ✅ Your User ID
- ✅ Interactive test buttons

## Step 5: Add Tracking to Your Components

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';

export default function MyComponent() {
  const lytics = useLytics();

  const handleClick = () => {
    if (lytics) {
      lytics.send('button_clicked', {
        button_name: 'CTA',
        page: window.location.pathname
      });
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

## Common Use Cases

### Track CTA Clicks

```typescript
if (lytics) {
  lytics.send('cta_clicked', {
    cta_name: 'Get Started',
    location: 'hero_banner'
  });
}
```

### Identify Users (on login)

```typescript
if (lytics && user) {
  lytics.identify({
    email: user.email,
    name: user.name,
    user_type: 'premium'
  });
}
```

### Track Form Submissions

```typescript
if (lytics) {
  lytics.send('form_submitted', {
    form_name: 'contact_form',
    email: formData.get('email')
  });
}
```

### Track UTM Parameters

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

## Verify Tracking

### 1. Browser Console

Open DevTools → Console

You should see: "Lytics: Initialized successfully"

### 2. Network Tab

Open DevTools → Network → Filter "lytics"

You should see POST requests when events are tracked

### 3. Lytics Dashboard

1. Log in to Lytics
2. Go to **Data** → **Streams**
3. You should see events appearing in real-time

## Next Steps

- 📖 Read the [Complete Integration Guide](./LYTICS_INTEGRATION.md)
- 🧪 Experiment with the [Test Page](http://localhost:3000/en-us/test-lytics)
- 💻 Check out [Usage Examples](./LYTICS_INTEGRATION.md#usage-examples)

## Troubleshooting

**Issue:** "Lytics Not Configured" message

**Fix:** 
1. Check `.env.local` has `NEXT_PUBLIC_LYTICS_ACCOUNT_ID`
2. Restart dev server

**Issue:** Events not showing in Lytics

**Fix:**
1. Verify Account ID is correct
2. Check browser console for errors
3. Check Network tab for blocked requests
4. Disable ad blockers

---

**✅ Done!** You're now tracking user behavior with Lytics.


