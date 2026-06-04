import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, BarChart3, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CarbonCash — Measure, Offset, Prove",
  description:
    "CarbonCash helps Indian businesses measure their carbon footprint, offset it through verified projects, and prove it publicly.",
};

const stats = [
  { value: "50,000+", label: "tCO₂e retired" },
  { value: "12", label: "Verified projects" },
  { value: "340+", label: "Businesses offset" },
];

const features = [
  {
    icon: BarChart3,
    title: "Measure",
    description:
      "A multi-step calculator built on Indian emission factors from CEA and IPCC. Scope 1, 2, and basic Scope 3 — completed in under 10 minutes.",
  },
  {
    icon: Shield,
    title: "Offset",
    description:
      "Browse a curated catalogue of verified projects — biochar, agroforestry, biogas, and more. Each credit links to its registry record and verifier.",
  },
  {
    icon: Award,
    title: "Prove",
    description:
      "Every retirement generates a certificate with a unique ID and a public verification URL. Share it. Embed it. It holds up to scrutiny.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Carbon neutrality for Indian businesses
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground">
              Measure your footprint.
              <br />
              <span className="text-primary">Offset it for real.</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              From your electricity bill to your last shipment — CarbonCash
              calculates, offsets, and publicly certifies your business's carbon
              neutrality. No green-washing. No fine print.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/calculator">
                  Calculate your footprint
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">See the projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Three steps. One certificate.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for Indian SMEs, D2C brands, and CBAM exporters. No
              consultants. No enterprise contracts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div key={f.title}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-heading text-5xl font-semibold text-primary/20 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <f.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CBAM callout */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                For Indian exporters to the EU
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight">
                CBAM reporting without the complexity.
              </h2>
              <p className="mt-4 text-background/70 leading-relaxed">
                Capture per-shipment emissions, track your energy mix, and
                export quarterly reports in the EU CBAM format — all from your
                CarbonCash dashboard.
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-background/30 text-background hover:bg-background/10 shrink-0"
              asChild
            >
              <Link href="/cbam">
                Learn about CBAM
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-12">
            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground">
              Transparency is the product.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every credit you buy is linked to a registry record, a methodology
              document, and an accredited verifier. Every retirement generates a
              certificate that anyone can verify — no login required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/signup">
                Get started free
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/methodology">Read our methodology →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
