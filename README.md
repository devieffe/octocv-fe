# OctoCV — AI-Powered CV Builder & Career Platform

> **Live:** [octocv.io](https://octocv.io) · **Branch:** `main` · **Stack:** React 19 · Vite 8 · Tailwind CSS 3 · Redux Toolkit 2

OctoCV is a full-stack career platform that combines AI-generated CVs, adaptive skills assessments, and personalised career path planning to help professionals land roles they love.

---

## Features

- ✍️ **AI CV Builder** — generate tailored, ATS-optimised CVs in minutes, personalised to the user's background and target role
- 🎯 **Career Path Planner** — custom career roadmaps with milestone tracking and skill-gap analysis
- 📚 **Skills Assessments** — adaptive quizzes covering problem solving, computer literacy, and motivational profiling
- 🔐 **Auth & Profiles** — full JWT authentication flow with email verification, token refresh, and secure session persistence via redux-persist
- 🌗 **Dark / Light Theme** — user preference stored in localStorage + cookie, applied before first paint to prevent flash of unstyled content
- 🍪 **GDPR Cookie Banner** — compliant consent management with "Accept all" and "Essential only" tiers; consent persisted to localStorage + cookie
- ♿ **Accessibility (WCAG 2.1 AA)** — semantic landmarks, ARIA labels, `aria-current`, `aria-expanded`, skip-to-content link, visible focus rings, `prefers-reduced-motion` support
- 🔍 **SEO** — full Open Graph, Twitter Card, JSON-LD structured data (WebSite + Organization + SoftwareApplication), canonical URL, meta descriptions
- 👨‍💼 **Admin Dashboard** — staff-only routes for user management and platform tooling

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19.2 + React DOM |
| Build Tool | Vite 8 + @vitejs/plugin-react |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Routing | React Router DOM 7 |
| State | Redux Toolkit 2 + redux-persist 6 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Forms | React Hook Form 7 |
| HTTP | Axios |
| UI Extras | Headless UI 2 · Bootstrap 5 · Lottie React |
| Deployment | Vercel (framework: vite) |

---

## Project Structure

```
src/
├── assets/               # Static images
├── components/
│   ├── Admin/            # Staff-only dashboard, user detail, tools
│   ├── Questionnaire/    # Adaptive assessment flows
│   ├── routes/           # StaffRoute guard
│   ├── user/             # UserDashboard, Settings, CareerPath, Auth screens
│   ├── CookieBanner.jsx  # GDPR consent banner
│   ├── DashboardLayout.jsx
│   ├── HomePage.jsx      # Public landing page
│   ├── MakeCv.jsx
│   └── Sidebar.jsx
├── context/
│   └── ThemeContext.jsx  # Dark/light theme provider + cookie sync
├── data/                 # Static JSON data
├── slices/               # Redux slices (auth, etc.)
├── store/                # Redux store + persistor config
├── App.jsx
├── App.css
├── index.css             # Tailwind directives + light theme overrides
└── index.jsx             # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & run locally

```bash
# Clone the repo
git clone https://github.com/devieffe/octocv-fe.git
cd octocv-fe/1

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

### Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # locally preview the production build
```

---

## Deployment

The project deploys to **Vercel** automatically on every push to `main`.

`vercel.json` configures:
- Framework preset: `vite`
- Output directory: `dist`
- SPA rewrites: all paths → `index.html` (required for React Router)

---

## Environment Variables

Create a `.env` file in the project root (never commit it):

```env
VITE_API_BASE_URL=https://your-api.example.com
```

All Vite env vars must be prefixed with `VITE_` to be exposed to the client bundle.

---

## Accessibility

- Colour contrast meets WCAG 2.1 AA in both dark and light themes
- All interactive elements have visible `:focus-visible` outlines (red-500 ring)
- Skip-to-main-content link available on keyboard navigation
- Reduced-motion media query disables all CSS transitions and Framer Motion animations

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using conventional commits: `feat:`, `fix:`, `chore:`, etc.
4. Open a pull request against `main`

---

## License

MIT © OctoCV

