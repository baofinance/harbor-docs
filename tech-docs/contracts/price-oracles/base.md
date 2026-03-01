# Base Price Oracles

**Chain ID**: 8453  
**Total Oracles**: 1

## Overview

Base currently hosts a single oracle for the BOM5 index, which aggregates prices from multiple tokens.

## Deployed Oracles

### stETH Pairs

| Oracle Pair | Address | Status | Version | Rate Provider | Price Calculation |
|-------------|---------|--------|---------|---------------|-------------------|
| stETH/BOM5 | `0x2877330d6fbA9BC0299588BcBaf16bA42d12b05a` | Active | v3 | wstETH | Multi-feed (normalized) |

**Configuration Notes:**
- Uses wstETH as rate provider
- BOM5 is a multi-token index using normalized aggregation
- Uses `MultiFeedNormalizedPriceLib` for price calculation

## BOM5 Index

The BOM5 index aggregates prices from 5 tokens. The exact composition may vary, but it uses normalized weighted averaging.

**Calculation Method**: Normalized weighted average using `MultiFeedNormalizedPriceLib`

## Version Information

- Base oracle uses **v3** contract
- Contract uses proxy pattern for upgradeability

## Notes

- Single oracle deployment on Base
- Uses multi-feed normalized aggregation
- All prices normalized to 18 decimals
