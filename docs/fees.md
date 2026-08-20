---
sidebar_position: 6
---

# Protocol Fees

Dynamic mint/redeem fees for **ha** and **hs** — not order-book trading fees. Terms: [Glossary](/glossary).

![Fees act like a pressure valve.](/img/06-dynamic-fee-feedback.png)

## Dynamic fees

Harbor adjusts mint/redeem fees in real time:

- **Normal conditions** — low fees (illustrative ~0.25% mint **ha**, ~1% mint **hs**; check app quote per market)
- **System stress** — fees rise on actions that worsen collateral ratio
- **System needs balance** — fees can go to zero or **negative** (paying users to mint helpful-side tokens)

## Tiered structure

Large txs that cross stress thresholds pay higher fees **only on the portion** that causes impact.

## Feedback loop

- Everyone wants **ha** → minting ha gets expensive; **hs** cheaper
- Everyone wants leverage → opposite — cheaper **ha**, pricier **hs**
- Arbitrageurs help rebalance demand

## Where fees go

Per market (with collateral yield = protocol revenue):

1. Up to **~5%** → [Maiden Voyage](/maiden-voyage) **Yield Share** (when eligible)
2. **~95%** → treasury take (if TVL threshold met), then **75% pools** / **25% buy TIDE**

Full waterfall: [TIDE Tokenomics](/tide-token/tokenomics).

## Integration with stability pools

Fees steer entry/exit; [Stability Pools](/stability-pools) handle ongoing stress via rebalancing.

## For users

- **Small txs** — usually low fees
- **Large txs** — pay for stress they add
- **Helpful actions** — may earn rebates when the system needs them
- Always **dry-run / quote in the app** before confirming
