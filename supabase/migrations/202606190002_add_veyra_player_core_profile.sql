alter table public.veyra_players
  add column if not exists player_level integer not null default 1,
  add column if not exists player_xp integer not null default 0,
  add column if not exists power_score integer not null default 0,
  add column if not exists campaign_chapter integer not null default 1,
  add column if not exists campaign_stage integer not null default 1,
  add column if not exists onboarding_status text not null default 'new',
  add column if not exists last_bootstrap_at timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'veyra_players_player_level_check'
      and conrelid = 'public.veyra_players'::regclass
  ) then
    alter table public.veyra_players
      add constraint veyra_players_player_level_check
      check (player_level >= 1 and player_level <= 999);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'veyra_players_player_xp_check'
      and conrelid = 'public.veyra_players'::regclass
  ) then
    alter table public.veyra_players
      add constraint veyra_players_player_xp_check
      check (player_xp >= 0);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'veyra_players_power_score_check'
      and conrelid = 'public.veyra_players'::regclass
  ) then
    alter table public.veyra_players
      add constraint veyra_players_power_score_check
      check (power_score >= 0);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'veyra_players_campaign_progress_check'
      and conrelid = 'public.veyra_players'::regclass
  ) then
    alter table public.veyra_players
      add constraint veyra_players_campaign_progress_check
      check (campaign_chapter >= 1 and campaign_stage >= 1);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'veyra_players_onboarding_status_check'
      and conrelid = 'public.veyra_players'::regclass
  ) then
    alter table public.veyra_players
      add constraint veyra_players_onboarding_status_check
      check (onboarding_status in ('new', 'started', 'completed', 'skipped'));
  end if;
end;
$$;

create index if not exists veyra_players_progress_idx
  on public.veyra_players (player_level desc, campaign_chapter desc, campaign_stage desc);

grant select, insert, update
on table public.veyra_players
to service_role;
