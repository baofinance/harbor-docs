import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  techDocsSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Overview",
    },
    {
      type: "category",
      label: "Contracts",
      items: [
        "contracts/minter",
        "contracts/stability-pool-manager",
        "contracts/stability-pool",
        "contracts/genesis",
        "contracts/reserve-pool",
        "contracts/price-oracle",
        "contracts/fee-receiver",
        "contracts/reward-system",
      ],
    },
    {
      type: "category",
      label: "Markets",
      items: [
        "markets/eth-fxsave",
        "markets/btc-fxusd",
        "markets/btc-steth",
        "markets/fxusd-eur",
        "markets/fxusd-gold",
      ],
    },
    {
      type: "category",
      label: "Process Flows",
      items: [
        "process-flows/contract-architecture",
        "process-flows/minting",
        "process-flows/rebalance",
        "process-flows/stability-pools",
      ],
    },
  ],
};

export default sidebars;
