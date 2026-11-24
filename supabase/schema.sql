-- Kód Vědomí – databáze pro administraci (Supabase)
-- Obsah webu je v tabulce content (jedna řádka = jedna sekce, JSON).
-- Návštěvníci smějí obsah jen číst a formuláře jen odeslat. Vše ostatní jen správci.

-- Správci administrace. protected = správce, kterého z administrace nejde odebrat ani změnit (Nela, technická správa).
create table if not exists public.admins (
  email text primary key,
  name text,
  protected boolean not null default false,
  created_at timestamptz not null default now()
);

-- Správce = e-mail je v tabulce admins. Kdo má zapnuté dvoufázové ověření, musí ho i použít (aal2).
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public, auth as $$
  select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email'))
     and (
       coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
       or not exists (select 1 from auth.mfa_factors f where f.user_id = auth.uid() and f.status = 'verified')
     );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text, email text, phone text,
  items jsonb not null default '[]',
  shipping text, shipping_price numeric, gift_wrap boolean, voucher boolean, gift_for text,
  address text, company text, ico text, newsletter boolean,
  total numeric, status text not null default 'nová', paid_at timestamptz, note text
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text, topic text, name text, email text, phone text, data jsonb, message text,
  status text not null default 'nová'
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null, name text, source text, birth date, life_number int
);

-- Historie: každá změna obsahu se zálohuje (kdo, kdy, předchozí verze)
create table if not exists public.content_history (
  id bigint generated always as identity primary key,
  key text not null,
  data jsonb not null,
  changed_at timestamptz not null default now(),
  changed_by text
);
create index if not exists content_history_key on public.content_history (key, changed_at desc);

create or replace function public.content_backup() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.content_history (key, data, changed_by) values (old.key, old.data, auth.jwt() ->> 'email');
  -- držíme posledních 60 verzí každé sekce
  delete from public.content_history h where h.key = old.key and h.id not in (
    select id from public.content_history where key = old.key order by changed_at desc limit 60);
  return coalesce(new, old);
end $$;
drop trigger if exists content_backup on public.content;
create trigger content_backup before update or delete on public.content for each row execute function public.content_backup();

-- Omezení velikosti formulářů (ochrana proti zahlcení)
alter table public.orders add constraint orders_size check (
  coalesce(char_length(name), 0) <= 200 and coalesce(char_length(email), 0) <= 200 and coalesce(char_length(phone), 0) <= 50
  and coalesce(char_length(address), 0) <= 500 and coalesce(char_length(note), 0) <= 2000 and pg_column_size(items) <= 20000);
alter table public.messages add constraint messages_size check (
  coalesce(char_length(name), 0) <= 200 and coalesce(char_length(email), 0) <= 200 and coalesce(char_length(phone), 0) <= 50
  and coalesce(char_length(message), 0) <= 5000 and coalesce(pg_column_size(data), 0) <= 5000);
alter table public.subscribers add constraint subscribers_size check (
  char_length(email) between 5 and 200 and email like '%@%.%' and coalesce(char_length(name), 0) <= 200);

alter table public.content_history enable row level security;
create policy "history admin read" on public.content_history for select to authenticated using (public.is_admin());

alter table public.admins enable row level security;
alter table public.content enable row level security;
alter table public.orders enable row level security;
alter table public.messages enable row level security;
alter table public.subscribers enable row level security;

-- správci
create policy "admins read" on public.admins for select to authenticated using (public.is_admin());
create policy "admins add" on public.admins for insert to authenticated with check (public.is_admin() and protected = false);
create policy "admins edit" on public.admins for update to authenticated using (public.is_admin() and protected = false) with check (protected = false);
create policy "admins remove" on public.admins for delete to authenticated using (public.is_admin() and protected = false);

-- obsah: číst může každý, měnit jen správce
create policy "content public read" on public.content for select to anon, authenticated using (true);
create policy "content admin write" on public.content for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- formuláře: návštěvník smí jen vložit, správce vše
create policy "orders insert" on public.orders for insert to anon, authenticated with check (status = 'nová' and paid_at is null);
create policy "orders admin" on public.orders for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "messages insert" on public.messages for insert to anon, authenticated with check (status = 'nová');
create policy "messages admin" on public.messages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "subscribers insert" on public.subscribers for insert to anon, authenticated with check (true);
create policy "subscribers admin" on public.subscribers for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- obrázky: veřejný bucket media, nahrávat smí jen správce
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 8388608, array['image/webp', 'image/png', 'image/jpeg', 'image/gif', 'video/mp4'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy "media admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- správci: Sonia (hlavní) a Nela (chráněná technická správa – z administrace ji nejde odebrat)
insert into public.admins (email, name, protected) values
  ('eddesonia@gmail.com', 'Sonia Edde Arael', false),
  ('mizeranela@gmail.com', 'Nela Mizera – technická správa', true)
on conflict (email) do update set name = excluded.name, protected = excluded.protected;

-- Oprávnění pro web (nové projekty Supabase je nedávají automaticky)
grant usage on schema public to anon, authenticated;

grant select on public.content to anon, authenticated;
grant insert, update, delete on public.content to authenticated;
grant select on public.content_history to authenticated;
grant select, insert, update, delete on public.admins to authenticated;

grant insert on public.orders, public.messages, public.subscribers to anon, authenticated;
grant select, update, delete on public.orders, public.messages, public.subscribers to authenticated;

