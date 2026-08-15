import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono, Unbounded, Allura } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-wordmark",
  weight: ["700", "800"],
});

const allura = Allura({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Waka-Waka — Send someone who knows the market",
  description:
    "Book a personal shopper who knows the market inside out. Watch them find your item live on call, confirm the price, and approve before you pay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} ${unbounded.variable} ${allura.variable} font-body bg-paper text-ink antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}