import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

import "./globals.css";

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
    <html lang="ru">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow bg-base-200">
            <div className="w-full max-w-screen-xl mx-auto">{children}</div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
