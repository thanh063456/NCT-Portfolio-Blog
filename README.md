# NCT-Portfolio-Blog

Portfolio blog built with Next.js 15, TypeScript strict, Tailwind CSS, shadcn/ui, and Supabase.

## Development

Run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Build

```bash
npm run lint
npm run build -- --no-lint
```
