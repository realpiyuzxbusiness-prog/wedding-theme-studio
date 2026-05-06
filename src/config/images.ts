/**
 * IMAGE REGISTRY
 * ==============
 * Centralized management for all images used across the site.
 * These are optimized via Unsplash CDN for fast loading.
 */

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`;

// --- SHARED / PORTFOLIO IMAGES ---
export const PORTFOLIO_IMAGES = {
  // Primary Bridal Images (Mapped from your provided collection)
  brideFullPortrait: U("photo-1595152772835-219674b2a8a6"), // Red BG Portrait
  brideProfile:      U("photo-1511795409834-ef04bbd61622"), // Getting Ready Profile
  brideVeilPurple:   U("photo-1583939003579-730e3918a45a"), // Purple Veil Detail
  brideEyesClosed:   U("photo-1519741497674-611481863552"), // Emotional Closed Eyes
  brideJewelry:      U("photo-1604017011826-d3b4c23f8914"), // Jewelry/Detail
  brideNoseRing:     U("photo-1604017011826-d3b4c23f8914"), // Placeholder for Nose Ring
  
  // Services Mapping
  candid:      U("photo-1511285560929-80b456fea0bc"),
  wedding:     U("photo-1606800052052-a08af7148866"),
  cinematic:   U("photo-1583939003579-730e3918a45a"),
  commercial:  U("photo-1542038784456-1ea8e935640e"),
  corporate:   U("photo-1515187029135-18ee286d815b"),
  maternity:   U("photo-1519791883288-dc8bd696e667"),
  marital:     U("photo-1525258946800-98cfd641d0de"),
  preWedding:  U("photo-1529636798458-92182e662485"),
  model:       U("photo-1524504388940-b1c1722653e1"),

  // Local/Legacy Refs
  wedding01: "/studio-images/01.jpg.jpeg",
  wedding02: "/studio-images/02.jpg.jpeg",
  wedding03: "/studio-images/03.jpg.jpeg",
  wedding04: "/studio-images/04.jpg.jpeg",
};

// --- ASSETS (Imported via Vite) ---
import heroBrideVeil from "@/assets/wedding-bride-veil.png";
import expBrideRed from "@/assets/wedding-bride-red.png";
import coupleFloral from "@/assets/wedding-couple-floral.jpg";
import mehndi2 from "@/assets/wedding-mehndi-2.webp";
import couplePose from "@/assets/wedding-couple-pose.jpg";
import brideOrig from "@/assets/wedding-bride-2.webp";
import brideOne from "@/assets/wedding-bride-1.png";
import preWedding from "@/assets/wedding-prewedding.png";
import couple1 from "@/assets/wedding-couple-1.webp";
import couple2 from "@/assets/wedding-couple-2.png";
import couple3 from "@/assets/wedding-couple-3.webp";
import mehndi from "@/assets/wedding-mehndi.webp";

export const SITE_ASSETS = {
  hero: heroBrideVeil,
  experience: expBrideRed,
  coupleFloral,
  mehndi2,
  couplePose,
  brideOrig,
  brideOne,
  preWedding,
  couple1,
  couple2,
  couple3,
  mehndi,
};

// --- OWNER / STUDIO IMAGES ---
export const STUDIO_IMAGES = {
  owner1: "/studio-images/owner-1.jpg",
  owner2: "/studio-images/owner-2.jpg",
  owner3: "/studio-images/owner-3.jpg",
};

export default {
  portfolio: PORTFOLIO_IMAGES,
  assets: SITE_ASSETS,
  studio: STUDIO_IMAGES,
};
