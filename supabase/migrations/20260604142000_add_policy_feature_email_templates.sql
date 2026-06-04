insert into public.email_templates (template_key, name, description, from_name, from_email, subject, body_html, body_text, variables, active)
values
  (
    'terms_changed',
    'Change of Terms and Conditions',
    'Notify users when PropertyPanel Terms of Service change.',
    'PropertyPanel',
    'noreply@propertypanel.co.uk',
    'We have updated the PropertyPanel Terms of Service',
    '<p>Dear {{first_name}},</p><p>We have updated the PropertyPanel Terms of Service.</p><p>Effective date: {{effective_date}}</p><p>Summary of the change:</p><p>{{change_summary}}</p><p>You can read the latest terms here: <a href="{{terms_url}}">{{terms_url}}</a></p><p>If you have questions, contact us at contact@propertypanel.co.uk.</p><p>PropertyPanel</p>',
    'Dear {{first_name}}, We have updated the PropertyPanel Terms of Service. Effective date: {{effective_date}}. Summary: {{change_summary}}. Read more: {{terms_url}}',
    array['first_name', 'effective_date', 'change_summary', 'terms_url']::text[],
    true
  ),
  (
    'privacy_changed',
    'Change of Privacy Policy',
    'Notify users when the Privacy Policy changes.',
    'PropertyPanel',
    'noreply@propertypanel.co.uk',
    'We have updated the PropertyPanel Privacy Policy',
    '<p>Dear {{first_name}},</p><p>We have updated the PropertyPanel Privacy Policy.</p><p>Effective date: {{effective_date}}</p><p>Summary of the change:</p><p>{{change_summary}}</p><p>You can read the latest policy here: <a href="{{privacy_url}}">{{privacy_url}}</a></p><p>If you have questions, contact us at contact@propertypanel.co.uk.</p><p>PropertyPanel</p>',
    'Dear {{first_name}}, We have updated the PropertyPanel Privacy Policy. Effective date: {{effective_date}}. Summary: {{change_summary}}. Read more: {{privacy_url}}',
    array['first_name', 'effective_date', 'change_summary', 'privacy_url']::text[],
    true
  ),
  (
    'pro_feature_added',
    'New feature added to Pro plan',
    'Tell Pro users about a new Pro feature.',
    'PropertyPanel',
    'noreply@propertypanel.co.uk',
    'New Pro feature: {{feature_name}}',
    '<p>Dear {{first_name}},</p><p>We have added a new feature to PropertyPanel Pro: <strong>{{feature_name}}</strong>.</p><p>{{feature_summary}}</p><p>Available from: {{available_from}}</p><p>Open PropertyPanel to try it: <a href="{{app_url}}">{{app_url}}</a></p><p>PropertyPanel</p>',
    'Dear {{first_name}}, We have added a new Pro feature: {{feature_name}}. {{feature_summary}} Available from: {{available_from}}. Open PropertyPanel: {{app_url}}',
    array['first_name', 'feature_name', 'feature_summary', 'available_from', 'app_url']::text[],
    true
  ),
  (
    'premium_feature_added',
    'New feature added to Premium plan',
    'Tell Premium users about a new Premium feature.',
    'PropertyPanel',
    'noreply@propertypanel.co.uk',
    'New Premium feature: {{feature_name}}',
    '<p>Dear {{first_name}},</p><p>We have added a new feature to PropertyPanel Premium: <strong>{{feature_name}}</strong>.</p><p>{{feature_summary}}</p><p>Available from: {{available_from}}</p><p>Open PropertyPanel to try it: <a href="{{app_url}}">{{app_url}}</a></p><p>PropertyPanel</p>',
    'Dear {{first_name}}, We have added a new Premium feature: {{feature_name}}. {{feature_summary}} Available from: {{available_from}}. Open PropertyPanel: {{app_url}}',
    array['first_name', 'feature_name', 'feature_summary', 'available_from', 'app_url']::text[],
    true
  ),
  (
    'feature_added',
    'New feature added',
    'Tell users about a general new PropertyPanel feature.',
    'PropertyPanel',
    'noreply@propertypanel.co.uk',
    'New PropertyPanel feature: {{feature_name}}',
    '<p>Dear {{first_name}},</p><p>We have added a new PropertyPanel feature: <strong>{{feature_name}}</strong>.</p><p>{{feature_summary}}</p><p>Available from: {{available_from}}</p><p>Open PropertyPanel to try it: <a href="{{app_url}}">{{app_url}}</a></p><p>PropertyPanel</p>',
    'Dear {{first_name}}, We have added a new PropertyPanel feature: {{feature_name}}. {{feature_summary}} Available from: {{available_from}}. Open PropertyPanel: {{app_url}}',
    array['first_name', 'feature_name', 'feature_summary', 'available_from', 'app_url']::text[],
    true
  )
on conflict (template_key) do update
set
  name = excluded.name,
  description = excluded.description,
  from_name = excluded.from_name,
  from_email = excluded.from_email,
  subject = excluded.subject,
  body_html = excluded.body_html,
  body_text = excluded.body_text,
  variables = excluded.variables,
  active = excluded.active,
  updated_at = now();
