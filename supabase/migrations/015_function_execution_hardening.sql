alter function public.set_updated_at() set search_path = public;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;

grant execute on function public.set_updated_at() to service_role;
grant execute on function public.handle_new_user() to service_role;
