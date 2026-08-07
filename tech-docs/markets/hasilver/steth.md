# stETH collateral (haSILVER)

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-silver`

Mint **haSILVER** and **hsSTETH-SILVER** using **stETH** via **wstETH** as collateral.

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | SILVER |
| **Pegged token (ha)** | haSILVER |
| **Leveraged token (hs)** | hsSTETH-SILVER |
| **Collateral (underlying)** | stETH |
| **Wrapped collateral** | wstETH |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `SILVER::stETH::*` ; pegged `SILVER::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `SILVER::stETH::minter` | `0x1c0067BEe039A293804b8BE951B368D2Ec65b3e9` |
| **peggedToken** | `SILVER::pegged` | `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` (haSILVER) |
| **leveragedToken** | `SILVER::stETH::leveraged` | `0x5BB5672be4553E648c1D20F093826faf77386d34` (hsSTETH-SILVER) |
| **reservePool** | `SILVER::stETH::reservePool` | `0x77AC9343621402B938d5A39727Da76891aFFA419` |
| **stabilityPoolManager** | `SILVER::stETH::stabilityPoolManager` | `0xbA6b54ED8D76bD4f6B4efD4f1f2344B2Ec386c3E` |
| **genesis** | `SILVER::stETH::genesis` | `0x8f655Ca32A1Fa8032955989c19e91886F26439dc` |
| **priceOracle** | — | `0x7223E17bD4527AcbE44644300eA0F09A4AeBC995` (stETH/SILVER — [detail](../../contracts/price-oracles/mainnet/hasilver/steth.md)) |
| **feeReceiver** | `SILVER::stETH::minterFeeReceiver` | TBD |
| **stabilityPoolCollateral** | `SILVER::stETH::stabilityPoolCollateral` | `0x1C9c1cF9aa9fc86dF980086CbC5a5607522cFc3E` |
| **stabilityPoolLeveraged** | `SILVER::stETH::stabilityPoolLeveraged` | `0x4C0F988b3c0C58F5ea323238E9d62B79582738e6` |
| **collateralToken** | — | `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH) |
| **wrappedCollateralToken** | — | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH) |
| **genesisZap** | — | `0xC128Cbf15920455569e1926C982567d2bE21AC50` (GenesisETHZap_v4) |
| **peggedTokenZap** | — | `0x68fafa07471e02d33706681d9e3e2160c1901b4c` (MinterETHZap_v3) |
| **leveragedTokenZap** | — | `0x68fafa07471e02d33706681d9e3e2160c1901b4c` (MinterETHZap_v3) |

## Token details

### Pegged token (haSILVER)

**Address:** `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` — silver (XAG) exposure.

### Leveraged token (hsSTETH-SILVER)

**Address:** `0x5BB5672be4553E648c1D20F093826faf77386d34` — variable SILVER exposure with wstETH yield.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `SILVER::stETH::stabilityPoolCollateral` | `0x1C9c1cF9aa9fc86dF980086CbC5a5607522cFc3E` | wstETH / stETH |
| Sail (leveraged) | `SILVER::stETH::stabilityPoolLeveraged` | `0x4C0F988b3c0C58F5ea323238E9d62B79582738e6` | hsSTETH-SILVER |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | stETH/SILVER |
| **Address** | `0x7223E17bD4527AcbE44644300eA0F09A4AeBC995` |
| **Rate provider** | wstETH |
| **Detail page** | [stETH/SILVER](../../contracts/price-oracles/mainnet/hasilver/steth.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **wstETH** / **stETH** directly — see [Zap contracts](../../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisETHZap_v4 | `0xC128Cbf15920455569e1926C982567d2bE21AC50` |
| Pegged / leveraged (minter) | MinterETHZap_v3 | `0x68fafa07471e02d33706681d9e3e2160c1901b4c` |

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
| **Start** | February 1, 2026 (`2026-02-01T00:00:00Z`, app note: placeholder) |
| **End** | February 23, 2026 (`2026-02-23T17:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [fxUSD](fxusd.md)

