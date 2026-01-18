# SEO & Social Media Setup Guide

## ✅ What's Been Configured

### 1. **Metadata (app/layout.tsx)**
- ✅ Open Graph tags for Facebook, LinkedIn, etc.
- ✅ Twitter Card tags
- ✅ SEO keywords and descriptions
- ✅ Canonical URLs
- ✅ Robots meta tags

### 2. **Structured Data (components/structured-data.tsx)**
- ✅ Organization schema (Schema.org)
- ✅ SoftwareApplication schema
- ✅ WebSite schema with search action

### 3. **Sitemap (app/sitemap.ts)**
- ✅ Automatic sitemap generation
- ✅ Accessible at `/sitemap.xml`

### 4. **Robots.txt (public/robots.txt)**
- ✅ Configured for search engine crawling
- ✅ Points to sitemap

## 🔧 Required Setup Steps

### Step 1: Set Your Site URL

Add to your `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Replace `https://yourdomain.com` with your actual domain (e.g., `https://continuum.app` or `https://getcontinuum.com`).

### Step 2: Create Open Graph Image

You need to create an `og-image.png` file in the `public/` folder.

**Requirements:**
- **Size**: 1200x630 pixels (recommended)
- **Format**: PNG or JPG
- **File**: Save as `public/og-image.png`

**What to include:**
- Your Continuum logo
- Tagline: "Unified Intelligence for Teams"
- Key visual elements matching your brand
- Clean, readable design

**Tools to create it:**
1. **Canva** (easiest): Use their "Social Media" → "Facebook Post" template (1200x630px)
2. **Figma**: Create a 1200x630px frame
3. **Photoshop/GIMP**: Create a new 1200x630px canvas
4. **Online tools**: 
   - https://www.canva.com/
   - https://og-image.vercel.app/ (generates programmatically)

**Quick Canva Template:**
1. Go to canva.com
2. Create custom size: 1200 x 630
3. Add your logo
4. Add text: "Continuum - Unified Intelligence for Teams"
5. Add subtitle: "Stop context switching. Unify your workflow."
6. Use your brand colors (accent orange)
7. Export as PNG
8. Save to `public/og-image.png`

### Step 3: Verify Social Media Previews

After deploying, test your previews:

1. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Open Graph Preview**: https://www.opengraph.xyz/

**Note**: After updating your og-image, you may need to clear the cache:
- Facebook: Use the Sharing Debugger and click "Scrape Again"
- Twitter: Wait a few hours or use the validator
- LinkedIn: Use the Post Inspector

### Step 4: Google Search Console (Optional but Recommended)

1. Go to https://search.google.com/search-console
2. Add your property (your domain)
3. Verify ownership (DNS or HTML file)
4. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

### Step 5: Add Verification Codes (Optional)

If you want to verify your site with search engines, add to `app/layout.tsx` in the `verification` object:

```typescript
verification: {
  google: "your-google-verification-code",
  // Add others as needed
},
```

## 📊 Current Metadata Summary

- **Title**: "Continuum | Unified Intelligence for Teams"
- **Description**: Optimized for search and social sharing
- **Keywords**: Productivity, team collaboration, Slack bot, etc.
- **OG Image**: `/og-image.png` (you need to create this)
- **Twitter Card**: Large image card
- **Structured Data**: Organization, SoftwareApplication, WebSite schemas

## 🚀 Testing Checklist

Before going live, verify:

- [ ] `NEXT_PUBLIC_SITE_URL` is set in `.env.local`
- [ ] `og-image.png` exists in `public/` folder (1200x630px)
- [ ] Test Twitter card preview
- [ ] Test Facebook/LinkedIn preview
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Check structured data with Google's Rich Results Test: https://search.google.com/test/rich-results

## 📝 Notes

- The sitemap will automatically update when you add new pages
- All metadata is centralized in `app/layout.tsx`
- Structured data helps with rich snippets in search results
- Social media platforms cache previews, so changes may take time to appear
