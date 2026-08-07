# fxUSD/GOLD Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-gold`

Mint **haGOLD** and **hsFXUSD-GOLD** using **fxUSD** via **fxSAVE** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haGOLD** | Pegged token — gold (XAU) exposure |
| **hsFXUSD-GOLD** | Leveraged token — variable GOLD exposure |

Collateral: **fxUSD** via **fxSAVE**.

| | |
| --- | --- |
| **Peg family** | GOLD |
| **Proxy key prefix** | `GOLD::fxUSD::*` ; pegged `GOLD::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`GOLD::fxUSD::minter`): `0x880600E0c803d836E305B7c242FC095Eed234A8f`
- **peggedToken** (`GOLD::pegged`): `0x5b66D86932aE5D9751da588d91D494950554061d` (haGOLD)
- **leveragedToken** (`GOLD::fxUSD::leveraged`): `0x85730Af3A7d7A872Ee1D84306E0575f1E00C0980` (hsFXUSD-GOLD)
- **reservePool** (`GOLD::fxUSD::reservePool`): `0xc033e81ED555D6db63A3E0Af9795454C7BdF094a`
- **stabilityPoolManager** (`GOLD::fxUSD::stabilityPoolManager`): `0x5b69069CC4012a96342B0FeCC28aD15bDE6447B5`
- **genesis** (`GOLD::fxUSD::genesis`): `0x2cbF457112Ef5A16cfcA10Fb173d56a5cc9DAa66`
- **priceOracle**: `0x1f7F62889E599E51b9e21B27d589Fa521516D147` (fxUSD/GOLD — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver** (`GOLD::fxUSD::minterFeeReceiver`): `0x8C5EF0342543A509e5548c71A66dE7D8A69c6B70`
- **stabilityPoolCollateral** (`GOLD::fxUSD::stabilityPoolCollateral`): `0xC1EF32d4B959F2200efDeDdedadA226461d14DaC`
- **stabilityPoolLeveraged** (`GOLD::fxUSD::stabilityPoolLeveraged`): `0x5bDED171f1c08B903b466593B0E022F9FdE8399c`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `GOLD::fxUSD::stabilityPoolCollateral` | `0xC1EF32d4B959F2200efDeDdedadA226461d14DaC` | fxSAVE / fxUSD |
| Sail (leveraged) | `GOLD::fxUSD::stabilityPoolLeveraged` | `0x5bDED171f1c08B903b466593B0E022F9FdE8399c` | hsFXUSD-GOLD |

## Price oracle

| | |
| --- | --- |
| **Pair** | fxUSD/GOLD |
| **Address** | `0x1f7F62889E599E51b9e21B27d589Fa521516D147` |
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

- [steth-gold](./steth-gold.md)

## Template

New markets: copy [Market page template](../templates/market.md).
