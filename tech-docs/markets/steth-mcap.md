# stETH/MCAP Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-mcap`

Mint **haMCAP** and **hsSTETH-MCAP** using **stETH** via **wstETH** as collateral.

## Market overview

| | |
| --- | --- |
| **Peg family** | MCAP |
| **Pegged token (ha)** | haMCAP |
| **Leveraged token (hs)** | hsSTETH-MCAP |
| **Collateral (underlying)** | stETH |
| **Wrapped collateral** | wstETH |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `MCAP::stETH::*` ; pegged `MCAP::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `MCAP::stETH::minter` | `0xe37e34Ab0AaaabAc0e20c911349c1dEfAD0691B6` |
| **peggedToken** | `MCAP::pegged` | `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` (haMCAP) |
| **leveragedToken** | `MCAP::stETH::leveraged` | `0x4dc51cAa3551a9D01eebaA801c63b59A64028745` (hsSTETH-MCAP) |
| **reservePool** | `MCAP::stETH::reservePool` | `0x9B7fFA713d504F4DdC4f54c6dF6b1a9971d8B728` |
| **stabilityPoolManager** | `MCAP::stETH::stabilityPoolManager` | `0x1298ab1957ee023E228d57bE2db73494b649E52F` |
| **genesis** | `MCAP::stETH::genesis` | `0xa6c02dE8E3150C6ffA9C80F98185d42653CB438d` |
| **priceOracle** | — | `0x4fe6fa14db0D3C8a4709A4F3e37C1c862381859F` (stETH/MCAP — [detail](../contracts/price-oracles/mainnet/steth-mcap.md)) |
| **feeReceiver** | `MCAP::stETH::minterFeeReceiver` | TBD |
| **stabilityPoolCollateral** | `MCAP::stETH::stabilityPoolCollateral` | `0x4cFf4948A0EA73Ee109327b56da0bead8c323189` |
| **stabilityPoolLeveraged** | `MCAP::stETH::stabilityPoolLeveraged` | `0x505bfC99D2FB1A1424b2A4AA81303346df4f27E9` |
| **collateralToken** | — | `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH) |
| **wrappedCollateralToken** | — | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH) |
| **genesisZap** | — | `none` |
| **peggedTokenZap** | — | `none` |
| **leveragedTokenZap** | — | `none` |

## Token details

### Pegged token (haMCAP)

**Address:** `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` — crypto market-cap basket exposure.

### Leveraged token (hsSTETH-MCAP)

**Address:** `0x4dc51cAa3551a9D01eebaA801c63b59A64028745` — variable MCAP exposure with wstETH yield.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

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
| **Detail page** | [stETH/MCAP](../contracts/price-oracles/mainnet/steth-mcap.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **wstETH** / **stETH** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | — | `none` |
| Pegged / leveraged (minter) | — | `none` |

## Market parameters

| | |
| --- | --- |
| **Yield source** | wstETH |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | TBD |
| **Deployment** | Ethereum mainnet |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | TBD |
| **End** | TBD |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [fxusd-mcap](./fxusd-mcap.md)
