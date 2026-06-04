import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://carboncash.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    {
      url: `${BASE_URL}/how-it-works`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE_URL}/projects`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${BASE_URL}/pricing`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE_URL}/cbam`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE_URL}/blog`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${BASE_URL}/about`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE_URL}/contact`,
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE_URL}/methodology`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE_URL}/calculator`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
  ];

  return staticRoutes.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
