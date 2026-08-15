# Coverage audit (tech refresh)

Checklist of Harbor repos / branches / open PRs vs what this tech-docs tree covers. Product docs on this branch include the merged `docs/nontech-refresh` updates. Re-run when new markets or oracles ship.

**How to add new deployments**

1. Markets → group by haToken under `markets/<hatoken>/` (e.g. `hausd/`), add a collateral page (`steth.md`, `fxusd.md`, …) using the shared layout (incl. zap rows), update the haToken `index.md`, and wire the sidebar category in [`sidebars-tech.ts`](../sidebars-tech.ts)
2. Oracles → add under `contracts/price-oracles/<chain>/<hatoken>/` (same haToken grouping as markets) → update haToken `index.md` + chain inventory → wire sidebar
3. Zaps → wire addresses on the market page + row on [Zap contracts](./contracts/zap.md)
4. Proxy keys → keep [markets/generic.md](./markets/generic.md) in sync with `harbor_v1.state.json`

---

## Market pages (mainnet app `marketId`s)

| App / proxy family | Doc page | Status in docs |
| ------------------ | -------- | -------------- |
| `eth-fxusd` / `ETH::fxUSD` | [haETH / fxUSD](./markets/haeth/fxusd.md) | ✅ |
| `btc-fxusd` / `BTC::fxUSD` | [haBTC / fxUSD](./markets/habtc/fxusd.md) | ✅ |
| `btc-steth` / `BTC::stETH` | [haBTC / stETH](./markets/habtc/steth.md) | ✅ |
| `fxusd-eur` / `EUR::fxUSD` | [haEUR / fxUSD](./markets/haeur/fxusd.md) | ✅ (was “coming soon”) |
| `steth-eur` / `EUR::stETH` | [haEUR / stETH](./markets/haeur/steth.md) | ✅ added |
| `fxusd-gold` / `GOLD::fxUSD` | [haGOLD / fxUSD](./markets/hagold/fxusd.md) | ✅ (was “coming soon”) |
| `steth-gold` / `GOLD::stETH` | [haGOLD / stETH](./markets/hagold/steth.md) | ✅ added |
| `fxusd-silver` / `SILVER::fxUSD` | [haSILVER / fxUSD](./markets/hasilver/fxusd.md) | ✅ added |
| `steth-silver` / `SILVER::stETH` | [haSILVER / stETH](./markets/hasilver/steth.md) | ✅ added |
| `fxusd-mcap` / `MCAP::fxUSD` | [haMCAP / fxUSD](./markets/hamcap/fxusd.md) | ✅ added |
| `steth-mcap` / `MCAP::stETH` | [haMCAP / stETH](./markets/hamcap/steth.md) | ✅ added |
| `steth-usd` / `USD::stETH` | [haUSD / stETH](./markets/hausd/steth.md) | ✅ mainnet USD stack |
| `paxg-usd` / `USD::PAXG` | [haUSD / PAXG](./markets/hausd/paxg.md) | ✅ shared haUSD |
| `wbtc-usd` / `USD::wBTC` | [haUSD / wBTC](./markets/hausd/wbtc.md) | ✅ shared haUSD |
| `tbtc-usd` / `USD::tBTC` | [haUSD / tBTC](./markets/hausd/tbtc.md) | ✅ shared haUSD |
| MegaETH `steth-usd` | [haUSD MegaETH / stETH](./markets/hausd-megaeth/steth.md) | ✅ (not mainnet) |
| Generic CREATE3 registry | [generic](./markets/generic.md) | ✅ incl. `USD::*` |

**Still thin on market pages:** some `minterFeeReceiver` rows (stETH / SILVER / MCAP / USD families missing from generic table), app flags (`anchorActive` / `sailActive`). Genesis windows + `startBlock` filled from `harbor-app` (`contracts.mainnetUsd.ts` for USD; placeholders noted where app still has `startBlock: 0`).

---

## Price oracle inventories

