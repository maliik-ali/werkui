import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE_URL } from "@/lib/format";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "WerkUI: UI kits and templates for Figma, Framer and Webflow", template: "%s | WerkUI" },
  description:
    "Premium and free UI kits, dashboards and website templates for Figma, Framer and Webflow. Preview, buy once, start building today.",
  openGraph: { siteName: "WerkUI", type: "website", url: SITE_URL },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f2f4f1", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <head>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
