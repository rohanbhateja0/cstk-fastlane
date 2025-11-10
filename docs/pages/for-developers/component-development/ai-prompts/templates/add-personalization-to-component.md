# Add Personalization to {ComponentName} Component

## CUSTOMIZATION SECTION - EDIT THESE VALUES

**Component Name:** {ComponentName}
**Component File:** @{ComponentName}.tsx
**Component Documentation:** @{component-name}.md

**Personalization Type:** [Select One]
- [ ] A/B Testing (Test different content variations)
- [ ] Audience Segmentation (Show different content to different audiences)
- [ ] Both A/B Testing and Segmentation

**Personalization Configuration:**
- **Content Type UID:** {content_type_uid} (e.g., "hero_banner")
- **Variant Fields to Personalize:** 
  - [Field 1: e.g., title - Main headline text]
  - [Field 2: e.g., description - Supporting text]
  - [Field 3: e.g., cta_text - Button label]
  - [Additional fields as needed]

**Personalize Project Configuration:**
- **Project UID:** {your_project_uid} (from Contentstack Personalize)
- **Experience Short UID:** {experience_short_uid} (will be provided after experience setup)

**Attributes to Track:** [For audience segmentation]
- [Attribute 1: e.g., utm_source - Traffic source]
- [Attribute 2: e.g., device - Device type]
- [Additional attributes as needed]

**Events to Track:** [For conversion measurement]
- [Event 1: e.g., cta_click - User clicked CTA button]
- [Event 2: e.g., page_view - User viewed component]
- [Additional events as needed]

---

## PERSONALIZATION SETUP TASK - READ FIRST

You are adding Contentstack Personalize functionality to the EXISTING {ComponentName} component.

### Prerequisites Check

CRITICAL: Verify these prerequisites before starting:
1. Personalize project exists in Contentstack (get Project UID)
2. SDK installed: `@contentstack/personalize-edge-sdk`
3. Environment variables configured in `.env.local`:
   ```
   NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=your_project_uid
   CONTENTSTACK_PERSONALIZE_EDGE_API_URL=https://personalize-edge.contentstack.com
   ```
4. Middleware configured with Personalize SDK
5. PersonalizeContext provider exists and is set up

**Reference Documentation:**
- Personalize Setup: @personalize/quick-start-guide.md
- Personalize Overview: @personalize/index.md
- Website Integration: @personalize/quick-start-guide.md#part-4-website-integration

---

## TASK BREAKDOWN

### Phase 1: Personalize Configuration Setup (Contentstack UI)

**Step 1.1: Create Custom Attributes (if needed)**

For each attribute in the customization section:
1. Navigate to Personalize → Attributes
2. Create custom attribute:
   - Name: User-friendly name (e.g., "UTM Source")
   - Key: snake_case identifier (e.g., "utm_source")
   - Description: Clear purpose statement
3. Document the attribute key for later use

**Example MCP Command:**
```typescript
mcp_contentstack_create_an_entry({
  // Note: Attributes are typically created via UI or Management API
  // Document the attribute keys created
})
```

**Step 1.2: Create Events**

For each event in the customization section:
1. Navigate to Personalize → Events
2. Create event:
   - Event Name: User-friendly name (e.g., "CTA Click")
   - Event Key: snake_case identifier (e.g., "cta_click")
   - Description: What action triggers this event
3. Document the event key for component tracking

**Step 1.3: Create Experience**

**For A/B Testing:**
1. Navigate to Personalize → Experiences → Create Experience
2. Select "A/B Test"
3. Configure:
   - Name: "{ComponentName} A/B Test"
   - Content Type: {content_type_uid}
   - Select entry to test
   - Configure variants (Control vs Test variations)
   - Traffic split: 50/50 (or as specified)
   - Add conversion event from Step 1.2
4. Save as Draft (activate after component updates)
5. **Document the Experience Short UID** (shown in UI)

**For Audience Segmentation:**
1. Create Audiences first:
   - Navigate to Personalize → Audiences → Create Audience
   - Define rules using attributes from Step 1.1
   - Example: "utm_source equals 'google'" for Google traffic
2. Create Segmented Experience:
   - Navigate to Experiences → Create Experience
   - Select "Segmented Experience"
   - Configure:
     - Name: "{ComponentName} Segmented"
     - Content Type: {content_type_uid}
     - Select entry
     - Add variants for each audience
     - Map variants to audiences
3. Save as Draft
4. **Document the Experience Short UID**

**Step 1.4: Create Entry Variants**

1. Navigate to your ContentStack stack
2. Go to Content Types → {content_type_uid}
3. Open the specific entry used in the experience
4. Create variants:
   - Click "Create Variant" or "Variants" tab
   - For A/B Test: Create "Control" and "Test" variants
   - For Segmented: Create variant per audience
5. Edit each variant with personalized content:
   - Update fields specified in customization section
   - Ensure content aligns with test hypothesis or audience
6. Publish all variants
7. Link variants to experience in Personalize UI

