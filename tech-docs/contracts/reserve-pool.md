# Reserve Pool Contract

The Reserve Pool contract holds ERC20 tokens in reserve for use by Minter contracts, primarily to provide discounts during minting and redemption operations.

## Overview

The Reserve Pool (`ReservePool_v1`) is a simple UUPS upgradeable contract that acts as a token vault. It holds tokens that can be requested by authorized Minter contracts to provide discounts to users. Anyone can deposit tokens into the pool, and only authorized requesters (Minter contracts) can withdraw tokens.

## Contract Architecture

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Storage**: Uses ERC-7201 namespaced storage (via BaoOwnableRoles)
- **Access Control**: Uses BaoOwnableRoles for role-based access control
- **Token Management**: Inherits from TokenHolder for token sweeping capabilities

## Key Functions

### Reserve Usage

#### `requestBonus(address token, address recipient, uint256 amountRequested)`
Requests tokens from the reserve pool. Called by Minter contracts to provide discounts to users.

**Parameters:**
- `token`: Address of the token to request
- `recipient`: Address to receive the tokens (typically the Minter contract)
- `amountRequested`: Amount of tokens requested

**Returns:**
- `amountSent`: Actual amount sent (may be less than requested if pool has insufficient balance)

**Access:** Only addresses with `REQUESTER_ROLE` (typically Minter contracts)

**Behavior:**
- If pool balance is greater than or equal to requested amount: sends full amount
- If pool balance is less than requested amount: sends available balance
- Emits `RequestBonus` event with both requested and actual amounts
- Returns zero if pool has no balance

**Use Case:**
- Minter contracts call this during minting/redemption operations when discounts apply
- Discounts are provided from the reserve pool to incentivize certain actions
- If pool doesn't have enough tokens, partial discount is provided

### Token Management

#### Depositing Tokens

The contract does not have an explicit `deposit()` function. Tokens are deposited by:

- **Direct Transfer**: Anyone can transfer ERC20 tokens directly to the contract address
- **Sweep Function**: Owner can use `sweep()` from TokenHolder to move tokens into the pool

#### Withdrawing Tokens

The contract does not have an explicit `withdraw()` function. Tokens are withdrawn by:

- **Request Bonus**: Authorized requesters (Minter contracts) can request tokens
- **Sweep Function**: Owner can use `sweep()` from TokenHolder to withdraw tokens

## Roles

- **REQUESTER_ROLE**: Can call `requestBonus()` (typically granted to Minter contracts)
- **Owner**: Can upgrade contract, manage roles, and sweep tokens

## Reserve Sources

Tokens can be added to the reserve pool from:

- Protocol fees collected and transferred to the pool
- Protocol revenue allocations
- Direct transfers from any address
- Emergency deposits from protocol treasury

## Reserve Usage Cases

The reserve pool is primarily used to provide discounts:

1. **Minting Discounts**: When minting leveraged tokens, discounts can be provided from reserves
2. **Redemption Discounts**: When redeeming pegged tokens, discounts can incentivize redemptions
3. **Collateral Ratio Incentives**: Discounts help maintain healthy collateral ratios
4. **Protocol Stability**: Reserves act as a buffer for protocol operations

## How It Works

### Discount Flow

1. User initiates mint/redemption on Minter contract
2. Minter calculates if discount applies based on collateral ratio
3. If discount applies, Minter calls `requestBonus()` on ReservePool
4. ReservePool transfers available tokens to Minter
5. Minter uses these tokens to provide discount to user

### Partial Fulfillment

- If reserve pool has insufficient balance, it sends what it has
- Minter receives actual amount sent (may be less than requested)
- Minter can handle partial discounts or revert if full discount required

## Safety Considerations

- **No Minimum Balance**: Pool can be completely drained if requested
- **No Withdrawal Limits**: Requesters can withdraw all available tokens
- **Access Control**: Only authorized requesters can withdraw (Minter contracts)
- **Owner Control**: Owner can sweep tokens for emergency withdrawals
- **Simple Design**: Minimal logic reduces attack surface

## Integration with Minter

The ReservePool is integrated with Minter contracts:

- Minter contracts are granted `REQUESTER_ROLE`
- During minting/redemption, Minter checks if discount applies
- If discount applies, Minter calls `requestBonus()` to get tokens
- Tokens are used to provide better rates to users
- This incentivizes actions that improve protocol health

## Events

- `RequestBonus(address indexed minter, address indexed token, address indexed receiver, uint256 amountRequested, uint256 amountSent)` - Emitted when tokens are requested from the pool
