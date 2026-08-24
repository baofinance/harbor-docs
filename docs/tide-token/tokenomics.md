---
sidebar_position: 3
---

# TIDE Tokenomics

Harbor is built to reward long-term participation, prioritize early growth, and create sustainable value accrual.

**Total Supply:** 1,000,000,000 TIDE (1 billion tokens) — hard-capped in the TIDE token contracts.

## Protocol Revenue Flow

Protocol revenue is **collateral yield + mint/redeem fees**. It is allocated as follows:

![Harbor protocol revenue and TIDE flow](/img/tide-content-flow.png)

### Top-level split

1. **Maiden Voyage Yield Share (per market, if eligible):** up to **~5%** of that market’s revenue goes to eligible voyage participants. See [Maiden Voyage](/maiden-voyage).
2. **Of the remaining ~95%:**
   - **Above ~$10M TVL?** If yes, the treasury takes a cut (about **5%+** of this remainder). Below that threshold, none of this step applies.
   - Of what is left after any TVL treasury take:
     - **75% → Stability pools** (“grow markets” / TVL grows)
     - **25% → Buy TIDE** (“strengthen TIDE”)

**Example:** $100 of market revenue → **~$5** Yield Share → **~$95** into the protocol path above → after any TVL take, that amount splits **75/25**.

### What happens to bought TIDE (the 25%)

1. If the Harbor treasury holds **less than 30%** of **total** TIDE supply → **add to treasury**
2. Else if protocol-owned liquidity (POL) is **below 15%** of **total** TIDE supply → **add to POL**
3. Else → **burn TIDE**

Both ownership targets use the hard-capped **1B total supply** as denominator (not circulating supply).

Landing (“75% grow markets / 25% strengthen TIDE”) and the Tide app (treasury → POL → burn) describe the **same** flow at different zoom levels (on revenue **after** Yield Share).

The long-term goal is simple: **let the protocol itself become the long-term buyer of TIDE**. Lower prices do not increase emissions — they increase how much TIDE protocol revenue can buy back over time.

---

## BAO → Harbor Migration

The former **25% BAO treasury** allocation is **distributed directly to BAO holders** through a migration airdrop (liquid BAO and veBAO).

As part of this process, **BAO is effectively retired**, with **TIDE** becoming the primary ecosystem token. This is cleaner than parking a large share of supply in a BAO treasury indefinitely and removes long-term overhang uncertainty.

There is a **claim window** (timing TBA) for BAO and veBAO holders. **Unclaimed tokens after the deadline return to the Harbor Treasury.**

---

## Token Allocation

### Community & Ecosystem

| Category | Allocation | Details |
| -------- | ---------- | ------- |
| BAO migration airdrop | 25% | All liquid BAO and veBAO — former Bao treasury allocation, distributed to holders |
| veBAO holders | 5% | **Additional** 5% for veBAO only |
| Community sale | 5% | Increased from the prior 1.5% |
| Aladdin DAO | 3% | Strategic partnership allocation |
| Booster rewards | 1% | Liquid at launch |
| Future booster incentives | 2% | Reserved for later booster programs |
| Maiden Voyage participants | 1.5% | 1% launch Maiden Voyage; 0.4% EUR voyages; 0.1% metals |
| Harbor Marks | 1% | Marks from activity **other than** Maiden Voyage |

### Founders

| Category | Allocation | Details |
| -------- | ---------- | ------- |
| Founders | 22% | ~2% initially liquid; remaining **~20%** locked until **TVL + POL KPIs** are met (see below)\* |

#### Founder KPI unlocks (~20% of supply)\*

\* **KPI schedule pending** — the cliff table below is the working design. Final numbers and vesting-contract wording may still be updated; treat as provisional until confirmed on-chain / in the Tide dashboard.

The KPI-locked founder allocation unlocks against **five TVL + POL cliffs**. Each cliff that is met unlocks **up to 4% of total supply**, and unlocks are capped at **4% of total supply per year** — even if Harbor is ahead of the KPI schedule. POL is a share of **total TIDE supply** (1B hard cap).

| Cliff | TVL\* | POL\* (of total TIDE supply) | Unlock when met |
| ----- | ----- | ---------------------------- | --------------- |
| **1** | ≥ **$1M** | ≥ **1%** | **4%** |
| **2** | ≥ **$5M** | ≥ **2.5%** | **4%** |
| **3** | ≥ **$10M** | ≥ **4.5%** | **4%** |
| **4** | ≥ **$25M** | ≥ **9%** | **4%** |
| **5** | ≥ **$50M** | ≥ **15%** | **4%** |
| | | **Total** | **20%** |

| Example cumulative | Unlock | Cumulative |
| ------------------- | ------ | ---------- |
| After cliff 1 | 4% | **4%** |
| After cliff 2 | 4% | **8%** |
| After cliff 3 | 4% | **12%** |
| After cliff 4 | 4% | **16%** |
| After cliff 5 | 4% | **20%** |

Notes:

