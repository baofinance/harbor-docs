---
sidebar_position: 6
---

# Protocol Fees

## Dynamic Fees: Built-In Market Regulation

Harbor uses a real-time, responsive fee system for **mints and redemptions** of haTOKENS and hsTOKENS (not order-book maker/taker trading fees). It works like a pressure valve:

- **Under normal conditions**, fees are low — illustrative examples might be ~0.25% for minting haTOKENS and ~1% for minting hsTOKENS (actual tiers are set per market; check the app dry-run / quote before confirming).
- **If the system is at risk** (e.g., someone tries to mint a large amount of haTOKENS), fees scale up in proportion to how much stress the action would cause.
- **If the system needs help** - for example, to improve its collateral ratio - it can offer zero or even negative fees, essentially paying users to take helpful actions like minting hsTOKENS.

## Tiered Fee Structure

Fees are tiered: if a large transaction pushes the system past certain thresholds, higher fees apply to the portion that causes the most stress. This makes things fair - users only pay for the impact they actually cause.

## Why It Works: A Feedback Loop That Balances Demand

This fee system creates a self-correcting market:

- **If everyone wants haTOKENS**, it becomes increasingly expensive to mint haTOKENS and cheaper to mint hsTOKENS, encouraging balance.
- **If everyone wants leverage**, the opposite happens - haTOKENS minting becomes cheaper, drawing users to the stable side.
- **Arbitrageurs and advanced users** will step in to exploit these dynamics, ensuring no imbalance goes unchecked.

## Where Fees Go

Mint/redeem fees (with collateral yield) are **protocol revenue**. Per market:

1. Up to **~5%** → [Maiden Voyage](./maiden-voyage) **Yield Share** (when eligible)
2. Remaining **~95%** → any post–$10M TVL treasury take, then **75%** stability pools / **25%** buy TIDE

Full waterfall: [TIDE Tokenomics](/tide-token/tokenomics).

## System Integration

Together with [Stability Pools](./stability-pools) (which manage ongoing systemic risk), the dynamic fee system helps Harbor maintain both flexibility and robustness. User behavior is steered gently - but powerfully - through financial incentives at the entry and exit points.

## Key Benefits

### Automatic Market Regulation

- Fees adjust in real-time based on system needs
- No manual intervention required
- Prevents extreme imbalances before they occur

### Fair Pricing

- Users pay fees proportional to the stress they cause
- Large transactions that push thresholds pay higher rates only on the excess
- Small transactions remain affordable

### Incentive Alignment

- The system can pay users to take beneficial actions
- Negative fees reward behavior that improves system health
- Market forces naturally maintain balance

## How It Affects You

- **Small transactions**: Minimal impact, low fees under normal conditions
- **Large transactions**: Higher fees on portions that stress the system
- **Beneficial actions**: Potential rewards when the system needs rebalancing
- **Market timing**: Better rates available when acting counter to crowd behavior