---

### Phase 2: Component Implementation

**Step 2.1: Update Component File**

Modify the component file (@{ComponentName}.tsx) to add:

1. **Import Personalize Hook:**
```typescript
'use client'; // Add if not already present

import { usePersonalize } from '@/context/PersonalizeContext';
import { useEffect } from 'react';
```

2. **Add Personalize SDK Initialization:**
```typescript
export default function {ComponentName}({ data }: {ComponentName}Props) {
  const personalize = usePersonalize();
  
  // Existing component code...
```

3. **Add Impression Tracking:**

Add this useEffect hook to track when the component is viewed:

```typescript
useEffect(() => {
  if (personalize) {
    // Track impression for the experience
    // Replace with actual Experience Short UID from Step 1.3
    personalize.triggerImpression('{experience_short_uid}');
  }
}, [personalize]);
```

**CRITICAL**: Replace `{experience_short_uid}` with the actual UID from Personalize UI.

**Step 2.2: Add Event Tracking**

For each interactive element that should trigger an event:

**Example: CTA Button Click**
```typescript
const handleCTAClick = async () => {
  // Track the event
  if (personalize) {
    await personalize.triggerEvent('cta_click'); // Use event key from Step 1.2
  }
  
  // Continue with existing click handler logic
  // Example: navigation, modal opening, etc.
};

// In JSX:
<button onClick={handleCTAClick} className="...">
  {data.cta_text}
</button>
```

**Example: Form Submission**
```typescript
const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Track form submission event
  if (personalize) {
    await personalize.triggerEvent('form_submit');
  }
  
  // Continue with form submission logic
};
```

**Step 2.3: Add Attribute Tracking (Optional)**

If component captures user data (form inputs, selections, etc.):

```typescript
const trackUserAttribute = async (attributeKey: string, value: string) => {
  if (personalize) {
    await personalize.set({
      [attributeKey]: value
    });
  }
};

// Example: Track user selection
const handleOptionSelect = async (option: string) => {
  await trackUserAttribute('user_preference', option);
  // Continue with selection logic
};
```

**Step 2.4: Add Loading State (Optional)**

Handle cases where Personalize SDK is still initializing:

```typescript
if (!personalize) {
  // Return loading state or default content
  return <div>Loading...</div>;
}
```

---

### Phase 3: Testing and Validation

**Step 3.1: Local Testing**

1. **Start Dev Server:**
```bash
npm run dev
```

2. **Test Impression Tracking:**
   - Open browser DevTools → Network tab
   - Navigate to page with component
   - Filter for "personalize" or "impression"
   - Verify impression POST request is sent
   - Check request payload contains experience UID

3. **Test Event Tracking:**
   - Click CTA or trigger event action
   - Check Network tab for event POST request
   - Verify event key matches what you created

4. **Test Attributes (if applicable):**
   - Trigger attribute setting
   - Check Network tab for attribute update
   - Verify attribute key and value

**Step 3.2: Verify in Personalize UI**

1. Navigate to Personalize → Experiences
2. Find your experience
3. Check analytics:
   - Impressions count should increment
   - Events should be recorded
   - Variant distribution should show traffic split

**Step 3.3: Test Variants**

1. **Clear Browser Cookies** to reset personalization
2. **Visit Page Multiple Times:**
   - For A/B Tests: You should see different variants
   - For Segmented: Test with different attribute values
3. **Verify Content Changes:**
   - Check that variant-specific content appears
   - Verify all personalized fields render correctly

**Step 3.4: Test with URL Parameters**

For UTM-based personalization:
```
http://localhost:3000/your-page?utm_source=google&utm_campaign=test
```
Verify:
- Attributes captured correctly
- Correct variant shown based on audience rules

---

### Phase 4: Activation and Monitoring

**Step 4.1: Activate Experience**

Once testing is complete:
1. Navigate to Personalize → Experiences
2. Find your draft experience
3. Click "Activate" button
4. Confirm activation

**Step 4.2: Deploy to Production**

1. **Commit Changes:**
```bash
git add .
git commit -m "Add personalization to {ComponentName}"
git push origin main
```

2. **Verify Environment Variables on Vercel:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Confirm `NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID` is set
   - Confirm `CONTENTSTACK_PERSONALIZE_EDGE_API_URL` is set
   - Redeploy if variables were added/changed

**Step 4.3: Monitor Performance**

1. **Check Analytics Daily:**
   - Navigate to Personalize → Experiences → Your Experience
   - Monitor impression counts
   - Track conversion rates
   - Watch for statistical significance

2. **Monitor for Errors:**
   - Check browser console for errors
   - Review Vercel logs for server-side issues
   - Verify no performance degradation

**Step 4.4: Iterate Based on Results**

After collecting sufficient data:
1. Review winning variant (for A/B tests)
2. Adjust audience rules (for segmented experiences)
3. Create new tests for further optimization
4. Update entry variants with new content

---

