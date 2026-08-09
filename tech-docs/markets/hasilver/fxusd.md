# fxUSD collateral (haSILVER)

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-silver`

Mint **haSILVER** and **hsFXUSD-SILVER** using **fxUSD** via **fxSAVE** as collateral.

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | SILVER |
| **Pegged token (ha)** | haSILVER |
| **Leveraged token (hs)** | hsFXUSD-SILVER |
| **Collateral (underlying)** | fxUSD |
| **Wrapped collateral** | fxSAVE |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `SILVER::fxUSD::*` ; pegged `SILVER::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `SILVER::fxUSD::minter` | `0x177bb50574CDA129BDd0B0F50d4E061d38AA75Ef` |
| **peggedToken** | `SILVER::pegged` | `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` (haSILVER) |
| **leveragedToken** | `SILVER::fxUSD::leveraged` | `0x74692d22a0CB924e4299785cc299291e560dF9cf` (hsFXUSD-SILVER) |
| **reservePool** | `SILVER::fxUSD::reservePool` | `0xDBF9F31795DAEa636e3e1305f897BFa8D2aA017d` |
| **stabilityPoolManager** | `SILVER::fxUSD::stabilityPoolManager` | `0x1EF76C3f4B426dFeC271a8a3904035dE0A6E6d75` |
| **genesis** | `SILVER::fxUSD::genesis` | `0x66d18B9Dd5d1cd51957DFea0e0373b54E06118C8` |
| **priceOracle** | — | `0x14816ff286f2eA46AB48c3275401Fd4b1ef817B5` (fxUSD/SILVER — [detail](../../contracts/price-oracles/mainnet/hasilver/fxusd.md)) |
| **feeReceiver** | `SILVER::fxUSD::minterFeeReceiver` | TBD |
| **stabilityPoolCollateral** | `SILVER::fxUSD::stabilityPoolCollateral` | `0x7619664fe05c9cbDA5B622455856D7CA11Cb8800` |
| **stabilityPoolLeveraged** | `SILVER::fxUSD::stabilityPoolLeveraged` | `0x24AEf2d27146497B18df180791424b1010bf1889` |
| **collateralToken** | — | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | — | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |
| **genesisZap** | — | `0xd19d801a0427Dd91bcbAfB0FcA783a3231a749c8` (GenesisUSDCZap_v4) |
| **peggedTokenZap** | — | `0xfbB196c2C053F8a9E9d3e611a40D12aE450A4baB` (MinterUSDCZap_v3) |
| **leveragedTokenZap** | — | `0xfbB196c2C053F8a9E9d3e611a40D12aE450A4baB` (MinterUSDCZap_v3) |

## Token details

### Pegged token (haSILVER)

**Address:** `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` — silver (XAG) exposure.

### Leveraged token (hsFXUSD-SILVER)

**Address:** `0x74692d22a0CB924e4299785cc299291e560dF9cf` — variable SILVER exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `SILVER::fxUSD::stabilityPoolCollateral` | `0x7619664fe05c9cbDA5B622455856D7CA11Cb8800` | fxSAVE / fxUSD |
| Sail (leveraged) | `SILVER::fxUSD::stabilityPoolLeveraged` | `0x24AEf2d27146497B18df180791424b1010bf1889` | hsFXUSD-SILVER |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | fxUSD/SILVER |
| **Address** | `0x14816ff286f2eA46AB48c3275401Fd4b1ef817B5` |
| **Rate provider** | fxSAVE |
| **Detail page** | [fxUSD/SILVER](../../contracts/price-oracles/mainnet/hasilver/fxusd.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **fxSAVE** / **fxUSD** directly — see [Zap contracts](../../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisUSDCZap_v4 | `0xd19d801a0427Dd91bcbAfB0FcA783a3231a749c8` |
| Pegged / leveraged (minter) | MinterUSDCZap_v3 | `0xfbB196c2C053F8a9E9d3e611a40D12aE450A4baB` |

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

