# stETH/MCAP Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-mcap`

Mint **haMCAP** and **hsSTETH-MCAP** using **stETH** via **wstETH** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haMCAP** | Pegged token — crypto market-cap basket exposure |
| **hsSTETH-MCAP** | Leveraged token — variable MCAP exposure |

Collateral: **stETH** via **wstETH**.

| | |
| --- | --- |
| **Peg family** | MCAP |
| **Proxy key prefix** | `MCAP::stETH::*` ; pegged `MCAP::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`MCAP::stETH::minter`): `0xe37e34Ab0AaaabAc0e20c911349c1dEfAD0691B6`
- **peggedToken** (`MCAP::pegged`): `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` (haMCAP)
- **leveragedToken** (`MCAP::stETH::leveraged`): `0x4dc51cAa3551a9D01eebaA801c63b59A64028745` (hsSTETH-MCAP)
- **reservePool** (`MCAP::stETH::reservePool`): `0x9B7fFA713d504F4DdC4f54c6dF6b1a9971d8B728`
- **stabilityPoolManager** (`MCAP::stETH::stabilityPoolManager`): `0x1298ab1957ee023E228d57bE2db73494b649E52F`
- **genesis** (`MCAP::stETH::genesis`): `0xa6c02dE8E3150C6ffA9C80F98185d42653CB438d`
- **priceOracle**: `0x4fe6fa14db0D3C8a4709A4F3e37C1c862381859F` (stETH/MCAP — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver**: TBD (not in generic table for `MCAP::stETH::minterFeeReceiver`)
- **stabilityPoolCollateral** (`MCAP::stETH::stabilityPoolCollateral`): `0x4cFf4948A0EA73Ee109327b56da0bead8c323189`
- **stabilityPoolLeveraged** (`MCAP::stETH::stabilityPoolLeveraged`): `0x505bfC99D2FB1A1424b2A4AA81303346df4f27E9`
- **collateralToken**: `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH)
- **wrappedCollateralToken**: `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `MCAP::stETH::stabilityPoolCollateral` | `0x4cFf4948A0EA73Ee109327b56da0bead8c323189` | wstETH / stETH |
| Sail (leveraged) | `MCAP::stETH::stabilityPoolLeveraged` | `0x505bfC99D2FB1A1424b2A4AA81303346df4f27E9` | hsSTETH-MCAP |

## Price oracle

| | |
| --- | --- |
| **Pair** | stETH/MCAP |
| **Address** | `0x4fe6fa14db0D3C8a4709A4F3e37C1c862381859F` |
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

- [fxusd-mcap](./fxusd-mcap.md)

## Template

New markets: copy [Market page template](../templates/market.md).
