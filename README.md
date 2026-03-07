# CreatorAI Suite

CreatorAI Suite is a production-ready AI SaaS platform built with **Next.js 14**, **Tailwind CSS**, **Supabase**, **Stripe**, **OpenAI API**, and **Cloudinary**.

## Features
- Authentication (Signup/Login) with Supabase
- Protected dashboard
- AI tools:
  - Content Writer
  - Image Generator
  - Resume Builder (PDF download)
  - Marketing Assistant
  - Chatbot Builder (embed script)
  - Thumbnail Generator
- Stripe subscriptions (Free, Pro, Creator)
- Admin panel for users, subscriptions, and usage logs

## 1) GitHub deployment prep
1. Push this repository to GitHub.
2. Set environment variables from `.env.example` in your deployment environment.
3. Ensure branch protection + CI checks for production workflows.

## 2) Vercel deployment
1. Import repo into Vercel.
2. Framework preset: Next.js.
3. Add all variables from `.env.example`.
4. Deploy.

## 3) Supabase setup
1. Create a Supabase project.
2. In SQL Editor, run `supabase/schema.sql`.
3. Enable Email/Password auth.
4. Set:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4) Stripe setup
1. Create products/plans: Pro and Creator.
2. Copy recurring price IDs into:
   - `STRIPE_PRICE_PRO`
   - `STRIPE_PRICE_CREATOR`
3. Set `STRIPE_SECRET_KEY`.
4. Configure webhook endpoint at `/api/stripe/webhook` and set `STRIPE_WEBHOOK_SECRET`.

## 5) OpenAI setup
1. Create an OpenAI API key.
2. Set `OPENAI_API_KEY`.
3. The app uses `gpt-4o-mini` for text and `gpt-image-1` for image generation.

## Cloudinary setup
1. Create a Cloudinary account.
2. Set `CLOUDINARY_URL`.
3. Generated images and thumbnails upload to Cloudinary.

## Local development
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

## Project structure
- `app/` - App Router pages + API routes
- `components/` - UI components
- `lib/` - integration clients/utilities
- `supabase/` - SQL schema
- `vercel.json` - deployment config
