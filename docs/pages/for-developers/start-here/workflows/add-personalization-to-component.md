# Add Personalization to Component - Step-by-Step Workflow

Complete workflow for adding Contentstack Personalize to existing components for A/B testing and audience segmentation.

**Total Time:** ~60-90 minutes (first time setup)  
**Difficulty:** Intermediate

---

## Prerequisites

Before starting, ensure you have:
- ✅ Existing component working in your Next.js app
- ✅ Contentstack Personalize enabled for your organization
- ✅ Personalize project created in Contentstack
- ✅ Basic understanding of A/B testing or segmentation concepts

**New to Personalize?** Read the [Personalize Quick Start Guide](../../personalize/quick-start-guide) first.

---

## Overview

This workflow will help you:
1. Configure personalization in Contentstack Personalize UI
2. Create entry variants for different audiences/tests
3. Update your component with tracking code
4. Test and deploy personalized experiences
5. Monitor performance and iterate

---

## Step 1: Plan Your Personalization (15 minutes)

### 1.1 Choose Personalization Type

**Option A: A/B Testing**
- Test different versions of content to see which performs better
- Use when you want to optimize a single component
- Example: Test two different headlines to see which gets more clicks

**Option B: Audience Segmentation**
- Show different content to different user groups
- Use when you want targeted content for specific audiences
- Example: Show different CTAs to mobile vs desktop users

**Option C: Both**
- Combine A/B testing with audience segmentation
- Example: Test two headlines, but only for mobile users

### 1.2 Define Your Hypothesis

Document your test/segmentation hypothesis:

**For A/B Test:**
```
Hypothesis: Changing the hero headline from "Build Websites Fast" 
to "Create Your Dream Website" will increase CTA clicks by 15%

Measurement: Track "cta_click" event
Success Metric: 15% increase in click-through rate
```

**For Segmentation:**
```
Hypothesis: Users from Google Ads respond better to "Start Free Trial" 
while organic users prefer "Learn More"

Measurement: Track "cta_click" event for each variant
Success Metric: Higher engagement for targeted audience
```

### 1.3 Identify Component Fields to Personalize

List which fields in your component will have variants:

**Example for Hero Banner:**
- [ ] title - Main headline text
- [ ] description - Supporting copy
- [ ] cta_text - Button label
- [ ] cta_link - Button destination  
- [ ] image - Hero image

**Document:**
- Component name: _________________
- Content type UID: _________________
- Fields to personalize: _________________

---

## Step 2: Set Up Personalize Configuration (20 minutes)

### 2.1 Create Custom Attributes (Optional)

**Skip this step if:**
- Using only A/B testing with random distribution
- Using standard attributes (device, browser, location)

**Do this step if:**
- Tracking UTM parameters (utm_source, utm_campaign, etc.)
- Tracking custom user data (subscription_tier, user_type, etc.)

**To create attributes:**

1. Navigate to **Contentstack Personalize** → **Attributes**
2. Click **"+ Create Attribute"**
3. For each attribute you need:
   ```
   Name: UTM Source
   Key: utm_source
   Description: Traffic source parameter from marketing campaigns
   ```
4. Click **"Create"**
5. Repeat for all needed attributes

**Document the attribute keys:**
```
Attribute 1: _________________
Attribute 2: _________________
Attribute 3: _________________
```

### 2.2 Create Events for Conversion Tracking

Events track user actions (clicks, submissions, etc.).

1. Navigate to **Personalize** → **Events**
2. Click **"+ Create Event"**
3. For each action you want to track:
   ```
   Event Name: Hero CTA Click
   Event Key: hero_cta_click
   Description: User clicked the hero banner call-to-action button
   ```
4. Click **"Create"**
5. Create events for all conversion points

**Document the event keys:**
```
Event 1: _________________
Event 2: _________________
Event 3: _________________
```

### 2.3 Create Audiences (For Segmentation Only)

**Skip this if you're only doing A/B testing.**

1. Navigate to **Personalize** → **Audiences**
2. Click **"+ Create Audience"**
3. Configure audience rules:
   ```
   Name: Google Ads Traffic
   Description: Visitors from Google Ads campaigns
   Rules:
   - utm_source equals "google"
   - utm_medium equals "cpc"
   ```
4. Click **"Create"**
5. Repeat for each audience segment

**Document audience names:**
```
Audience 1: _________________
Audience 2: _________________
Audience 3: _________________
```

---

## Step 3: Create Experience in Personalize (15 minutes)

### 3.1 For A/B Testing

