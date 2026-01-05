# Genesis Contract

The Genesis contract provides a bootstrapping mechanism for new Harbor Protocol markets, allowing early participants to deposit collateral and receive initial pegged and leveraged tokens.

## Overview

The Genesis contract (`Genesis_v1`) is a UUPS upgradeable contract that facilitates the initial launch (Maiden Voyage) of a new market. Users deposit collateral during the genesis phase, and once the phase ends, they can claim their proportional share of minted pegged and leveraged tokens.

## Contract Architecture

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Storage**: Uses ERC-7201 namespaced storage
- **Access Control**: Uses BaoOwnable for owner-only functions
- **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuardTransientUpgradeable

## Immutable Addresses

Set during contract construction (cannot be changed):

- **MINTER**: Address of the Minter contract
- **PEGGED_TOKEN**: The pegged token contract (haToken)
- **WRAPPED_COLLATERAL_TOKEN**: The wrapped collateral token (e.g., wstETH)
- **LEVERAGED_TOKEN**: The leveraged token contract (hsToken)
- **STABILITY_POOL_COLLATERAL**: Address of the collateral stability pool
- **STABILITY_POOL_LEVERAGED**: Address of the leveraged (Sail) stability pool

## Storage State

- **shares**: Mapping of user addresses to their deposit shares (1:1 with collateral deposited)
- **totalSharesAtGenesisEnd**: Total shares at the time genesis ended (used for claim calculations)
- **totalPeggedAtGenesisEnd**: Total pegged tokens minted at genesis end
- **totalLeveragedAtGenesisEnd**: Total leveraged tokens minted at genesis end
- **genesisEnded**: Boolean flag indicating if genesis phase has ended

## Genesis Phase Flow

### Phase 1: Deposit Phase (Genesis Active)

Users can deposit wrapped collateral and receive shares:

1. **Deposit**: Users call `deposit()` with wrapped collateral
2. **Shares**: Users receive shares equal to their deposit amount (1:1 ratio)
3. **Withdrawal**: Users can withdraw their deposits (shares) before genesis ends
4. **No Fees**: Deposits and withdrawals during genesis phase are fee-free

### Phase 2: Genesis End (Owner Action)

Owner calls `endGenesis()` to finalize the genesis phase:

1. **Snapshot**: Records total shares and collateral balance
2. **Split**: Splits collateral 50/50 between pegged and leveraged minting
3. **Minting**: Mints pegged tokens (50%) and leveraged tokens (50%) via Minter (fee-free)
4. **Finalization**: Marks genesis as ended

### Phase 3: Claim Phase (Genesis Ended)

After genesis ends, users have two options:

1. **Claim Tokens** (Free): Claim proportional share of minted pegged and leveraged tokens
2. **Withdraw Collateral** (Fee): Withdraw original collateral (subject to Minter fees)

## Key Functions

### Deposit Phase Functions

#### `deposit(uint256 collateralIn, address receiver)`
Deposits wrapped collateral during the genesis phase.

**Parameters:**
- `collateralIn`: Amount of wrapped collateral to deposit (use `type(uint256).max` for all)
- `receiver`: Address to receive the shares

**Effects:**
- Transfers wrapped collateral from sender to contract
- Increases receiver's shares by deposit amount (1:1 ratio)
- Emits `Deposit` event

**Requirements:**
- Genesis phase must be active (not ended)
- Receiver cannot be zero address

#### `withdraw(uint256 amount, address receiver)`
Withdraws collateral during the genesis phase (before genesis ends).

**Parameters:**
- `amount`: Amount of shares to withdraw (use `type(uint256).max` for all)
- `receiver`: Address to receive the collateral

**Returns:**
- `collateralOut`: Amount of collateral returned

**Effects:**
- Reduces sender's shares
- Transfers wrapped collateral to receiver
- Emits `Withdraw` event

**Requirements:**
- Genesis phase must be active (not ended)
- Sender must have sufficient shares
- Receiver cannot be zero address

**Note:** After genesis ends, users cannot withdraw directly. They must either claim tokens or use Minter's redemption functions (which charge fees).

### Claim Phase Functions

