import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeScript } from "@/components/layout/theme-script";
import { LeadModalProvider } from "@/components/providers/lead-modal-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saqi.ai — Capture, Qualify, and Convert Leads in Real Time",
  description:
    "One platform to market, capture, qualify, and convert leads across your website, WhatsApp, and social media — with real-time sentiment insight and a scalable engine built for enterprise sales and marketing teams.",
  metadataBase: new URL("https://saqi.ai"),
  openGraph: {
    title: "Saqi.ai — Capture, Qualify, and Convert Leads in Real Time",
    description:
      "The omnichannel engagement platform that unifies lead capture, qualification, campaigns, and real-time customer insight in one place.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="grain min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-e300 selection:text-e900">
        <LeadModalProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </LeadModalProvider>
      </body>
    </html>
  );
}
