import { Button } from "@saqi/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-24">
      <h1 className="text-4xl font-semibold text-fg">saqi.ai</h1>
      <p className="text-fg-muted">
        One customer profile. One consent model. One place the AI can reason about the customer.
      </p>
      <div>
        <Button>Get started</Button>
      </div>
    </main>
  );
}
