# Mint and redeem

Integrate against the market **minter** proxy. Quotes are **view dry-runs**; execution is `approve` (or permit via zap) then `mint*` / `redeem*`. Live minters are **Minter_v2**.

:::note Graphics (design)
Placeholder: approve → dry-run → mint/redeem sequence. Design team to supply.
:::

Process-flow narrative (illustrative math, not a quote): [Minting process flow](../process-flows/minting.md). Function SoT: [Minter](../contracts/minter.md).

## Direct vs zap

| Path | When |
| ---- | ---- |
| **Direct** | You already hold **wrapped collateral** (fxSAVE, wstETH, …). Call the minter. |
| **Zap** | User has ETH / stETH / USDC / fxUSD. Use the market’s genesis or minter zap if listed — [Zap contracts](../contracts/zap.md). Zaps are convenience only. |

Prefer wrapped collateral when integrating another protocol (fewer moving parts, no zap upgrade surface). One-click ETH/stETH/USDC paths: [Zaps](./zaps.md).

## Cookbook (direct mint ha)

1. Resolve addresses from the [market page](../markets/haeth/fxusd.md) (`minter`, `wrappedCollateralToken`, `peggedToken`).  
2. `wrappedCollateral.approve(minter, amount)` (or exact allowance).  
3. Quote:

```text
minter.mintPeggedTokenDryRun(wrappedCollateralIn)
```

Returns incentive ratio, fees, output amounts, price, and rate (see minter page). Abort without sending the tx if the ratio is **1e18** (disallowed at the current CR) **or** any relevant taken / used / out amount is **0**.

4. Set `minPeggedOut` from the dry-run output with your slippage buffer.  
5. Execute:

```solidity
minter.mintPeggedToken(wrappedCollateralIn, receiver, minPeggedOut);
```

Mint **hs** with `mintLeveragedToken` / `mintLeveragedTokenDryRun`. Redeem with `redeemPeggedToken` / `redeemLeveragedToken` and matching dry-runs (`minWrappedCollateralOut`).

## Dry-run fields (how to use them)

Treat dry-run as the **quote API**. Decode returns **by position** (shapes differ per function — see [Minter dry-runs](../contracts/minter.md#dry-run-functions)):

| Field family | How to use |
| ------------ | ---------- |
| **Incentive ratio** | Fee (positive), discount (negative), or disallow (`== 1e18`). Also abort if taken/out is `0`. |
| **Fees / discounts** | Already reflected in the out preview; discounts come from the reserve when funded. |
| **Taken / used / out** | Basis for `minOut`; near bands, `taken` may be less than `in` (partial). |
| **Price / rate** | 18-decimal Harbor units — do not mix with 8-decimal Chainlink. |

Re-quote **immediately before submission** if CR is near a band edge (fees are path-dependent integrals). A normal `eth_call` and the later mined transaction can land in different blocks — `minOut` remains the execution guard unless you use a transaction-bundled or on-chain quote.

## Approvals and tokens

- Mint: approve **wrapped collateral** to the minter.  
- Redeem ha: the minter burns ha from the sender (`_BURN_SIGNATURE` is immutable per market — Burn1Arg / Burn2Arg / BurnFrom). If redeem reverts on allowance, approve ha to the minter.  
- Redeem hs: same pattern for the leveraged token.

## Restricted paths

`freeMint*` / `freeRedeem*` require `ZERO_FEE_ROLE` (stability pool manager / protocol). External protocols should use the public `mint*` / `redeem*` functions.

## Related

- [Market state and fees](./market-state-and-fees.md)  
- [Pricing](./pricing.md)
