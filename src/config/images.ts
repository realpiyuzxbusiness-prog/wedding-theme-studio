/**
 * IMAGE REGISTRY
 * ==============
 * Centralized management for all images used across the site.
 * These are optimized via Unsplash CDN for fast loading.
 */

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`;

// --- ASSETS (Imported via Vite) ---
import heroBrideVeil from "@/assets/wedding-bride-veil.png";
import expBrideRed from "@/assets/wedding-bride-red.png";
import coupleFloral from "@/assets/wedding-couple-floral.jpg";
import mehndi2 from "@/assets/wedding-mehndi-2.webp";
import couplePose from "@/assets/wedding-couple-pose.jpg";
import brideOrig from "@/assets/wedding-bride-2.webp";
import brideOne from "@/assets/wedding-bride-1.png";
import preWeddingAsset from "@/assets/wedding-prewedding.png";
import couple1 from "@/assets/wedding-couple-1.webp";
import couple2 from "@/assets/wedding-couple-2.png";
import couple3 from "@/assets/wedding-couple-3.webp";
import mehndi from "@/assets/wedding-mehndi.webp";
import newBridePortrait from "@/assets/new-bride-portrait.jpg";
import newImg1 from "@/assets/new-portfolio-img-1.png";
import newImg2 from "@/assets/new-portfolio-img-2.png";
import newImg3 from "@/assets/new-portfolio-img-3.png";
import newImg4 from "@/assets/new-portfolio-img-4.png";
import newImg5 from "@/assets/new-portfolio-img-5.png";

import img01 from "@/assets/01.jpg";
import img02 from "@/assets/02.jpg";
import img03 from "@/assets/03.jpg";
import img04 from "@/assets/04.jpg";
import brideRedBg from "@/assets/bride-red-bg.jpg";
import img1445 from "@/assets/IMG_1445.jpg";
import img7063 from "@/assets/IMG_7063-2.jpg";
import img7159 from "@/assets/IMG_7159-2.jpg";
import img7250 from "@/assets/IMG_7250.jpg";
import img7267 from "@/assets/IMG_7267.jpg";
import img7426 from "@/assets/IMG_7426-2.jpg";
import img7531 from "@/assets/IMG_7531.jpg";
import img7666 from "@/assets/IMG_7666.jpg";
import img7710 from "@/assets/IMG_7710.jpg";
import img7778 from "@/assets/IMG_7778.jpg";

import userBrideJewelry from "@/assets/user-bride-jewelry.png";
import userBrideRed from "@/assets/user-bride-red.png";
import userBrideVeilPink from "@/assets/user-bride-veil-pink.png";
import userBrideVeil from "@/assets/user-bride-veil.png";
import userCoupleBack from "@/assets/user-couple-back.jpg";
import userCoupleSide from "@/assets/user-couple-side.jpg";
import ourStoryBg from "@/assets/our-story-bg.png";
import commercialPhoto from "@/assets/commercial-photo.jpg";
import maternityShoot from "@/assets/maternity-shoot.png";
import screenshot4 from "@/assets/screenshot-4.png";
import screenshot6 from "@/assets/screenshot-6.png";

export const SITE_ASSETS = {
  // Primary Bridal Images
  brideFullPortrait: U("photo-1595152772835-219674b2a8a6"), 
  brideProfile:      U("photo-1511795409834-ef04bbd61622"), 
  brideVeilPurple:   U("photo-1583939003579-730e3918a45a"), 
  brideEyesClosed:   U("photo-1519741497674-611481863552"), 
  brideJewelry:      U("photo-1604017011826-d3b4c23f8914"), 
  
  // Services & Category Images
  candid:      userCoupleBack,
  wedding:     couple3,
  cinematic:   U("photo-1583939003579-730e3918a45a"),
  commercial:  commercialPhoto,
  corporate:   screenshot4,
  maternity:   maternityShoot,
  marital:     couple1,
  preWedding:  img7531,
  model:       screenshot6,

  // Imported Assets
  hero: heroBrideVeil,
  experience: userBrideJewelry, // Updated to user's requested floral jewelry image
  coupleFloral,
  mehndi2,
  couplePose,
  brideOrig,
  brideOne,
  preWeddingAsset,
  couple1,
  couple2,
  couple3,
  mehndi,
  newBridePortrait,
  newImg1,
  newImg2,
  newImg3,
  newImg4,
  newImg5,

  // User Provided Specific Layout Assets
  userBrideJewelry,
  userBrideRed,
  userBrideVeilPink,
  userBrideVeil,
  userCoupleBack,
  userCoupleSide,
  ourStoryBg,

  // Studio Images
  img01,
  img02,
  img03,
  img04,
  brideRedBg,
  img1445,
  img7063,
  img7159,
  img7250,
  img7267,
  img7426,
  img7531,
  img7666,
  img7710,
  img7778,
  
  // Local Legacy
  wedding01: img01,
  wedding02: img02,
  wedding03: img03,
  wedding04: img04,
};

export const PORTFOLIO_IMAGES = SITE_ASSETS; // For backward compatibility
export default SITE_ASSETS;
