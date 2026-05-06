# PRD Document Template
## Wedding Photography Studio Website

---

## 1. Project Overview

### Project Name
**_[STUDIO NAME]_** - Wedding Photography Studio Website

### Project Type
Professional wedding photography studio website with booking functionality, portfolio showcase, and service offerings.

### Core Functionality Summary
A premium, elegant wedding photography studio website featuring cinematic visual storytelling, service showcases, booking/contact forms with WhatsApp integration, portfolio gallery with lightbox functionality, and a premium user experience with smooth scroll animations and micro-interactions.

### Target Users
- Couples planning weddings seeking professional photography/videography services
- Wedding planners and event coordinators looking for vendor partnerships
- Individuals seeking pre-wedding, maternity, corporate, and commercial photography
- Destination wedding clients from across India and internationally

---

## 2. Technical Stack

### Frontend Framework
- **React 18.3** with TypeScript
- **Vite** as build tool
- **React Router v6** for client-side routing

### UI Libraries & Components
- **Tailwind CSS v3.4** for styling
- **Radix UI** (via shadcn/ui components) for accessible UI primitives
- **Lucide React** for icons
- **Framer Motion** for animations and page transitions
- **GSAP + ScrollTrigger** for advanced scroll-based animations
- **Splitting.js** for text reveal/splitting animations
- **Lenis** for smooth scroll behavior

### Form & Validation
- **React Hook Form** for form handling
- **Zod** for schema validation
- **@hookform/resolvers** for Zod integration

### Backend Integration
- **Supabase** for backend-as-a-service (bookings, data storage)
- **@tanstack/react-query** for server state management

### Additional Libraries
- **date-fns** for date manipulation
- **clsx + tailwind-merge** for conditional classnames
- **next-themes** (optional for dark mode)
- **embla-carousel-react** for carousel functionality
- **vaul** for drawer components
- **sonner** for toast notifications

---

## 3. Site Architecture

### Navigation Structure

```
├── Home (/)
├── About (/about)
├── Services (/services)
├── Portfolio (/portfolio)
│   └── Portfolio Files (/portfolio-files)
├── Pre-Wedding (/pre-wedding)
├── Packages (/pricing)
├── Contact (/contact)
└── Blog (/blog) - placeholder
```

### Page Hierarchy & Flow

```
Homepage
├── Hero Section (parallax imagery, CTA)
├── Marquee Banner
├── About Preview Section
├── Why Us / Value Proposition
├── Services Overview
└── CTA Section

About Page
├── Hero with Background Image
├── Founder Story Section
├── Core Values/Philosophy Grid
├── Team Portraits Gallery
└── Quote Section

Services Page
├── Hero Header
├── Service Cards (alternating layout)
│   ├── Destination Wedding
│   ├── Pre-Wedding Shoot
│   ├── Candid Shoot
│   ├── Wedding Shoot
│   ├── Cinematic Shoot
│   ├── Maternity Shoot
│   ├── Corporate Events
│   └── Commercial Shoots
└── CTA with Star Rating

Portfolio Page
├── Category Filter Bar (sticky)
├── Masonry Grid Gallery
├── Lightbox Modal
└── CTA Section

Pre-Wedding Page
├── Header Section
├── Image Grid
├── Lightbox Functionality
└── Booking CTA

Pricing Page
├── Header Section
├── Package Cards (3 tiers)
│   ├── Essentials
│   ├── Signature (Most Popular)
│   └── Luxury
├── FAQ Accordion
└── Additional Notes

Contact Page
├── Header Section
├── Contact Form (with validation)
├── Studio Location Info
├── Google Maps Embed
└── WhatsApp Integration
```

---

## 4. Design System

### Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Blush | `#FAF9F6` | Primary background |
| Rose | `#D29C8E` | Primary accent, CTAs |
| Rose Dark | `#BA7D6E` | Hover states |
| Sukuna | `#D23669` | Alternative accent (Index page) |
| Charcoal | `#1A1A1A` | Primary text, dark backgrounds |
| Body | `#4A4540` | Body text |
| Muted | `#9A8F88` | Secondary text, captions |
| Gold | `#D4AF37` | Premium highlights (BookingModal) |
| White | `#FFFFFF` | Cards, contrast backgrounds |

### Typography