#### `claim(address receiver)`
Claims the user's proportional share of minted pegged and leveraged tokens.

**Parameters:**
- `receiver`: Address to receive the tokens

**Effects:**
- Calculates user's share based on their shares vs total shares at genesis end
- Transfers proportional pegged tokens to receiver
- Transfers proportional leveraged tokens to receiver
- Sets user's shares to zero (one-time claim)
- Emits `Claim` event

**Requirements:**
- Genesis phase must have ended
- User must have shares to claim
- Receiver cannot be zero address

**Calculation:**
- `peggedAmount = (userShares × totalPeggedAtGenesisEnd) / totalSharesAtGenesisEnd`
- `leveragedAmount = (userShares × totalLeveragedAtGenesisEnd) / totalSharesAtGenesisEnd`

### View Functions

#### `balanceOf(address depositor) returns (uint256)`
Returns the number of shares held by a depositor.

#### `claimable(address depositor) returns (uint256 peggedAmount, uint256 leveragedAmount)`
Returns the claimable amounts for a depositor (only available after genesis ends).

#### `genesisIsEnded() returns (bool)`
Returns whether the genesis phase has ended.

### Admin Functions (Owner Only)

#### `endGenesis()`
Ends the genesis phase and mints initial tokens.

**Process:**
1. Records total shares and collateral balance
2. Splits collateral: 50% for pegged tokens, 50% for leveraged tokens
3. Mints pegged tokens via `Minter.freeMintPeggedToken()`
4. Mints leveraged tokens via `Minter.freeMintLeveragedToken()`
5. Stores totals for claim calculations
6. Sets `genesisEnded` to true

**Effects:**
- Emits `GenesisEnds` event
- Mints initial supply of pegged and leveraged tokens
- Enables claim functionality
- Disables further deposits

**Note:** Any rounding in the 50/50 split goes to leveraged tokens (e.g., if odd amount, leveraged gets the extra).

## Share System

- **1:1 Ratio**: Each unit of wrapped collateral deposited equals 1 share
- **Proportional Claims**: After genesis ends, shares determine proportional claim amounts
- **One-Time Claim**: Shares are set to zero after claiming (cannot claim twice)
- **Withdrawal**: Shares can be withdrawn during genesis phase (1:1 collateral return)

## Dependencies

- **MINTER**: Reference to the Minter contract (for minting tokens)
- **LEVERAGED_TOKEN**: The leveraged token contract (hsToken)
- **PEGGED_TOKEN**: The pegged token contract (haToken)
- **WRAPPED_COLLATERAL_TOKEN**: The wrapped collateral token (e.g., wstETH)
- **STABILITY_POOL_COLLATERAL**: Collateral stability pool address
- **STABILITY_POOL_LEVERAGED**: Leveraged stability pool address

## Use Cases

### For Users

1. **Early Participation**: Deposit during genesis to get initial tokens
2. **Risk-Free Entry**: Can withdraw before genesis ends if needed
3. **Free Token Claim**: Claim tokens without fees after genesis ends
4. **Flexible Exit**: Can claim tokens or withdraw collateral (with fees)

### For Protocol

1. **Bootstrap Liquidity**: Initial collateral and token supply
2. **Fair Distribution**: Proportional allocation based on deposits
3. **Market Launch**: Establishes initial market state
4. **Community Building**: Incentivizes early adopters

## Security Considerations

- Genesis phase can only be ended once (by owner)
- Users cannot claim before genesis ends
- Users cannot withdraw after genesis ends (must use Minter)
- Shares are tracked per address (no ERC20 token)
- Uses safe token transfers throughout
- Reentrancy protection on withdrawal and claim functions

## Events

- `GenesisBegins()` - Emitted when contract is initialized
- `GenesisEnds()` - Emitted when genesis phase ends
- `Deposit(address indexed caller, address indexed receiver, uint256 collateralIn)` - Emitted on deposit
- `Withdraw(address indexed caller, address indexed receiver, uint256 amount)` - Emitted on withdrawal
- `Claim(address indexed caller, address indexed receiver, uint256 peggedAmount, uint256 leveragedAmount)` - Emitted on claim
