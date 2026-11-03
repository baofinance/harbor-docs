# stETH Sail rebalance dilution

**Incident:** 16 October 2026, Ethereum mainnet  
**Markets:** [haBTC / stETH](../markets/habtc/steth.md) (`hsSTETH-BTC`) and [haEUR / stETH](../markets/haeur/steth.md) (`hsSTETH-EUR`)  
**Paused:** 21 October 2026, block 26,248,724. Nothing in either market moved after the minters and pools were paused.

This is separate from the [March 2026 fxUSD–ETH Sail remediation](./fxusd-eth-sail-rebalance.md). That incident was an over-mint inside `Minter_v1`’s `freeRedeemPeggedToken`, and it was corrected on chain. This one is `Minter_v2` doing what its leverage-ratio cap specifies, at a collateral ratio the fee bands still allowed a trader to reach.

Harness and the configuration it measures: [`RebalanceDilutionFork.sol`](https://github.com/baofinance/harbor/blob/harbor-yield/test/deployment/RebalanceDilutionFork.sol) on `baofinance/harbor` `harbor-yield`. Band numbers: [Fee bands and critical collateral ratios](../integrators/fee-bands.md).

## What happened

On both markets a trader minted **ha** and **hs** against wstETH, deposited the **ha** into the **Sail** stability pool, and redeemed **hs** until the collateral ratio was about **105%**. That is just below **20/19 ≈ 105.3%**, the ratio at which `Minter_v2`’s leverage ratio hits its cap of **20×**.

The ratio was then under the rebalance threshold (**125%** on haBTC / stETH, **130%** on haEUR / stETH), so `rebalance()` was allowed. The Sail pool’s ha was burned and replaced with **20 hs per 1 ha**, not with hs at the fair price (ha taken ÷ hs price). Existing hs, whose count did not change, repriced down:

| | Before | After the exploit transaction | At the pause |
| --- | --- | --- | --- |
| 1 hsSTETH-BTC, in BTC | 0.7117 | 0.06516 (**−90.8%**) | 0.06051 |
| 1 hsSTETH-EUR, in EUR | 0.8380 | 0.06177 (**−92.6%**) | 0.05803 |

haBTC and haEUR stayed at one pegged unit. The trader then redeemed the hs the capped rebalance had paid, back into wstETH.

Later rebalances (16 on haBTC / stETH, 5 on haEUR / stETH) converted at the **fair** rate. Nobody minted into either market after the exploit transactions. Nobody sold hs they had held through those transactions. One Sail depositor redeemed the hs the capped rebalance had overpaid them.

## Why the bands allowed it

Redeeming hs is what pushes the collateral ratio **down**. On the deployed schedules that action is disallowed only **below 100% CR**. From 100% up to just under the rebalance threshold it costs a **1.5%** fee. See the hs-redeem tables on [Fee bands](../integrators/fee-bands.md).

So the path from a healthy ratio to the 20× cap was open:

1. CR above the rebalance threshold — no rebalance yet.
2. Redeem hs (allowed, 1.5%) until CR is about 105%, under both the **125% / 130%** threshold and the **105.3%** cap.
3. `rebalance()` mints 20 hs per ha taken from the Sail pool.
4. hs price falls by about that over-mint. Redeeming the new hs takes the collateral.

The cap is not a bug in the arithmetic of `Minter_v2`. The configuration error is that hs redemption stays open **through** the ratio at which the cap replaces the fair price.

## What it cost

Holder value is measured on the exploit transaction only, in the market’s pegged unit. “From the price” is tokens already held, times the hs price change. “From the count” is tokens gained or lost, at the price after the transaction. Each column sums to zero, to rounding.

| | haBTC / stETH | haEUR / stETH |
| --- | --- | --- |
| Holders, through the hs price | −0.4384 BTC | −8,355 EUR |
| Holders, through changes in token counts | +0.0141 BTC | +125 EUR |
| **Holders, in all** | **−0.4242 BTC (−11.42 wstETH)** | **−8,230 EUR (−3.03 wstETH)** |
| Protocol fees (fee-receiver multisig) | +0.1856 BTC (+5.00 wstETH) | +4,275 EUR (+1.57 wstETH) |
| Accounts the exploits paid | +0.2386 BTC (+6.43 wstETH) | +3,955 EUR (+1.45 wstETH) |

Seventeen wallets lost. Two gained, both Sail depositors whose overpaid hs reward was worth more than the ha the rebalance took. Together they gained 0.0027 BTC and 0.0011 BTC (0.10 wstETH). One wallet, `0x619e71ec…10E3`, lost about nine-tenths of the total (0.391 BTC and 7,601 EUR, 13.31 wstETH), almost all of it on hs whose count did not change.

Pegged-only holders lost nothing. ha price did not move, and their counts did not change.

Unclaimed genesis positions lost nothing in token count. Their whole loss is the hs price on the hs the genesis contract still owes them.

Rebalance bots that called `rebalance` **after** the exploit were paid the configured **1%** bounty at the fair rate of that later call. That is the bounty the manager advertises, not a share of the dilution.

## Remediation

### Pause

Both markets’ minters and pools were paused on **21 October 2026** (block 26,248,724). Claims, deposits, withdrawals, mints, and redeems after that block are not part of the loss measured above.

### Stop the capped conversion

`Minter_v3` (with `StabilityPoolManager_v2` and `StabilityPool_v3`, which a rebalance needs together) converts the Sail pool’s ha at the **fair rate** while collateral ratio is at or above `MINIMUM_COLLATERAL_RATIO`. That floor is `MAX_LEVERAGE_RATIO / (MAX_LEVERAGE_RATIO − 1)` with `MAX_LEVERAGE_RATIO = 100`, about **101.01%**. Below it, the leveraged leg of `freeRedeemPeggedToken` reverts. At the attack ratio of about **105%**, the 20× mint is gone: hs minted follows ha taken ÷ hs price. The fork harness checks that bound.

`Minter_v3` is the yield-branch upgrade. It is **not** what was live on 16 October. Live `Minter_v2` still caps leverage at **20×**.

### Close the hs-redeem gap

Raise the hs-redeem disallow bound from **100%** to **110%** CR (`redeemLeveraged` band 0 stays at ratio `1e18`; its upper bound moves to `1.1e18`). 110% is above the 105.3% cap, so hs cannot be redeemed down into the region where `Minter_v2` would have paid 20×. This is an `updateConfig` on the live minter. It is the configuration in the harness, not the deployed May 2026 `config()`.

### Early-withdrawal fee

The fee live on 16 October is **1%**. `harbor` `harbor-yield` `ConfigStabilityPool` now returns **5%** (`5e16`), which is what the v3 upgrade applies, and what the harness sets. It is skipped entirely during an open withdrawal window. It raises the cost of depositing ha into the Sail pool and withdrawing it in the same flow **outside** a window. It does not charge an account whose window is already open: a deposit credited to that account does not cancel the window.

### Holder repayment (proposed)

Not executed. The accounting rule proposed for the decision:

- A wallet is owed, or owes, the change in value of **all** of its positions across the exploit transaction, netted, at that block’s prices.
- The amount follows the **wallet**, not the tokens. What the wallet did afterwards does not change what it is owed.
- Later price moves, including the further drift from the exploit block to the pause, are not counted.

On that rule the holders’ net loss (0.4242 BTC and 8,230 EUR) equals the fees (0.1856 BTC and 4,275 EUR) plus what the exploits paid out (0.2386 BTC and 3,955 EUR). In wstETH that is **14.55** owed to wallets that lost, **0.10** to recover from the two that gained, **6.57** sitting in fees, and **7.88** that left in the exploit proceeds.

| Source | Covers | How |
| ------ | ------ | --- |
| Fee-receiver multisig | 0.186 BTC and 4,275 EUR (6.57 wstETH) | Return those fees into the repayment. It still held the haBTC and haEUR at the pause. |
| Treasury, or recovery of the proceeds | 0.239 BTC and 3,955 EUR (7.88 wstETH) | The BTC-market proceeds (6.425 wstETH) were unmoved as traced on 22 October 2026. The EUR-market proceeds (1.455 wstETH) were swapped for ETH the same day. Recovery of that is outside the contracts. |
| Two Sail depositors who gained | 0.0038 BTC (0.10 wstETH) | One of them has already redeemed the overpaid hs out of the market. The other still has the overpaid hs as an unclaimed reward. Only a pool upgrade can reduce an unclaimed reward; otherwise it pays out as it stands when the pool resumes. |

Two ways to pay the wallets that lost, and they are not interchangeable:

- **Direct transfer** of wstETH, or of ha/hs minted fee-free on `Minter_v3`, to each wallet. This matches the per-wallet amounts, including genesis participants who never claimed (tokens sent to the genesis contract would not reach them).
- **`donateWrappedCollateral`** on `Minter_v3`, which lifts the hs price for **current** holders in proportion to what they hold now. That does not match the rule. The largest holder has since claimed rewards and now holds more hs than before the exploit (about 84% of hsSTETH-BTC supply and 97% of hsSTETH-EUR at the pause), so a donation would over-pay that wallet and also pay later rebalance bots.

Name the unit in the decision. 1 wstETH was 0.03714 BTC at the exploit and 0.03663 BTC at the pause, so “owed in BTC” and “owed in wstETH” are different numbers.

## Related

- [Fee bands and critical collateral ratios](../integrators/fee-bands.md)
- [March 2026 fxUSD–ETH Sail remediation](./fxusd-eth-sail-rebalance.md)
- [Rebalance process flow](../process-flows/rebalance.md)
- [Risk considerations](/risk-considerations)
