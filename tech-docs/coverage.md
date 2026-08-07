# Coverage audit (tech refresh)

Checklist of Harbor repos / branches / open PRs vs what this tech-docs tree covers. Re-run when new markets or oracles ship.

**How to add new deployments**

1. Markets → copy any existing `markets/*.md` page (same sections including zap rows) → `markets/<marketId>.md` → add to [`sidebars-tech.ts`](../sidebars-tech.ts)
2. Oracles → copy any pair page under `contracts/price-oracles/<chain>/` → fill → add a row on the chain inventory page linking to it
3. Zaps → wire addresses on the market page + row on [Zap contracts](./contracts/zap.md)
4. Proxy keys → keep [markets/generic.md](./markets/generic.md) in sync with `harbor_v1.state.json`

---

## Market pages (mainnet app `marketId`s)

| App / proxy family | Doc page | Status in docs |
| ------------------ | -------- | -------------- |
| `eth-fxusd` / `ETH::fxUSD` | [eth-fxsave](./markets/eth-fxsave.md) | ✅ |
| `btc-fxusd` / `BTC::fxUSD` | [btc-fxusd](./markets/btc-fxusd.md) | ✅ |
| `btc-steth` / `BTC::stETH` | [btc-steth](./markets/btc-steth.md) | ✅ |
| `fxusd-eur` / `EUR::fxUSD` | [fxusd-eur](./markets/fxusd-eur.md) | ✅ (was “coming soon”) |
| `steth-eur` / `EUR::stETH` | [steth-eur](./markets/steth-eur.md) | ✅ added |
| `fxusd-gold` / `GOLD::fxUSD` | [fxusd-gold](./markets/fxusd-gold.md) | ✅ (was “coming soon”) |
| `steth-gold` / `GOLD::stETH` | [steth-gold](./markets/steth-gold.md) | ✅ added |
| `fxusd-silver` / `SILVER::fxUSD` | [fxusd-silver](./markets/fxusd-silver.md) | ✅ added |
| `steth-silver` / `SILVER::stETH` | [steth-silver](./markets/steth-silver.md) | ✅ added |
| `fxusd-mcap` / `MCAP::fxUSD` | [fxusd-mcap](./markets/fxusd-mcap.md) | ✅ added |
| `steth-mcap` / `MCAP::stETH` | [steth-mcap](./markets/steth-mcap.md) | ✅ added |
| MegaETH `steth-usd` | [steth-usd-megaeth](./markets/steth-usd-megaeth.md) | ✅ |
| Generic CREATE3 registry | [generic](./markets/generic.md) | ✅ |

**Still thin / TBD on market pages:** genesis dates, `startBlock`, some `minterFeeReceiver` rows (stETH / SILVER / MCAP families missing from generic table), app flags (`anchorActive` / `sailActive`).

**Not separate market pages (oracles only today):** PAXG/USD, tBTC/USD, wBTC/USD — listed under [mainnet oracles](./contracts/price-oracles/mainnet.md#other-oracles). Add a market page only if a Harbor minter ships for that pair.

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
| Harbor Yield peg / vault oracles | `harbor-price-aggregators` PR/branch `harbor-yield` (#4) | Add inventory rows when merged + addresses known |
| Missing hs\* MCAP leverage feeds in inventory | app / aggregators | Confirm deploy; add to leveraged table if live |
| Market page ↔ inventory drift | historical docs | Market pages should cite inventory address (fixed for ETH/BTC/EUR/GOLD in this refresh) |

---

## Core contracts (bao-factory / harbor)

| Area | Docs | Gap |
| ---- | ---- | --- |
| Minter, SPs, genesis, reserve, fee, rewards | [Contracts](./contracts/) | ✅ baseline |
| BaoFactory / CREATE3 | [bao-factory](./contracts/bao-factory.md) + generic | ✅ |
| Harbor Yield (SP v3 / vaults / hyTOKENS) | product docs only | ❌ tech contract pages TBD (`harbor` branch/PR `harbor-yield`) |
| Process flows | [process-flows](./process-flows/) | ✅ |

---

## Supporting repos (little or no tech-docs yet)

| Repo | Open PR / branch (as of audit) | Docs coverage |
| ---- | ------------------------------ | ------------- |
| [harbor](https://github.com/baofinance/harbor) | [#33](https://github.com/baofinance/harbor/pull/33) `harbor-yield` | Core markets ✅; Yield contract pages ❌ |
| [harbor-swap](https://github.com/baofinance/harbor-swap) | [#3](https://github.com/baofinance/harbor-swap/pull/3) `velora-swap` | ❌ tech pages; product: Supporting Features / Velora |
| [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts) | — | ✅ [Zap contracts](./contracts/zap.md) + per-market addresses |
| [harbor-tide](https://github.com/baofinance/harbor-tide) | no open PRs at audit time | ❌ cross-chain / token tech TBD |
| [harbor-price-aggregators](https://github.com/baofinance/harbor-price-aggregators) | [#4](https://github.com/baofinance/harbor-price-aggregators/pull/4) `harbor-yield` | ✅ inventories; Yield peg feeds pending merge |
| [harbor-app](https://github.com/baofinance/harbor-app) | no open PRs at audit time | Use `markets.ts` for `marketId` / flags when filling templates |
| bao-factory | covered via harbor deploy docs | ✅ |

---

## Page layout (no separate Templates nav)

| Kind | How to extend |
| ---- | ------------- |
| Market | Match sections on [fxUSD/ETH](./markets/eth-fxsave.md) (includes zaps) |
| Price aggregator | Match sections on any `contracts/price-oracles/<chain>/*.md` page |
| Zap overview | [contracts/zap.md](./contracts/zap.md) |
