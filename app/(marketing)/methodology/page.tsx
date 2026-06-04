import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How CarbonCash sources, verifies, sells, and retires carbon credits — and the emission factors behind the footprint calculator.",
};

const emissionSources = [
  {
    activity: "Grid electricity",
    factor: "0.716 tCO₂e / MWh",
    source: "Central Electricity Authority (CEA) CO₂ Baseline Database, FY 2023-24",
    url: "https://cea.nic.in",
  },
  {
    activity: "Diesel combustion",
    factor: "2.68 kgCO₂e / litre",
    source: "IPCC 2006 Guidelines, Vol. 2, Ch. 2",
    url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
  },
  {
    activity: "LPG combustion",
    factor: "2.983 kgCO₂e / kg",
    source: "IPCC 2006 Guidelines, Vol. 2, Ch. 2",
    url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
  },
  {
    activity: "Natural gas",
    factor: "2.02 kgCO₂e / m³",
    source: "IPCC 2006 Guidelines, Vol. 2, Ch. 2",
    url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
  },
  {
    activity: "Air travel (economy)",
    factor: "0.133 kgCO₂e / passenger-km",
    source: "DEFRA/BEIS 2023 Conversion Factors (incl. RFI)",
    url: "https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting",
  },
  {
    activity: "Hotel stays",
    factor: "31.7 kgCO₂e / night",
    source: "DEFRA/BEIS 2023 Conversion Factors",
    url: "https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting",
  },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Methodology
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-10">
          How we work.
        </h1>

        <div className="space-y-12">
          {/* Calculator */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Footprint calculator
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The calculator covers Scope 1 (direct combustion and own fleet),
                Scope 2 (purchased electricity), and basic Scope 3 (air travel,
                hotels, third-party logistics, packaging, and cloud spend). It
                does not yet cover full Scope 3 supply-chain emissions.
              </p>
              <p>
                All emission factors used in the calculator are listed below,
                with links to the source documents. When a user completes a
                calculation, the emission factors used at that point in time are
                saved alongside the result — so a future update to our factors
                does not retroactively change a finalised footprint.
              </p>
              <p>
                The calculator is a screening-level tool, not an ISO 14064-3
                verified assessment. It is appropriate for voluntary offsetting,
                CBAM preliminary estimates, and supplier reporting. For
                mandatory regulatory submissions or third-party verification,
                engage an accredited GHG verifier.
              </p>
            </div>
          </section>

          {/* Emission factor table */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Emission factors used
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">
                      Activity
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">
                      Factor
                    </th>
                    <th className="text-left py-3 font-semibold text-foreground">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emissionSources.map((row) => (
                    <tr
                      key={row.activity}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-3 pr-4 text-foreground">{row.activity}</td>
                      <td className="py-3 pr-4 font-mono text-sm text-foreground">
                        {row.factor}
                      </td>
                      <td className="py-3">
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        >
                          {row.source}
                          <ExternalLink size={12} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Project selection */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Project selection
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We list only projects that are registered with Verra (VCS), Gold
                Standard, or Puro.earth. We review each project's methodology
                document, validation report, and monitoring report before
                listing. We do not list projects that have unresolved regulatory
                flags or pending complaints on their registry pages.
              </p>
              <p>
                We check available volume against the registry record before
                listing. Credits are not sold if we cannot confirm availability.
              </p>
            </div>
          </section>

          {/* Retirement */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Retirement process
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                When payment is confirmed, the order is flagged for retirement.
                Our team retires the credits on the registry within 2 business
                days and updates the certificate with the registry serial
                numbers. Until serial numbers are populated, the certificate
                shows "retirement pending."
              </p>
              <p>
                Retired credits are permanently cancelled — they cannot be
                resold. The retirement record on the registry is the primary
                record of authenticity; the CarbonCash certificate links to it.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Questions about our methodology?{" "}
            <Link
              href="/contact"
              className="text-foreground underline underline-offset-2"
            >
              Write to us.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
