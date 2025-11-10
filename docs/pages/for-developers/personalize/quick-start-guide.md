# Personalize Quick Start Guide

Complete walkthrough for setting up Contentstack Personalize in your Next.js application hosted on Vercel.

## 🎯 What You'll Build

By the end of this guide, you'll have:
- ✅ Personalize project configured
- ✅ Custom attributes tracking UTM parameters
- ✅ Audience segments for different traffic sources
- ✅ A/B test experience running
- ✅ Event tracking for conversions
- ✅ Entry variants in Contentstack
- ✅ Full integration in your Next.js app on Vercel

**Total Time**: ~90 minutes

---

## Part 1: Personalize Setup (30 min)

### 1.1 Create Personalize Project

**Official Guide**: [Create Personalize Project](https://www.contentstack.com/docs/personalize/create-personalize-project)

**Quick Steps**:
1. Navigate to Personalize in Contentstack
2. Click "+ New Project"
3. Enter project name and description
4. Select your stack to connect
5. Save and copy the Project UID (24-character string)

**Save This**:
```
Project UID: __________________________
```

### 1.2 Create Custom Attributes

**Official Guide**: [Create Custom Attribute](https://www.contentstack.com/docs/personalize/create-custom-attribute)

Create these marketing attributes:

| Name | Key | Description |
|------|-----|-------------|
| UTM Source | `utm_source` | Traffic source (google, facebook, email) |
| UTM Medium | `utm_medium` | Marketing medium (cpc, social, newsletter) |
| UTM Campaign | `utm_campaign` | Campaign name (spring_sale, launch) |

**Steps for Each Attribute**:
1. Go to Attributes section
2. Click "+ Create Attribute"
3. Fill in Name, Key, Description
4. Click "Create"

**✅ Checkpoint**: You should have 3 custom attributes created

### 1.3 Create Audiences

**Official Guide**: [Create an Audience](https://www.contentstack.com/docs/personalize/create-audience)

Create these audience segments:

**Audience 1: Google Traffic**
```
Name: Google Traffic
Description: Visitors from Google Ads
Rules:
  - utm_source equals "google"
```

**Audience 2: Social Media Traffic**
```
Name: Social Media Traffic
Description: Visitors from social platforms
Rules:
  - utm_source equals "facebook" OR
  - utm_source equals "twitter" OR
  - utm_source equals "linkedin"
```

**Steps**:
1. Go to Audiences section
2. Click "+ Create Audience"
3. Enter name and description
4. Click "+ Add Condition"
5. Select attribute (utm_source)
6. Choose operator (equals)
7. Enter value
8. For multiple conditions, use AND/OR logic
9. Click "Create"

**✅ Checkpoint**: You should have 2 audiences created

### 1.4 Create Events

**Official Guide**: [Create an Event](https://www.contentstack.com/docs/personalize/create-event)

Create conversion tracking events:

| Event Name | Event Key | Description |
|------------|-----------|-------------|
| CTA Click | `cta_click` | User clicked call-to-action button |
| Form Submit | `form_submit` | User submitted contact form |
| Learn More | `learn_more_click` | User clicked learn more link |

**Steps**:
1. Go to Events section
2. Click "+ Create Event"
3. Enter event name
4. Enter event key (lowercase, underscores)
5. Add description
6. Click "Create"

**✅ Checkpoint**: You should have 3 events created

---

## Part 2: Create Experiences (20 min)

### 2.1 Create A/B Test Experience

**Official Guide**: [Create A/B Test Experience](https://www.contentstack.com/docs/personalize/create-ab-test-experience)

**Example: Hero Banner A/B Test**

1. **Go to Experiences** → Click "+ Create Experience"

2. **Basic Info**:
   ```
   Name: Hero Banner Headlines Test
   Description: Test different headlines for homepage hero
   Type: A/B Test
   ```

3. **Select Content**:
   ```
   Content Type: hero_banner
   Entry: Homepage Hero Banner
   ```

4. **Configure Variants**:
   ```
   Variant 1 (Control): "Build Amazing Websites"
   Variant 2 (Test): "Create Your Dream Website Today"
   
   Traffic Split: 50/50 (equal distribution)
   ```

5. **Add Conversion Event**:
   ```
   Primary Metric: cta_click
   Goal: Increase click-through rate
   ```

6. **Save as Draft**

**✅ Checkpoint**: Experience created in Draft status

### 2.2 Create Segmented Experience

**Official Guide**: [Create Segmented Experience](https://www.contentstack.com/docs/personalize/create-segmented-experience)

**Example: Social Media Specific Content**

1. **Go to Experiences** → Click "+ Create Experience"

2. **Basic Info**:
   ```
   Name: Social Media Landing Experience
   Description: Custom content for social media visitors
   Type: Segmented Experience
   ```

3. **Select Content**:
   ```
   Content Type: hero_banner
   Entry: Homepage Hero Banner
   ```

4. **Configure Segments**:
   ```
   Variant 1: Default Content (everyone else)
   Variant 2: Social Media Content
      Target Audience: Social Media Traffic
      Custom message for social visitors
   ```

5. **Save as Draft**

**✅ Checkpoint**: Segmented experience created

---

## Part 3: Create Entry Variants (15 min)

**Official Guide**: [Work with Entry Variants](https://www.contentstack.com/docs/content-managers/entry-variants#work-with-entry-variants)

### 3.1 Create Variant Group

1. **Go to your Stack** in Contentstack
2. **Navigate to Settings** → **Variant Groups**
3. **Click "+ Add Variant Group"**
4. **Enter name**: "Homepage Hero Variants"
5. **Add variants**:
   ```
   Variant 1: Default (automatically created)
   Variant 2: Social Media Version
   Variant 3: Google Ads Version
   ```
6. **Click "Save"**

### 3.2 Create Entry Variants

1. **Go to Entries** → Select "Homepage Hero Banner" entry

2. **Click "Variants" tab** or "Create Variant"

3. **For each variant**:
   
   **Social Media Version**:
   ```
   Variant Group: Homepage Hero Variants
   Variant: Social Media Version
   
   Content Changes:
   - Headline: "Welcome from Social!"
   - Subheading: "Thanks for clicking through"
   - CTA Text: "Join Our Community"
   ```
   
   **Google Ads Version**:
   ```
   Variant Group: Homepage Hero Variants
   Variant: Google Ads Version
   
   Content Changes:
   - Headline: "Transform Your Business Today"
   - Subheading: "Get started in minutes"
   - CTA Text: "Start Free Trial"
   ```

4. **Save each variant**

5. **Publish variants** to make them live

**✅ Checkpoint**: Entry has multiple variants published

---

## Part 4: Website Integration (25 min)

**Official Guide**: [Setup Next.js with Personalize - Vercel](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-vercel)

### 4.1 Install SDK

```bash
npm install @contentstack/personalize-edge-sdk
```

### 4.2 Configure Environment Variables

Add to `.env.local`:

```env
# Personalize Configuration
NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=your_project_uid_here
CONTENTSTACK_PERSONALIZE_EDGE_API_URL=https://personalize-edge.contentstack.com

# For other regions:
# EU: https://eu-personalize-edge.contentstack.com
# Azure NA: https://azure-na-personalize-edge.contentstack.com
```

### 4.3 Create Middleware

Create `middleware.ts` in your project root:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(req: NextRequest) {
  const projectUid = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;
  
  // Set Edge API URL if needed
  if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
  }
  
  // Initialize SDK with request
  const personalizeSdk = await Personalize.init(projectUid, {
    request: req,
  });
  
  // Extract UTM parameters
  const searchParams = req.nextUrl.searchParams;
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');
  
  // Set attributes if UTM params exist
  if (utmSource || utmMedium || utmCampaign) {
    await personalizeSdk.set({
      ...(utmSource && { utm_source: utmSource }),
      ...(utmMedium && { utm_medium: utmMedium }),
      ...(utmCampaign && { utm_campaign: utmCampaign }),
    });
  }
  
  // Get selected variants
  const variantParams = await personalizeSdk.variantParamsByContentType();
  
  // Add variants to URL
  const url = req.nextUrl.clone();
  Object.entries(variantParams).forEach(([key, value]) => {
    url.searchParams.set(key, value as string);
  });
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 4.4 Create Personalize Context

Create `context/PersonalizeContext.tsx`:

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Personalize from '@contentstack/personalize-edge-sdk';

const PersonalizeContext = createContext<any>(null);

export function PersonalizeProvider({ children }: { children: React.ReactNode }) {
  const [personalizeSdk, setPersonalizeSdk] = useState<any>(null);

  useEffect(() => {
    const initPersonalize = async () => {
      const projectUid = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID!;
      
      if (process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
        Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
      }
      
      const sdk = await Personalize.init(projectUid);
      setPersonalizeSdk(sdk);
    };

    initPersonalize();
  }, []);

  return (
    <PersonalizeContext.Provider value={personalizeSdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  const context = useContext(PersonalizeContext);
  if (!context) {
    throw new Error('usePersonalize must be used within PersonalizeProvider');
  }
  return context;
}
```

### 4.5 Add Provider to Layout

Update `app/layout.tsx`:

```typescript
import { PersonalizeProvider } from '@/context/PersonalizeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PersonalizeProvider>
          {children}
        </PersonalizeProvider>
      </body>
    </html>
  );
}
```

### 4.6 Track Impressions

In your component that displays personalized content:

```typescript
'use client';

import { useEffect } from 'react';
import { usePersonalize } from '@/context/PersonalizeContext';

export default function HeroBanner() {
  const personalize = usePersonalize();
  
  useEffect(() => {
    if (personalize) {
      // Trigger impression for your experience
      // Use the Experience Short UID from Personalize UI
      personalize.triggerImpression('YOUR_EXPERIENCE_SHORT_UID');
    }
  }, [personalize]);
  
  return (
    <div className="hero-banner">
      {/* Your hero banner content */}
    </div>
  );
}
```

### 4.7 Track Events

Track conversion events:

```typescript
'use client';

import { usePersonalize } from '@/context/PersonalizeContext';

export default function CTAButton() {
  const personalize = usePersonalize();
  
  const handleClick = async () => {
    if (personalize) {
      // Trigger the event you created
      await personalize.triggerEvent('cta_click');
    }
    
    // Continue with your normal click handler
    router.push('/signup');
  };
  
  return (
    <button onClick={handleClick}>
      Get Started
    </button>
  );
}
```

**✅ Checkpoint**: SDK integrated and tracking events

---

## Part 5: Deploy and Test (5-10 min)

### 5.1 Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "Add Personalize integration"
git push origin main

# Vercel will auto-deploy
# Or manually trigger deployment
vercel --prod
```

### 5.2 Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project
2. Navigate to Settings → Environment Variables
3. Add:
   ```
   NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=your_project_uid
   CONTENTSTACK_PERSONALIZE_EDGE_API_URL=https://personalize-edge.contentstack.com
   ```
4. Redeploy

### 5.3 Test Integration

**Test 1: UTM Parameters**
```
Visit: https://yoursite.com/?utm_source=google&utm_campaign=test
Check: Browser dev tools → Application → Cookies
Verify: Personalize cookies are set
```

**Test 2: Variants**
```
Visit: https://yoursite.com
Check: Network tab for personalize API calls
Verify: Variant parameters in URL
```

**Test 3: Events**
```
Click CTA button
Check: Network tab for event tracking
Verify: Event POST request sent
```

**Test 4: Experience in Personalize UI**
```
Go to Personalize → Experiences
Check: Impressions count increasing
Verify: Events being recorded
```

**✅ Checkpoint**: Everything working end-to-end!

---

## Troubleshooting

### SDK Not Initializing

**Problem**: `personalize.set()` fails

**Solutions**:
- Check Project UID in env variables
- Verify SDK installed: `npm list @contentstack/personalize-edge-sdk`
- Check browser console for errors
- Ensure middleware is running (check Network tab)

### Variants Not Showing

**Problem**: Same content for all users

**Solutions**:
- Verify experience is **Activated** (not Draft)
- Check variant group is published
- Ensure entry variants are published
- Clear browser cookies and test again

### Events Not Tracking

**Problem**: No events showing in analytics

**Solutions**:
- Verify event key matches exactly
- Check personalize SDK is initialized before calling triggerEvent
- Look for network errors in dev tools
- Ensure experience is activated

### Middleware Not Running

**Problem**: No personalize cookies set

**Solutions**:
- Check middleware.ts is in project root
- Verify matcher pattern includes your routes
- Check for errors in Vercel logs
- Ensure environment variables are set

---

## Verification Checklist

### Personalize Setup
- [ ] Project created with valid UID
- [ ] Custom attributes created (utm_source, utm_medium, utm_campaign)
- [ ] Audiences created with proper rules
- [ ] Events created with correct keys
- [ ] A/B test experience created
- [ ] Segmented experience created
- [ ] Entry variants created and published
- [ ] Experiences activated (not draft)

### Website Integration
- [ ] SDK installed via npm
- [ ] Environment variables configured
- [ ] Middleware created and working
- [ ] PersonalizeContext provider added
- [ ] Impressions tracked on content load
- [ ] Events tracked on user actions
- [ ] Deployed to Vercel
- [ ] Vercel environment variables set

### Testing
- [ ] UTM parameters captured
- [ ] Variants delivered correctly
- [ ] Events tracked successfully
- [ ] Analytics showing data
- [ ] No console errors
- [ ] Works on mobile and desktop

---

## Next Steps

### Optimize Your Experiences

1. **Monitor Analytics**
   - Check experience performance daily
   - Look for statistical significance
   - Make decisions based on data

2. **Create More Experiences**
   - Test different sections
   - Try various content types
   - Experiment with targeting

3. **Refine Audiences**
   - Add more attributes
   - Create complex segments
   - Test audience hypotheses

4. **Advanced Integration**
   - Integrate with analytics platforms
   - Set up GTM tracking
   - Connect CDP for richer data

---

## Additional Resources

### Official Documentation
- [Personalize Overview](https://www.contentstack.com/docs/personalize)
- [Create Project](https://www.contentstack.com/docs/personalize/create-personalize-project)
- [Create Attribute](https://www.contentstack.com/docs/personalize/create-custom-attribute)
- [Create Audience](https://www.contentstack.com/docs/personalize/create-audience)
- [Create A/B Test](https://www.contentstack.com/docs/personalize/create-ab-test-experience)
- [Create Segmented Experience](https://www.contentstack.com/docs/personalize/create-segmented-experience)
- [Create Event](https://www.contentstack.com/docs/personalize/create-event)
- [Add Event to A/B Test](https://www.contentstack.com/docs/personalize/add-event-to-ab-test-experience)
- [Entry Variants](https://www.contentstack.com/docs/content-managers/entry-variants#work-with-entry-variants)
- [Vercel Setup](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-vercel)

### SDKs and APIs
- [Personalize Edge SDK](https://www.contentstack.com/docs/developers/personalize/personalize-edge-sdk)
- [Personalize Management API](https://www.contentstack.com/docs/developers/apis/personalize-management-api)
- [Personalize Edge API](https://www.contentstack.com/docs/developers/apis/personalize-edge-api)

### Support
- [Contentstack Support](https://www.contentstack.com/support)
- [Community Forum](https://www.contentstack.com/community)
- [Personalize FAQs](https://www.contentstack.com/docs/personalize/personalize-faqs)

---

**Congratulations! 🎉**

You've successfully set up Contentstack Personalize with your Next.js application on Vercel. You can now deliver personalized experiences to your users!

For detailed documentation on each topic, see the individual guides in this section.

