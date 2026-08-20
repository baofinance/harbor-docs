---
sidebar_position: 4
---

# How It Works

What happens to your money in Harbor — without CDP jargon first. For NAV, collateral ratios, and fee math, see [Technical Overview](/technical-overview). Terms: [Glossary](/glossary).

## The 60-second version

1. You deposit **productive collateral** — usually **fxSAVE** (fxUSD markets) or **wstETH** (stETH markets).
2. The market mints two tokens from that shared pool:
   - **ha** — pegged to something you chose (ETH, BTC, EUR, …)
   - **hs** — the leftover **leverage** side (absorbs volatility first)
3. To **earn yield**, deposit **ha** into a **stability pool** in the app’s [**Earn**](https://app.harborfinance.io/anchor) section.
4. If the market gets stressed, pools **rebalance**: your deposited ha may be swapped for **collateral** or **hs**, depending on which pool you picked.

That’s the live product on Ethereum today.

## Step by step

### 1. Deposit collateral

Connect at [app.harborfinance.io](https://app.harborfinance.io). Pick a market (see [Live Markets](/markets)).

- **fxSAVE markets** — collateral earns f(x) yield; you can zap from fxUSD if convenient.
- **wstETH markets** — collateral earns staking yield; you can zap from ETH/stETH if convenient.

Prefer holding the market’s **main collateral** (fxSAVE or wstETH) when you can. Zaps are shortcuts, not the core design — see [Supporting Features](/supporting-features).

### 2. Mint ha and/or hs

- **ha** behaves like a pegged asset (haETH tracks ETH, haBTC tracks BTC, …).
- **hs** behaves like **variable leverage** on collateral vs that peg — no funding fee, no leverage slider, no stop-loss ticket.

You can hold either or both. Only **ha** goes into stability pools.

### 3. Earn — stability pools

In [**Earn**](https://app.harborfinance.io/anchor), deposit **ha** into one of two pool types:

| Pool type | You earn | If a rebalance uses your deposit |
| --------- | -------- | -------------------------------- |
| **Collateral pool** | Concentrated collateral yield + pool revenue share | You receive **collateral** (e.g. fxSAVE, wstETH) at oracle value |
| **Sail pool** | Same yield path as collateral pool | You receive **hs** instead |

Both pools earn yield on the **ha** deposit. The difference is what you get **if** a rebalance burns your ha.

Read [Stability Pools](/stability-pools) and [How Yield is Generated](/yield).

### 4. Leverage — hold or mint hs

Use [**Leverage**](https://app.harborfinance.io/sail) to mint or manage **hs**. hs can gain or lose value quickly. In extreme stress, hs can approach **zero** while ha may trade below peg — see [Risk Considerations](/risk-considerations).

### 5. Maiden Voyage — new markets

[**Maiden Voyage**](https://app.harborfinance.io/genesis) bootstraps markets before or at launch: capped deposits, then claim **ha** and **hs** when the market goes live. Eligible participants may receive ongoing **Yield Share**. See [Maiden Voyage](/maiden-voyage).

## What you should expect

- **Yield** — from collateral yield and protocol revenue concentrated into pool depositors (not from hs directly).
- **Fees** — mint/redeem fees move with system stress; see [Protocol Fees](/fees).
- **Withdrawals** — pools may use a request window; early exit can cost extra — check the app.
- **Rebalances** — normal in stress; not the same as a perp liquidation, but **you can end up with different assets** than you deposited.

## Where to go next

| Goal | Start here |
| ---- | ---------- |
| I have ETH and want yield | [Get Started](/get-started) |
| Compare live markets | [Live Markets](/markets) |
| Deeper mechanics | [Technical Overview](/technical-overview) |
| Risks in plain English | [Risk Considerations](/risk-considerations) |
