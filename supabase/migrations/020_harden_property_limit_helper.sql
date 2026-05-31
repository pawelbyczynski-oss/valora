create or replace function public.can_add_property()
returns boolean
language sql
security invoker
set search_path = public
stable
as $$
  select
    public.has_premium_access()
    and (
      public.has_pro_access_for_user(auth.uid())
      or (
        select count(*)
        from public.properties p
        where p.user_id = auth.uid()
      ) < 5
    );
$$;
