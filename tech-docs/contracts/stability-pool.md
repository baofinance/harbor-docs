# Stability Pool Contract

The Stability Pool contract allows users to deposit pegged tokens (haTokens) to earn yield and participate in protocol rebalancing.

## Overview

The Stability Pool (`StabilityPool_v1`) is a UUPS upgradeable contract that holds pegged tokens deposited by users. It uses a compounding balance system to track deposits and automatically distributes rewards and rebalance proceeds. The pool participates in protocol rebalancing when the collateral ratio falls below the threshold.

## Contract Architecture

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Storage**: Uses ERC-7201 namespaced storage
- **Reward System**: Inherits from `MultipleRewardCompoundingAccumulator`
- **Access Control**: Uses BaoOwnableRoles for role-based access control
- **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuardTransientUpgradeable

## Immutable Addresses

Set during contract construction (cannot be changed):

- **ASSET_TOKEN**: The pegged token (haToken) that users deposit
- **LIQUIDATION_TOKEN**: The token received during liquidations (either wrapped collateral or leveraged token)
- **MIN_TOTAL_ASSET_SUPPLY**: Minimum total supply to prevent complete pool depletion
- **MIN_DEPOSIT**: Minimum deposit amount (equals MIN_TOTAL_ASSET_SUPPLY)
- **WITHDRAWAL_START_DELAY**: Delay before withdrawal window opens (in seconds)
- **WITHDRAWAL_END_WINDOW**: Duration of withdrawal window (in seconds)

## Storage State

- **totalAssetSupply**: Current total supply of assets in the pool (using TokenBalance struct)
- **assetBalances**: Mapping of account addresses to their TokenBalance structs
- **totalAssetSupplyHistory**: Historical records of total supply over time
- **lastAssetLossError**: Error tracking for loss calculations (ensures fair distribution)
- **withdrawalRequests**: Mapping of accounts to their withdrawal request windows
- **feePayment**: Early withdrawal fee configuration (address + fee ratio)

## Key Functions

### Deposit and Withdrawal

#### `deposit(uint256 assetAmount, address receiver, uint256 minAmount)`
Deposits pegged tokens (haTokens) into the stability pool.

**Parameters:**
- `assetAmount`: Amount of pegged tokens to deposit (use `type(uint256).max` for all)
- `receiver`: Address to receive the deposit balance
- `minAmount`: Minimum amount expected (slippage protection)

**Returns:**
- `assetsDeposited`: Actual amount deposited

**Effects:**
- Transfers pegged tokens from sender to pool
- Updates receiver's balance using compounding system
- Updates total supply
- Records total supply history
- Cancels any active withdrawal request if depositing during withdrawal window
- Checkpoints receiver for reward distribution

**Requirements:**
- Deposit must be at least `MIN_DEPOSIT`
- Receiver cannot be zero address

#### `withdraw(uint256 assetAmount, address receiver, uint256 minAmount)`
Withdraws pegged tokens from the stability pool.

**Parameters:**
- `assetAmount`: Amount to withdraw (use `type(uint256).max` for all)
- `receiver`: Address to receive the withdrawn tokens
- `minAmount`: Minimum amount expected (slippage protection)

**Returns:**
- `assetsWithdrawn`: Actual amount withdrawn (after fees)

**Effects:**
- Checkpoints sender to update balances and distribute rewards
- Calculates early withdrawal fee if applicable
- Updates total supply (maintains minimum)
- Updates sender's balance
- Transfers tokens to receiver
- Transfers fee to fee address if applicable
- Closes withdrawal request if one exists

**Early Withdrawal Fee:**
- Applied if withdrawal is outside the withdrawal window
- Not applied if:
  - Withdrawal is within the withdrawal window (after `requestWithdrawal()`)
  - Account has `EXEMPT_WITHDRAWAL_FEE_ROLE`
- Fee is deducted from withdrawal amount
- Fee cannot reduce total supply below `MIN_TOTAL_ASSET_SUPPLY`

#### `requestWithdrawal()`
Creates a withdrawal request to establish a fee-free withdrawal window.

**Effects:**
- Sets withdrawal window: `[now + WITHDRAWAL_START_DELAY, start + WITHDRAWAL_END_WINDOW]`
- Withdrawals within this window are fee-free
- Emits `WithdrawalRequested` event

**Note:** Depositing during an active withdrawal window cancels the request.

### Rebalancing

#### `notifyLiquidation(uint256 liquidated, uint256 returned)` (Restricted)
Called by StabilityPoolManager during rebalancing to notify the pool of rebalance proceeds.

**Parameters:**
- `liquidated`: Amount of pegged tokens liquidated
- `returned`: Amount of rebalance tokens returned

**Access:** Only addresses with `REBALANCER_ROLE` (typically StabilityPoolManager)

