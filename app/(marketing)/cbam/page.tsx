import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, Ship, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CBAM Reporting for Indian Exporters",
  description:
    "CarbonCash helps Indian exporters to the EU capture per-shipment emissions, track energy mix, and generate EU-compliant CBAM quarterly reports.",
};

const features = [
  {
    icon: Ship,
    title: "Per-shipment records",
    description:
      "Capture product CN codes, production volumes, energy mix, and direct and indirect emissions for each shipment. Records are saved and editable.",
  },
  {
    icon: Zap,
    title: "Guided data capture",
    description:
      "Dropdown-led forms with CN code lookup and pre-populated defaults for common Indian energy mixes. No CBAM jargon needed to get started.",
  },
  {
    icon: FileSpreadsheet,
    title: "EU-format Excel export",
    description:
      "Generate your quarterly CBAM report in the EU's official template format with one click. Upload directly to the CBAM Transitional Registry.",
  },
];

const sectors = [
  { name: "Steel & Iron", cnPrefix: "72" },
  { name: "Aluminium", cnPrefix: "76" },
  { name: "Cement", cnPrefix: "2523" },
  { name: "Fertilisers", cnPrefix: "31" },
  { name: "Electricity", cnPrefix: "2716" },
  { name: "Hydrogen", cnPrefix: "2804" },
];

export default function CbamPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-3xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Carbon Border Adjustment Mechanism
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
          CBAM reporting
          <br />
          for Indian exporters.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Since October 2023, Indian businesses exporting certain goods to the
          EU must report the embedded carbon emissions of their products. From
          2026, they'll pay for those emissions. CarbonCash handles the
          reporting — starting now.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">
              Start CBAM reporting
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Talk to us first</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-10 mb-20 border-t border-border pt-16">
        {features.map((f) => (
          <div key={f.title}>
            <f.icon size={24} className="text-primary mb-4" />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {f.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* In-scope sectors */}
      <div className="mb-20">
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-8">
          Sectors currently in scope
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sectors.map((s) => (
            <div
              key={s.name}
              className="border border-border rounded px-5 py-4 bg-card"
            >
              <p className="font-medium text-foreground text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                CN chapter {s.cnPrefix}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          The CBAM sector scope may expand. Electricity and hydrogen from India
          are currently limited by EU import rules.
        </p>
      </div>

      {/* Timeline */}
      <div className="border-t border-border pt-16 mb-16">
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-10">
          The CBAM timeline
        </h2>
        <div className="space-y-6 max-w-2xl">
          {[
            {
              date: "Oct 2023 – Dec 2025",
              label: "Transitional period",
              note: "Reporting required, no payments. Quarterly reports to the EU.",
            },
            {
              date: "Jan 2026",
              label: "Full implementation",
              note: "CBAM certificates required. Importers pay the carbon price differential.",
            },
            {
              date: "From 2026",
              label: "Annual declarations",
              note: "EU importers file annual declarations; demand for verified embedded-carbon data from Indian suppliers increases.",
            },
          ].map((item) => (
            <div
              key={item.date}
              className="flex gap-6 border-b border-border pb-6 last:border-0"
            >
              <p className="text-sm font-medium text-primary shrink-0 w-36">
                {item.date}
              </p>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link href="/signup">
            Get started
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/pricing">See CBAM plan pricing</Link>
        </Button>
      </div>
    </div>
  );
}
