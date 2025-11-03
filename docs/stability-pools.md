---
sidebar_position: 3
---

# Stability Pools

Stability Pools are a core mechanism in Harbor that provides security, yield generation, and automated rebalancing capabilities.

## What are Stability Pools?

In Harbor, system solvency is maintained through an elegant and powerful mechanism: **Stability Pools**. These pools not only secure the protocol but also offer yield opportunities and strategic flexibility to participants.

Harbor features **two types of Stability Pools**, each with different redemption outcomes:

### Types of Stability Pools

1. **Collateral Stability Pools**

   - Pegged tokens (e.g., haUSD) deposited here are used to **redeem real collateral assets** (e.g., ETH, stETH) when needed
   - Depositors effectively exchange their pegged tokens for the underlying collateral at **1:1 value** based on the oracle price at the time of redemption
   - Perfect for accumulating collateral assets during market downturns

2. **Sail Stability Pools**
   - Pegged tokens deposited here are swapped for **hsTokens** (variable leveraged exposure tokens) during rebalancing
   - Depositors accumulate leveraged exposure to the collateral asset's performance during market volatility
   - Ideal for those seeking amplified returns if the market rebounds

Both types of pools play critical roles in ensuring the system remains healthy, flexible, and rewarding for users.

## How Stability Pools Protect the System

When the **global collateralization ratio** of the system falls below a predefined safety threshold (e.g., 130%):

1. The protocol automatically triggers **redemptions**
2. A rebalance transaction becomes executable by MEV searchers who are economically incentivized to execute it
3. Pegged tokens deposited in Stability Pools are **burned** to cancel outstanding system debt
4. Depending on the pool type:
   - Depositors receive **collateral assets** (Collateral Pools), or
   - **hsTokens** representing the leveraged remainder (Sail Pools)

This **instant rebalancing** ensures the protocol stays solvent **without auctions or external liquidators**.

## Why Stability Pool Participation is Attractive

- **1:1 Value Redemptions**:
  Depositors swap their pegged tokens at fair market value for either collateral or leveraged exposure — not discounted, not auctioned, but at market price when the market is experiencing a downturn, or after a pegged token experiences a price spike.

- **Yield Opportunities**:
  Stability Pool depositors earn the yield from underlying collateral (e.g., stETH)

- **TIDE Token Rewards**:
  Participants in either type of pool can earn additional **TIDE incentives**, compounding their returns through team-directed incentive allocations

- **DeFi Composability**:
  Stability Pools can form the foundation for automated strategies: Vaults can deposit into Stability Pools, accumulate redeemed collateral or hsTokens, and optionally swap back into pegged tokens

- **Protocol Revenue Support**:
  Harbor's tokenomics direct 75% of protocol revenue to stability pool rewards (pre-$10M TVL), ensuring strong yields for participants who secure the protocol

## Example: During a Market Downturn

### In a Collateral Pool

- A user's haUSD is used to cancel system debt
- They receive ETH or stETH worth exactly the value of the burned haUSD, based on current oracle prices
- They now own real crypto assets, possibly at a market low, and benefit from any recovery

### In a Sail Pool

- A user's haUSD is swapped into hsETH
- If ETH rebounds strongly, their hsETH could increase in value more rapidly than regular ETH exposure

Both options allow users to **benefit from system stress** rather than fear it.

## Participating in Stability Pools

### Depositing

1. Connect your wallet
2. Choose a stability pool type (Collateral or Sail)
3. Enter deposit amount
4. Approve transaction
5. Start earning yield

### Withdrawing

1. Navigate to your position
2. Enter withdrawal amount
3. Approve transaction
4. Receive funds

### Claiming Rewards

1. Check available rewards
2. Click "Claim Rewards"
3. Approve transaction
4. Receive TIDE tokens

## Yield Calculation

Yield is generated from multiple sources:

1. Collateral token yield (e.g., stETH staking rewards)
2. TIDE rewards (75% of protocol revenue directed to stability pools)
3. Protocol revenue sharing (post-$10M TVL milestone)
4. Potential upside from rebalancing events (not included in displayed APR)

## Best Practices

1. **Diversification**

   - Spread deposits across both Collateral and Sail pools
   - Consider multiple collateral types when available

2. **Regular Monitoring**

   - Check global collateralization ratios
   - Monitor protocol health metrics
   - Stay informed about market conditions

3. **Strategic Positioning**

   - Use Collateral pools during expected downturns to accumulate assets
   - Use Sail pools when you anticipate volatility with recovery

4. **Understand the Risks**
   - Be aware of potential pool depletion
   - Understand the recovery mechanisms
   - For a comprehensive view of protocol risks, see the [Risk Considerations](/risk-considerations) documentation

## Summary: Why Harbor's Dual Stability Pool Design is Powerful

✅ **Automatic System Protection:** Pegged token backing is constantly rebalanced without auctions

✅ **Flexible Redemption Outcomes:** Users can choose between collateral accumulation or leveraged exposure

✅ **Attractive Real Yields:** Participants earn from collateral performance and 75% of protocol revenue

✅ **Building Block for Advanced DeFi:** Vaults and strategies can be created directly on top of Stability Pools

✅ **Market Participation, Not Liquidation:** Users actively benefit from volatility instead of being exposed to liquidation risks

Harbor's Stability Pools transform market downturns into opportunities — **rewarding users for securing the system** and offering the flexibility to **accumulate collateral** or **gain strategic leveraged exposure**, all fully on-chain and permissionless.

## Technical Details

### Contract Addresses

- Collateral Pool: `0x7c77704007C9996Ee591C516f7319828BA49d91E`
- Leveraged Pool: `0x081F08945fd17C5470f7bCee23FB57aB1099428E`

### Key Parameters

- Minimum deposit amounts
- Withdrawal delays
- Rebalancing thresholds
- Yield distribution rates

## Support

Need help with stability pools?

- Join our [Discord](https://discord.com/invite/BW3P62vJXT)
- Check our [FAQ](/faq)
- Contact support team
