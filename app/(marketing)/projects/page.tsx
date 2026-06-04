import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carbon Offset Projects",
  description:
    "Browse CarbonCash's curated catalogue of verified carbon credit projects across India — biochar, agroforestry, biogas, and more. Every credit links to its registry record.",
};

// Placeholder project data — replaced by DB fetch post-launch
const placeholderProjects = [
  {
    slug: "rajasthan-solar-cookstoves",
    name: "Rajasthan Solar Cookstoves Programme",
    location: "Rajasthan, India",
    type: "COOKSTOVES",
    verifier: "Verra (VCS)",
    vintage: 2023,
    priceInr: 1200,
    volumeAvailable: 4200,
    excerpt:
      "Distributes improved solar cookstoves to 12,000 rural households, replacing kerosene and biomass combustion and reducing indoor air pollution.",
  },
  {
    slug: "odisha-biochar-farms",
    name: "Odisha Agricultural Biochar",
    location: "Odisha, India",
    type: "BIOCHAR",
    verifier: "Puro.earth",
    vintage: 2024,
    priceInr: 3800,
    volumeAvailable: 800,
    excerpt:
      "Converts rice husk and agricultural residue into biochar, permanently sequestering carbon while improving soil fertility for smallholder farmers.",
  },
  {
    slug: "assam-biogas-dairy",
    name: "Assam Dairy Biogas Network",
    location: "Assam, India",
    type: "BIOGAS",
    verifier: "Gold Standard",
    vintage: 2023,
    priceInr: 1500,
    volumeAvailable: 2100,
    excerpt:
      "Captures methane from dairy cattle manure and converts it to clean cooking fuel for 3,500 farm households across Upper Assam.",
  },
  {
    slug: "kerala-mangrove-restoration",
    name: "Kerala Mangrove Restoration",
    location: "Kerala, India",
    type: "MANGROVE",
    verifier: "Verra (VCS)",
    vintage: 2024,
    priceInr: 2400,
    volumeAvailable: 1600,
    excerpt:
      "Restores 1,200 hectares of degraded coastal mangroves along the Malabar Coast, sequestering blue carbon and protecting shoreline communities.",
  },
  {
    slug: "madhya-pradesh-agroforestry",
    name: "Madhya Pradesh Community Agroforestry",
    location: "Madhya Pradesh, India",
    type: "AGROFORESTRY",
    verifier: "Gold Standard",
    vintage: 2022,
    priceInr: 980,
    volumeAvailable: 6500,
    excerpt:
      "Plants native tree species on degraded farmland across tribal communities, generating carbon credits while restoring biodiversity and livelihoods.",
  },
];

const typeLabels: Record<string, string> = {
  COOKSTOVES: "Cookstoves",
  BIOCHAR: "Biochar",
  BIOGAS: "Biogas",
  MANGROVE: "Blue Carbon",
  AGROFORESTRY: "Agroforestry",
  SOLAR: "Solar",
  AFFORESTATION: "Afforestation",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          The catalogue
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
          Verified projects
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Every project here is independently verified and registered on Verra,
          Gold Standard, or Puro. Click through to read the registry record
          before you buy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors bg-card"
          >
            {/* Photo placeholder */}
            <div className="aspect-[16/9] bg-muted flex items-end p-4">
              <Badge variant="secondary" className="text-xs">
                {typeLabels[project.type] ?? project.type}
              </Badge>
            </div>

            <div className="flex flex-col flex-1 p-5 gap-3">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin size={12} className="mt-0.5 shrink-0" />
                <span>{project.location}</span>
              </div>

              <h2 className="font-heading text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {project.name}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {project.excerpt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {formatInr(project.priceInr)}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      / tCO₂e
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Vintage {project.vintage} · {project.verifier}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 pt-12 border-t border-border">
        <p className="text-sm text-muted-foreground max-w-xl">
          All projects are reviewed for additionality, permanence, and
          measurability before listing.{" "}
          <Link
            href="/methodology"
            className="text-foreground underline underline-offset-2"
          >
            Read our project selection criteria →
          </Link>
        </p>
      </div>
    </div>
  );
}
