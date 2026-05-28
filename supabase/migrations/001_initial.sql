-- Space Corps — initial schema

create extension if not exists "uuid-ossp";

-- Reservations table
create table public.reservations (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references auth.users(id) on delete set null,
  tier_id             text,
  destination         text,
  preservation_type   text,
  status              text not null default 'deposit_paid',
  mission_id          uuid,
  stripe_session_id   text unique,
  deposit_paid        boolean not null default false,
  full_name           text not null,
  email               text not null,
  phone               text,
  memorial_name       text not null,
  memorial_bio        text,
  memorial_photo_url  text,
  launch_date         timestamptz,
  trajectory_id       text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Missions table
create table public.missions (
  id                  uuid primary key default uuid_generate_v4(),
  name                text not null,
  launch_date         timestamptz,
  destination         text not null,
  vehicle             text,
  status              text not null default 'planning',
  horizons_target_id  text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Row Level Security
alter table public.reservations enable row level security;
alter table public.missions enable row level security;

-- Public can read memorial pages (launched/in_transit only)
create policy "Public memorials visible"
  on public.reservations for select
  using (status in ('launched', 'in_transit'));

-- Users can read their own reservations
create policy "Users read own reservations"
  on public.reservations for select
  using (auth.uid() = user_id or email = auth.jwt() ->> 'email');

-- Missions readable by all authenticated users
create policy "Missions readable"
  on public.missions for select
  to authenticated
  using (true);

-- Service role bypasses RLS (used by admin API + webhooks)
-- No additional policy needed — supabaseAdmin uses service role key

-- Update trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger reservations_updated_at
  before update on public.reservations
  for each row execute function update_updated_at();

create trigger missions_updated_at
  before update on public.missions
  for each row execute function update_updated_at();

-- Indexes
create index idx_reservations_email on public.reservations(email);
create index idx_reservations_status on public.reservations(status);
create index idx_reservations_mission_id on public.reservations(mission_id);
