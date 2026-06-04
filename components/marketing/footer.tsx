import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Platform: [
    { href: "/calculator", label: "Carbon Calculator" },
    { href: "/projects", label: "Offset Projects" },
    { href: "/pricing", label: "Pricing" },
    { href: "/cbam", label: "CBAM Reporting" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/methodology", label: "Methodology" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/refunds", label: "Refund Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-heading text-lg font-semibold text-foreground"
            >
              CarbonCash
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Verified carbon offsets for Indian businesses. Measure your
              footprint, retire credits, prove it publicly.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CarbonCash. All rights reserved.</p>
          <p>
            Credits verified by{" "}
            <a
              href="https://verra.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Verra
            </a>{" "}
            &{" "}
            <a
              href="https://www.goldstandard.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Gold Standard
            </a>
            .{" "}
            <Link
              href="/methodology"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Our methodology →
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
