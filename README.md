# QuantumSync Labs — Website

Marketing site for QuantumSync Labs. React 19 + Vite 6 + Tailwind CSS 4, deployed
on Vercel as a prerendered static site.

- **Live:** https://www.quantumsynclabs.com
- **Stack:** React 19, Vite 6, Tailwind 4, React Router 7, Framer Motion, three.js
- **Rendering:** SPA that is prerendered to static HTML at build time

---

## Contents

- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [How rendering works](#how-rendering-works)
- [Theming](#theming)
- [Content](#content)
- [Analytics and lead capture](#analytics-and-lead-capture)
- [Deployment](#deployment)
- [Conventions](#conventions)

---

## Quick start

Requires Node 18+ (built and tested on Node 24).

```bash
git clone https://github.com/QuantumSync-Labs-PLC/Company-Website.git
cd Company-Website
npm install
cp .env.example .env      # then fill in the values you have
npm run dev               # http://localhost:3000
```

The site runs without any environment variables. Every integration degrades
safely when unset — no half-configured feature is ever shown to a visitor.

---

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | Generates the sitemap, builds, then prerenders all routes |
| `npm run preview` | Serves `dist/` — the closest local equivalent to production |
| `npm run lint` | ESLint over `src/`, config files, and build scripts |
| `npm run check:contrast` | Verifies every theme colour pairing against WCAG AA |
| `npm run analyze` | Build with a bundle treemap at `.analysis/stats.html` |
| `npm run gen:sitemap` | Rebuild `public/sitemap.xml` from the route data |
| `npm run gen:og` | Regenerate the `public/og-image.webp` share card |
| `npm run prerender` | Prerender only, against an existing `dist/` |
| `npm run prepush` | `lint` + `build` — run before pushing |

`build` runs `gen:sitemap` before and `prerender` after, so a plain
`npm run build` always produces a complete, deployable `dist/`.

---

## Environment variables

All are optional. Vite **inlines these at build time**, so changing one in Vercel
requires a redeploy to take effect.

| Variable | Effect when set | Behaviour when unset |
| --- | --- | --- |
| `VITE_APP_URL` | Canonical host for URLs, OG tags, JSON-LD, sitemap | Falls back to `https://www.quantumsynclabs.com` |
| `VITE_GA_ID` | Loads GA4 and enables all tracking | No analytics script is injected |
| `VITE_EMAILJS_SERVICE_ID` | | |
| `VITE_EMAILJS_TEMPLATE_ID` | Contact forms deliver to your inbox | Submissions fail with a visible error |
| `VITE_EMAILJS_PUBLIC_KEY` | | |
| `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` | Sends the enquirer an instant acknowledgement | No acknowledgement; enquiry still delivered |
| `VITE_BOOKING_URL` | Shows the booking calendar on `/contact#book`; CTAs read "Schedule a call" | Booking section hidden; CTAs read "Send a brief" |
| `VITE_LEAD_WEBHOOK_URL` | POSTs each enquiry as JSON to your CRM | No CRM copy; enquiry still emailed |
| `VITE_MAILCHIMP_FORM_ACTION` | Newsletter signups reach your list | Form says signup is unavailable and gives an email address |
| `VITE_CRISP_WEBSITE_ID` | Loads the Crisp chat widget | No widget |

After setting `VITE_GA_ID`, mark `conversion` and `generate_lead` as key events
in GA4 — they are sent but not counted as conversions until you do.

---

## Project structure

```
scripts/                  Build-time tooling (Node, not shipped)
  generate-sitemap.mjs      sitemap.xml from the real route data
  generate-og-image.mjs     the 1200x630 social share card
  prerender.mjs             renders every route to static HTML
  routeList.mjs             shared route enumeration for the two above
  check-contrast.mjs        WCAG AA check over the theme tokens

src/
  components/
    ui/                     Generic primitives: Button, Card, Spinner, ThemeToggle…
    layout/                 Header, Footer, ScrollToTop, SectionShell
    marketing/              Components that exist to sell: CaseStudyCard, ServiceCta,
                            CtaBar, NewsletterForm, StatCounter…
    seo/                    PageMeta (head tags), JsonLd (structured data)
    integrations/           Third-party embeds: BookingEmbed, ChatWidget, RouteAnalytics
    decor/                  NetworkBackground
    system/                 ErrorBoundary
    three/                  WebGL scenes — always reached via Scene3DDeferred
  constants/                routes.js (single nav source), site.js, leadForm.js
  data/                     Content: services, caseStudies, blogPosts, careers,
                            engagementModels, processSteps, crossLinks
  hooks/                    useTheme (context provider), useCanRender3D
  pages/                    One file per route
  sections/                 Homepage sections
  theme/tailwind.css        All theme tokens and global CSS
  routes/index.jsx          Route table
  entry-prerender.jsx       Build-time server entry (never loaded in the browser)
```

Imports use the `@/` alias for anything inside `src/`:

```js
import Button from "@/components/ui/Button";
```

It is configured in `vite.config.js` (bundler), `jsconfig.json` (editor), and
`scripts/routeList.mjs` (build scripts). Relative imports across folders should
not be reintroduced — the alias is what makes files safe to move.

---

## How rendering works

The app is a client-side SPA, but shipping only an empty `<div id="root">` meant
search engines and social crawlers saw one title and one description for every
URL. `scripts/prerender.mjs` fixes that: after each build it renders all 29
routes to static HTML, lifts each page's `<title>`, description, canonical and
JSON-LD into `<head>`, and writes the result to `dist/`. React hydrates it
normally in the browser.

Two details worth knowing before changing it:

1. **Every route is a `React.lazy` component.** A single render pass emits the
   Suspense fallback ("Loading section…") instead of the page, so the script
   renders repeatedly until the output stops changing.
2. **Each route is written twice** — `pricing/index.html` and `pricing.html` —
   because static hosts disagree about how an extensionless URL resolves, and a
   host that resolves neither silently serves the SPA shell instead.

`public/sitemap.xml` is generated, not hand-written. Do not edit it; add the page
to `src/constants/routes.js` or the relevant data file instead.

---

## Theming

Light and dark are both defined in `src/theme/tailwind.css`:

- `:root` holds the complete light palette
- `[data-theme="dark"]` overrides it
- a `prefers-color-scheme` block repeats the dark values so a dark-preferring
  visitor gets dark even with JavaScript disabled, guarded by
  `:not([data-theme="light"])` so an explicit choice still wins

An inline script in `index.html` sets the attribute before first paint.
`ThemeProvider` in `src/hooks/useTheme.jsx` is the single source of theme state —
call `useTheme()`, never keep a local copy.

**Rules when changing colours:**

- Declare every token in `:root` first. A colour that exists only inside a
  `[data-theme]` block is undefined in the other theme.
- Text sitting on a filled brand colour uses `--qs-on-primary` / `-accent` /
  `-signal`, not `text-white`. White on the dark theme's cyan is 1.81:1.
- Run `npm run check:contrast` afterwards. It checks 20 pairings per theme and
  exits non-zero on a regression.

---

## Content

Content lives in `src/data/` as plain JavaScript — no CMS.

| File | Feeds |
| --- | --- |
| `services.js` | `/services`, `/services/:id` |
| `caseStudies.js` | `/work`, `/work/:id` |
| `blogPosts.js` | `/blog`, `/blog/:id` |
| `careers.js` | `/careers` |
| `engagementModels.js` | `/pricing` |
| `processSteps.js` | `/process` |
| `reviews.js`, `whyUs.js`, `techStack.js`, `teamMembers.js` | Homepage sections |

`crossLinks.js` joins services to case studies both ways. Case study
`serviceIds` **must** match an `id` in `services.js`; a mismatch logs an error in
development.

Adding a page: create it in `src/pages/`, add the route in
`src/routes/index.jsx`, and add it to `src/constants/routes.js` — the header,
footer, sitemap and prerenderer all read from that one list.

---

## Analytics and lead capture

`src/utils/analytics.js` wraps GA4. `RouteAnalytics` sends a `page_view` on every
route change; without it an SPA only ever reports its entry page. Tracked events:
`page_view`, `form_submit`, `generate_lead` (with service, budget and timeline),
`conversion`, `click`, `service_view`, `case_study_view`, `blog_post_view`,
`newsletter_signup`.

`src/utils/leads.js` handles enquiries. It emails the team (required), sends the
enquirer an acknowledgement, and POSTs the lead to a CRM webhook. The last two
run in parallel and can never fail the submission — if they error, the enquiry
still reached the team and the visitor is still told it worked.

---

## Deployment

Vercel, from `main`. `vercel.json` handles:

- a 301 from the apex domain to `www` (both previously served 200, splitting
  ranking signals between two copies of every page)
- `cleanUrls`, so prerendered files serve at extensionless paths
- immutable caching on hash-named assets only, short caching elsewhere
- HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

Build command `npm run build`, output directory `dist`.

To switch the canonical host, change `SITE_URL` in `src/constants/site.js`, set
`VITE_APP_URL` to match, and flip the redirect in `vercel.json`.

---

## Conventions

- Import from `@/`, not `../../`.
- Colours come from tokens. No hex values in components.
- New pages go in `src/constants/routes.js` so nav, sitemap and prerender agree.
- `npm run prepush` before pushing: lint must be clean and the build must
  prerender all routes.
- Content changes go in `src/data/`, not into JSX.
