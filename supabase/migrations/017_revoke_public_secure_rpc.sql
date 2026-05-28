revoke all on function public.create_admin_promo_code(text, integer, timestamptz, integer, boolean) from public, anon, authenticated;
revoke all on function public.deactivate_admin_promo_code(text) from public, anon, authenticated;
revoke all on function public.get_admin_overview() from public, anon, authenticated;
revoke all on function public.redeem_promo_code(text) from public, anon, authenticated;

grant execute on function public.create_admin_promo_code(text, integer, timestamptz, integer, boolean) to service_role;
grant execute on function public.deactivate_admin_promo_code(text) to service_role;
grant execute on function public.get_admin_overview() to service_role;
grant execute on function public.redeem_promo_code(text) to service_role;
