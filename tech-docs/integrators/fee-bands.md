# Fee bands and critical collateral ratios

Mint and redeem fees are **per market**, stored in the minter’s `config()`, and read on chain. A positive incentive ratio is a **fee**. A negative ratio is a **discount** paid from the reserve pool while it has balance. A ratio of **`1e18` (1.0)** **disallows** the action in that band: the minter fills only up to the band edge.

Bands are upper bounds. The first ratio applies **below** the first bound. The last ratio applies **at or above** the last bound. A transaction that crosses bands pays the integral across them, so a large trade is not charged one flat rate.

These tables are the schedules in [`baofinance/harbor` `harbor-yield` `script/config/volatility/`](https://github.com/baofinance/harbor/tree/harbor-yield/script/config/volatility). Files named `*_may_26` are the **deployed** `config()` snapshot. Files without that suffix are **target** schedules; the in-repo comment says the batch that would move markets onto them is un-executed except where noted. If this page and `config()` disagree, **`config()` wins**.

## Critical levels

These four numbers are what made the [16 October 2026 stETH Sail dilution](../remediation/steth-sail-dilution.md) possible. They are not the same thing as mint-time 100% collateral efficiency (ha + hs NAV ≈ collateral).

| Level | Value | What it does |
| ----- | ----- | ------------ |
| **hs redeem disallow** | **CR < 100%** on every schedule below | Redeeming **hs** is blocked only below 100%. From 100% up to just under the rebalance threshold it is allowed, at a fee (1.5% in the first open band of the May 2026 schedules). |
| **Leverage-ratio cap** | **20×**, which `Minter_v2` reaches at **CR = 20/19 ≈ 105.3%** | At or below that CR, a rebalance does not convert Sail-pool **ha** at the fair hs price. It mints **20 hs per 1 ha** taken from the Sail pool. |
| **Rebalance threshold** | **105% / 115% / 125% / 130%**, per market | `rebalance()` is allowed only while CR is **below** this. All of these sit at or above the 105.3% cap, so a rebalance that happens near the floor uses the cap. |
| **Proposed hs-redeem floor** | **110%** | Move the hs-redeem disallow bound from 100% to 110%, above the cap, so hs cannot be redeemed down into the 20× region. Specified in [`RebalanceDilutionFork.sol`](https://github.com/baofinance/harbor/blob/harbor-yield/test/deployment/RebalanceDilutionFork.sol); not the deployed `config()`. |

The open interval is **100% ≤ CR < rebalance threshold**. Inside it, hs redemption is still allowed, and once CR falls through **≈105.3%** the next Sail-pool rebalance on `Minter_v2` mints at the cap.

Stability-pool early exit uses a **1 hour** delay, then a **25 hour** fee-free window (`90000` seconds). The fee does not apply during an open window, and a deposit made **for** an account does not cancel a window that account already has open.

| Config | Where | Early-withdrawal fee | Rebalance pay |
| ------ | ----- | -------------------- | ------------- |
| Live | `harbor` `main` [`ConfigStabilityPool`](https://github.com/baofinance/harbor/blob/main/script/config/stabilitypool/ConfigStabilityPool.sol) and `ConfigStabilityPoolManager` | **1%** (`1e16`) | Bounty **1%** (`1e16`). No protocol cut on rebalance |
| Yield branch | `harbor` `harbor-yield` [`ConfigStabilityPool`](https://github.com/baofinance/harbor/blob/harbor-yield/script/config/stabilitypool/ConfigStabilityPool.sol) and [`ConfigStabilityPoolManager`](https://github.com/baofinance/harbor/blob/harbor-yield/script/config/stabilitypool/ConfigStabilityPoolManager.sol) | **5%** (`5e16`). This is what `Upgrade_MarketsToV3_mainnet` applies | Bounty **0.5%** (`5e15`) and cut **0.5%** (`5e15`), ceiling 200× `aboutADollar` in wrapped collateral |

The 16 October rebalance bounty paid on chain was the live **1%**. The **5%** early-withdrawal fee is the yield-branch figure, not the fee those pools charged that day.

## Which market uses which schedule

| Market | Schedule file | Rebalance threshold | Deployed or target |
| ------ | ------------- | ------------------- | ------------------ |
| [haBTC / stETH](../markets/habtc/steth.md) | `ConfigPriceVolatility_125_may_26` | **125%** | Deployed snapshot |
| [haEUR / stETH](../markets/haeur/steth.md) | `ConfigPriceVolatility_130_may_26` | **130%** | Deployed snapshot |
| [haBTC / fxUSD](../markets/habtc/fxusd.md) | `ConfigPriceVolatility_130_may_26` | **130%** | Deployed snapshot |
| [haETH / fxUSD](../markets/haeth/fxusd.md) | `ConfigPriceVolatility_130_may_26` | **130%** | Deployed snapshot |
| [haEUR / fxUSD](../markets/haeur/fxusd.md) | `ConfigPriceVolatility_105_may_26` | **105%** | Deployed snapshot |
| haGOLD / fxUSD | `ConfigPriceVolatility_115` | **115%** | Target; the volatility-update comment says this market’s batch **did** execute |
| haGOLD / stETH, haMCAP / fxUSD, haMCAP / stETH, haSILVER / stETH | `ConfigPriceVolatility_130` | **130%** | Target schedule |
| haSILVER / fxUSD | `ConfigPriceVolatility_125` | **125%** | Target schedule |

haBTC / stETH and haEUR / stETH are the two markets in the October dilution. Both disallow hs redemption only below **100%**, and both rebalance well above the **105.3%** cap.

## haBTC / stETH — deployed 125% schedule

`ConfigPriceVolatility_125_may_26`. Rebalance threshold **125%**.

### Mint ha

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 126% | Disallow |
| 126% – 135% | 1% fee |
| 135% – 150% | 0.75% fee |
| 150% – 160% | 0.5% fee |
| 160% – 170% | 0.25% fee |
| 170% – 180% | 0.15% fee |
| ≥ 180% | 0.1% fee |

### Redeem ha

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 100% | 1% discount |
| 100% – 110% | 0.75% discount |
| 110% – 124% | 0.3% discount |
| 124% – 135% | 0 |
| 135% – 150% | 0.1% fee |
| 150% – 160% | 0.15% fee |
| ≥ 160% | 0.25% fee |

### Mint hs

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 100% | ≈100% fee (`0.999999e18`, just under the disallow sentinel) |
| 100% – 110% | 1.5% discount |
| 110% – 124% | 1% discount |
| 124% – 175% | 0 |
| 175% – 185% | 0.1% fee |
| 185% – 200% | 0.25% fee |
| ≥ 200% | 0.5% fee |

### Redeem hs

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 100% | Disallow |
| 100% – 124% | **1.5% fee** — open through the 105.3% cap and up to the 125% rebalance threshold |
| 124% – 135% | 1% fee |
| 135% – 145% | 0.5% fee |
| 145% – 155% | 0.33% fee |
| 155% – 165% | 0.25% fee |
| ≥ 165% | 0.2% fee |

## haEUR / stETH, haBTC / fxUSD, haETH / fxUSD — deployed 130% schedule

`ConfigPriceVolatility_130_may_26`. Rebalance threshold **130%**. Same rate ladder as the 125% snapshot; the bounds sit one step higher.

### Mint ha

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 131% | Disallow |
| 131% – 140% | 1% fee |
| 140% – 150% | 0.75% fee |
| 150% – 160% | 0.5% fee |
| 160% – 170% | 0.25% fee |
| 170% – 180% | 0.15% fee |
| ≥ 180% | 0.1% fee |

### Redeem ha

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 100% | 1% discount |
| 100% – 110% | 0.75% discount |
| 110% – 129% | 0.3% discount |
| 129% – 140% | 0 |
| 140% – 150% | 0.1% fee |
| 150% – 160% | 0.15% fee |
| ≥ 160% | 0.25% fee |

### Mint hs

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 100% | ≈100% fee (`0.999999e18`) |
| 100% – 110% | 1.5% discount |
| 110% – 129% | 1% discount |
| 129% – 180% | 0 |
| 180% – 190% | 0.1% fee |
| 190% – 200% | 0.25% fee |
| ≥ 200% | 0.5% fee |

### Redeem hs

| Collateral ratio | Rate |
| ---------------- | ---- |
| < 100% | Disallow |
| 100% – 129% | **1.5% fee** — open through the 105.3% cap and up to the 130% rebalance threshold |
| 129% – 140% | 1% fee |
| 140% – 150% | 0.5% fee |
| 150% – 160% | 0.33% fee |
| 160% – 170% | 0.25% fee |
| ≥ 170% | 0.2% fee |

## Related

- [Market state and fees](./market-state-and-fees.md) — which view to call; do not hard-code these tables in an integration
- [Minter](../contracts/minter.md) — `config()`, dry-runs, `1e18` disallow
- [stETH Sail dilution](../remediation/steth-sail-dilution.md) — what the 100% hs-redeem floor did on 16 October 2026
