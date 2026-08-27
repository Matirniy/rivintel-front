import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
export const dynamic = 'force-dynamic'

import "@/app/globals.css";
import ThemeProvider from "@/components/shared/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