1. Navigate to **Personalize** → **Experiences**
2. Click **"+ Create Experience"**
3. Select **"A/B Test"**
4. Configure:
   ```
   Name: Hero Banner Headline Test
   Description: Testing headline variations for increased engagement
   Content Type: hero_banner
   Entry: Homepage Hero Banner
   ```
5. **Add Variants:**
   - Variant 1 (Control): "Current Headline"
   - Variant 2 (Test): "New Headline"
   - Traffic Split: 50% / 50%
6. **Add Conversion Event:**
   - Select the event you created (e.g., "hero_cta_click")
7. Click **"Save as Draft"**
8. **Document the Experience Short UID** (shown in URL or details panel)

### 3.2 For Segmented Experience

1. Navigate to **Personalize** → **Experiences**
2. Click **"+ Create Experience"**
3. Select **"Segmented Experience"**
4. Configure:
   ```
   Name: Hero Banner by Traffic Source
   Description: Personalized hero content based on traffic source
   Content Type: hero_banner
   Entry: Homepage Hero Banner
   ```
5. **Add Variants:**
   - Variant 1 (Default): "Default Content" → No audience
   - Variant 2: "Google Ads Content" → Audience: "Google Ads Traffic"
   - Variant 3: "Social Media Content" → Audience: "Social Media Traffic"
6. **Add Events** (optional but recommended)
7. Click **"Save as Draft"**
8. **Document the Experience Short UID**

**IMPORTANT:** Copy the Experience Short UID - you'll need it for your component code!

```
Experience Short UID: _________________
```

---

## Step 4: Create Entry Variants in Contentstack (15 minutes)

### 4.1 Navigate to Entry

1. Go to your **Contentstack Stack**
2. Navigate to **Content Types** → Your content type (e.g., "hero_banner")
3. Open the **specific entry** used in your experience

### 4.2 Create Variant Group (First Time Only)

1. Go to **Settings** → **Variant Groups**
2. Click **"+ Add Variant Group"**
3. Configure:
   ```
   Name: Hero Banner Variants
   ```
4. Add variants matching your experience:
   - **For A/B Test:** "Control", "Test Variant A", etc.
   - **For Segmented:** "Default", "Google Ads", "Social Media", etc.
5. Click **"Save"**

### 4.3 Create Entry Variants

1. In your entry, click **"Variants"** tab or **"Create Variant"** button
2. For each variant in your experience:
   
   **Variant: Control (or Default)**
   ```
   Variant Group: Hero Banner Variants
   Variant: Control
   
   Content Changes:
   - title: "Build Websites Fast"
   - description: "Professional tools for developers"
   - cta_text: "Get Started"
   ```
   
   **Variant: Test Variant A (or Google Ads)**
   ```
   Variant Group: Hero Banner Variants
   Variant: Test Variant A
   
   Content Changes:
   - title: "Create Your Dream Website"
   - description: "Everything you need in one platform"
   - cta_text: "Start Free Trial"
   ```