## IMPLEMENTATION CHECKLIST

### Personalize Configuration
- [ ] Custom attributes created (if needed)
- [ ] Events created for conversion tracking
- [ ] Experience created (A/B Test or Segmented)
- [ ] Entry variants created and published
- [ ] Variants linked to experience
- [ ] Experience Short UID documented

### Component Updates
- [ ] Personalize hook imported
- [ ] Impression tracking added
- [ ] Event tracking added for all interactions
- [ ] Attribute tracking added (if needed)
- [ ] Loading states handled
- [ ] Code follows existing component patterns

### Testing
- [ ] Impression tracking verified in Network tab
- [ ] Event tracking verified in Network tab
- [ ] Variants display correctly
- [ ] Analytics showing in Personalize UI
- [ ] No console errors
- [ ] Performance impact acceptable

### Deployment
- [ ] Experience activated in Personalize
- [ ] Code committed and pushed
- [ ] Environment variables verified on Vercel
- [ ] Production deployment successful
- [ ] Production testing completed
- [ ] Analytics monitoring in place

---

## CODE EXAMPLE: Complete Implementation

Here's a complete example for a HeroBanner component with A/B testing:

```typescript
'use client';

import { usePersonalize } from '@/context/PersonalizeContext';
import { useEffect } from 'react';
import { CMSLink } from '@/core/atoms/Link';
import Image from 'next/image';

interface HeroBannerProps {
  data: {
    title: string;
    description: string;
    cta_text: string;
    cta_link: string;
    image: {
      url: string;
      alt: string;
    };
  };
}

export default function HeroBanner({ data }: HeroBannerProps) {
  const personalize = usePersonalize();
  
  // Track impression when component mounts
  useEffect(() => {
    if (personalize) {
      // Replace 'abc123' with your actual Experience Short UID
      personalize.triggerImpression('abc123');
    }
  }, [personalize]);
  
  // Track CTA click event
  const handleCTAClick = async () => {
    if (personalize) {
      await personalize.triggerEvent('hero_cta_click');
    }
    // Navigation will be handled by CMSLink
  };
  
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <CMSLink href={data.cta_link} onClick={handleCTAClick}>
          {data.cta_text}
        </CMSLink>
      </div>
      <div className="hero-image">
        <Image 
          src={data.image.url} 
          alt={data.image.alt}
          width={1200}
          height={600}
        />
      </div>
    </section>
  );
}
```

---

## TROUBLESHOOTING

### Issue: Impressions Not Tracking

**Symptoms:** No impressions showing in Personalize analytics

**Solutions:**
1. Verify Experience Short UID is correct
2. Check that `personalize` object is not null
3. Confirm experience is activated (not draft)
4. Check browser Network tab for failed requests
5. Verify Project UID in environment variables

### Issue: Events Not Recording

**Symptoms:** Events not appearing in analytics

**Solutions:**
1. Verify event key matches exactly (case-sensitive)
2. Check that event is created in Personalize UI
3. Ensure event tracking code runs after user action
4. Confirm personalize SDK is initialized
5. Check for async/await issues

### Issue: Wrong Variant Showing

**Symptoms:** Expected variant not displaying

**Solutions:**
1. Clear browser cookies to reset
2. Verify variant is published in Contentstack
3. Check variant-to-audience mapping
4. Confirm attributes are being set correctly
5. Verify audience rules in Personalize UI

### Issue: Performance Impact

**Symptoms:** Component loads slowly

**Solutions:**
1. Move impression tracking to useEffect (already done)
2. Use async event tracking (don't await unless needed)
3. Implement loading states
4. Consider edge caching strategies
5. Monitor personalize API response times

---

## ADDITIONAL RESOURCES

- **Personalize Quick Start:** @personalize/quick-start-guide.md
- **Personalize Overview:** @personalize/index.md  
- **Create Attributes:** @personalize/attributes.md
- **Website Integration:** @personalize/quick-start-guide.md#part-4-website-integration
- **Official Personalize Docs:** https://www.contentstack.com/docs/personalize
- **Personalize Edge SDK:** https://www.contentstack.com/docs/developers/personalize/personalize-edge-sdk

---

## BEST PRACTICES

1. **Start Simple:** Begin with one A/B test before complex segmentation
2. **Test Thoroughly:** Verify tracking locally before deploying
3. **Monitor Actively:** Check analytics daily for first week
4. **Document Everything:** Keep Experience UIDs and event keys documented
5. **Iterate Continuously:** Use data to inform next optimizations
6. **Consider Performance:** Minimize tracking calls where possible
7. **Handle Errors Gracefully:** Always check if personalize object exists
8. **Follow Conventions:** Use snake_case for event keys and attribute keys
9. **Meaningful Names:** Give experiences and events descriptive names
10. **Version Control:** Commit personalization changes separately for clarity

---

**REMEMBER:** This prompt adds personalization to an EXISTING component. Do not recreate the component from scratch. Only add the personalization tracking and logic as specified above.

