import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/site/JsonLd";
import { SiteShell } from "@/components/site/SiteShell";
import { metadataBase, pageMetadata, siteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: metadataBase.title,
    template: "%s · QuitLoop",
  },
  description: metadataBase.description,
  applicationName: "QuitLoop",
  keywords: [
    "quit vaping UK",
    "nicotine tapering",
    "NICE NG209",
    "NHS stop smoking app",
    "urge surfing",
    "vaping cessation",
  ],
  authors: [{ name: "QuitLoop Health Ltd" }],
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: pageMetadata("/").openGraph,
  twitter: pageMetadata("/").twitter,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${jakarta.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-on-surface">
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
