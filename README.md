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
- Build command: `npm run build`
- Output directory: `.`

Production URL:

```text
https://valora-property-os.vercel.app
```

## Environment variables

See `.env.example`.

Public Supabase values are built into `config.js` during deploy. Secret keys must stay server-side in Supabase Edge Function secrets or Vercel environment variables.

## Live SaaS plan

See `LIVE_DEPLOYMENT.md`.
