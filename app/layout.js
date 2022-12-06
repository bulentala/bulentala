import "../styles/globals.css";
import { JetBrains_Mono } from "@next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-JetBrainsMono",
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang='en' className={JetBrainsMono.variable}>
      <head />
      <body>
        <div
          id='container'
          className='mx-auto grid min-h-screen max-w-2xl grid-rows-[auto_auto_1fr_auto]'
        >
          <Header />
          <Hero />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
