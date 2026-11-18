-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- The table is locked (RLS on, no policies). The site can only call the two functions below.

create table if not exists public.site_stats (
  id    text primary key,
  views bigint not null default 0
);
insert into public.site_stats (id, views) values ('portfolio', 0) on conflict (id) do nothing;
alter table public.site_stats enable row level security;

create or replace function public.increment_views()
returns bigint language sql security definer set search_path = public as $$
  update public.site_stats set views = views + 1 where id = 'portfolio' returning views;
$$;

create or replace function public.get_views()
returns bigint language sql security definer set search_path = public as $$
  select views from public.site_stats where id = 'portfolio';
$$;

grant execute on function public.increment_views() to anon;
grant execute on function public.get_views() to anon;
