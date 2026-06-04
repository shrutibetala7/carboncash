"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, RefreshCcw, Info } from "lucide-react";
import { type CalculatorResult as TResult, CALCULATOR_RESULT_KEY } from "@/types/calculator";
import { formatTco2e } from "@/lib/utils";

// Sector benchmark data (tCO2e/employee, illustrative — replace with real data)
const SECTOR_BENCHMARKS: Record<string, { label: string; avg: number }> = {
  MANUFACTURING: { label: "Manufacturing", avg: 12 },
  RETAIL: { label: "Retail / E-commerce", avg: 4 },
  FOOD_BEVERAGE: { label: "Food & Beverage", avg: 8 },
  TEXTILE: { label: "Textile", avg: 10 },
  LOGISTICS: { label: "Logistics", avg: 18 },
  IT_SERVICES: { label: "IT Services", avg: 3 },
  OTHER: { label: "Average business", avg: 6 },
};

const SIZE_EMPLOYEES: Record<string, number> = {
  MICRO: 5,
  SMALL: 30,
  MEDIUM: 150,
  LARGE: 500,
};

// Chart colour sequence — terracotta-to-ochre editorial palette
const BAR_COLORS = [
  "oklch(0.56 0.14 38)",
  "oklch(0.62 0.12 48)",
  "oklch(0.68 0.10 58)",
  "oklch(0.72 0.08 70)",
  "oklch(0.76 0.06 80)",
  "oklch(0.78 0.05 90)",
  "oklch(0.80 0.04 100)",
  "oklch(0.82 0.03 110)",
];

function EmailGate({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // In production: POST /api/calculator/report { email }
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onSubmit(email);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Get the full report
          </DialogTitle>
          <DialogDescription>
            We'll email you a branded PDF with your full breakdown, emission
            factor sources, and a recommended offset plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="email-gate">Work email</Label>
            <Input
              id="email-gate"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Email me the report"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            No marketing emails. Just the PDF.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function CalculatorResult() {
  const router = useRouter();
  const [result, setResult] = useState<TResult | null>(null);
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CALCULATOR_RESULT_KEY);
      if (!raw) {
        router.replace("/calculator");
        return;
      }
      setResult(JSON.parse(raw));
    } catch {
      router.replace("/calculator");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-muted-foreground">Loading your result…</p>
      </div>
    );
  }

  const { grandTotal, scope1Total, scope2Total, scope3Total, breakdown, data } = result;

  // Benchmark comparison
  const benchmark = SECTOR_BENCHMARKS[data.sector] ?? SECTOR_BENCHMARKS.OTHER;
  const employeeCount = SIZE_EMPLOYEES[data.size] ?? 10;
  const perEmployee = grandTotal / employeeCount;
  const benchmarkComparison =
    perEmployee < benchmark.avg
      ? "below"
      : perEmployee > benchmark.avg * 1.5
      ? "above"
      : "around";

  const chartData = breakdown
    .map((b, i) => ({
      name: b.label,
      value: parseFloat(b.value.toFixed(2)),
      scope: b.scope,
      color: BAR_COLORS[i % BAR_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        {/* Hero number */}
        <div className="mb-12 border-b border-border pb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            {data.businessName || "Your business"} · Estimated annual footprint
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <p className="font-heading text-7xl md:text-8xl font-semibold text-foreground leading-none">
              {grandTotal.toFixed(1)}
            </p>
            <p className="font-heading text-2xl text-muted-foreground pb-3">
              tCO₂e / year
            </p>
          </div>

          {/* Scope breakdown row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Scope 1 — Direct", value: scope1Total, desc: "Fuel & fleet" },
              { label: "Scope 2 — Electricity", value: scope2Total, desc: "Grid power" },
              { label: "Scope 3 — Value chain", value: scope3Total, desc: "Travel, logistics, packaging" },
            ].map((s) => (
              <div key={s.label} className="border border-border rounded p-4">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="font-heading text-2xl font-semibold text-foreground">
                  {s.value.toFixed(1)}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    tCO₂e
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Breakdown by source
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    unit=" t"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [`${Number(value).toFixed(2)} tCO₂e`, ""]}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 2, 2, 0]} maxBarSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Benchmark */}
        <div className="mb-12 border border-border rounded-lg p-6 bg-secondary/30">
          <div className="flex items-start gap-2 mb-3">
            <Info size={14} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm font-medium text-foreground">
              Sector benchmark
            </p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            At{" "}
            <strong className="text-foreground">
              {perEmployee.toFixed(1)} tCO₂e per employee
            </strong>
            , your footprint is{" "}
            <strong className="text-foreground">{benchmarkComparison}</strong>{" "}
            the indicative average for {benchmark.label} businesses (
            {benchmark.avg} tCO₂e/employee). Benchmark data is indicative and
            based on published sector averages — not a certified comparison.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button size="lg" asChild className="flex-1">
            <Link href="/signup">
              Offset {formatTco2e(grandTotal)} now
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => setEmailGateOpen(true)}
            disabled={emailSubmitted}
          >
            <Download size={16} />
            {emailSubmitted ? "Report sent to your inbox" : "Download PDF report"}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            onClick={() => router.push("/calculator")}
          >
            <RefreshCcw size={14} />
            Recalculate
          </Button>
          <Badge variant="secondary" className="text-xs">
            Calculated{" "}
            {new Date(result.calculatedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Badge>
        </div>

        {/* Methodology note */}
        <p className="mt-8 text-xs text-muted-foreground border-t border-border pt-6 leading-relaxed">
          This is a screening-level estimate. Emission factors: CEA FY 2023-24
          (grid), IPCC 2006 Guidelines (combustion), DEFRA/BEIS 2023 (travel).{" "}
          <Link
            href="/methodology"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Full methodology →
          </Link>
        </p>
      </div>

      <EmailGate
        open={emailGateOpen}
        onClose={() => setEmailGateOpen(false)}
        onSubmit={() => {
          setEmailGateOpen(false);
          setEmailSubmitted(true);
        }}
      />
    </>
  );
}
