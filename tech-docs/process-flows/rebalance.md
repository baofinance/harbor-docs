# Rebalance Process Flow

This document describes how rebalancing works in Harbor Protocol and how stability pools participate in the rebalancing process.

## Overview

When the system-wide collateral ratio falls below the rebalance threshold, the protocol automatically rebalances by burning pegged tokens from stability pools. Stability pool depositors provide liquidity for rebalancing and receive rebalance tokens (collateral or leveraged tokens) as rewards.

## Rebalance Trigger

### Conditions for Rebalancing

The system becomes eligible for rebalancing when:
- Global collateral ratio falls below the rebalance threshold (e.g., 130%)
- Price movements cause the system to become undercollateralized
- Oracle price updates reflect the new market conditions

### Rebalance Check

```solidity
collateralRatio = totalCollateralValue / totalPeggedValue
if (collateralRatio < rebalanceThreshold) {
    // System can be rebalanced
}
```

## Rebalance Process

### Step 1: Rebalance Initiation

1. **Keeper or User Calls Rebalance**
   - Rebalancer calls `rebalance()` on the StabilityPoolManager
   - Specifies minimum amount of pegged tokens expected to be burned
   - Receives rebalance bounty as incentive

2. **System Validation**
   - Contract checks if collateral ratio is below threshold
   - Verifies sufficient stability pool balances
   - Validates rebalance amount

### Step 2: Pegged Token Burning

1. **Token Collection**
   - Pegged tokens are swept from stability pools
   - Tokens are burned via Minter (fee-free redemption)
   - Total pegged token supply decreases

2. **Debt Reduction**
   - System debt is reduced by the burned amount
   - Global collateral ratio improves

### Step 3: Rebalance Token Distribution

1. **Token Calculation**
   - Collateral pool receives wrapped collateral (e.g., wstETH, fxSAVE)
   - Leveraged pool receives leveraged tokens (hsTokens)
   - Distribution proportional to each pool's contribution

2. **Distribution to Depositors**
   - Rebalance tokens are distributed to pools via `notifyLiquidation()`
   - Distribution is proportional to depositor's stake in the pool
   - Depositors receive rebalance tokens in exchange for their pegged tokens

### Step 4: Pool State Update

1. **Balance Updates**
   - Rebalance token balance increases
   - Individual depositor balances updated via checkpointing
   - Total asset supply recalculated

2. **Reward Distribution**
   - Rebalance tokens accumulate as rewards
   - Depositors can claim rewards via `claim()`
   - Rewards compound into balances automatically

## Stability Pool Types

### Collateral Stability Pool

**Rebalance Token**: Wrapped Collateral (wstETH, fxSAVE)

**Process**:
1. Depositors provide pegged tokens (haETH, haBTC)
2. Pool participates in system rebalancing
3. Depositors receive wrapped collateral as rebalance tokens
4. Depositors can withdraw collateral or continue earning rewards

**Use Case**: Users want to earn yield while providing rebalancing liquidity, receiving collateral in return.

### Sail Stability Pool (Leveraged Pool)

**Rebalance Token**: Leveraged Tokens (hsFXUSD-ETH, hsSTETH-BTC)

**Process**:
1. Depositors provide pegged tokens (haETH, haBTC)
2. Pool participates in system rebalancing
3. Depositors receive leveraged tokens as rebalance tokens
4. Depositors can hold leveraged tokens for exposure or sell them

**Use Case**: Users want leveraged exposure while earning yield, receiving leveraged tokens as rebalance rewards.

## Rebalance Example

### Scenario

- System has: 1000 haETH pegged tokens
- Collateral: 1300 wstETH
- Current collateral ratio: 130%
- Rebalance threshold: 130%
- Price drops: Collateral value decreases
- New ratio: 120% (below threshold)

### Rebalance

1. **StabilityPoolManager Rebalances**
   - Burns 100 haETH from stability pools
   - System debt reduced to 900 haETH

2. **Token Distribution**
   - 100 haETH redeemed for ~100 wstETH (at current price)
   - Collateral pool receives wstETH
   - Leveraged pool receives hsTokens (if applicable)

3. **Depositor Rewards**
   - Depositors receive rebalance tokens proportional to their stake
   - Example: Depositor with 10% stake receives 10 wstETH (collateral pool) or equivalent hsTokens (leveraged pool)

## Rebalance Incentives

### For Rebalancers (Keepers)

- Rebalance bounty (typically 0.5-1% of rebalance amount)
- Gas cost reimbursement
- Priority in rebalance queue
- MEV opportunities

### For Depositors

- Receive rebalance tokens at favorable rates
- Diversified exposure through rebalancing
- Yield from protocol operations
- Automatic compounding

## Safety Mechanisms

- **Minimum Rebalance Amount**: Prevents dust rebalances
- **Maximum Rebalance**: Limits single rebalance size
- **Slippage Protection**: `minPeggedLiquidated` parameter
- **Circuit Breakers**: Pauses rebalancing in extreme conditions

## Gas Optimization

- Batch rebalances when possible
- Efficient token transfers
- Minimal state updates

## Understanding Rebalancing

1. **Know Your Pool**: Understand which rebalance tokens you'll receive
2. **Monitor Ratio**: Track system collateral ratio
3. **Timing**: Rebalances happen when ratio drops below threshold
4. **Understand**: Know what rebalance tokens you'll receive
