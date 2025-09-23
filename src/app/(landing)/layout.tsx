import AdvertisingIdHandler from "@/components/shared/advertisingIdHandler";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AdvertisingIdHandler />
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  );
}
