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
        'notion-default': '#37352F',
        'notion-grey': '#787774',
        'notion-brown': '#9F6B53',
        'notion-orange': '#D9730D',
        'notion-yellow': '#CB912F',
        'notion-green': '#448361',
        'notion-blue': '#337EA9',
        'notion-purple': '#9065B0',
        'notion-pink': '#C14C8A',
        'notion-red': '#D44C47',
        'notion-bg-grey': '#F1F1EF',
        'notion-bg-brown': '#F4EEEE',
        'notion-bg-orange': '#FAEBDD',
        'notion-bg-yellow': '#FBF3DB',
        'notion-bg-green': '#EDF3EC',
        'notion-bg-blue': '#E7F3F8',
        'notion-bg-purple': '#F6F3F9',
        'notion-bg-pink': '#FAF1F5',
        'notion-bg-red': '#FDEBEC'
      },
    },
  },
  plugins: [],
};
export default config;
