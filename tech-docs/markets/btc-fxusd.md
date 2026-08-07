# fxUSD/BTC Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `btc-fxusd`

Mint **haBTC** and **hsFXUSD-BTC** using **fxUSD** via **fxSAVE** as collateral.

## Market overview

| | |
| --- | --- |
| **Peg family** | BTC |
| **Pegged token (ha)** | haBTC |
| **Leveraged token (hs)** | hsFXUSD-BTC |
| **Collateral (underlying)** | fxUSD |
| **Wrapped collateral** | fxSAVE |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `BTC::fxUSD::*` ; pegged `BTC::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `BTC::fxUSD::minter` | `0x33e32ff4d0677862fa31582CC654a25b9b1e4888` |
| **peggedToken** | `BTC::pegged` | `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` (haBTC) |
| **leveragedToken** | `BTC::fxUSD::leveraged` | `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B` (hsFXUSD-BTC) |
| **reservePool** | `BTC::fxUSD::reservePool` | `0xfDE46D4425138aA01319bB8587Cb935a0393DfE3` |
| **stabilityPoolManager** | `BTC::fxUSD::stabilityPoolManager` | `0x768E0a386e1972eB5995429Fe21E7aC0f22F516e` |
| **genesis** | `BTC::fxUSD::genesis` | `0x42cc9a19b358a2A918f891D8a6199d8b05F0BC1C` |
| **priceOracle** | — | `0x8F76a260c5D21586aFfF18f880FFC808D0524A73` (fxUSD/BTC — [detail](../contracts/price-oracles/mainnet/fxusd-btc.md)) |
| **feeReceiver** | `BTC::fxUSD::minterFeeReceiver` | `0x70DdA12032335656b63435840Cd55ff7A19dDAb7` |
| **stabilityPoolCollateral** | `BTC::fxUSD::stabilityPoolCollateral` | `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49` |
| **stabilityPoolLeveraged** | `BTC::fxUSD::stabilityPoolLeveraged` | `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40` |
| **collateralToken** | — | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | — | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |
| **genesisZap** | — | `0xF012a1BA66a411404FEae0a2AeD68dEB18D7de32` (GenesisUSDCZap_v2) |
| **peggedTokenZap** | — | `0x7e4f98217A085F1a06332EDff805513b6Ea79357` (MinterUSDCZap_v3) |
| **leveragedTokenZap** | — | `0x7e4f98217A085F1a06332EDff805513b6Ea79357` (MinterUSDCZap_v3) |

## Token details

### Pegged token (haBTC)

**Address:** `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` — pegged BTC exposure (shared with stETH/BTC).

### Leveraged token (hsFXUSD-BTC)

**Address:** `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B` — variable BTC exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `BTC::fxUSD::stabilityPoolCollateral` | `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49` | fxSAVE / fxUSD |
| Sail (leveraged) | `BTC::fxUSD::stabilityPoolLeveraged` | `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40` | hsFXUSD-BTC |

## Price oracle

| | |
| --- | --- |
| **Pair** | fxUSD/BTC |
| **Address** | `0x8F76a260c5D21586aFfF18f880FFC808D0524A73` |
| **Rate provider** | fxSAVE |
| **Detail page** | [fxUSD/BTC](../contracts/price-oracles/mainnet/fxusd-btc.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **fxSAVE** / **fxUSD** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisUSDCZap_v2 | `0xF012a1BA66a411404FEae0a2AeD68dEB18D7de32` |
| Pegged / leveraged (minter) | MinterUSDCZap_v3 | `0x7e4f98217A085F1a06332EDff805513b6Ea79357` |

## Market parameters

| | |
| --- | --- |
| **Yield source** | fxSAVE |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 24049375 |
| **Deployment** | Mainnet, December 2025 |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | December 19, 2025 |
| **End** | January 4, 2026 |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [btc-steth](./btc-steth.md)
- [eth-fxsave](./eth-fxsave.md)
