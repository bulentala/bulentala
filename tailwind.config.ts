import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
         // Notion Light Mode Colors
         'notion-light-default': '#37352F',
         'notion-light-grey': '#787774',
         'notion-light-brown': '#9F6B53',
         'notion-light-orange': '#D9730D',
         'notion-light-yellow': '#CB912F',
         'notion-light-green': '#448361',
         'notion-light-blue': '#337EA9',
         'notion-light-purple': '#9065B0',
         'notion-light-pink': '#C14C8A',
         'notion-light-red': '#D44C47',
         // Background colors for Light Mode
         'notion-bg-light-grey': '#F1F1EF',
         'notion-bg-light-brown': '#F4EEEE',
         'notion-bg-light-orange': '#FAEBDD',
         'notion-bg-light-yellow': '#FBF3DB',
         'notion-bg-light-green': '#EDF3EC',
         'notion-bg-light-blue': '#E7F3F8',
         'notion-bg-light-purple': '#F6F3F9',
         'notion-bg-light-pink': '#FAF1F5',
         'notion-bg-light-red': '#FDEBEC',
 
         // Notion Dark Mode Colors
         'notion-dark-grey': '#979A9B',
         'notion-dark-brown': '#937264',
         'notion-dark-orange': '#FFA344',
         'notion-dark-yellow': '#FFDC49',
         'notion-dark-green': '#4DAB9A',
         'notion-dark-blue': '#529CCA',
         'notion-dark-purple': '#9A6DD7',
         'notion-dark-pink': '#E255A1',
         'notion-dark-red': '#FF7369',
         // Background colors for Dark Mode
         'notion-bg-dark-grey': '#454B4E',
         'notion-bg-dark-brown': '#594A3A',
         'notion-bg-dark-orange': '#594A3A',
         'notion-bg-dark-yellow': '#59563B',
         'notion-bg-dark-green': '#354C4B',
         'notion-bg-dark-blue': '#364954',
         'notion-bg-dark-purple': '#443F57',
         'notion-bg-dark-pink': '#533B4C',
         'notion-bg-dark-red': '#594141',
 
         // Notion Dark UI Colors
         'notion-ui-dark-main': '#2F3438',
         'notion-ui-dark-sidebar': '#373C3F',
         'notion-ui-dark-hover': '#3F4448',
 
         // Notion Light UI Colors
         'notion-ui-light-main': '#FFFFFF',
         'notion-ui-light-sidebar': '#F7F6F3',
         'notion-ui-light-hover': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
