---
sidebar_position: 6
---

# Supporting Features

Harbor’s core product is markets built on **productive collateral** (mainly **fxSAVE / fxUSD** and **wstETH / stETH**), with mint/redeem, stability pools, and Maiden Voyage. Several packages exist around that core for **pricing** and **UX convenience**.

## Price aggregators (support)

[Harbor Price Aggregators](https://github.com/baofinance/harbor-price-aggregators) supply the **oracle layer** each market uses to price collateral vs peg (and related Sail valuations).

- Built on **Chainlink** feeds (and rate sources such as fxSAVE / wstETH where needed)
- Harbor **v3 aggregators** compose those feeds into market-specific prices (e.g. fxUSD/ETH, fxUSD/BTC, stETH/EUR, fxUSD/GOLD)
- Heartbeat / freshness checks so stale feeds do not silently drive mint and rebalance logic
- Shown on market pages in the app so users can see which oracle a market relies on

Without aggregators, haTOKENS and hsTOKENS cannot stay pegged or rebalance safely. Detailed addresses and formulas live in [Tech Documentation — price oracles](/tech-docs/contracts/price-oracle).

## Zaps (convenience)

[Harbor Zap Contracts](https://github.com/baofinance/harbor-zap-contracts) provide **one-click helpers** in the app for Maiden Voyage deposits and minting:

- **ETH / stETH → wstETH** paths into Genesis or Minter
- **USDC / fxUSD → fxSAVE** paths into Genesis or Minter

Zaps wrap conversion + deposit/mint into a single transaction so users do not have to manually wrap assets first.

:::tip Prefer main collaterals
Zaps are for **convenience only**. Harbor is designed around depositing the market’s **main collateral** directly (**fxSAVE** or **wstETH**, depending on the market). Using the primary collateral avoids extra swap/wrap steps, keeps economics clearer, and matches how the protocol is parameterized. Prefer zaps when you hold ETH/USDC (or similar) and want a faster path in — not as the default long-term flow.
:::

Zap routes may involve wrapping (and, depending on the path, intermediary conversions). Expect normal gas costs and any route-specific slippage or fees when not depositing the main collateral directly.

## Related Harbor Yield support

For the mid-term **hyTOKEN** stack, see also:

- Auto-compounders and [Harbor Swap](https://github.com/baofinance/harbor-swap) — [Harbor Yield](/harbor-yield)
- Tech: [Harbor Yield contracts](/tech-docs/contracts/harbor-yield), [Harbor Swap contracts](/tech-docs/contracts/harbor-swap)
- Aggregator rebalances via **Velora** (primary) / **1inch** (optional)

Those are yield-product infrastructure, separate from the live mint / Maiden Voyage zaps above.
