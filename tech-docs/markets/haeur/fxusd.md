# fxUSD collateral (haEUR)

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-eur`

Mint **haEUR** and **hsFXUSD-EUR** using **fxUSD** via **fxSAVE** as collateral.

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | EUR |
| **Pegged token (ha)** | haEUR |
| **Leveraged token (hs)** | hsFXUSD-EUR |
| **Collateral (underlying)** | fxUSD |
| **Wrapped collateral** | fxSAVE |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `EUR::fxUSD::*` ; pegged `EUR::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `EUR::fxUSD::minter` | `0xDEFB2C04062350678965CBF38A216Cc50723B246` |
| **peggedToken** | `EUR::pegged` | `0x83Fd69E0FF5767972b46E61C6833408361bF7346` (haEUR) |
| **leveragedToken** | `EUR::fxUSD::leveraged` | `0x7A7C1f2502c19193C44662A2Aff51c2B76fDDAEA` (hsFXUSD-EUR) |
| **reservePool** | `EUR::fxUSD::reservePool` | `0x27cA37538358F90d45cAA886fB58CC08ffe2dD2f` |
| **stabilityPoolManager** | `EUR::fxUSD::stabilityPoolManager` | `0x756766756880ceA06270Fd507b09Ef32714Ec7C2` |
| **genesis** | `EUR::fxUSD::genesis` | `0xa9EB43Ed6Ba3B953a82741F3e226C1d6B029699b` |
| **priceOracle** | — | `0x305454F8B46Aa3485D8B350D8E832459974F5e9F` (fxUSD/EUR — [detail](../../contracts/price-oracles/mainnet/haeur/fxusd.md)) |
| **feeReceiver** | `EUR::fxUSD::minterFeeReceiver` | `0x43dfDB5059777A8B8819d8D8ff2c9ACCFEb766CB` |
| **stabilityPoolCollateral** | `EUR::fxUSD::stabilityPoolCollateral` | `0xe60054E6b518f67411834282cE1557381f050B13` |
| **stabilityPoolLeveraged** | `EUR::fxUSD::stabilityPoolLeveraged` | `0xc5e0dA7e0a178850438E5E97ed59b6eb2562e88E` |
| **collateralToken** | — | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | — | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |
| **genesisZap** | — | `0xE4f3Ce4F27f6bB520668F35101052831C80802ca` (GenesisUSDCZap_v4) |
| **peggedTokenZap** | — | `0x03Fc8dfE4DF3e7A826207157D41b1532191725e3` (MinterUSDCZap_v1) |
| **leveragedTokenZap** | — | `0x03Fc8dfE4DF3e7A826207157D41b1532191725e3` (MinterUSDCZap_v1) |

## Token details

### Pegged token (haEUR)

**Address:** `0x83Fd69E0FF5767972b46E61C6833408361bF7346` — EUR exposure.

### Leveraged token (hsFXUSD-EUR)

**Address:** `0x7A7C1f2502c19193C44662A2Aff51c2B76fDDAEA` — variable EUR exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `EUR::fxUSD::stabilityPoolCollateral` | `0xe60054E6b518f67411834282cE1557381f050B13` | fxSAVE / fxUSD |
| Sail (leveraged) | `EUR::fxUSD::stabilityPoolLeveraged` | `0xc5e0dA7e0a178850438E5E97ed59b6eb2562e88E` | hsFXUSD-EUR |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | fxUSD/EUR |
| **Address** | `0x305454F8B46Aa3485D8B350D8E832459974F5e9F` |
| **Rate provider** | fxSAVE |
| **Detail page** | [fxUSD/EUR](../../contracts/price-oracles/mainnet/haeur/fxusd.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **fxSAVE** / **fxUSD** directly — see [Zap contracts](../../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisUSDCZap_v4 | `0xE4f3Ce4F27f6bB520668F35101052831C80802ca` |
| Pegged / leveraged (minter) | MinterUSDCZap_v1 | `0x03Fc8dfE4DF3e7A826207157D41b1532191725e3` |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | fxSAVE |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 24271147 |
| **Deployment** | Mainnet (`startBlock`: 24271147) |

## Genesis (Maiden Voyage)

| Field | Value |
| ----- | ----- |
| **Start** | January 19, 2026 (`2026-01-19T15:21:11Z`) |
| **End** | February 2, 2026 (`2026-02-02T17:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [stETH](steth.md)

