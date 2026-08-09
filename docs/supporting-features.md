---
sidebar_position: 6
---

# Supporting Features

Harbor’s core product is markets built on **productive wrapped collateral** — mainly **fxSAVE** (fxUSD markets) and **wstETH** (stETH markets) — with mint/redeem, stability pools, and Maiden Voyage. In contract terms, fxSAVE / wstETH are the **wrappedCollateralToken**; the app often **denominates** those positions in **fxUSD** / **stETH**. **fxUSD** itself is not deposited as market collateral — it is a **zap conversion input** (fxUSD → fxSAVE) for convenience. Several packages exist around that core for **pricing** and **UX convenience**.

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
- **USDC / fxUSD → fxSAVE** paths into Genesis or Minter (**fxUSD** enters only via this conversion; the market holds **fxSAVE**)

Zaps wrap conversion + deposit/mint into a single transaction so users do not have to manually wrap assets first.

:::tip Prefer main collaterals
Zaps are for **convenience only**. Harbor is designed around depositing the market’s **main collateral** directly (**fxSAVE** or **wstETH**). The UI may show balances in **fxUSD** / **stETH** terms, but protocol collateral is the wrapped asset. Prefer zaps when you hold ETH, USDC, or fxUSD and want a faster path in — not as the default long-term flow.
:::

Zap routes may involve wrapping (and, depending on the path, intermediary conversions). Expect normal gas costs and any route-specific slippage or fees when not depositing the main collateral directly.

## Related Harbor Yield stack

Mid-term yield participation (see [Harbor Yield](/harbor-yield)):

1. Stability pool + claim rewards  
2. **Auto-compounder** (usable on its own for ha/hs)  
3. **hyTOKEN** peg vault (uses ACs in its basket)

Also: [Harbor Swap](https://github.com/baofinance/harbor-swap) for hyTOKEN routing; tech: [Harbor Yield](/tech-docs/contracts/harbor-yield), [Harbor Swap](/tech-docs/contracts/harbor-swap). Aggregator rebalances via **Velora** (primary) / **1inch** (optional).

Those are separate from the live mint / Maiden Voyage zaps above.
