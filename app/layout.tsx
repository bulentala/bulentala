import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const JetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bülent ALA Personal Blog",
  description: "This is the way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={JetBrainsMono.className}>
        <Header />
        <main className='mx-auto max-w-3xl px-4'>{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId='G-51M62S5FLH' />
    </html>
  );
}
