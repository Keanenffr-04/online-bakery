-- The Sweetest Bakery, v10.26.2: online database setup (sections 1 to 13).
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

-- 7. (v10.19) "Most popular" worked out from real orders. Re-runnable.
-- Public on purpose, but it only ever returns item ids + how many were ordered (last 90 days, cancelled orders ignored).
-- No names, phones or order details leave the database. Bad data in an order can never make it fail.
create or replace function public.popular_items(days int default 90, max_items int default 12)
returns table (id text, qty bigint)
language sql stable security definer set search_path = public as $$
  select l.item ->> 'id' as id,
         sum(case when (l.item ->> 'q') ~ '^[0-9]{1,3}$' then least((l.item ->> 'q')::int, 20) else 0 end)::bigint as qty
  from public.orders o
  cross join lateral jsonb_array_elements(
    case when jsonb_typeof(o.details -> 'lines') = 'array' then o.details -> 'lines' else '[]'::jsonb end
  ) as l(item)
  where o.status <> 'cancelled'
    and o.created_at > now() - make_interval(days => least(greatest(days, 1), 365))
    and jsonb_typeof(l.item) = 'object'
    and char_length(coalesce(l.item ->> 'id', '')) between 1 and 60
  group by 1
  having sum(case when (l.item ->> 'q') ~ '^[0-9]{1,3}$' then least((l.item ->> 'q')::int, 20) else 0 end) > 0
  order by 2 desc, 1
  limit least(greatest(max_items, 1), 30);
$$;
revoke all on function public.popular_items(int, int) from public;
grant execute on function public.popular_items(int, int) to anon, authenticated;

-- 8. (v10.19.1) Order change log: who changed what. Admins only (read + add); nobody can edit or delete entries. Re-runnable.
create table if not exists public.order_log (
  id         bigint generated always as identity primary key,
  at         timestamptz not null default now(),
  order_id   uuid,
  order_name text check (char_length(order_name) <= 120),
  action     text not null check (char_length(action) <= 300),
  by_name    text check (char_length(by_name) <= 120)
);
create index if not exists order_log_order_idx on public.order_log (order_id);
alter table public.order_log enable row level security;
drop policy if exists "admins read log" on public.order_log;
create policy "admins read log" on public.order_log for select using (public.is_admin());
drop policy if exists "admins add log" on public.order_log;
create policy "admins add log" on public.order_log for insert with check (public.is_admin());

-- 9. (v10.21) Order calendar: how many orders are already booked per date. Re-runnable.
-- Public on purpose, but it only ever returns a date + a count (upcoming dates only, cancelled orders ignored).
-- No names, phones or order details leave the database. Bad dates in an order are ignored and can never make it fail.
create or replace function public.booked_dates()
returns table (day text, n bigint)
language sql stable security definer set search_path = public as $$
  select o.date as day, count(*)::bigint as n
  from public.orders o
  where o.status <> 'cancelled'
    and o.date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
    and o.date >= to_char(now() at time zone 'Africa/Johannesburg', 'YYYY-MM-DD')
  group by o.date
  order by o.date
  limit 400;
$$;
revoke all on function public.booked_dates() from public;
grant execute on function public.booked_dates() to anon, authenticated;

-- 10. (v10.23) Spam guard on orders + a version stamp. Re-runnable; nothing is deleted.
-- Anyone may add an order (that is how the Cart and Custom Order forms save a copy), so a bot could try to flood the table.
-- This guard runs inside the database, so it cannot be skipped by going around the website. Admins are never limited.
-- Real customers will not notice it: the limits are far above what one bakery customer does.
create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists orders_phone_idx   on public.orders (phone, created_at desc);

create or replace function public.orders_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() then return new; end if;
  if char_length(btrim(coalesce(new.items, ''))) < 3 then
    raise exception 'An order needs some items.';
  end if;
  -- everyone together: at most 40 new online orders in 10 minutes
  if (select count(*) from public.orders where source in ('cart', 'custom') and created_at > now() - interval '10 minutes') >= 40 then
    raise exception 'Too many orders are arriving at once. Please message us on WhatsApp.';
  end if;
  -- one phone number: at most 6 an hour
  if coalesce(new.phone, '') <> '' and (select count(*) from public.orders where phone = new.phone and created_at > now() - interval '1 hour') >= 6 then
    raise exception 'Too many orders from this phone number. Please message us on WhatsApp.';
  end if;
  -- one signed-in customer: at most 10 an hour
  if new.user_id is not null and (select count(*) from public.orders where user_id = new.user_id and created_at > now() - interval '1 hour') >= 10 then
    raise exception 'Too many orders from this account. Please message us on WhatsApp.';
  end if;
  return new;
end $$;
revoke all on function public.orders_guard() from public, anon, authenticated;

drop trigger if exists orders_guard_trg on public.orders;
create trigger orders_guard_trg before insert on public.orders for each row execute function public.orders_guard();

-- 11. (v10.24) New-order alert: let the admin page hear about new orders the moment they arrive. Re-runnable; nothing is deleted.
-- This only switches on "realtime" for the orders table. Customers still cannot read anyone's orders: realtime follows the same locks
-- as everything else, so only admins (and a customer for their own orders) receive anything. Without this the alert still works,
-- it just notices within 30 seconds instead of at once.
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders') then
    alter publication supabase_realtime add table public.orders;
  end if;
exception when others then
  raise notice 'Realtime could not be switched on here (%). The 30-second check still works.', sqlerrm;
end $$;

