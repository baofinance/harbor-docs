---
sidebar_position: 1
---

# Safer Leverage & Real Yield for Every Asset.

Let's be real: synthetic assets sound powerful. But most of them? Clunky, brittle, overly complicated — and definitely not paying your bills.

**Harbor changes that.**

Harbor is **live on Ethereum** at [app.harborfinance.io](https://app.harborfinance.io). Deposit productive collateral — **fxSAVE** or **wstETH** — and the protocol splits it into two tokens:

![One collateral position. Two complementary claims.](/img/01-hero-mental-model.png)

- **ha (Harbor Anchored)** — pegged to a price feed (e.g. haETH, haBTC, haEUR). Put **ha** in a stability pool to earn **concentrated yield**.
- **hs (Harbor Sail)** — variable leverage on collateral vs that peg (e.g. hsFXUSD-ETH). No funding fee, no margin-call UI.

**What is fxSAVE?** f(x) Protocol’s yield-bearing wrapper around fxUSD. Harbor **fxUSD-family** markets hold **fxSAVE** as collateral — not raw fxUSD. See [Glossary](/glossary).

## What do you want to do?

| Goal | Open in the app | Read more |
| ---- | --------------- | --------- |
| **Earn yield** | [Earn](https://app.harborfinance.io/anchor) — deposit ha into a stability pool | [Stability Pools](/stability-pools) · [Get Started](/get-started) |
| **Take leverage** | [Leverage](https://app.harborfinance.io/sail) — mint or hold hs | [FAQ — leverage](/faq) · [Risk Considerations](/risk-considerations) |
| **Join a new market launch** | [Maiden Voyage](https://app.harborfinance.io/genesis) | [Maiden Voyage](/maiden-voyage) |

New here? Start with [How It Works](/how-it-works) (plain English) or [Get Started](/get-started) (cookbook). Live markets: [Markets](/markets).

## Security & audits

Harbor has a Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) covering **bao-base** and **bao-minter** (now Harbor core). Coverage of **currently deployed mainnet contracts is partial** — some post-audit upgrades shipped after the review, and packages such as **zap contracts** were out of scope. Harbor Sail is protected from **margin-style liquidation**, but **hs can still lose value** (including toward zero) if a market is severely stressed. See [Risk Considerations](/risk-considerations).

## Core pieces

### ha — pegged (“anchored”)

Synthetic assets pegged to reference prices (ETH, BTC, EUR, …). Redeemable through the protocol. **Earn** amplified yield by depositing ha into stability pools. Examples: haETH, haBTC, haEUR — see [Live Markets](/markets).

### hs — leverage (“sail”)

Residual claim on collateral vs the peg. Absorbs volatility before ha in stress. Rebalances automatically — not a perpetual with a leverage slider. Examples: hsFXUSD-ETH, hsSTETH-BTC.

### Stability pools (Earn)

Two pool types — **collateral** and **Sail** — both take **ha** deposits and earn concentrated yield. They differ in what you receive **if** a rebalance uses your deposit (collateral vs hs). [Stability Pools](/stability-pools)

### Maiden Voyage

Capacity-capped campaigns that bootstrap new markets. Participants can receive **ha**, **hs**, **Yield Share**, and **Ledger Marks**. [Maiden Voyage](/maiden-voyage)

---

## Documentation

- [Glossary](/glossary) — Earn, Leverage, ha, hs, Marks, TIDE
- [How It Works](/how-it-works) — what happens to your money
- [Get Started](/get-started) — I have X, I want Y
- [Live Markets](/markets) — what’s live vs soon
- [Technical Overview](/technical-overview) — CDP mechanics, ratios, fees (power user)
- [How Yield is Generated](/yield) — yield concentration
- [Harbor Yield](/harbor-yield) — mid-term Compounder / hyTOKEN preview (not live mainnet)
- [TIDE Token](/tide-token/overview) — governance and revenue accrual
- [FAQ](/faq)
- [Build on Harbor](/tech-docs/integrators) — integrators only

## Need help?

- [App](https://app.harborfinance.io)
- [Discord](https://discord.com/invite/BW3P62vJXT)
- [Twitter/X](https://x.com/0xHarborFi)
