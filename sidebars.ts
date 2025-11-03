import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Intro",
    },
    {
      type: "category",
      label: "Protocol Overview",
      items: ["technical-overview", "architecture", "risk-considerations"],
    },
    {
      type: "category",
      label: "Core Features",
      items: ["stability-pools", "yield", "maiden-voyage", "fees"],
    },
    {
      type: "category",
      label: "TIDE Token",
      items: [
        "steam-token/overview",
        "steam-token/governance",
        "steam-token/tokenomics",
        "steam-token/earning",
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
  ],
};

export default sidebars;