- **Both metrics required** at each cliff (TVL **and** POL). Cliffs are taken **in order** (1 → 5).
- **Cliffs, not drip:** no continuous unlock between cliffs — only when a cliff is newly satisfied.
- **Max 4% per year:** unlocking cannot exceed **4% of total supply in any year**, even if several cliffs are already met early. Full release of the 20% therefore takes **at least five years**.
- Cliff 1 is intentionally easy (**$1M / 1% POL**); cliff 5 matches the long-term POL ownership goal (**$50M / 15% POL**).
- Separately, **~2%** of supply is founder liquid at launch (outside this 20% KPI schedule). Total founder allocation remains **22%**.
- \* **Pending confirmation** — do not treat cliff TVL/POL figures as final until published with vesting contracts / the Tide dashboard.


### Treasury

| Category | Allocation | Details |
| -------- | ---------- | ------- |
| Harbor Treasury | 34.5% | Operating reserve for growth, incentives, and long-term stewardship |

**Total:** 100%.

---

## Launch Circulating Supply

Expected circulating supply at launch is approximately **43.5%**.

The remaining **~56.5%** is primarily:

- Harbor Treasury reserves
- Founder KPI-locked allocations\* (**5 cliffs × 4%**; max **4%/year**; cliff 1 **$1M / 1% POL** → cliff 5 **$50M / 15% POL**)
- Future booster reserves

Initial liquidity may be relatively limited, and early price discovery may be volatile — that is expected. Harbor focuses on sustainable ownership and protocol-driven buybacks rather than engineering short-term token price action.

### Claim windows

- BAO / veBAO migration and related claims use a yet-to-be-finalized claim window; unclaimed amounts return to Harbor Treasury
- Check the [Tide dashboard](https://app.harborfinance.io/tide) for live eligibility and claim status

### Treasury Governance

All treasury token usage should follow:

- Transparent, pre-announced frameworks
- Multisig approval process
- Long-term transition to governance committee oversight
- Community accountability

---

## Key Tokenomic Features

### 1. Marks, Maiden Voyage, and Claims

- **Harbor Marks** (1% allocation) reward non–Maiden Voyage activity
- Maiden Voyage participants have a dedicated **1.5%** allocation slice (plus ongoing Yield Share on markets they help launch)
- Migration, airdrop, and claim flows are surfaced in the [Tide app](https://app.harborfinance.io/tide)

### 2. Protocol-Owned Liquidity Strategy

Harbor prioritizes **permanent liquidity** over rented liquidity:

- Target: **15% of total TIDE supply** (hard-capped **1B**) as protocol-owned liquidity — same denominator as the treasury goal (**30% of total supply**), not of circulating supply
- Provides stability through market cycles
- Reduces long-term token dilution from mercenary liquidity mining

### 3. Buyback & Burn Value Accrual

- **25%** of (post–Yield Share and post–TVL-take) revenue buys TIDE on the open market
- Bought TIDE first fills treasury (to **30% of total supply**), then POL (to **15% of total supply**), then burns
- Scales with protocol revenue — the protocol is designed as the long-term buyer of TIDE

### 4. Team-Directed Incentives

Harbor uses **team-controlled emissions** rather than gauge voting in the early phase:

- Enables rapid iteration and adjustment
- ROI-focused: every token emitted should drive growth or security
- Future transition to governance committee

### 5. Treasury Sustainability

- Harbor Treasury holds **34.5%** at allocation, with a long-term ownership goal of **≥30% of total TIDE supply** via buybacks when needed
- Provides warchest for incentives and growth
- Until buyback ownership targets are met, purchased TIDE is retained rather than burned

### 6. Founder alignment (TVL + POL)

~20% of supply (founder KPI lock) unlocks against five **TVL + POL** cliffs (**$1M/1% → $5M/2.5% → $10M/4.5% → $25M/9% → $50M/15%**), **4% per cliff**, with a hard cap of **4% of supply per year**. Full unlock takes at least five years even if KPIs are hit early. \*KPI schedule pending — provisional until vesting contracts / Tide dashboard confirm.
---

## Vesting Overview

### Expected liquid / circulating at launch (~43.5%)

Primarily community & ecosystem distributions, including:

- BAO migration airdrop (25%)
- Additional veBAO allocation (5%)
- Community sale (5%)
- Aladdin DAO (3%)
- Booster rewards liquid at launch (1%)
- Maiden Voyage participants (1.5%)
- Harbor Marks (1%)
- Plus ~2% initially liquid founder tokens (founder total remains 22%)

Exact circulating mix at TGE depends on claim timing and unlock schedules — use the app for live figures.

### Locked / reserved at launch (~56.5%)

- Harbor Treasury (34.5%)
- Founder KPI locks (~20% of supply)\* — five cliffs (**$1M/1% → … → $50M/15%**), **4% each**, max **4%/year** (see [Founder KPI unlocks](#founder-kpi-unlocks-20-of-supply))
- Future booster reserves (2%)

---

## Launch Philosophy

Harbor is designed around:

- Protocol revenue
- TIDE buybacks
- Treasury accumulation
- Long-term sustainability

Lower prices do not increase emissions. They increase how much TIDE the protocol can accumulate from revenue over time.
