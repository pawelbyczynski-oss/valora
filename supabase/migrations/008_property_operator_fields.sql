alter table public.properties
add column if not exists ownership_model text not null default 'Owned'
  check (ownership_model in ('Owned', 'Managed', 'Rent-to-rent')),
add column if not exists guaranteed_rent numeric(12, 2) not null default 0,
add column if not exists maintenance_model text not null default 'Landlord charged for repairs'
  check (maintenance_model in ('Landlord charged for repairs', 'Operator covers repairs for monthly fee')),
add column if not exists maintenance_fee numeric(12, 2) not null default 0;
