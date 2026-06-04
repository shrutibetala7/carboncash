"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  calcScope1,
  calcScope2,
  calcScope3,
  EMISSION_FACTORS,
} from "@/lib/emission-factors/india";
import {
  type CalculatorData,
  type CalculatorResult,
  CALCULATOR_STORAGE_KEY,
  CALCULATOR_RESULT_KEY,
  EMPTY_CALCULATOR_DATA,
  SECTOR_OPTIONS,
  SIZE_OPTIONS,
} from "@/types/calculator";
import { ArrowRight, ArrowLeft, Info, Save } from "lucide-react";

const STEPS = [
  "Business",
  "Energy",
  "Transport",
  "Travel",
  "Materials",
  "Digital",
  "Review",
];

// ─── Field helper ────────────────────────────────────────────────────

function FieldRow({
  label,
  hint,
  unit,
  factorNote,
  children,
}: {
  label: string;
  hint?: string;
  unit?: string;
  factorNote?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Label className="text-sm font-medium text-foreground">{label}</Label>
          {hint && (
            <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
          )}
        </div>
        {unit && (
          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
            {unit}
          </span>
        )}
      </div>
      {children}
      {factorNote && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded px-3 py-2">
          <Info size={12} className="mt-0.5 shrink-0 text-primary" />
          <span>{factorNote}</span>
        </div>
      )}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  min = 0,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  min?: number;
}) {
  return (
    <Input
      type="number"
      min={min}
      step="any"
      value={value === 0 ? "" : value}
      placeholder={placeholder ?? "0"}
      onChange={(e) =>
        onChange(e.target.value === "" ? 0 : parseFloat(e.target.value) || 0)
      }
    />
  );
}

// ─── Steps ───────────────────────────────────────────────────────────

