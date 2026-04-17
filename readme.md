# Product Requirements Document (PRD)
## Wedding Theme Studio — Website Rebuild
### Reference Design: Ovation by Themepul · WTS Content · v1.0

---

## 1. PROJECT OVERVIEW

**Client:** Om Prakash — Wedding Theme Studio  
**Business Address:** RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046  
**Phone:** +91 88024 05067  
**Email:** opomprakash011@gmail.com 
**Instagram:** @weddingthemestudio  
**Business Hours:** Daily · 10:00 AM – 9:30 PM

**Goal:** Build a single-page website for Wedding Theme Studio using the Ovation (Themepul) aesthetic — soft blush/rose editorial style — populated with WTS-specific content, branding, and photography.

**Reference site:** https://tfhtml.themepul.com/ovation/demo/index.html

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette
```css
--blush:    #F5EDE8   /* Main background, footer, schedule sections */
--rose:     #B87355   /* Primary accent — all CTAs, icons, highlights */
--rosedark: #8C5238   /* CTA hover states */
--charcoal: #2C2A28   /* Headings, dark sections */
--body:     #4A4540   /* Body copy */
--muted:    #9A8F88   /* Metadata, subtext, labels */
--white:    #ffffff
--offwhite: #FAF7F5   /* Blog section background */
```

### 2.2 Typography
- **Display / Headings:** `EB Garamond` (italic variant) — logo, hero title
- **Section Headings:** `Cormorant Garamond` 300–600 weight — all section h2/h3
- **Body / UI:** `Jost` 200–600 — nav links, labels, body text, buttons
- All loaded via Google Fonts with `display=swap`

### 2.3 Spacing Scale
- Section vertical padding: `100px` desktop / `60px` mobile
- Max-width container: `1280px`, centered, `padding: 0 40px`
- Grid gaps: `8px` (image grids), `12px` (portfolio), `24px` (cards), `48px`+ (layout splits)

### 2.4 Motion & Animation
- **Scroll reveal:** `opacity: 0 → 1` + `translateY(28px → 0)` · 0.7s ease
- **Reveal left:** `opacity: 0 → 1` + `translateX(-28px → 0)` · 0.7s ease
- **Stagger delays:** `.d1=0.1s` · `.d2=0.2s` · `.d3=0.3s` · `.d4=0.4s`
- **Image hover:** `scale(1.05)` · 0.5s ease
- **Card hover:** `translateY(-4px to -6px)` + box-shadow · 0.3s
- **Preloader:** Spinning ring + fade out after load
- **Custom cursor:** Small dot + larger ring follower (desktop only)
- **Marquee:** Continuous scroll, 18s loop, duplicate items for seamless loop
- **Counter:** Count-up animation on scroll-into-view (IntersectionObserver)

### 2.5 Decorative Elements (SVG)
All floral/botanical decorative elements are inline SVG paths, not images:
- Stems with elliptical leaf shapes
- Stroke-only (no fill), `stroke: #B87355`, `opacity: 0.10–0.15`
- Used in: hero, schedule, portfolio, footer

---

## 3. COMPONENTS & SECTIONS

