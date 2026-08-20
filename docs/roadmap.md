---
sidebar_position: 8
---

# Roadmap

Harbor: modular synthetic assets on Ethereum, expanding toward tokenized market data infrastructure. Adapt as the landscape changes.

![Harbor grows from live markets into modular infrastructure.](/img/08-roadmap-timeline.png)

## 1. Live on Ethereum (completed)

- Core contracts on mainnet (minter, stability pools, rebalance)
- **Earn** markets: **haETH**, **haBTC**, **haEUR** — [Live Markets](/markets)
- [app.harborfinance.io](https://app.harborfinance.io)
- Sherlock audit (bao-base / bao-minter — partial vs today’s surface; [Risk Considerations](/risk-considerations))
- **Ledger Marks**, **TIDE** claim flows

Friendly fork of f(x) / Aladdin-style mechanics with **fxSAVE** and **wstETH** collateral.

## 2. Market expansion (in progress)

Deploy when oracles, collateral, and demand align.

### Live product surface

**ETH / BTC / EUR** pegs (+ related **hs** tokens):

- **fxSAVE** collateral: haETH, haBTC, haEUR
- **wstETH** collateral: haBTC, haEUR

### Soon / relaunch

- **haUSD** stacks — soon on Earn
- **haGOLD**, **haSILVER**, **haMCAP** — relaunch pending

### Maiden Voyage 2.0

Ongoing voyages with **Yield Share**. [Maiden Voyage](/maiden-voyage).

**Infrastructure:** [price aggregators](https://github.com/baofinance/harbor-price-aggregators), [zaps](https://github.com/baofinance/harbor-zap-contracts) — [Supporting Features](/supporting-features).

## 3. Harbor Yield (mid-term)

Three levels (product 1–3):

1. **Stability pool** — **live** ([**Earn**](https://app.harborfinance.io/anchor))
2. **Compounder** — auto-compound one pool (not live mainnet)
3. **hyTOKEN** — peg basket (not live mainnet)

Compounders and **hy** are **siblings**. [Harbor Yield](/harbor-yield) · [Tech docs](/tech-docs/contracts/harbor-yield).

## 4. Cross-chain & omnichain TIDE (mid-term)

- Additional EVM deployments as product/oracle readiness allows
- **TIDE** omnichain via Chainlink **CCIP** (not LayerZero)

## 5. Permissionless market factory (long-term)

Launch markets with collateral, oracle, and stability pool config — infrastructure for external protocols.

## Governance (ongoing)

Team-directed incentives with community discussion today; evolving committee / governance model. [Governance & TIDE](/tide-token/governance).

> Vision: anyone can create or access synthetic exposure to any well-priced market.

## Get involved

- [App](https://app.harborfinance.io)
- [Discord](https://discord.com/invite/BW3P62vJXT)
- [Documentation](/)
- [GitHub](https://github.com/baofinance/)
