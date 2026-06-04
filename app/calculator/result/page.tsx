import type { Metadata } from "next";
import { CalculatorResult } from "@/components/calculator/result";

export const metadata: Metadata = {
  title: "Your Carbon Footprint Result",
  description:
    "Your estimated annual carbon footprint, broken down by scope and category.",
};

export default function ResultPage() {
  return <CalculatorResult />;
}
