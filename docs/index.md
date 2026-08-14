---
sidebar_position: 1
---

# Safer Leverage & Real Yield for Every Asset.

Let's be real: synthetic assets sound powerful. But most of them? Clunky, brittle, overly complicated — and definitely not paying your bills.

**Harbor changes that.**

We're bringing groundbreaking yields to places they've never reached: BTC, ETH, FX, commodities — and anything else with a reliable price feed.

Harbor is **live on Ethereum**, with a Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) covering **bao-base** and **bao-minter** (now Harbor core). Coverage of currently deployed mainnet contracts is **partial** — some post-audit upgrades shipped after the review, and packages such as zap contracts were out of scope. App: [app.harborfinance.io](https://app.harborfinance.io).

## What Is Harbor?

Harbor is a synthetic asset protocol that transforms yield-bearing collateral — like fxSAVE or wstETH — into two powerful asset types:

- **haTOKENS (Harbor Anchored Tokens):** Pegged tokens (e.g., haETH, haBTC, haEUR) that track a price feed and can earn high yields, because the protocol concentrates collateral yield and fees into stability pools for haTOKENS
- **hsTOKENS (Harbor Sail Tokens):** Rebalancing variable leverage tokens for directional plays, with no funding fees, no margin calls, and automatic risk rebalancing (e.g., hsFXUSD-ETH, hsSTETH-BTC)

**Anywhere with a price feed, yield is coming.**

---

For details on how Harbor achieves these high yields, see [How Yield is Generated](yield.md).

For detailed information, explore the sections below or start with our [Technical Overview](/technical-overview).

---

## Core Components

### haTOKENS (Harbor Anchored Tokens - Pegged Assets)

- Synthetic assets pegged 1:1 to reference prices via reliable oracle feeds
- Live examples: haETH (ETH), haBTC (Bitcoin), haEUR (Euro); other pegs (e.g. gold) as markets launch
- Fully collateralized and redeemable
- Freely usable across DeFi platforms
- Designed to maintain tight pegs through arbitrage and protocol rebalancing
- **Earn amplified yield by concentrating protocol collateral yield into active stability pool depositors**

### hsTOKENS (Harbor Sail Tokens - Rebalancing Leverage Tokens)

- Variable leverage tokens representing residual claims on collateral
- Naming reflects collateral and peg (e.g., hsFXUSD-ETH, hsSTETH-BTC)
- Similar to holding liquidation-protected leveraged positions
- Absorb volatility between collateral and haTOKENS
- Protected from liquidation by protocol rebalances
- **Leveraged, directional exposure on any asset with a price feed**

### Stability Pools

- Two types: Collateral Pools and Sail Pools
- Maintain system solvency through automated rebalancing
- Earn yield from yield-bearing collateral (e.g. fxSAVE, wstETH)
- Earn Marks and, where allocated, TIDE incentives
- Transform market downturns, or pegged token price spikes, into opportunities for participants

### Maiden Voyage 2.0

- Bootstrap new markets with capacity-capped deposits
- Participants receive Anchor (ha) and Sail (hs) tokens at launch
- Eligible for ongoing **Yield Share** of market revenue
- Earn **Ledger Marks** during the voyage; completed voyages remain claimable/withdrawable as shown in the app

---

## Documentation Sections

- [Technical Overview](/technical-overview) - Understand the three-token model
- [Stability Pools](/stability-pools) - Learn about system security and yield
- [How Yield is Generated](/yield) - Understand the yield concentration mechanism
- [Maiden Voyage](/maiden-voyage) - How new markets are launched
- [Harbor Yield](/harbor-yield) - Three levels: stability pool, Compounder (ERC-4626), hyTOKEN (ERC-7575) (mid-term)
- [Supporting Features](/supporting-features) - Price aggregators and zaps
- [TIDE Token](/tide-token/overview) - Governance, incentives and buyback-driven value accrual
- [Roadmap](/roadmap) - Protocol development plans
- [FAQ](/faq) - Common questions and answers
- [Build on Harbor](/tech-docs/integrators) - Integrator path: addresses, quotes, mint/redeem, prices

## Need Help?

- Launch the [app](https://app.harborfinance.io)
- Join our [Discord](https://discord.com/invite/BW3P62vJXT)
- Follow us on [Twitter/X](https://x.com/0xHarborFi)
