# fxUSD collateral (haMCAP)

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-mcap`

Mint **haMCAP** and **hsFXUSD-MCAP** using **fxUSD** via **fxSAVE** as collateral.

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | MCAP |
| **Pegged token (ha)** | haMCAP |
| **Leveraged token (hs)** | hsFXUSD-MCAP |
| **Collateral (underlying)** | fxUSD |
| **Wrapped collateral** | fxSAVE |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `MCAP::fxUSD::*` ; pegged `MCAP::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `MCAP::fxUSD::minter` | `0x3d3EAe3a4Ee52ef703216c62EFEC3157694606dE` |
| **peggedToken** | `MCAP::pegged` | `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` (haMCAP) |
| **leveragedToken** | `MCAP::fxUSD::leveraged` | `0x410cA79c92665E7f502Cbc59e4f6edfCb97F5ddd` (hsFXUSD-MCAP) |
| **reservePool** | `MCAP::fxUSD::reservePool` | `0xBC645796937B0883dAE66CE3f8211891Cbc0324C` |
| **stabilityPoolManager** | `MCAP::fxUSD::stabilityPoolManager` | `0x52DC69cbdC6Ef508b7419A456dD36967DAEfD538` |
| **genesis** | `MCAP::fxUSD::genesis` | `0x7Bfb831E6360D4600C7b9b200F8AcA6f89CecdA4` |
| **priceOracle** | — | `0x88430c0F09A6D603c43E2816F2EA9Ab45dB7e1a8` (fxUSD/MCAP — [detail](../../contracts/price-oracles/mainnet/hamcap/fxusd.md)) |
| **feeReceiver** | `MCAP::fxUSD::minterFeeReceiver` | TBD |
| **stabilityPoolCollateral** | `MCAP::fxUSD::stabilityPoolCollateral` | `0x7928a145Eed1374f5594c799290419B80fCd03f0` |
| **stabilityPoolLeveraged** | `MCAP::fxUSD::stabilityPoolLeveraged` | `0x8CF0C5F1394E137389D6dbfE91c56D00dEcdDAD8` |
| **collateralToken** | — | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | — | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |
| **genesisZap** | — | `none` |
| **peggedTokenZap** | — | `none` |
| **leveragedTokenZap** | — | `none` |

## Token details

### Pegged token (haMCAP)

**Address:** `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` — crypto market-cap basket exposure.

### Leveraged token (hsFXUSD-MCAP)

**Address:** `0x410cA79c92665E7f502Cbc59e4f6edfCb97F5ddd` — variable MCAP exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `MCAP::fxUSD::stabilityPoolCollateral` | `0x7928a145Eed1374f5594c799290419B80fCd03f0` | fxSAVE / fxUSD |
| Sail (leveraged) | `MCAP::fxUSD::stabilityPoolLeveraged` | `0x8CF0C5F1394E137389D6dbfE91c56D00dEcdDAD8` | hsFXUSD-MCAP |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | fxUSD/MCAP |
| **Address** | `0x88430c0F09A6D603c43E2816F2EA9Ab45dB7e1a8` |
| **Rate provider** | fxSAVE |
| **Detail page** | [fxUSD/MCAP](../../contracts/price-oracles/mainnet/hamcap/fxusd.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **fxSAVE** / **fxUSD** directly — see [Zap contracts](../../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | — | `none` |
| Pegged / leveraged (minter) | — | `none` |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | fxSAVE |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 0 (app placeholder) |
| **Deployment** | Mainnet (proxies live; app `startBlock` still 0) |

## Genesis (Maiden Voyage)

| Field | Value |
| ----- | ----- |
| **Start** | February 1, 2026 (`2026-02-01T00:00:00Z`; prior voyage window; product surface paused — to relaunch) |
| **End** | February 23, 2026 (`2026-02-23T17:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [stETH](steth.md)

