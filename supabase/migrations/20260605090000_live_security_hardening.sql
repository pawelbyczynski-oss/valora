do $$
declare
  table_name text;
  tables text[] := array[
    'profiles',
    'subscriptions',
    'properties',
    'documents',
    'reminders',
    'property_transactions',
    'tenancy_periods',
    'remortgage_events',
    'tenancy_rent_changes',
    'calendar_feed_tokens',
    'recurring_expenses',
    'compliance_items',
    'arrears_cases',
    'maintenance_logs',
    'contractors',
    'rent_reviews',
    'void_periods',
    'promo_redemptions',
    'analytics_events',
    'email_templates',
    'email_send_logs',
    'app_settings',
    'marketing_cards'
  ];
begin
  foreach table_name in array tables loop
    if to_regclass(format('public.%I', table_name)) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('alter table public.%I force row level security', table_name);
    end if;
  end loop;
end $$;
