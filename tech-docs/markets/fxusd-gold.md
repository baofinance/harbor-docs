# fxUSD/GOLD Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-gold`

Mint **haGOLD** and **hsFXUSD-GOLD** using **fxUSD** via **fxSAVE** as collateral.

## Market overview

| | |
| --- | --- |
| **Peg family** | GOLD |
| **Pegged token (ha)** | haGOLD |
| **Leveraged token (hs)** | hsFXUSD-GOLD |
| **Collateral (underlying)** | fxUSD |
| **Wrapped collateral** | fxSAVE |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `GOLD::fxUSD::*` ; pegged `GOLD::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `GOLD::fxUSD::minter` | `0x880600E0c803d836E305B7c242FC095Eed234A8f` |
| **peggedToken** | `GOLD::pegged` | `0x5b66D86932aE5D9751da588d91D494950554061d` (haGOLD) |
| **leveragedToken** | `GOLD::fxUSD::leveraged` | `0x85730Af3A7d7A872Ee1D84306E0575f1E00C0980` (hsFXUSD-GOLD) |
| **reservePool** | `GOLD::fxUSD::reservePool` | `0xc033e81ED555D6db63A3E0Af9795454C7BdF094a` |
| **stabilityPoolManager** | `GOLD::fxUSD::stabilityPoolManager` | `0x5b69069CC4012a96342B0FeCC28aD15bDE6447B5` |
| **genesis** | `GOLD::fxUSD::genesis` | `0x2cbF457112Ef5A16cfcA10Fb173d56a5cc9DAa66` |
| **priceOracle** | — | `0x1f7F62889E599E51b9e21B27d589Fa521516D147` (fxUSD/GOLD — [detail](../contracts/price-oracles/mainnet/fxusd-gold.md)) |
| **feeReceiver** | `GOLD::fxUSD::minterFeeReceiver` | `0x8C5EF0342543A509e5548c71A66dE7D8A69c6B70` |
| **stabilityPoolCollateral** | `GOLD::fxUSD::stabilityPoolCollateral` | `0xC1EF32d4B959F2200efDeDdedadA226461d14DaC` |
| **stabilityPoolLeveraged** | `GOLD::fxUSD::stabilityPoolLeveraged` | `0x5bDED171f1c08B903b466593B0E022F9FdE8399c` |
| **collateralToken** | — | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | — | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |
| **genesisZap** | — | `0x1048a287DDefF38E9A5c1e564A83f6978a2DC1eF` (GenesisUSDCZap_v4) |
| **peggedTokenZap** | — | `0xf0ff6D8d707D81d87caf2faa2447253f283f8873` (MinterUSDCZap_v3) |
| **leveragedTokenZap** | — | `0xf0ff6D8d707D81d87caf2faa2447253f283f8873` (MinterUSDCZap_v3) |

## Token details

### Pegged token (haGOLD)

**Address:** `0x5b66D86932aE5D9751da588d91D494950554061d` — gold (XAU) exposure.

### Leveraged token (hsFXUSD-GOLD)

**Address:** `0x85730Af3A7d7A872Ee1D84306E0575f1E00C0980` — variable GOLD exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

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
| **Detail page** | [fxUSD/GOLD](../contracts/price-oracles/mainnet/fxusd-gold.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **fxSAVE** / **fxUSD** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisUSDCZap_v4 | `0x1048a287DDefF38E9A5c1e564A83f6978a2DC1eF` |
| Pegged / leveraged (minter) | MinterUSDCZap_v3 | `0xf0ff6D8d707D81d87caf2faa2447253f283f8873` |

## Market parameters

| | |
| --- | --- |
| **Yield source** | fxSAVE |
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

- [steth-gold](./steth-gold.md)
