# Rebalance Process Flow

How the protocol restores collateral ratio by burning ha from stability pools and paying out rebalance tokens to those pools.

Contract SoT: [Stability pool manager](../contracts/stability-pool-manager.md). Pool behaviour: [Stability pools process flow](./stability-pools.md).

:::note Graphics (design)
Placeholder: rebalance sequence (CR breach → manager.rebalance → pool payouts). Design team to supply.
:::

## Trigger

Rebalancing is allowed when the minter’s **collateral ratio** is below the manager’s **`rebalanceThreshold`** (view: `rebalanceable()`).

```solidity
collateralRatio = collateralValue / peggedValue; // via Minter
if (collateralRatio < rebalanceThreshold) {
    // rebalance() may be called
}
```

Anyone can call it when eligible; keepers typically do for the bounty.

## Process

### 1. Call

```solidity
stabilityPoolManager.rebalance(bountyReceiver, minPeggedLiquidated);
```

- Checks CR is below the rebalance threshold (reverts otherwise).  
- `minPeggedLiquidated` is a **slippage / minimum burn** guard (not a “max rebalance” circuit breaker).  
- The explicitly supplied **`bountyReceiver`** receives a **rebalance bounty** cut of the payout tokens (configured `rebalanceBountyRatio`) — not necessarily `msg.sender`.

### 2. Burn ha from pools

- Manager pulls ha from the **collateral** and **Sail** stability pools (fee-free path via `ZERO_FEE_ROLE`).  
- ha is redeemed through the minter (`freeRedeemPeggedToken`) so system pegged supply falls and CR rises.  
- Each pool’s ha balances scale down via the **loss product**.

### 3. Pay out rebalance tokens

| Pool | Payout token |
| ---- | ------------ |
| Collateral stability pool | **Wrapped collateral** (e.g. fxSAVE, wstETH) |
| Sail stability pool | **hs (leveraged)** |

After the bounty to `bountyReceiver`, remaining wrapped collateral / hs is transferred to the pools and attributed via `notifyLiquidation` / reward deposit paths. Depositors accrue them as **claimable** rewards — they do **not** auto-mint into the user’s ha balance. Claim with `claim()` / `claimable`.

### 4. Bounty only (no feeReceiver cut on rebalance)

Rebalance pays the configured **bounty** to `bountyReceiver`. Protocol `feeReceiver` cuts apply on **harvest**, not on this rebalance path.

## Illustrative example

- System CR drops below threshold (e.g. 130% → 120%).  
- Keeper calls `rebalance(keeper, minPeggedLiquidated)` (or any `bountyReceiver`).  
- ha is taken from both pools and redeemed via the minter.  
- Bounty tokens go to `bountyReceiver`; remaining wrapped collateral / hs return to the pools.  
- Collateral pool depositors can later claim wrapped collateral; Sail depositors can claim hs — proportional to pool accounting.

## What this is not

Do **not** assume these (not in the live SPM):

- Rebalance queues or priority lanes  
- Gas reimbursement beyond the bounty  
- Circuit breakers / pause beyond normal access control  
- A separate “maximum rebalance size” parameter (sizing is whatever the pools can provide under the CR math + `minPeggedLiquidated`)

## Depositor takeaways

1. Know which pool you are in (collateral vs Sail) — payout token differs.  
2. Monitor CR / `rebalanceable()`.  
3. After a rebalance, claim reward tokens; ha balance may be lower due to the loss product.
