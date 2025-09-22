import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AuthInit } from "@/components/authInit";

import "./globals.css";
import AdvertisingIdHandler from "@/components/shared/advertisingIdHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rivintel",
  description: "Business analysis by regions and districts",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const referer = h.get("x-current-path");

  if (referer === "/welcome") {
    return (
      <html lang="en">
        <AdvertisingIdHandler />
        <body className={inter.className}>{children}</body>
        <Analytics />
      </html>
    );
  }

  return (
    <html lang="en">
      <AuthInit />
      <body className={inter.className}>
        <div className="flex flex-col h-[100vh]">
          <Header />

          <main className="bg-base-200 h-auto md:h-[calc(100%-112px)]">
            <div className="w-full h-full max-w-screen-xl mx-auto">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </body>
      <Analytics />
    </html>
  );
}
