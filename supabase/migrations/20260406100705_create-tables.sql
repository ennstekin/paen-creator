create table public.forms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  fields jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table public.form_submissions (
  id uuid default gen_random_uuid() primary key,
  form_id uuid references public.forms(id) on delete cascade,
  data jsonb not null,
  ip_address text,
  created_at timestamptz default now()
);

insert into public.forms (name, slug) values ('Influencer Başvuru', 'influencer-basvuru');
