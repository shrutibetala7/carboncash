export interface CalculatorData {
  // Step 1 — Business basics
  businessName: string;
  sector: string;
  size: string;
  location: string;

  // Step 2 — Energy
  gridKwh: number;
  dieselLitres: number;
  lpgKg: number;
  ngCubicMetres: number;

  // Step 3 — Transport & logistics
  ownFleetKm: number;
  thirdPartyShipKm: number;

  // Step 4 — Business travel
  airTravelKm: number;
  hotelNights: number;

  // Step 5 — Packaging & materials
  packagingKg: number;

  // Step 6 — Digital (optional)
  cloudSpendInr: number;
}

export interface CalculatorResult {
  data: CalculatorData;
  scope1Total: number;
  scope2Total: number;
  scope3Total: number;
  grandTotal: number;
  breakdown: { label: string; value: number; scope: string }[];
  calculatedAt: string;
}

export const CALCULATOR_STORAGE_KEY = "cc_calculator_draft";
export const CALCULATOR_RESULT_KEY = "cc_calculator_result";

export const SECTOR_OPTIONS = [
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "RETAIL", label: "Retail / E-commerce" },
  { value: "FOOD_BEVERAGE", label: "Food & Beverage" },
  { value: "TEXTILE", label: "Textile & Apparel" },
  { value: "LOGISTICS", label: "Logistics & Transport" },
  { value: "HOSPITALITY", label: "Hospitality & Tourism" },
  { value: "IT_SERVICES", label: "IT & Software Services" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "EDUCATION", label: "Education" },
  { value: "AGRICULTURE", label: "Agriculture" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "OTHER", label: "Other" },
];

export const SIZE_OPTIONS = [
  { value: "MICRO", label: "Micro (< 10 employees)" },
  { value: "SMALL", label: "Small (10–50 employees)" },
  { value: "MEDIUM", label: "Medium (50–250 employees)" },
  { value: "LARGE", label: "Large (250+ employees)" },
];

export const EMPTY_CALCULATOR_DATA: CalculatorData = {
  businessName: "",
  sector: "",
  size: "",
  location: "India",
  gridKwh: 0,
  dieselLitres: 0,
  lpgKg: 0,
  ngCubicMetres: 0,
  ownFleetKm: 0,
  thirdPartyShipKm: 0,
  airTravelKm: 0,
  hotelNights: 0,
  packagingKg: 0,
  cloudSpendInr: 0,
};
