# 📸 Golden Frames — Wedding Theme Studio

A premium, editorial-style wedding photography portfolio and booking management system. Built for speed, aesthetics, and seamless client lead capture.

![Golden Frames Preview](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **Editorial Masonry Gallery**: A fluid, high-performance visual grid for showcasing wedding portfolios.
- **Dynamic Booking System**: Interactive modal with real-time price estimation for packages and add-ons.
- **Supabase Backend**: 
  - Robust lead capture in the `bookings` table.
  - **Row Level Security (RLS)** enabled to protect client data.
  - **Edge Functions**: Automated email notifications (via Resend) triggered by database webhooks.
- **Responsive Design**: Premium dark-mode/glassmorphism aesthetics using Tailwind CSS and Framer Motion.
- **Instant WhatsApp Integration**: Direct links for immediate client communication.

## 🛠️ Technical Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Lucide React, Framer Motion
- **Backend/DB**: Supabase (PostgreSQL)
- **Infrastructure**: Vercel (Frontend), Supabase Edge Functions (Notifications)
- **Email Service**: Resend API

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/realpiyuzxbusiness-prog/wedding-theme-studio.git
cd wedding-theme-studio
npm install
```

### 2. Environment Setup
Create a `.env` file in the root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run the SQL found in `supabase_schema.sql` inside your Supabase SQL Editor to:
- Create the `bookings` table.
- Enable RLS and setup policies.
- Configure permissions for anonymous lead submission.

### 4. Edge Functions (Email Notifications)
Deploy the email function:
```bash
supabase functions deploy send-booking-email --project-ref your_project_id
supabase secrets set RESEND_API_KEY=your_key --project-ref your_project_id
```

### 5. Run Locally
```bash
npm run dev
```

## 📄 License
© 2024 Golden Frames Wedding Studio. All Rights Reserved.
