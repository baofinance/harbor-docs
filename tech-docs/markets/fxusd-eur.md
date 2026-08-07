# fxUSD/EUR Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `fxusd-eur`

Mint **haEUR** and **hsFXUSD-EUR** using **fxUSD** via **fxSAVE** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haEUR** | Pegged token — EUR exposure |
| **hsFXUSD-EUR** | Leveraged token — variable EUR exposure |

Collateral: **fxUSD** via **fxSAVE**.

| | |
| --- | --- |
| **Peg family** | EUR |
| **Proxy key prefix** | `EUR::fxUSD::*` ; pegged `EUR::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`EUR::fxUSD::minter`): `0xDEFB2C04062350678965CBF38A216Cc50723B246`
- **peggedToken** (`EUR::pegged`): `0x83Fd69E0FF5767972b46E61C6833408361bF7346` (haEUR)
- **leveragedToken** (`EUR::fxUSD::leveraged`): `0x7A7C1f2502c19193C44662A2Aff51c2B76fDDAEA` (hsFXUSD-EUR)
- **reservePool** (`EUR::fxUSD::reservePool`): `0x27cA37538358F90d45cAA886fB58CC08ffe2dD2f`
- **stabilityPoolManager** (`EUR::fxUSD::stabilityPoolManager`): `0x756766756880ceA06270Fd507b09Ef32714Ec7C2`
- **genesis** (`EUR::fxUSD::genesis`): `0xa9EB43Ed6Ba3B953a82741F3e226C1d6B029699b`
- **priceOracle**: `0x305454F8B46Aa3485D8B350D8E832459974F5e9F` (fxUSD/EUR — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver** (`EUR::fxUSD::minterFeeReceiver`): `0x43dfDB5059777A8B8819d8D8ff2c9ACCFEb766CB`
- **stabilityPoolCollateral** (`EUR::fxUSD::stabilityPoolCollateral`): `0xe60054E6b518f67411834282cE1557381f050B13`
- **stabilityPoolLeveraged** (`EUR::fxUSD::stabilityPoolLeveraged`): `0xc5e0dA7e0a178850438E5E97ed59b6eb2562e88E`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `EUR::fxUSD::stabilityPoolCollateral` | `0xe60054E6b518f67411834282cE1557381f050B13` | fxSAVE / fxUSD |
| Sail (leveraged) | `EUR::fxUSD::stabilityPoolLeveraged` | `0xc5e0dA7e0a178850438E5E97ed59b6eb2562e88E` | hsFXUSD-EUR |

## Price oracle

| | |
| --- | --- |
| **Pair** | fxUSD/EUR |
| **Address** | `0x305454F8B46Aa3485D8B350D8E832459974F5e9F` |
| **Rate provider** | fxSAVE |
| **Inventory** | [Mainnet price oracles](../contracts/price-oracles/mainnet.md) |

## Market parameters

| | |
| --- | --- |
| **Yield source** | fxSAVE |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock / genesis dates** | TBD — confirm in app config / deploy notes |

## Related markets

- [steth-eur](./steth-eur.md)

## Template

New markets: copy [Market page template](../templates/market.md).
