# Market page template

Copy this file to `tech-docs/markets/<id>.md` (e.g. `fxusd-silver.md`), fill every `TODO` / `TBD`, then add the page to [`sidebars-tech.ts`](../../sidebars-tech.ts) under **Markets**.

Use addresses from:

1. [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) (or MegaETH state file)
2. [Generic → Mainnet proxy table](../markets/generic.md#mainnet-proxy-table)
3. App config: [`harbor-app` `src/config/markets.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/markets.ts)
4. Oracles: [Mainnet price oracles](../contracts/price-oracles/mainnet.md) (or chain page)

---

# <!-- TODO: Title, e.g. fxUSD/SILVER Market -->

> **Status**: <!-- TODO: ✅ Deployed | Genesis active | Coming soon | Archived -->  
> **Chain**: <!-- TODO: Ethereum mainnet (1) | MegaETH (4326) | … -->  
> **App `marketId`**: <!-- TODO: e.g. `fxusd-silver` -->

<!-- One-sentence description: mint haX / hsY using collateral Z. -->

## Market overview

| | |
| --- | --- |
| **Peg family** | <!-- TODO: ETH / BTC / EUR / GOLD / SILVER / MCAP / USD --> |
| **Pegged token (ha)** | <!-- TODO: symbol + name --> |
| **Leveraged token (hs)** | <!-- TODO: symbol + name --> |
| **Collateral (underlying)** | <!-- TODO: fxUSD / stETH / … --> |
| **Wrapped collateral** | <!-- TODO: fxSAVE / wstETH / … --> |
| **Proxy salt prefix** | `harbor_v1` <!-- or harbor_megaeth_v1 --> |
| **Proxy key prefix** | <!-- TODO: e.g. `SILVER::fxUSD::*` ; pegged `SILVER::pegged` --> |

## Contract addresses

Proxy keys and CREATE3 salts: [Generic markets](../markets/generic.md). Source of truth: Harbor `deployments/…/*.state.json`.

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `TODO::collateral::minter` | `0x…` |
| **peggedToken** | `TODO::pegged` | `0x…` |
| **leveragedToken** | `TODO::collateral::leveraged` | `0x…` |
| **reservePool** | `TODO::collateral::reservePool` | `0x…` |
| **stabilityPoolManager** | `TODO::collateral::stabilityPoolManager` | `0x…` |
| **stabilityPoolCollateral** | `TODO::collateral::stabilityPoolCollateral` | `0x…` |
| **stabilityPoolLeveraged** | `TODO::collateral::stabilityPoolLeveraged` | `0x…` |
| **genesis** | `TODO::collateral::genesis` | `0x…` |
| **feeReceiver** (minter) | `TODO::collateral::minterFeeReceiver` | `0x…` / TBD |
| **priceOracle** (market) | — | `0x…` — link [oracle inventory](../contracts/price-oracles/mainnet.md) |
| **collateralToken** | — | `0x…` |
| **wrappedCollateralToken** | — | `0x…` |

### Optional helpers

| Helper | Address | Notes |
| ------ | ------- | ----- |
| **genesisZap** | `0x…` / none | Prefer main collateral; zaps are convenience — [Supporting Features](/supporting-features) (product docs) |
| **peggedTokenZap** / **leveragedTokenZap** | `0x…` / none | Same |

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `…::stabilityPoolCollateral` | `0x…` | wrapped / underlying collateral |
| Sail (leveraged) | `…::stabilityPoolLeveraged` | `0x…` | hsTOKEN |

## Price oracle

| | |
| --- | --- |
| **Pair name** | <!-- e.g. fxUSD/SILVER --> |
| **Address** | `0x…` |
| **Inventory** | [Mainnet](../contracts/price-oracles/mainnet.md) / [Arbitrum](../contracts/price-oracles/arbitrum.md) / … |
| **Rate provider** | fxSAVE / wstETH / … |
| **Feeds** | Chainlink … |
| **Consumers** | This market’s minter (+ any shared ha markets) |

## Market parameters

| | |
| --- | --- |
| **Yield source** | fxSAVE / wstETH / … |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** / deploy time | TBD |
| **App flags** | `anchorActive` / `sailActive` / `genesisActive` / `status` |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | TBD |
| **End** | TBD / completed |
| **Distribution** | typically 50% ha / 50% hs at launch (confirm in app config) |

## Related markets

<!-- Markets that share the same haTOKEN pegged address -->

- …

## Checklist before merge

- [ ] Addresses match `*.state.json` and generic table
- [ ] Oracle address matches price-oracles inventory (not a stale alias)
- [ ] Sidebar entry added
- [ ] Status line matches app (`coming-soon` vs live)
