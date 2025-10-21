# Common Verification & Testing Workflow

This workflow provides comprehensive checklists and procedures for verifying component implementation.

## Overview

Proper verification ensures:
- Components render correctly
- ContentStack integration works
- Live preview functions properly
- Content updates reflect on the site
- Responsive design works across devices
- Accessibility standards are met

---

## Step 1: Verify in ContentStack Dashboard

Check that all content is properly configured in ContentStack.

### Content Type Verification

**Navigate to:** Content Models → Your Component

- ✅ Content type exists with correct UID
- ✅ All fields are present and correctly configured
- ✅ Field types match requirements
- ✅ Default values are set appropriately
- ✅ Help text is clear for content authors
- ✅ Validation rules are correct

---

### Page Content Type Verification

**Navigate to:** Content Models → Page

- ✅ FastLane Components field exists
- ✅ Your component block is present in blocks array
- ✅ Block title is descriptive
- ✅ Reference field points to correct content type
- ✅ Multiple/single reference setting is correct

---

### Entry Verification

**Navigate to:** Entries → Your Component

- ✅ Entry is created successfully
- ✅ All required fields are populated
- ✅ Images are uploaded and referenced
- ✅ Links are valid and complete
- ✅ Entry is published (green status indicator)
- ✅ Published to correct environment(s)
- ✅ Published in correct locale(s)

---

### Page Entry Verification

**Navigate to:** Entries → Page → Your Page

- ✅ Page entry is published
- ✅ FastLane Components contains your component block
- ✅ Component reference UID is correct
- ✅ Reference shows linked entry (not broken link icon)
- ✅ All referenced entries are published
- ✅ Publish details show successful deployment

---

## Step 2: Test in Browser

Verify the component renders correctly in the application.

### Initial Load Test

**URL:** `http://localhost:3000/your-page-url`

**All URL variations should work (case-insensitive routing):**
- `http://localhost:3000/news`
- `http://localhost:3000/News`
- `http://localhost:3000/NEWS`

**Verification:**
- ✅ Page loads without errors
- ✅ Component appears on the page
- ✅ Component is in the correct position
- ✅ No console errors in browser DevTools
- ✅ No 404 or network errors

---

### Visual Verification

Compare component with Figma design:

**Typography:**
- ✅ Font families match Figma (Zodiak for headings, Satoshi for body)
- ✅ Font sizes match exact pixel values
- ✅ Font weights are correct
- ✅ Line heights match specifications
- ✅ Letter spacing is accurate
- ✅ Text colors match hex values

**Layout:**
- ✅ Container max-width is correct
- ✅ Padding matches Figma spacing
- ✅ Margins match Figma spacing
- ✅ Gap between elements is accurate
- ✅ Element alignment is correct
- ✅ Border radius matches specifications

**Colors:**
- ✅ Background colors match Figma
- ✅ Text colors match exact hex values
- ✅ Border colors are correct
- ✅ Button colors match specifications
- ✅ Hover states use correct colors

**Images:**
- ✅ Images load successfully
- ✅ Image dimensions are correct
- ✅ Image aspect ratios are maintained
- ✅ Border radius on images is correct
- ✅ Object-fit behavior is appropriate
- ✅ Alt text is present and meaningful

---

### Content Verification

Check that all content displays correctly:

- ✅ Title renders with correct text
- ✅ Description shows complete content
- ✅ Rich text content formats properly
- ✅ Images display at correct size
- ✅ Links are clickable and functional
- ✅ Buttons render with correct styling
- ✅ Icons appear correctly (if applicable)

---

### Responsive Design Testing

Test component across different screen sizes:

#### Desktop (≥1280px)
- ✅ Component fills container appropriately
- ✅ Grid shows correct number of columns
- ✅ Text is readable and well-spaced
- ✅ Images scale appropriately
- ✅ No horizontal scrolling

#### Tablet (768px - 1279px)
- ✅ Layout adapts to smaller width
- ✅ Grid adjusts to tablet column count
- ✅ Font sizes remain readable
- ✅ Touch targets are appropriate size (≥44px)
- ✅ Navigation works on touch devices

#### Mobile (≤767px)
- ✅ Single column layout (or appropriate mobile layout)
- ✅ All content is accessible
- ✅ Text is readable without zooming
- ✅ Images scale down appropriately
- ✅ Buttons are touch-friendly
- ✅ No content is cut off or hidden

**Testing Tools:**
- Browser DevTools responsive mode
- Physical devices (phone, tablet)
- BrowserStack or similar testing platform

---

### Interactive Elements Testing

Test all interactive features:

