# AI Toolkit Pro

Full-stack AI SaaS platform built with Next.js 14 App Router, Tailwind CSS, Supabase, Stripe, OpenAI, and Cloudinary.

## Features
- Authentication (email/password)
- Protected dashboard + profile/settings
- Pricing plans (Free/Pro/Enterprise) + Stripe checkout
- Usage tracking and plan limits
- AI Content Writer
- AI Image Generator
- AI Resume Builder
- AI Marketing Assistant
- AI Chatbot Builder
- AI Thumbnail Generator
- Admin panel for users/subscriptions/usage visibility

## Setup
1. Install deps:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill keys.
3. Run SQL from `db/schema.sql` in Supabase.
4. Start app:
   ```bash
   npm run dev
   ```

## Project Structure
- `app/` — pages + API routes
- `components/` — reusable UI components
- `lib/` — integrations and usage logic
- `db/schema.sql` — database schema
