import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://scorpioplay.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Casino Game API for Modern iGaming Platforms | Scorpio Play",
    template: "%s | Scorpio Play",
  },
  description:
    "Launch and scale your casino with Scorpio Play's cost-effective Casino Game API. Access 2,000+ games, 11+ providers, flexible wallet integration, and 24/7 support.",
  keywords: [
    "casino game API",
    "slot API",
    "iGaming API",
    "online casino software",
    "white label casino",
    "casino game aggregator",
  ],
  authors: [{ name: "Scorpio Play", url: siteUrl }],
  creator: "Scorpio Play",
  publisher: "Scorpio Play",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Scorpio Play",
    title: "One API. A World of Casino Games.",
    description:
      "Connect your platform to 2,000+ games from 11+ leading providers with one reliable API.",
    images: [
      {
        url: "/scorpio-hero.webp",
        width: 1600,
        height: 820,
        alt: "Scorpio Play casino game API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scorpio Play Casino Game API",
    description: "2,000+ games. 11+ providers. One powerful integration.",
    images: ["/scorpio-hero.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050b13",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scorpio Play Casino Game API",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "A casino game aggregation API for operators, affiliates, and game providers.",
  provider: {
    "@type": "Organization",
    name: "Scorpio Play",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    category: "Revenue share",
    url: `${siteUrl}/pricing`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
