---
sidebar_position: 2
---

# Architecture Overview

High-level map of Harbor on Ethereum. User walkthrough: [How It Works](/how-it-works). Integrators: [Build on Harbor](/tech-docs/integrators).

![Oracle, minter, pools, and TIDE as one system.](/img/02-high-level-system-map.png)

## System components

### 1. Price oracles

- [Harbor Price Aggregators](https://github.com/baofinance/harbor-price-aggregators) compose **Chainlink** feeds per market
- Oracle shown on each market page in the app
- [Supporting Features](/supporting-features)

### 2. Token system

#### ha (Harbor Anchored)

- Pegged 1:1 to oracle reference
- Collateralized and redeemable
- Deposited in **Earn** for yield

#### hs (Harbor Sail)

- Variable leverage residual claim
- Protected from margin-style liquidation; can still lose value in stress
- Managed in **Leverage**

### 3. Stability pools

- Per-market **collateral** and **Sail** pools
- Rebalancing, yield, Marks / TIDE where allocated

### 4. Governance

- **TIDE** holders and community process
- Early phase: team-directed incentives with oversight
- Parameter and emergency controls via protocol ownership

## Key mechanisms

### Price stability

1. Stability pools maintain collateral ratios
2. Automated rebalancing under stress
3. Oracle-driven mint/redeem and pool settlements

### Yield generation

1. Collateral yield (fxSAVE, wstETH, …)
2. Mint/redeem fees
3. Marks / TIDE programs
4. Maiden Voyage **Yield Share**

### Risk management

1. Collateral ratio monitoring (~130% trigger band)
2. Rebalance thresholds
3. Upgradeable (UUPS) contracts with pause patterns

## Technical stack

- **Contracts**: Solidity / Foundry ([harbor](https://github.com/baofinance/harbor))
- **App**: [app.harborfinance.io](https://app.harborfinance.io)
- **Oracles**: Chainlink + Harbor aggregators
- **Zaps**: [Harbor Zap Contracts](https://github.com/baofinance/harbor-zap-contracts) (convenience; prefer fxSAVE / wstETH)
- **Network**: Ethereum mainnet (primary)

## Security

Harbor has a Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) for **bao-base** and **bao-minter** (now Harbor core). **Partial** coverage of live mainnet deploys — post-audit upgrades; **zaps out of scope**. [Risk Considerations](/risk-considerations).

## Future direction

- More markets and pegs — [Roadmap](/roadmap)
- Cross-chain TIDE (Chainlink CCIP)
- Harbor Yield levels 2–3 when shipped
