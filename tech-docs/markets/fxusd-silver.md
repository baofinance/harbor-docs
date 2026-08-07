# fxUSD/SILVER Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-silver`

Mint **haSILVER** and **hsFXUSD-SILVER** using **fxUSD** via **fxSAVE** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haSILVER** | Pegged token — silver (XAG) exposure |
| **hsFXUSD-SILVER** | Leveraged token — variable SILVER exposure |

Collateral: **fxUSD** via **fxSAVE**.

| | |
| --- | --- |
| **Peg family** | SILVER |
| **Proxy key prefix** | `SILVER::fxUSD::*` ; pegged `SILVER::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`SILVER::fxUSD::minter`): `0x177bb50574CDA129BDd0B0F50d4E061d38AA75Ef`
- **peggedToken** (`SILVER::pegged`): `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` (haSILVER)
- **leveragedToken** (`SILVER::fxUSD::leveraged`): `0x74692d22a0CB924e4299785cc299291e560dF9cf` (hsFXUSD-SILVER)
- **reservePool** (`SILVER::fxUSD::reservePool`): `0xDBF9F31795DAEa636e3e1305f897BFa8D2aA017d`
- **stabilityPoolManager** (`SILVER::fxUSD::stabilityPoolManager`): `0x1EF76C3f4B426dFeC271a8a3904035dE0A6E6d75`
- **genesis** (`SILVER::fxUSD::genesis`): `0x66d18B9Dd5d1cd51957DFea0e0373b54E06118C8`
- **priceOracle**: `0x14816ff286f2eA46AB48c3275401Fd4b1ef817B5` (fxUSD/SILVER — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver**: TBD (not in generic table for `SILVER::fxUSD::minterFeeReceiver`)
- **stabilityPoolCollateral** (`SILVER::fxUSD::stabilityPoolCollateral`): `0x7619664fe05c9cbDA5B622455856D7CA11Cb8800`
- **stabilityPoolLeveraged** (`SILVER::fxUSD::stabilityPoolLeveraged`): `0x24AEf2d27146497B18df180791424b1010bf1889`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `SILVER::fxUSD::stabilityPoolCollateral` | `0x7619664fe05c9cbDA5B622455856D7CA11Cb8800` | fxSAVE / fxUSD |
| Sail (leveraged) | `SILVER::fxUSD::stabilityPoolLeveraged` | `0x24AEf2d27146497B18df180791424b1010bf1889` | hsFXUSD-SILVER |

## Price oracle

| | |
| --- | --- |
| **Pair** | fxUSD/SILVER |
| **Address** | `0x14816ff286f2eA46AB48c3275401Fd4b1ef817B5` |
| **Rate provider** | fxSAVE |
| **Inventory** | [Mainnet price oracles](../contracts/price-oracles/mainnet.md) |

## Market parameters

| | |
| --- | --- |
| **Yield source** | fxSAVE |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock / genesis dates** | TBD — confirm in app config / deploy notes |

## Related markets

- [steth-silver](./steth-silver.md)

## Template

New markets: copy [Market page template](../templates/market.md).
