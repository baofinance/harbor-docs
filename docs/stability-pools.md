---
sidebar_position: 3
---

# Stability Pools

Stability pools secure Harbor, pay concentrated yield, and execute rebalances. Use them in the app’s [**Earn**](https://app.harborfinance.io/anchor) section. Terms: [Glossary](/glossary).

![Same deposit. Same yield path. Different rebalance outcomes.](/img/04-stability-pool-two-pool-fork.png)

## What are stability pools?

Harbor maintains solvency through **stability pools**. Deposit **ha** (Harbor Anchored pegged tokens) to earn yield and help the system rebalance in stress.

There are **two pool types** with different rebalance outcomes:

### Collateral pools

- **ha** deposited here redeems into **real collateral** (fxSAVE, wstETH, …) when used in a rebalance
- Swap at **oracle value** when rebalancing
- Useful if you want to accumulate collateral in downturns

### Sail pools

- **ha** deposited here converts to **hs** (Harbor Sail leverage tokens) when used in a rebalance
- **Same yield path** as collateral pools on the **ha** deposit — Sail is not “yield-free rebalance only”
- Useful if you want leveraged rebound exposure after stress

**hs** itself does not earn concentrated pool yield — only **ha in either pool** does.

## How pools protect the system

When a market’s **collateral ratio** falls below threshold (e.g. 130%):

1. Rebalances become executable (MEV-incentivized)
2. **ha** in pools is burned to reduce pegged supply
3. Depositors receive **collateral** (collateral pool) or **hs** (Sail pool)

No auctions or external liquidators required.

## Why participate

- **Concentrated yield** from collateral (fxSAVE, wstETH) on **ha** deposits in **both** pool types
- **Rebalance choice** — collateral vs **hs** payout if your deposit is used
- **Marks / TIDE** where campaigns allocate them
- **Protocol revenue** — after Yield Share (~5%) and any TVL treasury take, **75%** to pools / **25%** buy TIDE — [TIDE Tokenomics](/tide-token/tokenomics)

## Example: market downturn

**Collateral pool:** haETH used in rebalance → you receive fxSAVE (or wstETH) worth the burned ha at oracle prices.

**Sail pool:** haETH used → you receive hsFXUSD-ETH; if the peg rebounds vs collateral, that exposure can outperform.

## Participating

Open [**Earn**](https://app.harborfinance.io/anchor).

### Depositing

1. Connect wallet
2. Choose market and pool type (collateral or Sail)
3. Deposit **ha**
4. Earn yield

### Withdrawing

Pools may use a **withdrawal request window**:

- Request withdrawal; after a delay, a fee-free window opens
- Withdrawing outside the window may incur **early-withdrawal fee**
- Check the app for delays and fees

### Claiming rewards

Use the Earn / Rewards panel in the app.

## Yield sources

1. Collateral yield (fxSAVE, wstETH)
2. Protocol fee / revenue share to pools
3. Marks / TIDE incentives where allocated
4. Rebalance outcomes (not in displayed APR)

## Best practices

1. **Diversify** — pools and markets
2. **Monitor** — collateral ratios in the app
3. **Position** — collateral pool for backing assets; Sail pool for rebound **hs**
4. **Read risks** — [Risk Considerations](/risk-considerations)

## Summary

- Automatic solvency support without classic liquidations
- Flexible rebalance payout: collateral or **hs**
- Real yield from productive collateral
- Core of Harbor [**Earn**](https://app.harborfinance.io/anchor)

## Technical details

Pools are **per market**. Browse in the app or see [Tech Documentation — markets](/tech-docs/markets/generic) for engineers.

## Support

- [Discord](https://discord.com/invite/BW3P62vJXT)
- [FAQ](/faq)
