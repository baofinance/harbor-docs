# stETH/SILVER Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-silver`

Mint **haSILVER** and **hsSTETH-SILVER** using **stETH** via **wstETH** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haSILVER** | Pegged token — silver (XAG) exposure |
| **hsSTETH-SILVER** | Leveraged token — variable SILVER exposure |

Collateral: **stETH** via **wstETH**.

| | |
| --- | --- |
| **Peg family** | SILVER |
| **Proxy key prefix** | `SILVER::stETH::*` ; pegged `SILVER::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`SILVER::stETH::minter`): `0x1c0067BEe039A293804b8BE951B368D2Ec65b3e9`
- **peggedToken** (`SILVER::pegged`): `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` (haSILVER)
- **leveragedToken** (`SILVER::stETH::leveraged`): `0x5BB5672be4553E648c1D20F093826faf77386d34` (hsSTETH-SILVER)
- **reservePool** (`SILVER::stETH::reservePool`): `0x77AC9343621402B938d5A39727Da76891aFFA419`
- **stabilityPoolManager** (`SILVER::stETH::stabilityPoolManager`): `0xbA6b54ED8D76bD4f6B4efD4f1f2344B2Ec386c3E`
- **genesis** (`SILVER::stETH::genesis`): `0x8f655Ca32A1Fa8032955989c19e91886F26439dc`
- **priceOracle**: `0x7223E17bD4527AcbE44644300eA0F09A4AeBC995` (stETH/SILVER — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver**: TBD (not in generic table for `SILVER::stETH::minterFeeReceiver`)
- **stabilityPoolCollateral** (`SILVER::stETH::stabilityPoolCollateral`): `0x1C9c1cF9aa9fc86dF980086CbC5a5607522cFc3E`
- **stabilityPoolLeveraged** (`SILVER::stETH::stabilityPoolLeveraged`): `0x4C0F988b3c0C58F5ea323238E9d62B79582738e6`
- **collateralToken**: `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH)
- **wrappedCollateralToken**: `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `SILVER::stETH::stabilityPoolCollateral` | `0x1C9c1cF9aa9fc86dF980086CbC5a5607522cFc3E` | wstETH / stETH |
| Sail (leveraged) | `SILVER::stETH::stabilityPoolLeveraged` | `0x4C0F988b3c0C58F5ea323238E9d62B79582738e6` | hsSTETH-SILVER |

## Price oracle

| | |
| --- | --- |
| **Pair** | stETH/SILVER |
| **Address** | `0x7223E17bD4527AcbE44644300eA0F09A4AeBC995` |
| **Rate provider** | wstETH |
| **Inventory** | [Mainnet price oracles](../contracts/price-oracles/mainnet.md) |

## Market parameters

| | |
| --- | --- |
| **Yield source** | wstETH |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock / genesis dates** | TBD — confirm in app config / deploy notes |

## Related markets

- [fxusd-silver](./fxusd-silver.md)

## Template

New markets: copy [Market page template](../templates/market.md).
