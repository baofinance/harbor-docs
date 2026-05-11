# ETH/fxUSD Market

> **Status**: ✅ Deployed - Production v1 deployment on Ethereum mainnet

The ETH/fxUSD market allows users to mint pegged tokens (haETH) and leveraged tokens (hsFXUSD-ETH) using fxUSD (via fxSAVE) as collateral.

## Market Overview

This market uses fxUSD (via fxSAVE vault) as collateral to mint:
- **haETH**: Pegged token representing ETH exposure
- **hsFXUSD-ETH**: Leveraged token with variable exposure to ETH

## Contract Addresses (Mainnet)

Proxy keys match [`harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json); see [Generic market deployments](./generic.md).

- **minter** (`ETH::fxUSD::minter`): `0xd6E2F8e57b4aFB51C6fA4cbC012e1cE6aEad989F`
- **peggedToken** (`ETH::pegged`): `0x7A53EBc85453DD006824084c4f4bE758FcF8a5B5` (haETH)
- **leveragedToken** (`ETH::fxUSD::leveraged`): `0x0Cd6BB1a0cfD95e2779EDC6D17b664B481f2EB4C` (hsFXUSD-ETH)
- **reservePool** (`ETH::fxUSD::reservePool`): `0x7A5c4ca972CE2168d5215d252946dDbd1cAd2015`
- **stabilityPoolManager** (`ETH::fxUSD::stabilityPoolManager`): `0xE39165aDE355988EFb24dA4f2403971101134CAB`
- **genesis** (`ETH::fxUSD::genesis`): `0xC9df4f62474Cf6cdE6c064DB29416a9F4f27EBdC`
- **priceOracle**: `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097` (fxUSD/ETH aggregator)
- **feeReceiver** (`ETH::fxUSD::minterFeeReceiver`): `0xdC903fe5ebCE440f22578D701b95424363D20881` (TokenDistributor)
- **stabilityPoolCollateral** (`ETH::fxUSD::stabilityPoolCollateral`): `0x1F985CF7C10A81DE1940da581208D2855D263D72`
- **stabilityPoolLeveraged** (`ETH::fxUSD::stabilityPoolLeveraged`): `0x438B29EC7a1770dDbA37D792F1A6e76231Ef8E06`
- **collateralToken**: `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD)
- **wrappedCollateralToken**: `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE)

## Token Details

### Pegged Token (haETH)
- **Symbol**: haETH
- **Description**: Pegged token representing ETH exposure
- **Use Case**: Stable exposure to ETH price movements
- **Address**: `0x7A53EBc85453DD006824084c4f4bE758FcF8a5B5`

### Leveraged Token (hsFXUSD-ETH)
- **Symbol**: hsFXUSD-ETH
- **Description**: Leveraged token with variable exposure to ETH
- **Use Case**: Leveraged exposure to ETH with yield generation
- **Address**: `0x0Cd6BB1a0cfD95e2779EDC6D17b664B481f2EB4C`

### Collateral Token
- **fxUSD**: fxUSD stablecoin (`0x085780639CC2cACd35E474e71f4d000e2405d8f6`)
- **fxSAVE**: fxSAVE vault (wrapped fxUSD with yield) (`0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39`)

## Stability Pools

### Collateral Stability Pool
- **Proxy key**: `ETH::fxUSD::stabilityPoolCollateral`
- **Address**: `0x1F985CF7C10A81DE1940da581208D2855D263D72`
- **Rebalance Token**: fxUSD (collateral)
- **Purpose**: Liquidates positions using collateral

### Leveraged Stability Pool (Sail Pool)
- **Proxy key**: `ETH::fxUSD::stabilityPoolLeveraged`
- **Address**: `0x438B29EC7a1770dDbA37D792F1A6e76231Ef8E06`
- **Rebalance Token**: hsFXUSD-ETH (leveraged token)
- **Purpose**: Liquidates positions using leveraged tokens

## Price Oracle

The fxUSD/ETH price oracle (`0x71437C90F1E0785dd691FD02f7bE0B90cd14c097`) provides:
- **Rate Provider**: fxSAVE vault (for fxUSD exchange rate)
- **Price Feed**: ETH/USD Chainlink feed (inverted to get fxUSD/ETH)
- **Purpose**: Determines collateral value and minting/redemption rates

See [Price Oracle Contracts](../contracts/price-oracle.md) for detailed information.

## Market Parameters

- **Collateral Type**: fxUSD (via fxSAVE vault)
- **Leverage Mechanism**: Variable leverage based on collateral ratio
- **Yield Source**: Yield from fxSAVE vault
- **Rebalancing**: Via stability pools
- **Deployment**: Mainnet deployment December 2025 (startBlock: 24049488)

## Genesis (Maiden Voyage)

- **Start Date**: December 19, 2025
- **End Date**: January 4, 2026
- **Genesis Zap**: `0x424D373141a845eB2822B2a8e5ED0f529Ece4F7a` (GenesisUSDCZap_v2)