| Font Family | Role | Weights |
|-------------|------|---------|
| **EB Garamond** | Logo, Display headings | 400, 500, 600 |
| **Cormorant Garamond** | Headings, Section titles | 300, 400, 500, 600 |
| **Jost** | Body text, UI elements | 200, 300, 400, 500, 600, 700 |

### Font Scale
- Logo: 24px italic
- Hero titles: clamp(48px, 10vw, 100px)
- Section h2: clamp(32px, 5vw, 68px)
- Section h3: 20px - 40px
- Body: 14px - 15px
- Captions/Tags: 10px - 11px uppercase tracking-widest

### Spacing System
- Section padding: `py-24 lg:py-40`
- Container max-width: `1280px` (custom `max-w-site`)
- Component gaps: 8px, 16px, 24px, 32px, 48px, 64px

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 5. Component Inventory

### Global Components

#### Navbar
- **Top bar**: Contact info, social links, working hours (desktop only)
- **Main nav**: Logo, navigation links, CTA button
- **Mobile**: Hamburger menu with full-screen overlay
- **States**: Default (transparent bg) / Scrolled (white bg + blur + shadow)
- **Booking modal trigger**: Opens booking form modal

#### Footer
- Logo + Social icons row
- 4-column grid: Contact Info, Information, Quick Links, Newsletter
- Copyright bar
- Decorative FloralSVG elements

#### Preloader
- Full-screen overlay with logo
- Animated progress bar
- Smooth exit animation (slide up + fade)

#### Custom Cursor
- Small dot cursor
- Larger follower circle
- Hover states on interactive elements

#### WhatsApp Float
- Fixed position bottom-right
- Pulsing animation
- Opens WhatsApp chat link

#### ScrollToTop
- Appears after scrolling
- Smooth scroll to top

#### Booking Modal
- Modal overlay with blur backdrop
- Multi-field form with validation
- Service checkboxes
- Success state
- WhatsApp fallback link

### Animation Components

| Component | Animation Type | Library |
|-----------|---------------|---------|
| RollReveal | Vertical reveal on scroll | Custom + Framer Motion |
| TextReveal | Text reveal with typing effect | Custom |
| RevealOnScroll | Fade + slide on viewport entry | Custom |
| FallingPetals | Animated falling petals overlay | CSS keyframes |
| FloralSVG | Decorative floral elements | Static SVG |

### Page-Specific Components

#### Portfolio Grid
- Masonry/column layout
- Filter tabs (All, Wedding, Destination, Pre-Wedding, Cinematic Films)
- Hover overlay with search icon
- Aspect ratios: portrait (3/4), landscape (4/3), square

#### Lightbox
- Full-screen overlay
- Image zoom animation
- Close button
- Click outside to close

#### Service Card (Services Page)
- Large image with hover zoom
- Tag label
- Title with accent word
- Description
- Arrow link

#### Package Card (Pricing Page)
- Badge for featured packages
- Price display
- Feature list with check/x icons
- CTA button

#### FAQ Accordion (Pricing Page)
- Expandable sections
- Smooth height animation
- Chevron rotation indicator

---

## 6. Site Configuration

### Configuration File Structure (`src/config/siteConfig.ts`)

```typescript
SITE_CONFIG = {
  // Social Links
  social: {
    instagram: string,
    youtube: string,
    facebook: string,
    whatsapp: string,
  },

  // Contact Information
  contact: {
    phone: string,
    phoneDisplay: string,
    email: string,
    address: string,
    hours: string,
  },

  // Portfolio Items
  portfolioItems: [
    { src: string, cat: string, location: string, aspect: string }
  ],

  // Film Thumbnails
  filmThumbnails: { film1, film2, film3 },

  // Branding
  brand: {
    name: string,
    tagline: string,
    description: string,
    founded: string,
    founder: string,
  },

  // SEO
  seo: {
    title: string,
    description: string,
    keywords: string,
    rating: number,
    reviewCount: number,
  },

  // WhatsApp Link
  whatsappLink: string,
}

// Additional Data Arrays
TESTIMONIALS = [{ quote, couple, source }]
FAQS = [{ q, a }]
```

---

## 7. Forms & Validation

### Contact Form Schema
```typescript
{
  name: string (min 2, max 100, required)
  email: string (valid email, required)
  phone: string (10-digit Indian mobile, required)
  weddingDate: string (required)
  venueCity: string (min 2, max 100, required)
  services: string[] (optional)
  message: string (max 1000, optional)
}
```

