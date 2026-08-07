# stETH/GOLD Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-gold`

Mint **haGOLD** and **hsSTETH-GOLD** using **stETH** via **wstETH** as collateral.

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | GOLD |
| **Pegged token (ha)** | haGOLD |
| **Leveraged token (hs)** | hsSTETH-GOLD |
| **Collateral (underlying)** | stETH |
| **Wrapped collateral** | wstETH |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `GOLD::stETH::*` ; pegged `GOLD::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `GOLD::stETH::minter` | `0xB315DC4698DF45A477d8bb4B0Bc694C4D1Be91b5` |
| **peggedToken** | `GOLD::pegged` | `0x5b66D86932aE5D9751da588d91D494950554061d` (haGOLD) |
| **leveragedToken** | `GOLD::stETH::leveraged` | `0x94460C6477cdA339DA0e7E39f6Aa66EF047e2F6a` (hsSTETH-GOLD) |
| **reservePool** | `GOLD::stETH::reservePool` | `0x8224E5264FdD99547a21fFf34bDB60e78faB1609` |
| **stabilityPoolManager** | `GOLD::stETH::stabilityPoolManager` | `0x322b19DFBeF5F41d1FA6436886349EEE02408867` |
| **genesis** | `GOLD::stETH::genesis` | `0x8Ad6b177137A6c33070c27d98355717849Ce526c` |
| **priceOracle** | — | `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` (stETH/GOLD — [detail](../contracts/price-oracles/mainnet/steth-gold.md)) |
| **feeReceiver** | `GOLD::stETH::minterFeeReceiver` | TBD |
| **stabilityPoolCollateral** | `GOLD::stETH::stabilityPoolCollateral` | `0x215C28DcCe0041eF9a17277CA271F100d9F345CF` |
| **stabilityPoolLeveraged** | `GOLD::stETH::stabilityPoolLeveraged` | `0x2af96e906D568c92E53e96bB2878ce35E05dE69a` |
| **collateralToken** | — | `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH) |
| **wrappedCollateralToken** | — | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH) |
| **genesisZap** | — | `0xCDf5BdcD7A035C2F20782e607D4f9F8f26280f93` (GenesisETHZap_v4) |
| **peggedTokenZap** | — | `0x3ce5e801A89eA0AC36fC29C12562695d4E6F0fec` (MinterETHZap_v3) |
| **leveragedTokenZap** | — | `0x3ce5e801A89eA0AC36fC29C12562695d4E6F0fec` (MinterETHZap_v3) |

## Token details

### Pegged token (haGOLD)

**Address:** `0x5b66D86932aE5D9751da588d91D494950554061d` — gold (XAU) exposure.

### Leveraged token (hsSTETH-GOLD)

**Address:** `0x94460C6477cdA339DA0e7E39f6Aa66EF047e2F6a` — variable GOLD exposure with wstETH yield.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `GOLD::stETH::stabilityPoolCollateral` | `0x215C28DcCe0041eF9a17277CA271F100d9F345CF` | wstETH / stETH |
| Sail (leveraged) | `GOLD::stETH::stabilityPoolLeveraged` | `0x2af96e906D568c92E53e96bB2878ce35E05dE69a` | hsSTETH-GOLD |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | stETH/GOLD |
| **Address** | `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` |
| **Rate provider** | wstETH |
| **Detail page** | [stETH/GOLD](../contracts/price-oracles/mainnet/steth-gold.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **wstETH** / **stETH** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisETHZap_v4 | `0xCDf5BdcD7A035C2F20782e607D4f9F8f26280f93` |
| Pegged / leveraged (minter) | MinterETHZap_v3 | `0x3ce5e801A89eA0AC36fC29C12562695d4E6F0fec` |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | wstETH |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 0 (app placeholder) |
| **Deployment** | Mainnet (proxies live; app `startBlock` still 0) |

## Genesis (Maiden Voyage)

| Field | Value |
| ----- | ----- |
| **Start** | January 21, 2026 (`2026-01-21T00:00:00Z`) |
| **End** | February 23, 2026 (`2026-02-23T17:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [fxusd-gold](./fxusd-gold.md)
