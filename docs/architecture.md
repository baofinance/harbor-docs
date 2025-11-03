---
sidebar_position: 2
---

# Architecture Overview

Harbor Protocol is built on a robust and secure architecture that enables the creation and management of synthetic assets. This document provides a high-level overview of the protocol's architecture.

## System Components

### 1. Price Oracle for Pegged Tokens

- Chainlink price feeds for reliable market data
- Transparent display of oracle on market app page

### 2. Token System

#### HA Tokens (Harbor Anchored)

- 1:1 price with oracle price
- Fully collateralized
- Redeemable for underlying assets at any time

#### HS Tokens (Harbor Sail)

- Variable leverage exposure
- Liquidation protection
- Automated rebalancing

### 3. Stability Pools

- Collateral management
- Automated rebalancing
- Yield from collateral
- TIDE rewards distribution

### 4. Governance System

- TIDE token holders
- Proposal creation and voting
- Parameter adjustments
- Emergency controls

## Key Mechanisms

### Price Stability

1. Stability pools maintain optimal collateral ratios
2. Automated rebalancing during market stress
3. Liquidation protection for leveraged positions
4. Multiple price feeds for reliability

### Yield Generation

1. Collateral yield from stETH and other yield-bearing assets
2. Trading fees from market operations
3. TIDE rewards for participation
4. Boost multipliers for TIDE holders

### Risk Management

1. Collateral ratio monitoring
2. Liquidation thresholds
3. Circuit breakers
4. Emergency pause functionality

## Technical Stack

- **Smart Contracts**: Solidity
- **Frontend**: Next.js, React, TailwindCSS
- **Price Feeds**: Chainlink
- **Testing**: Foundry, Hardhat
- **Deployment**: Anvil (local), Ethereum mainnet

## Security Considerations

- Multiple price feed redundancy
- Time-weighted average prices
- Circuit breakers for extreme market conditions
- Regular security audits
- Bug bounty program

## Future Enhancements

- Additional asset support
- Cross-chain capabilities
- Advanced trading features
- Enhanced governance tools
- Mobile application
