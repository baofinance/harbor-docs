---
sidebar_position: 6
---

# Supporting Features

Packages around Harbor’s core: **markets on fxSAVE and wstETH**, mint/redeem, [**Earn**](/stability-pools), [**Leverage**](https://app.harborfinance.io/sail), and [Maiden Voyage](/maiden-voyage).

**fxSAVE** is f(x) Protocol’s yield wrapper; **wstETH** is wrapped staked ETH. The app may show **fxUSD** / **stETH** balances, but markets hold the **wrapped** collateral. **fxUSD** is typically a **zap input**, not minter collateral. See [Glossary](/glossary).

## Price aggregators

[Harbor Price Aggregators](https://github.com/baofinance/harbor-price-aggregators) price collateral vs peg (and **hs** valuations):

- **Chainlink** feeds + rate sources (fxSAVE, wstETH)
- Market-specific composed prices (fxUSD/ETH, stETH/EUR, …)
- Freshness checks for mint and rebalance safety
- Wrapped collateral rates are **clamped to 0.9–3.0×** vs underlying; out-of-range rates revert and can block mint/redeem until feeds recover — see [Price oracle contracts](/tech-docs/contracts/price-oracle#chainlinkratelib)
- Shown on market pages in the app

Without oracles, **ha** and **hs** cannot stay pegged or rebalance safely. Engineers: [Tech docs — price oracles](/tech-docs/contracts/price-oracle).

## Zaps (convenience)

[Harbor Zap Contracts](https://github.com/baofinance/harbor-zap-contracts) one-click paths for Maiden Voyage and minting:

- ETH / stETH → wstETH → deposit/mint
- USDC / fxUSD → fxSAVE → deposit/mint

:::tip Prefer main collateral
Zaps are **convenience only**. Prefer **fxSAVE** or **wstETH** directly when you hold them. Use zaps when starting from ETH, USDC, or fxUSD.
:::

Expect gas and route slippage when not depositing main collateral.

## Harbor Yield stack (mid-term)

**Level 1** (stability pool + claim) is **live**. Levels **2–3** are not live mainnet UX yet — see [Harbor Yield](/harbor-yield):

1. Stability pool + claim (**live**)
2. **Compounder** — one pool, auto-compound
3. **hyTOKEN** — peg basket

[Harbor Swap](https://github.com/baofinance/harbor-swap) routes for **hy** vaults. Tech: [Harbor Yield](/tech-docs/contracts/harbor-yield) · [Harbor Swap](/tech-docs/contracts/harbor-swap).

Separate from live mint / Maiden Voyage zaps.
