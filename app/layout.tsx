import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Bülent ALA",
  description: "Kişisel blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        <main className='mx-auto max-w-3xl px-6'>{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId='G-51M62S5FLH' />
    </html>
  );
}
