create or replace function public.prevent_overlapping_tenancy_periods()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.tenancy_start_date is null then
    return new;
  end if;

  if exists (
    select 1
    from public.tenancy_periods t
    where t.user_id = new.user_id
      and t.property_id = new.property_id
      and t.id <> new.id
      and t.tenancy_start_date is not null
      and new.tenancy_start_date <= coalesce(t.tenancy_end_date, 'infinity'::date)
      and coalesce(new.tenancy_end_date, 'infinity'::date) >= t.tenancy_start_date
  ) then
    raise exception 'These tenancy dates overlap with an existing tenancy for this property.'
      using errcode = '23P01';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_overlapping_tenancy_periods on public.tenancy_periods;
create trigger prevent_overlapping_tenancy_periods
before insert or update on public.tenancy_periods
for each row execute function public.prevent_overlapping_tenancy_periods();

create or replace function public.prevent_overlapping_remortgage_events()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.start_date is null then
    return new;
  end if;

  if exists (
    select 1
    from public.remortgage_events r
    where r.user_id = new.user_id
      and r.property_id = new.property_id
      and r.id <> new.id
      and r.start_date is not null
      and new.start_date <= coalesce(r.expiry_date, 'infinity'::date)
      and coalesce(new.expiry_date, 'infinity'::date) >= r.start_date
  ) then
    raise exception 'These mortgage dates overlap with an existing mortgage record for this property.'
      using errcode = '23P01';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_overlapping_remortgage_events on public.remortgage_events;
create trigger prevent_overlapping_remortgage_events
before insert or update on public.remortgage_events
for each row execute function public.prevent_overlapping_remortgage_events();
