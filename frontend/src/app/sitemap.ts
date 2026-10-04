import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  return ["", "features", "crm", "smart", "demo", "pricing", "faq", "contact", "company", "details"].map(path => ({ url: new URL(path, `${origin.replace(/\/$/, "")}/`).toString(), changeFrequency: "monthly", priority: path ? 0.7 : 1 }));
}
