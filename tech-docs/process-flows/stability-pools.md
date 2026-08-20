# Stability Pools Process Flow

How live stability pools take **ha** deposits, pay rewards, and participate in rebalances.

Live pools are **StabilityPool_v1 / v2** (compounding balances). **ERC-20 pool shares (`hp…`)** and ERC-4626 Compounders are **Harbor Yield / SP_v3** (pre-prod) — not the live deposit UX. Integrator appendix: [Stability pools](../integrators/stability-pools.md). Contract SoT: [Stability pool](../contracts/stability-pool.md).

![A live SP_v1 / v2 position is a balance, not a share token.](/img/20-stability-pool-lifecycle.png)



## Overview

| Rule | Detail |
| ---- | ------ |
| Deposit asset | **ha (pegged) only** — collateral pool and Sail pool |
| Live accounting | Internal compounding `TokenBalance` + DecrementalFloatingPoint (loss product) — **not** LP/stake ERC-20s or gauges |
| Yield | Harvest / revenue → `depositReward` → **claimable** reward tokens |
| Rebalance | Collateral pool receives **wrapped collateral**; Sail pool receives **hs** |

## Deposit

1. User calls `deposit(assetAmount, receiver, minAmount)` with **ha**. Use `type(uint256).max` for **`assetAmount`** to deposit the full balance; set **`minAmount`** to `0` or a quoted lower bound (not the max sentinel).  
2. Pool pulls ha from the sender and credits the receiver’s **compounding ha balance**.  
3. No stake-token mint and no gauge stake on live v1/v2.  
4. `Deposit` is emitted (`owner`, `receiver`, `amount`).

```text
User deposits 100 ha
↓
Pool ha balance of user += 100 (subject to loss product accounting)
↓
User may later claim separate reward tokens if any accrued
```

## Withdrawal

1. User calls `withdraw(assetAmount, receiver, minAmount)` for an **ha amount** (not “burn stake tokens”).  
2. Live pools may enforce a **request / delay window** and early-withdrawal fees (see pool page).  
3. ha is returned to the user; balance decreases.  
4. Unclaimed **reward tokens** remain claimable via `claim` / `claimable` — they are not “unstaked from a gauge.”

## Rewards vs ha balance (do not conflate)

| Mechanism | What changes |
| --------- | ------------ |
| **Loss product (rebalance)** | User’s **ha balance** scales down when the pool takes a proportional loss |
| **Reward tokens** | Harvest / rebalance payouts accrue as **claimable** balances (`claimable` → `claim`) — they do **not** auto-mint into the user’s ha ERC-20 balance |

Users claim rewards explicitly. Withdrawals move ha; they do not substitute for `claim()`.

## Rebalance participation

Coordinated by [Stability pool manager](../contracts/stability-pool-manager.md):

1. CR below threshold → `rebalance(bountyReceiver, minPeggedLiquidated)`.  
2. Manager sweeps ha from pools and **redeems** via the minter (`freeRedeemPeggedToken`); payout tokens are routed back to each pool.  
3. Collateral pool: **wrapped collateral** via `notifyLiquidation` / reward path.  
4. Sail pool: **hs (leveraged)** via the same pattern.  
5. Depositors’ ha balances adjust via the loss product; payout tokens accrue as claimable rewards.

## Related

- [Rebalance](./rebalance.md)  
- [Harbor Yield](../contracts/harbor-yield.md) (Compounder / hy — siblings over these pools when live)
