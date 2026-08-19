# Stability Pool Manager Contract

The Stability Pool Manager contract coordinates rebalancing and harvesting operations between the two stability pools for a market.

![CR breach, pool ha, minter redeem, then pool-specific payouts.](/img/19-rebalance-sequence.png)



## Overview

The Stability Pool Manager (`StabilityPoolManager_v1`) is a UUPS upgradeable contract that manages two fixed stability pools and coordinates system rebalancing and yield harvesting. It does not create pools dynamically; instead, it manages two pre-configured pools set during contract construction.

## Contract Architecture

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Storage**: Uses ERC-7201 namespaced storage
- **Access Control**: Uses BaoOwnableRoles for role-based access control
- **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuardTransientUpgradeable

## Immutable Addresses

Set during contract construction (cannot be changed):

- **MINTER**: Address of the Minter contract
- **PEGGED_TOKEN**: The pegged token contract (haToken)
- **WRAPPED_COLLATERAL_TOKEN**: The wrapped collateral token (e.g., wstETH)
- **LEVERAGED_TOKEN**: The leveraged token contract (hsToken)
- **TREASURY**: Protocol treasury address
- **_STABILITY_POOL_COLLATERAL**: Address of the collateral stability pool
- **_STABILITY_POOL_LEVERAGED**: Address of the leveraged (Sail) stability pool

## Storage State

- **rebalanceBountyRatio**: Fixed bounty amount for rebalancing (as ratio of liquidation proceeds)
- **rebalanceThreshold**: The collateral ratio threshold at which rebalancing should occur
- **harvestBountyRatio**: Percentage-based bounty for harvesting (as ratio of harvested amount)
- **harvestCutRatio**: Percentage-based cut for harvesting (as ratio of harvested amount)
- **feeReceiver**: Address that receives the harvest cut (defaults to TREASURY if not set)

## Key Functions

### Core Operations

#### `rebalance(address bountyReceiver, uint256 minPeggedLiquidated)`
Rebalances the system when the collateral ratio falls below the rebalance threshold by liquidating pegged tokens from stability pools.

**Parameters:**
- `bountyReceiver`: Address to receive the rebalance bounty
- `minPeggedLiquidated`: Minimum amount of pegged tokens expected to be liquidated (slippage protection)

**Returns:**
- `peggedLiquidated`: Total amount of pegged tokens liquidated

**Process:**
1. Checks if collateral ratio is below rebalance threshold
2. Calculates how much pegged tokens need to be liquidated to reach the threshold
3. Distributes liquidation between pools based on their weighted holdings
4. Sweeps pegged tokens from both pools
5. Redeems pegged tokens via Minter (fee-free)
6. Distributes liquidation proceeds:
   - Takes rebalance bounty for caller
   - Transfers remainder to respective stability pools
   - Notifies pools of liquidation via `notifyLiquidation()`

**Effects:**
- Reduces pegged token supply
- Increases collateral ratio back above threshold
- Distributes wrapped collateral to collateral pool
- Distributes leveraged tokens to leveraged pool

#### `harvest(address bountyReceiver, uint256 minBounty)`
Harvests yield accrued from holding wrapped collateral (e.g., staking rewards) and distributes it to stability pools.

**Parameters:**
- `bountyReceiver`: Address to receive the harvest bounty
- `minBounty`: Minimum bounty amount expected (slippage protection)

**Returns:**
- `harvestedAmount`: Total amount harvested

**Process:**
1. Checks if there's harvestable amount available from Minter
2. Calculates bounty and cut amounts
3. Sweeps harvestable wrapped collateral from Minter
4. Distributes:
   - Bounty to caller
   - Cut to fee receiver (or treasury if not set)
   - Remainder proportionally to stability pools based on their pegged token holdings

**Effects:**
- Transfers yield to stability pools as rewards
- Rewards are deposited via `depositReward()` on each pool
- Depositors claim via `claimable` / `claim` (not a gauge system)

### View Functions

#### Pool Information

- `stabilityPools() returns (address[] memory)` - Returns array of both stability pool addresses
- `hasStabilityPool(address stabilityPool) returns (bool)` - Checks if an address is one of the managed pools

#### State Queries

