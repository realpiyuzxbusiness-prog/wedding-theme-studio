/**
 * SITE CONFIGURATION
 * =================
 * This is your central configuration file for all images and links.
 * Update this file to change images and links across the entire site.
 * 
 * HOW TO USE:
 * 1. Add your images to public/studio-images/ folder
 * 2. Update the paths below to point to your images
 * 3. Update links and text as needed
 */

import { PORTFOLIO_IMAGES } from "./images";
import { EXTRA_PORTFOLIO_ITEMS } from "./gallery";

export const SITE_CONFIG = {
  // ============ SOCIAL LINKS ============
  social: {
    instagram: "https://www.instagram.com/weddingthemestudio/",
    youtube: "https://www.youtube.com/@weddingthemestudio9052",
    facebook: "https://www.facebook.com/profile.php?id=100067947641476",
    whatsapp: "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+wedding+photography+services.+Can+we+discuss%3F",
  },

  // ============ CONTACT INFO ============
  contact: {
    phone: "+918802405067",
    phoneDisplay: "+91 88024 05067",
    email: "info@weddingthemestudio.com",
    address: "RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046",
    hours: "Daily · 10:00 AM - 9:30 PM",
  },

  // ============ STUDIO IMAGES (About Page - Visionary Section) ============
  // Replace these with your actual owner/studio images
  studioImages: {
    owner1: "/studio-images/owner-1.jpg",
    owner2: "/studio-images/owner-2.jpg",
    owner3: "/studio-images/owner-3.jpg",
  },

  // ============ PORTFOLIO ITEMS (Studio Images) ============
  // Images sourced dynamically from src/config/gallery.ts
  portfolioItems: [
    ...EXTRA_PORTFOLIO_ITEMS,
  ],

  // ============ FILM THUMBNAILS ============
  // Update these with your actual wedding film thumbnails
  filmThumbnails: {
    film1: "/studio-images/film-thumb-1.jpg",
    film2: "/studio-images/film-thumb-2.jpg",
    film3: "/studio-images/film-thumb-3.jpg",
  },

  // ============ BRANDING ============
  brand: {
    name: "Wedding Theme Studio",
    tagline: "Capturing Moments That Last Forever",
    description: "Delhi's most trusted wedding photography studio. Award-winning candid photography and cinematic films.",
    founded: "2014",
    founder: "Om Prakash",
  },

  // ============ SEO ============
  seo: {
    title: "Wedding Theme Studio | Best Wedding Photographer in Delhi NCR",
    description: "Award-winning wedding photography and cinematic films in Delhi NCR. 500+ couples trusted. Book now for premium candid photography and 4K videography.",
    keywords: "wedding photographer delhi, candid wedding photography, wedding films, pre-wedding shoot, destination wedding",
    rating: 5.0,
    reviewCount: 63,
  },

  // ============ WHATSAPP LINK ============
  whatsappLink: "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+wedding+photography+services.+Can+we+discuss%3F",
};

/**
 * IMAGE PLACEHOLDER CONFIG
 * Used when actual images are not yet available
 */
export const IMAGE_PLACEHOLDERS = {
  // SVG placeholders - elegant designs shown when images are missing
  studio: {
    width: 400,
    height: 533,
    bgColor: "#f5f0eb",
    accentColor: "#d4af37",
  },
  portfolio: {
    width: 600,
    height: 800,
    bgColor: "#f5f0eb", 
    accentColor: "#d4af37",
  },
};

/**
 * DEFAULT TESTIMONIALS
 * Update these with real client reviews
 */
export const TESTIMONIALS = [
  {
    quote: "Excellent service and best quality pictures. The team was so professional and made us feel comfortable throughout.",
    couple: "Priya & Rahul",
    source: "Google Review ★ 5.0",
  },
  {
    quote: "Om Prakash captured emotions we didn't even know existed. The album is everything we dreamed of.",
    couple: "Meera & Arjun",
    source: "Google Review ★ 5.0 · November 2024",
  },
  {
    quote: "Worth every rupee. The drone shots of our venue left our entire family speechless.",
    couple: "Pooja & Vikram",
    source: "Google Review ★ 5.0 · October 2023",
  },
];

/**
 * FAQ DATA
 * Update these with your frequently asked questions
 */
export const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 6–12 months in advance, especially for peak season (October–February). Popular dates fill up fast."
  },
  {
    q: "Do you travel outside Delhi NCR?",
    a: "Absolutely. We cover destinations across India and internationally. Travel and accommodation for the team are charged at actuals."
  },
  {
    q: "How are our photos delivered?",
    a: "All edited photos are delivered via a private, password-protected online gallery within 4–6 weeks."
  },
  {
    q: "What is your booking and payment process?",
    a: "A non-refundable booking retainer (typically 25–30%) secures your date. The balance is due before the wedding day."
  },
  {
    q: "Do you shoot destination weddings?",
    a: "Yes. We've covered weddings in Udaipur, Goa, Jaipur, Jim Corbett, and internationally."
  },
];

export default SITE_CONFIG;
