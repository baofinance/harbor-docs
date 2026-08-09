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
| **Pool / AC deposit** | **Only haTokens** can be deposited into the **collateral** or **Sail** stability pool (and into the AC that wraps that pool) |
| **Rebalance payout** | Collateral pool → **collateral**; Sail pool → **hsTokens** (deposited haTokens are burned) |

Product UX: [Harbor Yield](/harbor-yield). Live pool behaviour: [Stability pool](./stability-pool.md).

## Three participation levels

| Level | User flow | Contracts / shares |
| ----- | --------- | ------------------ |
| **1** | Mint ha/hs → deposit **haTokens** into collateral or Sail **stability pool** → claim rewards yourself | Stability pool (live; upgrading to **v3**) |
| **2** | Mint ha/hs → deposit **haTokens** into that pool’s **auto-compounder** | ERC-4626 **hc…** per pool |
| **3** | Mint into a **hyTOKEN** vault for that peg | Custom multi-asset **hy…** vault |

- **Level 1** is live today. Levels **2** and **3** ship with Harbor Yield.
- **Auto-compounders (level 2) are a usable product** — not only plumbing under hyTOKENS. Users can stop at level 2.
- **hyTOKENS (level 3)** sit **next to** ACs: the vault holds a basket of AC shares (and peg-equivalent legs). Sail-pool ACs stay available at level 2 but are **not** in hyTOKEN baskets.

Design source: [`doc/autocompounding-vault-design.md`](https://github.com/baofinance/harbor/blob/harbor-yield/doc/autocompounding-vault-design.md) on `harbor-yield`.

## Layer model (contracts)

| Level | Component | Share / asset | Role |
| ----- | --------- | ------------- | ---- |
| **1** | Stability pools (live; → v3) | Pool shares; deposits are **haTokens** | Base yield / rebalance; manual claim |
| **2** | Auto-compounders (AC) | Non-rebasing ERC-4626 **hc…** | Usable per-pool compounding over an haToken pool deposit; also held by hy vaults |
| **3** | Harbor Yield peg vault | Custom multi-asset **hy…** | Basket of (collateral) AC shares + peg-equivalent vaults |
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
| **Level 2 — Auto-compounder** | One per stability pool (collateral or Sail); users deposit **haTokens**; `compound()` claims collateral rewards → mint ha when fees allow → redeposit into the underlying pool |
| **Level 3 — hyTOKEN** | One vault per peg (ha-oriented); proportional multi-asset redeem (not single-asset ERC-4626 redeem); basket includes **collateral-pool** AC shares + peg equivalents |
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
