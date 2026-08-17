# Market state and fees

Do not hard-code the illustrative mint fees from the [product fees page](/fees) (~0.25% / ~1%). Read **on-chain** state from the market minter and stability pool manager.

![Collateral-ratio bands steer each action differently.](/img/15-cr-bands-fees.png)

:::note
WIP — final versions pending.
:::


## Views to poll (minter)

| View | Meaning |
| ---- | ------- |
| `collateralRatio()` | Collateral value ÷ ha (pegged) value. Rebalance when this is below the manager threshold (often documented as ~130% — **read `rebalanceThreshold()`**). Distinct from mint-time 100% efficiency (ha+hs NAV ≈ collateral). |
| `leverageRatio()` | Current Sail leverage (capped at 20x). |
| `peggedTokenPrice()` / `leveragedTokenPrice()` | See [Pricing](./pricing.md). |
| `mintPeggedTokenIncentiveRatio()` (and redeem / leveraged siblings) | Signed fee/discount; `1 ether` = **disallow**. |
| `peggedTokenBalance()` / `leveragedTokenBalance()` / `collateralTokenBalance()` | Accounting balances for this minter. |
| `config()` | Incentive `Config` (CR bands and ratios). Decode against the Harbor `Config` struct in source — do not assume a stable ABI offset without regenerating from the live implementation. |
| `*DryRun(...)` | Full quote for a size — [Mint and redeem](./mint-redeem.md). |

## Stability pool manager

| View | Meaning |
| ---- | ------- |
| `rebalanceThreshold()` | CR below which `rebalance()` is allowed |
| `rebalanceBountyRatio()` | Keeper bounty as a ratio of liquidation proceeds |

Call `rebalance(bountyReceiver, minPeggedLiquidated)` only when CR is below threshold. Details: [Stability pool manager](../contracts/stability-pool-manager.md), [Rebalance flow](../process-flows/rebalance.md).

## Per-market parameters

Fee **bands** and exact rebalance thresholds are **per minter / manager**, not global constants. Until each market page lists a snapshot table:

1. `eth_call` `config()` and `rebalanceThreshold()` on that market’s contracts.  
2. Cache in your indexer; refresh on `updateConfig` / threshold-setting events (owner-only).

Incident / risk context: [fxUSD–ETH Sail rebalance remediation](../remediation/fxusd-eth-sail-rebalance.md), [Risk considerations](/risk-considerations).

## Protocol revenue (off-chain split)

On-chain mint/redeem fees accrue via `feeReceiver`. How Harbor allocates **protocol revenue** (pools / TIDE / Yield Share) is documented in [TIDE tokenomics](/tide-token/tokenomics) — that waterfall is **not** the same as the minter incentive ratio for a single tx.
