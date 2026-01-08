# fxUSD/GOLD Market

The fxUSD/GOLD market allows users to mint pegged tokens (haGOLD) and leveraged tokens (hsFXUSD-GOLD) using fxUSD (via fxSAVE) as collateral.

## Market Overview

This market uses fxUSD (via fxSAVE vault) as collateral to mint:
- **haGOLD**: Pegged token representing gold (XAU) exposure
- **hsFXUSD-GOLD**: Leveraged token with variable exposure to gold

> **Status**: Coming Soon - This market is planned for deployment but contracts are not yet deployed.

## Contract Addresses (Planned)

- **minter**: TBD
- **peggedToken**: TBD (haGOLD)
- **leveragedToken**: TBD (hsFXUSD-GOLD)
- **reservePool**: TBD
- **stabilityPoolManager**: TBD
- **genesis**: TBD
- **priceOracle**: `0x4be4501336130E61e5872cB953e886a3a84D34Cc` (fxUSD/GOLD aggregator - available)
- **feeReceiver**: TBD
- **stabilityPoolCollateral**: TBD
- **stabilityPoolLeveraged**: TBD
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Token Details

### Pegged Token (haGOLD)
- **Symbol**: haGOLD
- **Description**: Pegged token representing gold (XAU) exposure
- **Use Case**: Stable exposure to gold price movements
- **Status**: Not yet deployed

### Leveraged Token (hsFXUSD-GOLD)
- **Symbol**: hsFXUSD-GOLD
- **Description**: Leveraged token with variable exposure to gold
- **Use Case**: Leveraged exposure to gold with yield generation
- **Status**: Not yet deployed

### Collateral Token
- **fxUSD**: fxUSD stablecoin (`0x085780639CC2cACd35E474e71f4d000e2405d8f6`)
- **fxSAVE**: fxSAVE vault (wrapped fxUSD with yield) (`0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`)

## Price Oracle

The fxUSD/GOLD price oracle (`0x4be4501336130E61e5872cB953e886a3a84D34Cc`) is available and provides:
- **Rate Provider**: fxSAVE vault (for fxUSD exchange rate)
- **Price Feed**: XAU/USD Chainlink feed (inverted to get fxUSD/GOLD)
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
