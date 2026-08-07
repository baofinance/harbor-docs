# MegaETH Price Oracles

**Chain ID**: 4326  
**Active oracles**: 3 (BTC/USD, wstETH/USD, Harbor stETH/USD)  
**Deprecated (legacy)**: 4 USDMY/\* feeds — the **USDMY protocol ceased deployment and operations on MegaETH**. Contract addresses below are kept for reference only.

## Overview

MegaETH lists **direct** BTC/USD and wstETH/USD feeds, a **Harbor** stETH/USD wrapped aggregator for markets, and **legacy** USDMY pair contracts. USDMY is **deprecated** on this chain; do not use USDMY feeds for new integrations.

Each deployed aggregator has a detail page with the same layout (summary, feeds, consumers). To add a new one, copy any existing pair page under this chain folder and fill the same sections.

## Deployed Oracles

### Direct Price Feeds

| Oracle Pair | Address | Status | Version | Type |
|-------------|---------|--------|---------|------|
| [BTC/USD](./megaeth/btc-usd.md) | `0xD3902Ac4c84FE62f831f38385e67E3d1BA27c75F` | Active | v4 | Direct |
| [wstETH/USD](./megaeth/wsteth-usd.md) | `0xF183D68f7D4e47f0546bF67f56677d35CE87617D` | Active | v4 | Direct |

**Configuration Notes:**
- Direct Chainlink price feeds
- No rate provider needed (direct USD pricing)
- Version 4 contracts (no proxy pattern)

### Harbor market aggregators (wrapped price)

| Oracle pair | Address | Status | Version | Notes |
|-------------|---------|--------|---------|-------|
| [stETH/USD](./megaeth/steth-usd.md) | `0xEDd3dC3E699360846c87CB69052EcbC900201854` | Active | v4 | Used by [stETH/USD Market (MegaETH)](../../markets/hausd-megaeth/steth.md); salt `harbor_megaeth_v1::stETH::USD::wrappedPriceAggregator` |

### USDMY pairs (deprecated)

The **USDMY protocol is no longer deployed or operated on MegaETH**. The following contracts were part of that stack and are documented only for historical reference.

| Oracle Pair | Address | Status | Version | Rate Provider | Price Feed |
|-------------|---------|--------|---------|---------------|------------|
| [USDMY/BTC](./megaeth/usdmy-btc.md) | `0xf9cB23E2E882C67A899C448CBe2542df9eebC615` | Deprecated | v4 | USDMY | BTC/USD (inverted) |
| [USDMY/ETH](./megaeth/usdmy-eth.md) | `0x756B95D0bB61c195d1196EB2143D8D88570036AC` | Deprecated | v4 | USDMY | ETH/USD (inverted) |
| [USDMY/HYPE](./megaeth/usdmy-hype.md) | `0x830AB2B3A936F727ee2FF67E9C073380B6f166D8` | Deprecated | v4 | USDMY | HYPE/USD (inverted) |
| [USDMY/SOL](./megaeth/usdmy-sol.md) | `0xE2962ab29C723415F023451E9F166122d8b4a980` | Deprecated | v4 | USDMY | SOL/USD (inverted) |

**Note:** When USDMY was active, pairs used the USDMY token as rate provider and inverted price feeds to quote USDMY against each asset. These deployments are **immutable** v4 contracts; they remain on-chain but **must not** be treated as supported protocol infrastructure.

## Market integration

- **stETH/USD Market (MegaETH)**: Uses Harbor `stETH/USD` aggregator (`0xEDd3dC3E699360846c87CB69052EcbC900201854`)

## Version Information

- All listed contracts use **v4** bytecode; **active** Harbor and direct-feed paths remain the integration surface for MegaETH today
- **USDMY** oracle rows are **deprecated** alongside cessation of USDMY deployment and operations on MegaETH
- Direct-feed and deprecated USDMY oracles are **immutable** (no proxy)
- Harbor **wrapped** aggregators used by markets may use **UUPS proxies** (see deployment manifests)

## Notes

- Smaller oracle deployment compared to other chains
- **USDMY** coverage (BTC, ETH, HYPE, SOL) is **deprecated** on MegaETH; rely on **active** direct feeds and Harbor market oracles
- All contracts are v4 (Harbor market aggregators such as stETH/USD may use upgradeable proxies per deployment manifests; direct-feed oracles are immutable)
