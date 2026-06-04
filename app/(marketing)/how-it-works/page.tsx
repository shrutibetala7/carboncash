import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See exactly how CarbonCash measures your footprint, sources verified credits, and issues public retirement certificates.",
};

const steps = [
  {
    number: "01",
    title: "Calculate your footprint",
    description:
      "Answer 6 short sections covering energy, transport, travel, and materials. We use Indian emission factors — CEA's CO2 baseline for grid electricity, IPCC defaults for fuel combustion. The source behind every number is visible, so you're not trusting a black box.",
    detail:
      "Output: your total tCO₂e for the year, broken down by scope and category.",
  },
  {
    number: "02",
    title: "Choose your offset projects",
    description:
      "Browse a curated catalogue of verified projects across India and beyond. Filter by project type, location, price, and vintage. Every project links to its Verra or Gold Standard registry record — check the original, not our summary.",
    detail: "Output: a cart of credits matching your footprint.",
  },
  {
    number: "03",
    title: "Pay and retire",
    description:
      "Checkout via Razorpay — UPI, cards, or netbanking. A GST-compliant invoice is generated automatically. Credits are marked for retirement; our team actions the real registry retirement within 2 business days.",
    detail: "Output: a payment receipt and a retirement confirmation email.",
  },
  {
    number: "04",
    title: "Get your certificate",
    description:
      "A PDF retirement certificate is generated with a unique certificate ID, the project details, registry serial numbers, and a QR code. Anyone can scan the QR to verify the retirement on a public CarbonCash page — no login required.",
    detail: "Output: a certificate PDF and a public verification URL.",
  },
  {
    number: "05",
    title: "Prove it publicly",
    description:
      "Your public neutrality page at carboncash.in/b/your-brand shows your footprint, offset portfolio, and certificates. Embed a lightweight badge on your own website that says 'Carbon Neutral — Verified by CarbonCash'.",
    detail: "Output: a public page and an embeddable JavaScript badge.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          The process
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
          How it works
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          From first login to a verified certificate — the whole process takes
          under an hour.
        </p>
      </div>

      <ol className="relative space-y-0">
        {steps.map((step, i) => (
          <li
            key={step.number}
            className="relative grid md:grid-cols-[80px_1fr] gap-6 md:gap-12 pb-16 last:pb-0"
          >
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute left-[38px] top-12 bottom-0 w-px bg-border" />
            )}

            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
              <span className="font-heading text-4xl font-semibold text-primary/30 leading-none">
                {step.number}
              </span>
            </div>

            <div className="pt-1">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {step.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>
              <p className="text-sm font-medium text-foreground bg-secondary/50 rounded px-4 py-3 border border-border">
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 pt-16 border-t border-border flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link href="/calculator">
            Start calculating
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/methodology">Read our methodology</Link>
        </Button>
      </div>
    </div>
  );
}
