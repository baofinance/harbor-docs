---
sidebar_position: 3
---

# Technical Overview

Power-user mechanics: CDP structure, NAV, collateral ratio, rebalancing, and fees. For a plain-English walkthrough first, read [How It Works](/how-it-works). Terms: [Glossary](/glossary).

![Three statements that should never be conflated.](/img/03-three-claim-accounting.png)

## Core mechanics

Harbor is a **decentralized platform for synthetic assets** — tokens that track price feeds without custody of the underlying. Each market is a shared collateralized debt position (CDP) with **100% collateral efficiency**: the combined NAV of **ha + hs** equals deposited collateral value (subject to fees).

That is **not** the same as minting ha 1:1 against collateral alone — **hs** is the residual equity claim. It is also **not** the system **collateral ratio** (collateral value ÷ ha value, e.g. **~130%**), which gates rebalancing.

- **Collateral**: yield-bearing assets (fxSAVE, wstETH) in the market pool
- **ha (Harbor Anchored)**: pegged synthetic debt
- **hs (Harbor Sail)**: leveraged residual claim
- **Health**: stability pools rebalance without off-chain liquidators

Users can:

1. Mint **ha** (and optionally **hs**) against shared collateral
2. Hold **hs** for protected leverage exposure ([Leverage](https://app.harborfinance.io/sail))
3. Deposit **ha** into stability pools for yield ([Earn](https://app.harborfinance.io/anchor))

## Protocol architecture

### 1. Collateral

- Approved yield-bearing collateral per market (fxSAVE, wstETH, …)
- Collectively managed — not isolated per-user CDPs
- Global minimum **collateralization ratio** (collateral ÷ ha, e.g. **130%**) for solvency — distinct from mint-time **100% collateral efficiency** (ha + hs NAV ≈ collateral)
- Collateral yield + mint/redeem fees → protocol revenue

**Revenue waterfall (per market):**

1. Up to **~5%** → Maiden Voyage **Yield Share** (when eligible)
2. Remainder → any post–$10M TVL treasury take, then **75% stability pools** / **25% buy TIDE**

See [TIDE Tokenomics](/tide-token/tokenomics).

### 2. ha (pegged)

- 1:1 with oracle reference price
- Live examples: haETH, haBTC, haEUR ([Live Markets](/markets))
- Redeemable; composable ERC-20s
- Peg maintained via arbitrage + protocol rebalancing

### 3. hs (leverage)

- Residual NAV after ha claims
- Named by collateral and peg (hsFXUSD-ETH, hsSTETH-BTC, …)
- No funding fees or margin calls; value moves with collateral ratio
- Absorbs losses before ha in stress; rebalanced via stability pools

## Rebalancing

When collateral ratio falls below threshold (e.g. 130%):

1. Protocol enters rebalance-eligible state
2. MEV searchers execute rebalance txs (incentivized)
3. **ha** from stability pools is burned
4. Pool depositors receive **collateral** (collateral pool) or **hs** (Sail pool)
5. System collateral ratio improves

Both pool types earn yield on **ha** deposits; rebalance **payout** differs. See [Stability Pools](/stability-pools).

## Protocol workflow

1. **Mint** — user deposits collateral via minter or zaps; mints ha and/or hs with 100% collateral efficiency (subject to [dynamic fees](/fees))
2. **Earn** — deposit ha into collateral or Sail stability pool; claim rewards
3. **Leverage** — mint or hold hs for directional exposure
4. **Rebalance** — automated when thresholds hit

## Security & audits

Harbor has a Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) covering **bao-base** and **bao-minter** (now Harbor core). Coverage of **currently deployed mainnet contracts is partial** — post-audit upgrades shipped afterward; **zap contracts** and some packages were **out of scope**. See [Risk Considerations](/risk-considerations).

## Related

- [How It Works](/how-it-works) — user-first narrative
- [Architecture Overview](/architecture) — system map
- [Build on Harbor](/tech-docs/integrators) — contracts and ABIs
