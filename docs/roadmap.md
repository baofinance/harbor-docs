---
sidebar_position: 8
---

# Roadmap

Harbor: A Safer Harbor for Leverage, Uncharted Waters for Yield.

Harbor is a modular synthetic asset protocol with long-term ambitions to become the **default infrastructure for tokenizing and trading any market data**. The roadmap below outlines what is already live and what comes next.

> **Note on Adaptability**: The crypto industry moves rapidly. While this roadmap represents our current vision and strategic direction, we adapt as the landscape changes.

## 1. Live on Ethereum (Completed)

Harbor launched on Ethereum mainnet as a **friendly fork of fx protocol**, leveraging high-yield **fxSAVE** collateral alongside wstETH markets.

**Delivered:**

- Core contracts (minter, stability pools, rebalance logic) on mainnet
- Maiden Voyages and live markets for **haETH** and **haBTC** (fxSAVE / fxUSD collateral), plus **stETH–BTC** and **EUR** markets
- Protocol UI live at [app.harborfinance.io](https://app.harborfinance.io)
- Security audit by [Sherlock](https://sherlock.xyz/)
- **Ledger Marks** for early participants (Maiden Voyage / Anchor activity)
- **TIDE** token live with airdrop / claim flows in the app ([Tide](https://app.harborfinance.io/tide))

This foundation supports rapid synthetic asset creation and incentive-driven usage, with high-yield BTC/ETH/FX exposure and complementary Sail (leveraged) tokens.

## 2. Market Expansion (In Progress)

Harbor continues deploying markets based on:

- **Oracle availability**
- **Collateral compatibility**
- **Community and protocol demand**

### Live / launched market families (examples)

- **fxSAVE / fxUSD** collateral: haETH, haBTC, haEUR (+ Sail tokens such as hsFXUSD-ETH)
- **wstETH** collateral: haBTC, haEUR (+ Sail tokens such as hsSTETH-BTC)

### Upcoming / configured asset types

- **Commodities**: haGOLD, haSILVER (and related Sail tokens)
- **Indexes / other**: e.g. MCAP-style markets as oracles and product readiness allow
- **Custom markets**: External protocol-defined markets over time

### Maiden Voyage 2.0

Ongoing capacity-capped voyages with **Yield Share** (ongoing share of market revenue for eligible participants). See [Maiden Voyage](/maiden-voyage).

## 3. Harbor Yield & Autocompounding (Mid Term)

Harbor Yield (`hyTOKENS`) is the planned pooled-yield product on top of stability pools, with supporting infrastructure:

- **hyTOKENS (product):** one share token per peg (e.g. hyUSD) over a basket of strategies
- **Auto-compounders (support):** per-pool ERC-4626 vaults that claim rewards and redeposit haTOKENS — held inside hyTOKEN baskets
- **Harbor Swap (support):** route registry + direct DEX executors (UniV3 / Curve / Balancer / composites) and a 1inch adapter for keeper rebalances

Users who want convenience hold **hyTOKENS**; auto-compounders and swap run underneath. Users who want control can stay on raw stability pools. Details: [Harbor Yield](/harbor-yield).

## 4. Cross-Chain Deployment & Omnichain Expansion (Mid Term)

### Native Deployments

- Additional EVM deployments with local minting as product and oracle readiness allow (test / non-primary deployments may exist; Ethereum remains the primary user-facing network)

### Omnichain TIDE

- **TIDE** is designed for omnichain movement via **Chainlink CCIP** (same CREATE3 address pattern across chains), rather than LayerZero
- Cross-chain market and stability pool designs may follow after TIDE and core product maturity

## 5. Permissionless Market Factory (Mid to Long Term)

Harbor will evolve into a **market creation platform** — where anyone can launch synthetic markets with:

- A collateral token
- A trusted price feed (Chainlink, Redstone, or custom TWAP)
- A Stability Pool configuration

This transforms Harbor from a protocol into infrastructure — empowering protocols and DAOs to create their own data-driven assets.

## Governance-Led Innovation (Ongoing)

While the roadmap above focuses on core protocol development, **future upgrades may be proposed and discussed with TIDE holders**. Early growth uses **team-directed incentives** with community oversight; longer-term governance evolves toward a committee model. See [Governance & TIDE](/tide-token/governance).

The long-term vision remains:

> A universal synthetic asset platform where
> _anyone can create or access any market_

## Get Involved

### App

- [app.harborfinance.io](https://app.harborfinance.io)

### Community

- [Discord Server](https://discord.com/invite/BW3P62vJXT)

### Resources

- [Documentation](/)
- [GitHub](https://github.com/baofinance/)
