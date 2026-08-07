# stETH/BTC Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `btc-steth`

Mint **haBTC** and **hsSTETH-BTC** using **stETH** via **wstETH** as collateral.

## Market overview

| | |
| --- | --- |
| **Peg family** | BTC |
| **Pegged token (ha)** | haBTC |
| **Leveraged token (hs)** | hsSTETH-BTC |
| **Collateral (underlying)** | stETH |
| **Wrapped collateral** | wstETH |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `BTC::stETH::*` ; pegged `BTC::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `BTC::stETH::minter` | `0xF42516EB885E737780EB864dd07cEc8628000919` |
| **peggedToken** | `BTC::pegged` | `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` (haBTC) |
| **leveragedToken** | `BTC::stETH::leveraged` | `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD` (hsSTETH-BTC) |
| **reservePool** | `BTC::stETH::reservePool` | `0x515ECa19Ac381b0f37D616F99628136906fC5355` |
| **stabilityPoolManager** | `BTC::stETH::stabilityPoolManager` | `0x5e9Bcaa1EDfD665c09a9e6693B447581d61A85A1` |
| **genesis** | `BTC::stETH::genesis` | `0xc64Fc46eED431e92C1b5e24DC296b5985CE6Cc00` |
| **priceOracle** | — | `0xE370289aF2145A5B2F0F7a4a900eBfD478A156dB` (stETH/BTC — [detail](../contracts/price-oracles/mainnet/steth-btc.md)) |
| **feeReceiver** | `BTC::stETH::minterFeeReceiver` | `0xc3a97138a5aDCC7d28A1375E28EC3440aeaeDF3e` |
| **stabilityPoolCollateral** | `BTC::stETH::stabilityPoolCollateral` | `0x667Ceb303193996697A5938cD6e17255EeAcef51` |
| **stabilityPoolLeveraged** | `BTC::stETH::stabilityPoolLeveraged` | `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013` |
| **collateralToken** | — | `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH) |
| **wrappedCollateralToken** | — | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH) |
| **genesisZap** | — | `0x8Ee0D6AD1d15b3515Ba81CCE16Bba344Deea6781` (GenesisETHZap_v3) |
| **peggedTokenZap** | — | `0x9Af8FBF66Bf3645f505D58614D7a13D411b99907` (MinterETHZap_v3) |
| **leveragedTokenZap** | — | `0x9Af8FBF66Bf3645f505D58614D7a13D411b99907` (MinterETHZap_v3) |

## Token details

### Pegged token (haBTC)

**Address:** `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` — pegged BTC exposure (shared with fxUSD/BTC).

### Leveraged token (hsSTETH-BTC)

**Address:** `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD` — variable BTC exposure with wstETH yield.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `BTC::stETH::stabilityPoolCollateral` | `0x667Ceb303193996697A5938cD6e17255EeAcef51` | wstETH / stETH |
| Sail (leveraged) | `BTC::stETH::stabilityPoolLeveraged` | `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013` | hsSTETH-BTC |

## Price oracle

| | |
| --- | --- |
| **Pair** | stETH/BTC |
| **Address** | `0xE370289aF2145A5B2F0F7a4a900eBfD478A156dB` |
| **Rate provider** | wstETH |
| **Detail page** | [stETH/BTC](../contracts/price-oracles/mainnet/steth-btc.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **wstETH** / **stETH** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisETHZap_v3 | `0x8Ee0D6AD1d15b3515Ba81CCE16Bba344Deea6781` |
| Pegged / leveraged (minter) | MinterETHZap_v3 | `0x9Af8FBF66Bf3645f505D58614D7a13D411b99907` |

## Market parameters

| | |
| --- | --- |
| **Yield source** | wstETH |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 24049273 |
| **Deployment** | Mainnet, December 2025 |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | December 19, 2025 |
| **End** | January 4, 2026 |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [btc-fxusd](./btc-fxusd.md)
