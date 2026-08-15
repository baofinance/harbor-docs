# Oracle adapters

**Status:** specification ready; **no Harbor-maintained Chainlink-compatible adapter is deployed** yet. Do not point production consumers at a Harbor aggregator as if it were AggregatorV3.

Checked in [`harbor-price-aggregators`](https://github.com/baofinance/harbor-price-aggregators): feeds **consume** AggregatorV3 / Chainlink upstreams to build Harbor `latestAnswer()`. There is still **no** outbound Harbor→`latestRoundData` adapter contract for external protocols.

When eng deploys outbound adapters, addresses land in the table below and in [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json) (under a future `oracleAdapters` key). Until then, call Harbor views directly — see [Pricing](./pricing.md).

## Problem

| Consumer expects | Harbor aggregator provides |
| ---------------- | -------------------------- |
| `latestRoundData()` → `(roundId, answer, startedAt, updatedAt, answeredInRound)` | `latestAnswer()` → four `uint256`s (min/max price, min/max wrapped rate), 18 decimals |
| Often 8-decimal USD answers | 18-decimal Harbor units |
| `decimals()`, `description()`, `version()` | `baseName()`, `quoteName()`, `oracleName()`, `version()` |

External protocols that only speak **Chainlink aggregator** need a thin adapter. Harbor token ERC-20s also do **not** document a `price()` method — wrap **minter** `peggedTokenPrice` / `leveragedTokenPrice` if you need a token-priced feed.

## Intended adapter shapes (when engineered)

1. **HarborAggregator → AggregatorV3**  
   - Reads `latestAnswer()`.  
   - Picks a documented component (e.g. mid underlying price, or price × rate / 1e18).  
   - Scales to 8 decimals if required.  
   - Synthesizes round metadata (block timestamp; round id policy TBD by eng).  
   - Forwards staleness: if Harbor already reverted on heartbeat, the adapter should revert too.

2. **Minter price → AggregatorV3 or `price()`**  
   - `peggedTokenPrice()` or `leveragedTokenPrice()` (18 decimals).  
   - Optional ERC-20 `price()` wrapper for aggregators that call the token.

## Deploy inventory (Ethereum mainnet)

| Adapter | Source | Export | Decimals | Address | Notes |
| ------- | ------ | ------ | -------- | ------- | ----- |
| — | — | — | — | *not deployed* | Spec only |

Eng checklist when shipping:

- [ ] Adapter contract + CREATE3 salt / proxy policy  
- [ ] Per-market or shared deploy list (fill table above)  
- [ ] Document which `latestAnswer` component (or minter price) is exported  
- [ ] Add addresses to docs package + `@harbor/sdk` address book  
- [ ] Optional: SDK `getChainlinkStylePrice(marketId)` helper  

Track alongside [Price oracles](../contracts/price-oracle.md) and [Pricing](./pricing.md).

## Until adapters exist

- Call Harbor `latestAnswer()` / minter views directly (this is the supported integration).  
- Or compose Chainlink feeds yourself using the pair page formula — you then own staleness and rate-provider risk.

:::note Graphics (design)
Placeholder: adapter box between Harbor aggregator and a Chainlink-style consumer. Design team to supply.
:::
