# 🎯 Lytics vs Personalize: Working Together

Your website now has **TWO** powerful tools integrated - Lytics and Contentstack Personalize. Here's how they work together!

## 🤔 What's the Difference?

### Lytics (Customer Data Platform)
**Purpose:** Understand WHO your users are and WHAT they do

**Core Functions:**
- 📊 **Track** user behavior (clicks, views, purchases)
- 👤 **Identify** users across sessions and devices
- 🎯 **Build** unified customer profiles
- 📈 **Analyze** user journeys and patterns
- 🔍 **Segment** audiences based on behavior
- 🔗 **Integrate** with other marketing tools

**Think of it as:** Your customer intelligence system

### Contentstack Personalize
**Purpose:** DELIVER personalized content experiences

**Core Functions:**
- 🎨 **Create** content variants (A/B tests)
- 👥 **Define** audience rules
- 🚀 **Deliver** personalized content in real-time
- 📊 **Measure** experience performance
- 🏆 **Optimize** conversion rates
- 🎭 **Manage** multiple experiences simultaneously

**Think of it as:** Your content delivery engine

---

## 🤝 How They Work Together

### The Power Combo

```
User visits website
    ↓
[Lytics] Tracks behavior → Builds profile → Identifies segment
    ↓
[Personalize] Matches segment → Selects variant → Delivers content
    ↓
User sees personalized experience
    ↓
[Lytics] Tracks engagement → Updates profile
    ↓
[Personalize] Measures conversion
    ↓
Continuous optimization cycle
```

### Real-World Example

**Scenario:** E-commerce website selling shoes

#### Step 1: Lytics Tracks User
```typescript
// User clicks on running shoes
lytics.send('product_viewed', {
  category: 'running_shoes',
  price_range: 'premium'
});

// User adds item to cart but doesn't purchase
lytics.send('cart_abandoned', {
  cart_value: 150
});
```

**Lytics now knows:**
- User interested in running shoes
- Budget is premium ($100+)
- Has abandoned cart

#### Step 2: Personalize Delivers Content
```typescript
// Next time user visits, Personalize shows targeted experience
// Based on Lytics segment: "Premium Running Shoe Browsers"

personalize.triggerImpression('running_shoe_promo');
// Shows: "🏃 Complete your order - 20% off running shoes!"
```

**Result:** User sees relevant offer and completes purchase

#### Step 3: Lytics Tracks Conversion
```typescript
// User completes purchase
lytics.send('purchase_completed', {
  order_value: 120,
  converted_from: 'personalized_offer'
});
```

**Lytics now knows:**
- User converted from personalized offer
- Actual purchase amount
- User is a paying customer

---

## 📊 Integration Architecture

Your website setup:

```typescript
<html>
  <body>
    <LyticsScript />              {/* Loads Lytics SDK */}
    <PersonalizeProvider>         {/* Personalize context */}
      <LyticsProvider>            {/* Lytics context */}
        <YourApp>
          {/* Both SDKs available via hooks */}
          const lytics = useLytics();
          const personalize = usePersonalize();
        </YourApp>
      </LyticsProvider>
    </PersonalizeProvider>
  </body>
</html>
```

---

## 🎯 When to Use Each

### Use Lytics When You Want To:

✅ **Track user behavior**
```typescript
lytics.send('button_clicked', { button: 'CTA' });
```

✅ **Identify users**
```typescript
lytics.identify({ email: user.email, name: user.name });
```

✅ **Capture campaign data**
```typescript
lytics.identify({ 
  utm_source: 'google',
  utm_campaign: 'summer_sale' 
});
```

✅ **Build customer profiles**
```typescript
lytics.loadEntity('user', (profile) => {
  console.log('User interests:', profile.interests);
});
```

### Use Personalize When You Want To:

✅ **Show different content to different users**
```typescript
personalize.triggerImpression('hero_banner_test');
```

