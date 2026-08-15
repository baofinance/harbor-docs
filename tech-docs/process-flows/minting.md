# Minting Process Flow

This document describes minting and redeeming **ha** (pegged) and **hs** (Sail / leveraged) tokens via the market **minter**.

Live minters are **Minter_v2**. Numeric examples below are **illustrative** only. For integration, use `*DryRun` views — [Mint and redeem](../integrators/mint-redeem.md). Function SoT: [Minter](../contracts/minter.md).

:::note Graphics (design)
Placeholder: mint vs redeem swimlane (approve → dry-run → mint/redeem → feeReceiver / reserve discount). May share art with integrators/mint-redeem. Design team to supply.
:::

## Overview

| Token | Role |
| ----- | ---- |
| **Pegged (ha)** | Anchored claim on the market peg |
| **Leveraged (hs / Sail)** | Residual NAV of collateral vs ha |

Users deposit **wrapped collateral** (e.g. fxSAVE, wstETH). Prefer that path over zaps when you already hold wrapped collateral — [Zaps](../integrators/zaps.md).

## Mint (public API)

Signatures (Minter_v2):

```solidity
mintPeggedToken(uint256 wrappedCollateralIn, address receiver, uint256 minPeggedOut);
mintLeveragedToken(uint256 wrappedCollateralIn, address receiver, uint256 minLeveragedOut);
```

### Step-by-step

1. **Approve** wrapped collateral to the minter (or use a zap / permit path).  
2. **Quote** with `mintPeggedTokenDryRun` / `mintLeveragedTokenDryRun`.  
   - If incentive ratio is `1e18` **or** taken/out amount is `0`, the action is disallowed at the current CR — do not send the tx.  
   - Near band edges, `taken` may be **less than** `wrappedCollateralIn` (partial fill).  
3. Set `minOut` from the dry-run with your slippage buffer.  
4. **Execute** `mintPeggedToken` / `mintLeveragedToken`.  
5. Protocol **fees** (when the incentive ratio is a fee) go to `feeReceiver`.  
6. **Discounts** (when the ratio is negative) are funded via `ReservePool.requestBonus` when the reserve has balance — not “reserve allocation on mint.”

There is **no** public `burnPeggedToken` / `burnLeveragedToken`. Exit with **redeem** (below).

### Illustrative ha mint (not a quote)

```text
User holds 10 wrapped collateral units
↓
mintPeggedTokenDryRun(10e18) → incentiveRatio, wrappedFee, taken, peggedMinted, price, rate
↓
If allowed: mintPeggedToken(10e18, receiver, minPeggedOut)
↓
ha minted to receiver; fee (if any) → feeReceiver
```

## Redeem (public API)

```solidity
redeemPeggedToken(uint256 peggedIn, address receiver, uint256 minWrappedCollateralOut);
redeemLeveragedToken(uint256 leveragedIn, address receiver, uint256 minWrappedCollateralOut);
```

1. Quote with the matching `*DryRun`.  
2. Burn path is internal to the minter (`Burn1Arg` / `Burn2Arg` / `BurnFrom` per market). Approve ha/hs to the minter only if the burn signature requires it.  
3. Wrapped collateral returns to `receiver` (subject to fees/discounts and CR bands).

## Restricted paths

`freeMint*` / `freeRedeem*` require `ZERO_FEE_ROLE` (stability pool manager / protocol). External integrators use the public `mint*` / `redeem*` functions.

## Related

- [Mint and redeem](../integrators/mint-redeem.md)  
- [Market state and fees](../integrators/market-state-and-fees.md)  
- [Pricing](../integrators/pricing.md)
