# UniTrack University ERP — Vercel deployment

## GitHub repository layout
Upload the CONTENTS of this folder directly to the root of your GitHub repository. Do not upload this ZIP file as the only item and do not place these files inside another nested folder.

Required root files:
- `package.json`
- `index.html`
- `main.tsx`
- `App.tsx`
- `index.css`
- `vite.config.ts`
- `vercel.json`

## Vercel settings
- Framework preset: Vite
- Root directory: `.` (repository root)
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Then deploy. Vercel will automatically redeploy after future commits to the connected GitHub branch.

## Local build test
Run these commands in the project directory:
```bash
npm install
npm run build
npm run preview
```

## Important
The current ERP interface is a demo and uses sample/local data and demo login logic. Do not use real student or confidential records. The included `schema.sql` is a database starter schema, not a complete secured backend integration. Configure Supabase authentication, policies/RLS, and app data integration before production use.