**Links:**
- ✅ Primary link navigates correctly
- ✅ Secondary link navigates correctly
- ✅ External links open in new tab (if intended)
- ✅ Link hover states work
- ✅ Link focus states are visible

**Buttons:**
- ✅ Buttons are clickable
- ✅ Hover states trigger correctly
- ✅ Active states show feedback
- ✅ Focus states are visible (keyboard navigation)
- ✅ Button text is readable

**Images:**
- ✅ Images load on hover (if lazy loaded)
- ✅ Image zoom/lightbox works (if applicable)
- ✅ Image alt text appears on load failure

---

## Step 3: Test Live Preview

Verify ContentStack's live preview functionality:

### Setup Live Preview

1. **Open ContentStack CMS**
2. **Navigate to your component entry**
3. **Click "Live Preview" button** (top right)
4. **Wait for preview to load**

---

### Live Preview Verification

**Initial State:**
- ✅ Preview pane loads the page
- ✅ Component is visible in preview
- ✅ Edit tags are visible (hover over elements)
- ✅ No errors in preview console

**Edit Content:**
1. Change title text in CMS
2. ✅ Title updates immediately in preview
3. Change description text
4. ✅ Description updates in preview
5. Change image
6. ✅ New image appears in preview

**Edit Rendering Options:**
1. Change header tag (e.g., H2 → H3)
2. ✅ Header tag updates in HTML (check with DevTools)
3. Toggle hide_image option
4. ✅ Image shows/hides accordingly

**Save and Publish:**
1. Click "Save" in CMS
2. ✅ Changes persist after save
3. Click "Publish"
4. ✅ Changes appear on live site after publish

---

## Step 4: Test Content Updates

Verify the full content update workflow:

### Update Component Entry

1. **Navigate to ContentStack → Entries → Your Component**
2. **Edit an entry**
3. **Make changes to content**
4. **Save changes**
5. **Publish entry**

**Verification:**
- ✅ Changes save successfully
- ✅ Publish completes without errors
- ✅ Version number increments
- ✅ Publish queue shows success

---

### Verify Updates on Site

1. **Refresh page in browser** (`Cmd+Shift+R` or `Ctrl+Shift+R` to clear cache)
2. ✅ Updated content appears
3. ✅ Images update if changed
4. ✅ Links work if modified
5. ✅ No rendering errors
6. ✅ Console shows no errors

---

## Step 5: Accessibility Testing

Ensure component meets accessibility standards:

### Keyboard Navigation

**Test:** Tab through interactive elements

- ✅ Can reach all interactive elements via Tab
- ✅ Focus indicators are clearly visible
- ✅ Tab order is logical (top to bottom, left to right)
- ✅ Can activate buttons/links with Enter or Space
- ✅ Can navigate back with Shift+Tab

---

### Screen Reader Testing

**Test:** Use screen reader (NVDA, JAWS, VoiceOver)

- ✅ Component structure is announced correctly
- ✅ Headings are properly announced with level
- ✅ Images have descriptive alt text
- ✅ Links announce their purpose
- ✅ Buttons announce their function
- ✅ Dynamic content changes are announced

---

### Semantic HTML

**Test:** Inspect HTML in DevTools

- ✅ Proper heading hierarchy (h1 → h2 → h3, no skips)
- ✅ Semantic elements used (`<header>`, `<nav>`, `<main>`, etc.)
- ✅ Images have `alt` attributes
- ✅ Links have descriptive text (not "click here")
- ✅ Buttons use `<button>` element (not divs with click handlers)

---

### Color Contrast

**Test:** Use browser extension or online tool

- ✅ Text meets WCAG AA contrast ratio (4.5:1)
- ✅ Large text meets WCAG AA contrast ratio (3:1)
- ✅ Interactive elements have sufficient contrast
- ✅ Focus indicators meet contrast requirements

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- Chrome DevTools Lighthouse

---

## Step 6: Performance Testing

Check component performance:

### Load Time

**Test:** Monitor network tab in DevTools

- ✅ Component renders within 2 seconds
- ✅ Images are optimized (WebP, appropriate size)
- ✅ No unnecessary requests
- ✅ Assets are cached appropriately

---

### Image Optimization

- ✅ Images use Next.js Image component
- ✅ Responsive image sizes are generated
- ✅ Images lazy load when appropriate
- ✅ WebP format is used when supported
- ✅ Images have width and height attributes

---

### Lighthouse Audit

**Test:** Run Lighthouse in Chrome DevTools

- ✅ Performance score ≥ 90
- ✅ Accessibility score ≥ 90
- ✅ Best Practices score ≥ 90
- ✅ SEO score ≥ 90

---

## Step 7: Cross-Browser Testing

