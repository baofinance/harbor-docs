# BTC/fxUSD Market

> **Status**: ✅ Deployed - Production v1 deployment on Ethereum mainnet

The BTC/fxUSD market allows users to mint pegged tokens (haBTC) and leveraged tokens (hsFXUSD-BTC) using fxUSD (via fxSAVE) as collateral.

## Market Overview

This market uses fxUSD (via fxSAVE vault) as collateral to mint:
- **haBTC**: Pegged token representing BTC exposure
- **hsFXUSD-BTC**: Leveraged token with variable exposure to BTC

## Contract Addresses (Mainnet)

- **minter**: `0x33e32ff4d0677862fa31582CC654a25b9b1e4888`
- **peggedToken**: `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` (haBTC)
- **leveragedToken**: `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B` (hsFXUSD-BTC)
- **reservePool**: `0xfDE46D4425138aA01319bB8587Cb935a0393DfE3`
- **stabilityPoolManager**: Not deployed (uses shared manager)
- **genesis**: `0x42cc9a19b358a2A918f891D8a6199d8b05F0BC1C`
- **priceOracle**: `0x8F76a260c5D21586aFfF18f880FFC808D0524A73` (fxUSD/BTC aggregator)
- **feeReceiver**: `0x70DdA12032335656b63435840Cd55ff7A19dDAb7` (TokenDistributor)
- **stabilityPoolCollateral**: `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49`
- **stabilityPoolLeveraged**: `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Token Details

### Pegged Token (haBTC)
- **Symbol**: haBTC
- **Description**: Pegged token representing BTC exposure
- **Use Case**: Stable exposure to BTC price movements
- **Address**: `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7`
- **Note**: Shared with BTC/stETH market

### Leveraged Token (hsFXUSD-BTC)
- **Symbol**: hsFXUSD-BTC
- **Description**: Leveraged token with variable exposure to BTC
- **Use Case**: Leveraged exposure to BTC with yield generation
- **Address**: `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B`

### Collateral Token
- **fxUSD**: fxUSD stablecoin (`0x085780639CC2cACd35E474e71f4d000e2405d8f6`)
- **fxSAVE**: fxSAVE vault (wrapped fxUSD with yield) (`0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`)

## Stability Pools

### Collateral Stability Pool
- **Address**: `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49`
- **Rebalance Token**: fxUSD (collateral)
- **Purpose**: Liquidates positions using collateral

### Leveraged Stability Pool (Sail Pool)
- **Address**: `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40`
- **Rebalance Token**: hsFXUSD-BTC (leveraged token)
- **Purpose**: Liquidates positions using leveraged tokens

## Price Oracle

The fxUSD/BTC price oracle (`0x8F76a260c5D21586aFfF18f880FFC808D0524A73`) provides:
- **Rate Provider**: fxSAVE vault (for fxUSD exchange rate)
- **Price Feed**: BTC/USD Chainlink feed (inverted to get fxUSD/BTC)
- **Purpose**: Determines collateral value and minting/redemption rates

See [Price Oracle Contracts](../contracts/price-oracle.md) for detailed information.

## Market Parameters

- **Collateral Type**: fxUSD (via fxSAVE vault)
- **Leverage Mechanism**: Variable leverage based on collateral ratio
- **Yield Source**: Yield from fxSAVE vault
- **Rebalancing**: Via stability pools
- **Deployment**: Mainnet deployment December 2025 (startBlock: 24049375)

## Genesis (Maiden Voyage)

- **Start Date**: December 19, 2025
- **End Date**: January 4, 2026
- **Genesis Zap**: `0xF012a1BA66a411404FEae0a2AeD68dEB18D7de32` (GenesisUSDCZap_v2)
