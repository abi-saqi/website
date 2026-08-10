/**
 * Dashboard screens are RSC + stream: KPI tiles read pre-aggregated rows
 * server-side and stream in independently rather than shipping a query
 * to the client. See saqi-dashboard-analytics for the tile/table/chart specs.
 */
async function getKpis() {
  // Placeholder for a server-side call through @saqi/api-client once the
  // metrics module exists. Kept synchronous-shaped so swapping in a real
  // fetch later doesn't change the render shape below.
  return [
    { label: "Active conversations", value: "—" },
    { label: "Messages today", value: "—" },
    { label: "Campaigns running", value: "—" },
  ];
}

export default async function DashboardPage() {
  const kpis = await getKpis();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-fg">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded border border-border bg-surface p-4">
            <div className="text-sm text-fg-muted">{kpi.label}</div>
            <div className="mt-1 font-mono text-2xl tabular-nums text-fg">{kpi.value}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