### 3.1 Preloader
- Full-screen blush background (#F5EDE8)
- Center: Logo text in EB Garamond italic + rose color
- Below logo: spinning ring (CSS `border-top` spinner)
- Fades out + removes self 800ms after `window.load`

### 3.2 Top Bar
```
Left:    "⏰ Working: 10:00am – 9:30pm"  |  "✉ wedding@weddingthemestudio.in"
Right:   "Help / Support / Contact" links  |  "Visit Us: fb  ig  yt" social icons
```
- Background: `--blush`
- Border bottom: `1px solid rgba(184,115,85,0.15)`
- Font: Jost 12px, `--muted` color, letter-spacing 0.05em
- Hidden on mobile (< 1024px)

### 3.3 Navbar
- `position: sticky; top: 0` — stays visible on scroll
- White background; adds `box-shadow` on scroll > 20px
- **Logo:** `EB Garamond italic` · "Wedding Theme Studio" · charcoal with rose accent word
- **Nav links** (desktop, hidden mobile): uppercase 12px Jost · hover rose color + "○" prefix
- **CTA button:** "Get a Quotation" · rose background · white text
- **Mobile:** Hamburger (3 lines) → full-screen white overlay menu with Cormorant Garamond 32px links

### 3.4 Hero Section
- **Layout:** 2-column grid (1fr 1fr) · min-height calc(100vh - 105px)
- **Background color:** `--blush`
- **Left column (image):**
  - Top 65%: Full-bleed wedding couple photo (object-fit: cover)
  - Bottom 35%: 2-column strip of 2 smaller wedding photos
  - Images overlap seamlessly (no gap between sections)
- **Right column (text):**
  - Small italic date line in rose (Cormorant Garamond italic, 15px)
  - Sub caption in muted (13px)
  - H1: Cormorant Garamond · 3 stacked lines · ~68px · charcoal · font-weight 400
    - Line 1: "Om Prakash"
    - Line 2: "Wedding Theme"
    - Line 3: "Studio"
  - 60px rose horizontal divider line
  - Body text (14px Jost, muted, max-width 380px)
  - "Make Reservation" → outlined rose CTA button
- **Decorative SVG:** Small botanical stem in upper-right area, opacity 0.15

### 3.5 About Section
- White background, 100px padding
- **2-column grid:** 5fr text / 7fr image mosaic
- **Text side:**
  - Subtag + Cormorant heading: "Our Wedding Story to Date"
  - 2 paragraphs of body text (see content below)
  - "Make Reservation" outline CTA
- **Image mosaic:** 2×2 grid with first cell spanning full height (row-span 2)
  - Cell 1 (tall): Outdoor ceremony photo
  - Cell 2 (top): Candid couple
  - Cell 3 (bottom): Detail/floral shot
  - All images: hover scale(1.05), overflow hidden

### 3.6 Schedule / Services Section
- **Background:** `--blush`
- **3-column grid** of service cards, no gaps, borders between
- Each card: white background, center-aligned, 52px/40px padding
- **Card anatomy:**
  - Circular blush icon container (80px) with stroke SVG icon (rose)
  - Card name: Cormorant Garamond 22px
  - Time/type tag: rose, 12px uppercase
  - Description text: muted 13px
  - Hover: translateY(-6px) + box-shadow, z-index 1
- Decorative floral SVG left side
- **Services:**
  1. Wedding Photography / Full Day · Candid & Traditional
  2. Pre-Wedding Shoots / Half Day · Outdoor / Studio
  3. Cinematic Films / 4K Videography · Reels

### 3.7 Video Section
- White background
- Section header (centered)
- Full-width video wrap (aspect-ratio 16/7)
- Thumbnail image with dark overlay + white circular play button
- On click: loads YouTube embed (lazy load — no iframe on mount)
- YouTube ID to replace with actual WTS video

### 3.8 Counter / Stats Bar
- **Background:** `--charcoal` (#2C2A28)
- **4 columns** with rose vertical dividers
- Each counter: Cormorant Garamond ~80px number in rose + uppercase label in white/50%
- Numbers animate (count-up) on scroll-into-view
- **Stats:** 500+ Weddings · 10+ Years · 5.0★ Rating · 63+ Reviews
- **Marquee bar** below stats:
  - Text items scrolling right-to-left, infinite loop
  - Cormorant Garamond italic, white/15% opacity
  - Rose ✦ bullet before each item
  - Texts: "Capturing timeless moments" / "Delhi's most trusted wedding studio" / etc.

### 3.9 Portfolio Section
- **Background:** `--blush`
- Section header (left-aligned)
- **Grid:** 7fr main / 5fr side (two stacked items)
- Main image: 540px tall, full bleed, hover overlay with couple name + title
- Side items: two equal-height cells with same hover overlay
- Overlay: gradient bottom, rose couple tag, white Cormorant heading
- Decorative floral SVG right side

### 3.10 Packages / Products Section
- White background
- **4-column card grid**
- Each card: bordered (1px rose/15%), hover lift + shadow
- Card anatomy: image (220px) → price tag (rose) → package name (Cormorant) → stars (rose ★)
- **Packages:** Wedding Photography / Pre-Wedding Shoot / Wedding Films / Reels & Short Films

### 3.11 Reservation / Contact Form
- **Background:** `--charcoal` with background wedding image at 12% opacity
- Center-aligned heading: "We Can't Wait to Meet You!"
- Max-width 900px centered form
- **Row 1 (2-col):** Full name · Email address
- **Row 2 (3-col):** Date picker · Number of guests · Phone number
- Input style: transparent background, bottom-border only (rgba white 0.2), white text
- Submit: full-width rose solid button "Make Reservation"
- On submit: hide form, show success message

### 3.12 Testimonials
- White background
- Left-aligned header
- **3-column card grid**
- Each card: blush background (#F5EDE8), white inside, centered text
- Card anatomy: circular avatar (72px) → name (Cormorant) → role/source (rose 12px) → italic quote
- Hover: translateY(-4px) + box-shadow

### 3.13 Blog
- `--offwhite` background (#FAF7F5)
- Centered header
- **2-column asymmetric grid:** 1fr (large card) / 2fr (2 small stacked)
- Large card: full image (300px) → meta → title → "Continue Reading →" link
- Small cards: 140px image left + text right
- All images: hover scale(1.04)
- Link color: rose

### 3.14 Footer
- **Background:** `--blush`
- Decorative floral SVG left and right (mirrored)
- **Top bar:** Logo left + social icon row right (4 circular bordered buttons)
- **4-column widget grid:** Contact Info / Information / Quick Links / Subscribe
- Subscribe widget: email input + "Subscribe" button
- **Footer nav bar:** Centered horizontal nav links with rose "○" prefix
- **Copyright bar:** centered · "© 2025 Wedding Theme Studio. All Rights Reserved."
- Link colors: rose, hover underline

---

## 4. CONTENT

### 4.1 Hero Content
```
Small label:  "April 2026 onwards — booking open"
Sub caption:  "Capturing your most precious moments"
H1 lines:     "Om Prakash" / "Wedding Theme" / "Studio"
Body:         "Delhi NCR's award-winning wedding photographer with 500+ weddings,
               trusted by couples across India for cinematic storytelling and candid memories."
CTA:          "Make Reservation" → #contact
```

### 4.2 About Content
```
Subtag:  "Our Story"
Heading: "Our Wedding Story to Date"
Para 1:  "Founded by Om Prakash in 2014, Wedding Theme Studio brings over a decade 
          of expertise in capturing the real emotions, candid moments, and cinematic 
          beauty of your wedding day. We focus on stress-free experiences and timeless memories."
Para 2:  "We are here to help you relive the most important days of your life. Our team 
          focuses on real emotions, candid moments, and cinematic storytelling — while 
          giving you a completely stress-free wedding experience."
CTA:     "Make Reservation"
```

### 4.3 Services
```
1. Wedding Photography · Full Day · Candid & Traditional
   "Award-winning photography capturing every emotion, from haldi to reception. 
    We blend traditional elegance with modern candid storytelling."

2. Pre-Wedding Shoots · Half Day · Outdoor / Studio
   "Romantic pre-wedding shoots across Delhi NCR and destination locations, 
    crafting your love story into a beautiful visual narrative."

3. Cinematic Films · 4K Videography · Reels
   "Cinematic wedding films with professional editing, color grading, and drone shots 
    that bring your wedding day back to life in movie quality."
```

### 4.4 Stats / Counter
```
500+   Weddings Captured
10+    Years of Experience
5.0★   Google Rating
63+    Five-Star Reviews
```

### 4.5 Marquee Texts
```
"Capturing timeless moments"
"Delhi's most trusted wedding studio"
"Every tear, every smile, every glance"
"Cinematic wedding films in 4K"
"Founded by Om Prakash · Est. 2014"
```

### 4.6 Testimonials
```
Priya & Rahul · Google Review ★ 5.0
"Excellent service and best quality pictures. The team was so professional and made us 
 feel comfortable throughout. Every emotion captured perfectly."

Meera & Arjun · Google Review · November 2024
"Om Prakash captured emotions we didn't even know existed. The album is everything 
 we dreamed of. Truly outstanding work from start to finish."

Pooja & Vikram · Google Review · October 2023
"Worth every rupee. The drone shots of our venue left our entire family speechless. 
 We couldn't have asked for a better, more dedicated team."
```

### 4.7 Contact Info (Footer & Form)
```
Phone:    +91 88024 05067  (click-to-call: tel:+918802405067)
Email:    wedding@weddingthemestudio.in
Address:  RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046
Hours:    Daily · Open until 9:30 PM
```

### 4.8 Blog Post Titles
```
1. "10 Tips for the Perfect Wedding Photo Album in Delhi NCR" — 12 Apr, 2026
2. "Why Pre-Wedding Shoots Matter: A Photographer's Perspective" — 5 Mar, 2026
3. "Choosing the Right Wedding Photographer: 5 Questions to Ask" — 18 Feb, 2026
```

### 4.9 Package Names + Pricing
```
Wedding Photography    — From ₹27,000/day
Pre-Wedding Shoot      — Custom pricing
Wedding Films          — 4K Cinematic
Reels & Short Films    — Social Media Ready
```

---

## 5. IMAGES

Replace all placeholder Unsplash URLs with actual WTS photography:

| Slot | Description | Unsplash Placeholder |
|------|-------------|----------------------|
| Hero main | Wedding couple portrait | photo-1583939003579 |
| Hero strip 1 | Wedding detail/candid | photo-1519741497674 |
| Hero strip 2 | Ceremony shot | photo-1606216794074 |
| About cell 1 (tall) | Outdoor ceremony | photo-1529636798458 |
| About cell 2 | Couple moment | photo-1519741497674 |
| About cell 3 | Detail/floral | photo-1606216794074 |
| Video thumbnail | Romantic couple | photo-1519741497674 |
| Portfolio main | Signature couple | photo-1583939003579 |
| Portfolio side 1 | Pre-wedding | photo-1529636798458 |
| Portfolio side 2 | Ceremony | photo-1606216794074 |
| Package 1 | Wedding ceremony | photo-1583939003579 |
| Package 2 | Pre-wedding | photo-1529636798458 |
| Package 3 | Cinematography | photo-1519741497674 |
| Package 4 | Reels shot | photo-1606216794074 |
| Blog big | Couple editorial | photo-1606216794074 |
| Blog sm 1 | Outdoor romantic | photo-1519741497674 |
| Blog sm 2 | Ceremony candid | photo-1529636798458 |
| Reservation BG | Atmospheric scene | photo-1519741497674 |

---

## 6. JAVASCRIPT BEHAVIORS

### 6.1 Preloader
```js
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
    setTimeout(() => document.getElementById('preloader').remove(), 500);
  }, 800);
});
```

### 6.2 Custom Cursor (desktop)
```js
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 80);
});
```

### 6.3 Scroll Reveal (IntersectionObserver)
```js
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left').forEach(el => revealObserver.observe(el));
```

### 6.4 Count-Up Animation
```js
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target) {
      const target = parseInt(e.target.dataset.target);
      let n = 0; const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        e.target.textContent = n + '+';
        if (n >= target) clearInterval(t);
      }, 28);
      countObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
```

### 6.5 YouTube Lite Embed
```js
function loadVideo() {
  const wrap = document.getElementById('videoWrap');
  wrap.innerHTML = `<iframe ... src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" ...></iframe>`;
}
```
> Replace `VIDEO_ID` with actual WTS YouTube video ID.

### 6.6 Navbar Shadow on Scroll
```js
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('shadow', window.scrollY > 20);
});
```

---

## 7. SEO & META

```html
<title>Best Wedding Photographer in Delhi NCR | Wedding Theme Studio</title>
<meta name="description" content="Wedding Theme Studio by Om Prakash — 500+ weddings,
  5.0 ⭐ Google Rating. Luxury wedding photography & cinematic videography in Delhi NCR.
  Packages from ₹27,000/day."/>
<meta property="og:title" content="Wedding Theme Studio | Cinematic Wedding Photography Delhi"/>
<meta property="og:description" content="Delhi's trusted wedding photography studio.
  500+ weddings | 10+ years | 5.0 Google Rating."/>
<link rel="canonical" href="https://weddingthemestudio.in/"/>
<meta name="robots" content="INDEX,FOLLOW"/>
```

### LocalBusiness Schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Wedding Theme Studio",
  "url": "https://weddingthemestudio.in",
  "telephone": "+918802405067",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "RZ-64/284, Geetanjali Park, West Sagarpur",
    "addressLocality": "New Delhi",
    "postalCode": "110046",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Su 10:00-21:30",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "63" },
  "priceRange": "₹₹₹",
  "sameAs": [
    "https://www.instagram.com/weddingthemestudio/",
    "https://www.facebook.com/",
    "https://www.youtube.com/"
  ]
}
```

---

## 8. TECH STACK RECOMMENDATIONS

### Option A — Plain HTML (Delivered)
- Single `.html` file, no build step
- Google Fonts via CDN
- Vanilla JS (no jQuery needed)
- Inline SVG decoratives
- **Best for:** Direct deploy, simple hosting (Netlify, Vercel static)

### Option B — React + Vite (Scale-up)
```
React + Vite + TypeScript
Tailwind CSS (with custom color tokens from §2.1)
Framer Motion (for richer animations)
react-helmet-async (SEO)
react-hook-form + Zod (form validation)
```

### Option C — Next.js (SEO-First)
```
Next.js 14 App Router
Tailwind CSS
Framer Motion
next/image for optimized photography
Server-side rendering for SEO
```

---

## 9. RESPONSIVE BREAKPOINTS

| Breakpoint | Layout Changes |
|-----------|---------------|
| > 1024px | Full desktop layout, all columns visible |
| ≤ 1024px | Hero stacks (image top, text bottom); about stacks; schedule single col; portfolio single col; 2-col counter; nav links hidden → hamburger |
| ≤ 768px | Packages 2-col; footer 2-col; blog stacks |
| ≤ 600px | Packages 1-col; footer 1-col; counter 2-col; form rows collapse to 1-col |

---

## 10. DEPLOYMENT CHECKLIST

- [ ] Replace all Unsplash placeholder images with actual WTS photography
- [ ] Update YouTube video ID in `loadVideo()` function with real WTS video
- [ ] Update Instagram link to `https://www.instagram.com/weddingthemestudio/`
- [ ] Update WhatsApp link to `https://wa.me/918802405067`
- [ ] Set up contact form backend (PHP mailer / EmailJS / Formspree)
- [ ] Add Google Analytics tracking code
- [ ] Add Google Search Console verification meta tag
- [ ] Add actual favicon (WTS logo PNG, 32×32 and 192×192)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test page speed (Lighthouse target: 90+ Performance)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify LocalBusiness schema at schema.org validator

---

## 11. FILE STRUCTURE (if converting to multi-file)

```
wedding-theme-studio/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── img/
│   │   ├── hero/
│   │   │   ├── hero-main.jpg
│   │   │   ├── hero-strip-1.jpg
│   │   │   └── hero-strip-2.jpg
│   │   ├── about/
│   │   ├── portfolio/
│   │   ├── packages/
│   │   ├── blog/
│   │   └── favicons/
│   └── fonts/          ← optional local font hosting
└── README.md
```

---

*Wedding Theme Studio · PRD v1.0 · April 2026 · Ovation Style Reference*g