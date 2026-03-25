# fxUSD–ETH Sail stability pool rebalance remediation

**Period executed:** 19–25 March 2026

## What happened

The fxUSD–ETH market underwent five rebalances in quick succession. While each rebalance correctly restored the collateral ratio, a bug in `Minter_v1` caused approximately 23× too many Sail (hsFXUSD-ETH) tokens to be minted and distributed as rewards to the Sail stability pool. The excess supply caused the Sail price to drop by over 90%, visible in the price chart on the app.

## What we did

### Fixed the bug and upgraded all minters

A two-line change in `freeRedeemPeggedToken` corrects the Sail minting calculation. The fix has been deployed across all markets, ensuring no other market can be affected. The new contract replaced the old one in the automated test suite, and new tests were written to confirm the bug is fixed.

### Paused the affected stability pool

This prevented further user actions (claims, deposits, withdrawals) that would have compounded the problem and made remediation more difficult.

### Simulated the correct outcome

We replayed all 15 on-chain transactions, from the first rebalance through to the pause, against the fixed `Minter_v2` to determine the exact token counts each depositor should hold in the absence of the bug.

### Executed the remediation

The stability pool was temporarily upgraded to a one-shot remediation contract that:

- **Scaled down the reward-token integral** to match the correct (v2) distribution. This single number is the only direct change to stability pool state; all other changes were made through the pool’s own external functions to burn Sail tokens.
- **Burned the excess Sail tokens from the pool.** Where excess tokens had already been withdrawn by claimers or paid out as rebalance bounties, the resulting collateral gap (82 fxSAVE) was covered by the Harbor treasury.

The pool was then restored to its original `StabilityPool_v2` implementation.

### Verified the result comprehensively

We confirmed:

- Every depositor’s claimable Sail matches, to the wei, what they would have received without the bug.
- The Sail price recovered to the correct level.
- All normal operations (deposit, withdraw, claim, rebalance, mint, redeem) function correctly after remediation.
- fxSAVE reward claimable amounts were not affected.
- haETH deposit balances in the pool were not altered.

## Lessons learned

If a similar issue were to occur in the future, we would pause all affected contracts immediately to prevent any user interaction with the affected market. An early pause protects user funds by preventing claims, redeems, or withdrawals at distorted prices, and greatly simplifies remediation by removing the need to account for interim user activity.

This remediation would not have been possible without the ability to upgrade contracts. Harbor’s goal is to move toward immutable contracts while accepting that complex software can have bugs. ERC-7201 namespaced storage also made this fix significantly easier to implement, allowing the remediation contract to access the stability pool’s internal state without inheriting its full contract hierarchy.

## Harbor repository commits

These commits in [baofinance/harbor](https://github.com/baofinance/harbor) track the code fix, deployment, and on-chain remediation:

| Step | Commit |
|------|--------|
| **Minter v2 fix** — introduces `Minter_v2`, corrects `freeRedeemPeggedToken` Sail minting, tests, and stability pool manager zero-fee usage | [`edafad1`](https://github.com/baofinance/harbor/commit/edafad1d6c417c614120acbc14d7445e91cf9447) |
| **Minter v2 deployment** — upgrades all market minter implementations to the new logic | [`1a892d8`](https://github.com/baofinance/harbor/commit/1a892d843f2d332d9a16bcf0a42db388fbb44a5d) |
| **Remediation finalised** — one-shot stability pool remediation (`PostRebalanceRemediationForStabilityPool_v2`), Safe batch, scripts, and in-repo narrative (`doc/rebalance-remediation.md`) | [`cae0e03`](https://github.com/baofinance/harbor/commit/cae0e0320c3ea016be39e2c2f806e059ae44b65a) |

The same narrative also lives in the harbor repo as [`doc/rebalance-remediation.md`](https://github.com/baofinance/harbor/blob/main/doc/rebalance-remediation.md).

## Related documentation

- [Minter contract](../contracts/minter) — includes the March 2026 minter upgrade summary