-- 12. (v10.25) Customer reviews (held until an admin approves them) + inspiration photos for custom orders. Re-runnable; nothing is deleted.
-- Reviews: anyone may ADD one (name, optional stars, a short text); only admins can read, approve (copy into the website) or delete them.
create table if not exists public.review_submissions (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(btrim(name)) between 2 and 60),
  stars      int  check (stars is null or stars between 1 and 5),
  text       text not null check (char_length(btrim(text)) between 10 and 600)
);
alter table public.review_submissions enable row level security;
drop policy if exists "anyone adds a review"    on public.review_submissions;
create policy "anyone adds a review"    on public.review_submissions for insert to anon, authenticated with check (true);
drop policy if exists "admins manage reviews"   on public.review_submissions;
create policy "admins manage reviews"   on public.review_submissions for all using (public.is_admin()) with check (public.is_admin());

-- Spam guard for reviews: at most 10 new ones in 10 minutes (everyone together). Admins are skipped.
create or replace function public.reviews_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() then return new; end if;
  if (select count(*) from public.review_submissions where created_at > now() - interval '10 minutes') >= 10 then
    raise exception 'Too many reviews are arriving at once. Please try again later.';
  end if;
  return new;
end $$;
revoke all on function public.reviews_guard() from public, anon, authenticated;
drop trigger if exists reviews_guard_trg on public.review_submissions;
create trigger reviews_guard_trg before insert on public.review_submissions for each row execute function public.reviews_guard();

-- Photos: a PRIVATE bucket called "inspiration" (max 2 MB each, pictures only). Anyone may ADD a picture with a random file name;
-- nobody can list or open them except admins (the admin page opens them through a short-lived link).
do $$
begin
  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values ('inspiration', 'inspiration', false, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
  on conflict (id) do update set public = false, file_size_limit = 2097152, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
  drop policy if exists "customers add inspiration photos" on storage.objects;
  create policy "customers add inspiration photos" on storage.objects for insert to anon, authenticated
    with check (bucket_id = 'inspiration' and name ~ '^[0-9a-f-]{36}\.jpg$');
  drop policy if exists "admins read inspiration photos" on storage.objects;
  create policy "admins read inspiration photos" on storage.objects for select using (bucket_id = 'inspiration' and public.is_admin());
  drop policy if exists "admins delete inspiration photos" on storage.objects;
  create policy "admins delete inspiration photos" on storage.objects for delete using (bucket_id = 'inspiration' and public.is_admin());
exception when others then
  raise notice 'The photo storage could not be set up here (%). Custom orders still work; they just cannot attach a photo.', sqlerrm;
end $$;

-- 13. (v10.26.2) Make the photo storage private no matter what else exists. A RESTRICTIVE rule is added on top of every other rule, so even a leftover
-- "anyone can read" rule (for example one the Supabase dashboard adds for a new bucket) cannot show anyone a picture in the "inspiration" bucket
-- unless they are an admin. Customers can still ADD a picture. Re-runnable; nothing is deleted.
do $$
begin
  update storage.buckets set public = false where id = 'inspiration';
  drop policy if exists "inspiration is admin only to read" on storage.objects;
  create policy "inspiration is admin only to read" on storage.objects as restrictive for select
    using (bucket_id <> 'inspiration' or public.is_admin());
exception when others then
  raise notice 'The extra photo lock could not be added here (%). Run this script again, or tell the person who builds the site.', sqlerrm;
end $$;

-- 14. (v10.26.15) Proof of payment. A PRIVATE bucket called "proofs" (max 2 MB each, a picture or a PDF). A customer can ADD a file only inside a folder named
-- after their own order's id (a random code only they know), with a random file name. Nobody can list or open them except admins; the same restrictive
-- lock as the photos (section 13) sits on top, so a leftover "anyone can read" rule cannot show a payment slip (it holds bank details). Re-runnable; nothing is deleted.
do $$
begin
  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values ('proofs', 'proofs', false, 2097152, array['image/jpeg', 'application/pdf'])
  on conflict (id) do update set public = false, file_size_limit = 2097152, allowed_mime_types = array['image/jpeg', 'application/pdf'];
  drop policy if exists "customers add proofs" on storage.objects;
  create policy "customers add proofs" on storage.objects for insert to anon, authenticated
    with check (bucket_id = 'proofs' and name ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|pdf)$');
  drop policy if exists "admins read proofs" on storage.objects;
  create policy "admins read proofs" on storage.objects for select using (bucket_id = 'proofs' and public.is_admin());
  drop policy if exists "admins delete proofs" on storage.objects;
  create policy "admins delete proofs" on storage.objects for delete using (bucket_id = 'proofs' and public.is_admin());
  drop policy if exists "proofs are admin only to read" on storage.objects;
  create policy "proofs are admin only to read" on storage.objects as restrictive for select
    using (bucket_id <> 'proofs' or public.is_admin());
exception when others then
  raise notice 'The proof-of-payment storage could not be set up here (%). Orders still work; customers just cannot upload proof.', sqlerrm;
end $$;

-- 15. (v10.26.16) The "paid" tick. One yes / no per order, set by an admin only. Admins already have full rights on orders; customers can add an order but
-- the new rule below makes sure nobody can add one that is already ticked as paid. Re-runnable; nothing is deleted and existing orders start as not paid.
alter table public.orders add column if not exists paid boolean not null default false;
drop policy if exists "customers add orders" on public.orders;
create policy "customers add orders" on public.orders for insert to anon, authenticated
  with check (source in ('cart', 'custom') and status = 'pending' and paid = false and (user_id is null or user_id = auth.uid()));

-- The admin's "Live check" asks this to see whether the database has the newest setup.sql.
create or replace function public.setup_version() returns text
language sql immutable as $$ select '10.26.16'::text $$;
revoke all on function public.setup_version() from public;
grant execute on function public.setup_version() to anon, authenticated;
