import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Intro",
    },
    "glossary",
    "get-started",
    "how-it-works",
    "markets",
    {
      type: "category",
      label: "Protocol Overview",
      collapsed: true,
      items: ["technical-overview", "architecture", "risk-considerations"],
    },
    {
      type: "category",
      label: "Core Features",
      collapsed: true,
      items: ["stability-pools", "yield", "maiden-voyage", "harbor-yield", "fees", "supporting-features"],
    },
    {
      type: "category",
      label: "TIDE Token",
      collapsed: true,
      items: [
        "tide-token/overview",
        "tide-token/governance",
        "tide-token/tokenomics",
      ],
    },
    {
      type: "doc",
      id: "faq",
      label: "FAQ",
    },
    {
      type: "doc",
      id: "roadmap",
      label: "Roadmap",
    },
    {
      type: "category",
      label: "Legal",
      collapsed: true,
      items: ["terms-of-use", "privacy-policy"],
    },
  ],
};

export default sidebars;
