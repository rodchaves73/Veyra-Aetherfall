grant usage on schema public to service_role;

grant select, insert, update
on table public.veyra_players
to service_role;
