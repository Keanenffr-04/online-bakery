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

-- 5. (v10.17.2) Admin profiles: a username and a small account picture for each admin.
create table if not exists public.profiles (
  user_id    uuid primary key default auth.uid(),
  email      text,
  username   text not null check (username ~ '^[A-Za-z0-9_.-]{3,20}$'),
  avatar     text check (avatar is null or (avatar like 'data:image/%' and char_length(avatar) <= 60000)),
  updated_at timestamptz not null default now()
);
create unique index if not exists profiles_username_key on public.profiles (lower(username));
alter table public.profiles enable row level security;

drop policy if exists "admins read profiles"  on public.profiles;
create policy "admins read profiles"  on public.profiles for select using (public.is_admin());
drop policy if exists "own profile insert"    on public.profiles;
create policy "own profile insert"    on public.profiles for insert with check (public.is_admin() and user_id = auth.uid());
drop policy if exists "own profile update"    on public.profiles;
create policy "own profile update"    on public.profiles for update using (public.is_admin() and user_id = auth.uid()) with check (public.is_admin() and user_id = auth.uid());

-- 6. (v10.18) Customer accounts: own profile, own orders, delete my account. Re-runnable; nothing is deleted by running it.
alter table public.orders add column if not exists user_id uuid references auth.users(id) on delete set null;
create index if not exists orders_user_id_idx on public.orders (user_id);

-- A customer may add an order (signed in or not). If signed in it can be linked to them, never to someone else.
drop policy if exists "customers add orders" on public.orders;
create policy "customers add orders" on public.orders for insert to anon, authenticated
  with check (source in ('cart', 'custom') and status = 'pending' and (user_id is null or user_id = auth.uid()));
-- A signed-in customer can read (only) their own orders.
drop policy if exists "customers read own orders" on public.orders;
create policy "customers read own orders" on public.orders for select to authenticated using (user_id = auth.uid());

-- Profiles: anyone signed in can have one for themselves; admins can still read all of them.
drop policy if exists "own profile read"   on public.profiles;
create policy "own profile read"   on public.profiles for select to authenticated using (user_id = auth.uid());
drop policy if exists "own profile insert" on public.profiles;
create policy "own profile insert" on public.profiles for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- "Delete my account" (POPIA): removes the login and the profile, and strips the name and phone from the person's past orders
-- (the bakery keeps the order itself for its books). Admins cannot use it, so nobody can lock themselves out by accident.
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if public.is_admin() then raise exception 'Admin logins cannot be deleted here. Ask another admin.'; end if;
  update public.orders set name = null, phone = null, details = null, user_id = null where user_id = auth.uid();
  delete from public.profiles where user_id = auth.uid();
  delete from auth.users where id = auth.uid();
end $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
