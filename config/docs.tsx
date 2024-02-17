import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Youtube",
      href: "/youtube",
    },
    {
      title: "Twitter",
      href: "/twitter",
    },
    {
      title: "Instagram",
      href: "/instagram",
    },
  ],
};