3. Save each variant
4. **Publish all variants** (they won't work until published!)

### 4.4 Link Variants to Experience

1. Go back to **Personalize** → **Experiences** → Your Experience
2. Verify variants are properly mapped:
   - Control → Control variant
   - Test → Test variant
3. Save if changes were needed

---

## Step 5: Update Component Code (20 minutes)

### 5.1 Add Required Imports

Open your component file (e.g., `src/components/HeroBanner.tsx`):

```typescript
'use client'; // Add if not already present

import { usePersonalize } from '@/context/PersonalizeContext';
import { useEffect } from 'react';
```

### 5.2 Add Personalize Hook

Inside your component function:

```typescript
export default function HeroBanner({ data }: HeroBannerProps) {
  const personalize = usePersonalize();
  
  // ... rest of your existing code
```

### 5.3 Add Impression Tracking

Add this useEffect hook to track when component is viewed:

```typescript
useEffect(() => {
  if (personalize) {
    // Replace 'YOUR_EXPERIENCE_SHORT_UID' with actual UID from Step 3
    personalize.triggerImpression('YOUR_EXPERIENCE_SHORT_UID');
  }
}, [personalize]);
```

**CRITICAL:** Replace `YOUR_EXPERIENCE_SHORT_UID` with the actual UID you documented in Step 3!

### 5.4 Add Event Tracking

For each interactive element (buttons, links, forms):

```typescript
const handleCTAClick = async () => {
  // Track the click event
  if (personalize) {
    await personalize.triggerEvent('hero_cta_click'); // Use your event key from Step 2.2
  }
  
  // Your existing click handler code
  // Example: navigation, analytics, etc.
};
```

Update your JSX:

```typescript
<button onClick={handleCTAClick}>
  {data.cta_text}
</button>
```

### 5.5 Add Attribute Tracking (Optional)

If your component captures user data:

```typescript
const handleFormSubmit = async (formData: FormData) => {
  // Track custom attribute
  if (personalize) {
    await personalize.set({
      user_preference: formData.get('preference')
    });
  }
  
  // Continue with form logic
};
```

### 5.6 Save and Test Compilation

```bash
# Check for TypeScript errors
npm run build
```

Fix any errors before proceeding.

---

## Step 6: Test Locally (15 minutes)

### 6.1 Start Dev Server

```bash
npm run dev
```

### 6.2 Test Impression Tracking

1. Open browser to your component page
2. Open **DevTools** → **Network** tab
3. Filter for "personalize" or "impression"
4. Reload page
5. **Verify:** You see a POST request to personalize API
6. **Check payload:** Contains your experience UID

**✅ Success:** Request sent with 200 response  
**❌ Failure:** No request → Check Experience UID, personalize context

### 6.3 Test Event Tracking

1. With Network tab still open
2. Click your CTA button (or trigger event)
3. **Verify:** You see a POST request for event tracking
4. **Check payload:** Contains correct event key

**✅ Success:** Event request sent  
**❌ Failure:** No request → Check event key, personalize context

### 6.4 Test Variants (A/B Test)

1. **Clear browser cookies** (to reset personalization)
2. Reload page multiple times
3. You should see different variants randomly
4. Verify content changes match entry variants

**Note:** You may need to reload 5-10 times to see different variants due to 50/50 split

### 6.5 Test Variants (Segmented)

1. **Clear browser cookies**
2. Visit with audience-specific parameters:
   ```
   http://localhost:3000/your-page?utm_source=google&utm_medium=cpc
   ```
3. Verify correct variant shows for that audience
4. Test each audience segment

---

## Step 7: Verify in Personalize UI (5 minutes)

### 7.1 Check Analytics

1. Navigate to **Personalize** → **Experiences** → Your Experience
2. Look at the analytics dashboard:
   - **Impressions:** Should be increasing
   - **Events:** Should show conversions
   - **Variants:** Should show traffic distribution

### 7.2 Verify Data Collection

Wait 1-2 minutes for data to appear, then verify:
- ✅ Impression count matches your tests
- ✅ Events are being recorded
- ✅ Variant distribution looks correct (50/50 for A/B tests)

**If no data showing:**
- Check browser Network tab for errors
- Verify experience is not still in Draft
- Confirm Experience Short UID is correct in code

---

## Step 8: Activate Experience (2 minutes)

Once local testing is successful:

1. Navigate to **Personalize** → **Experiences** → Your Experience
2. Review configuration one last time
3. Click **"Activate"** button
4. Confirm activation

**The experience is now live!**

---

## Step 9: Deploy to Production (10 minutes)

### 9.1 Commit Changes

```bash
git add .
git commit -m "Add personalization to HeroBanner component

- Added impression tracking
- Added CTA click event tracking
- Created entry variants for A/B test
- Activated experience in Personalize"

git push origin main
```

### 9.2 Verify Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify these are set:
   ```
   NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=your_project_uid
   CONTENTSTACK_PERSONALIZE_EDGE_API_URL=https://personalize-edge.contentstack.com
   ```
3. If missing or changed, add them and redeploy

### 9.3 Deploy and Test Production

1. Wait for deployment to complete
2. Visit production site
3. Repeat Step 6 tests on production
4. Verify analytics in Personalize UI

---

## Step 10: Monitor and Optimize (Ongoing)

### 10.1 Daily Monitoring (First Week)

Check analytics daily:
1. Navigate to **Personalize** → **Experiences** → Your Experience
2. Monitor:
   - **Impression counts:** Are people seeing your component?
   - **Conversion rates:** Are variants performing differently?
   - **Statistical significance:** Is data reliable yet?

### 10.2 Wait for Statistical Significance

**Minimum requirements:**
- 100+ conversions per variant
- 1-2 weeks of data
- 95% confidence level

**Don't make decisions too early!**

### 10.3 Analyze Results

**For A/B Tests:**
1. Identify winning variant
2. Check if improvement is significant (>10%)
3. Document learnings

**For Segmented Experiences:**
1. Compare conversion rates across audiences
2. Identify best-performing segments
3. Look for opportunities to refine targeting

### 10.4 Iterate

Based on results:
- **Winning A/B Test:** Make winning variant the default
- **Losing A/B Test:** Try a different variation
- **Segmentation Success:** Create more targeted variants
- **Segmentation Failure:** Refine audience rules or try different content

---

## Complete Checklist

### Planning Phase
- [ ] Personalization type chosen (A/B or Segmented)
- [ ] Hypothesis documented
- [ ] Component and fields identified
- [ ] Success metrics defined

### Personalize Configuration
- [ ] Custom attributes created (if needed)
- [ ] Events created for tracking
- [ ] Audiences created (for segmentation)
- [ ] Experience created and Short UID documented
- [ ] Entry variants created and published
- [ ] Experience saved as Draft

### Component Implementation
- [ ] Personalize hook imported
- [ ] Impression tracking added
- [ ] Event tracking added for interactions
- [ ] Attribute tracking added (if needed)
- [ ] Code compiles without errors

### Testing
- [ ] Impression tracking verified in Network tab
- [ ] Event tracking verified in Network tab
- [ ] Variants display correctly locally
- [ ] Variants work for different audiences (segmented)
- [ ] Analytics showing in Personalize UI
- [ ] No console errors

### Deployment
- [ ] Experience activated in Personalize
- [ ] Code committed and pushed
- [ ] Environment variables verified on Vercel
- [ ] Production deployment successful
- [ ] Production testing completed
- [ ] Monitoring plan in place

### Optimization
- [ ] Analytics reviewed daily (first week)
- [ ] Statistical significance reached
- [ ] Results analyzed and documented
- [ ] Next iteration planned

---

## Time Breakdown

| Step | Time | Can Skip? |
|------|------|-----------|
| Planning | 15 min | No |
| Personalize Config | 20 min | No |
| Create Experience | 15 min | No |
| Entry Variants | 15 min | No |
| Update Component | 20 min | No |
| Local Testing | 15 min | No |
| Verify in UI | 5 min | No |
| Activate | 2 min | No |
| Deploy | 10 min | No |
| **Total** | **~2 hours** | **First time** |

**Subsequent components:** ~45-60 minutes (once familiar with process)

---

## Troubleshooting Guide

### Issue: Impressions Not Showing

**Check:**
1. Experience Short UID correct in code?
2. Experience activated (not Draft)?
3. Personalize context initialized?
4. Network request successful?

**Solution:**
```typescript
// Add debugging
useEffect(() => {
  console.log('Personalize object:', personalize);
  if (personalize) {
    console.log('Triggering impression for:', 'YOUR_EXP_UID');
    personalize.triggerImpression('YOUR_EXP_UID');
  }
}, [personalize]);
```

### Issue: Events Not Recording

**Check:**
1. Event key matches exactly?
2. Event created in Personalize UI?
3. Event handler actually called?
4. Async/await handled correctly?

**Solution:**
```typescript
const handleClick = async () => {
  console.log('Tracking event:', 'your_event_key');
  if (personalize) {
    try {
      await personalize.triggerEvent('your_event_key');
      console.log('Event tracked successfully');
    } catch (error) {
      console.error('Event tracking failed:', error);
    }
  }
};
```

### Issue: Wrong Variant Showing

**Check:**
1. Entry variants published?
2. Variants linked to experience?
3. Audience rules correct (segmented)?
4. Browser cookies cleared for testing?

**Solution:**
- Clear cookies completely
- Check variant publishing status in Contentstack
- Verify variant-to-audience mapping in Personalize

### Issue: No Variants Showing

**Check:**
1. Middleware configured correctly?
2. Entry UID correct?
3. Content type UID correct?
4. Variant parameters in URL?

**Solution:**
- Check middleware.ts for personalize SDK initialization
- Verify content type and entry UIDs match exactly
- Check browser URL for variant parameters

---

## Quick Reference: AI Template

For faster setup, use the AI template:

1. Go to [Add Personalization Template](../../component-development/ai-prompts/templates/add-personalization-to-component)
2. Fill in customization section
3. Paste into AI assistant
4. Follow generated instructions

---

## Next Steps

After successfully adding personalization to your first component:

1. **Try Different Components:** Apply to other key components
2. **Advanced Segmentation:** Combine multiple attributes
3. **Sequential Testing:** Run tests one after another
4. **Multi-variant Tests:** Test 3+ variants simultaneously
5. **Cross-component Testing:** Test combinations of variants

---

## Additional Resources

- [Personalize Quick Start Guide](../../personalize/quick-start-guide)
- [Personalize Overview](../../personalize/index)
- [Create Attributes Guide](../../personalize/attributes)
- [AI Template for Personalization](../../component-development/ai-prompts/templates/add-personalization-to-component)
- [Official Personalize Docs](https://www.contentstack.com/docs/personalize)
- [Personalize Edge SDK](https://www.contentstack.com/docs/developers/personalize/personalize-edge-sdk)

---

**Ready to personalize your component?** Start with [Step 1: Plan Your Personalization](#step-1-plan-your-personalization-15-minutes)

