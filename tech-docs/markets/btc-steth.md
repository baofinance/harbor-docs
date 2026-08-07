# stETH/BTC Market

> **Status**: ✅ Deployed - Production v1 deployment on Ethereum mainnet

The stETH/BTC market allows users to mint pegged tokens (haBTC) and leveraged tokens (hsSTETH-BTC) using stETH (via wstETH) as collateral.

## Market overview

| Token | Role |
| ----- | ---- |
| **haBTC** | Pegged token — BTC exposure (shared with [fxUSD/BTC](./btc-fxusd.md)) |
| **hsSTETH-BTC** | Leveraged token — variable BTC exposure |

Collateral: **stETH** / **wstETH** (Lido).

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). State file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`BTC::stETH::minter`): `0xF42516EB885E737780EB864dd07cEc8628000919`
- **peggedToken** (`BTC::pegged`): `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` (haBTC)
- **leveragedToken** (`BTC::stETH::leveraged`): `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD` (hsSTETH-BTC)
- **reservePool** (`BTC::stETH::reservePool`): `0x515ECa19Ac381b0f37D616F99628136906fC5355`
- **stabilityPoolManager**: Not deployed on this market (`ETH::fxUSD::stabilityPoolManager` shared): `0xE39165aDE355988EFb24dA4f2403971101134CAB`
- **genesis** (`BTC::stETH::genesis`): `0xc64Fc46eED431e92C1b5e24DC296b5985CE6Cc00`
- **priceOracle**: `0x42018953e5174dC07058BeEE0618aa569fbFBE90` (stETH/BTC — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver** (`BTC::stETH::minterFeeReceiver`): `0xc3a97138a5aDCC7d28A1375E28EC3440aeaeDF3e` (TokenDistributor)
- **stabilityPoolCollateral** (`BTC::stETH::stabilityPoolCollateral`): `0x667Ceb303193996697A5938cD6e17255EeAcef51`
- **stabilityPoolLeveraged** (`BTC::stETH::stabilityPoolLeveraged`): `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013`
- **collateralToken**: `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH)
- **wrappedCollateralToken**: `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH)

## Token details

### Pegged token (haBTC)

Shared with [fxUSD/BTC](./btc-fxusd.md). **Address:** `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7`

### Leveraged token (hsSTETH-BTC)

**Address:** `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD` — variable BTC exposure with Lido staking yield.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

## Stability pools

### Collateral stability pool
- **Proxy key**: `BTC::stETH::stabilityPoolCollateral`
- **Address**: `0x667Ceb303193996697A5938cD6e17255EeAcef51`
- **Rebalance Token**: wstETH (collateral)
- **Purpose**: Liquidates positions using collateral

### Leveraged stability pool (Sail pool)
- **Proxy key**: `BTC::stETH::stabilityPoolLeveraged`
- **Address**: `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013`
- **Rebalance Token**: hsSTETH-BTC (leveraged token)
- **Purpose**: Liquidates positions using leveraged tokens

## Price oracle

The stETH/BTC price oracle (`0x42018953e5174dC07058BeEE0618aa569fbFBE90`) provides:
- **Rate Provider**: wstETH (for stETH exchange rate)
- **Price Feeds**: ETH/USD and BTC/USD Chainlink feeds (calculates stETH/BTC)
- **Purpose**: Determines collateral value and minting/redemption rates

See [Price Oracle Contracts](../contracts/price-oracle.md) for detailed information.

## Market parameters

| | |
| --- | --- |
| **Collateral** | stETH (via wstETH) |
| **Leverage** | Variable, collateral-ratio bands |
| **Yield** | Lido staking (stETH) |
| **Rebalancing** | Stability pools |
| **Deployment** | Mainnet, December 2025 (`startBlock`: 24049273) |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | December 19, 2025 |
| **End** | January 4, 2026 |
| **Genesis zap** | `0x8Ee0D6AD1d15b3515Ba81CCE16Bba344Deea6781` (GenesisETHZap_v3) |
