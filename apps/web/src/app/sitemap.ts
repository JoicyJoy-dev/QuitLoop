import type { MetadataRoute } from "next";
import { publicRoutes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date("2026-09-16"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
