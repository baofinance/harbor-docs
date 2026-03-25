# Minter Contract

The Minter contract is responsible for minting and redeeming leveraged tokens (hsTokens) and pegged tokens (haTokens) in exchange for wrapped collateral.

## Overview

The Minter is a UUPS upgradeable contract that handles the core minting and redemption operations for Harbor Protocol markets. It implements a sophisticated fee/discount system based on collateral ratios and provides price stability through stability pools.

The Solidity implementation in the Harbor repository is organized around `Minter_v1.sol`; production minters were **upgraded to `Minter_v2` in March 2026** to fix an incorrect Sail (leveraged-token) minting path in `freeRedeemPeggedToken` during rebalances. The fix is a minimal change (two lines) to the Sail minting calculation; all markets received the upgrade. For the incident timeline, pool remediation, and verification, see [fxUSD–ETH Sail stability pool rebalance remediation](../remediation/fxusd-eth-sail-rebalance).

## March 2026 upgrade (Sail minting fix)

A bug in `Minter_v1` caused Sail rewards minted to the Sail stability pool during protocol rebalances to be overstated (approximately 23×) when pegged tokens were redeemed via the fee-free path used by the stability pool manager. Collateral ratio restoration per rebalance was correct; only the Sail reward leg was wrong.

**Remediation:** Upgrade to `Minter_v2` with the corrected `freeRedeemPeggedToken` logic, expanded automated tests, and a one-time on-chain remediation for the affected fxUSD–ETH Sail pool (integral rescale, excess Sail burn, treasury coverage of a small fxSAVE gap where tokens had already left the pool). Full narrative and links to the fix, deployment, and remediation commits: [fxUSD–ETH Sail stability pool rebalance remediation](../remediation/fxusd-eth-sail-rebalance).

## Contract Architecture

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Storage**: Uses ERC-7201 namespaced storage
- **Access Control**: Uses BaoOwnableRoles for role-based access control
- **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuardTransientUpgradeable

## Immutable Addresses

Set during contract construction (cannot be changed):

- **WRAPPED_COLLATERAL_TOKEN**: The wrapped collateral token (e.g., wstETH)
- **PEGGED_TOKEN**: The pegged token contract (haToken, e.g., haETH)
- **LEVERAGED_TOKEN**: The leveraged token contract (hsToken, e.g., hsETHxFxSAVE)
- **_BURN_SIGNATURE**: The burn signature type for the pegged token (Burn1Arg, Burn2Arg, or BurnFrom)

## Storage State

- **peggedTokenBalance**: Total pegged tokens minted by this contract (tracks only tokens minted here, not total supply)
- **underlyingCollateral**: Total underlying collateral backing the tokens
- **reservePool**: Address of the reserve pool (source of discounts)
- **feeReceiver**: Address that receives protocol fees
- **priceOracle**: Address of the price oracle contract
- **incentiveConfig**: Configuration for fees, discounts, and disallows based on collateral ratio bands

## Key Functions

### Minting Functions

#### `mintPeggedToken(uint256 wrappedCollateralIn, address receiver, uint256 minPeggedOut)`
Mints pegged tokens (haTokens) by depositing wrapped collateral.

**Parameters:**
- `wrappedCollateralIn`: Amount of wrapped collateral to deposit
- `receiver`: Address to receive the minted pegged tokens
- `minPeggedOut`: Minimum amount of pegged tokens expected (slippage protection)

**Returns:**
- `peggedOut`: Amount of pegged tokens minted

**Effects:**
- Transfers wrapped collateral from sender to contract
- Mints pegged tokens to receiver
- Applies fees based on current collateral ratio
- Updates `peggedTokenBalance` and `underlyingCollateral`

#### `mintLeveragedToken(uint256 wrappedCollateralIn, address receiver, uint256 minLeveragedOut)`
Mints leveraged tokens (hsTokens) by depositing wrapped collateral.

**Parameters:**
- `wrappedCollateralIn`: Amount of wrapped collateral to deposit
- `receiver`: Address to receive the minted leveraged tokens
- `minLeveragedOut`: Minimum amount of leveraged tokens expected (slippage protection)

**Returns:**
- `leveragedOut`: Amount of leveraged tokens minted

**Effects:**
- Transfers wrapped collateral from sender to contract
- Mints leveraged tokens to receiver
- Applies fees or discounts based on current collateral ratio
- Updates `underlyingCollateral`

### Redemption Functions

#### `redeemPeggedToken(uint256 peggedIn, address receiver, uint256 minWrappedCollateralOut)`
Redeems pegged tokens (haTokens) for wrapped collateral.

**Parameters:**
- `peggedIn`: Amount of pegged tokens to redeem
- `receiver`: Address to receive the wrapped collateral
- `minWrappedCollateralOut`: Minimum amount of wrapped collateral expected (slippage protection)

**Returns:**
- `wrappedCollateralOut`: Amount of wrapped collateral returned

**Effects:**
- Burns pegged tokens from sender
- Transfers wrapped collateral to receiver
- Applies fees or discounts based on current collateral ratio
- May request bonus from reserve pool if discount applies
- Updates `peggedTokenBalance` and `underlyingCollateral`