### Booking Modal Schema
Same as Contact Form

### Form Service Options
- Photography
- Cinematography
- Pre-Wedding
- Drone Coverage
- Luxury Album

### Form Submissions
- Insert into Supabase `bookings` table
- Toast notification on success/error
- WhatsApp fallback for failures

---

## 8. Animations & Interactions

### Scroll Animations
- **Parallax**: Hero images move at different speeds on scroll
- **Scale**: Images scale up slightly (1 → 1.05) on scroll
- **Fade In**: Elements fade in when entering viewport
- **Slide In**: Elements slide from left/right/bottom
- **Rotate X**: 3D card flip effect on service cards

### Hover Interactions
- **Image zoom**: Scale 1.05 - 1.1 on hover
- **Button lift**: translateY(-1) + shadow increase
- **Nav link**: Color transition to accent
- **Portfolio overlay**: Opacity reveal with icon

### Text Animations
- **Split text**: Characters animate in sequentially
- **Typewriter**: Text reveals character by character
- **Marquee**: Continuous horizontal scroll

### Page Transitions
- **Lenis**: Smooth scroll with custom easing
- **Preloader**: Full-screen loading state
- **Modal**: Scale + fade in/out

### Floating Elements
- **Floral decorations**: Gentle floating animation
- **CTA elements**: Subtle up/down movement

---

## 9. Data Structure Examples

### Portfolio Item
```typescript
{
  src: "/studio-images/02.jpg.jpeg",
  cat: "Wedding",
  location: "Hindu Wedding",
  aspect: "portrait" // portrait | landscape | square
}
```

### Service Item
```typescript
{
  tag: "Destination",
  title: "DESTINATION WEDDING",
  desc: "Long description text...",
  img: imageImport,
  reverse: false // for alternating layout
}
```

### Package Item
```typescript
{
  name: "Signature",
  price: "Custom",
  badge: "Most Popular",
  features: [
    { label: "Hours Covered", val: "12 hours" },
    { label: "Drone Coverage", val: true },
    // ...
  ]
}
```

---

## 10. Key Features Checklist

### Homepage
- [ ] Hero section with parallax imagery (3 images)
- [ ] Animated text with splitting effect
- [ ] "Make Reservation" CTA button
- [ ] Marquee banner with tagline text
- [ ] About section with image grid
- [ ] Why Us section with pain point messaging
- [ ] Services preview (3 cards)
- [ ] Get a Free Quote CTA section
- [ ] Falling petals animation overlay
- [ ] Custom cursor

### About Page
- [ ] Full-screen hero with background image
- [ ] Founder biography section
- [ ] Stats display (500+ weddings, 10+ years)
- [ ] Core values grid (3 items)
- [ ] Team/portrait gallery
- [ ] Quote section

### Services Page
- [ ] 8 service items with alternating layout
- [ ] Image hover zoom effect
- [ ] Service tag and title
- [ ] Description text
- [ ] Enquiry link with arrow animation
- [ ] CTA section with star rating

### Portfolio Page
- [ ] Sticky filter bar with categories
- [ ] Masonry grid layout
- [ ] Image aspect ratios preserved
- [ ] Hover overlay with search icon
- [ ] Lightbox modal with zoom animation
- [ ] Category filtering animation
- [ ] CTA section

### Pre-Wedding Page
- [ ] Image grid (12 images)
- [ ] Lightbox functionality
- [ ] WhatsApp booking CTA

### Pricing Page
- [ ] 3 pricing packages
- [ ] Feature comparison list
- [ ] Badge on featured package
- [ ] WhatsApp inquiry links
- [ ] FAQ accordion (4 items)

### Contact Page
- [ ] Multi-field form with validation
- [ ] Service checkboxes
- [ ] Success state
- [ ] Contact info cards
- [ ] Google Maps embed (grayscale filter)

### Global
- [ ] Preloader on every page
- [ ] Custom cursor
- [ ] Smooth scroll (Lenis)
- [ ] WhatsApp floating button
- [ ] Scroll to top button
- [ ] Mobile responsive navigation
- [ ] SEO meta tags

---

## 11. SEO & Meta

