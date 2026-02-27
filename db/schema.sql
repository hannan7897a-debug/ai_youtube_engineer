-- Run this in Supabase SQL editor
create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('free', 'pro', 'enterprise')),
  status text not null default 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null,
  units_used int default 1,
  created_at timestamptz default now()
);

create table if not exists generated_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  prompt text,
  output text,
  created_at timestamptz default now()
);

create table if not exists generated_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  raw_data jsonb,
  generated_text text,
  created_at timestamptz default now()
);

create table if not exists chatbot_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_info text,
  prompt_template text,
  embed_code text,
  created_at timestamptz default now()
);

alter table users enable row level security;
alter table subscriptions enable row level security;
alter table usage_logs enable row level security;
alter table generated_content enable row level security;
alter table generated_images enable row level security;
alter table resumes enable row level security;
alter table chatbot_configs enable row level security;

create policy "Users can access own records" on users for all using (auth.uid() = id);
create policy "Subscriptions self access" on subscriptions for all using (auth.uid() = user_id);
create policy "Usage self access" on usage_logs for all using (auth.uid() = user_id);
create policy "Content self access" on generated_content for all using (auth.uid() = user_id);
create policy "Images self access" on generated_images for all using (auth.uid() = user_id);
create policy "Resumes self access" on resumes for all using (auth.uid() = user_id);
create policy "Chatbot self access" on chatbot_configs for all using (auth.uid() = user_id);
