# fxUSD/EUR Market

The fxUSD/EUR market allows users to mint pegged tokens (haEUR) and leveraged tokens (hsFXUSD-EUR) using fxUSD (via fxSAVE) as collateral.

## Market Overview

This market uses fxUSD (via fxSAVE vault) as collateral to mint:
- **haEUR**: Pegged token representing EUR exposure
- **hsFXUSD-EUR**: Leveraged token with variable exposure to EUR

> **Status**: Coming Soon - This market is planned for deployment but contracts are not yet deployed.

## Contract Addresses (Planned)

- **minter**: TBD
- **peggedToken**: TBD (haEUR)
- **leveragedToken**: TBD (hsFXUSD-EUR)
- **reservePool**: TBD
- **stabilityPoolManager**: TBD
- **genesis**: TBD
- **priceOracle**: `0x8f6F9C8af44f5f15a18d0fa93B5814a623Fa6353` (fxUSD/EUR aggregator - available)
- **feeReceiver**: TBD
- **stabilityPoolCollateral**: TBD
- **stabilityPoolLeveraged**: TBD
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Token Details

### Pegged Token (haEUR)
- **Symbol**: haEUR
- **Description**: Pegged token representing EUR exposure
- **Use Case**: Stable exposure to EUR price movements
- **Status**: Not yet deployed

### Leveraged Token (hsFXUSD-EUR)
- **Symbol**: hsFXUSD-EUR
- **Description**: Leveraged token with variable exposure to EUR
- **Use Case**: Leveraged exposure to EUR with yield generation
- **Status**: Not yet deployed

### Collateral Token
- **fxUSD**: fxUSD stablecoin (`0x085780639CC2cACd35E474e71f4d000e2405d8f6`)
- **fxSAVE**: fxSAVE vault (wrapped fxUSD with yield) (`0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`)

## Price Oracle

The fxUSD/EUR price oracle (`0x8f6F9C8af44f5f15a18d0fa93B5814a623Fa6353`) is available and provides:
- **Rate Provider**: fxSAVE vault (for fxUSD exchange rate)
- **Price Feed**: EUR/USD Chainlink feed (inverted to get fxUSD/EUR)
- **Status**: Oracle deployed and available

See [Price Oracle Contracts](../contracts/price-oracle.md) for detailed information.

## Market Parameters (Planned)

- **Collateral Type**: fxUSD (via fxSAVE vault)
- **Leverage Mechanism**: Variable leverage based on collateral ratio
- **Yield Source**: Yield from fxSAVE vault
- **Rebalancing**: Via stability pools
- **Deployment**: Planned for February 2026

## Genesis (Maiden Voyage) - Planned

- **Start Date**: February 1, 2026 (planned)
- **End Date**: February 8, 2026 (planned)
