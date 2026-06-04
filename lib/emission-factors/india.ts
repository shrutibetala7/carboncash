// Indian emission factors — sources cited per factor.
// All values in tCO2e per unit unless noted.

export const EMISSION_FACTORS = {
  // Scope 2 — Grid electricity
  // Source: Central Electricity Authority (CEA) CO2 Baseline Database, FY 2023-24
  gridElectricity: {
    factor: 0.716,      // tCO2e / MWh
    unit: "tCO2e/MWh",
    source: "CEA CO2 Baseline Database FY 2023-24",
    sourceUrl:
      "https://cea.nic.in/annual-growth-report/",
    year: 2024,
  },

  // Scope 1 — Stationary combustion
  // Source: IPCC 2006 Guidelines, Vol. 2 (Energy)
  diesel: {
    factor: 2.68,       // kgCO2e / litre → converted: 0.00268 tCO2e/litre
    unit: "kgCO2e/litre",
    source: "IPCC 2006 Guidelines Vol.2",
  },
  lpg: {
    factor: 2.983,      // kgCO2e / kg
    unit: "kgCO2e/kg",
    source: "IPCC 2006 Guidelines Vol.2",
  },
  naturalGas: {
    factor: 2.02,       // kgCO2e / m³
    unit: "kgCO2e/m³",
    source: "IPCC 2006 Guidelines Vol.2",
  },

  // Scope 1 — Mobile combustion (own fleet, diesel assumed)
  // Source: IPCC 2006 Guidelines, Vol. 2, Ch. 3
  ownFleet: {
    factor: 0.000171,   // tCO2e / km (heavy goods vehicle average)
    unit: "tCO2e/km",
    source: "IPCC 2006 Guidelines Vol.2 Ch.3",
  },

  // Scope 3 — Air travel
  // Source: DEFRA/BEIS 2023 Conversion Factors (economy class, avg domestic)
  airTravelDomestic: {
    factor: 0.000133,   // tCO2e / passenger-km (economy, incl. RFI)
    unit: "tCO2e/passenger-km",
    source: "DEFRA/BEIS 2023 Conversion Factors",
  },

  // Scope 3 — Hotel stays
  // Source: DEFRA/BEIS 2023 — average hotel night
  hotelNight: {
    factor: 0.0317,     // tCO2e / night
    unit: "tCO2e/night",
    source: "DEFRA/BEIS 2023 Conversion Factors",
  },

  // Scope 3 — Third-party logistics (road freight, India average)
  // Source: MoRTH & IPCC defaults for diesel HGV
  thirdPartyShipping: {
    factor: 0.000062,   // tCO2e / tonne-km
    unit: "tCO2e/tonne-km",
    source: "IPCC 2006 Guidelines / MoRTH India",
  },

  // Scope 3 — Packaging (mixed plastics average)
  // Source: IPCC / Franklin Associates LCA data
  packaging: {
    factor: 0.0028,     // tCO2e / kg
    unit: "tCO2e/kg",
    source: "Franklin Associates LCA Database",
  },

  // Scope 3 — Cloud/digital (spend-based, global average)
  // Source: GHG Protocol ICT Sector Guidance
  cloudSpend: {
    factor: 0.00023,    // tCO2e / INR spent (approximate)
    unit: "tCO2e/₹",
    source: "GHG Protocol ICT Sector Guidance (adjusted for India)",
  },
} as const;

export type EmissionFactorKey = keyof typeof EMISSION_FACTORS;

// Calculate tCO2e for each activity
export function calcScope1(inputs: {
  dieselLitres: number;
  lpgKg: number;
  ngCubicMetres: number;
  ownFleetKm: number;
}): number {
  const f = EMISSION_FACTORS;
  return (
    (inputs.dieselLitres * f.diesel.factor) / 1000 +
    (inputs.lpgKg * f.lpg.factor) / 1000 +
    (inputs.ngCubicMetres * f.naturalGas.factor) / 1000 +
    inputs.ownFleetKm * f.ownFleet.factor
  );
}

export function calcScope2(inputs: { gridKwh: number }): number {
  // gridElectricity factor is per MWh; divide kWh by 1000
  return (inputs.gridKwh / 1000) * EMISSION_FACTORS.gridElectricity.factor;
}

export function calcScope3(inputs: {
  airTravelKm: number;
  hotelNights: number;
  thirdPartyShipKm: number;
  packagingKg: number;
  cloudSpendInr: number;
}): number {
  const f = EMISSION_FACTORS;
  return (
    inputs.airTravelKm * f.airTravelDomestic.factor +
    inputs.hotelNights * f.hotelNight.factor +
    inputs.thirdPartyShipKm * f.thirdPartyShipping.factor +
    inputs.packagingKg * f.packaging.factor +
    inputs.cloudSpendInr * f.cloudSpend.factor
  );
}
