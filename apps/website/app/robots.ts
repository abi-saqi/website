import type { MetadataRoute } from "next";

// Required under `output: "export"` — see app/sitemap.ts.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://saqi.ai/sitemap.xml",
  };
}
