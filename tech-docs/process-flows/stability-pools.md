# Stability Pools Process Flow

This document describes how stability pools work, including deposits, withdrawals, rewards, and rebalancing.

## Overview

Stability pools provide a mechanism for users to earn yield while providing liquidity for protocol rebalancing. Depositors receive rewards and rebalance tokens (collateral or leveraged tokens) in exchange for their deposits.

## Deposit Process

### Step-by-Step Flow

1. **User Initiates Deposit**
   - User calls `deposit(amount)` on Stability Pool contract
   - Provides asset tokens (pegged tokens, e.g., haETH)

2. **Token Transfer**
   - Asset tokens are transferred from user to stability pool
   - Pool balance increases

3. **Stake Token Minting**
   - LP tokens (stake tokens) are minted to user
   - Amount minted = (deposit amount × total stake tokens) / total assets
   - Represents user's share of the pool

4. **Gauge Staking**
   - Stake tokens are automatically staked in the liquidity gauge
   - User becomes eligible for rewards

5. **Event Emission**
   - `Deposited` event emitted with user address and amount

### Example

```
Pool State:
- Total Assets: 1000 haETH
- Total Stake Tokens: 1000

User deposits 100 haETH:
- New Total Assets: 1100 haETH
- Stake Tokens Minted: (100 × 1000) / 1000 = 100
- User receives 100 stake tokens
```

## Withdrawal Process

### Step-by-Step Flow

1. **User Initiates Withdrawal**
   - User calls `withdraw(amount)` on Stability Pool
   - Specifies amount of stake tokens to burn

2. **Stake Token Validation**
   - Contract verifies user has sufficient stake tokens
   - Checks if withdrawal is allowed (no active liquidations, etc.)

3. **Asset Calculation**
   - Assets to return = (stake tokens × total assets) / total stake tokens
   - Accounts for any accrued value from liquidations

4. **Token Transfer**
   - Asset tokens transferred from pool to user
   - Stake tokens burned

5. **Gauge Unstaking**
   - Stake tokens unstaked from gauge
   - Rewards remain claimable

6. **Event Emission**
   - `Withdrawn` event emitted

### Example

```
Pool State:
- Total Assets: 1100 haETH (includes liquidation gains)
- Total Stake Tokens: 1100

User withdraws 100 stake tokens:
- Assets Returned: (100 × 1100) / 1100 = 100 haETH
- But pool may have gained value from liquidations
- User receives proportional share of gains
```

## Reward Mechanism

### Compounding Accumulator System

Stability pools use a compounding accumulator system for reward distribution:

1. **Reward Tokens**: Multiple tokens supported (e.g., TIDE, wstETH from harvests)
2. **Distribution**: Based on user's share of total pool balance
3. **Compounding**: Rewards compound automatically into user balances

### Reward Calculation

Rewards are calculated using an integral-based system:
- Global reward integrals track accumulated rewards per token
- User checkpoints track their position in the reward accumulation
- Rewards = (userShare × (currentIntegral - userCheckpointIntegral)) / precision

### Claiming Rewards

1. **User Calls `claim()`**
   - Checkpoints user to update reward calculations
   - Calculates accrued rewards for all active reward tokens
   - Transfers reward tokens to user (or custom receiver)

2. **Reward Updates**
   - User's reward snapshot updated
   - Pending rewards reset to zero
   - Claimed amount incremented
   - Event emitted

**For detailed information about the reward system, see [Reward System Contracts](../contracts/reward-system.md).**

## Rebalance Participation

### How Depositors Benefit

When rebalancing occurs:

1. **Rebalance Tokens Received**
   - Depositors receive rebalance tokens (collateral or leveraged tokens)
   - Proportional to their stake in the pool

2. **Value Accrual**
   - Pool's total asset value may increase
   - Stake token holders benefit from rebalance gains
   - Value per stake token increases

3. **Diversification**
   - Depositors gain exposure to rebalance tokens
   - Can hold or sell rebalance tokens

### Rebalance Flow Integration

```
Rebalancing occurs:
↓
Pegged tokens burned from pools
↓
Rebalance tokens distributed to pools
↓
Pool's rebalance token balance increases
↓
Value per stake token increases
↓
Depositors benefit when withdrawing
```

## Pool Types Comparison

### Collateral Stability Pool

**Characteristics**:
- Liquidation Token: wstETH (collateral)
- Risk Profile: Lower risk, stable collateral
- Use Case: Conservative yield earning

**Rewards**:
- TIDE token rewards
- wstETH from rebalancing
- Staking yield from underlying collateral

### Sail Stability Pool

**Characteristics**:
- Liquidation Token: Leveraged tokens (hsETHxFxSAVE)
- Risk Profile: Higher risk, leveraged exposure
- Use Case: Aggressive yield + exposure

**Rewards**:
- TIDE token rewards
- Leveraged tokens from rebalancing
- Potential for leveraged gains

## Pool State Management

### Key Metrics

- **Total Assets**: Total asset tokens in pool
- **Total Stake Tokens**: Total LP tokens minted
- **Rebalance Token Balance**: Accumulated rebalance tokens
- **Reward Accumulation**: Accrued rewards from multiple tokens

### State Updates

- Deposits increase both assets and stake tokens
- Withdrawals decrease both proportionally
- Rebalancing increases rebalance token balance
- Rewards accrue continuously via gauge

## Risk Considerations

### For Depositors

- **Impermanent Loss**: Value changes from rebalancing
- **Rebalance Token Risk**: Value of received tokens may fluctuate
- **Smart Contract Risk**: Protocol and contract risks
- **Reward Volatility**: Reward token price fluctuations

### Mitigations

- Diversification across pool types
- Monitoring pool health metrics
- Understanding rebalancing mechanics

## Best Practices

1. **Diversify**: Consider both pool types
2. **Monitor**: Track pool metrics and health
3. **Timing**: Consider market conditions for deposits/withdrawals
4. **Understand**: Know what rebalance tokens you'll receive
