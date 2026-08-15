---
sidebar_position: 8
---

# Roadmap

Harbor: A Safer Harbor for Leverage, Uncharted Waters for Yield.

Harbor is a modular synthetic asset protocol with long-term ambitions to become the **default infrastructure for tokenizing and trading any market data**. The roadmap below outlines what is already live and what comes next.

> **Note on Adaptability**: The crypto industry moves rapidly. While this roadmap represents our current vision and strategic direction, we adapt as the landscape changes.

:::note Graphics (design)
Placeholder: roadmap timeline (Live → market expansion → Harbor Yield → further). Low priority vs mechanism diagrams. Design team to supply.
:::

## 1. Live on Ethereum (Completed)

Harbor launched on Ethereum mainnet as a **friendly fork of fx protocol**, leveraging high-yield **fxSAVE** collateral alongside wstETH markets.

**Delivered:**

- Core contracts (minter, stability pools, rebalance logic) on mainnet
- Maiden Voyages and live markets for **haETH** and **haBTC** (fxSAVE / fxUSD collateral), plus **stETH–BTC** and **EUR** markets
- Protocol UI live at [app.harborfinance.io](https://app.harborfinance.io)
- Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) for **bao-base** / **bao-minter** (partial vs today’s mainnet surface — post-audit upgrades; zaps out of scope)
- **Ledger Marks** for early participants (Maiden Voyage / Anchor activity)
- **TIDE** token live with airdrop / claim flows in the app ([Tide](https://app.harborfinance.io/tide))

This foundation supports rapid synthetic asset creation and incentive-driven usage, with high-yield BTC/ETH/FX exposure and complementary Sail (leveraged) tokens.

## 2. Market Expansion (In Progress)

Harbor continues deploying markets based on:

- **Oracle availability**
- **Collateral compatibility**
- **Community and protocol demand**

### Live / launched market families (examples)

Product surface for now: **ETH / BTC / EUR** (plus related Sail tokens).

- **fxSAVE / fxUSD** collateral: haETH, haBTC, haEUR (+ Sail tokens such as hsFXUSD-ETH)
- **wstETH** collateral: haBTC, haEUR (+ Sail tokens such as hsSTETH-BTC)

### Coming next / to relaunch

Contracts for additional pegs may already exist on-chain or in tech docs; product **relaunches** when ready:

- **USD** markets (haUSD stacks) — soon
- **Commodities**: haGOLD, haSILVER (and related Sail tokens) — to be relaunched
- **Indexes / other**: e.g. haMCAP — to be relaunched
- **Custom markets**: External protocol-defined markets over time

### Maiden Voyage 2.0

Ongoing capacity-capped voyages with **Yield Share** (ongoing share of market revenue for eligible participants). See [Maiden Voyage](/maiden-voyage).

**Supporting infrastructure (live / ongoing):**

- [Price aggregators](https://github.com/baofinance/harbor-price-aggregators) — Chainlink-composed oracles per market
- [Zap contracts](https://github.com/baofinance/harbor-zap-contracts) — convenience wrap+deposit paths; **prefer main collaterals** (fxSAVE / wstETH) when possible

See [Supporting Features](/supporting-features).

## 3. Harbor Yield & Autocompounding (Mid Term)

Three participation levels on top of minting ha/hs (product **1–3** = design doc **0–2**):

1. **Stability pool** — deposit haTokens, claim rewards yourself (live on **Ethereum mainnet**)
2. **Compounder** — ERC-4626 over one pool (`asset` = ha); compounding is automatic (usable on its own)
3. **hyTOKEN** — **ERC-7575** peg basket (doors in wrapped collateral / equivalents); holds pool positions directly + peg equivalents

**Compounders sit next to hyTOKENS** — siblings over the same pools, not a stack. Harbor Swap remains routing support for hyTOKEN vaults (**Velora** primary; **1inch** optional). Details: [Harbor Yield](/harbor-yield).

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
