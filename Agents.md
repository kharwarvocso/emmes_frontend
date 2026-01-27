# Agents.md (Code Agent) — emmes_frontend

> Project type: SEO-first landing page (Next.js 16 App Router + React 19)  
> Backend: Strapi v5 (REST API; follow Strapi v5 official docs only: https://docs.strapi.io/llms-full.txt)  
> Principles: Production-grade, simple implementations, SOLID, accessible, fast, maintainable.

---

## 0) What Code Agent should optimize for

1. **SEO + Performance first**
   - Ship the smallest possible client JS.
   - Prefer **Server Components** and **static rendering** where possible.
   - Use **Next.js Metadata API** for titles/OG/Twitter/canonical.
   - Generate **sitemap.xml**, **robots.txt**, and **JSON-LD** for key pages.
   - Ensure good Core Web Vitals: optimize images, fonts, JS, and layout shifts.

2. **Strapi v5 correctness**
   - Always form requests and filters **exactly per Strapi v5 official documentation** (use the provided llms-full link).
   - Do not invent endpoints or query syntax.
   - Never hardcode content structure; rely on content-types and fields as defined in Strapi.

3. **Simple production-grade code**
   - Use SOLID + small modules.
   - Single responsibility: API client, query functions, UI components, page composition separated.
   - Strict error handling and safe defaults.

4. **React 19 / Next 16 best practices**
   - Prefer Server Components for page shells and static data.
   - Use Client Components only when needed (forms, interactive UI, sliders).
   - Keep state local; avoid global state unless necessary.

5. **Animations with minimal JS**
   - Use **CSS-first animations** for most transitions (best SEO/perf).
   - Use `motion` selectively for interactive/hero sections.
   - “Server-side as much as possible” means:
     - Precompute animation variants and initial states on the server and pass as props.
     - Render initial layout + initial motion values from the server; run only the animation runtime on the client when required.
   - Respect `prefers-reduced-motion`.

---

## 1) Working agreement for Code Agent

When implementing anything, Code Agent must proceed in this order:

### Step A — Clarify requirements from repo context
- Inspect existing `/app` routes and components.
- Identify what landing sections exist (Hero, Features, Testimonials, Pricing, FAQ, Footer).
- Identify what content comes from Strapi vs static.

### Step B — Create a mini-PRD (in the PR body or comments)
For each feature/work item, write:
- Goal
- User story
- Data requirements (Strapi content types, fields)
- Rendering strategy (static/ISR/server/client)
- SEO requirements (metadata, schema, internal linking)
- Success criteria

### Step C — Implement with architecture discipline
- Keep API logic out of UI components.
- Prefer Server Components for data loading and layout.
- Use typed runtime validation with `zod` at API boundaries (even in JS).
- Use `@tanstack/react-query` only when you truly need client-side caching/refetching.

### Step D — Add basic checks
- Ensure build passes.
- Ensure no `console.log` in production paths.
- Ensure metadata and canonical URLs exist.

---

## 2) Project conventions

### 2.1 Rendering strategy rules (SEO-first)
- **Default:** Static rendering (SSG) for landing pages.
- **Use ISR** (revalidate) when content updates in Strapi should show automatically without redeploy.
- **Use Client Rendering** only for:
  - Forms (lead capture, newsletter)
  - Carousels/sliders (e.g., Swiper)
  - Complex animations/interactions
  - User-specific state


> Code Agent should not massively restructure unless necessary. Incremental improvements only.

---

## 3) Environment variables (must)
Use `@t3-oss/env-nextjs` and `zod` to validate envs at startup.

### Required envs
- `NEXT_PUBLIC_SITE_URL` (canonical base URL)
- `STRAPI_URL` (server-side base URL)
- `NEXT_PUBLIC_STRAPI_URL` (optional, only if client calls Strapi)
- `STRAPI_API_TOKEN` (server-only if using token auth)

Rules:
- Never expose `STRAPI_API_TOKEN` to client code.
- Prefer server-to-server calls for Strapi where possible.

---

## 4) Strapi v5 API usage rules (non-negotiable)

1. **Always follow Strapi v5 official docs**  
   Reference: https://docs.strapi.io/llms-full.txt

2. **No “guessing” query params**  
   If unsure, search within the Strapi doc file and implement exactly as specified.

3. **Prefer server-side fetching**
- Landing pages should fetch from Strapi in Server Components or Route Handlers.
- Use client fetching only when a component truly needs it.

4. **Data validation**
- Every Strapi response used in UI must be validated with `zod` in `lib/strapi/schema.js`.

5. **Error handling**
- Fail gracefully: show fallback sections or hide optional blocks.
- For critical content, show an error boundary-friendly message.

---

## 5) Data fetching patterns

### 5.1 Server-side fetching (preferred)
- In `lib/strapi/queries.js`, write functions like:
  - `getLandingPage()`
  - `getSeoSettings()`
  - `getTestimonials()`

Rules:
- Use `axios` in the server layer only.
- Add caching/revalidation strategy:
  - Use `fetch` with Next caching if possible (preferred),
  - If using `axios`, implement caching via Next route handlers or revalidate pattern.

> If Code Agent chooses `axios` in Server Components, it must document how caching is handled (ISR or route handler).

### 5.2 Client-side fetching (only if needed)
Use `@tanstack/react-query` for:
- forms that need async validation
- dynamic sections that update without navigation

Rules:
- Create query keys in one place (e.g., `lib/strapi/queryKeys.js`).
- Ensure retries/backoff are sensible.
- Never block initial page render for non-critical data.

---

## 6) SEO checklist (must implement)

### 6.1 Metadata API
Every public page must define:
- title + description
- canonical
- OG + Twitter cards
- robots directives

Use `app/(public)/page.jsx` + `generateMetadata()` where appropriate.

### 6.2 Structured data (JSON-LD)
Add JSON-LD where relevant:
- Organization / WebSite
- FAQPage (if FAQ section exists)
- Product/Service (if pricing/services are displayed)
- BreadcrumbList (if multi-page)

Create reusable component: `components/seo/JsonLd.jsx`.

### 6.3 Sitemap + Robots
- `app/(public)/sitemap.js` to generate sitemap.
- `app/(public)/robots.js` to generate robots.
- Include Strapi-driven routes if any (e.g., /blog, /pages/[slug]).

### 6.4 Performance + accessibility
- Use `next/image` for images.
- Ensure headings are semantic (one H1).
- Buttons/links accessible, focus states present.
- Avoid CLS: fixed dimensions or aspect ratio for media.

---

## 7) Animations (motion) policy

Goal: “Motion, but minimal JS.”

1. **Default to CSS**
- Prefer CSS transitions/animations for hover, reveal, simple effects.

2. **Use `motion` only for**
- Hero micro-interactions
- Scroll reveal on key sections
- Complex sequences that CSS can’t do cleanly

3. **Server-first approach**
- Compute variants and initial props in Server Components and pass down.
- Client component should only “play” the animation.

4. **Reduced motion**
- Respect `prefers-reduced-motion` (disable or simplify).

5. **Avoid layout thrash**
- Use transforms/opacity rather than top/left.
- Avoid animating expensive properties.

---

## 8) UI and forms

- Use `react-hook-form` for forms.
- Validate with `zod` (server + client).
- Use `sonner` for toasts.
- If shadcn/ui components are used, keep them in `components/ui`.

Rules:
- Forms must handle:
  - loading state
  - success state
  - error state with actionable messaging

---

## 9) Code quality rules (SOLID + simplicity)

- **S**: Each module does one thing (API client ≠ UI).
- **O**: Add new sections by adding new components, not modifying core flow heavily.
- **L/I**: Keep interfaces small; don’t pass giant props bags.
- **D**: Depend on abstractions:
  - UI depends on `lib/strapi/queries.js`, not raw axios calls.

General:
- No duplicated logic (create helpers).
- Avoid deep prop drilling; use composition.
- Keep components small and readable.

---

## 10) What Code Agent should NOT do
- Do not introduce heavy state libraries unless requested.
- Do not move everything to client just to make it easier.
- Do not invent Strapi endpoints or filters.
- Do not add “SEO hacks” that harm UX (keyword stuffing, hidden text).

---

## 11) Deliverables format for each task/PR

Every change set should include:
1. Mini-PRD notes (Goal, Data, Rendering, SEO)
2. Implementation
3. SEO checklist confirmation (metadata, canonical, sitemap/robots if applicable)
4. Basic verification steps (how to run, what to check)

---

## 12) Quick start commands (for reference)

- Dev: `bun run dev`
- Build: `bun run build`
- Start: `bun run start`

---

## 13) Default landing page content model (guidance)

Code Agent should expect Strapi to provide:
- global settings: site name, logo, social links
- landing page: hero, features, testimonials, pricing, FAQ, footer
- SEO fields: title, description, OG image, canonical overrides

If Strapi schema differs, Code Agent must adapt to the actual schema and update Zod validators accordingly. update Agents.md data if there is change in workflow.
---
