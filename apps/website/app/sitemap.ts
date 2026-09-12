import type { MetadataRoute } from "next";

const BASE = "https://saqi.ai";

// Required under `output: "export"` — without it Next treats the metadata
// route as dynamic and the static export fails to collect it.
export const dynamic = "force-static";

// Fixed rather than `new Date()` so successive builds of the same commit
// produce an identical sitemap instead of churning lastmod on every deploy.
const LAST_MODIFIED = "2026-08-12";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products/sales",
    "/products/marketing",
    "/how-it-works",
    "/use-cases",
    "/developers",
  ];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
