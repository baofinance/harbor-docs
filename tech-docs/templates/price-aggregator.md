# Price aggregator / oracle template

Copy this file into the right chain page section **or** create `tech-docs/contracts/price-oracles/<pair-slug>.md` only if a pair needs a dedicated deep-dive. For most oracles, **add one row** to the chain inventory table using the fields below so every deployed oracle is discoverable the same way.

Canonical chain inventories:

- [Mainnet](../contracts/price-oracles/mainnet.md)
- [Arbitrum](../contracts/price-oracles/arbitrum.md)
- [Base](../contracts/price-oracles/base.md)
- [MegaETH](../contracts/price-oracles/megaeth.md)

Overview: [Price oracle contracts](../contracts/price-oracle.md)  
Source repo: [harbor-price-aggregators](https://github.com/baofinance/harbor-price-aggregators)

---

## Inventory row (required for every deployed oracle)

Add to the correct table on the chain page:

| Oracle Pair | Address | Status | Version | Rate Provider | Price Feed(s) | Formula | Markets using this feed |
|-------------|---------|--------|---------|---------------|---------------|---------|-------------------------|
| `BASE/QUOTE` | `0x…` | Active / Deprecated | v3 / v4 / v4 leverage | fxSAVE / wstETH / sUSDe / none | Chainlink … | single / double / multi / invert / leverage | `marketId`s or “none (predeploy)” |

### Field definitions

| Field | What to put |
| ----- | ----------- |
| **Oracle Pair** | External name (`fxUSD/GOLD`, `stETH/EUR`, `hsfxUSD-ETH/USD`). Prefer GOLD/SILVER over XAU/XAG for new rows; mark XAU/XAG as deprecated aliases if still on-chain |
| **Address** | Proxy (v3) or immutable (v4) from deploy scripts / verified explorer |
| **Status** | `Active` or `Deprecated` |
| **Version** | `v3` (UUPS via BaoFactory), `v4` (immutable), `v4 (leverage)` |
| **Rate Provider** | Vault/token that supplies exchange rate (fxSAVE, wstETH, sUSDe) or `—` for direct feeds |
| **Price Feed(s)** | Underlying Chainlink (or composite) feeds + invert/normalize notes |
| **Formula** | short: e.g. `rate × (1e18/ETHUSD)`, `ETHUSD/BTCUSD`, `sum(feeds)`, `rate × BTCUSD` (`invert=false` USD) |
| **Markets using this feed** | App `marketId`s and/or proxy prefixes (`ETH::fxUSD`) that read this oracle |

---

## Dedicated pair page (optional deep-dive)

Use only when a feed needs more than a table row (e.g. MAG7 composition, Harbor Yield peg oracles).

# <!-- TODO: fxUSD/SILVER Oracle -->

> **Status**: Active | Deprecated  
> **Chain**: Ethereum mainnet (1)  
> **Version**: v3 | v4 | v4 leverage  
> **Address**: `0x…`

## Summary

| | |
| --- | --- |
| **baseName / quoteName** | |
| **oracleName** | |
| **rateProvider** | address + type |
| **Formula** | |
| **Heartbeat / staleness** | 42s tolerance (v3 default) unless noted |

## Feeds

| Feed | Address | Role |
| ---- | ------- | ---- |
| | `0x…` | |

## Deployment

| | |
| --- | --- |
| **Repo path** | `harbor-price-aggregators` wiring file |
| **BaoFactory / salt** | if any |
| **Proxy / impl** | |

## Consumers

| Market page | Proxy / minter | Notes |
| ----------- | -------------- | ----- |
| [link](../../markets/…) | | |

## Aliases / deprecations

<!-- e.g. fxUSD/XAU deprecated in favor of fxUSD/GOLD -->

## Checklist

- [ ] Row added to chain inventory with **Markets using this feed** filled
- [ ] Market pages link this address (same hex as inventory)
- [ ] Deprecated aliases called out
- [ ] Open PRs / branches for new feeds noted in [Coverage](../coverage.md)
