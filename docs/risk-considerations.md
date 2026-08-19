---
sidebar_position: 4
---

# Risk Considerations

Harbor is designed for resilience, not zero risk. Read this **before** sizing positions — especially in [**Earn**](https://app.harborfinance.io/anchor) pools and [**Leverage**](https://app.harborfinance.io/sail). Deeper system detail follows below. Terms: [Glossary](/glossary).

## Plain-English summary

### 1. Stability pool deposits can change asset

When you deposit **ha** in **Earn**, you earn yield. If the market rebalances and uses your deposit:

- **Collateral pool** → your ha may become **collateral** (fxSAVE, wstETH, …) at oracle value
- **Sail pool** → your ha may become **hs**

You are compensated at oracle prices, but **you may not keep ha**. That is the core tradeoff for concentrated yield.

### 2. hs can lose most or all value

**Leverage** tokens (**hs**) absorb stress first. In severe or prolonged downturns, **hs can approach zero**. ha may trade below peg. The app does **not** offer margin-call liquidation like a perp — but **losses can still be total** on the hs side.

Marketing “no liquidations” means **no classic margin liquidation UI** — not “cannot lose money.”

### 3. Oracles, upgrades, and pauses

Markets depend on **price feeds**. Failures, delays, or manipulation can affect mints, redemptions, and rebalances. Contracts are **upgradeable** (UUPS) with ownership controls — including **pause-via-upgrade** patterns. Governance and ops can change parameters.

### 4. Audits are real but not all-encompassing

Harbor has a Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) covering **bao-base** and **bao-minter** (now Harbor core). Coverage of **currently deployed mainnet contracts is partial** — post-audit upgrades shipped afterward; **zap contracts** were **out of scope**. No insurance product is documented here.

### 5. Pool withdrawal windows

Stability pools may require a **withdrawal request** and fee-free **window**. Exiting outside the window can incur **early-withdrawal fees**. Check the app before depositing.

### 6. Early-withdrawal and zap paths

Zaps and swap routes add **route risk, slippage, and third-party dependency**. Prefer **fxSAVE / wstETH** directly when you can. See [Supporting Features](/supporting-features).

---

## System risks

### Black swan scenarios

Harbor cannot guarantee outcomes under **severe sustained stress**.

#### Stability pool drain

If collateral falls quickly or the peg spikes vs collateral, the **entire stability pool can drain** during rebalancing — possibly faster than new deposits refill it. If pools are exhausted, the protocol may **temporarily fall below 100% collateralization**.

### Undercollateralization

Below 100% collateralization:

- **ha** may no longer be fully backed at peg; can float with market expectations
- **hs** can drop toward **$0** as the risk buffer is exhausted

The system may enter **graceful degradation** rather than hard shutdown.

### Recovery

If global collateral ratio drops below 100%:

- **ha** backed by proportional remaining collateral
- Recovery via market dynamics, incentives (TIDE to pools), and governance

## Smart contract risks

### Oracle reliability

Risks include manipulation, stale feeds, transmission failures, and flash crashes.

### Contract vulnerabilities

Audits reduce but do not eliminate unknown bugs or complex cross-protocol interactions.

## Market risks

- Collateral volatility and liquidity crises
- Regulatory or contagion effects
- Changes in underlying yield sources (fxSAVE, wstETH, …)

## Defense layers

- Conservative rebalance thresholds (e.g. ~130% CR trigger)
- Incentive design for pool participation and MEV execution
- Operational monitoring for oracle and contract anomalies

## What you can do

1. **Diversify** — pools, markets, ha/hs balance
2. **Size** — only what you can lose in stress
3. **Monitor** — app dashboards and community channels
4. **Understand recovery** — soft-peg and governance roles in extremes

## Conclusion

Harbor discloses risks transparently and uses stability pools plus rebalancing instead of auction liquidations. **Earn** and **Leverage** still carry meaningful downside — make choices that match your tolerance.
