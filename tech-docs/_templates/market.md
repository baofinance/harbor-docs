# <!-- TITLE e.g. fxUSD/SILVER Market -->

> **Status**: <!-- ✅ Deployed | Coming soon | Archived -->  
> **Chain**: <!-- Ethereum mainnet (1) | MegaETH (4326) -->  
> **App `marketId`**: <!-- fxusd-silver -->

<!-- One-sentence: mint haX / hsY using collateral via wrapped. -->

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | |
| **Pegged token (ha)** | |
| **Leveraged token (hs)** | |
| **Collateral (underlying)** | |
| **Wrapped collateral** | |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `PEG::COLLATERAL::*` ; pegged `PEG::pegged` |

## Contract addresses

Proxy keys / CREATE3: [Generic](../markets/generic.md). Source: Harbor `deployments/…/*.state.json`.

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | | `0x…` |
| **peggedToken** | | `0x…` |
| **leveragedToken** | | `0x…` |
| **reservePool** | | `0x…` |
| **stabilityPoolManager** | | `0x…` |
| **genesis** | | `0x…` |
| **priceOracle** | — | `0x…` — [pair page](../contracts/price-oracles/…) |
| **feeReceiver** | | `0x…` / TBD |
| **stabilityPoolCollateral** | | `0x…` |
| **stabilityPoolLeveraged** | | `0x…` |
| **collateralToken** | — | `0x…` |
| **wrappedCollateralToken** | — | `0x…` |
| **genesisZap** | — | `0x…` / none |
| **peggedTokenZap** | — | `0x…` / none |
| **leveragedTokenZap** | — | `0x…` / none |

## Token details

### Pegged token
### Leveraged token
### Collateral

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | | `0x…` | |
| Sail (leveraged) | | `0x…` | |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | |
| **Address** | `0x…` |
| **Rate provider** | |
| **Detail page** | [link](../contracts/price-oracles/…) |

## Zaps

Convenience only — prefer depositing main collateral ([Zap contracts](../contracts/zap.md)).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | | `0x…` / none |
| Pegged / leveraged (minter) | | `0x…` / none |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | |
| **Deployment** | |

## Genesis (Maiden Voyage)

| Field | Value |
| ----- | ----- |
| **Start** | |
| **End** | |
| **Distribution** | typically 50% ha / 50% hs |

## Related markets

- …
