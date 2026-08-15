---
sidebar_position: 5
---

# Harbor Yield (hyTOKENS)

**Harbor Yield** is Harbor’s planned yield stack on top of stability pools. There are **three participation levels** — from full manual control up to a single pooled **hyTOKEN** per peg.

Work lives in [`baofinance/harbor-yield`](https://github.com/baofinance/harbor-yield) (plus foundation upgrades on [`harbor` PR #33](https://github.com/baofinance/harbor/pull/33)). Treat this page as the product design for the **mid-term** roadmap item — not as live mainnet UX yet. See [Roadmap](/roadmap). Contract layers: [Tech docs — Harbor Yield](/tech-docs/contracts/harbor-yield). Swap plumbing: [Tech docs — Harbor Swap](/tech-docs/contracts/harbor-swap). Integrator standards: [hy / ERC-7575](/tech-docs/integrators/hy-erc7575).

## Three participation levels

Users must hold **haTokens** to use a stability pool. They may mint haTokens or acquire them through a market. **hsTokens** are not deposit assets.

Both pool types earn **concentrated collateral yield** (and protocol revenue allocated to pools) on those haToken deposits — Sail is not rebalance-only. The pools differ on **rebalance payout**: collateral pool → **collateral**; Sail pool → **hsTokens**. See [Stability Pools](/stability-pools) and [How Yield is Generated](/yield).

What you do next is the level (product **1–3**; design doc uses **0–2** for the same SP / Compounder / hyTOKEN stack):

<div className="table-col-level">

| Level | What you do | Tokens | Claiming |
| ----- | ----------- | ------ | -------- |
| **1** | Mint **ha** / **hs**, deposit **haTokens** into a **stability pool** (collateral or Sail), claim rewards yourself | **haTokens** earning pool yield; rebalance pays **collateral** or **hsTokens** | Manual |
| **2** | Deposit **haTokens** into that pool’s **Compounder** (ERC-4626 `deposit`; `asset` = ha) | **hc…** shares wrapping **one** pool | Automatic (`compound()`) |
| **3** | Deposit through an **ERC-7575 door** in wrapped collateral or a peg-equivalent asset → receive **hy…** | **hy…** (e.g. hyETH) — whole-peg basket share | Automatic (vault + keepers) |

</div>

- **Level 1** (stability pools) is live on **Ethereum mainnet**. Levels **2** and **3** ship with Harbor Yield.
- **Compounders (level 2) and hyTOKENS (level 3) are siblings**, not a stack. Prefer one pool with automatic compounding → Compounder. Prefer diversified yield across a peg → hyTOKEN. Neither product holds the other.

## Why it exists

Today, amplified yield (level 1) means:

1. Holding **haTokens** (minted or bought) — and optionally **hsTokens**
2. Depositing **haTokens** (only) into a collateral or Sail stability pool
3. Periodically claiming collateral rewards and deciding what to do with them — and, on rebalance, receiving **collateral** or **hsTokens** back depending on the pool

Harbor Yield adds:

- **Level 2** — per-pool **Compounders** (plain **ERC-4626**) so depositors do not claim manually  
- **Level 3** — **hyTOKENS** (**ERC-7575** share + doors) so users can hold one pooled share per peg over several pool positions and peg-equivalent vaults  

[Harbor Swap](/tech-docs/contracts/harbor-swap) is routing support used by hyTOKEN vaults (and keepers), not a separate yield tier.

## How the stack fits together

![Harbor Yield layers](/img/harbor-yield-layers.svg)

| Layer | Role |
| ----- | ---- |
| **Stability pools** | Live base yield layer — **collateral** and **Sail** both take **haToken** deposits and earn concentrated yield / pool revenue; rebalance pays collateral vs **hsTokens** |
| **Compounders** | Usable per-pool **ERC-4626** product over **one** pool |
| **hyTOKENS** | Optional peg basket — holds **pool positions directly** plus peg-equivalent vaults; enter/exit via **ERC-7575** doors |
| **Harbor Swap** | Moves rewards between basket legs when the hyTOKEN vault needs DEX routes |

## Level 1 — Stability pools (live)

Mint **haTokens** and/or **hsTokens**. Deposit **only haTokens** into the **collateral** or **Sail** stability pool, then claim rewards when you want.

- **Yield:** haToken deposits in **either** pool earn concentrated collateral yield and their share of protocol revenue allocated to pools (see [How Yield is Generated](/yield)).
- **Rebalance:** the pool burns deposited haTokens and pays **collateral** (collateral pool) or **hsTokens** (Sail pool). Sail depositors do **not** forfeit pool yield — they choose a different rebalance payoff.

See [Stability Pools](/stability-pools).

## Level 2 — Compounders (usable product)

A Compounder wraps a **single** stability pool as a non-rebasing **ERC-4626** vault (`Compounder_v1`, shares **hc…**).

- ERC-4626 `asset()` is the **pegged token (`haXXX`)**, not the pool share — `deposit(ha…)` winds into the pool 1:1
- Fixed share count; share **price** rises as `compound()` turns rewards back into pool exposure
- Anyone (or keepers) can trigger `compound()`:
  - **Collateral Compounder:** claim **wCOL** rewards → mint ha when fees allow → redeposit
  - **Sail Compounder:** compound **harvest wCOL only** — does not value or compound illiquid **hs** rebalance receipts
- Losses and rewards stay within that single pool
- Available for **collateral** and **Sail** pools

Compounders are **not** basket components inside hyTOKEN. You can use level 2 on its own forever.

## Level 3 — hyTOKENS (pooled product)

- **One HarborYield vault per peg** (e.g. **hyETH**, **hyUSD**) — share token **hyXXX**
- Holds **StabilityPool positions directly** (several collateral markets) **plus** peg-equivalent ERC-4626 vaults (e.g. wstETH via a thin adapter) — **not** Compounder shares
- **hyXXX is ERC-7575**, not ERC-4626: entry/exit go through per-holding **doors** (`HarborYieldEntry_v1`) that expose the familiar ERC-4626 calls while minting/burning the shared hy token
- Door `asset()` is the market’s **wrappedCollateral** for a pool holding, or the equivalent vault’s own asset
- Fee-free **proportional** redeem across the whole basket, or single-asset exit through one door (fee prices basket drift)
- Peg-priced view helpers for indexers; hy does not advertise itself as IERC4626

Details for builders: [hy / ERC-7575](/tech-docs/integrators/hy-erc7575).

### Harbor Swap (routing support for level 3)

[Harbor Swap](https://github.com/baofinance/harbor-swap) moves tokens when the hyTOKEN vault needs to route rewards between holdings or rebalance the basket. Direct DEX executors on the hot path; **Velora** (primary) / **1inch** (optional) on discretionary `redistribute`. Details: [Tech docs — Harbor Swap](/tech-docs/contracts/harbor-swap).

### Example (hyETH-style vault)

When a pool holding surfaces **fxSAVE** rewards into Harbor Yield:

1. If minting haETH is cheap enough → compound into the pool (**no swap**)
2. Otherwise → **direct swap** fxSAVE → wstETH via the registered executor and deposit into the wstETH equivalent vault
3. Optional later **redistribute** moves between basket legs when keepers rebalance weights

## What users get

| Preference | Level | Use |
| ---------- | ----- | --- |
| Max control | **1** | Mint ha/hs → deposit **haTokens** in collateral or Sail pool → claim yourself |
| Auto-compound one pool | **2** | Deposit **haTokens** into that pool’s **Compounder** (ERC-4626) |
| Simple “earn on this peg” | **3** | Deposit via an **ERC-7575 door** → hold **hyTOKENS** (basket of pool positions + equivalents) |

## Relationship to other yield

- **Yield concentration** (haTOKENS in pools earning from full collateral) remains the base mechanic — see [How Yield is Generated](/yield)
- **Protocol revenue** — Yield Share first (~5% per eligible market), then of the remainder any post–$10M TVL treasury take, then **75%** to pools / **25%** buy TIDE — see [TIDE Tokenomics](/tide-token/tokenomics)
- **Maiden Voyage Yield Share** — ownership upside for voyage participants on that carve-out — see [Maiden Voyage](/maiden-voyage)

Harbor Yield is about **operational convenience and pooling** on top of stability-pool yield, not a replacement for those economics.

## Status

- Designed and implemented in [`baofinance/harbor-yield`](https://github.com/baofinance/harbor-yield) (`Compounder_v1`, `HarborYield_v1`, `HarborYieldEntry_v1`; foundation SP/minter upgrades on `harbor`)
- Swap routing via [baofinance/harbor-swap](https://github.com/baofinance/harbor-swap) (registry + DEX executors; Velora primary aggregator, 1inch optional)
- **Mid-term** product rollout after core markets and Maiden Voyage 2.0 maturity
- Watch [app.harborfinance.io](https://app.harborfinance.io) and this docs site for launch announcements
