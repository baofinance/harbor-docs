# fxUSD/BTC Market

> **Status**: ✅ Deployed - Production v1 deployment on Ethereum mainnet

The fxUSD/BTC market allows users to mint pegged tokens (haBTC) and leveraged tokens (hsFXUSD-BTC) using fxUSD (via fxSAVE) as collateral.

## Market overview

| Token | Role |
| ----- | ---- |
| **haBTC** | Pegged token — BTC exposure (shared with [stETH/BTC](./btc-steth.md)) |
| **hsFXUSD-BTC** | Leveraged token — variable BTC exposure |

Collateral: **fxUSD** via the **fxSAVE** vault.

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). State file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`BTC::fxUSD::minter`): `0x33e32ff4d0677862fa31582CC654a25b9b1e4888`
- **peggedToken** (`BTC::pegged`): `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` (haBTC)
- **leveragedToken** (`BTC::fxUSD::leveraged`): `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B` (hsFXUSD-BTC)
- **reservePool** (`BTC::fxUSD::reservePool`): `0xfDE46D4425138aA01319bB8587Cb935a0393DfE3`
- **stabilityPoolManager**: Not deployed on this market (`ETH::fxUSD::stabilityPoolManager` shared): `0xE39165aDE355988EFb24dA4f2403971101134CAB`
- **genesis** (`BTC::fxUSD::genesis`): `0x42cc9a19b358a2A918f891D8a6199d8b05F0BC1C`
- **priceOracle**: `0x8F76a260c5D21586aFfF18f880FFC808D0524A73` (fxUSD/BTC aggregator)
- **feeReceiver** (`BTC::fxUSD::minterFeeReceiver`): `0x70DdA12032335656b63435840Cd55ff7A19dDAb7` (TokenDistributor)
- **stabilityPoolCollateral** (`BTC::fxUSD::stabilityPoolCollateral`): `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49`
- **stabilityPoolLeveraged** (`BTC::fxUSD::stabilityPoolLeveraged`): `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Token details

### Pegged token (haBTC)

Shared with [stETH/BTC](./btc-steth.md). **Address:** `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7`

### Leveraged token (hsFXUSD-BTC)

**Address:** `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B` — variable BTC exposure with fxSAVE yield.

### Collateral

- **fxUSD:** `0x085780639CC2cACd35E474e71f4d000e2405d8f6`
- **fxSAVE:** `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`

## Stability pools

### Collateral stability pool
- **Proxy key**: `BTC::fxUSD::stabilityPoolCollateral`
- **Address**: `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49`
- **Rebalance Token**: fxUSD (collateral)
- **Purpose**: Liquidates positions using collateral

### Leveraged stability pool (Sail pool)
- **Proxy key**: `BTC::fxUSD::stabilityPoolLeveraged`
- **Address**: `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40`
- **Rebalance Token**: hsFXUSD-BTC (leveraged token)
- **Purpose**: Liquidates positions using leveraged tokens

## Price oracle

The fxUSD/BTC price oracle (`0x8F76a260c5D21586aFfF18f880FFC808D0524A73`) provides:
- **Rate Provider**: fxSAVE vault (for fxUSD exchange rate)
- **Price Feed**: BTC/USD Chainlink feed (inverted to get fxUSD/BTC)
- **Purpose**: Determines collateral value and minting/redemption rates

See [Price Oracle Contracts](../contracts/price-oracle.md) for detailed information.

## Market parameters

| | |
| --- | --- |
| **Collateral** | fxUSD (via fxSAVE vault) |
| **Leverage** | Variable, collateral-ratio bands |
| **Yield** | fxSAVE vault |
| **Rebalancing** | Stability pools |
| **Deployment** | Mainnet, December 2025 (`startBlock`: 24049375) |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | December 19, 2025 |
| **End** | January 4, 2026 |
| **Genesis zap** | `0xF012a1BA66a411404FEae0a2AeD68dEB18D7de32` (GenesisUSDCZap_v2) |
