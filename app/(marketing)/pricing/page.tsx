import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "CarbonCash pricing — pay only for the credits you retire. No subscription, no hidden fees. GST-inclusive invoicing.",
};

const tiers = [
  {
    name: "Self-serve",
    audience: "D2C brands & SMEs",
    price: null,
    priceNote: "Pay per tCO₂e retired",
    description:
      "Calculate your footprint, buy from the catalogue, and get your certificate. No annual contract.",
    features: [
      "Footprint calculator (Scope 1, 2, 3 basic)",
      "Access to full project catalogue",
      "Retirement certificate with public verification URL",
      "Public neutrality page (carboncash.in/b/your-brand)",
      "Embeddable badge",
      "GST-compliant invoice",
      "Email support",
    ],
    cta: "Start calculating",
    ctaHref: "/calculator",
    highlight: false,
  },
  {
    name: "CBAM",
    audience: "Indian exporters to the EU",
    price: "₹4,999",
    priceNote: "per month",
    description:
      "Everything in Self-serve, plus the CBAM reporting workspace — per-shipment records, energy mix tracking, and quarterly Excel exports in EU format.",
    features: [
      "Everything in Self-serve",
      "CBAM per-shipment data capture",
      "CN code lookup",
      "EU CBAM quarterly report export (Excel)",
      "Document storage per shipment",
      "Priority email support",
    ],
    cta: "Talk to us",
    ctaHref: "/contact",
    highlight: true,
  },
];

const faq = [
  {
    q: "How is the credit price set?",
    a: "Project prices are set by the project developers and registry standards. CarbonCash charges a platform fee included in the listed price — there are no additional charges at checkout. The price per tCO₂e varies by project type, vintage, and verifier.",
  },
  {
    q: "Is GST charged on carbon credits?",
    a: "Yes. Carbon offset services attract 18% GST (SAC code 999713). Your invoice will show the base amount and GST separately. GSTIN holders can claim input tax credit.",
  },
  {
    q: "What if I want to offset more than ₹50,000 worth of credits at once?",
    a: "Transactions above ₹50,000 require a KYC step — we'll collect your PAN or GSTIN during checkout. This is a regulatory requirement, not an additional barrier.",
  },
  {
    q: "Can I offset on behalf of a client?",
    a: "Yes. During checkout, you can set the certificate beneficiary name to your client's business. The certificate and public verification page will show their name.",
  },
  {
    q: "How long does the registry retirement take?",
    a: "Retirement is actioned within 2 business days of payment. You'll receive the certificate with registry serial numbers by email once complete.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Pricing
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
          Straightforward pricing.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Pay for the credits you retire. Credit prices vary by project — listed
          transparently on each project page.
        </p>
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mb-20">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-lg border p-8 flex flex-col gap-6 ${
              tier.highlight
                ? "border-primary bg-foreground text-background"
                : "border-border bg-card"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className={`font-heading text-2xl font-semibold ${
                    tier.highlight ? "text-background" : "text-foreground"
                  }`}
                >
                  {tier.name}
                </h2>
                {tier.highlight && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    CBAM
                  </Badge>
                )}
              </div>
              <p
                className={`text-sm ${
                  tier.highlight ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                {tier.audience}
              </p>
            </div>

            <div>
              {tier.price ? (
                <>
                  <span
                    className={`font-heading text-4xl font-semibold ${
                      tier.highlight ? "text-background" : "text-foreground"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm ml-2 ${
                      tier.highlight
                        ? "text-background/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tier.priceNote}
                  </span>
                </>
              ) : (
                <p
                  className={`text-sm font-medium ${
                    tier.highlight ? "text-background/80" : "text-foreground"
                  }`}
                >
                  {tier.priceNote}
                </p>
              )}
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  tier.highlight ? "text-background/70" : "text-muted-foreground"
                }`}
              >
                {tier.description}
              </p>
            </div>

            <ul className="space-y-3 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${
                      tier.highlight ? "text-primary" : "text-primary"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      tier.highlight ? "text-background/80" : "text-foreground"
                    }`}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              variant={tier.highlight ? "default" : "outline"}
              className={
                tier.highlight
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }
              asChild
            >
              <Link href={tier.ctaHref}>
                {tier.cta}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-8">
          {faq.map((item) => (
            <div key={item.q} className="border-b border-border pb-8 last:border-0">
              <h3 className="font-medium text-foreground mb-3">{item.q}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
