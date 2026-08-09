import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  techDocsSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Overview",
    },
    {
      type: "doc",
      id: "coverage",
      label: "Coverage audit",
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
        "contracts/zap",
        "contracts/harbor-yield",
        "contracts/harbor-swap",
        {
          type: "category",
          label: "Price Oracles",
          items: [
            "contracts/price-oracle",
            {
              type: "category",
              label: "Mainnet",
              link: { type: "doc", id: "contracts/price-oracles/mainnet" },
              items: [
                {
                  type: "category",
                  label: "haETH",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/haeth/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeth/fxusd",
                      label: "fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeth/hs-fxusd",
                      label: "hs fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeth/susde",
                      label: "sUSDe",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "haBTC",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/habtc/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/habtc/fxusd",
                      label: "fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/habtc/steth",
                      label: "stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/habtc/hs-fxusd",
                      label: "hs fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/habtc/hs-steth",
                      label: "hs stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/habtc/susde",
                      label: "sUSDe",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "haEUR",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/haeur/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeur/fxusd",
                      label: "fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeur/steth",
                      label: "stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeur/hs-fxusd",
                      label: "hs fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeur/hs-steth",
                      label: "hs stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/haeur/susde",
                      label: "sUSDe",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "haGOLD",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/hagold/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/fxusd",
                      label: "fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/steth",
                      label: "stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/hs-fxusd",
                      label: "hs fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/hs-steth",
                      label: "hs stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/susde",
                      label: "sUSDe",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/fxusd-xau",
                      label: "fxUSD/XAU",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/steth-xau",
                      label: "stETH/XAU",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hagold/susde-xau",
                      label: "sUSDe/XAU",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "haSILVER",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/hasilver/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/fxusd",
                      label: "fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/steth",
                      label: "stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/hs-fxusd",
                      label: "hs fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/hs-steth",
                      label: "hs stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/susde",
                      label: "sUSDe",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/fxusd-xag",
                      label: "fxUSD/XAG",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/steth-xag",
                      label: "stETH/XAG",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hasilver/susde-xag",
                      label: "sUSDe/XAG",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "haMCAP",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/hamcap/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hamcap/fxusd",
                      label: "fxUSD",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hamcap/steth",
                      label: "stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hamcap/susde",
                      label: "sUSDe",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "haUSD",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/mainnet/hausd/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hausd/steth",
                      label: "stETH",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hausd/paxg",
                      label: "PAXG",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hausd/wbtc",
                      label: "wBTC",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hausd/tbtc",
                      label: "tBTC",
                    },
                    {
                      type: "doc",
                      id: "contracts/price-oracles/mainnet/hausd/wsteth",
                      label: "wstETH",
                    },
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Arbitrum",
              items: [
                "contracts/price-oracles/arbitrum",
                {
                  type: "autogenerated",
                  dirName: "contracts/price-oracles/arbitrum",
                },
              ],
            },
            {
              type: "category",
              label: "Base",
              items: [
                "contracts/price-oracles/base",
                {
                  type: "autogenerated",
                  dirName: "contracts/price-oracles/base",
                },
              ],
            },
            {
              type: "category",
              label: "MegaETH",
              link: { type: "doc", id: "contracts/price-oracles/megaeth" },
              items: [
                {
                  type: "category",
                  label: "haUSD",
                  link: {
                    type: "doc",
                    id: "contracts/price-oracles/megaeth/hausd/index",
                  },
                  items: [
                    {
                      type: "doc",
                      id: "contracts/price-oracles/megaeth/hausd/steth",
                      label: "stETH",
                    },
                  ],
                },
                {
                  type: "doc",
                  id: "contracts/price-oracles/megaeth/btc-usd",
                  label: "BTC/USD",
                },
                {
                  type: "doc",
                  id: "contracts/price-oracles/megaeth/wsteth-usd",
                  label: "wstETH/USD",
                },
                {
                  type: "doc",
                  id: "contracts/price-oracles/megaeth/usdmy-btc",
                  label: "USDMY/BTC",
                },
                {
                  type: "doc",
                  id: "contracts/price-oracles/megaeth/usdmy-eth",
                  label: "USDMY/ETH",
                },
                {
                  type: "doc",
                  id: "contracts/price-oracles/megaeth/usdmy-hype",
                  label: "USDMY/HYPE",
                },
                {
                  type: "doc",
                  id: "contracts/price-oracles/megaeth/usdmy-sol",
                  label: "USDMY/SOL",
                },
              ],
            },
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
        {
          type: "category",
          label: "haETH",
          link: { type: "doc", id: "markets/haeth/index" },
          items: [
            { type: "doc", id: "markets/haeth/fxusd", label: "fxUSD" },
          ],
        },
        {
          type: "category",
          label: "haBTC",
          link: { type: "doc", id: "markets/habtc/index" },
          items: [
            { type: "doc", id: "markets/habtc/fxusd", label: "fxUSD" },
            { type: "doc", id: "markets/habtc/steth", label: "stETH" },
          ],
        },
        {
          type: "category",
          label: "haEUR",
          link: { type: "doc", id: "markets/haeur/index" },
          items: [
            { type: "doc", id: "markets/haeur/fxusd", label: "fxUSD" },
            { type: "doc", id: "markets/haeur/steth", label: "stETH" },
          ],
        },
        {
          type: "category",
          label: "haGOLD",
          link: { type: "doc", id: "markets/hagold/index" },
          items: [
            { type: "doc", id: "markets/hagold/fxusd", label: "fxUSD" },
            { type: "doc", id: "markets/hagold/steth", label: "stETH" },
          ],
        },
        {
          type: "category",
          label: "haSILVER",
          link: { type: "doc", id: "markets/hasilver/index" },
          items: [
            { type: "doc", id: "markets/hasilver/fxusd", label: "fxUSD" },
            { type: "doc", id: "markets/hasilver/steth", label: "stETH" },
          ],
        },
        {
          type: "category",
          label: "haMCAP",
          link: { type: "doc", id: "markets/hamcap/index" },
          items: [
            { type: "doc", id: "markets/hamcap/fxusd", label: "fxUSD" },
            { type: "doc", id: "markets/hamcap/steth", label: "stETH" },
          ],
        },
        {
          type: "category",
          label: "haUSD",
          link: { type: "doc", id: "markets/hausd/index" },
          items: [
            { type: "doc", id: "markets/hausd/steth", label: "stETH" },
            { type: "doc", id: "markets/hausd/paxg", label: "PAXG" },
            { type: "doc", id: "markets/hausd/wbtc", label: "wBTC" },
            { type: "doc", id: "markets/hausd/tbtc", label: "tBTC" },
          ],
        },
        {
          type: "category",
          label: "haUSD (MegaETH)",
          link: { type: "doc", id: "markets/hausd-megaeth/index" },
          items: [
            {
              type: "doc",
              id: "markets/hausd-megaeth/steth",
              label: "stETH",
            },
          ],
        },
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
