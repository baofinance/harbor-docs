# Reward System Contracts

The Harbor Protocol reward system consists of multiple contracts working together to distribute rewards efficiently and fairly, even when staking balances decrease unexpectedly.

## Overview

The reward system is built on two main components:
1. **LinearMultipleRewardDistributor**: Handles linear distribution of rewards over time periods
2. **MultipleRewardCompoundingAccumulator**: Tracks and compounds rewards based on user shares

StabilityPool contracts inherit from `MultipleRewardCompoundingAccumulator`, which inherits from `LinearMultipleRewardDistributor`, combining both functionalities.

## Architecture

```
StabilityPool_v1
    ↓ inherits
MultipleRewardCompoundingAccumulator
    ↓ inherits
LinearMultipleRewardDistributor
```

## LinearMultipleRewardDistributor

The base contract that manages linear reward distribution over configurable time periods.

### Key Features

- **Multiple Reward Tokens**: Supports multiple reward token types simultaneously
- **Linear Distribution**: Distributes rewards linearly over a period (or immediately if period is 0)
- **Period Management**: Configurable period length (0 = immediate, 1-28 days = linear)
- **Token Registration**: Active and historical reward token tracking

### Immutable Configuration

- **REWARD_MANAGER_ROLE**: Role for managing reward tokens (register/unregister)
- **REWARD_DEPOSITOR_ROLE**: Role for depositing rewards
- **REWARD_PERIOD_LENGTH**: Length of reward distribution period in seconds
  - `0`: Immediate distribution (no linear ramp)
  - `1 day` to `28 days`: Linear distribution over period

### Key Functions

#### Reward Token Management

- `registerRewardToken(address token)` - Registers a new reward token (REWARD_MANAGER_ROLE)
- `unregisterRewardToken(address token)` - Unregisters a reward token (moves to historical)
- `activeRewardTokens() returns (address[])` - Returns list of active reward tokens
- `historicalRewardTokens() returns (address[])` - Returns list of historical reward tokens

#### Reward Distribution

- `depositReward(address token, uint256 amount)` - Deposits rewards for distribution (REWARD_DEPOSITOR_ROLE)
  - Transfers tokens from caller to contract
  - Distributes pending rewards from previous period
  - Notifies new rewards (immediate or linear based on period length)

#### View Functions

- `rewardData(address token) returns (uint256 lastUpdate, uint256 finishAt, uint256 rate, uint256 queued)` - Returns reward distribution data
- `pendingRewards(address token) returns (uint256 distributable, uint256 undistributed)` - Returns pending reward amounts

### Linear Distribution Mechanism

When `REWARD_PERIOD_LENGTH > 0`, rewards are distributed linearly:

1. **Reward Rate**: `rate = totalRewards / periodLength` (rewards per second)
2. **Distribution**: Rewards accumulate at constant rate over the period
3. **Period Management**: 
   - If new rewards ≥ 90% of current period's distributed amount → Start new period
   - If new rewards < 90% → Queue for next period
4. **Queued Rewards**: Rounding errors and small amounts are queued for next period

When `REWARD_PERIOD_LENGTH == 0`, rewards are distributed immediately.

## MultipleRewardCompoundingAccumulator

Extends the linear distributor with compounding reward tracking that handles stake decreases.

### Key Features

- **O(1) Complexity**: Reward calculations are constant time regardless of time elapsed
- **Stake Decrease Handling**: Correctly handles proportional stake decreases (e.g., from rebalancing)
- **Multiple Reward Tokens**: Supports multiple reward tokens simultaneously
- **Precision Preservation**: Uses floating-point representation to prevent precision loss
- **Epoch System**: Handles cases where total supply reduces to zero
- **Custom Receivers**: Users can set custom reward receiver addresses

### Mathematical Model

The accumulator uses a sophisticated mathematical model based on Liquity's StabilityPool paper:

**Key Variables:**
- `s[i]`: Total pool stakes after event i
- `u[i]`: User's personal stakes after event i
- `d[i]`: Amount of total stake decrease in event i
- `r[i]`: Amount of rewards distributed in event i
- `p[i]`: Product factor tracking stake decreases

**Stake Decrease Formula:**
```
u[n] = u[0] * (1 - d[1]/s[0]) * (1 - d[2]/s[1]) * ... * (1 - d[n]/s[n-1])
```

