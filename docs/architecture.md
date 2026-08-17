---
sidebar_position: 2
---

# Architecture Overview

Harbor Protocol is built on a robust and secure architecture that enables the creation and management of synthetic assets. This document provides a high-level overview of the protocol's architecture.

Integrators: sequenced contract path in [Build on Harbor](/tech-docs/integrators).

![Oracle, minter, pools, and TIDE as one system.](/img/02-high-level-system-map.png)

:::note
WIP — final versions pending.
:::


## System Components

### 1. Price Oracle for Pegged Tokens

- Chainlink feeds composed by [Harbor Price Aggregators](https://github.com/baofinance/harbor-price-aggregators)
- Transparent display of the oracle on each market page in the app
- See [Supporting Features](/supporting-features)

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
- Marks and team-directed TIDE incentives where allocated

### 4. Governance System

- TIDE token holders
- Early phase: team-directed incentives with community oversight
- Longer-term: proposal discussion and governance committee evolution
- Parameter adjustments and emergency controls via protocol ownership / multisig processes

## Key Mechanisms

### Price Stability

1. Stability pools maintain optimal collateral ratios
2. Automated rebalancing during market stress
3. Liquidation protection for leveraged positions
4. Reliable price feeds per market

### Yield Generation

1. Collateral yield from fxSAVE, wstETH, and other yield-bearing assets
2. Mint and redeem fees from market operations
3. Marks / TIDE incentives for participation where allocated
4. Maiden Voyage Yield Share for eligible launch participants

### Risk Management

1. Collateral ratio monitoring
2. Rebalance thresholds
3. Pause / upgrade controls on UUPS contracts
4. Emergency response via protocol ownership

## Technical Stack

- **Smart Contracts**: Solidity (Foundry)
- **Frontend**: Next.js, React ([app.harborfinance.io](https://app.harborfinance.io))
- **Price Feeds**: Chainlink + [Harbor Price Aggregators](https://github.com/baofinance/harbor-price-aggregators)
- **UX helpers**: [Harbor Zap Contracts](https://github.com/baofinance/harbor-zap-contracts) (convenience; prefer main collaterals)
- **Testing**: Foundry
- **Deployment**: Ethereum mainnet (primary product surface)

## Security Considerations

- Price feed design and market-specific oracles
- Circuit-style operational controls (pause via upgrade pattern)
- Security: Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) for **bao-base** and **bao-minter** (now Harbor). Coverage of live mainnet deploys is **partial** (post-audit upgrades; zaps and some other packages out of scope)
- Ongoing monitoring and contract upgrades when needed

## Future Enhancements

- Additional asset support
- Cross-chain TIDE and market expansion (Chainlink CCIP for TIDE)
- Advanced DeFi integrations
- Enhanced governance tools
