# Arbitrum Price Oracles

**Chain ID**: 42161  
**Total Oracles**: 20

## Overview

Arbitrum hosts stock index oracles for USDE and stETH pairs. These oracles use multi-feed aggregation to calculate index prices from individual stock feeds.

Each deployed aggregator has a detail page with the same layout (summary, feeds, consumers). To add a new one, copy any existing pair page under this chain folder and fill the same sections.

## Deployed Oracles

### USDE Pairs (Stock Indices)

| Oracle Pair | Address | Status | Version | Rate Provider | Price Calculation |
|-------------|---------|--------|---------|---------------|-------------------|
| [USDE/AAPL](./arbitrum/usde-aapl.md) | `0x91F5C981C3676af8eE40003c79E96582Fdb12621` | Active | v3 | USDE | AAPL/USD (inverted) |
| [USDE/AMZN](./arbitrum/usde-amzn.md) | `0xf5dAfBF1A1abe5eaDC16799e69b7B53C58D193b5` | Active | v3 | USDE | AMZN/USD (inverted) |
| [USDE/GOOGL](./arbitrum/usde-googl.md) | `0xc351A54B3ED4a930d8B30958A112a1e6Dcd3eFc0` | Active | v3 | USDE | GOOGL/USD (inverted) |
| [USDE/MAG7](./arbitrum/usde-mag7.md) | `0xFf37Db6dea33228A5D84546250a5D0D0da942fd7` | Active | v3 | USDE | Multi-feed (normalized) |
| [USDE/MAG7.i26](./arbitrum/usde-mag7-i26.md) | `0xF36648F44763eFE7c528140a2f804b2124CC3FE1` | Active | v3 | USDE | Multi-feed (normalized) |
| [USDE/META](./arbitrum/usde-meta.md) | `0x9DadfFe3Fd7c14BF1c023fd736510464ea3E8234` | Active | v3 | USDE | META/USD (inverted) |
| [USDE/MSFT](./arbitrum/usde-msft.md) | `0x2b63607299E7645D883168906bEfb13cb7F59659` | Active | v3 | USDE | MSFT/USD (inverted) |
| [USDE/NVDA](./arbitrum/usde-nvda.md) | `0xb772b800982127A3e1489DAacBE214b3C8575dd6` | Active | v3 | USDE | NVDA/USD (inverted) |
| [USDE/SPY](./arbitrum/usde-spy.md) | `0x657bE7a2b91F95222D163Bee3B5F4C27bed598C5` | Active | v3 | USDE | SPY/USD (inverted) |
| [USDE/TSLA](./arbitrum/usde-tsla.md) | `0x777BD12e1f61B8cac19Cbd30c0233C46B4683C00` | Active | v3 | USDE | TSLA/USD (inverted) |

**Configuration Notes:**
- USDE pairs use USDE token as rate provider
- Individual stock pairs use single Chainlink feed (inverted)
- MAG7 and MAG7.i26 use multi-feed normalized aggregation

### stETH Pairs (Stock Indices)

| Oracle Pair | Address | Status | Version | Rate Provider | Price Calculation |
|-------------|---------|--------|---------|---------------|-------------------|
| [stETH/AAPL](./arbitrum/steth-aapl.md) | `0xA8643E35Ef119F983B09C322039e8AA49A3e3372` | Active | v3 | wstETH | ETH/USD ÷ AAPL/USD |
| [stETH/AMZN](./arbitrum/steth-amzn.md) | `0x28bBAaf05dEE8A06d4206089bCd17c1129e6Edca` | Active | v3 | wstETH | ETH/USD ÷ AMZN/USD |
| [stETH/GOOGL](./arbitrum/steth-googl.md) | `0x52B66aD600DC6051cF056951153355d457068bD2` | Active | v3 | wstETH | ETH/USD ÷ GOOGL/USD |
| [stETH/MAG7](./arbitrum/steth-mag7.md) | `0xA8A130Bbf041962B60e81009F09C41bd930D1294` | Active | v3 | wstETH | Multi-feed (normalized) |
| [stETH/MAG7.i26](./arbitrum/steth-mag7-i26.md) | `0x436C33222136554192733C6771669c4B51B7fE3D` | Active | v3 | wstETH | Multi-feed (normalized) |
| [stETH/META](./arbitrum/steth-meta.md) | `0x677f597D3013dBF76552Ec6c605eeB551d3bBb72` | Active | v3 | wstETH | ETH/USD ÷ META/USD |
| [stETH/MSFT](./arbitrum/steth-msft.md) | `0xf1867657Ef7F65b745E47B7F70D15DE50b66884D` | Active | v3 | wstETH | ETH/USD ÷ MSFT/USD |
| [stETH/NVDA](./arbitrum/steth-nvda.md) | `0x0D0fDBb10B9EAf18A1034e9942F95af0147CC310` | Active | v3 | wstETH | ETH/USD ÷ NVDA/USD |
| [stETH/SPY](./arbitrum/steth-spy.md) | `0x969Fb67331d6Fa3E729292FAa5752BBA759f2b7F` | Active | v3 | wstETH | ETH/USD ÷ SPY/USD |
| [stETH/TSLA](./arbitrum/steth-tsla.md) | `0xDA6097f2b8805a01FcBE8BA8Fc2c45FCb7D3e206` | Active | v3 | wstETH | ETH/USD ÷ TSLA/USD |

**Configuration Notes:**
- stETH pairs use wstETH as rate provider
- Individual stock pairs: `(ETH/USD) / (Stock/USD)` calculation
- MAG7 indices use normalized multi-feed aggregation

## Multi-Feed Indices

### MAG7 (Magnificent 7)

The MAG7 index aggregates prices from 7 major tech stocks:
- AAPL (Apple)
- AMZN (Amazon)
- GOOGL (Google)
- META (Meta)
- MSFT (Microsoft)
- NVDA (NVIDIA)
- TSLA (Tesla)

**Calculation Method**: Normalized weighted average using `MultiFeedNormalizedPriceLib`

### MAG7.i26

Similar to MAG7 but with different normalization factors (i26 variant).

## Version Information

- All Arbitrum oracles use **v3** contracts
- Contracts use proxy pattern for upgradeability

## Notes

- Stock price feeds are provided by Chainlink
- Multi-feed indices use normalization factors for weighted averages
- All prices normalized to 18 decimals
