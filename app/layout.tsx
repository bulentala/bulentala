import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Bülent ALA - Personal Blog",
  description: "Bülent ALA - Personal Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <body className="font-mono text-sm tracking-tight antialiased">
        <div className="mx-auto grid min-h-screen max-w-2xl grid-cols-12 grid-rows-12 gap-4 p-4">
          <Header />
          <Hero />
          <main className="col-span-12 col-start-1 row-span-9 row-start-3">
            {children}
          </main>
          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId="G-51M62S5FLH" />
    </html>
  );
}
