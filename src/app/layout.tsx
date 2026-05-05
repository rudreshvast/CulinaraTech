// src/app/layout.tsx
// Cyber Culinary — Root Layout

import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "HospitalityLearn",
    template: "%s | HospitalityLearn",
  },
  description: "Learn hospitality skills for your career.",
  keywords: ["hospitality", "education", "courses", "training"],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "HospitalityLearn",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9fd" },
    { media: "(prefers-color-scheme: dark)",  color: "#1A1B1E" },
  ],
  viewportFit: "cover",
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-background font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}