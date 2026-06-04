import type { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the CarbonCash team — for enterprise enquiries, CBAM consulting, project partnerships, or press.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Contact
          </p>
          <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground mb-6">
            Get in touch.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            For most questions — how the calculator works, what's included in
            the CBAM plan, which projects are coming — the answers are in the
            docs or elsewhere on this site. If they're not, write to us.
          </p>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-foreground">Enterprise & CBAM</p>
              <p className="text-muted-foreground">
                For teams needing custom onboarding or volume pricing.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Project partnerships</p>
              <p className="text-muted-foreground">
                For project developers and registry-accredited verifiers.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Press</p>
              <a
                href="mailto:press@carboncash.in"
                className="text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
              >
                press@carboncash.in
              </a>
            </div>
          </div>
        </div>

        {/* Form — handled by a server action in next iteration */}
        <form className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Priya Sharma" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Exports Pvt Ltd"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="priya@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select name="topic">
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbam">CBAM reporting</SelectItem>
                <SelectItem value="enterprise">Enterprise pricing</SelectItem>
                <SelectItem value="project">Project partnership</SelectItem>
                <SelectItem value="press">Press enquiry</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="What would you like to discuss?"
              rows={5}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send message
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We'll respond within 1 business day.
          </p>
        </form>
      </div>
    </div>
  );
}
