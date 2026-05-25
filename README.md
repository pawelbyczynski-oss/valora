# PropertyPanel

PropertyPanel is a UK property finance and portfolio prototype for BTL, commercial and portfolio tracking.

## Local preview

Open `index.html` directly, or run a static server:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:4173
```

## Vercel

This is currently a static HTML/CSS/JS app. In Vercel:

- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`

Production URL:

```text
https://valora-property-os.vercel.app
```

## Environment variables

See `.env.example`.

For the current static prototype, only public values are useful. Secret keys must stay server-side when the app is migrated to Next.js/API routes or Supabase Edge Functions.

## Live SaaS plan

See `LIVE_DEPLOYMENT.md`.