### Default Meta Tags
```html
<title>[STUDIO NAME] | Best Wedding Photographer in [CITY]</title>
<meta name="description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### Open Graph
- Site name
- Title
- Description
- Image for sharing

---

## 12. Performance Considerations

### Image Optimization
- Use WebP format when possible
- Lazy loading for below-fold images
- Preload LCP images in HTML head
- SafeImage component for fallback handling

### Code Splitting
- Lazy load pages (Portfolio, Services, etc.)
- Suspense fallback with loading state

### Animation Performance
- Use `will-change` sparingly
- Prefer `transform` and `opacity` for animations
- Use `useTransform` for scroll-linked animations

### Bundle Size
- Tree-shake unused Lucide icons
- Remove unused Radix UI components
- Analyze bundle with build tools

---

## 13. Deployment

### Build Command
```bash
npm run build
```

### Vercel Configuration
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 14. Customization Guide

### Changing Brand/Studio Name
1. Update `src/config/siteConfig.ts` → `brand.name`
2. Update `Navbar.tsx` → Logo text
3. Update `Footer.tsx` → Logo text
4. Update `index.html` → Title and meta tags
5. Update `.env` file if needed

### Changing Colors
1. Update `tailwind.config.ts` → `colors` section
2. Update `src/index.css` → CSS variables if used

### Adding New Services
1. Add service object to `SERVICES` array in `Services.tsx`
2. Add image to `src/assets/`
3. Import and use in service object

### Adding Portfolio Images
1. Add images to `public/studio-images/`
2. Update `src/config/siteConfig.ts` → `portfolioItems` array

### Modifying Packages
1. Update `PACKAGES` array in `Pricing.tsx`
2. Add/modify features and pricing

### Changing Contact/Booking Destination
1. Update Supabase configuration in `src/lib/supupabase.ts`
2. Or switch to formspree/emailjs/nodemailer

---

## 15. File Structure

```
src/
├── assets/                    # Static images
│   └── [various wedding photos]
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── ...
│   │   └── SafeImage.tsx      # Custom image with fallback
│   ├── BookingModal.tsx       # Booking inquiry modal
│   ├── CustomCursor.tsx       # Custom cursor effect
│   ├── FallingPetals.tsx      # Animated petals
│   ├── FloralSVG.tsx          # Decorative SVG
│   ├── Footer.tsx             # Site footer
│   ├── Navbar.tsx             # Navigation
│   ├── Preloader.tsx          # Loading screen
│   ├── RevealOnScroll.tsx     # Scroll reveal
│   ├── RollReveal.tsx         # Roll reveal animation
│   ├── ScrollToTop.tsx        # Scroll to top button
│   ├── ScrollToTopOnRoute.tsx # Route change scroll reset
│   ├── TextReveal.tsx         # Text reveal animation
│   └── WhatsAppFloat.tsx      # WhatsApp CTA button
├── config/
│   └── siteConfig.ts          # Central configuration
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # Utility functions
├── pages/
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Index.tsx
│   ├── NotFound.tsx
│   ├── Portfolio.tsx
│   ├── PortfolioFiles.tsx
│   ├── PreWedding.tsx
│   ├── Pricing.tsx
│   └── Services.tsx
├── App.tsx                    # Root component with routes
├── App.css                    # App-level styles
├── index.css                  # Global styles + Tailwind
└── main.tsx                  # Entry point
```

---

## 16. PRD Template Customization Variables

Replace these placeholders when using this template:

| Placeholder | Description |
|-------------|-------------|
| `[STUDIO NAME]` | Your studio/business name |
| `[CITY]` | Primary service city |
| `[PHONE]` | Contact phone number |
| `[EMAIL]` | Contact email |
| `[ADDRESS]` | Studio address |
| `[WHATSAPP_NUMBER]` | WhatsApp number with country code |
| `[FOUNDER_NAME]` | Founder/owner name |
| `[FOUNDED_YEAR]` | Year the studio was established |
| `[SOCIAL_LINKS]` | Instagram, Facebook, YouTube URLs |
| `[SUPABASE_URL]` | Supabase project URL |
| `[SUPABASE_KEY]` | Supabase anon key |

---

*Document generated based on deep analysis of Wedding Theme Studio (golden-frames)*
*Use this PRD as a template for rebuilding or creating similar wedding photography websites*
