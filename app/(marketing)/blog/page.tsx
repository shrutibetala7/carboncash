import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on carbon credits, CBAM, Indian emission factors, and sustainability for Indian businesses.",
};

// Placeholder posts — replaced by DB/MDX fetch post-launch
const posts = [
  {
    slug: "cea-2024-grid-emission-factor",
    title: "CEA releases updated CO₂ baseline: what it means for your footprint",
    excerpt:
      "The Central Electricity Authority published the FY 2023-24 CO₂ baseline at 0.716 tCO₂e/MWh. Here's how the number changed, why it matters for Scope 2 calculations, and what to use until the FY 2024-25 update.",
    tag: "Emission Factors",
    readMinutes: 5,
    date: "2025-11-18",
    author: "CarbonCash",
  },
  {
    slug: "cbam-india-exporters-guide",
    title: "CBAM: a plain-language guide for Indian steel and aluminium exporters",
    excerpt:
      "The EU's Carbon Border Adjustment Mechanism is live in its transitional phase. If you export steel, aluminium, cement, or fertilisers to Europe, here is exactly what you need to report and by when.",
    tag: "CBAM",
    readMinutes: 8,
    date: "2025-10-03",
    author: "CarbonCash",
  },
  {
    slug: "verra-vs-gold-standard",
    title: "Verra VCS vs. Gold Standard: which registry matters for Indian buyers?",
    excerpt:
      "Both are credible. They differ in focus, methodology breadth, and co-benefit requirements. Here's what to look for when choosing a project, and why the registry is only one part of the quality story.",
    tag: "Carbon Markets",
    readMinutes: 6,
    date: "2025-09-15",
    author: "CarbonCash",
  },
  {
    slug: "biochar-carbon-permanence",
    title: "Why biochar credits are priced higher — and whether they're worth it",
    excerpt:
      "Biochar permanently sequesters carbon for hundreds of years. It's also more expensive per tCO₂e than nature-based credits. We break down the permanence argument and when it matters for your offset strategy.",
    tag: "Project Types",
    readMinutes: 7,
    date: "2025-08-22",
    author: "CarbonCash",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Writing
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Practical writing on carbon markets, CBAM, and Indian emission
          factors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 border-b border-border pb-8"
          >
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {post.tag}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {post.readMinutes} min read
              </span>
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
