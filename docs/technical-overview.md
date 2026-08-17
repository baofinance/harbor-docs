---
sidebar_position: 3
---

# Technical Overview

![Three statements that should never be conflated.](/img/03-three-claim-accounting.png)

:::note
WIP — final versions pending.
:::


## Core Mechanics

At its heart, Harbor operates as a **decentralized platform for creating and trading synthetic assets** — tokens that mirror the value of real-world or digital assets without needing direct custody of those assets. Each market functions as a shared collateralized debt position (CDP) with **100% collateral efficiency**: the combined NAV of **haTokens + hsTokens** equals the value of deposited collateral (subject to fees). That is **not** the same as minting haTokens 1:1 against collateral alone — hsTokens are the residual equity claim — and it is **not** the system **collateral ratio** (collateral value ÷ haToken value, e.g. **~130%**), which gates rebalancing.

- **Collateral**: Users deposit assets (like fxSAVE or wstETH) into the market's collateral pool
- **Debt (HA Tokens)**: Synthetic pegged tokens that track currencies, cryptocurrencies, commodities, or anything with a reliable price feed
- **Equity (HS Tokens)**: Leverage tokens that absorb volatility between collateral and pegged tokens, offering leveraged exposure of collateral vs the peg
- **Health**: Stability pools rebalance the protocol, maintaining system solvency without reliance on off-chain liquidators

This three-token model allows users to:

1. Mint pegged assets (haTokens) against the shared collateral pool
2. Gain leveraged exposure through HS tokens with liquidation protection
3. Earn real yield by providing stability through Stability Pools

## Protocol Architecture

### 1. Collateral Token

- Users deposit approved yield-bearing collateral (e.g., fxSAVE, wstETH) into Harbor's shared collateral pool for that market
- Collateral is collectively managed by the protocol, not tied to individual CDPs
- The protocol maintains a global minimum **collateralization ratio** (collateral ÷ haTokens, e.g. **130%**) to ensure system solvency — distinct from mint-time **100% collateral efficiency** (ha + hs NAV ≈ collateral)
- Yield-bearing collateral generates real returns distributed to Stability Pool participants
- Protocol revenue: Yield Share first (~5% per eligible market), then of the remainder any post–$10M TVL treasury take, then **75% to stability pools** / **25% to buy TIDE** (treasury → POL → burn). See [TIDE Tokenomics](/tide-token/tokenomics).

### 2. HA Tokens (Harbor Anchored - Pegged Assets)

- Synthetic assets pegged 1:1 to a reference price using reliable oracle feeds
- Live examples include:
  - haETH — pegged to ETH
  - haBTC — pegged to Bitcoin
  - haEUR — pegged to EUR
- Freely usable across DeFi platforms
- Redeemable against collateral
- Designed to maintain a tight peg through arbitrage and protocol rebalancing

### 3. HS Tokens (Harbor Sail - Leverage Tokens)

- Variable leverage tokens representing the residual claim on the collateral after accounting for issued pegged tokens
- Named by collateral and peg (e.g., hsFXUSD-ETH, hsSTETH-BTC)
- Similar to holding a liquidation-protected leveraged position on the collateral versus the peg
- As the relative value of collateral vs peg moves, HS token value adjusts — without funding fees or margin calls
- If collateral depreciates vs the peg, HS tokens absorb losses first, protecting haToken holders
- Rebalanced automatically during market stress via Stability Pools

## Rebalancing Mechanism

Stability Pools support rebalances when the system-wide collateral ratio falls below a threshold (e.g., 130%):

### Process

1. When global collateralization ratio falls below the safety threshold, the protocol enters stability mode
2. A rebalance transaction becomes executable by MEV searchers who are economically incentivized to execute it
3. The transaction uses haTokens from the Stability Pool for either collateral or hsTokens (depending on pool type)
4. This improves the collateral ratio and maintains system solvency

### Types of Stability Pools

- **Collateral Stability Pools**: Pegged tokens redeem into real collateral at oracle value
- **Sail Stability Pools**: Pegged tokens swap into hsTokens during rebalancing

### Benefits

- Maintains system solvency without auctions or external liquidators
- Generates organic yield for pool participants through collateral yield and incentives
- Supports peg stability and protocol health
- Turns market downturns into opportunities for Stability Pool participants

## Protocol Workflow

1. **Minting Process**

   - User interacts with the market minter / zaps in the app
   - Mints haTokens and/or hsTokens with **100% collateral efficiency** (combined ha + hs NAV matches deposited collateral, subject to dynamic fees) — not 1:1 ha-only minting against collateral

2. **Stability Pool Participation**

   - Deposit haTokens into stability pools
   - Earn yield from collateral and any Marks / TIDE incentives
   - Choose Collateral or Sail pools based on risk preference

3. **Leverage Exposure**

   - Users mint or acquire HS tokens
   - Gain protected leverage exposure
   - No funding fees, margin calls, or classic liquidation

4. **Automated Rebalancing**
   - System monitors collateral ratios
   - MEV searchers execute rebalancing when triggered
   - Maintains peg stability and system health
