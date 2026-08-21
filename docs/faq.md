---
sidebar_position: 7
---

# FAQ

Harbor: Supercharged Yield. Smarter Leverage.

Answers for the live app at [app.harborfinance.io](https://app.harborfinance.io). Vocabulary: [Glossary](/glossary). Cookbook: [Get Started](/get-started).

## General

### What is Harbor?

A decentralized protocol for synthetic assets — tokens that track price feeds — backed by yield-bearing collateral on **Ethereum**.

### What are ha tokens (Harbor Anchored)?

**ha** tokens are pegged synthetics (haETH, haBTC, haEUR, …):

- Collateralized within healthy markets
- Mint/redeem with [dynamic fees](/fees)
- ERC-20 composability
- Deposit in [**Earn**](https://app.harborfinance.io/anchor) for concentrated yield

### What are hs tokens (Harbor Sail)?

**hs** tokens are **leverage** claims (hsFXUSD-ETH, hsSTETH-BTC, …):

- Variable exposure vs the peg
- No funding fees, no margin-call UI
- No leverage slider or stop-loss — outcome of market ratio and supply
- Can lose most or all value in stress — [Risk Considerations](/risk-considerations)

## Earn (stability pools)

### What are stability pools?

Pools that secure the protocol, pay yield, and execute rebalances. Deposit **ha** only.

### How do I participate?

1. [Earn](https://app.harborfinance.io/anchor)
2. Pick market and pool (collateral or Sail)
3. Deposit **ha**
4. Earn yield — [Stability Pools](/stability-pools)

### What are the risks?

Rebalance into **collateral** or **hs**, oracle/contract risk, pool drain in extremes — [Risk Considerations](/risk-considerations).

### How is yield calculated?

Collateral yield + protocol revenue to pools. Per market: **Yield Share** (up to ~5%) comes first when eligible; of the **remainder**, after any TVL treasury take, **75%** goes to pools and **25%** buys TIDE. Plus Marks/TIDE campaigns where allocated — [How Yield is Generated](/yield).

## Using the protocol

### How do I get ha?

1. Connect wallet
2. Open a market ([Live Markets](/markets))
3. Deposit **fxSAVE** or **wstETH** (or zap from ETH/USDC/fxUSD — [Supporting Features](/supporting-features))
4. Mint **ha**

Or receive **ha** from [Maiden Voyage](/maiden-voyage) at launch.

### How do I get hs?

1. Mint in [**Leverage**](https://app.harborfinance.io/sail), or
2. Maiden Voyage distribution, or
3. Secondary markets / DEXs

### What fees should I expect?

[Dynamic mint/redeem fees](/fees), gas, possible pool early-withdrawal fees, zap/swap slippage.

## Technical (users)

### Wallets & networks

Web3 wallets via the app (MetaMask, WalletConnect, etc.). **Ethereum mainnet** is the primary network — use the app network selector as source of truth.

### How do I integrate?

**[Build on Harbor](/tech-docs/integrators)** — addresses, ABIs, dry-runs, pricing. No public REST/WebSocket API. On-chain client scaffold lives in tech docs only.

## Security

### Is the protocol audited?

Yes — Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) for **bao-base** and **bao-minter** (now Harbor core). **Partial** coverage of today’s mainnet deploys — post-audit upgrades; **zaps out of scope**.

### “No liquidations”?

**hs** avoids classic margin liquidation, but **can still go toward zero**. **ha** in pools can rebalance into other assets. Not risk-free — [Risk Considerations](/risk-considerations).

## Governance

### What is TIDE?

Governance and value-accrual token (1B cap). [TIDE (Tide dashboard)](https://app.harborfinance.io/tide) · [TIDE overview](/tide-token/overview).

Founder allocation (~22%): ~2% liquid at launch; ~20% via five cliffs — **$1M/1% → $5M/2.5% → $10M/4.5% → $25M/9% → $50M/15% POL**, **4% each**, max **4%/year** (\*KPI schedule pending). See [TIDE Tokenomics](/tide-token/tokenomics#founder-kpi-unlocks-20-of-supply).

### How do I participate in governance?

Discord / community discussion; team-directed incentives today. [Governance & TIDE](/tide-token/governance).

## Support

- [Discord](https://discord.com/invite/BW3P62vJXT)
- [Twitter/X](https://x.com/0xHarborFi)
- [GitHub](https://github.com/baofinance/)
- App announcements / Maiden Voyage / Tide pages
