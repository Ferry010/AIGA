
create table public.download_leads (
  id uuid primary key default gen_random_uuid(),
  voornaam text not null,
  achternaam text not null,
  email text not null,
  organisatie text not null,
  functie text,
  document text not null,
  newsletter_optin boolean default true,
  created_at timestamptz default now()
);

alter table public.download_leads enable row level security;

create policy "Allow anonymous inserts" on public.download_leads for insert to anon with check (true);
create policy "Allow authenticated inserts" on public.download_leads for insert to authenticated with check (true);
create policy "Admins can select" on public.download_leads for select to authenticated using (has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update" on public.download_leads for update to authenticated using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));

grant insert on public.download_leads to anon;
grant insert on public.download_leads to authenticated;
