---
sidebar_position: 3
---

# Get Started

“I have X, I want Y” — short paths into the live app. Vocabulary: [Glossary](/glossary). Markets: [Live Markets](/markets).

## I have ETH and want yield

1. **Wrap to wstETH** (or use a zap in the app if you prefer one transaction).
2. **Pick a wstETH market** — e.g. haBTC or haEUR on [Live Markets](/markets).
3. **Mint ha** in the app (deposit wstETH → receive haBTC / haEUR / …).
4. Open [**Earn**](https://app.harborfinance.io/anchor) → deposit that **ha** into a **collateral** or **Sail** stability pool.
5. **Claim rewards** periodically, or leave them to accrue — see the Rewards panel.

**Risk you accept:** during a rebalance, your deposited ha may be exchanged for **collateral** (collateral pool) or **hs** (Sail pool). You still earned yield up to that point. See [Risk Considerations](/risk-considerations).

## I have fxUSD / USDC and want yield

1. **Convert to fxSAVE** (market collateral for fxUSD-family markets) — direct hold or zap.
2. **Pick a fxSAVE market** — haETH, haBTC, or haEUR are live on Earn today.
3. **Mint ha** → deposit into [**Earn**](https://app.harborfinance.io/anchor) as above.

fxSAVE is f(x) Protocol’s yield wrapper; Harbor fxUSD markets do not hold raw fxUSD as collateral. See [Glossary — fxSAVE](/glossary#collateral--wrappers).

## I want leverage (long/short vs a peg)

1. Open [**Leverage**](https://app.harborfinance.io/sail).
2. Choose a market whose **hs** matches the exposure you want (collateral vs peg in the name, e.g. **hsFXUSD-ETH**, **hsSTETH-BTC**).
3. **Mint hs** against collateral, or buy hs on secondary markets where liquidity exists.

**You do not** set leverage or stop-loss in the UI — effective leverage comes from the market’s collateral ratio and token pricing.

**What can go wrong:** if collateral falls vs the peg or the system depletes its risk buffer, **hs can lose most or all value**. ha can trade below peg. This is not a margin-call liquidation, but losses can still be severe. Read [Risk Considerations](/risk-considerations) before sizing a position.

## I only want yield — not rebalance surprises

There is **no pool type** that guarantees you keep ha through all stress events. Rebalances exist to protect system solvency.

To reduce surprise:

- Use the **collateral pool** if you prefer receiving **fxSAVE / wstETH** instead of hs when rebalances hit your deposit.
- **Size down** — only deposit what you can accept converting during a downturn.
- **Monitor** market health in the app and [Risk Considerations](/risk-considerations).

Yield is attractive precisely because depositors help absorb stress — that is the tradeoff.

## A new market is launching

1. Open [**Maiden Voyage**](https://app.harborfinance.io/genesis).
2. Read capacity, collateral, and **Yield Share** rules for that voyage.
3. Deposit while capacity is open.
4. After launch, **claim ha and hs**, then choose Earn, hold, or Leverage.

Details: [Maiden Voyage](/maiden-voyage).

## I want to build on Harbor (integrators)

Skip the product pages above — start at **[Build on Harbor](/tech-docs/integrators)** for addresses, ABIs, dry-runs, and pricing.

Public REST/WebSocket API is **not shipped**. On-chain integration uses published ABIs and optional scaffold SDK — see tech docs only.
