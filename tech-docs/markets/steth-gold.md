# stETH/GOLD Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-gold`

Mint **haGOLD** and **hsSTETH-GOLD** using **stETH** via **wstETH** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haGOLD** | Pegged token — gold (XAU) exposure |
| **hsSTETH-GOLD** | Leveraged token — variable GOLD exposure |

Collateral: **stETH** via **wstETH**.

| | |
| --- | --- |
| **Peg family** | GOLD |
| **Proxy key prefix** | `GOLD::stETH::*` ; pegged `GOLD::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`GOLD::stETH::minter`): `0xB315DC4698DF45A477d8bb4B0Bc694C4D1Be91b5`
- **peggedToken** (`GOLD::pegged`): `0x5b66D86932aE5D9751da588d91D494950554061d` (haGOLD)
- **leveragedToken** (`GOLD::stETH::leveraged`): `0x94460C6477cdA339DA0e7E39f6Aa66EF047e2F6a` (hsSTETH-GOLD)
- **reservePool** (`GOLD::stETH::reservePool`): `0x8224E5264FdD99547a21fFf34bDB60e78faB1609`
- **stabilityPoolManager** (`GOLD::stETH::stabilityPoolManager`): `0x322b19DFBeF5F41d1FA6436886349EEE02408867`
- **genesis** (`GOLD::stETH::genesis`): `0x8Ad6b177137A6c33070c27d98355717849Ce526c`
- **priceOracle**: `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` (stETH/GOLD — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver**: TBD (not in generic table for `GOLD::stETH::minterFeeReceiver`)
- **stabilityPoolCollateral** (`GOLD::stETH::stabilityPoolCollateral`): `0x215C28DcCe0041eF9a17277CA271F100d9F345CF`
- **stabilityPoolLeveraged** (`GOLD::stETH::stabilityPoolLeveraged`): `0x2af96e906D568c92E53e96bB2878ce35E05dE69a`
- **collateralToken**: `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH)
- **wrappedCollateralToken**: `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `GOLD::stETH::stabilityPoolCollateral` | `0x215C28DcCe0041eF9a17277CA271F100d9F345CF` | wstETH / stETH |
| Sail (leveraged) | `GOLD::stETH::stabilityPoolLeveraged` | `0x2af96e906D568c92E53e96bB2878ce35E05dE69a` | hsSTETH-GOLD |

## Price oracle

| | |
| --- | --- |
| **Pair** | stETH/GOLD |
| **Address** | `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` |
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

- [fxusd-gold](./fxusd-gold.md)

## Template

New markets: copy [Market page template](../templates/market.md).
