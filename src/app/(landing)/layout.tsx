import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
export const dynamic = 'force-dynamic'

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
