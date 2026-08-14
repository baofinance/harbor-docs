# Stability pools (integrator appendix)

Product explanation: [Stability Pools](/stability-pools). Contract SoT: [Stability pool](../contracts/stability-pool.md), [Manager](../contracts/stability-pool-manager.md). Flow: [Stability pools process](../process-flows/stability-pools.md).

## Rules that bite integrators

| Rule | Detail |
| ---- | ------ |
| Deposit asset | **haTokens (pegged) only** — not hs, not raw collateral |
| Two pools per market | **Collateral** pool and **Sail** pool — both take ha |
| Yield | Both pools earn concentrated collateral yield / harvest on ha deposits |
| Rebalance payout | Collateral pool → **wrapped collateral**; Sail pool → **hsTokens**. Deposited ha is burned. |
| hs in a wallet | Does **not** earn concentrated yield |

Live pools are **v1/v2** compounding-balance contracts, not ERC-4626. Harbor Yield **v3** ERC-20 shares (`hp…`) are on the yield branch — do not assume `deposit(assets, receiver)` ERC-4626 semantics on mainnet pools today.

## Integrator call path

1. User holds **ha** (mint via [mint/redeem](./mint-redeem.md) or buy).  
2. `ha.approve(stabilityPool, amount)`.  
3. `deposit(assetAmount, receiver, minAmount)` — `type(uint256).max` = full balance.  
4. Withdrawals use a **delay window**: `requestWithdrawal()` then `withdraw` inside the window. Early-exit fees may apply.  
5. Rewards / rebalance receipts: `claimable` / `claim` (token = wrapped collateral or hs, depending on pool).

Minimum deposit and `MIN_TOTAL_ASSET_SUPPLY` floors apply — see the stability pool page.

## Rebalance

When `collateralRatio < rebalanceThreshold`, keepers call `StabilityPoolManager.rebalance`. Your users’ ha in the pool can be reduced; they receive the pool’s **liquidation token**. Keeper notes: [Rebalance](../process-flows/rebalance.md).

## Related

- [Harbor Yield](../contracts/harbor-yield.md) (Compounder / hy siblings over these pools; pre-prod)
