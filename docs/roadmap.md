---
sidebar_position: 8
---

# Roadmap

Harbor grows in **two directions at once**:

1. **Launch more markets** without relying on Harbor-funded incentives.
2. **Build utility around ha, hs, and hy** so external demand pulls more collateral into Harbor.

These workstreams run **in parallel**. Nothing below is a hard gate on everything else.

![Harbor grows from live markets into modular infrastructure.](/img/v2/08-roadmap.jpg)

## Status at a glance

**Launched** = product go-live. For **core markets / stability pools / Ledger Marks**, that is **Genesis End** (market kickoff after `endGenesis()`). For **Maiden Voyage + Yield Share**, that is **Genesis Start** (voyage opens). **Added to docs** = first appearance in this docs repo (git).

| Area | Status | Launched | Added to docs | Notes |
| ---- | ------ | -------- | ------------- | ----- |
| Core mainnet markets (ETH / BTC / EUR pegs) | **Shipped** | **4 Jan 2026** (ETH/BTC); **2 Feb 2026** (EUR) | 8 Aug 2026 | First-wave Genesis End on [haETH/fxUSD](/tech-docs/markets/haeth/fxusd), [haBTC/fxUSD](/tech-docs/markets/habtc/fxusd), [haBTC/stETH](/tech-docs/markets/habtc/steth); EUR on [haEUR/fxUSD](/tech-docs/markets/haeur/fxusd) / [haEUR/stETH](/tech-docs/markets/haeur/steth). Live on [Earn](https://app.harborfinance.io/anchor) / [Leverage](https://app.harborfinance.io/sail) |
| Stability pools (Level 1) | **Shipped** | **4 Jan 2026** (ETH/BTC); **2 Feb 2026** (EUR) | 8 Aug 2026 | Same dates as core market kickoff |
| Maiden Voyage + Yield Share | **Shipped** | **19 Dec 2025** (ETH/BTC); **19 Jan 2026** (EUR) | 8 Aug 2026 | Genesis **Start** on market pages (first windows → End 4 Jan / 2 Feb 2026); ongoing in [genesis](https://app.harborfinance.io/genesis) |
| Ledger Marks | **Shipped** | **4 Jan 2026** (ETH/BTC); **2 Feb 2026** (EUR) | 8 Aug 2026 | Same dates as core market kickoff (Genesis End) |
| TIDE (token + Tide dashboard) | **Shipped** | **July 2026** | 3 Nov 2025 | Claims in [Tide](https://app.harborfinance.io/tide); live framing refreshed 8 Aug 2026 |
| Integrator docs (addresses, ABIs, mint/redeem, pricing, SPs) | **Shipped** | — | 15 Aug 2026 | [Build on Harbor](/tech-docs/integrators) |
| `@harbor/sdk` | **Partial** | — | 15 Aug 2026 | Install from GitHub; **npm publish pending** |
| Public REST / WebSocket API | **Not shipped** | — | 15 Aug 2026 | On-chain dry-runs + views only |
| **haUSD** (wstETH → USD) product surface | **Soon** | — | 8 Aug 2026 | Genesis still open through **1 Jan 2027** ([haUSD/stETH](/tech-docs/markets/hausd/steth)); Earn surfacing may still lag — [Markets](/markets) |
| **haGOLD / haSILVER / haMCAP** | **Pending** | Prior voyages ended **23 Feb 2026** | 8 Aug 2026 | Relaunch pending (prior Genesis windows in tech market pages) |
| Compounder (**hc…**) / **hy** vaults | **In development** | — | 8 Aug 2026 | Not live mainnet UX — [Harbor Yield](/harbor-yield) |
| External lending / Pendle / aggregators | **Next / Later** | — | 18 Sep 2026 | Integration workstreams below |
| Cross-chain Harbor + omnichain TIDE | **Later** | — | 8 Aug 2026 | As readiness allows |
| Permissionless market factory | **Later** | — | 7 May 2025 | Long-term infrastructure |

App UI is source of truth for live / soon / archived. Detail: [Live Markets](/markets).

---

## Shipped (today)

What users and integrators can already rely on:

- **Ethereum mainnet** core stack: minter, stability pools, rebalance, oracles, zaps (where published)
- **Headline Earn surface**: first markets kicked off **4 Jan 2026** (Genesis End for fxUSD→ETH/BTC and stETH→BTC); EUR markets **2 Feb 2026**. See [Live Markets](/markets)
- **Maiden Voyage** from Genesis **Start** (**19 Dec 2025** ETH/BTC, **19 Jan 2026** EUR); **Ledger Marks** from core market kickoff (**4 Jan 2026** ETH/BTC, **2 Feb 2026** EUR); **TIDE** token / Tide dashboard from **July 2026**
- **App**: [app.harborfinance.io](https://app.harborfinance.io) (Earn, Leverage, Maiden Voyage, Tide)
- Sherlock audit on bao-base / bao-minter (partial vs today’s surface — [Risk Considerations](/risk-considerations))
- **Integrator Phase 1** (*docs 15 Aug 2026*): market architecture, token taxonomy, addresses + ABIs, mint/redeem, `price()` / dry-runs, Chainlink-style pricing notes, stability pools, fees/market state, oracle adapters, Harbor Swap docs — [Build on Harbor](/tech-docs/integrators)
- Thin **`@harbor/sdk`** for common encode/quote helpers ([SDK](/tech-docs/integrators/sdk); GitHub install today)

Friendly fork of f(x) / Aladdin-style mechanics with **fxSAVE** and **wstETH** collateral.

---

## Near-term focus

*Added to docs: 18 Sep 2026* (expansion plan). Priorities for the next phase (parallel tracks):

### Product

- Finish and launch **hy** / Compounder stack (Harbor Yield)
- Keep improving docs + SDK (npm publish, more recipes)
- Package pricing / oracle infrastructure for external integrators

### Market growth

- Continue **wstETH → haUSD** bootstrap outreach (~$50k target, can be split across sources)
- Build **collateral-partner deck** and pipeline
- Start protocol / ecosystem outreach (especially where partners already spend on liquidity incentives)

### Integrations

- Conversations with **Morpho / Euler** (and similar) for Anchor utility
- Investigate **Pendle** on hy / yield
- Prefer proof-of-concepts on **existing live markets** (and hy once live) before waiting on haUSD alone

### Launch

- Secure bootstrap capital for **wstETH → haUSD + hs** (docs ticker: **hsSTETH-USD**)
- Launch the market in product, then treat TVL, mint/redeem, SP yield, volume, fees, and users as the **case study** for market #2

---

## Parallel workstreams

### Launch Harbor Yield tokens

*Added to docs: 8 Aug 2026*

Finish and ship the yield products in development ([`baofinance/harbor-yield`](https://github.com/baofinance/harbor-yield)).

**Intent:** make Harbor yield easy to hold and integrate.

| Token | Role |
| ----- | ---- |
| **ha** | Pegged assets |
| **hs** | Leveraged assets |
| **hy** | Yield-bearing assets (auto-managed SP exposure) |

**Docs status today:** Level **1** (raw stability pools) is **live**. **Compounder** (ERC-4626 per pool, **hc…**) and **hy** (ERC-7575 peg basket / doors) are **implemented in repo / pre-prod**, not live app UX yet. See [Harbor Yield](/harbor-yield) and [tech contracts](/tech-docs/contracts/harbor-yield).

hy (and Compounders) should be easier for external protocols to integrate than raw SP positions.

### Improve developer docs + integration tools

*Added to docs: 15 Aug 2026* (deepened ongoing)

Make Harbor integrable without heavy hand-holding.

**Already documented (keep deepening):** market architecture; ha / hs (/ hy when live); addresses + ABIs; minting and redemption; token `price()` / dry-runs; Chainlink pricing examples; stability pools; hy / ERC-4626–7575 notes; rebalances and risk; fees and market state; oracle adapters.

**Still open:** npm-published SDK; richer market-data helpers; optional lightweight API for quotes / routes (today: **no** public REST/WebSocket). Where useful, standard adapters that combine Harbor `price()` with Chainlink feeds — [Oracle adapters](/tech-docs/integrators/oracle-adapters).

### Secure bootstrap capital for wstETH / USD

*Added to docs: 18 Sep 2026*

Target ~**$50k** to launch:

**wstETH → haUSD + hsSTETH-USD**

Run in parallel:

- Individual investors (existing deck)
- Protocols / ecosystems that benefit from more wstETH demand

Capital can be split across sources.

### Build the collateral partner deck + pipeline

*Added to docs: 18 Sep 2026*

Separate deck for protocols that already spend on liquidity incentives:

> Instead of renting liquidity with emissions, deploy some of the token into Harbor to create a market and use case. Capital stays deployed; Harbor creates Anchor / Sail assets and potential future demand for the collateral.

Prioritise partners by incentive spend, market size, productive yield, oracle availability, existing liquidity, strategic fit, and likelihood of providing **$25k–$100k** bootstrap capital.

### Launch wstETH / USD

*haUSD market row in docs: 8 Aug 2026 · expansion launch plan: 18 Sep 2026*

Once bootstrap is secured, launch the first **USD** headline market:

| Output | Role |
| ------ | ---- |
| **haUSD** | USD Anchor |
| **hsSTETH-USD** | Leveraged ETH/USD-style Sail exposure |
| **hyUSD** (when Yield ships) | Auto-compounding USD yield via SPs |

Contracts for stETH/USD already exist on mainnet; product status remains **Soon** until Earn/Leverage surface and bootstrap are ready — [haUSD / stETH](/tech-docs/markets/hausd/steth).

Collect launch metrics (TVL, mint/redeem, SP deposits/yield, volume, fees, users, collateral growth) as the primary case study for the next collateral partner.

### External Anchor lending

*Added to docs: 18 Sep 2026*

Give **ha** a use outside Harbor (lendable / borrowable).

Early experiments: Morpho / Euler with established collateral, e.g. **wstETH collateral → borrow haUSD** (or existing Anchors before haUSD is product-live).

Harbor need not supply lending liquidity — **ha** holders can. That sits alongside SP / hy yield and creates external demand for Anchors.

### Pendle × Harbor Yield

*Added to docs: 18 Sep 2026*

Investigate **hy** (e.g. hyUSD) → PT / YT markets: fixed/implied yield, yield speculation, and LP around Harbor yield. PoCs can use an existing hy once live, before waiting on haUSD.

### Harbor Yield tokens as collateral

*Added to docs: 18 Sep 2026*

Explore **hy** as collateral on permissionless lending (e.g. hyETH / hyBTC → borrow USDC) so users keep Harbor yield while borrowing. ERC-4626 / 7575 surfaces should help external protocols reason about the asset.

### Expand the haUSD collateral network

*Added to docs: 18 Sep 2026*

After wstETH / haUSD works, add more collateral markets that mint into the **same haUSD** Anchor (order driven by partner capital and readiness), e.g. rETH, weETH, sUSDe, BTC assets, partner tokens → haUSD.

Goal: deepen one USD ecosystem rather than isolated Anchors.

### Sail tokens as external collateral

*Added to docs: 18 Sep 2026*

Once oracles and integrations are proven, explore **hs** as collateral (e.g. hsSTETH-USD → borrow haUSD). LTVs must reflect leverage. Utility beyond holding Sail can keep Sail outstanding and support minting demand.

### Cross-market routing + arbitrage

*Added to docs: 18 Sep 2026* (Harbor Swap docs: 8 Aug 2026)

Shared Anchors create routes such as **wstETH → mint haUSD → redeem into another USD-market collateral**. Unlikely to beat concentrated DEX liquidity for normal swaps; useful for arb / thin pairs. Expose effective quotes/fees so bots and aggregators (e.g. Velora) can find Harbor routes without Harbor-paid incentives. Related: [Harbor Swap](/tech-docs/contracts/harbor-swap).

### Broader DeFi integrations (later)

*Added to docs: 18 Sep 2026*

Once TVL, volume, yield history, and early integrations exist: curated lending vaults, more lending protocols, strategy vaults, aggregators/solvers, wallets, analytics, cross-chain deployments, larger institutional / DeFi partnerships.

---

## Later infrastructure

- Additional **EVM** deployments as product/oracle readiness allows (MegaETH already has a separate stETH/USD deployment family — [Generic](/tech-docs/markets/generic)) — *MegaETH docs: Apr 2026 inventory; roadmap callout 18 Sep 2026*
- **TIDE** omnichain via Chainlink **CCIP** (not LayerZero) — *Added to docs: 8 Aug 2026*
- **Permissionless market factory**: collateral + oracle + SP config for external protocols — *Added to docs: 7 May 2025*

## Governance (ongoing)

Team-directed incentives with community discussion today; evolving committee / governance model. [Governance & TIDE](/tide-token/governance).

> Vision: anyone can create or access synthetic exposure to any well-priced market.

---

## Target flywheel

*Added to docs: 18 Sep 2026*

```text
New collateral partner
  → funds market bootstrap
  → new Harbor market
  → creates ha + hs
  → hy adds yield product
  → lending / Pendle / external utility
  → more demand for ha / hs / hy
  → more minting
  → more collateral enters Harbor
  → market grows
  → stronger case for the next partner
  → repeat
```

## Get involved

- [App](https://app.harborfinance.io)
- [Discord](https://discord.com/invite/BW3P62vJXT)
- [Documentation](/)
- [GitHub](https://github.com/baofinance/)
- [Build on Harbor](/tech-docs/integrators)