#### `redeemLeveragedToken(uint256 leveragedIn, address receiver, uint256 minWrappedCollateralOut)`
Redeems leveraged tokens (hsTokens) for wrapped collateral.

**Parameters:**
- `leveragedIn`: Amount of leveraged tokens to redeem
- `receiver`: Address to receive the wrapped collateral
- `minWrappedCollateralOut`: Minimum amount of wrapped collateral expected (slippage protection)

**Returns:**
- `wrappedCollateralOut`: Amount of wrapped collateral returned

**Effects:**
- Burns leveraged tokens from sender
- Transfers wrapped collateral to receiver
- Applies fees based on current collateral ratio
- Updates `underlyingCollateral`

### Fee-Free Functions (Restricted Access)

These functions are available only to addresses with `ZERO_FEE_ROLE`:

- `freeMintPeggedToken(uint256 wrappedCollateralIn, address receiver)`
- `freeRedeemPeggedToken(uint256 peggedForCollateral, uint256 peggedForLeveraged, address receiver)`
- `freeMintLeveragedToken(uint256 wrappedCollateralIn, address receiver)`
- `freeRedeemLeveragedToken(uint256 leveragedIn, address receiver)`

### Dry Run Functions

These view functions simulate minting/redemption operations without executing them:

- `mintPeggedTokenDryRun(uint256 wrappedCollateralIn)` - Returns incentive ratio, fees, amounts, price, and rate
- `redeemPeggedTokenDryRun(uint256 peggedIn)` - Returns incentive ratio, fees, discounts, amounts, price, and rate
- `mintLeveragedTokenDryRun(uint256 wrappedCollateralIn)` - Returns incentive ratio, fees, discounts, amounts, price, and rate
- `redeemLeveragedTokenDryRun(uint256 leveragedIn)` - Returns incentive ratio, fees, amounts, price, and rate

### View Functions

#### Price and Ratio Queries

- `collateralRatio() returns (uint256)` - Current collateral ratio (collateral value / pegged token value)
- `leverageRatio() returns (uint256)` - Current leverage ratio (capped at 20x)
- `peggedTokenPrice() returns (uint256)` - Current price of pegged token
- `leveragedTokenPrice() returns (uint256)` - Current NAV of leveraged token

#### Incentive Ratio Queries

- `mintPeggedTokenIncentiveRatio() returns (int256)` - Fee/discount ratio for minting pegged tokens
- `redeemPeggedTokenIncentiveRatio() returns (int256)` - Fee/discount ratio for redeeming pegged tokens
- `mintLeveragedTokenIncentiveRatio() returns (int256)` - Fee/discount ratio for minting leveraged tokens
- `redeemLeveragedTokenIncentiveRatio() returns (int256)` - Fee/discount ratio for redeeming leveraged tokens

#### Balance Queries

- `peggedTokenBalance() returns (uint256)` - Total pegged tokens minted by this contract
- `leveragedTokenBalance() returns (uint256)` - Total supply of leveraged tokens
- `collateralTokenBalance() returns (uint256)` - Total underlying collateral

#### Other View Functions

- `harvestable() returns (uint256)` - Amount of wrapped collateral available for harvesting
- `redeemPeggedForCollateralRatio(uint256 targetCollateralRatio)` - Calculates how to split pegged redemption to achieve target CR
- `config() returns (Config)` - Returns the current incentive configuration

### Configuration Functions (Owner Only)

- `updateConfig(Config calldata config_)` - Updates fee/discount/disallow configuration
- `updatePriceOracle(address priceOracle_)` - Updates the price oracle address
- `updateFeeReceiver(address feeReceiver_)` - Updates the fee receiver address
- `updateReservePool(address reservePool_)` - Updates the reserve pool address
- `reset()` - Resets underlying collateral tracking (for accounting corrections)

## Fee, Discount, and Disallow System

The contract implements a sophisticated incentive system based on collateral ratio bands:

- **Positive values**: Fees (taken from input/output)
- **Negative values**: Discounts (provided from reserve pool)
- **Value == 1 ether**: Disallow (action blocked at that collateral ratio)

Fees and discounts are calculated as definite integrals across collateral ratio boundaries, ensuring fairness regardless of transaction size.

## Dependencies

- **LEVERAGED_TOKEN**: The leveraged token contract (MintableBurnableERC20)
- **PEGGED_TOKEN**: The pegged token contract (MintableBurnableERC20)
- **WRAPPED_COLLATERAL_TOKEN**: The wrapped collateral token (e.g., wstETH)
- **priceOracle**: Price oracle implementing `IWrappedPriceOracle` interface
- **reservePool**: Reserve pool implementing `IReservePool` interface (source of discounts)
- **feeReceiver**: Address that receives protocol fees (typically TokenDistributor)

## Security Considerations

- All mutating functions are protected by `nonReentrant` modifier
- Price oracle provides min/mid/max prices for different use cases
- Minimum output amounts prevent excessive slippage
- Disallow mechanism can block actions at dangerous collateral ratios
- Reserve pool capacity limits discount amounts
- Leverage ratio is capped at 20x
- Contract uses UUPS upgradeable pattern (only owner can upgrade)
