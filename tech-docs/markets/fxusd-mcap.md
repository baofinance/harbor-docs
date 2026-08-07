# fxUSD/MCAP Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-mcap`

Mint **haMCAP** and **hsFXUSD-MCAP** using **fxUSD** via **fxSAVE** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haMCAP** | Pegged token — crypto market-cap basket exposure |
| **hsFXUSD-MCAP** | Leveraged token — variable MCAP exposure |

Collateral: **fxUSD** via **fxSAVE**.

| | |
| --- | --- |
| **Peg family** | MCAP |
| **Proxy key prefix** | `MCAP::fxUSD::*` ; pegged `MCAP::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`MCAP::fxUSD::minter`): `0x3d3EAe3a4Ee52ef703216c62EFEC3157694606dE`
- **peggedToken** (`MCAP::pegged`): `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` (haMCAP)
- **leveragedToken** (`MCAP::fxUSD::leveraged`): `0x410cA79c92665E7f502Cbc59e4f6edfCb97F5ddd` (hsFXUSD-MCAP)
- **reservePool** (`MCAP::fxUSD::reservePool`): `0xBC645796937B0883dAE66CE3f8211891Cbc0324C`
- **stabilityPoolManager** (`MCAP::fxUSD::stabilityPoolManager`): `0x52DC69cbdC6Ef508b7419A456dD36967DAEfD538`
- **genesis** (`MCAP::fxUSD::genesis`): `0x7Bfb831E6360D4600C7b9b200F8AcA6f89CecdA4`
- **priceOracle**: `0x88430c0F09A6D603c43E2816F2EA9Ab45dB7e1a8` (fxUSD/MCAP — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver**: TBD (not in generic table for `MCAP::fxUSD::minterFeeReceiver`)
- **stabilityPoolCollateral** (`MCAP::fxUSD::stabilityPoolCollateral`): `0x7928a145Eed1374f5594c799290419B80fCd03f0`
- **stabilityPoolLeveraged** (`MCAP::fxUSD::stabilityPoolLeveraged`): `0x8CF0C5F1394E137389D6dbfE91c56D00dEcdDAD8`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `MCAP::fxUSD::stabilityPoolCollateral` | `0x7928a145Eed1374f5594c799290419B80fCd03f0` | fxSAVE / fxUSD |
| Sail (leveraged) | `MCAP::fxUSD::stabilityPoolLeveraged` | `0x8CF0C5F1394E137389D6dbfE91c56D00dEcdDAD8` | hsFXUSD-MCAP |

## Price oracle

| | |
| --- | --- |
| **Pair** | fxUSD/MCAP |
| **Address** | `0x88430c0F09A6D603c43E2816F2EA9Ab45dB7e1a8` |
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

- [steth-mcap](./steth-mcap.md)

## Template

New markets: copy [Market page template](../templates/market.md).
