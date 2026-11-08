-- The Sweetest Bakery, v10.17: online database setup.
-- Run ONCE: Supabase dashboard > SQL Editor > New query > paste this whole file > Run.
-- Safe to run again (it never deletes your data).

-- 1. Who is an admin (by email). Only a signed-in person whose CONFIRMED email is on this list is an admin.
create table if not exists public.admins (
  email    text primary key,
  added_at timestamptz not null default now()
);
insert into public.admins (email) values
  ('rebeccarusson1@gmail.com'),   -- Becca
  ('keanenrusson1@gmail.com')     -- Keanen
on conflict (email) do nothing;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public, auth as $$
  select exists (
    select 1
    from auth.users u
    join public.admins a on lower(a.email) = lower(u.email)
    where u.id = auth.uid() and u.email_confirmed_at is not null
  );
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- 2. The menu and site settings (one row each). Everyone can READ them; only admins can change them.
create table if not exists public.site_data (
  key        text primary key check (key in ('settings', 'products')),
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3. Orders. Customers can only ADD one (from the Cart / Custom Order form); only admins can read or change them.
create table if not exists public.orders (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source     text not null default 'admin' check (source in ('cart', 'custom', 'admin')),
  name       text check (char_length(name)  <= 120),
  phone      text check (char_length(phone) <= 30),
  items      text check (char_length(items) <= 3000),
  date       text check (char_length(date)  <= 40),
  total      numeric check (total is null or (total >= 0 and total < 1000000)),
  status     text not null default 'pending' check (status in ('pending', 'confirmed', 'ready', 'completed', 'cancelled')),
  details    jsonb check (details is null or pg_column_size(details) <= 4000)
);

-- 4. The locks (row level security).
alter table public.admins    enable row level security;
alter table public.site_data enable row level security;
alter table public.orders    enable row level security;

drop policy if exists "admins manage admins"   on public.admins;
create policy "admins manage admins"   on public.admins    for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "anyone reads site data" on public.site_data;
create policy "anyone reads site data" on public.site_data for select using (true);
drop policy if exists "admins write site data" on public.site_data;
create policy "admins write site data" on public.site_data for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "customers add orders"   on public.orders;
create policy "customers add orders"   on public.orders    for insert to anon, authenticated
  with check (source in ('cart', 'custom') and status = 'pending');
drop policy if exists "admins manage orders"   on public.orders;
create policy "admins manage orders"   on public.orders    for all using (public.is_admin()) with check (public.is_admin());
