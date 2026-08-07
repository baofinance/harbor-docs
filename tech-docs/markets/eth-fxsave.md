# fxUSD/ETH Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `eth-fxusd`

Mint **haETH** and **hsFXUSD-ETH** using **fxUSD** via **fxSAVE** as collateral.

## Market overview

| | |
| --- | --- |
| **Peg family** | ETH |
| **Pegged token (ha)** | haETH |
| **Leveraged token (hs)** | hsFXUSD-ETH |
| **Collateral (underlying)** | fxUSD |
| **Wrapped collateral** | fxSAVE |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `ETH::fxUSD::*` ; pegged `ETH::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `ETH::fxUSD::minter` | `0xd6E2F8e57b4aFB51C6fA4cbC012e1cE6aEad989F` |
| **peggedToken** | `ETH::pegged` | `0x7A53EBc85453DD006824084c4f4bE758FcF8a5B5` (haETH) |
| **leveragedToken** | `ETH::fxUSD::leveraged` | `0x0Cd6BB1a0cfD95e2779EDC6D17b664B481f2EB4C` (hsFXUSD-ETH) |
| **reservePool** | `ETH::fxUSD::reservePool` | `0x7A5c4ca972CE2168d5215d252946dDbd1cAd2015` |
| **stabilityPoolManager** | `ETH::fxUSD::stabilityPoolManager` | `0xE39165aDE355988EFb24dA4f2403971101134CAB` |
| **genesis** | `ETH::fxUSD::genesis` | `0xC9df4f62474Cf6cdE6c064DB29416a9F4f27EBdC` |
| **priceOracle** | — | `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097` (fxUSD/ETH — [detail](../contracts/price-oracles/mainnet/fxusd-eth.md)) |
| **feeReceiver** | `ETH::fxUSD::minterFeeReceiver` | `0xdC903fe5ebCE440f22578D701b95424363D20881` |
| **stabilityPoolCollateral** | `ETH::fxUSD::stabilityPoolCollateral` | `0x1F985CF7C10A81DE1940da581208D2855D263D72` |
| **stabilityPoolLeveraged** | `ETH::fxUSD::stabilityPoolLeveraged` | `0x438B29EC7a1770dDbA37D792F1A6e76231Ef8E06` |
| **collateralToken** | — | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | — | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |
| **genesisZap** | — | `0x424D373141a845eB2822B2a8e5ED0f529Ece4F7a` (GenesisUSDCZap_v2) |
| **peggedTokenZap** | — | `0x81253f3Fc43D5e399610beE4D7a235826A7663b8` (MinterUSDCZap_v3) |
| **leveragedTokenZap** | — | `0x81253f3Fc43D5e399610beE4D7a235826A7663b8` (MinterUSDCZap_v3) |

## Token details

### Pegged token (haETH)

**Address:** `0x7A53EBc85453DD006824084c4f4bE758FcF8a5B5` — pegged ETH exposure.

### Leveraged token (hsFXUSD-ETH)

**Address:** `0x0Cd6BB1a0cfD95e2779EDC6D17b664B481f2EB4C` — variable ETH exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `ETH::fxUSD::stabilityPoolCollateral` | `0x1F985CF7C10A81DE1940da581208D2855D263D72` | fxSAVE / fxUSD |
| Sail (leveraged) | `ETH::fxUSD::stabilityPoolLeveraged` | `0x438B29EC7a1770dDbA37D792F1A6e76231Ef8E06` | hsFXUSD-ETH |

## Price oracle

| | |
| --- | --- |
| **Pair** | fxUSD/ETH |
| **Address** | `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097` |
| **Rate provider** | fxSAVE |
| **Detail page** | [fxUSD/ETH](../contracts/price-oracles/mainnet/fxusd-eth.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **fxSAVE** / **fxUSD** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisUSDCZap_v2 | `0x424D373141a845eB2822B2a8e5ED0f529Ece4F7a` |
| Pegged / leveraged (minter) | MinterUSDCZap_v3 | `0x81253f3Fc43D5e399610beE4D7a235826A7663b8` |

## Market parameters

| | |
| --- | --- |
| **Yield source** | fxSAVE |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 24049488 |
| **Deployment** | Mainnet, December 2025 (`startBlock`: 24049488) |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | December 19, 2025 (`2025-12-19T22:00:59Z`) |
| **End** | January 4, 2026 (`2026-01-04T20:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [btc-fxusd](./btc-fxusd.md)
- [btc-steth](./btc-steth.md)
