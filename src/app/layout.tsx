import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Universal Unit Converter - محول الوحدات الشامل",
    template: "%s | Universal Unit Converter",
  },
  description: "Professional unit converter for converting all types of units: length, mass, time, temperature, speed, energy, pressure, volume, area, and digital data. محول وحدات احترافي لتحويل جميع أنواع الوحدات.",
  keywords: ["unit converter", "convert units", "length converter", "mass converter", "temperature converter", "محول وحدات", "تحويل وحدات"],
  authors: [{ name: "Universal Unit Converter" }],
  creator: "Universal Unit Converter",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ar": "/ar",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    siteName: "Universal Unit Converter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
