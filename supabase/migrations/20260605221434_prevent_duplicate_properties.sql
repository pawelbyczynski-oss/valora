create or replace function public.prevent_duplicate_property_address()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if nullif(trim(coalesce(new.address_line_1, '')), '') is null
    or nullif(trim(coalesce(new.postcode, '')), '') is null then
    return new;
  end if;

  if exists (
    select 1
    from public.properties p
    where p.user_id = new.user_id
      and p.id <> new.id
      and lower(trim(p.address_line_1)) = lower(trim(new.address_line_1))
      and regexp_replace(upper(coalesce(p.postcode, '')), '\s+', '', 'g') = regexp_replace(upper(coalesce(new.postcode, '')), '\s+', '', 'g')
  ) then
    raise exception 'This property already exists in your portfolio.'
      using errcode = '23505';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_duplicate_property_address on public.properties;
create trigger prevent_duplicate_property_address
before insert or update on public.properties
for each row execute function public.prevent_duplicate_property_address();
