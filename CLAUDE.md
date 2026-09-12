@AGENTS.md

# saqi.ai — product scope

## CPaaS is NOT part of this build

saqi.ai does **not** ship a CPaaS (Communications-Platform-as-a-Service) offering.
Do not add it back to code, copy, diagrams, or roadmap notes — in this repo or any
other saqi.ai repo — and do not position the platform as replacing a customer's
CPaaS.

Concretely, treat these as **out of scope**:

- CPaaS / programmable-messaging APIs sold as a capability.
- **SMS as a channel** — it is not a supported channel anywhere in the product.
- SMS-only regulatory regimes that only exist because of A2P SMS:
  **DLT** (India, TRAI SMS header/template registration) and
  **10DLC** (US A2P SMS registration).

Still **in scope** (do not strip these by association):

- WhatsApp (Meta Cloud API, with a BSP as failover), RCS, Instagram/Facebook,
  website widget, voice/IVR, and ad channels including Click-to-WhatsApp.
- **TCPA** — it governs voice calls as well as texts, and voice is in scope.
- The public REST + GraphQL platform API and webhooks. These are integration
  surfaces for the product, not a CPaaS product.

The supported channel list has a single source of truth at
`apps/website/lib/channels.ts` — add or remove channels there, not ad hoc in
section components.