**Process:**
1. Emits `Liquidated` event
2. Checkpoints all accounts to distribute rewards on pre-loss balances
3. Accumulates rebalance tokens as rewards
4. Applies loss to total supply using `_notifyLoss()`

**Loss Distribution:**
- Loss is distributed proportionally to all depositors
- Uses DecrementalFloatingPoint to adjust balances
- Maintains minimum total supply
- Tracks rounding errors to ensure fairness

### Rewards

The contract inherits from `MultipleRewardCompoundingAccumulator`, providing:

- **Automatic Compounding**: Rewards compound into user balances
- **Multiple Reward Tokens**: Supports multiple reward token types
- **Checkpoint System**: Balances and rewards update on deposit/withdraw/claim

#### Reward Distribution

Rewards are distributed via:
- `depositReward(address token, uint256 amount)` - Called by reward distributors (e.g., StabilityPoolManager during harvest)
- Rewards compound automatically into user balances
- Users claim rewards by calling `claim()` or through withdrawals

**For detailed information about the reward system, see [Reward System Contracts](reward-system.md).**

### View Functions

#### Balance Queries

- `totalAssetSupply() returns (uint256)` - Current total supply of assets
- `assetBalanceOf(address account) returns (uint256)` - User's compounded balance
- `totalAssetSupplyHistory(uint index) returns (uint40 atDay, uint256 amount)` - Historical supply records

#### Withdrawal Information

- `getWithdrawalRequest(address account) returns (uint64 start, uint64 end)` - User's withdrawal window
- `getWithdrawalWindow() returns (uint64 startDelay, uint64 endWindow)` - Global withdrawal window config

#### Fee Information

- `getEarlyWithdrawalFee() returns (uint256)` - Current early withdrawal fee ratio
- `getFeeAddress() returns (address)` - Address receiving early withdrawal fees

#### Other Views

- `lastAssetLossError() returns (uint256)` - Current loss calculation error tracker
- `claimable(address account, address token) returns (uint256)` - Claimable rewards (from parent)

## Balance System

The contract uses a sophisticated compounding balance system:

### TokenBalance Struct

Each balance is tracked using:
- **product**: DecrementalFloatingPoint product (for loss distribution)
- **amount**: Current balance amount
- **updatedAt**: Timestamp of last update

### Compounding Mechanism

- Balances compound automatically through the `_checkpoint()` function
- Rewards are added to balances (not separate tracking)
- Losses reduce balances proportionally via product factor
- All operations maintain precision through error tracking

## Withdrawal Window System

Users can request a withdrawal window to avoid early withdrawal fees:

1. **Request**: Call `requestWithdrawal()`
2. **Wait**: `WITHDRAWAL_START_DELAY` seconds
3. **Window Opens**: Fee-free withdrawals for `WITHDRAWAL_END_WINDOW` seconds
4. **After Window**: Early withdrawal fee applies again

**Note:** Depositing during an active window cancels the request.

## Early Withdrawal Fee

- **Purpose**: Discourage rapid deposit/withdraw cycles
- **Application**: Applied when withdrawing outside withdrawal window
- **Exemptions**: 
  - Withdrawals within requested window
  - Accounts with `EXEMPT_WITHDRAWAL_FEE_ROLE`
- **Maximum**: 1 ether (100%)
- **Recipient**: Configurable fee address

## Minimum Supply Protection

- **MIN_TOTAL_ASSET_SUPPLY**: Prevents complete pool depletion
- **Enforcement**: 
  - Withdrawals cannot reduce supply below minimum
  - Losses cannot breach minimum
  - First deposit must be at least minimum

## Dependencies

- **ASSET_TOKEN**: The pegged token (haToken) deposited by users
- **LIQUIDATION_TOKEN**: Token received during rebalancing (wrapped collateral or leveraged token) - Note: Contract constant name kept for compatibility
- **MultipleRewardCompoundingAccumulator**: Parent contract for reward distribution
- **TokenHolder**: Parent contract for token sweeping (used by StabilityPoolManager)

## Roles

- **REBALANCER_ROLE**: Can call `notifyLiquidation()` (typically StabilityPoolManager)
- **REWARD_MANAGER_ROLE**: Can manage reward distribution (from parent)
- **REWARD_DEPOSITOR_ROLE**: Can deposit rewards (from parent)
- **EXEMPT_WITHDRAWAL_FEE_ROLE**: Exempt from early withdrawal fees
- **Owner**: Can upgrade contract and manage roles

## Security Considerations

- All mutating functions are protected by `nonReentrant` modifier
- Minimum supply prevents complete pool depletion
- Loss distribution uses error tracking to ensure fairness
- Early withdrawal fees discourage gaming
- Withdrawal windows provide fee-free exit mechanism
- Uses safe token transfers throughout
- Historical supply tracking for auditing
