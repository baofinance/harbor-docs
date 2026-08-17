# Token taxonomy

Harbor markets split collateral into a **pegged** claim and a **residual (leveraged)** claim. Harbor Yield (mid-term) adds per-pool Compounders and a peg basket (**hyTOKEN**). Product docs use **Levels 1–3**; the yield design doc uses **0–2** for the same stack.

| Product | Design doc | Component |
| ------- | ---------- | --------- |
| Level 1 | Level 0 | Raw stability pool |
| Level 2 | Level 1 | Compounder (`hc…`) — ERC-4626 |
| Level 3 | Level 2 | HarborYield / **hyTOKEN** — ERC-7575 share + doors |

![Name the live tokens first. Keep the yield wrappers in their lane.](/img/11-token-taxonomy.png)

:::note
WIP — final versions pending.
:::


## Live tokens (integrate these)

| Token | Role | Typical interface | Who mints / burns |
| ----- | ---- | ----------------- | ----------------- |
| **haXXX** (pegged) | Tracks the market peg (ETH, BTC, USD, …) | ERC-20; minter-controlled mint/burn | Market **minter** (and genesis at launch) |
| **hsYYY-XXX** (Sail / leveraged) | Residual NAV of collateral vs ha | ERC-20; minter-controlled mint/burn | Market **minter** |
| Wrapped collateral (e.g. **fxSAVE**, **wstETH**) | What the minter holds; also hy **door** assets for pool holdings | Underlying ERC-20 / 4626-like vault | External protocols; Harbor does not mint these |
| Underlying collateral (e.g. **fxUSD**, **stETH**) | Unwrap target / zap input | ERC-20 | External |

Decimals: treat Harbor ha/hs as **18 decimals** unless a market page says otherwise. Always read `decimals()` on-chain.

ha tokens are **not** minted 1:1 against collateral alone. Combined ha + hs NAV ≈ deposited collateral (subject to fees). System **collateral ratio** is collateral value ÷ ha value (rebalance trigger, e.g. ~130%) — see [Technical overview](/technical-overview).

**hsTokens do not earn concentrated collateral yield.** Only **haTokens deposited in a stability pool** (collateral or Sail) do.

## Pool and yield wrappers

| Token | Role | Interface | Status |
| ----- | ---- | --------- | ------ |
| *(live pool position)* | Compounding **ha** balance inside SP_v1/v2 | Not an ERC-20 share — see [Stability pool](../contracts/stability-pool.md) | **Live** mainnet |
| **hpXXX.COLn** | Rebasing stability-pool share | ERC-20 shares (SP_v3 design) | **Pre-prod / not deployed** — do not treat as live |
| **hcXXX.COLn** | Compounder share (one pool) | **ERC-4626** (`asset` = **haXXX**) | **Pre-prod** (`harbor-yield`) |
| **hyXXX** | Peg basket share | **ERC-7575 share** (ERC-20); per-asset **ERC-7575 doors** reuse ERC-4626 mutations without their own share token | **Pre-prod** — [hy / ERC-7575](./hy-erc7575.md) |

Compounder and HarborYield are **siblings** over the same pools: HY holds pool positions **directly** (plus peg-equivalent vaults); it does **not** wrap Compounder shares.

## Naming

- **ha** = Harbor Anchored (peg). Shared across collaterals in a peg family (e.g. one **haUSD** for stETH / PAXG / wBTC / tBTC).  
- **hs** = Harbor Sail (leverage). Named by collateral and peg (e.g. `hsFXUSD-ETH`, `hsSTETH-USD`).  
- App `marketId` (e.g. `eth-fxusd`, `steth-usd`) is the key in [harbor-app](https://github.com/baofinance/harbor-app) and on each [market page](../markets/haeth/fxusd.md).  
- Integrator JSON / `@harbor/sdk` use **`usd-steth`** for the same haUSD/stETH market as app **`steth-usd`** — same addresses, different key spelling.  
- **harbor-app follow-up:** align app keys to one component order with the integrator book (prefer `<index>-<collateral>`); see [Addresses and ABIs](./addresses-and-abis.md#market-id-key-order).

## Related

- Product: [Harbor Yield](/harbor-yield)  
- Tech: [Harbor Yield contracts](../contracts/harbor-yield.md)
