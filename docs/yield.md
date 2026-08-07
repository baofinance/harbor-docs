---
sidebar_position: 4
---

# How Yield is Generated for haTOKENS

Harbor's high yields come from concentrating collateral yield into a smaller pool of active users, plus protocol fee and incentive programs.

- **Yield Concentration:** When you mint haTOKENS (pegged tokens) and hsTOKENS (leveraged tokens), your collateral is pooled. However, **only haTOKENS deposited in the stability pool earn that concentrated yield**.

- **Example:**
  Suppose there is $100 of collateral backing $50 of haETH and $50 of hsFXUSD-ETH.  
  If only $30 of haETH is deposited in the stability pool (and the rest is in wallets or liquidity pools), then that $30 is earning yield from the full $100 of collateral.  
  This means the stability pool can earn **~3x the base yield**—so if the collateral earns 7% APR, the stability pool could see ~20%+ APR before incentives.

- **Protocol Revenue Enhancement:**

  :::caution Product confirmation needed
  Public surfaces currently describe revenue allocation differently (docs historically: ~75% to stability pools / ~25% to POL or TIDE strengthening; landing: 75% grow markets / 25% strengthen TIDE; Tide app: buyback path toward treasury ownership, POL, then burns). Treat percentage splits as **pending a single canonical product statement**. The concentration mechanic above does not depend on a specific split.
  :::

  - Protocol revenue includes mint/redeem fees and, where applicable, routed collateral yield
  - Stability pool depositors and market-growth programs are primary beneficiaries of that design intent
  - Maiden Voyage participants may separately earn **Yield Share** on the markets they helped launch

- **Result:**

  - **haTOKENS** in the stability pool earn a much higher APR than the underlying collateral alone, plus any fee/incentive sharing
  - **hsTOKENS** benefit from rebalancing and risk management, but do not earn the concentrated collateral yield directly

- **Extra Boost:** Ledger Marks and team-directed **$TIDE** incentives can further increase effective returns for active participants where campaigns apply.

> By concentrating collateral yield into the stability pool — and directing protocol revenue into growth and participant rewards — Harbor aims to deliver strong APRs to users who secure the protocol.
