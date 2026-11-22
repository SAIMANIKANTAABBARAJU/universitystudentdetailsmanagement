-- UniTrack starter schema. Review and adapt before handling real institutional data.
-- Staff identities should be created by an administrator in Supabase Auth (signup disabled).

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  role text not null check (role in ('Admin','Faculty')),
  department text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  reg_no text unique not null,
  roll_no text not null,
  full_name text not null,
  branch_id text not null,
  academic_year int check (academic_year between 1 and 4),
  semester int check (semester between 1 and 8),
  section text not null,
  seat_type text not null check (seat_type in ('Counselling','Management')) default 'Counselling',
  tuition_fee numeric(10,2) not null default 70000,
  commute_type text not null check (commute_type in ('Hostel','Bus','Private')),
  commute_details text,
  cgpa numeric(4,2) not null default 0 check (cgpa between 0 and 10),
  backlogs int not null default 0 check (backlogs >= 0),
  parent_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.current_staff_role()
returns text language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() and is_active = true $$;

alter table public.profiles enable row level security;
alter table public.students enable row level security;

-- Users can view their own profile. Admins can view staff profiles.
drop policy if exists "profiles_self_or_admin_read" on public.profiles;
create policy "profiles_self_or_admin_read" on public.profiles
for select to authenticated
using (id = auth.uid() or public.current_staff_role() = 'Admin');

-- Only Admins can add/edit/delete staff profiles; no self-role escalation.
drop policy if exists "profiles_admin_manage" on public.profiles;
create policy "profiles_admin_manage" on public.profiles
for all to authenticated
using (public.current_staff_role() = 'Admin')
with check (public.current_staff_role() = 'Admin');

-- Staff can read student records; only Admins can write records.
drop policy if exists "students_staff_read" on public.students;
create policy "students_staff_read" on public.students
for select to authenticated
using (public.current_staff_role() in ('Admin','Faculty'));

drop policy if exists "students_admin_write" on public.students;
create policy "students_admin_write" on public.students
for all to authenticated
using (public.current_staff_role() = 'Admin')
with check (public.current_staff_role() = 'Admin');

-- Do not grant anon access. Authenticated access is filtered by RLS.
revoke all on public.profiles from anon;
revoke all on public.students from anon;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.students to authenticated;
