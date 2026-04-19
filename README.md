# OctoCV — AI-Powered CV Builder & Career Platform

**Live:** [octocv.io](https://octocv.io) · React 19 · Vite 8 · Tailwind CSS 3 · Redux Toolkit 2 · Vercel

AI-powered career platform: tailored CVs, career path planning, skills assessments, and job matching.

## Features

- ✍️ AI CV Builder — ATS-optimised CVs in minutes
- 🎯 Career Path Planner — personalised roadmaps with skill-gap analysis
- 📚 Skills Assessments — problem solving, computer literacy, motivational profiling
- 🔐 Auth — JWT + email verification + redux-persist sessions
- 🌗 Dark / Light Theme — anti-FOUC, stored in localStorage + cookie
- 🍪 GDPR Cookie Banner — "Accept all" / "Essential only"
- ♿ Accessibility — WCAG 2.1 AA, ARIA, skip link, reduced-motion support
- 🔍 SEO — Open Graph, Twitter Card, JSON-LD structured data
- 👨‍💼 Admin Dashboard — staff-only user management

## Stack

React 19 · Vite 8 · Tailwind CSS 3 · React Router 7 · Redux Toolkit 2 · Framer Motion 12 · Lucide React · React Hook Form 7 · Axios

## Local Setup

```bash
git clone https://github.com/devieffe/octocv-fe.git
cd octocv-fe/1
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Environment

```env
VITE_SERVER_URL=https://your-api.example.com/
```

## Deployment

Auto-deploys to Vercel on push to `main`. `vercel.json` pins framework to `vite`, output to `dist/`, and adds SPA rewrites for React Router.

## License

MIT © OctoCV

