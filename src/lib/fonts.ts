// src/lib/fonts.ts
// Cyber Culinary — Font definitions using next/font/google

import { Space_Grotesk, Inter } from "next/font/google";

/**
 * Space Grotesk — Headline font
 * Used for: h1–h4, display text, hero copy, navigation brand
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

/**
 * Inter — Body / Label font
 * Used for: body text, labels, inputs, UI copy, small text
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

/**
 * Combined font class names for the <html> element
 * Usage: className={fontVariables} on <html>
 */
export const fontVariables = `${spaceGrotesk.variable} ${inter.variable}`;