| Chain | Page | Notes |
| ----- | ---- | ----- |
| Mainnet | [mainnet](./contracts/price-oracles/mainnet.md) | Primary lookup; GOLD/SILVER preferred over XAU/XAG aliases |
| Arbitrum | [arbitrum](./contracts/price-oracles/arbitrum.md) | ✅ |
| Base | [base](./contracts/price-oracles/base.md) | ✅ |
| MegaETH | [megaeth](./contracts/price-oracles/megaeth.md) | ✅ |

**Oracle gaps to watch**

| Gap | Source | Docs action |
| --- | ------ | ----------- |
| Harbor Yield peg / vault oracles | `harbor-price-aggregators` [#4](https://github.com/baofinance/harbor-price-aggregators/pull/4) `harbor-yield` | ETH/ETH, Peg/ETH, stETH/ETH (+ peg→ETH wrappers) — add inventory rows when merged |
| Missing hs\* MCAP leverage feeds in inventory | app / aggregators | Confirm deploy; add to leveraged table if live |
| Market page ↔ inventory drift | historical docs | Market pages should cite inventory address (fixed for ETH/BTC/EUR/GOLD in this refresh) |

---

## Core contracts (bao-factory / harbor)

| Area | Docs | Gap |
| ---- | ---- | --- |
| Minter, SPs, genesis, reserve, fee, rewards | [Contracts](./contracts/) | ✅ baseline |
| BaoFactory / CREATE3 | [bao-factory](./contracts/bao-factory.md) + generic | ✅ |
| Harbor Yield (SP v3 / hyTOKENS) | [harbor-yield](/tech-docs/contracts/harbor-yield) | ✅ tech page (tracks `#33`; vaults pre-prod) |
| Harbor Swap | [harbor-swap](/tech-docs/contracts/harbor-swap) | ✅ tech page (tracks `#3` Velora + merged hardening) |
| Process flows | [process-flows](./process-flows/) | ✅ |
| Integrators (Phase 1) | [Build on Harbor](./integrators/index.md) | ✅ cookbooks + docs-hosted ABI/address JSON; `@harbor/sdk` on GitHub (npm pending); no REST/WebSocket API |

---

## Supporting repos

| Repo | Open PR / branch (re-checked) | Docs coverage |
| ---- | ------------------------------ | ------------- |
| [harbor](https://github.com/baofinance/harbor) | [#33](https://github.com/baofinance/harbor/pull/33) `harbor-yield` | Core markets ✅; [Yield](/tech-docs/contracts/harbor-yield) ✅ |
| [harbor-swap](https://github.com/baofinance/harbor-swap) | [#3](https://github.com/baofinance/harbor-swap/pull/3) `velora-swap` (open); `#2`/`#4` merged on `main` | [Swap](/tech-docs/contracts/harbor-swap) ✅ |
| [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts) | — | ✅ [Zap contracts](./contracts/zap.md) |
| [harbor-tide](https://github.com/baofinance/harbor-tide) | no open PRs | ❌ cross-chain / token tech TBD |
| [harbor-price-aggregators](https://github.com/baofinance/harbor-price-aggregators) | [#4](https://github.com/baofinance/harbor-price-aggregators/pull/4) `harbor-yield` | Inventories ✅; Yield ETH-peg feeds pending merge → rows |
| [harbor-app](https://github.com/baofinance/harbor-app) | no open PRs (`yield-share` branch exists) | Use `markets.ts` for `marketId` / flags |
| bao-factory | covered via harbor deploy docs | ✅ |

---

## Page layout (no separate Templates nav)

| Kind | How to extend |
| ---- | ------------- |
| Market | Match sections on [haETH / fxUSD](./markets/haeth/fxusd.md) (includes zaps) |
| Price aggregator | Match sections on any pair page under `contracts/price-oracles/<chain>/<hatoken>/` (not chain index pages) |
| Zap overview | [contracts/zap.md](./contracts/zap.md) |
| Integrators | Match tone/structure of [Build on Harbor](./integrators/index.md); do not duplicate market address tables |