**Reward Accumulation:**
```
g[n] = u[0] * (r[1] * p[0]/s[0] + r[2] * p[1]/s[1] + ... + r[n] * p[n-1]/s[n-1])
```

### Storage Structures

#### RewardSnapshot
- `timestamp`: When snapshot was taken
- `integral`: Accumulated reward integral value

#### ClaimData
- `pending`: Pending rewards not yet claimed
- `claimed`: Total rewards claimed by user

#### UserRewardSnapshot
- `rewards`: ClaimData for the user
- `checkpoint`: RewardSnapshot for the user

### Key Functions

#### Checkpointing

- `checkpoint(address account)` - Updates global and user reward snapshots
  - Distributes pending linear rewards
  - Updates user's reward integrals
  - Calculates pending rewards for user
  - Called automatically on deposit/withdraw/claim

#### Claiming Rewards

- `claim()` - Claims all active reward tokens for msg.sender
- `claim(address account)` - Claims all active reward tokens for account
- `claim(address account, address receiver)` - Claims and sends to receiver
- `claimHistorical(address[] tokens)` - Claims specific historical tokens
- `claimHistorical(address account, address[] tokens)` - Claims historical tokens for account

#### Reward Receiver

- `setRewardReceiver(address newReceiver)` - Sets custom receiver for rewards
- `rewardReceiver(address account) returns (address)` - Returns receiver address (or account if not set)

#### View Functions

- `claimable(address account, address token) returns (uint256)` - Returns claimable reward amount
- `claimed(address account, address token) returns (uint256)` - Returns total claimed amount

### Precision Handling

The system uses **DecrementalFloatingPoint** to handle precision:

- **Magnitude**: The significant digits (stored as uint128)
- **Exponent**: The scale factor (stored as uint8)
- **Format**: `value = magnitude × 10^(-18 - 9×exponent)`
- **Scaling**: When magnitude < 10^9, multiply by 1e9 and increment exponent

This prevents precision loss when stakes decrease significantly over time.

### Epoch System

When total supply reduces to zero, a new epoch starts:
- Previous epoch's integrals are preserved
- New epoch begins with fresh calculations
- Users can claim rewards from previous epochs

## Integration with StabilityPool

StabilityPool inherits from MultipleRewardCompoundingAccumulator, providing:

1. **Automatic Checkpointing**: Called on deposit/withdraw operations
2. **Reward Accumulation**: Rebalance proceeds accumulate as rewards via `_accumulateReward()`
3. **Balance Compounding**: User balances compound based on product factors
4. **Reward Distribution**: Harvested yield distributed via `depositReward()`

### Reward Flow

1. **Reward Deposit**: StabilityPoolManager calls `depositReward(token, amount)` on StabilityPool
2. **Linear Distribution**: If period > 0, rewards distribute linearly over time
3. **Accumulation**: Rewards accumulate into global integrals based on current product
4. **User Checkpoint**: When user deposits/withdraws/claims, checkpoint updates their rewards
5. **Claiming**: Users claim rewards, which are transferred to their receiver address

## Roles

- **REWARD_MANAGER_ROLE**: Can register/unregister reward tokens
- **REWARD_DEPOSITOR_ROLE**: Can deposit rewards (typically StabilityPoolManager)
- **Users**: Can claim rewards and set custom receivers

## Use Cases

### Immediate Distribution (Period = 0)

- Rewards distributed instantly when deposited
- Useful for rebalance rewards
- No queuing or linear ramp

### Linear Distribution (Period > 0)

- Rewards distributed over time period
- Smooths out reward rates
- Prevents sudden APR changes
- Useful for TIDE token incentives

### Stake Decreases

- Handles rebalancing correctly
- User stakes decrease proportionally
- Rewards calculated fairly despite decreases
- No need to update all users individually

## Security Considerations

- Reentrancy protection on all mutating functions
- Precision-preserving calculations prevent rounding errors
- Epoch system handles edge cases (zero supply)
- Custom receivers allow delegation
- Historical token tracking for auditing

## Events

- `DepositReward(address indexed token, uint256 amount)` - Rewards deposited
- `RegisterRewardToken(address indexed token)` - Token registered
- `UnregisterRewardToken(address indexed token)` - Token unregistered
- `Claim(address indexed account, address indexed token, address indexed receiver, uint256 amount)` - Rewards claimed
- `UpdateRewardReceiver(address indexed account, address indexed oldReceiver, address indexed newReceiver)` - Receiver updated
