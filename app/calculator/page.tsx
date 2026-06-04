import type { Metadata } from "next";
import { CalculatorWizard } from "@/components/calculator/wizard";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator",
  description:
    "Calculate your business's annual carbon footprint in under 10 minutes. Built on Indian emission factors from CEA and IPCC. No login required.",
};

export default function CalculatorPage() {
  return <CalculatorWizard />;
}
