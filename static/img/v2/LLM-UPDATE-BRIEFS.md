# Harbor docs v2 graphics — LLM update briefs

Copy-paste briefs for the graphics LLM. Fix **factual / status / naming** issues only. Do **not** redesign brand, colors, spacing, or layout unless required to fix a label or arrow.

**Sources of truth:** live docs at https://docs.harborfinance.io · `baofinance/harbor-docs` · confirm names in `baofinance/harbor-minter`, `harbor-price-aggregators`, `harbor-zap-contracts`, `harbor-swap`, `harbor-yield`, `harbor-sdk` as cited.

**Global naming rules (apply to every slide):**
- Prefer **`ha` / `hs`** or concrete tickers (`haETH`, `hsFXUSD-ETH`). Never **`haTOKENS` / `hsTOKENS`** ([`docs/glossary.md`](https://docs.harborfinance.io/glossary)).
- Status badges: **LIVE** = mainnet UX; **IN PROGRESS** = partial ship; **SPEC ONLY** / **DESIGN ONLY** = not production. Do not put a single **LIVE** on a slide that is mostly future work unless the live slice is visually isolated.

---

## 01 — `01-protocol-overview.jpg`

**Used on:** `docs/index.md`, `docs/how-it-works.md`

### LLM update brief

```text
Update slide 01 / PROTOCOL OVERVIEW only. Keep layout, LIVE badge, and flow.
Do not redesign colors or composition.

REQUIRED text fixes:
1) Replace every "haTOKENS" with "ha" (or "ha (Harbor Anchored)" once).
2) Replace every "hsTOKENS" with "hs" (or "hs (Harbor Sail)" once).
3) Footer: "Only ha are Stability Pool deposit assets. hs do not earn concentrated collateral yield directly."

OPTIONAL clarity (if space):
- Under Stability Pools, after naming Collateral pool / Sail pool, add one short line:
  "Same yield path; rebalance pays collateral vs hs."
  Source: docs/how-it-works.md Earn table; docs/stability-pools.md.

Keep true: fxSAVE • wstETH; Minter_v2; dynamic fees; LIVE; ha → pools only.
Forbidden labels: haTOKENS, hsTOKENS, HA Tokens, HS Tokens.
```

---

## 02 — `02-architecture.jpg`

**Used on:** `docs/architecture.md`

### LLM update brief

```text
Update slide 02 / ARCHITECTURE only. Keep LIVE badge and left-to-right price→minter→pools story.
Do not redesign brand/layout globally.

REQUIRED flow fixes:
1) Remove the dashed/curved link from "Harbor aggregator" to "Protocol revenue".
   Aggregator only feeds Minter_v2 (and price consumers). It does NOT produce revenue.
2) From Minter_v2, draw TWO sibling outputs: "ha (pegged)" and "hs (Sail)".
   Do not show hs as downstream of ha.
3) Keep only ha depositing into Collateral SP and Sail SP.

REQUIRED label checks (keep if already correct):
- Price inputs: "Chainlink feeds + collateral rate"
- Harbor aggregator: "latestAnswer() · market-specific"
- Minter_v2: "Mint / redeem ha + hs · CR + dynamic fee views · wrapped collateral custody"
- SP Manager: "harvest · rebalance" (functions on StabilityPoolManager_v1)
- Collateral SP: "ha deposits · rebalance → collateral"
- Sail SP: "ha deposits · rebalance → hs"
- Footer unchanged: two fixed pools per market; manager does not create pools dynamically.

OPTIONAL revenue precision (same box, tighter wording):
"Collateral yield + mint/redeem fees.
Yield Share (~5%) first → optional post-~$10M TVL treasury take → 75% SPs / 25% buy TIDE."

Show Collateral SP and Sail SP as parallel peers (bracket or fork), not step1→step2.

Sources: docs/architecture.md; docs/tide-token/tokenomics.md;
tech-docs/contracts/stability-pool-manager.md;
baofinance/harbor-price-aggregators (latestAnswer);
baofinance/harbor-minter Minter_v2 + StabilityPoolManager_v1.
```

---

## 03 — `03-technical-overview.jpg`

**Used on:** `docs/technical-overview.md`

### Findings
- Content matches mint-time 100% efficiency vs system CR (~130%).
- Soft issue: column 1 anchors **$100 collateral** while column 3’s **$130 ÷ $100 = 130%** invents a second collateral figure if read as one continuous example.

### LLM update brief

```text
Update slide 03 / TECHNICAL OVERVIEW only. Keep three-column “do not conflate” structure and LIVE badge.

REQUIRED clarity fix:
- Make the ~130% example self-contained so it cannot be read as continuing the $100 deposit example.
  Option A: Column 3 example → "e.g. $130 collateral ÷ $100 ha = 130% CR" and do not reuse column 1’s $100 as ha.
  Option B: Drop the $130÷$100 arithmetic pill; keep only "example threshold ≈ 130%" + formula "collateral ÷ ha".

Keep true:
- ha NAV + hs NAV ≈ collateral (100% mint-time efficiency; fees can change outputs)
- System CR = collateral ÷ ha; gates rebalancing; read threshold per market
- Footer: illustrative values; live contracts are SoT

Sources: docs/technical-overview.md; docs/glossary.md (Two ratios).
```

---

## 04 — `04-stability-pools.jpg`

**Used on:** `docs/stability-pools.md`

### LLM update brief

```text
Update slide 04 / STABILITY POOLS only. Keep dual-pool fork and LIVE badge.

REQUIRED naming:
1) Replace "haTOKENS" with "ha" everywhere (subtitle + deposit asset).
2) Replace "hsTOKENS" with "hs" (Sail payout + footer).
3) Footer: "hs are rebalance payout tokens for the Sail pool, not Stability Pool deposit assets."

Keep true:
- Same deposit (ha), same yield path, different rebalance outcomes
- Collateral SP: ha burned → wrapped collateral at oracle value
- Sail SP: ha burned → hs
- Shared list may keep: collateral harvest, protocol revenue to pools, Marks, TIDE when allocated

Sources: docs/stability-pools.md; docs/glossary.md.
```

---

## 05 — `05-yield.jpg`

**Used on:** `docs/yield.md`

### Findings
- Math ($7 ÷ $30 ≈ 23.3%, ~3.3×) matches the shared $100 / $50+$50 / $30 example; docs prose says “~3×” / “~20%+” as approximation. No hard inconsistency.

### LLM update brief

```text
Update slide 05 / YIELD only if you touch it. Keep LIVE badge and concentration example.

OPTIONAL: Align the callout with docs wording without changing math:
- Keep "$7 ÷ $30 = 23.3% gross illustrative" and "~3.3×"
- Or add "≈ ~3× base APR before incentives (docs round to ~20%+)" as a footnote

Keep true: only ha in pools earns concentrated yield; hs does not.
Sources: docs/yield.md.
```

*(No required change — optional polish only.)*

---

## 06 — `06-protocol-fees.jpg`

**Used on:** `docs/fees.md`

### Findings
- Matches dynamic fee / pressure-valve loop; negative fees; dry-runs / `config()`. None found.

### LLM update brief

```text
No required factual changes for slide 06 / PROTOCOL FEES.
If regenerating: keep LIVE; SYSTEM CR center; self-correcting loop;
ha mint fee rises under stress; hs mint can reach zero or funded negative fee;
footer: path-dependent, market-specific; use dry-runs and config(), not hard-coded examples.
Sources: docs/fees.md; tech-docs/integrators/market-state-and-fees.md; harbor-minter Minter_v2 fee/disallow config.
```

---

## 07 — `07-maiden-voyage.jpg`

**Used on:** `docs/maiden-voyage.md`

### Findings
- Timeline matches deposit → cap → claim ha+hs → choose path → Yield Share ~5%. None found.

### LLM update brief

```text
No required factual changes for slide 07 / MAIDEN VOYAGE.
If regenerating: keep LIVE; Yield Share “up to ~5%”; WITHDRAWALS REDUCE ELIGIBILITY;
footer: per-voyage rules in the app.
OPTIONAL: one Marks callout (“Ledger Marks toward TIDE”) if space.
Sources: docs/maiden-voyage.md; docs/tide-token/tokenomics.md.
```

---

## 08 — `08-roadmap.jpg`

**Used on:** `docs/roadmap.md`

### Findings
- **`@harbor/sdk` under LIVE / Shipped** overclaims vs roadmap table (**Partial**; GitHub install; **npm publish pending**).
- Slide-level **LIVE** badge sits above SOON / LATER columns.

### LLM update brief

```text
Update slide 08 / ROADMAP only. Keep four parallel columns and footer disclaimer.

REQUIRED status fixes:
1) Under column 01 LIVE / Shipped: change "@harbor/sdk" to "@harbor/sdk (GitHub)" or move SDK entirely out of Shipped.
2) Keep "SDK npm publish" under SOON / IN PROGRESS only.
3) Replace top-right single LIVE badge with something that does not imply the whole roadmap is live
   (e.g. remove badge, or "PARALLEL WORKSTREAMS", or badge only on column 01).

Keep aligned with docs/roadmap.md:
- LIVE: Minter + fixed SPs; haETH/haBTC/haEUR + hs; Maiden Voyage + TIDE; integrator docs
- SOON: haUSD (wstETH→USD); Compounder hc… + hy vaults; SDK npm; pricing packaged
- Market growth: ~$50k bootstrap; Morpho/Euler; Pendle conversations
- LATER: shared haUSD network; hs as external collateral; CCIP TIDE; permissionless factory

OPTIONAL: Pending metal pegs (haGOLD/haSILVER/haMCAP relaunch) as a note, not as Launched.
Sources: docs/roadmap.md; tech-docs/integrators/index.md (SDK GitHub; no public REST/WS).
```

---

## 09 — `09-tide.jpg`

**Used on:** `docs/tide-token/overview.md`

### Findings
- Value accrual path (25% buy → treasury 30% → POL 15% → burn; 1B supply) matches tokenomics.
- Market Growth box mixes **75% SP revenue share** (not a TIDE role) with arrows into the TIDE node.

### LLM update brief

```text
Update slide 09 / TIDE only. Keep LIVE badge and three-role framing.

REQUIRED role fix:
- Market Growth should describe TIDE’s role as "targeted SP incentives when allocated"
  — do NOT draw the 75% SP revenue share as flowing into the TIDE token node.
- Keep 75%/25% split as protocol revenue after Yield Share / TVL take (footer is good).
- Value accrual path stays: 25% of eligible remainder buys TIDE → Treasury <30% → POL <15% → Burn;
  targets use 1B total supply.

Keep Governance: early incentives team-directed with community oversight.
Sources: docs/tide-token/overview.md; docs/tide-token/tokenomics.md.
```

---

## 10 — `10-integrators.jpg`

**Used on:** `tech-docs/integrators/index.md`

### Findings
- LIVE surfaces, NO PUBLIC REST/WS, pre-prod footer — match docs. None found.

### LLM update brief

```text
No required factual changes for slide 10 / INTEGRATORS.
If regenerating: keep LIVE on Oracle+pricing / Minter_v2 / Stability Pool only;
NO PUBLIC REST / WS API; footer that Compounders, hy, outbound oracle adapters are not production surfaces.
Sources: tech-docs/integrators/index.md; baofinance/harbor-sdk.
```

---

## 11 — `11-token-taxonomy.jpg`

**Used on:** `tech-docs/integrators/token-taxonomy.md`

### Findings
- Live vs pre-prod dashed siblings; HY does not wrap Compounder — correct. None found.

### LLM update brief

```text
No required factual changes for slide 11 / TOKEN TAXONOMY.
If regenerating: keep LIVE on solid path (fxSAVE/wstETH → Minter_v2 → haXXX / hsYYY-XXX → SP_v1/v2 balance);
dashed pre-prod: hp…/SP_v3, hc… ERC-4626, hy… ERC-7575;
footer: Compounder and HarborYield are siblings; HY does not wrap Compounder.
Sources: tech-docs/integrators/token-taxonomy.md; baofinance/harbor-yield.
```

---

## 12 — `12-pricing.jpg`

**Used on:** `tech-docs/integrators/pricing.md`, `tech-docs/contracts/price-oracle.md`

### Findings
- Surfaces and NOT AggregatorV3 warning match. None found.

### LLM update brief

```text
No required factual changes for slide 12 / PRICING.
If regenerating: keep LIVE; Chainlink latestRoundData (often 8 dec) + rate providers → Harbor aggregator latestAnswer (4× uint256, 18 dec, NOT AggregatorV3);
Minter views peggedTokenPrice / leveragedTokenPrice / collateralRatio as separate surface;
footer: do not assume ha/hs ERC-20s implement price() or Chainlink interfaces.
Sources: tech-docs/integrators/pricing.md; baofinance/harbor-price-aggregators.
```

---

## 13 — `13-mint-redeem.jpg`

**Used on:** `tech-docs/integrators/mint-redeem.md`, `tech-docs/process-flows/minting.md`

### Findings
- Swimlane attributes **`latestAnswer()`** to the **Minter_v2** column; that call is on the **Harbor aggregator**. Integrator cookbook is approve → `*DryRun` → `mint*`/`redeem*` + `minOut`.

### LLM update brief

```text
Update slide 13 / MINT + REDEEM only. Keep LIVE and DISCOUNT ONLY IF FUNDED badges.

REQUIRED swimlane fix:
1) Integrator-facing steps should be:
   (1) approve wrapped collateral
   (2) *DryRun(amount) on Minter_v2
   (3) read incentive ratio / outs from dry-run (abort if ratio == 1e18 or zero outs)
   (4) mint* / redeem* with minOut
   Optional internal note: minter uses aggregator latestAnswer() under the hood — do not show latestAnswer as a separate integrator column under Minter_v2.
2) Fee path: fee → feeReceiver; discount → ReservePool when funded.
3) Footer: redeem approval only when burn mode requires it; abort on 1e18 or zero; re-quote near band edges.

Sources: tech-docs/integrators/mint-redeem.md; baofinance/harbor-minter Minter_v2;
tech-docs/integrators/pricing.md (latestAnswer on aggregator).
```

---

## 14 — `14-zaps.jpg`

**Used on:** `tech-docs/integrators/zaps.md`

### Findings
- ETH/USDC families, Genesis vs Minter destination, Sherlock out of scope — match. None found.

### LLM update brief

```text
No required factual changes for slide 14 / ZAPS.
If regenerating: keep LIVE + OPTIONAL UX HELPER; ETH family → GenesisETHZap / MinterETHZap → wstETH;
USDC family (USDC + fxUSD) → GenesisUSDCZap / MinterUSDCZap → fxSAVE;
Destination: Genesis while active, Minter_v2 after launch;
footer: prefer direct minter when wrapped collateral held; zaps outside Sherlock scope.
Sources: tech-docs/integrators/zaps.md; baofinance/harbor-zap-contracts.
```

---

## 15 — `15-market-state-fees.jpg`

**Used on:** `tech-docs/integrators/market-state-and-fees.md`

### Findings
- Band story matches. Footer says `incentiveRatio == 1e18` means **disregard**; contracts/docs say **disallow**.

### LLM update brief

```text
Update slide 15 / MARKET STATE + FEES only. Keep LIVE and action-specific illustration disclaimer.

REQUIRED wording:
- Footer: change "disregard" → "disallow"
  Exact: "incentiveRatio == 1e18 means disallow (abort; do not send tx)."

Keep true:
- Read config(), incentive-ratio views, size-specific dry-run
- ha mint: more expensive / disallow under low CR; hs mint: discount / zero / funded negative from ReservePool when equity helps
- Fee bands and rebalance thresholds are per market

Sources: tech-docs/integrators/market-state-and-fees.md; mint-redeem.md;
harbor-minter Minter_v2 (values == 1 ether are disallow).
```

---

## 16 — `16-harbor-swap.jpg`

**Used on:** `tech-docs/integrators/swap.md`

### Findings
- IN PROGRESS overall; Direct LIVE; Aggregator IN PROGRESS (Velora); NOT FOR MINT/REDEEM — match `baofinance/harbor-swap`. None found.

### LLM update brief

```text
No required factual changes for slide 16 / HARBOR SWAP.
If regenerating: keep top IN PROGRESS; Direct mode LIVE (UniV3/Curve/Balancer/fxSAVE↔wstETH; minAmountOutPerUnitIn);
Aggregator mode IN PROGRESS (Velora primary when published; 1inch optional; absolute minAmountOut);
NOT FOR MINT / REDEEM; compound() hot path / redistribute() discretionary.
Sources: tech-docs/integrators/swap.md; tech-docs/contracts/harbor-swap.md; baofinance/harbor-swap.
```

---

## 17 — `17-oracle-adapters.jpg`

**Used on:** `tech-docs/integrators/oracle-adapters.md`

### Findings
- SPEC ONLY; do not use Harbor aggregator as AggregatorV3 — correct. None found.

### LLM update brief

```text
No required factual changes for slide 17 / ORACLE ADAPTERS.
If regenerating: keep SPEC ONLY; proposed adapter synthesizes round metadata / scales / forwards staleness;
consumer expects latestRoundData (often 8 dec); banner DO NOT USE HARBOR AGGREGATOR AS AGGREGATORV3;
footer: until adapters ship, call latestAnswer() or minter views directly.
Sources: tech-docs/integrators/oracle-adapters.md; baofinance/harbor-price-aggregators (inbound only today).
```

---

## 18 — `18-hy-erc7575.jpg`

**Used on:** `tech-docs/integrators/hy-erc7575.md`

### Findings
- DESIGN ONLY; doors; sibling Compounder — match. Ensure discovery line reads `door = hy.vault(asset)`.

### LLM update brief

```text
Update slide 18 / HARBOR YIELD (ERC-7575) only if discovery text is garbled.
Keep DESIGN ONLY badge.

REQUIRED check:
- Discovery label must be exactly: door = hy.vault(asset)
- Keep: hyXXX ERC-7575 shared token; doors mint/burn shared hy; hcXXX is sibling ERC-4626 (NOT WRAPPED BY / not parent)
- Footer: Compounders and hyTOKENS are not live mainnet UX

Sources: tech-docs/integrators/hy-erc7575.md; baofinance/harbor-yield doc/design.md.
```

---

## 19 — `19-rebalance.jpg`

**Used on:** `tech-docs/process-flows/rebalance.md`, `tech-docs/contracts/stability-pool-manager.md`

### Findings
- Flow matches `rebalance(bountyReceiver, minPeggedLiquidated)` / `notifyLiquidation` / fee-free redeem.
- Uses **`hsTOKENS`** on Sail payout.

### LLM update brief

```text
Update slide 19 / REBALANCE only. Keep LIVE badge and two-pool outcomes.

REQUIRED naming:
- Sail Stability Pool payout: "hs accrue via notifyLiquidation()" — not hsTOKENS.

Keep true:
- Trigger: collateralRatio() < rebalanceThreshold()
- Keeper: rebalance(receiver, minPeggedLiquidated)
- SP Manager v1: validates CR, weights both pools, draws ha from both
- Minter_v2: fee-free redemption; ha supply burns
- Collateral SP: wrapped collateral via notifyLiquidation()
- Keeper bounty from proceeds; no feeReceiver cut on rebalance
- Footer: two immutable pools per market

Sources: tech-docs/process-flows/rebalance.md;
tech-docs/contracts/stability-pool-manager.md;
harbor-minter StabilityPoolManager_v1; docs/glossary.md.
```

---

## 20 — `20-stability-pool-lifecycle.jpg`

**Used on:** `tech-docs/process-flows/stability-pools.md`

### Findings
- Balance-not-share, no gauge, two accounting lanes — match. None found (confirm “deposit amount” not “mount”).

### LLM update brief

```text
No required factual changes for slide 20 / STABILITY POOL LIFECYCLE unless a typo exists.
If regenerating: keep LIVE; Deposit ha → compounding balance → rewards (depositReward) → claim()/withdraw;
NO GAUGE • NO ERC-20 SHARE; two accounting lanes (ha balance vs reward accumulators);
footer: withdrawal delay / fee-free window / early fee are per market — check the app.
Sources: tech-docs/process-flows/stability-pools.md; tech-docs/contracts/stability-pool.md.
```

---

## 21 — `21-genesis.jpg`

**Used on:** `tech-docs/contracts/genesis.md`

### Findings
- Three phases, `endGenesis()`, 50/50 fee-free mint, no withdraw after end — match `Genesis_v1`. None found.

### LLM update brief

```text
No required factual changes for slide 21 / GENESIS.
If regenerating: keep LIVE; Phase1 shares[address] 1:1 fee-free withdraw before end;
Phase2 endGenesis() → snapshot → 50/50 fee-free ha+hs mint;
Phase3 claim once → proportional ha+hs → shares zero;
callout NO GENESIS WITHDRAW AFTER endGenesis();
footer: later exit via Minter_v2 redeem subject to fees/CR.
Sources: tech-docs/contracts/genesis.md; harbor-minter Genesis_v1.
```

---

## 22 — `22-harbor-yield.jpg`

**Used on:** `docs/harbor-yield.md`, `tech-docs/contracts/harbor-yield.md`

### Findings
- Level 1 LIVE vs L2/L3 DESIGN ONLY matches product caution. Sibling arc correct. None found.

### LLM update brief

```text
No required factual changes for slide 22 / HARBOR YIELD.
If regenerating: keep Level1 LIVE (+ SP_v3 hp… PRE-PROD callout); Level2/3 DESIGN ONLY;
siblings arc; footer: product levels 1–3 = design-doc 0–2; Harbor Swap is routing, not a fourth tier.
Sources: docs/harbor-yield.md; tech-docs/integrators/token-taxonomy.md; baofinance/harbor-yield.
```

---

## 23 — `23-contract-architecture.jpg`

**Used on:** `tech-docs/process-flows/contract-architecture.md`

### Findings
- Primary solid user path through **Genesis_v1** understates post-launch **direct Minter_v2** mint/redeem.

### LLM update brief

```text
Update slide 23 / CONTRACT ARCHITECTURE only. Keep LIVE and “no gauges/factories/HY modules” framing.

REQUIRED flow fix:
- Show User/Integrator with TWO solid paths:
  (A) Genesis_v1 while voyage active (deposit shares → endGenesis → mint)
  (B) Direct Minter_v2 for mint/redeem after launch (primary live path)
- Keep dashed DIRECT USER POOL CALLS to Collateral SP + Sail SP
- Keep SPM_v1 → harvest/rebalance; ReservePool (funded discounts); FeeReceiver; aggregator latestAnswer(); ha/hs minter-controlled

Footer keep: internal accumulators / claimable rewards; SP_v1/v2 not ERC-20 shares.

Sources: tech-docs/process-flows/contract-architecture.md;
tech-docs/integrators/mint-redeem.md; harbor-minter.
```

---

## 24 — `24-harbor-swap-architecture.jpg`

**Used on:** `tech-docs/contracts/harbor-swap.md`

### Findings
- Two modes / two protections / selector allowlist ≠ parameter validation — match. None found.

### LLM update brief

```text
No required factual changes for slide 24 / HARBOR SWAP ARCHITECTURE.
If regenerating: keep IN PROGRESS top badge; Swapper_v1 LIVE registry;
Direct LIVE: minAmountOutPerUnitIn rate floor; Aggregator IN PROGRESS: absolute minAmountOut;
SELECTOR ALLOWLIST ≠ PARAMETER VALIDATION;
footer: per-unit floor does not protect aggregator redistribute — consumer enforces absolute output.
Sources: tech-docs/contracts/harbor-swap.md; baofinance/harbor-swap (Velora PR #3 open).
```

---

## TIDE — `tide-tokenomics.jpg`

**Used on:** `docs/tide-token/tokenomics.md`

### Findings
- Main flowchart jumps from Protocol Revenue → **$10M TVL take** → 75/25, omitting the first **Yield Share (~5%)** node (footer mentions it; diagram does not).

### LLM update brief

```text
Update slide TIDE / TOKENOMICS only. Keep LIVE badge and buy→treasury→POL→burn ladder.

REQUIRED flow fix — insert Yield Share as first carve-out:
1) Protocol Revenue (collateral yield + mint/redeem fees)
2) Yield Share: up to ~5% to eligible Maiden Voyage participants (when applicable)
3) Of remainder: Above ~$10M TVL? → Yes: treasury takes ~5%+; No: skip
4) Of what is left: 75% Stability pools (TVL grows) / 25% Buy TIDE
5) Bought TIDE: Treasury < 30% of 1B supply → else POL < 15% → else Burn

Keep footer note that Yield Share and TVL take occur before 75/25; targets use 1B total supply.
Do not use circulating supply as denominator.

Sources: docs/tide-token/tokenomics.md; docs/tide-token/overview.md.
```

---

## Priority queue for the graphics LLM

Do these first (hard inconsistencies):

1. `01-protocol-overview.jpg` — haTOKENS/hsTOKENS  
2. `04-stability-pools.jpg` — haTOKENS/hsTOKENS  
3. `19-rebalance.jpg` — hsTOKENS  
4. `02-architecture.jpg` — aggregator↛revenue; ha/hs siblings  
5. `tide-tokenomics.jpg` — Yield Share first  
6. `08-roadmap.jpg` — SDK Partial; slide LIVE badge  
7. `13-mint-redeem.jpg` — latestAnswer not a Minter column  
8. `23-contract-architecture.jpg` — direct Minter path  
9. `09-tide.jpg` — 75% SP not a TIDE inflow  
10. `15-market-state-fees.jpg` — disallow not disregard  
11. `03-technical-overview.jpg` — CR example continuity  

Slides with **no required** change: `05` (optional), `06`, `07`, `10`, `11`, `12`, `14`, `16`, `17`, `18` (check discovery string), `20`, `21`, `22`, `24`.
