import { PORTFOLIO_IMAGES } from "./images";

/**
 * GALLERY_REGISTRY
 * 
 * Automatically loads all valid images from the assets folder.
 * Excludes: petals, flowers, branches, sakura, screenshots, unsplash,
 * and duplicate files (wedding-* duplicates of user-* files).
 */

// Dynamically import all images from the assets folder
const assetModules = import.meta.glob('@/assets/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

// Files to EXCLUDE from portfolio (decorations, duplicates, non-photo files, tiny files)
const EXCLUDED_FILES = [
  // Decorations & petals
  'petal',
  'flower',
  'branch',
  'sakura',

  // Duplicate files (wedding-* are duplicates of user-* files)
  'wedding-bride-red.png',      // duplicate of user-bride-red.png
  'wedding-bride-veil.png',     // duplicate of user-bride-veil.png
  'wedding-couple-pose.jpg',    // duplicate of user-couple-back.jpg
  'wedding-bride-1.png',        // old asset, duplicate
  'wedding-bride-2.webp',       // old asset, duplicate

  // Non-photo / config files
  'bride-red-bg.jpg',           // this is actually a JSON/config file, not an image (2KB)
  'our-story-bg.png',           // used as homepage background, not portfolio

  // Only exclude screenshot-4 (used as Corporate Events service image)
  'screenshot-4.png',
];

// Track seen image URLs to prevent the same image content from appearing twice
const seenUrls = new Set<string>();

export const EXTRA_PORTFOLIO_ITEMS = Object.entries(assetModules)
  .filter(([path, url]) => {
    const filename = path.split('/').pop()?.toLowerCase() || '';
    
    // Check against exclusion list
    for (const exclude of EXCLUDED_FILES) {
      if (filename.includes(exclude.toLowerCase())) {
        return false;
      }
    }

    // Deduplicate by URL (same file content imported under different names)
    const imgUrl = url as string;
    if (seenUrls.has(imgUrl)) {
      return false;
    }
    seenUrls.add(imgUrl);

    return true;
  })
  .map(([path, url]) => {
    // Categorize based on filename
    const lower = path.toLowerCase();
    let cat = "Wedding";
    if (lower.includes('pre') || lower.includes('prewedding')) cat = "Pre-Wedding";
    else if (lower.includes('candid')) cat = "Candid";
    else if (lower.includes('mehndi')) cat = "Candid";
    else if (lower.includes('couple')) cat = "Wedding";
    else if (lower.includes('commercial')) cat = "Wedding";
    else if (lower.includes('maternity')) cat = "Wedding";

    return {
      src: url as string,
      cat,
      location: "Gallery",
      aspect: "portrait" as const
    };
  })
  .sort(() => Math.random() - 0.5); // Randomly shuffle on every page load

export const GALLERY_CONFIG = {
  categories: ["All", "Wedding", "Destination", "Pre-Wedding", "Cinematic Films", "Candid"],
  stagger: 0.05,
  duration: 0.8
};
