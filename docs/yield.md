---
sidebar_position: 4
---

# How Yield is Generated for haTOKENS

Harbor's high yields come from concentrating collateral yield into a smaller pool of active users, plus protocol fee and incentive programs.

:::note Graphics (design)
Placeholder: yield concentration sketch ($100 collateral, $50 ha / $50 hs, only $30 ha in pool → ~3× base yield). Design team to supply.
:::

- **Yield Concentration:** When you mint haTOKENS (pegged tokens) and hsTOKENS (leveraged tokens), your collateral is pooled. However, **only haTOKENS deposited in a stability pool** (collateral **or** Sail) earn that concentrated yield. The two pool types share harvest / revenue allocated to pools; they differ mainly in **rebalance payout** (collateral vs hsTOKENS) — see [Stability Pools](/stability-pools).

- **Example:**
  Suppose there is $100 of collateral backing $50 of haETH and $50 of hsFXUSD-ETH.  
  If only $30 of haETH is deposited in the stability pool (and the rest is in wallets or liquidity pools), then that $30 is earning yield from the full $100 of collateral.  
  This means the stability pool can earn **~3x the base yield**—so if the collateral earns 7% APR, the stability pool could see ~20%+ APR before incentives.

- **Protocol Revenue Enhancement:**

  Protocol revenue (collateral yield + mint/redeem fees) is allocated as:

  1. Up to **~5%** of that market’s revenue → **Maiden Voyage Yield Share** (when eligible)
  2. Of the remaining **~95%**: after any post–$10M TVL treasury take → **75%** stability pools / **25%** buy TIDE (treasury → POL → burn)

  See the full diagram on [TIDE Tokenomics](/tide-token/tokenomics).

- **Result:**

  - **haTOKENS** in the stability pool earn a much higher APR than the underlying collateral alone, plus fee/revenue sharing to pools
  - **hsTOKENS** benefit from rebalancing and risk management, but do not earn the concentrated collateral yield directly

- **Extra Boost:** Ledger Marks and team-directed **$TIDE** incentives can further increase effective returns for active participants where campaigns apply.

- **Coming mid-term — Harbor Yield:** three levels (product **1–3** = design **0–2**) — (1) stability pool + claim rewards, (2) **Compounder** (ERC-4626 over one pool), (3) **hyTOKEN** peg basket via **ERC-7575** doors (siblings of Compounders, not wrappers of them). See [Harbor Yield](/harbor-yield).

> By concentrating collateral yield into the stability pool — and directing 75% of (post–Yield Share / post–TVL-take) protocol revenue to stability pools to grow markets — Harbor aims to deliver strong APRs to users who secure the protocol.