✅ **Run A/B tests**
```typescript
// Shows variant A to 50%, variant B to 50%
personalize.triggerImpression('headline_test');
```

✅ **Measure conversion**
```typescript
personalize.triggerEvent('cta_clicked');
```

✅ **Target specific audiences**
```typescript
// Show premium content to paid users only
// Configured in Personalize UI
```

---

## 💡 Best Practices: Using Both Together

### 1. Track Behavior with Lytics, Personalize Content

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { usePersonalize } from '@/components/context/PersonalizeContext';
import { useEffect } from 'react';

export default function ProductCard({ product }) {
  const lytics = useLytics();
  const personalize = usePersonalize();

  // Track view with Lytics
  useEffect(() => {
    if (lytics) {
      lytics.send('product_viewed', {
        product_id: product.id,
        category: product.category,
        price: product.price
      });
    }
  }, [lytics, product]);

  // Show personalized experience
  useEffect(() => {
    if (personalize) {
      personalize.triggerImpression('product_card_variant');
    }
  }, [personalize]);

  const handleClick = () => {
    // Track with Lytics
    if (lytics) {
      lytics.send('add_to_cart', {
        product_id: product.id,
        price: product.price
      });
    }

    // Track conversion with Personalize
    if (personalize) {
      personalize.triggerEvent('add_to_cart_event');
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
}
```

### 2. Identify with Lytics, Segment with Personalize

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { useEffect } from 'react';

export default function UserLogin({ user }) {
  const lytics = useLytics();

  useEffect(() => {
    if (lytics && user) {
      // Send rich user data to Lytics
      lytics.identify({
        email: user.email,
        name: user.name,
        user_id: user.id,
        subscription_tier: user.tier,
        signup_date: user.signupDate,
        lifetime_value: user.ltv,
        preferences: user.preferences
      });
    }
  }, [lytics, user]);

  // Personalize will use Contentstack's segmentation rules
  // to show targeted content based on user attributes

  return <div>Welcome, {user.name}!</div>;
}
```

### 3. Track Campaigns with Lytics, Optimize with Personalize

```typescript
'use client';

import { useLytics } from '@/components/context/LyticsContext';
import { usePersonalize } from '@/components/context/PersonalizeContext';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LandingPage() {
  const lytics = useLytics();
  const personalize = usePersonalize();
  const searchParams = useSearchParams();

  // Track campaign attribution with Lytics
  useEffect(() => {
    if (lytics) {
      const utmData = {
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign')
      };

      if (utmData.utm_source) {
        lytics.identify(utmData);
        lytics.send('campaign_visit', utmData);
      }
    }
  }, [lytics, searchParams]);

  // Show personalized content based on campaign
  useEffect(() => {
    if (personalize) {
      personalize.triggerImpression('campaign_hero_banner');
    }
  }, [personalize]);

  return <div>{/* Your landing page */}</div>;
}
```

---

## 📈 Complete Tracking Strategy

### For Every User Interaction:

1. **Track with Lytics** → Understand behavior
2. **Deliver with Personalize** → Show relevant content
3. **Measure with Both** → Optimize continuously

### Example: Blog Post Reading

```typescript
'use client';

export default function BlogPost({ post }) {
  const lytics = useLytics();
  const personalize = usePersonalize();

  // Track page view
  useEffect(() => {
    if (lytics) {
      lytics.send('blog_post_viewed', {
        post_id: post.id,
        category: post.category,
        author: post.author,
        tags: post.tags
      });
    }

    if (personalize) {
      personalize.triggerImpression('blog_content_variant');
    }
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = 
        (window.scrollY / document.body.scrollHeight) * 100;

      if (scrollPercent > 75 && lytics) {
        lytics.send('blog_post_engaged', {
          post_id: post.id,
          scroll_depth: 75
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lytics]);

  // Track CTA click
  const handleCTAClick = () => {
    if (lytics) {
      lytics.send('blog_cta_clicked', {
        post_id: post.id,
        cta_type: 'newsletter_signup'
      });
    }

    if (personalize) {
      personalize.triggerEvent('blog_conversion');
    }
  };

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <button onClick={handleCTAClick}>
        Subscribe to Newsletter
      </button>
    </article>
  );
}
```

---

## 🎓 Learning Path

### Week 1: Basics
1. **Set up both tools** ✅ (Already done!)
2. **Test basic tracking** with Lytics
3. **Test basic personalization** with Personalize

### Week 2: Integration
4. **Add tracking** to 3-5 key components
5. **Create first A/B test** in Personalize
6. **Monitor results** in both dashboards

### Week 3: Optimization
7. **Build audience segments** in Lytics
8. **Create targeted experiences** in Personalize
9. **Analyze conversion data** from both

### Month 2+: Advanced
10. **Advanced segmentation** with Lytics
11. **Multi-variant testing** with Personalize
12. **Cross-platform tracking** with Lytics
13. **Continuous optimization** cycle

---

## 📊 Dashboard Cheat Sheet

### Lytics Dashboard
**URL:** https://app.lytics.io/

**Check Daily:**
- 📊 Data → Streams (real-time events)
- 👥 Audiences → Segments (audience sizes)
- 📈 Insights → Campaigns (performance)

**Look For:**
- Event volume and trends
- Audience growth
- User engagement patterns
- Campaign attribution

### Personalize Dashboard
**URL:** Your Contentstack Personalize

**Check Daily:**
- 🎯 Experiences → Analytics (test results)
- 📊 Metrics → Conversions (goal tracking)
- 🏆 Winners → Statistical significance

**Look For:**
- A/B test performance
- Conversion rates
- Winning variants
- Audience engagement

---

## 🚀 Quick Reference

### Import Both Hooks

```typescript
import { useLytics } from '@/components/context/LyticsContext';
import { usePersonalize } from '@/components/context/PersonalizeContext';

function MyComponent() {
  const lytics = useLytics();
  const personalize = usePersonalize();

  // Use both!
}
```

### Track + Personalize Pattern

```typescript
// 1. Track behavior (Lytics)
if (lytics) {
  lytics.send('action_taken', { action: 'clicked_cta' });
}

// 2. Show personalized content (Personalize)
if (personalize) {
  personalize.triggerImpression('experience_id');
}

// 3. Track conversion (Both)
if (lytics) {
  lytics.send('conversion', { type: 'signup' });
}
if (personalize) {
  personalize.triggerEvent('signup_event');
}
```

---

## 🎯 Summary

| Feature | Lytics | Personalize |
|---------|--------|-------------|
| **Track Behavior** | ✅ Primary | ⚡ Secondary |
| **User Identification** | ✅ Primary | ❌ Not focused |
| **Content Variants** | ❌ No | ✅ Primary |
| **A/B Testing** | ❌ No | ✅ Primary |
| **Audience Segments** | ✅ Primary | ✅ Uses segments |
| **Campaign Tracking** | ✅ Primary | ⚡ Limited |
| **Customer Profiles** | ✅ Primary | ❌ No |
| **Content Delivery** | ❌ No | ✅ Primary |
| **Analytics** | ✅ Behavioral | ✅ Experience |

### The Golden Rule

> **Lytics = Understand Users**  
> **Personalize = Deliver Experiences**  
> **Together = 🚀 Conversion Magic**

---

**🎉 You now have both tools integrated and ready to create amazing personalized experiences powered by deep customer understanding!**

**Quick Links:**
- 📖 [Lytics Quick Start](./LYTICS_QUICK_START.md)
- 📚 [Lytics Integration Guide](./LYTICS_INTEGRATION.md)
- 🎯 [Personalize Documentation](./docs/pages/for-developers/personalize/)
- 🧪 [Test Lytics](http://localhost:3000/en-us/test-lytics)
- 🧪 [Test Personalize](http://localhost:3000/en-us/test-personalize-client)


