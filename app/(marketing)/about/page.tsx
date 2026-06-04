import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About CarbonCash",
  description:
    "CarbonCash is a voluntary carbon platform for Indian businesses — built to make verified offsets accessible, transparent, and worth trusting.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          About
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-10">
          We built the platform
          <br />
          we couldn't find.
        </h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Indian SMEs and D2C brands are under growing pressure — from
            enterprise customers, from regulation, from their own customers — to
            account for their carbon footprint. Most carbon platforms were built
            for European corporates with large sustainability teams and annual
            budgets.
          </p>
          <p>
            CarbonCash is built for the business owner who needs to file a
            carbon report for a Tata or Reliance supplier audit, or who wants to
            put "carbon neutral" on their packaging without it being
            meaningless. That means Indian emission factors, INR pricing, GST
            invoicing, and a verification flow that holds up.
          </p>
          <p>
            We source credits from projects we have reviewed ourselves — on
            site, not just from a prospectus. Every project links to its
            registry record. Every retirement certificate links to a public
            verification page. We're not trying to make sustainability easy to
            fake; we're trying to make it easy to do properly.
          </p>
        </div>

        <div className="mt-14 border-t border-border pt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              label: "Founded",
              value: "2024",
            },
            {
              label: "Headquarters",
              value: "Bengaluru, India",
            },
            {
              label: "Registry partners",
              value: "Verra, Gold Standard, Puro",
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {item.label}
              </p>
              <p className="text-foreground font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/calculator">
              Calculate your footprint
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
