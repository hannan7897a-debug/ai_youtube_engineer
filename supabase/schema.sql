create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text unique not null,
  full_name text,
  role text default 'user',
  created_at timestamptz default now()
);

create table if not exists usage_logs (
  id bigserial primary key,
  user_id uuid references users(id),
  tool text not null,
  input text,
  tokens_used int default 0,
  created_at timestamptz default now()
);

create table if not exists generated_content (
  id bigserial primary key,
  user_id uuid references users(id),
  tool text not null,
  prompt text,
  output text,
  created_at timestamptz default now()
);

create table if not exists generated_images (
  id bigserial primary key,
  user_id uuid references users(id),
  prompt text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists resumes (
  id bigserial primary key,
  user_id uuid references users(id),
  input jsonb,
  output text,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id bigserial primary key,
  user_id uuid references users(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free',
  status text default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now()
);
