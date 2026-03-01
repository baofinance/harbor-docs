# Mainnet Price Oracles

**Chain ID**: 1  
**Total Oracles**: 36

## Overview

Mainnet hosts the largest number of Harbor price oracles, including v3, v4, and leverage v4 oracle contracts. Most v3 contracts use a proxy pattern for upgradeability.

## Deployed Oracles

### fxUSD Pairs

| Oracle Pair | Address | Status | Version | Rate Provider | Price Feed |
|-------------|---------|--------|---------|---------------|------------|
| fxUSD/BTC | `0xF7657CD7890904d108384E289997c993e2e2bBc0` | Active | v3 | fxSAVE | BTC/USD (inverted) |
| fxUSD/ETH | `0xea5292c58288DcE24C52C1dB13ca048275665EbC` | Active | v3 | fxSAVE | ETH/USD (inverted) |
| fxUSD/EUR | `0x305454F8B46Aa3485D8B350D8E832459974F5e9F` | Active | v3 | fxSAVE | EUR/USD (inverted) |
| fxUSD/GOLD | `0x1f7F62889E599E51b9e21B27d589Fa521516D147` | Active | v3 | fxSAVE | XAU/USD (inverted) |
| fxUSD/MCAP | `0x88430c0F09A6D603c43E2816F2EA9Ab45dB7e1a8` | Active | v3 | fxSAVE | Multiple feeds (sum) |
| fxUSD/SILVER | `0x14816ff286f2eA46AB48c3275401Fd4b1ef817B5` | Active | v3 | fxSAVE | XAG/USD (inverted) |
| fxUSD/XAG | `0xB4E46a2E299F28FFa86BaeE19201B1BB9cd4c153` | Active | v3 | fxSAVE | XAG/USD (inverted) |
| fxUSD/XAU | `0xd71538769Af1c8f4D663BD0a5eA667D67E1623e2` | Active | v3 | fxSAVE | XAU/USD (inverted) |

**Configuration Notes:**
- All fxUSD pairs use fxSAVE as the rate provider
- Price feeds are typically inverted to get USD/quote asset
- MCAP uses multiple feeds summed together

### stETH Pairs

| Oracle Pair | Address | Status | Version | Rate Provider | Price Feeds |
|-------------|---------|--------|---------|---------------|-------------|
| stETH/BTC | `0x42018953e5174dC07058BeEE0618aa569fbFBE90` | Active | v3 | wstETH | ETH/USD ÷ BTC/USD |
| stETH/EUR | `0x5e27965689B4B8B425d98fbc676fE22d74caf7C7` | Active | v3 | wstETH | ETH/USD ÷ EUR/USD |
| stETH/GOLD | `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` | Active | v3 | wstETH | ETH/USD ÷ XAU/USD |
| stETH/MCAP | `0x4fe6fa14db0D3C8a4709A4F3e37C1c862381859F` | Active | v3 | wstETH | Multiple feeds (normalized) |
| stETH/SILVER | `0x7223E17bD4527AcbE44644300eA0F09A4AeBC995` | Active | v3 | wstETH | ETH/USD ÷ XAG/USD |
| stETH/XAG | `0x7FE8D4590A5aa0C8bdcA581BBc30d68aB59Dad78` | Active | v3 | wstETH | ETH/USD ÷ XAG/USD |
| stETH/XAU | `0x2962ECcF1B9cc46FE1aFf7bfc0f7179Fc87939ee` | Active | v3 | wstETH | ETH/USD ÷ XAU/USD |

**Configuration Notes:**
- All stETH pairs use wstETH as the rate provider
- Price calculation: `(ETH/USD) / (Quote/USD)` to get ETH/Quote
- MCAP uses normalized multi-feed calculation

### Leveraged Token Oracles (hsTokens)

