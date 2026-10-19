# UzStack Website — Project Brief

## 1. Project context
- Brand: **UzStack** — a software-development brand associated with Uzbekistan.
- Public domain: **uzstack.uz** (registered through Ahost.uz).
- DNS provider: Cloudflare. Cloudflare reports the zone as **Active**.
- GitHub repository: **yakhya-khan/uzstack-website**, default branch `main`.
- Current repo state at handoff: only a README; no website application has been implemented.
- No hosting/deployment or email mailbox has been configured yet. Do not assume the live domain already serves a website.
- A visual identity concept was discussed: geometric stacked/layered mark, premium minimal tech style, navy/blue/cyan/teal. There is no verified production-ready vector logo in this repository yet.

## 2. Goal
Create a high-quality, maintainable, responsive company website for UzStack, a brand offering software development in Uzbekistan. The site should work as a credible B2B landing page and portfolio foundation, not a demo with dummy text.

Target audiences: businesses seeking internal systems, web platforms, desktop applications, mobile applications, API and system integration, and prospective collaborators.

## 3. Tech and deployment target
- **Astro + TypeScript**, static output.
- Plain, maintainable CSS (CSS variables, responsive layouts). Do not add a heavy UI framework by default.
- No backend, database, CMS, paid external APIs, or third-party analytics for the MVP.
- `npm run dev` works locally; `npm run build` produces the **dist/** folder.
- Deployment target: **Cloudflare Pages** with GitHub integration; framework Astro, build command `npm run build`, output directory `dist`.
- Do not change Cloudflare DNS or production settings, publish live, or handle credentials without explicit user authorization.

## 4. Design direction
- Brand wording: **UzStack** (exact case); use **uzstack.uz** for the domain.
- Clean enterprise-grade interface, visually distinctive but not overloaded with effects.
- Deep navy `#0F172A`, blue `#2563EB`, sky `#0EA5E9`, teal `#14B8A6`. White/light backgrounds for light mode. Green `#22C55E` is optional, sparingly used.
- Light and dark themes, respecting system preference; accessible switch if practical.
- Use a layered stack/abstract modular geometry in a simple original SVG logo, along with text wordmark. Ensure readability at favicon size. Keep icons/vector graphics as source files.
- Responsive desktop/tablet/mobile, good contrast and keyboard navigation. Prefer reduced-motion handling.

## 5. Initial site content (MVP)
Landing page sections:
1. Header: UzStack, navigation, light/dark toggle, contact CTA.
2. Hero: compelling Uzbek-technology-inspired yet internationally professional messaging. Suggested Russian heading: "Разрабатываем программные решения для бизнеса" and supporting text that references Uzbekistan and modern technologies.
3. Services: Web applications, Desktop applications, Mobile applications, Backend & API, Business automation/integrations.
4. Technology expertise: ASP.NET Core, C#/.NET, PostgreSQL, Avalonia, TypeScript and related tools. Describe capability, not certification.
5. Products / work: optionally mention **TradeDistribution** only as an **in-development** solution; do not invent public case studies, customer names, metrics, screenshots, logos, performance numbers, partner relationships or testimonials. If there is not enough approved content, prefer an honest "Projects in development" section.
6. About: concise credible description without asserting a registered legal entity, employee headcount, office address, or years of operation.
7. Contact: clear contact CTA. Do not display a pretend functioning corporate email; `info@uzstack.uz` is only planned, not configured. Until provided with verified contact details, use a GitHub link and/or a clearly marked placeholder in content configuration. Do not put a broken contact form on the page.
8. Footer with domain and links.

Default copy language: **Russian** for the MVP, organized so Uzbek (Latin) and English localization can be added later. Do not silently ship a partly translated interface.

## 6. Engineering requirements
- Semantic HTML and accessible navigation.
- SEO basics: meaningful title, meta description, canonical URL `https://uzstack.uz/`, Open Graph defaults, favicon, robots/sitemap if easy to maintain.
- Reasonable Lighthouse performance and zero runtime console errors.
- Strong mobile layout, no horizontal scrolling at common widths.
- Put changeable company text, navigation, links, and contact data in a clear central config/data module where practical.
- Keep dependencies minimal; commit a lockfile.
- Avoid unused packages, dead code, generic lorem ipsum, and deceptive content.
- Add README instructions for installation, local development, build, and Cloudflare Pages deployment.

## 7. Execution plan for Codex Desktop
1. Inspect repository and environment (Node.js/npm, git status). Explain any blockers.
2. Initialize Astro + TypeScript in this existing repo without overwriting useful existing content.
3. Create the brand foundation (tokens, SVG mark, typography, themes).
4. Implement the landing page and responsive interactions.
5. Run install/build/check commands appropriate to the generated project; fix issues found.
6. Update README, show a concise summary of changes, any remaining choices, and commands to preview the site.
7. Commit/push only in accordance with the user's chosen workflow. Ask before live deployment or DNS changes.

## 8. Definition of done for first development milestone
- Site starts locally and builds cleanly.
- Brand/UI are consistent across desktop and mobile.
- All MVP sections exist with truthful draft content.
- Light and dark themes work.
- Basic accessibility and metadata are present.
- No fabricated contact details and no prematurely live backend references.
- GitHub repo contains source and documentation, ready to connect to Cloudflare Pages.

## 9. Decisions needing user confirmation later
- Final logo approval and production-ready vector assets.
- Actual contact channels and operational business email.
- Publicly approved product portfolio items and screenshots.
- Whether Russian-only MVP is enough or full Uzbek/English rollout should be done before launch.
- Authorization to connect Cloudflare Pages and publish `uzstack.uz`.
