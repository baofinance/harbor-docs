---
sidebar_position: 2
---

# Glossary

Harbor uses a few names in the app, on tokens, and in contract code. This page is the **user-facing vocabulary**. Integrators should also read [Token taxonomy](/tech-docs/integrators/token-taxonomy).

## App actions

| Term | Meaning | App |
| ---- | ------- | --- |
| **Earn** | Deposit **ha** into a stability pool to earn concentrated yield | [/anchor](https://app.harborfinance.io/anchor) |
| **Leverage** | Mint or hold **hs** for directional exposure (no funding fee, no margin-call UI) | [/sail](https://app.harborfinance.io/sail) |
| **Maiden Voyage** | Capacity-capped bootstrap for a **new market** before or at launch | [/genesis](https://app.harborfinance.io/genesis) |
| **TIDE (Tide dashboard)** | Token claim / allocation / BAO swap UI | [/tide](https://app.harborfinance.io/tide) |

**Earn** and **Leverage** are the primary labels in docs. “Anchor” and “Sail” are the token **families** (ha / hs), not interchangeable names for the app tabs.

## Tokens

| Symbol | Full name | Role | Examples |
| ------ | --------- | ---- | -------- |
| **ha** | Harbor Anchored | Pegged synthetic — tracks a price feed | haETH, haBTC, haEUR |
| **hs** | Harbor Sail | Residual leverage claim on collateral vs peg | hsFXUSD-ETH, hsSTETH-BTC |
| **hy** | Harbor Yield (mid-term) | Pooled yield product over several pools per peg — **not live on mainnet yet** | hyETH, hyUSD (planned) |

Use **`ha` / `hs` + ticker** in prose (`haETH`, not “HA Tokens” or `haTOKENS`). Spell out **Harbor Anchored** / **Harbor Sail** once per page on first mention if helpful.

## Collateral & wrappers

| Term | Meaning |
| ---- | ------- |
| **fxSAVE** | f(x) Protocol’s yield-bearing wrapper around **fxUSD**. Harbor **fxUSD-family** markets hold fxSAVE as wrapped collateral — not raw fxUSD. |
| **wstETH** | Wrapped staked ETH. Harbor **stETH-family** markets use wstETH as wrapped collateral. |
| **fxUSD** | f(x) stablecoin. Often a **zap input** (fxUSD → fxSAVE); not the token sitting in the minter’s collateral pool. |

## Incentives & revenue

| Term | Meaning |
| ---- | ------- |
| **Ledger Marks** | Off-chain–tracked points from early activity; feed into TIDE programs. |
| **Yield Share** | Up to **~5%** of a market’s revenue for eligible **Maiden Voyage** participants (carve-out before the global split). |
| **TIDE** | Harbor governance and value-accrual token (1B hard cap). |

## Two ratios (easy to confuse)

| Term | Plain English |
| ---- | ------------- |
| **Collateral efficiency (mint time)** | When you mint, **ha + hs** together match the value of collateral you put in (subject to fees). You are not minting ha alone 1:1 against all collateral. |
| **Collateral ratio (system health)** | Collateral value ÷ ha value (e.g. **~130%**). When this falls too far, **rebalances** use stability pools. |

Details: [Technical Overview](/technical-overview) (power user) and [How It Works](/how-it-works).

## User docs vs tech docs

| User docs | Tech / contracts |
| --------- | ---------------- |
| ha, hs, Earn, Leverage | `peggedToken`, `leveragedToken`, `Minter_v2` |
| stability pool | `StabilityPool`, `StabilityPoolManager` |
| Maiden Voyage | `Genesis_v1` |
| Compounder, hyTOKEN (product names) | ERC-4626 / ERC-7575 interfaces — see [Build on Harbor](/tech-docs/integrators) |

## Words to avoid in user docs

- **`haTOKENS` / `hsTOKENS`** (all-caps plurals) — use **ha** / **hs** or a concrete ticker.
- **`HA Tokens` / `HS Tokens`** as headings — use **ha (Harbor Anchored)** or the ticker.
- **“Anchor flow” / “Sail flow”** without saying **Earn** / **Leverage** — link the app tab users actually click.
