# Fee Receiver Contract (TokenDistributor)

The TokenDistributor contract is a generic token distribution mechanism that can be used for fees, harvest cuts, or any other token distribution purpose.

## Overview

The TokenDistributor (`TokenDistributor_v1`) is a UUPS upgradeable contract that maintains a list of tokens and a list of recipients with share allocations. When `distribute()` is called, it distributes all held tokens proportionally to recipients based on their shares.

## Contract Architecture

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Storage**: Uses ERC-7201 namespaced storage
- **Access Control**: Uses BaoOwnableRoles for role-based access control
- **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuardTransientUpgradeable
- **Token Management**: Inherits from TokenHolder for token sweeping capabilities

## Storage State

- **name**: Human-readable name for the distributor (e.g., "fee distributor", "harvest distributor")
- **tokens**: Set of token addresses to distribute (all tokens use the same distribution)
- **distribution**: Array of `Split` structs containing recipient addresses and their shares
- **totalShares**: Sum of all shares (stored for gas efficiency)

## Split Structure

Each recipient is represented by a `Split` struct:
- **recipient**: Address to receive tokens
- **share**: Share amount (uint64, used to calculate proportion: `share / totalShares`)

## Key Functions

### Distribution

#### `distribute()`
Distributes all tokens held by the contract to recipients based on their shares.

**Access:** Owner or addresses with `CLAIMER_ROLE`

**Process:**
1. Iterates through all tokens in the token list
2. For each token, calculates the contract's balance
3. Distributes balance proportionally to all recipients based on shares
4. Formula: `recipientAmount = (tokenBalance × recipientShare) / totalShares`

**Effects:**
- Transfers tokens from contract to recipients
- All tokens are distributed in a single call
- Distribution is proportional based on shares

**Note:** All tokens use the same distribution. If different distributions are needed per token, use separate TokenDistributor contracts.

### Token Management

#### `addToken(address token)`
Adds a token to the distribution list.

**Access:** Owner only

**Parameters:**
- `token`: Address of the ERC20 token to add

**Effects:**
- Adds token to the token set
- Token will be distributed on next `distribute()` call

#### `removeToken(address token)`
Removes a token from the distribution list.

**Access:** Owner only

**Parameters:**
- `token`: Address of the ERC20 token to remove

**Effects:**
- Removes token from the token set
- Token will no longer be distributed

**Note:** Tokens cannot be swept (via TokenHolder) if they are still in the token list.

### Recipient Management

#### `setDistribution(address[] calldata recipients, uint[] calldata shares)`
Sets the complete distribution list, replacing any existing distribution.

**Access:** Owner only

**Parameters:**
- `recipients`: Array of recipient addresses
- `shares`: Array of share amounts (must match recipients length)

**Requirements:**
- Recipients and shares arrays must have the same length
- No duplicate recipients
- No zero addresses
- No zero shares
- Each share must be less than or equal to `type(uint64).max`

**Effects:**
- Replaces entire distribution array
- Updates totalShares
- Removes any recipients not in the new list

#### `addOrUpdateRecipient(address recipient, uint256 share)`
Adds a new recipient or updates an existing recipient's share.

**Access:** Owner only

**Parameters:**
- `recipient`: Address of the recipient
- `share`: Share amount for the recipient

**Effects:**
- If recipient exists: updates their share and recalculates totalShares
- If recipient is new: adds them to the distribution array
- Updates totalShares

#### `removeRecipient(address recipient)`
Removes a recipient from the distribution list.

**Access:** Owner only

**Parameters:**
- `recipient`: Address of the recipient to remove

**Effects:**
- Removes recipient from distribution array
- Updates totalShares
- Uses efficient removal (swaps with last element)

### View Functions

#### `name() returns (string memory)`
Returns the name of the distributor.

#### `tokens() returns (address[] memory)`
Returns array of all tokens being distributed.

#### `distribution() returns (address[] memory recipients, uint256[] memory shares, uint totalShares)`
Returns the complete distribution configuration:
- Array of recipient addresses
- Array of corresponding shares
- Total shares sum

## Token Collection

Tokens are collected by:

1. **Direct Transfer**: Any address can transfer ERC20 tokens to the contract
2. **Fee Collection**: Minter contracts transfer fees to the distributor
3. **Harvest Cuts**: StabilityPoolManager transfers harvest cuts to the distributor
4. **Sweep Function**: Owner can sweep tokens into the contract (if not in token list)

## Distribution Mechanism

### How It Works

1. **Setup**: Owner configures recipients and shares
2. **Collection**: Tokens accumulate in the contract
3. **Distribution**: Anyone with `CLAIMER_ROLE` (or owner) calls `distribute()`
4. **Proportional Split**: All tokens are distributed proportionally based on shares

### Share Calculation

Shares are not percentages - they are relative weights:

- **Example**: If totalShares = 1000, and recipient A has share = 300, recipient B has share = 700
- Recipient A gets: `(tokenBalance × 300) / 1000 = 30%`
- Recipient B gets: `(tokenBalance × 700) / 1000 = 70%`

### Single Distribution for All Tokens

**Important**: All tokens use the same distribution. If you need:
- Different distributions per token → Use separate TokenDistributor contracts
- Same distribution for all tokens → Use one TokenDistributor contract

## Use Cases

### Fee Distribution

Used as the fee receiver for Minter contracts:
- Minting fees are sent to the distributor
- Fees are distributed to treasury, TIDE holders, etc.

### Harvest Cut Distribution

Used by StabilityPoolManager for harvest cuts:
- Harvest cuts are sent to the distributor
- Cuts are distributed to protocol revenue recipients

### Custom Distributions

Can be used for any token distribution purpose:
- Protocol revenue sharing
- Reward distribution
- Treasury allocations

## Roles

- **CLAIMER_ROLE**: Can call `distribute()` function
- **Owner**: Can manage tokens, recipients, and upgrade contract

## Security Considerations

- Tokens in the token list cannot be swept (prevents accidental loss)
- Distribution is proportional and fair (based on shares)
- No minimum distribution amounts (distributes all available balance)
- Reentrancy protection on distribute function
- Duplicate recipients are prevented
- Zero shares are not allowed

## Events

- `TokenAdded(address indexed token)` - Emitted when a token is added
- `TokenRemoved(address indexed token)` - Emitted when a token is removed
- `DistributionUpdated()` - Emitted when distribution is updated
- `Distributed(address indexed token, address indexed recipient, uint256 amount)` - Emitted during distribution

## Example Configuration

For a fee distributor with three recipients:

```
Recipients: [Treasury, TIDE Holders, Reserve Pool]
Shares:     [500, 300, 200]
Total:      1000

Distribution:
- Treasury: 50% (500/1000)
- TIDE Holders: 30% (300/1000)
- Reserve Pool: 20% (200/1000)
```

All tokens held by the contract will be distributed in these proportions.
