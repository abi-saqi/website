import type { MetadataRoute } from "next";

const BASE = "https://saqi.ai";

// Required under `output: "export"` — without it Next treats the metadata
// route as dynamic and the static export fails to collect it.
export const dynamic = "force-static";

// Fixed rather than `new Date()` so successive builds of the same commit
// produce an identical sitemap instead of churning lastmod on every deploy.
const LAST_MODIFIED = "2026-08-12";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/use-cases`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
