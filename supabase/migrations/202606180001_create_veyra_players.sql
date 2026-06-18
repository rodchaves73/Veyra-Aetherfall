create table if not exists public.veyra_players (
  id uuid primary key default gen_random_uuid(),

  telegram_user_id bigint not null unique,
  telegram_username text,
  telegram_first_name text not null,
  telegram_last_name text,
  telegram_language_code text,
  telegram_is_premium boolean,
  telegram_photo_url text,

  display_name text not null,
  account_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'veyra_players_account_status_check'
      and conrelid = 'public.veyra_players'::regclass
  ) then
    alter table public.veyra_players
      add constraint veyra_players_account_status_check
      check (account_status in ('active', 'limited', 'banned', 'deleted'));
  end if;
end;
$$;

create index if not exists veyra_players_last_seen_at_idx
  on public.veyra_players (last_seen_at desc);

create index if not exists veyra_players_created_at_idx
  on public.veyra_players (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_veyra_players_updated_at on public.veyra_players;

create trigger set_veyra_players_updated_at
before update on public.veyra_players
for each row
execute function public.set_updated_at();

alter table public.veyra_players enable row level security;
