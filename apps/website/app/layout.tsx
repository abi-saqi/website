import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "saqi.ai",
  description: "Omnichannel engagement and conversational AI, from one customer profile.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
