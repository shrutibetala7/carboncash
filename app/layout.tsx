import type { Metadata } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CarbonCash — Measure, Offset, Prove",
    template: "%s | CarbonCash",
  },
  description:
    "CarbonCash helps Indian businesses measure their carbon footprint, offset it through verified projects, and prove it publicly with retirement certificates.",
  keywords: [
    "carbon credits",
    "carbon offset",
    "carbon neutral",
    "CBAM",
    "India",
    "sustainability",
    "Verra",
    "Gold Standard",
  ],
  authors: [{ name: "CarbonCash" }],
  creator: "CarbonCash",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://carboncash.in"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://carboncash.in",
    siteName: "CarbonCash",
    title: "CarbonCash — Measure, Offset, Prove",
    description:
      "Carbon neutrality for Indian businesses. Measure your footprint, offset through verified projects, and display a public certificate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarbonCash — Measure, Offset, Prove",
    description:
      "Carbon neutrality for Indian businesses. Verified offsets, public certificates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
