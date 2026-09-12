import type { Metadata } from "next";
import { KeyRound, Webhook, AlertTriangle, Gauge } from "lucide-react";
import { ProductHero, ProductFooterNav } from "@/components/products/product-hero";
import { EndpointCard } from "@/components/products/endpoint-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Developers — events, contacts, and messaging APIs | saqi.ai",
  description:
    "REST endpoints for pushing events, upserting contacts, and sending messages, with the exact request and response bodies, webhook payloads, error shapes, and rate limits.",
};

const errors = [
  { code: "400", name: "invalid_request", when: "A field is missing or the wrong type. The body names the field." },
  { code: "401", name: "unauthenticated", when: "Missing, malformed, or revoked API key." },
  { code: "403", name: "policy_blocked", when: "The send was refused by the consent gate. The reason code says which rule." },
  { code: "409", name: "duplicate", when: "An idempotency key was reused with a different payload." },
  { code: "422", name: "unprocessable", when: "Valid JSON, but the template or channel rejected it — for example an unapproved template." },
  { code: "429", name: "rate_limited", when: "Too many requests. Retry after the seconds given in Retry-After." },
];

export default function DevelopersPage() {
  return (
    <>
      <ProductHero
        eyebrow="Developers"
        title={
          <>
            Push an event. Get back
            <br />
            exactly what happened to it.
          </>
        }
        lede="A small REST surface: send events from your stack, upsert contacts, trigger messages, and receive webhooks. Every response tells you what the policy gate decided, so a message that did not send is never a silent failure."
        proof={["REST + GraphQL", "OpenAPI 3.1 spec", "Idempotency keys", "Signed webhooks"]}
        secondary={{ href: "/use-cases", label: "See the event flow" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            align="left"
            eyebrow="Authentication"
            title="One bearer token, scoped per environment"
            description="Keys are issued per workspace and per environment. A live key never reaches sandbox data, and rotating a key takes effect immediately — no deploy on your side."
          />
          <Reveal delay={0.1} className="mt-8">
            <div className="glass min-w-0 overflow-hidden rounded-r">
              <div className="border-b border-border px-4 py-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                  Every request
                </span>
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-6 text-fg-muted">
                <code className="font-mono-tabular">{`Base URL   https://api.saqi.ai
Header     Authorization: Bearer sk_live_••••
Header     Idempotency-Key: <uuid>   # optional, on writes
Header     Content-Type: application/json`}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-elevated py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            align="left"
            eyebrow="Endpoints"
            title="The four calls most integrations need"
            description="Events drive journeys, contacts keep the profile current, and messages send directly when you want to own the timing yourself."
          />

          <div className="mt-10 flex flex-col gap-5">
            <EndpointCard
              method="POST"
              path="/v1/events"
              title="Send an event from your stack"
              description="Any third-party or first-party event — a Shopify cart, a CRM stage change, a support ticket, your own backend. The response lists the journeys it matched and what the policy gate decided."
              request={`{
  "type": "cart.abandoned",
  "profile": { "phone": "+919820098200" },
  "properties": {
    "cart_id": "cart_8812",
    "value": 12400,
    "currency": "INR",
    "items": 3
  }
}`}
              response={`201 Created

{
  "id": "evt_01JQ8W7K2M",
  "status": "accepted",
  "profile_id": "prf_7T2ZC9",
  "matched_journeys": [
    { "id": "jrn_cart_recovery", "action": "enqueued" }
  ],
  "policy": { "consent": "granted", "quiet_hours": false }
}`}
              note="Unknown event types are accepted and stored, so you can start emitting before the journey exists."
            />

            <EndpointCard
              method="POST"
              path="/v1/contacts"
              title="Create or update a contact"
              description="Upsert by phone, email, or external ID. Identity resolution merges the record with any anonymous activity already attached to that identifier."
              request={`{
  "external_id": "crm_44812",
  "phone": "+919820098200",
  "email": "r.iyer@vertex.example",
  "attributes": {
    "company": "Vertex Fintech",
    "plan": "enterprise",
    "owner": "priya.m"
  },
  "consent": { "marketing": "granted", "source": "web_form" }
}`}
              response={`200 OK

{
  "id": "prf_7T2ZC9",
  "merged_from": ["prf_anon_9KD2"],
  "attributes": {
    "company": "Vertex Fintech",
    "plan": "enterprise",
    "owner": "priya.m"
  },
  "consent": {
    "marketing": "granted",
    "updated_at": "2026-09-12T09:14:22Z"
  }
}`}
            />

            <EndpointCard
              method="POST"
              path="/v1/messages"
              title="Send a message"
              description="Send on a named channel with an approved template. The call is refused before dispatch if consent, frequency caps, quiet hours, or template approval do not clear."
              request={`{
  "channel": "whatsapp",
  "to": { "profile_id": "prf_7T2ZC9" },
  "template": {
    "name": "order_shipped_v3",
    "locale": "en-IN",
    "variables": ["Rahul", "#44812", "14 Sep"]
  }
}`}
              response={`202 Accepted

{
  "id": "msg_01JQ8WB4TZ",
  "status": "queued",
  "channel": "whatsapp",
  "policy": { "decision": "allow", "token": "pgt_01JQ8W..." },
  "estimated_cost": { "amount": 0.82, "currency": "INR" }
}`}
              note="A refusal returns 403 with a machine-readable reason — quiet_hours, frequency_cap, no_consent, suppressed, or template_unapproved."
            />

            <EndpointCard
              method="GET"
              path="/v1/contacts/{id}/timeline"
              title="Read a contact's full timeline"
              description="Every touch across every channel in one ordered list — what an agent sees when they open the profile, available to your own systems."
              request={`GET /v1/contacts/prf_7T2ZC9/timeline?limit=3
Authorization: Bearer sk_live_••••`}
              response={`200 OK

{
  "data": [
    { "at": "2026-09-12T09:14:22Z", "type": "message.inbound",
      "channel": "whatsapp", "preview": "Is it in stock?" },
    { "at": "2026-09-12T08:02:10Z", "type": "page.viewed",
      "url": "/pricing" },
    { "at": "2026-09-11T17:41:55Z", "type": "call.completed",
      "duration_s": 412, "sentiment": "positive" }
  ],
  "next_cursor": "cur_9KD2XQ"
}`}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            align="left"
            eyebrow="Webhooks"
            title="What we send back to you"
            description="Delivery receipts, inbound replies, and journey outcomes are posted to your endpoint. Every request carries a signature header — verify it before trusting the body."
          />
          <div className="mt-10">
            <EndpointCard
              method="POST"
              path="your-endpoint"
              title="Delivery and reply events"
              description="Sent with an HMAC-SHA256 signature over the raw body. We retry with exponential backoff for 24 hours until you return 2xx."
              request={`POST /webhooks/saqi
Saqi-Signature: t=1789012345,v1=4f8c2a...
Content-Type: application/json

{
  "id": "evh_01JQ8WD9PQ",
  "type": "message.delivered",
  "created_at": "2026-09-12T09:15:02Z",
  "data": {
    "message_id": "msg_01JQ8WB4TZ",
    "profile_id": "prf_7T2ZC9",
    "channel": "whatsapp"
  }
}`}
              response={`200 OK

// Return any 2xx within 5 seconds.
// Anything else is retried with backoff
// for 24 hours, then moved to the
// dead-letter queue shown in the console.`}
              note="Types: message.queued, message.sent, message.delivered, message.read, message.failed, message.inbound, journey.completed, consent.updated."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-elevated py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-2">
          <div className="min-w-0">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <AlertTriangle className="h-4 w-4" />
                Errors
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg">
                Every failure names itself
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-sm leading-6 text-fg-muted">
                Errors return a stable <code className="font-mono-tabular text-primary">code</code>{" "}
                you can branch on, never just a status.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                        Status
                      </th>
                      <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                        Code
                      </th>
                      <th className="py-2 text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                        When
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((e) => (
                      <tr key={e.code} className="border-b border-border align-top">
                        <td className="font-mono-tabular py-2.5 pr-4 font-semibold text-fg">
                          {e.code}
                        </td>
                        <td className="font-mono-tabular py-2.5 pr-4 text-primary">{e.name}</td>
                        <td className="py-2.5 text-xs leading-5 text-fg-muted">{e.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <Reveal>
              <div className="glass rounded-r p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                  <Gauge className="h-4 w-4" />
                </span>
                <h3 className="mt-3.5 text-base font-semibold text-fg">Rate limits</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">
                  600 requests per minute per workspace on reads, 300 on writes. Bulk sends go
                  through the dispatcher instead and are shaped per provider, so a large campaign
                  never starves transactional traffic.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass rounded-r p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-r-sm bg-[#3B82F6]/12 text-[#3B82F6]">
                  <KeyRound className="h-4 w-4" />
                </span>
                <h3 className="mt-3.5 text-base font-semibold text-fg">Idempotency</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">
                  Send an{" "}
                  <code className="font-mono-tabular text-primary">Idempotency-Key</code> on any
                  write and a retry returns the original result rather than creating a second
                  record. Keys are held for 24 hours.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="glass rounded-r p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-r-sm bg-[#F59E0B]/14 text-[#B45309]">
                  <Webhook className="h-4 w-4" />
                </span>
                <h3 className="mt-3.5 text-base font-semibold text-fg">Signature verification</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">
                  Compute HMAC-SHA256 over{" "}
                  <code className="font-mono-tabular text-primary">{"{t}.{raw_body}"}</code> with
                  your signing secret and compare in constant time. Reject anything older than five
                  minutes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProductFooterNav
        links={[
          {
            href: "/use-cases",
            label: "Use cases",
            desc: "Which third-party events map to which journeys and nudges.",
          },
          {
            href: "/products/marketing",
            label: "Marketing",
            desc: "Campaigns, nudges, and audiences built on these same events.",
          },
          {
            href: "/#trust",
            label: "Trust & compliance",
            desc: "Consent, residency, audit trail, and access control.",
          },
        ]}
      />

      <CTA />
    </>
  );
}