Test component in multiple browsers:

### Desktop Browsers

**Chrome:**
- ✅ Component renders correctly
- ✅ All features work
- ✅ No console errors

**Firefox:**
- ✅ Component renders correctly
- ✅ Styles match Chrome
- ✅ All features work

**Safari:**
- ✅ Component renders correctly
- ✅ Fonts load properly
- ✅ All features work

**Edge:**
- ✅ Component renders correctly
- ✅ All features work

---

### Mobile Browsers

**Safari iOS:**
- ✅ Touch interactions work
- ✅ Fonts render correctly
- ✅ Layout is responsive

**Chrome Android:**
- ✅ Touch interactions work
- ✅ Layout is responsive
- ✅ No performance issues

---

## Comprehensive Verification Checklist

Use this master checklist to ensure complete verification:

### ContentStack Configuration
- ✅ Content type created successfully
- ✅ All fields present and correct
- ✅ Page content type updated
- ✅ Component block added to page builder
- ✅ Entry created and populated
- ✅ Entry published to correct environment
- ✅ Page entry includes component reference
- ✅ Page entry published successfully

### Component Implementation
- ✅ TypeScript types defined
- ✅ Component file created
- ✅ Reference fetching implemented (if needed)
- ✅ Live preview tags added
- ✅ Component registered in render system
- ✅ GetPage query updated
- ✅ Documentation created

### Visual Implementation
- ✅ Typography matches Figma exactly
- ✅ Colors match Figma hex values
- ✅ Spacing matches Figma pixel values
- ✅ Layout matches Figma structure
- ✅ Images display correctly
- ✅ Responsive design works on all devices

### Functionality
- ✅ Component renders without errors
- ✅ All content displays correctly
- ✅ Links and buttons work
- ✅ Hover states function properly
- ✅ Focus states are visible
- ✅ Live preview updates in real-time

### Accessibility
- ✅ Keyboard navigation works
- ✅ Screen reader announces correctly
- ✅ Semantic HTML is used
- ✅ Color contrast meets WCAG AA
- ✅ Focus indicators are visible

### Performance
- ✅ Page loads quickly
- ✅ Images are optimized
- ✅ No unnecessary network requests
- ✅ Lighthouse scores are good

### Cross-Browser
- ✅ Works in Chrome
- ✅ Works in Firefox
- ✅ Works in Safari
- ✅ Works in Edge
- ✅ Works on iOS
- ✅ Works on Android

---

## Troubleshooting Common Issues

### Component Not Rendering

**Possible causes:**
- Component not registered in render-components.tsx
- Entry not published
- Reference UID incorrect
- GetPage query missing reference path

**Solutions:**
- Check render-components.tsx has correct case statement
- Verify entry is published in ContentStack
- Double-check UID spelling in page entry
- Add reference path to GetPage query

---

### Styling Not Matching Figma

**Possible causes:**
- Using Tailwind scale instead of exact values
- Missing font-family declarations
- Incorrect color values
- Missing responsive breakpoints

**Solutions:**
- Use arbitrary values: `text-[48px]`
- Add font-family: `font-['Zodiak']`
- Use exact hex values: `text-[#18181b]`
- Add responsive classes: `md:text-[32px]`

---

### Live Preview Not Updating

**Possible causes:**
- Missing `$` tags in component
- Live preview environment variables not set
- ContentStack preview not configured
- Browser cache issues

**Solutions:**
- Add `{...entry.$?.container}` and field tags
- Check `.env.local` has preview variables
- Configure preview URL in ContentStack
- Clear browser cache and reload

---

### Images Not Displaying

**Possible causes:**
- Asset not uploaded to ContentStack
- Incorrect asset UID in entry
- Image URL not whitelisted in next.config.mjs
- Image component not imported

**Solutions:**
- Upload image to ContentStack assets
- Copy correct UID from ContentStack
- Add `images.contentstack.io` to remotePatterns
- Import and use Next.js Image component

---

## Sign-Off Criteria

Component is ready for production when:

- ✅ All checklist items are complete
- ✅ No known bugs or issues
- ✅ Cross-browser testing passed
- ✅ Accessibility audit passed
- ✅ Performance metrics are acceptable
- ✅ Documentation is complete
- ✅ Code review completed (if applicable)
- ✅ Stakeholder approval received

---

## Next Steps After Verification

1. **Merge code** to development branch
2. **Deploy to staging** environment
3. **Perform UAT** (User Acceptance Testing)
4. **Deploy to production** environment
5. **Monitor** for issues post-launch
6. **Document** any lessons learned

---

**Congratulations!** Your component is fully implemented, tested, and ready for use. 🎉

