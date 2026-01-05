# BTC/stETH Market

> **Status**: ✅ Deployed - Production v1 deployment on Ethereum mainnet

The BTC/stETH market allows users to mint pegged tokens (haBTC) and leveraged tokens (hsSTETH-BTC) using stETH (via wstETH) as collateral.

## Market Overview

This market uses stETH (via wrapped stETH) as collateral to mint:
- **haBTC**: Pegged token representing BTC exposure (shared with BTC/fxUSD market)
- **hsSTETH-BTC**: Leveraged token with variable exposure to BTC

## Contract Addresses (Mainnet)

- **minter**: `0xF42516EB885E737780EB864dd07cEc8628000919`
- **peggedToken**: `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` (haBTC)
- **leveragedToken**: `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD` (hsSTETH-BTC)
- **reservePool**: `0x515ECa19Ac381b0f37D616F99628136906fC5355`
- **stabilityPoolManager**: Not deployed (uses shared manager)
- **genesis**: `0xc64Fc46eED431e92C1b5e24DC296b5985CE6Cc00`
- **priceOracle**: `0xE370289aF2145A5B2F0F7a4a900eBfD478A156dB` (stETH/BTC aggregator)
- **feeReceiver**: `0xc3a97138a5aDCC7d28A1375E28EC3440aeaeDF3e` (TokenDistributor)
- **stabilityPoolCollateral**: `0x667Ceb303193996697A5938cD6e17255EeAcef51`
- **stabilityPoolLeveraged**: `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013`
- **collateralToken**: `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH)
- **wrappedCollateralToken**: `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH)

## Token Details

### Pegged Token (haBTC)
- **Symbol**: haBTC
- **Description**: Pegged token representing BTC exposure
- **Use Case**: Stable exposure to BTC price movements
- **Address**: `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7`
- **Note**: Shared with BTC/fxUSD market

### Leveraged Token (hsSTETH-BTC)
- **Symbol**: hsSTETH-BTC
- **Description**: Leveraged token with variable exposure to BTC
- **Use Case**: Leveraged exposure to BTC with staking yield
- **Address**: `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD`

### Collateral Token
- **stETH**: Lido Staked ETH (`0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`)
- **wstETH**: Wrapped Staked ETH (`0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`)

## Stability Pools

### Collateral Stability Pool
- **Address**: `0x667Ceb303193996697A5938cD6e17255EeAcef51`
- **Rebalance Token**: wstETH (collateral)
- **Purpose**: Liquidates positions using collateral

### Leveraged Stability Pool (Sail Pool)
- **Address**: `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013`
- **Rebalance Token**: hsSTETH-BTC (leveraged token)
- **Purpose**: Liquidates positions using leveraged tokens

## Price Oracle

The stETH/BTC price oracle (`0xE370289aF2145A5B2F0F7a4a900eBfD478A156dB`) provides:
- **Rate Provider**: wstETH (for stETH exchange rate)
- **Price Feeds**: ETH/USD and BTC/USD Chainlink feeds (calculates stETH/BTC)
- **Purpose**: Determines collateral value and minting/redemption rates

See [Price Oracle Contracts](../contracts/price-oracle.md) for detailed information.

## Market Parameters

- **Collateral Type**: stETH (via wstETH)
- **Leverage Mechanism**: Variable leverage based on collateral ratio
- **Yield Source**: Staking rewards from stETH
- **Rebalancing**: Via stability pools
- **Deployment**: Mainnet deployment December 2025 (startBlock: 24049273)

## Genesis (Maiden Voyage)

- **Start Date**: December 19, 2025
- **End Date**: January 4, 2026
- **Rewards**: 1,000,000 haBTC + 1,000,000 hsSTETH-BTC
- **Genesis Zap**: `0x8Ee0D6AD1d15b3515Ba81CCE16Bba344Deea6781` (GenesisETHZap_v3)
