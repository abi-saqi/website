# saqi.ai — Frontend Monorepo

One frontend repo, two deployable apps, and a set of shared packages that both apps (and future clients) build on. This mirrors the platform's module-ownership model on the backend: each piece has one owner and a typed public interface, and nothing reaches into another piece's internals.

## Layout

```
apps/
  website/     the public marketing site (saqi.ai) — mostly static/RSC pages
  console/     the product console (dashboard, conversations, bots, campaigns…)
packages/
  ui/          shadcn/ui components + the emerald design-token system
  api-client/  typed client generated from the platform's OpenAPI 3.1 spec
  i18n/        locale/currency/timezone formatting (₹ vs $, IST vs PST)
  permissions/ client-side permission gating (mirrors, never replaces, server policy)
  config/      shared eslint, tailwind and tsconfig presets
```

Two `package.json`s at the leaves (`apps/*`), everything reusable lives under `packages/*`. Apps depend on packages via `workspace:*`; packages never depend on apps.

## Why one repo, two apps

- **website** and **console** share design tokens, components, i18n and permission logic — a second repo would mean forking all of that or publishing/versioning internal packages for no reason. A monorepo with `pnpm` workspaces + `turbo` gets shared code without the publish step.
- They're still **separately deployable**: `turbo build --filter=@saqi/website` or `--filter=@saqi/console` builds just one, and CI/CD (see `saqi-devops-infra`) ships them as independent artifacts. One repo does not mean one deploy.
- If a third client shows up (e.g. a standalone agent desktop shell), it becomes `apps/agent-desktop` reusing the same `packages/*` — that's the whole point of the shared layer.

## Managing it as it grows: modules

The console isn't one blob — it grows a route/feature per platform module (`conversations`, `bots`, `campaigns`, `content`, `segments`, `integrations`, per `saqi-platform`'s module list). Convention for a new module:

1. **Route first**: `apps/console/app/<module>/` — an RSC page by default (see the rendering-strategy table in `saqi-frontend-console`); drop to a client component only for realtime, heavy local state, or rich interaction (e.g. bot studio's canvas, conversations' live view).
2. **Cross-module data goes through `@saqi/api-client`**, never a hand-written fetch — the generated client is typed against the OpenAPI spec, so a breaking backend change fails typecheck instead of shipping a runtime bug.
3. **Permission-gate at the component boundary** using `@saqi/permissions` — declare the permission a screen needs; the server enforces the same rule independently.
4. **New shared UI goes in `packages/ui`**, not copy-pasted between `website` and `console`. If a module needs a genuinely new shared primitive (e.g. the bot-studio/journey graph editor, or chart primitives), give it its own package (`packages/canvas`, `packages/charts`) rather than growing `ui` into a dumping ground — build these when that work actually starts, not speculatively.
5. **Every chart ships a screen-reader table fallback; every screen is keyboard-complete** — WCAG 2.2 AA is a CI-checked floor, not a nice-to-have (see `saqi-frontend-console`).

## Day-to-day

```bash
pnpm install          # once, from repo root
pnpm dev               # runs all apps' dev servers via turbo
pnpm --filter @saqi/console dev   # just the console, on :3001
pnpm --filter @saqi/website dev   # just the website, on :3000
pnpm lint / typecheck / build / test   # same pattern, all via turbo, cached per package
```

## Git workflow

- **Trunk-based, short-lived branches**: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- **Conventional Commits**, scoped to a module: `feat(campaigns): add audience live-estimate step`, `fix(ui): correct focus ring on Button`.
- Every change lands via PR; PRs touching the policy gate or send path get extra review (rare from this repo directly, but the console's campaign/consent screens call into that path).
- **CI gates** (`.github/workflows/ci.yml`, expanded over time per `saqi-github-publish`): lint, typecheck, build now; module-boundary lint, OpenAPI-client typecheck, route performance budgets, and the widget's <40KB bundle gate get added as those pieces come online. All are hard gates — nothing merges red.
- **Deploy is Git-driven**: merging to `main` is what ships, via CI. No hand-edited production assets, ever.

## Bringing in a Lovable / v0 / HTML export

Treat it as a **visual spec only**. Drop it in a scratch branch, then re-implement against this stack — map to shadcn + emerald tokens, split RSC vs client per the rendering table, wire data through `@saqi/api-client`, add the `@saqi/permissions` and `@saqi/i18n` wrappers — and land it through the normal PR + CI path. Don't ship the export's HTML/CSS directly; it has none of this repo's type-safety, permission or accessibility guarantees.

## Roadmap fence

This scaffold covers Phase 1 (`saqi-platform`): live chat, bots, campaigns, audiences, CRM integration surfaces. Journeys, email builders, and copilot analytics are Phase 2 — build behind the same package interfaces when that work is scoped, don't pull them in early.

**Out of scope entirely:** CPaaS / programmable messaging, and SMS as a channel. These are not Phase 2 either — don't add them to code, copy, or roadmap notes. See `CLAUDE.md` for the full scope note, including the SMS-only regimes (DLT, 10DLC) that go with it.
