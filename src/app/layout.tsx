// src/app/layout.tsx
// Cyber Culinary — Root Layout

import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cyber Culinary",
    template: "%s | Cyber Culinary",
  },
  description: "Where technology meets the art of cooking.",
  keywords: ["food", "recipes", "culinary", "tech", "cooking"],
  openGraph: {
    type: "website",
    siteName: "Cyber Culinary",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9fb" },
    { media: "(prefers-color-scheme: dark)",  color: "#1A1B1E" },
  ],
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