function Step1({
  data,
  update,
}: {
  data: CalculatorData;
  update: (k: keyof CalculatorData, v: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldRow label="Business name" hint="How it'll appear on your certificate.">
        <Input
          value={data.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          placeholder="Acme Pvt Ltd"
        />
      </FieldRow>
      <FieldRow label="Sector">
        <Select
          value={data.sector}
          onValueChange={(v) => update("sector", v ?? "")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your primary sector" />
          </SelectTrigger>
          <SelectContent>
            {SECTOR_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>
      <FieldRow label="Business size">
        <Select value={data.size} onValueChange={(v) => update("size", v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Select headcount range" />
          </SelectTrigger>
          <SelectContent>
            {SIZE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>
      <FieldRow label="Country / state" hint="Used for jurisdiction-specific factors.">
        <Input
          value={data.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="India"
        />
      </FieldRow>
    </div>
  );
}

function Step2({
  data,
  update,
}: {
  data: CalculatorData;
  update: (k: keyof CalculatorData, v: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldRow
        label="Grid electricity"
        hint="Total units consumed in the past 12 months. Check your electricity bills."
        unit="kWh / year"
        factorNote={`Using CEA FY 2023-24 grid emission factor: ${EMISSION_FACTORS.gridElectricity.factor} tCO₂e/MWh. Source: ${EMISSION_FACTORS.gridElectricity.source}.`}
      >
        <NumberInput
          value={data.gridKwh}
          onChange={(v) => update("gridKwh", v)}
          placeholder="e.g. 48000"
        />
      </FieldRow>
      <FieldRow
        label="Diesel (generators, boilers, on-site machinery)"
        unit="litres / year"
        factorNote={`IPCC factor: ${EMISSION_FACTORS.diesel.factor} ${EMISSION_FACTORS.diesel.unit}.`}
      >
        <NumberInput
          value={data.dieselLitres}
          onChange={(v) => update("dieselLitres", v)}
          placeholder="e.g. 2000"
        />
      </FieldRow>
      <FieldRow
        label="LPG (cooking, heating)"
        unit="kg / year"
        factorNote={`IPCC factor: ${EMISSION_FACTORS.lpg.factor} ${EMISSION_FACTORS.lpg.unit}.`}
      >
        <NumberInput
          value={data.lpgKg}
          onChange={(v) => update("lpgKg", v)}
          placeholder="e.g. 500"
        />
      </FieldRow>
      <FieldRow
        label="Piped natural gas"
        unit="m³ / year"
        factorNote={`IPCC factor: ${EMISSION_FACTORS.naturalGas.factor} ${EMISSION_FACTORS.naturalGas.unit}.`}
      >
        <NumberInput
          value={data.ngCubicMetres}
          onChange={(v) => update("ngCubicMetres", v)}
          placeholder="e.g. 1200"
        />
      </FieldRow>
    </div>
  );
}

function Step3({
  data,
  update,
}: {
  data: CalculatorData;
  update: (k: keyof CalculatorData, v: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldRow
        label="Own fleet distance"
        hint="Total km driven by company-owned or leased vehicles in the past 12 months."
        unit="km / year"
        factorNote={`IPCC default for diesel HGV: ${EMISSION_FACTORS.ownFleet.factor} tCO₂e/km.`}
      >
        <NumberInput
          value={data.ownFleetKm}
          onChange={(v) => update("ownFleetKm", v)}
          placeholder="e.g. 80000"
        />
      </FieldRow>
      <FieldRow
        label="Third-party logistics"
        hint="Approximate km shipped via courier, freight, or 3PL partners."
        unit="tonne-km / year"
        factorNote={`MoRTH / IPCC road freight factor: ${EMISSION_FACTORS.thirdPartyShipping.factor} tCO₂e/tonne-km.`}
      >
        <NumberInput
          value={data.thirdPartyShipKm}
          onChange={(v) => update("thirdPartyShipKm", v)}
          placeholder="e.g. 500000"
        />
      </FieldRow>
    </div>
  );
}

function Step4({
  data,
  update,
}: {
  data: CalculatorData;
  update: (k: keyof CalculatorData, v: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldRow
        label="Air travel"
        hint="Total passenger-km flown by all employees in the past 12 months. Domestic Delhi–Mumbai ≈ 1,150 km one-way."
        unit="passenger-km / year"
        factorNote={`DEFRA/BEIS 2023 economy class factor (incl. RFI): ${EMISSION_FACTORS.airTravelDomestic.factor} tCO₂e/passenger-km.`}
      >
        <NumberInput
          value={data.airTravelKm}
          onChange={(v) => update("airTravelKm", v)}
          placeholder="e.g. 120000"
        />
      </FieldRow>
      <FieldRow
        label="Hotel nights"
        hint="Total nights stayed in hotels by all employees."
        unit="nights / year"
        factorNote={`DEFRA/BEIS 2023 average hotel: ${EMISSION_FACTORS.hotelNight.factor} tCO₂e/night.`}
      >
        <NumberInput
          value={data.hotelNights}
          onChange={(v) => update("hotelNights", v)}
          placeholder="e.g. 200"
        />
      </FieldRow>
    </div>
  );
}

function Step5({
  data,
  update,
}: {
  data: CalculatorData;
  update: (k: keyof CalculatorData, v: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldRow
        label="Packaging materials"
        hint="Total weight of packaging purchased — cardboard, plastic, bubble wrap, etc."
        unit="kg / year"
        factorNote={`Mixed packaging average (Franklin Associates LCA): ${EMISSION_FACTORS.packaging.factor} tCO₂e/kg.`}
      >
        <NumberInput
          value={data.packagingKg}
          onChange={(v) => update("packagingKg", v)}
          placeholder="e.g. 5000"
        />
      </FieldRow>
      <p className="text-xs text-muted-foreground">
        Leave at 0 if you sell services and have no physical packaging.
      </p>
    </div>
  );
}

function Step6({
  data,
  update,
}: {
  data: CalculatorData;
  update: (k: keyof CalculatorData, v: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        This section is optional. Leave at 0 to skip.
      </p>
      <FieldRow
        label="Cloud & SaaS spend"
        hint="Annual spend on cloud computing (AWS, GCP, Azure) and hosted software tools."
        unit="₹ / year"
        factorNote={`GHG Protocol ICT sector guidance (adjusted for India grid): approx. ${EMISSION_FACTORS.cloudSpend.factor} tCO₂e per ₹ spent.`}
      >
        <NumberInput
          value={data.cloudSpendInr}
          onChange={(v) => update("cloudSpendInr", v)}
          placeholder="e.g. 600000"
        />
      </FieldRow>
    </div>
  );
}

function Step7({ data }: { data: CalculatorData }) {
  const scope1 = calcScope1({
    dieselLitres: data.dieselLitres,
    lpgKg: data.lpgKg,
    ngCubicMetres: data.ngCubicMetres,
    ownFleetKm: data.ownFleetKm,
  });
  const scope2 = calcScope2({ gridKwh: data.gridKwh });
  const scope3 = calcScope3({
    airTravelKm: data.airTravelKm,
    hotelNights: data.hotelNights,
    thirdPartyShipKm: data.thirdPartyShipKm,
    packagingKg: data.packagingKg,
    cloudSpendInr: data.cloudSpendInr,
  });
  const total = scope1 + scope2 + scope3;

  const rows = [
    { label: "Business", value: data.businessName || "—" },
    { label: "Sector", value: data.sector || "—" },
    { label: "Size", value: data.size || "—" },
    { label: "Grid electricity", value: `${data.gridKwh.toLocaleString("en-IN")} kWh` },
    { label: "Diesel", value: `${data.dieselLitres.toLocaleString("en-IN")} L` },
    { label: "Own fleet", value: `${data.ownFleetKm.toLocaleString("en-IN")} km` },
    { label: "Air travel", value: `${data.airTravelKm.toLocaleString("en-IN")} passenger-km` },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Review your inputs. Hit Calculate to see your full breakdown.
      </p>
      <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-muted-foreground">{r.label}</span>
            <span className="font-medium text-foreground">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 border border-border rounded-lg p-4 bg-secondary/30">
        {[
          { label: "Scope 1", val: scope1 },
          { label: "Scope 2", val: scope2 },
          { label: "Scope 3", val: scope3 },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-heading text-xl font-semibold text-foreground">
              {s.val.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{s.label} tCO₂e</p>
          </div>
        ))}
      </div>
      <div className="text-center border-t border-border pt-4">
        <p className="font-heading text-3xl font-semibold text-primary">
          {total.toFixed(1)} tCO₂e
        </p>
        <p className="text-sm text-muted-foreground mt-1">estimated annual footprint</p>
      </div>
    </div>
  );
}

// ─── Wizard orchestrator ─────────────────────────────────────────────

export function CalculatorWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CalculatorData>(EMPTY_CALCULATOR_DATA);
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CALCULATOR_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...EMPTY_CALCULATOR_DATA, ...parsed.data });
        if (parsed.step !== undefined) setStep(parsed.step);
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const persist = useCallback(
    (nextData: CalculatorData, nextStep: number) => {
      localStorage.setItem(
        CALCULATOR_STORAGE_KEY,
        JSON.stringify({ data: nextData, step: nextStep })
      );
    },
    []
  );

  const update = useCallback(
    (key: keyof CalculatorData, value: string | number) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        persist(next, step);
        return next;
      });
      setSaved(false);
    },
    [step, persist]
  );

  const next = () => {
    if (step < STEPS.length - 1) {
      const nextStep = step + 1;
      persist(data, nextStep);
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Final step — calculate and go to result
      const scope1 = calcScope1({
        dieselLitres: data.dieselLitres,
        lpgKg: data.lpgKg,
        ngCubicMetres: data.ngCubicMetres,
        ownFleetKm: data.ownFleetKm,
      });
      const scope2 = calcScope2({ gridKwh: data.gridKwh });
      const scope3 = calcScope3({
        airTravelKm: data.airTravelKm,
        hotelNights: data.hotelNights,
        thirdPartyShipKm: data.thirdPartyShipKm,
        packagingKg: data.packagingKg,
        cloudSpendInr: data.cloudSpendInr,
      });

      const result: CalculatorResult = {
        data,
        scope1Total: scope1,
        scope2Total: scope2,
        scope3Total: scope3,
        grandTotal: scope1 + scope2 + scope3,
        breakdown: [
          { label: "Grid electricity", value: scope2, scope: "Scope 2" },
          {
            label: "Fuel combustion",
            value:
              (data.dieselLitres * EMISSION_FACTORS.diesel.factor) / 1000 +
              (data.lpgKg * EMISSION_FACTORS.lpg.factor) / 1000 +
              (data.ngCubicMetres * EMISSION_FACTORS.naturalGas.factor) / 1000,
            scope: "Scope 1",
          },
          {
            label: "Own fleet",
            value: data.ownFleetKm * EMISSION_FACTORS.ownFleet.factor,
            scope: "Scope 1",
          },
          {
            label: "Air travel",
            value: data.airTravelKm * EMISSION_FACTORS.airTravelDomestic.factor,
            scope: "Scope 3",
          },
          {
            label: "Hotels",
            value: data.hotelNights * EMISSION_FACTORS.hotelNight.factor,
            scope: "Scope 3",
          },
          {
            label: "Logistics",
            value: data.thirdPartyShipKm * EMISSION_FACTORS.thirdPartyShipping.factor,
            scope: "Scope 3",
          },
          {
            label: "Packaging",
            value: data.packagingKg * EMISSION_FACTORS.packaging.factor,
            scope: "Scope 3",
          },
          {
            label: "Cloud / digital",
            value: data.cloudSpendInr * EMISSION_FACTORS.cloudSpend.factor,
            scope: "Scope 3",
          },
        ].filter((b) => b.value > 0),
        calculatedAt: new Date().toISOString(),
      };

      localStorage.setItem(CALCULATOR_RESULT_KEY, JSON.stringify(result));
      router.push("/calculator/result");
    }
  };

  const back = () => {
    if (step > 0) {
      const prevStep = step - 1;
      persist(data, prevStep);
      setStep(prevStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const stepContent = [
    <Step1 key="s1" data={data} update={update} />,
    <Step2 key="s2" data={data} update={update} />,
    <Step3 key="s3" data={data} update={update} />,
    <Step4 key="s4" data={data} update={update} />,
    <Step5 key="s5" data={data} update={update} />,
    <Step6 key="s6" data={data} update={update} />,
    <Step7 key="s7" data={data} />,
  ];

  const stepTitles = [
    "Your business",
    "Energy use",
    "Transport & logistics",
    "Business travel",
    "Packaging & materials",
    "Digital footprint",
    "Review",
  ];

  const stepDescriptions = [
    "Tell us about your business so we can contextualise your footprint.",
    "Energy is the largest source of emissions for most businesses.",
    "Own fleet and third-party shipping.",
    "Flights, hotels, and ground travel by your team.",
    "Physical packaging and raw materials purchased.",
    "Cloud computing and hosted software. Optional — skip if not applicable.",
    "Check your inputs and see a preview of your footprint.",
  ];

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 md:py-16">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-xs text-muted-foreground">{STEPS[step]}</span>
        </div>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-primary" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>

      {/* Step header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-2">
          {stepTitles[step]}
        </h1>
        <p className="text-muted-foreground">{stepDescriptions[step]}</p>
      </div>

      {/* Step content */}
      <div className="mb-10">{stepContent[step]}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        <Button
          variant="ghost"
          onClick={back}
          disabled={step === 0}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Save size={12} /> Saved
            </span>
          )}
          <Button onClick={next} className="gap-2">
            {isLastStep ? "Calculate footprint" : "Continue"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
