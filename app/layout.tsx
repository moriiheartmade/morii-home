import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morii Home - Sewing Patterns for Home Decor & Handmade Business",
  description: "PDF sewing patterns for home decor, bags, and accessories. Perfect for DIY enthusiasts and handmade business owners. Proven designs sold on Shopee.",
  keywords: ["sewing patterns", "PDF patterns", "home decor", "handmade business", "DIY", "sewing", "crafts", "shopee"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
