import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Harbor",
  tagline:
    "Tokenize any market data. Earn yield and get protected leverage exposure.",
  favicon: "img/logowhitenobg.png",

  // Set the production url of your site here
  url: "https://docs.harborfinance.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // Note: When using custom domain, baseUrl should be "/"
  // organizationName and projectName are not set to avoid auto-detection of baseUrl

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Set docs as the primary route
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/baofinance/harbor/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tech-docs",
        path: "tech-docs",
        routeBasePath: "tech-docs",
        sidebarPath: "./sidebars-tech.ts",
        editUrl: "https://github.com/baofinance/harbor/tree/main/",
        remarkPlugins: [],
        rehypePlugins: [],
      },
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

  // Add port configuration
  customFields: {
    port: 3001,
  },

  themeConfig: {
    // Replace with your project's social card
    image: "./img/docusaurus-social-card.jpg",
    favicon: "img/logowhitenobg.png",
    navbar: {
      logo: {
        alt: "Harbor Logo",
        src: "img/Logowhitenobg.svg",
        srcDark: "img/Logowhitenobg.svg",
        width: 120,
        height: 40,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docSidebar",
          sidebarId: "techDocsSidebar",
          docsPluginId: "tech-docs",
          position: "left",
          label: "Tech Documentation",
        },
        {
          href: "https://github.com/baofinance/",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://discord.com/invite/BW3P62vJXT",
          label: "Discord",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/",
            },
            {
              label: "Technical Overview",
              to: "/technical-overview",
            },
            {
              label: "FAQ",
              to: "/faq",
            },
            {
              label: "Build on Harbor",
              to: "/tech-docs/integrators",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.com/invite/BW3P62vJXT",
            },
            {
              label: "Twitter/X",
              href: "https://x.com/0xHarborFi",
            },
            {
              label: "GitHub",
              href: "https://github.com/baofinance/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/baofinance/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Harbor. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ["bash", "json"],
    },
    mermaid: {
      theme: { light: "default", dark: "dark" },
      options: {
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
