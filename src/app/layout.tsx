import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import "./globals.css";
import { AuthInit } from "@/components/authInit";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthInit />
      <body className={inter.className}>
        <div className="flex flex-col h-[100vh]">
          <Header />

          <main className="h-[calc(100%-112px)] bg-base-200">
            <div className="w-full h-full max-w-screen-xl mx-auto">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