- `harvestable() returns (uint256)` - Amount available to harvest from Minter
- `rebalanceable() returns (bool)` - Whether system can be rebalanced (CR below threshold)
- `rebalanceThreshold() returns (uint256)` - Current rebalance threshold collateral ratio
- `rebalanceBountyRatio() returns (uint256)` - Current rebalance bounty ratio
- `harvestBountyRatio() returns (uint256)` - Current harvest bounty ratio
- `harvestCutRatio() returns (uint256)` - Current harvest cut ratio
- `feeReceiver() returns (address)` - Address receiving harvest cuts

### Admin Functions (Owner Only)

#### Configuration Updates

- `updateRebalanceThreshold(uint256 newRatio)` - Updates the collateral ratio threshold for rebalancing
  - Must be greater than 1 ether
- `updateRebalanceBountyRatio(uint256 rebalanceRatio_)` - Updates rebalance bounty ratio
  - Must be less than or equal to 1 ether
- `updateHarvestBountyRatio(uint256 harvestRatio_)` - Updates harvest bounty ratio
  - Must be less than or equal to 1 ether
- `updateHarvestCutRatio(uint256 harvestCutRatio_)` - Updates harvest cut ratio
  - Must be less than or equal to 1 ether
- `updateFeeReceiver(address feeReceiver_)` - Updates the fee receiver address

## Rebalancing Mechanism

Rebalancing occurs when the collateral ratio falls below the configured threshold:

1. **Trigger**: Collateral ratio below rebalance threshold
2. **Calculation**: Determines how much pegged tokens to liquidate to reach threshold
3. **Distribution**: Splits liquidation between pools based on:
   - Pool holdings (pegged token balances)
   - Effectiveness (collateral pool vs leveraged pool)
4. **Execution**: Uses Minter's fee-free redemption to liquidate
5. **Rewards**: Distributes liquidation proceeds to pools, minus bounty

The rebalance bounty incentivizes keepers to call this function when needed.

## Harvesting Mechanism

Harvesting extracts yield accrued from wrapped collateral:

1. **Source**: Yield from holding wrapped collateral (e.g., stETH rewards)
2. **Calculation**: Determines harvestable amount from Minter
3. **Distribution**:
   - Bounty to caller (incentive)
   - Cut to fee receiver (protocol revenue)
   - Remainder to pools (proportional to holdings)
4. **Rewards**: Pools distribute harvested yield to depositors

Example harvest splits (configured amounts come from `harvestBountyRatio` and `harvestCutRatio`):

| Harvest Method | Manual example | Fixed example |
| -------------- | -------------- | ------------- |
| Bounty | 1% | 1% |
| Cut | 99% | 24% |
| Stability pools | 0% | 75% |

**Notes:**

1. Stability pool distribution is split over the linked stability pools.
2. Bounty and cut cannot exceed 100% together.

The harvest bounty incentivizes keepers to call this function regularly.

## Dependencies

- **MINTER**: Reference to the Minter contract (for rebalancing and harvesting)
- **LEVERAGED_TOKEN**: The leveraged token contract (hsToken)
- **PEGGED_TOKEN**: The pegged token contract (haToken)
- **WRAPPED_COLLATERAL_TOKEN**: The wrapped collateral token (e.g., wstETH)
- **TREASURY**: Protocol treasury address (fallback for harvest cuts)
- **feeReceiver**: Address that receives protocol fees (harvest cuts)
- **_STABILITY_POOL_COLLATERAL**: Collateral stability pool contract
- **_STABILITY_POOL_LEVERAGED**: Leveraged (Sail) stability pool contract

## Stability Pool Types

The contract manages two fixed pools:

1. **Collateral Stability Pool** (`_STABILITY_POOL_COLLATERAL`):
   - Uses wrapped collateral (e.g., wstETH) as liquidation token
   - Receives wrapped collateral during rebalancing
   - Provides stability through collateral-backed liquidations

2. **Sail Stability Pool** (`_STABILITY_POOL_LEVERAGED`):
   - Uses leveraged tokens (hsTokens) as liquidation token
   - Receives leveraged tokens during rebalancing
   - Provides stability through leveraged token liquidations

## Security Considerations

- All mutating functions are protected by `nonReentrant` modifier
- Rebalancing can only occur when collateral ratio is below threshold
- Harvesting requires non-zero harvestable amount
- Bounty and cut ratios are capped at 1 ether (100%)
- Rebalance threshold must be > 1 ether to prevent invalid configurations
- Uses safe token transfers throughout
