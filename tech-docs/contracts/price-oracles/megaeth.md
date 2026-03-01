# MegaETH Price Oracles

**Chain ID**: 4326  
**Total Oracles**: 6

## Overview

MegaETH hosts a small set of oracles including BTC/USD, USDMY pairs, and wstETH/USD. These use v4 oracle contracts.

## Deployed Oracles

### Direct Price Feeds

| Oracle Pair | Address | Status | Version | Type |
|-------------|---------|--------|---------|------|
| BTC/USD | `0xD3902Ac4c84FE62f831f38385e67E3d1BA27c75F` | Active | v4 | Direct |
| wstETH/USD | `0xF183D68f7D4e47f0546bF67f56677d35CE87617D` | Active | v4 | Direct |

**Configuration Notes:**
- Direct Chainlink price feeds
- No rate provider needed (direct USD pricing)
- Version 4 contracts (no proxy pattern)

### USDMY Pairs

| Oracle Pair | Address | Status | Version | Rate Provider | Price Feed |
|-------------|---------|--------|---------|---------------|------------|
| USDMY/BTC | `0xf9cB23E2E882C67A899C448CBe2542df9eebC615` | Active | v4 | USDMY | BTC/USD (inverted) |
| USDMY/ETH | `0x756B95D0bB61c195d1196EB2143D8D88570036AC` | Active | v4 | USDMY | ETH/USD (inverted) |
| USDMY/HYPE | `0x830AB2B3A936F727ee2FF67E9C073380B6f166D8` | Active | v4 | USDMY | HYPE/USD (inverted) |
| USDMY/SOL | `0xE2962ab29C723415F023451E9F166122d8b4a980` | Active | v4 | USDMY | SOL/USD (inverted) |

**Configuration Notes:**
- USDMY pairs use USDMY token as rate provider
- Price feeds are inverted to get USDMY/quote asset
- Version 4 contracts (no proxy pattern)

## Version Information

- All MegaETH oracles use **v4** contracts
- Direct implementation (no proxy pattern)

## Notes

- Smaller oracle deployment compared to other chains
- Focus on BTC, ETH, SOL, and HYPE pairs
- All contracts are v4 (no upgradeability via proxy)
