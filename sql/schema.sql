create extension if not exists unaccent;

create type post_status as enum ('draft', 'published');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text not null,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  status post_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.generate_slug(input_title text)
returns text
language plpgsql
as $$
declare
  base_slug text;
  candidate_slug text;
  suffix int := 0;
begin
  base_slug := lower(trim(regexp_replace(unaccent(input_title), '[^a-zA-Z0-9\s-]', '', 'g')));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  candidate_slug := trim(both '-' from base_slug);

  while exists (select 1 from public.posts where slug = candidate_slug) loop
    suffix := suffix + 1;
    candidate_slug := candidate_slug || '-' || suffix;
  end loop;

  return candidate_slug;
end;
$$;

create or replace function public.set_post_slug()
returns trigger
language plpgsql
as $$
begin
  if new.slug is null or length(trim(new.slug)) = 0 then
    new.slug := public.generate_slug(new.title);
  end if;
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(coalesce(new.email, 'user'), '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

drop trigger if exists trg_set_post_slug on public.posts;
create trigger trg_set_post_slug
before insert on public.posts
for each row execute procedure public.set_post_slug();

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.update_updated_at();

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row execute procedure public.update_updated_at();

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.guestbook enable row level security;

-- profiles policies
create policy "profiles are viewable by everyone"
on public.profiles
for select
using (true);

create policy "users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- posts policies
create policy "published posts are public"
on public.posts
for select
using (status = 'published' or auth.uid() = author_id);

create policy "users can insert own posts"
on public.posts
for insert
with check (auth.uid() = author_id);

create policy "users can update own posts"
on public.posts
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "users can delete own posts"
on public.posts
for delete
using (auth.uid() = author_id);

-- comments policies
create policy "comments on published posts are public"
on public.comments
for select
using (
  exists (
    select 1 from public.posts p
    where p.id = comments.post_id and (p.status = 'published' or p.author_id = auth.uid())
  )
);

create policy "authenticated users can insert comments"
on public.comments
for insert
with check (auth.uid() = author_id);

create policy "users can delete own comments"
on public.comments
for delete
using (auth.uid() = author_id);

-- guestbook policies
create policy "guestbook is public readable"
on public.guestbook
for select
using (true);

create policy "anyone can sign guestbook"
on public.guestbook
for insert
with check (true);

create policy "authenticated users can delete guestbook"
on public.guestbook
for delete
using (auth.uid() is not null);
