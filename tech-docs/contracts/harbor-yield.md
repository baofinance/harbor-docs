# Harbor Yield

> **Status**: In progress (not live mainnet UX)  
> **Repos**: [baofinance/harbor](https://github.com/baofinance/harbor) branch / PR [`harbor-yield` (#33)](https://github.com/baofinance/harbor/pull/33)  
> **Product overview**: [Harbor Yield (hyTOKENS)](/harbor-yield)

Harbor Yield is the mid-term yield stack on top of stability pools. Product framing uses **three participation levels**; this page tracks the **contract surface and deploy phases**.

## Deposit and rebalance rules (shared with product)

These rules apply at every level that touches a stability pool (or its auto-compounder):

| Rule | Detail |
| ---- | ------ |
| **Mint** | Users can mint **haTokens** and/or **hsTokens** |
| **Pool deposit** | **Only haTokens** can be deposited into the **collateral** or **Sail** stability pool (receive rebasing **hp…** pool shares) |
| **AC deposit** | ERC-4626 `deposit()` takes the pool-share token (**hpXXX.COLn** / Sail equivalent). **haTokens** enter the AC via `depositPeggedToken()` (atomic SP deposit + AC mint). |
| **Pool yield** | **Both** pools accrue concentrated collateral yield / harvest + revenue share on haToken deposits (split across linked pools by holdings). Sail is not rebalance-only. |
| **Rebalance payout** | Collateral pool → **collateral**; Sail pool → **hsTokens** (deposited haTokens are burned). **hsTokens** do not earn concentrated yield on their own. |

Product UX: [Harbor Yield](/harbor-yield). Live pool behaviour: [Stability pool](./stability-pool.md).

## Three participation levels

This docs site uses **product-facing Levels 1–3**. The design doc on `harbor-yield` numbers the same stack **0–2**. Mapping:

| Product (this site) | Design doc | Component |
| ------------------- | ---------- | --------- |
| **Level 1** | **Level 0** | Raw stability pool |
| **Level 2** | **Level 1** | Auto-compounder (AC) |
| **Level 3** | **Level 2** | HarborYield / **hyTOKEN** peg vault |

| Level | User flow | Contracts / shares |
| ----- | --------- | ------------------ |
| **1** | Mint ha/hs → deposit **haTokens** into collateral or Sail **stability pool** → claim rewards yourself | Stability pool (live; upgrading to **v3**) |
| **2** | Mint ha/hs → deposit **hp…** via ERC-4626 `deposit()`, or **haTokens** via `depositPeggedToken()` → **hc…** AC shares | ERC-4626 **hc…** per pool |
| **3** | Deposit a registered **AC or equivalent** asset via `deposit(asset, amount, receiver)` → receive **hyXXX** shares (mint ha/hs → SP → AC happens upstream, not on the hy vault) | Custom multi-asset **hy…** vault |

- **Level 1** (stability pools) is live on **Ethereum mainnet**. Levels **2** and **3** ship with Harbor Yield.
- **Auto-compounders (level 2) are a usable product** — not only plumbing under hyTOKENS. Users can stop at level 2.
- **hyTOKENS (level 3)** sit **next to** ACs: the vault holds a basket of AC shares (and peg-equivalent legs). Sail-pool ACs stay available at level 2 but are **not** in hyTOKEN baskets.

Design source: [`doc/autocompounding-vault-design.md`](https://github.com/baofinance/harbor/blob/harbor-yield/doc/autocompounding-vault-design.md) on `harbor-yield` (Levels **0–2** there).

## Layer model (contracts)

| Level | Component | Share / asset | Role |
| ----- | --------- | ------------- | ---- |
| **1** | Stability pools (live; → v3) | Pool shares; deposits are **haTokens** | Base yield / rebalance; manual claim |
| **2** | Auto-compounders (AC) | Non-rebasing ERC-4626 **hc…** | Usable per-pool compounding; `deposit(hp…)` or `depositPeggedToken(ha…)`; also held by hy vaults (collateral ACs) |
| **3** | Harbor Yield peg vault | Custom multi-asset **hy…** | Basket of (collateral) AC shares + peg-equivalent vaults; entry is `deposit(asset, …)` of a registered vault asset, not raw ha/hs mint |
| — | Harbor Swap | — | Routing support for level 3 (`distribute` / `redistribute`), not a yield tier |

![Harbor Yield layers](/img/harbor-yield-layers.svg)

Users may enter at level 1, 2, or 3. Level 2 wraps level 1; level 3 holds level 2 (collateral ACs) plus equivalents. Harbor Swap feeds level 3 routing only.

## Foundation contracts (`harbor` `harbor-yield`)

PR [#33](https://github.com/baofinance/harbor/pull/33) widens the **data envelope** and adds yield-facing hooks on the core stack:

| Contract | Version on branch | Notes |
| -------- | ----------------- | ----- |
| **StabilityPool** | **v3** | ERC-20 pool shares (Solady + EIP-2612); `uint256` reward integrals; floor clamps (`MIN_TOTAL_ASSET_SUPPLY`); clamp-then-fee withdrawals; still **haToken** deposits |
| **StabilityPoolManager** | **v2** | Manager updates for v3 pools / compounding flows; collateral vs Sail rebalance payoffs unchanged in product terms |
| **Minter** | **v3** | Mint/redeem **ha** / **hs** + fee paths aligned with the widened envelope and yield consumers |
| **Reward accumulator / distributor** | **v3** | Companion reward accounting upgrades |
| Interfaces | `IYieldVault`, `IYieldVaultManager` | Peg-vault surface for higher layers |

Numerical envelope / no-silent-truncation guarantees: [`doc/DataEnvelope.md`](https://github.com/baofinance/harbor/blob/harbor-yield/doc/DataEnvelope.md).

### Upgrade path (mainnet)

| Field | Value |
| ----- | ----- |
| **Scripts** | `script/Deploy_StabilityPool_v3_mainnet.s.sol`, `script/UpgradeStabilityPool_v2_v3/` |
| **State** | Continues to use BaoFactory CREATE3 + `harbor_v1.state.json` patterns |
| **Live status** | Treat as **pre-production** until the PR merges and upgrade batches are executed |

## Level 2 / 3 product contracts (AC + hyTOKEN)

Higher-level **HarborYield_v1** peg vaults and autocompounder impls are designed in the autocompounding doc and consumed **with** [Harbor Swap](/tech-docs/contracts/harbor-swap). Deploy phase notes in swap’s `DEPLOY_SWAP.md` call this **Phase 2b** (consumer / yield vaults), after:

1. **Phase 1a** — Minter_v3 / StabilityPool_v3 / StabilityPoolManager_v2 (`harbor` `#33`)
2. **Phase 1b** — Yield peg oracles (`harbor-price-aggregators` `#4`)
3. **Phase 2a** — Swap registry + executors (`harbor-swap`)

| Field | Value |
| ----- | ----- |
| **Level 2 — Auto-compounder** | One per stability pool (collateral or Sail). `compound()` behaviour differs by pool type (below). |
| **Level 2 — Collateral AC `compound()`** | Claims **wCOLn** rewards → mint ha when fees allow → redeposit into the underlying collateral pool |
| **Level 2 — Sail AC `compound()`** | Compounds **harvest wCOLn only**. Does **not** value or compound illiquid **hsXXX.COLn** rebalance receipts (share price can drop on Sail rebalance until those are handled outside `compound()`) |
| **Level 3 — hyTOKEN** | One vault per peg (ha-oriented); users `deposit(asset, amount, receiver)` a registered AC/equivalent asset and receive **hyXXX**; proportional multi-asset redeem (not single-asset ERC-4626 redeem); basket includes **collateral-pool** AC shares + peg equivalents |
| **Sail ACs** | Usable at level 2; **not** included in hyTOKEN baskets (Sail rebalance receipts are less liquid) |
| **Harbor Swap use** | Direct routes on hot path for level 3; Velora (primary) / 1inch (optional) on `redistribute` |

## See also

| Resource | Use for |
| -------- | ------- |
| [Harbor Yield (product)](/harbor-yield) | Three levels, haToken deposit / rebalance UX |
| [Harbor Swap](/tech-docs/contracts/harbor-swap) | Registry, DEX executors, Velora |
| [Stability pool](./stability-pool.md) | Live v1/v2 pool behaviour (level 1) |
| [Coverage audit](../coverage.md) | PR / branch checklist |
| [Zap contracts](./zap.md) | Separate Maiden Voyage convenience (not HY) |
