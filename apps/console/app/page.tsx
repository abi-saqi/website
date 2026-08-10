import Link from "next/link";

export default function ConsoleHome() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold text-fg">Console</h1>
      <p className="mt-2 text-fg-muted">
        <Link href="/dashboard" className="text-primary underline">
          Go to dashboard
        </Link>
      </p>
    </main>
  );
}