| Oracle Pair | Address | Status | Version | Type |
|-------------|---------|--------|---------|------|
| hsfxUSD-BTC/USD | `0xF36648F44763eFE7c528140a2f804b2124CC3FE1` | Active | v4 (leverage) | Leverage |
| hsfxUSD-ETH/USD | `0xA8643E35Ef119F983B09C322039e8AA49A3e3372` | Active | v4 (leverage) | Leverage |
| hsfxUSD-EUR/USD | `0x657bE7a2b91F95222D163Bee3B5F4C27bed598C5` | Active | v4 (leverage) | Leverage |
| hsfxUSD-GOLD/USD | `0x652E9B0ad84fD2A0c3806129bDbDEF4585bb29e8` | Active | v4 (leverage) | Leverage |
| hsfxUSD-SILVER/USD | `0x70387587a0d3A01a2C75904Dd8CA355a921cd1F3` | Active | v4 (leverage) | Leverage |
| hsstETH-BTC/USD | `0xFf37Db6dea33228A5D84546250a5D0D0da942fd7` | Active | v4 (leverage) | Leverage |
| hsstETH-EUR/USD | `0x777BD12e1f61B8cac19Cbd30c0233C46B4683C00` | Active | v4 (leverage) | Leverage |
| hsstETH-GOLD/USD | `0x34dfDF00262E1A3b61c7a0616F0645A928Dd8187` | Active | v4 (leverage) | Leverage |
| hsstETH-SILVER/USD | `0x50E198a8Fa7e4c95B355E34cba026133F68D1637` | Active | v4 (leverage) | Leverage |

**Configuration Notes:**
- These oracles track leveraged token prices (hsTokens)
- Used for NAV calculations and pricing leveraged positions
- Version 4 leverage oracles

### sUSDe Pairs

| Oracle Pair | Address | Status | Version | Rate Provider | Price Feed |
|-------------|---------|--------|---------|---------------|------------|
| sUSDe/BTC | `0x0D0fDBb10B9EAf18A1034e9942F95af0147CC310` | Active | v4 | sUSDe | BTC/USD (inverted) |
| sUSDe/ETH | `0x969Fb67331d6Fa3E729292FAa5752BBA759f2b7F` | Active | v4 | sUSDe | ETH/USD (inverted) |
| sUSDe/EUR | `0xDA6097f2b8805a01FcBE8BA8Fc2c45FCb7D3e206` | Active | v4 | sUSDe | EUR/USD (inverted) |
| sUSDe/GOLD | `0x5C38C744CfF6ec051d955566384BF921CFAaAc26` | Active | v4 | sUSDe | XAU/USD (inverted) |
| sUSDe/MCAP | `0xf2ac2880E1569D2CaB50be41F6bfA92e5e6e03C9` | Active | v4 | sUSDe | Multiple feeds (sum) |
| sUSDe/SILVER | `0x7A4AC7b91bCbd069Fa0B45bdb5e393915A663cfD` | Active | v4 | sUSDe | XAG/USD (inverted) |
| sUSDe/XAG | `0x436C33222136554192733C6771669c4B51B7fE3D` | Deprecated | v4 | sUSDe | XAG/USD (inverted) |
| sUSDe/XAU | `0xA8A130Bbf041962B60e81009F09C41bd930D1294` | Deprecated | v4 | sUSDe | XAU/USD (inverted) |

**Configuration Notes:**
- sUSDe pairs use sUSDe token as rate provider
- XAG/XAU pairs are deprecated (replaced with SILVER/GOLD)
- Version 4 contracts (no proxy pattern)

### Other Oracles

| Oracle Pair | Address | Status | Version | Type |
|-------------|---------|--------|---------|------|
| PAXG/USD | `0xf1867657Ef7F65b745E47B7F70D15DE50b66884D` | Active | v4 | Direct |
| tBTC/USD | `0xd8DF89f1C15a26F8A6C119161812F199cdFe23Ee` | Active | v4 | Direct |
| wBTC/USD | `0x87292E650040B2D284983c0E0814344506948080` | Active | v4 | Direct |
| wstETH/USD | `0x28bBAaf05dEE8A06d4206089bCd17c1129e6Edca` | Active | v4 | Direct |

## Market Integration

These oracles are used by Harbor Protocol markets:

- **ETH/fxUSD Market**: Uses `fxUSD/ETH` oracle (`0xea5292c58288DcE24C52C1dB13ca048275665EbC`)
- **BTC/fxUSD Market**: Uses `fxUSD/BTC` oracle (`0xF7657CD7890904d108384E289997c993e2e2bBc0`)
- **BTC/stETH Market**: Uses `stETH/BTC` oracle (`0x42018953e5174dC07058BeEE0618aa569fbFBE90`)

## Version Information

- **v3 Contracts**: Use proxy pattern for upgradeability
- **v4 Contracts**: Direct implementation (no proxy)
- **v4 Leverage Contracts**: Specialized for leveraged token pricing

## Notes

- Deprecated oracles (XAU/XAG) have been replaced with GOLD/SILVER naming
- Most v3 contracts are upgradeable via proxy pattern
- Leverage oracles track NAV of leveraged tokens for pricing
