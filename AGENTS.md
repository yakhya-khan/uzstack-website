# AGENTS.md — Instructions for Codex

You are working on the **UzStack** corporate website in this repository.

Read **docs/PROJECT_BRIEF.md** first. It defines project context, requirements, architecture, brand styling and acceptance criteria.

## Working agreement
- Work in this repository; inspect current files and dependencies before editing.
- Implement iteratively with small, reviewable changes. Do not create unrelated features.
- Primary stack: Astro + TypeScript, static output, minimal CSS/dependencies.
- Default site language: Russian; structure content to add Uzbek (Latin) and English later.
- Follow the agreed UzStack palette and layered-stack logo direction in the project brief.
- Use factual, honest marketing copy. Do not invent team credentials, clients, contact mailboxes, launch status, portfolio claims or legal details.
- Keep the output ready for Cloudflare Pages: `npm run build` -> `dist/`.
- Validate work by running relevant local checks/builds; explain any commands not executable in this environment.
- Keep README updated with exact setup and deployment steps.
- Never commit secrets or credentials. Avoid changing external DNS, Cloudflare settings, or publishing live without explicit user approval.
- If decisions are missing, choose a safe reversible MVP default and document what needs confirmation.

## Immediate assignment
Implement the **first complete responsive UzStack landing page** described in the project brief, with a high-quality light/dark visual design, original SVG brand mark, services, technology, honest product preview, about and contact sections. Test the result, then report what was done and how to preview it.
