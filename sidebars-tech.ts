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
        "contracts/bao-factory",
        "contracts/reserve-pool",
        {
          type: "category",
          label: "Price Oracles",
          items: [
            "contracts/price-oracle",
            "contracts/price-oracles/mainnet",
            "contracts/price-oracles/arbitrum",
            "contracts/price-oracles/base",
            "contracts/price-oracles/megaeth",
          ],
        },
        "contracts/fee-receiver",
        "contracts/reward-system",
      ],
    },
    {
      type: "category",
      label: "Markets",
      items: [
        { type: "doc", id: "markets/generic", label: "Generic" },
        { type: "doc", id: "markets/eth-fxsave", label: "fxUSD/ETH Market" },
        { type: "doc", id: "markets/btc-fxusd", label: "fxUSD/BTC Market" },
        { type: "doc", id: "markets/btc-steth", label: "stETH/BTC Market" },
        { type: "doc", id: "markets/fxusd-eur", label: "fxUSD/EUR Market" },
        { type: "doc", id: "markets/fxusd-gold", label: "fxUSD/GOLD Market" },
        { type: "doc", id: "markets/steth-usd-megaeth", label: "stETH/USD Market (MegaETH)" },
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
    {
      type: "category",
      label: "Remediation",
      items: ["remediation/fxusd-eth-sail-rebalance"],
    },
  ],
};

export default sidebars;
