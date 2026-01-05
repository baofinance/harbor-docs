# Minting Process Flow

This document describes the process of minting leveraged and pegged tokens in Harbor Protocol.

## Overview

Users can mint two types of tokens:
1. **Leveraged Tokens**: Provide leveraged exposure to the underlying asset
2. **Pegged Tokens**: Provide 1:1 exposure to the underlying asset

## Minting Leveraged Tokens

### Step-by-Step Process

1. **User Initiates Mint**
   - User calls `mintLeveragedToken(amount)` on the Minter contract
   - Provides collateral (e.g., wstETH)

2. **Price Oracle Query**
   - Minter queries the price oracle for current collateral and asset prices
   - Calculates exchange rate based on current prices

3. **Fee Calculation**
   - Protocol fees are calculated based on the mint amount
   - Fees are sent to the fee receiver contract

4. **Reserve Pool Update**
   - A portion of collateral is allocated to the reserve pool
   - Reserve pool balance is updated

5. **Token Minting**
   - Leveraged tokens are minted to the user
   - Amount minted = (collateral amount - fees - reserve) × leverage ratio / asset price

6. **Event Emission**
   - `LeveragedTokenMinted` event is emitted with details

### Example Flow

```
User deposits 10 wstETH
↓
Price Oracle: 1 wstETH = $3000, 1 ETH = $3000
↓
Fees: 0.5% = 0.05 wstETH → Fee Receiver
Reserve: 1% = 0.1 wstETH → Reserve Pool
Net: 9.85 wstETH
↓
Leverage: 3x
Minted: (9.85 × 3) / 1 = 29.55 leveraged tokens
```

## Minting Pegged Tokens

### Step-by-Step Process

1. **User Initiates Mint**
   - User calls `mintPeggedToken(amount)` on the Minter contract
   - Provides collateral (e.g., wstETH)

2. **Price Oracle Query**
   - Minter queries price oracle for current prices
   - Calculates 1:1 exchange rate

3. **Fee Calculation**
   - Protocol fees are calculated
   - Fees sent to fee receiver

4. **Reserve Pool Update**
   - Reserve allocation is made

5. **Token Minting**
   - Pegged tokens are minted 1:1 with collateral value
   - Amount minted = (collateral amount - fees - reserve) / asset price

6. **Event Emission**
   - `PeggedTokenMinted` event is emitted

### Example Flow

```
User deposits 10 wstETH
↓
Price Oracle: 1 wstETH = $3000, 1 ETH = $3000
↓
Fees: 0.5% = 0.05 wstETH → Fee Receiver
Reserve: 1% = 0.1 wstETH → Reserve Pool
Net: 9.85 wstETH
↓
Minted: 9.85 pegged tokens (1:1 ratio)
```

## Requirements

### Pre-Minting Checks

- Sufficient collateral balance
- Protocol is not paused
- Price oracle is not stale
- Minimum mint amount requirements met
- Maximum leverage limits not exceeded

### Post-Minting State

- User receives minted tokens
- Fees distributed to fee receiver
- Reserve pool updated
- Protocol state updated

## Burning Tokens

The reverse process (burning) follows similar steps:

1. User calls `burnLeveragedToken(amount)` or `burnPeggedToken(amount)`
2. Tokens are burned
3. Collateral is calculated based on current prices
4. Fees are deducted
5. Remaining collateral is returned to user

## Gas Considerations

- Minting operations require multiple contract calls
- Price oracle updates may be needed
- Multiple token transfers occur
- Gas costs vary based on network conditions
