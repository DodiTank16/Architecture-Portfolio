# Arch Studio — Architecture Portfolio

A full-featured, production-ready architecture firm portfolio built with **Next.js 16**, **Three.js**, **Framer Motion**, and **GSAP**. Showcases projects, services, and a contact lead form with a rich, animated UI.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Components](#components)
- [Data & Content](#data--content)
- [API Routes](#api-routes)
- [Styling & Theming](#styling--theming)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Overview

**Arch Studio** is a Mumbai-based architecture firm portfolio site (`archstudio.in`). It features:

- Immersive full-screen **3D hero scene** (Three.js / React Three Fiber)
- Per-project **3D model viewer** with procedural geometry per category
- **Before/After image slider** for project transformations
- Smooth inertia scrolling via **Lenis** synced with GSAP ScrollTrigger
- Animated section reveals with **Framer Motion**
- Portfolio filter by category (Residential / Commercial / Interior)
- Contact **lead form** with Zod validation, posting to a REST API route
- Fully static content — no database or CMS required

---

## Tech Stack

| Category | Library / Tool | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.2 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| 3D / WebGL | Three.js + React Three Fiber + Drei | ^0.183 / ^9.5 / ^10.7 |
| Animation | Framer Motion | ^12.38 |
| Animation | GSAP + @gsap/react | ^3.14 / ^2.1 |
| Smooth Scroll | Lenis | ^1.3 |
| Forms | React Hook Form + Zod + @hookform/resolvers | ^7.72 / ^4 / ^5.2 |
| Styling | Tailwind CSS v4 | ^4 |
| Utilities | clsx + tailwind-merge | ^2.1 / ^3.5 |
| Fonts | Inter + Cormorant Garamond (next/font/google) | — |

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, Navbar, Footer, SmoothScroll
│   ├── page.tsx                # Home page
│   ├── loading.tsx             # Route-level loading boundary (LoadingSpinner)
│   ├── not-found.tsx           # Custom 404 page
│   ├── about/page.tsx          # Studio story, team, awards
│   ├── contact/page.tsx        # Contact info + LeadForm
│   ├── projects/
│   │   ├── page.tsx            # Filterable project grid
│   │   └── [slug]/page.tsx     # Project detail — 3D viewer, slider, gallery
│   ├── services/page.tsx       # Services with pricing + process steps
│   └── api/
│       └── contact/route.ts    # POST /api/contact — lead capture endpoint
├── components/                 # All reusable UI components (see below)
├── lib/
│   ├── projects.ts             # Project data + helper functions
│   ├── services.ts             # Services + process steps data
│   └── utils.ts                # cn() class merger, slugify()
├── public/                     # Static assets
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — full-screen 3D hero, stats bar, featured projects grid, testimonials carousel, CTA |
| `/about` | Studio story, 4 team member profiles, awards section, featured project showcase |
| `/projects` | Portfolio grid with category `FilterBar`; animated card transitions |
| `/projects/[slug]` | Project detail — GSAP scroll reveals, `ThreeDViewer`, `BeforeAfterSlider`, gallery, floor plan, features list, testimonial, Next Project nav |
| `/services` | Three services with feature lists and pricing; four-step process section |
| `/contact` | Contact details, WhatsApp CTA, and the `LeadForm` component |

---

## Components

| Component | Description |
|---|---|
| `Navbar` | Fixed header. Transparent → frosted-glass on scroll. Framer Motion slide-in, active link underline with `layoutId`, responsive hamburger menu. |
| `Footer` | Brand blurb, three link columns (Studio / Services / Legal), social links (Instagram, LinkedIn, Behance). |
| `SmoothScroll` | App-wide wrapper. Initialises `Lenis` with custom easing, synced to GSAP `ScrollTrigger` and its ticker. |
| `HeroScene` | SSR-disabled Three.js canvas. Procedural building geometry, `Stars` background, `Float` wrapper, `Environment` lighting, mouse-reactive spotlight. |
| `ThreeDViewer` | SSR-disabled per-project 3D canvas. Renders a `ProceduralModel` based on project category with different geometry and accent colours. Accepts an optional GLTF path. |
| `AnimatedSection` | Framer Motion `whileInView` wrapper. Configurable entry direction (`up` / `down` / `left` / `right` / `none`), `delay`, and visibility `amount`. |
| `ProjectCard` | Image card linking to project detail. Hover scale + "View Project" overlay + category badge. Stagger-animated via Framer Motion. |
| `BeforeAfterSlider` | Drag/touch before-after image comparison using CSS `clip-path`. Divider handle with SVG chevron icon. |
| `FilterBar` | Category filter buttons with `aria-pressed` accessibility. Controlled by the parent page. |
| `LeadForm` | Contact form (name, email, phone, projectType, budget, message). React Hook Form + Zod validation. POSTs to `/api/contact`. Success/error states with Framer Motion. |
| `Testimonial` | Styled quote card with decorative mark, author info, and scroll-entry animation. |
| `ScrollIndicator` | Floating "Scroll" label with a looping animated accent bar. |
| `LoadingSpinner` | Spinning CSS border ring used as Suspense fallback and route loading boundary. |

---

## Data & Content

All content is **static TypeScript data** in the `lib/` directory — no database or CMS.

### Projects (`lib/projects.ts`)

Six seeded projects across three categories:

| Title | Category |
|---|---|
| Skyline Residence | Residential |
| Meridian Tower | Commercial |
| Verdant Villa | Residential |
| The Grove Interior | Interior |
| Urban Nexus Office | Commercial |
| Heritage Retreat (Rajasthan) | Residential |

Each project exposes: `slug`, `title`, `category`, `location`, `year`, `area`, `budget`, `tagline`, `description`, `overview`, `process`, `heroImage`, `images[]`, `floorPlanImage`, `beforeImage`, `afterImage`, `testimonial`, `features[]`, `tags[]`.

Helper functions: `getProjectBySlug(slug)`, `getProjectsByCategory(category)`.

### Services (`lib/services.ts`)

| Service | Starting At |
|---|---|
| Architecture | ₹80 / sq ft |
| Interior Design | ₹1,200 / sq ft |
| Urban Planning | Custom |

Also exports `processSteps[]` — four phases: Discovery → Concept → Design Development → Execution.

---

## API Routes

### `POST /api/contact`

Handles lead form submissions from `LeadForm`.

**Required body fields:** `name`, `email`, `phone`  
**Optional:** `projectType`, `budget`, `message`

**Responses:**

| Status | Meaning |
|---|---|
| `200` | Submission received |
| `400` | Missing required fields |
| `500` | Unexpected server error |

> **Note:** Email delivery is currently stubbed with a `TODO`. Wire up [Resend](https://resend.com), [SendGrid](https://sendgrid.com), or Nodemailer and add the API key as an environment variable.

---

## Styling & Theming

- **Tailwind CSS v4** via `@import "tailwindcss"` in `globals.css`
- Custom design tokens in a `@theme {}` block:

| Token | Value |
|---|---|
| `dark` → `dark-500` | Near-black scale (background) |
| `light`, `light-200`, `light-300`, `muted` | Off-white / grey scale |
| `accent` | `#c8a96e` — warm gold |
| `accent-light`, `accent-dark` | Gold tints |

- Global utility classes: `.btn-primary`, `.btn-outline`, `.btn-ghost`
- Custom thin accent-coloured scrollbar
- `::selection` styled with a translucent accent tint

**Fonts (loaded via `next/font/google`):**

| Variable | Font | Usage |
|---|---|---|
| `--font-inter` | Inter | Body / UI text |
| `--font-cormorant` | Cormorant Garamond | Display headings |

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** (or yarn / pnpm / bun)

### Installation

```bash
git clone <your-repo-url>
cd architecture-portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses **Turbopack** for fast HMR.

---

## Environment Variables

No environment variables are needed to run locally — all content is static.

To enable email delivery in `app/api/contact/route.ts`, add credentials to `.env.local`:

```env
# Example — pick one provider
RESEND_API_KEY=re_xxxxxxxxxxxx
# or
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
```

> `.env.local` is git-ignored by default and must never be committed.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Turbopack development server |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Deployment

**Vercel (recommended):**

1. Push your repo to GitHub / GitLab / Bitbucket.
2. Import on [vercel.com/new](https://vercel.com/new).
3. Set any environment variables (e.g. `RESEND_API_KEY`) in the Vercel dashboard.
4. Deploy — Vercel auto-detects Next.js and handles everything.

**Other platforms (Netlify, Railway, VPS):**

```bash
npm run build
npm run start
```

Ensure Node.js 18+ is available on the host.

---

> Built with Next.js · Three.js · Framer Motion · GSAP · Tailwind CSS v4
