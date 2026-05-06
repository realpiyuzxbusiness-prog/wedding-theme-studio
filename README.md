# Wedding Theme Studio - Client Guide

Welcome to the **Wedding Theme Studio** website project. This document is designed to help you understand how your website works and how you can manage its content easily.

## 🌟 Overview

Your website is a premium, high-performance platform built to showcase your wedding photography and cinematography work. It features smooth animations, a professional portfolio gallery, and an integrated booking system to convert visitors into clients.

---

## 🛠️ How to Manage Your Content

Most of your website's information is centralized in a single file called `siteConfig.ts`. This allows you to update text, links, and images without touching complex code.

**Location:** `src/config/siteConfig.ts`

### You can update the following via this file:
- **Contact Details**: Phone numbers, email, physical address, and working hours.
- **Social Media**: Links to your Instagram, Facebook, and YouTube profiles.
- **Branding**: Your studio name, tagline, and founding year.
- **Portfolio**: The images displayed in your gallery, including their categories (Wedding, Pre-Wedding, etc.).
- **FAQs & Testimonials**: Client reviews and frequently asked questions on the Pricing page.

---

## 📸 Managing Images

Your website uses high-quality imagery to tell your story.

### Adding New Portfolio Photos:
1. Place your new image files in the `public/studio-images/` folder.
2. Open `src/config/siteConfig.ts`.
3. Add a new entry to the `portfolioItems` list following this format:
   ```javascript
   { src: "/studio-images/your-image-name.jpg", cat: "Wedding", location: "City Name", aspect: "portrait" }
   ```

### Pro Tip for Images:
To keep your site fast, please ensure your images are compressed (ideally under 500KB) before uploading.

---

## 📩 Handling Client Enquiries

There are two main ways clients can reach you:

1. **Direct WhatsApp**: Floating buttons and "Inquire Now" links will open a direct chat with your WhatsApp number (+91 88024 05067).
2. **Booking Form**: When a client fills out the "Get a Quotation" or "Contact" form:
   - Their details are securely stored in your **Supabase Database**.
   - You will be notified according to your backend configuration.

---

## 🚀 Key Features for Your Clients

- **Smooth Experience**: We use "Lenis" smooth scrolling for a premium feel.
- **Mobile Optimized**: The site looks beautiful on iPhones, Androids, and tablets.
- **Portfolio Filters**: Clients can easily filter by "Wedding", "Pre-Wedding", or "Destination" to find exactly what they are looking for.
- **Interactive Lightbox**: Clicking any photo opens it in full-screen for detailed viewing.
- **Fast Loading**: We use advanced techniques like "lazy loading" to ensure the site stays fast even with many high-res photos.

---

## 📞 Support & Maintenance

If you need assistance with technical updates or adding new features:

- **Owner Email**: `opomprakash011@gmail.com`
- **Developer Documentation**: For deep technical details, refer to the [PRD_TEMPLATE.md](file:///c:\Users\user\wedding thee studio\golden-frames\PRD_TEMPLATE.md) file in the root directory.

---

*Handcrafted with ❤️ for Wedding Theme Studio*
