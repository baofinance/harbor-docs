---
sidebar_position: 3
---

# Stability Pools

Stability Pools are a core mechanism in Harbor that provides security, yield generation, and automated rebalancing capabilities.

![Same deposit. Same yield path. Different rebalance outcomes.](/img/04-stability-pool-two-pool-fork.png)

:::note
WIP — final versions pending.
:::


## What are Stability Pools?

In Harbor, system solvency is maintained through **Stability Pools**. These pools secure the protocol and offer yield and strategic flexibility to participants.

Harbor features **two types of Stability Pools**, each with different redemption outcomes:

### Types of Stability Pools

1. **Collateral Stability Pools**

   - Pegged tokens (e.g., haETH, haBTC) deposited here are used to **redeem real collateral assets** (e.g., fxSAVE, wstETH) when needed
   - Depositors effectively exchange their pegged tokens for the underlying collateral at **1:1 value** based on the oracle price at the time of redemption
   - Useful for accumulating collateral assets during market downturns

2. **Sail Stability Pools**
   - Pegged tokens (**haTokens**) deposited here are swapped for **hsTokens** (variable leveraged exposure) during rebalancing
   - Depositors still earn **concentrated collateral yield** / pool revenue on those haToken deposits — same yield path as the collateral pool
   - Ideal for those seeking amplified returns if the market rebounds after a rebalance

Both pool types help keep the system healthy, flexible, and rewarding for users. **hsTokens** themselves do not earn concentrated yield; **haTokens in either pool** do.

## How Stability Pools Protect the System

When the **global collateralization ratio** of a market falls below a predefined safety threshold (e.g., 130%):

1. The protocol enters a state where rebalancing is allowed
2. A rebalance transaction becomes executable by MEV searchers who are economically incentivized to execute it
3. Pegged tokens deposited in Stability Pools are **burned** to reduce outstanding pegged supply
4. Depending on the pool type:
   - Depositors receive **collateral assets** (Collateral Pools), or
   - **hsTokens** representing leveraged exposure (Sail Pools)

This **instant rebalancing** helps the protocol stay solvent **without auctions or external liquidators**.

## Why Stability Pool Participation is Attractive

- **1:1 Value Redemptions**: Depositors swap pegged tokens at fair oracle value for collateral or Sail exposure when rebalances occur
- **Yield Opportunities**: Depositors earn concentrated yield from underlying collateral (e.g., fxSAVE, wstETH) on **haToken** deposits in **both** collateral and Sail pools
- **Rebalance choice**: Collateral pool pays **collateral** on rebalance; Sail pool pays **hsTokens** — yield accrual on the haToken deposit is not exclusive to the collateral pool
- **Marks / TIDE incentives**: Where allocated, participants may earn Ledger Marks and team-directed TIDE incentives
- **DeFi Composability**: Vaults and strategies can build on Stability Pools
- **Protocol revenue support**: After Maiden Voyage Yield Share (~5% of that market’s revenue when eligible) and any post–$10M TVL treasury take, **75%** of the remainder goes to stability pools and **25%** buys TIDE (treasury → POL → burn). See [TIDE Tokenomics](/tide-token/tokenomics).

## Example: During a Market Downturn

### In a Collateral Pool

- A user’s haETH is used in rebalancing
- They receive collateral (e.g. fxSAVE) worth the burned haETH at oracle prices
- They now hold real yield-bearing collateral, possibly near a market low

### In a Sail Pool

- A user’s haETH is swapped into hsFXUSD-ETH (example Sail token)
- If ETH rebounds strongly relative to collateral, Sail exposure can outperform spot

Both options allow users to **participate in system stress** rather than only fearing it.

## Participating in Stability Pools

Use the **Earn / Anchor** flows in [app.harborfinance.io](https://app.harborfinance.io/anchor).

### Depositing

1. Connect your wallet
2. Choose a market and pool type (Collateral or Sail)
3. Enter deposit amount
4. Approve and confirm the transaction
5. Start earning yield

### Withdrawing

Stability pools may use a **withdrawal request window**:

- Request a withdrawal; after a delay, a fee-free window opens
- Withdrawing outside that window can incur an **early-withdrawal fee**
- Exact delay, window length, and fee are market/parameter-specific — check the app UI before withdrawing

### Claiming Rewards

1. Check available rewards on the Anchor / Rewards panel
2. Claim through the app
3. Confirm the transaction

## Yield Calculation

Yield is generated from multiple sources:

1. Collateral token yield (e.g., fxSAVE, wstETH)
2. Protocol fee / revenue sharing directed to participants (see yield & tokenomics docs)
3. Marks / TIDE incentives where allocated
4. Potential upside from rebalancing events (not included in displayed APR)

## Best Practices

1. **Diversification** — consider both Collateral and Sail pools across markets
2. **Regular monitoring** — watch collateralization ratios and market health in the app
3. **Strategic positioning** — Collateral pools to accumulate backing assets; Sail pools for rebound exposure
4. **Understand the risks** — see [Risk Considerations](/risk-considerations)

## Summary

- Automatic system protection without auctions
- Flexible redemption into collateral or Sail tokens
- Real yield from productive collateral
- Building block for advanced DeFi strategies

## Technical Details

### Contract Addresses

Stability pools are **deployed per market**. Do not use a single global pool address.

- Browse pools in the [app](https://app.harborfinance.io/anchor)
- For engineers: see [Tech Documentation — markets / generic deployments](/tech-docs/markets/generic)

### Key Parameters

- Minimum deposits (if any)
- Withdrawal request delay / window / early-withdrawal fee
- Rebalancing thresholds
- Yield and incentive distribution settings

## Support

- Join our [Discord](https://discord.com/invite/BW3P62vJXT)
- Check our [FAQ](/faq)
