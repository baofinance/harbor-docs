# Mainnet Price Oracles

**Chain ID**: 1  
**Total Oracles**: 37

## Overview

Mainnet hosts the largest number of Harbor price oracles, including v3, v4, and leverage v4 oracle contracts. Most v3 contracts use a proxy pattern for upgradeability.

Oracles are grouped the same way as [markets](/tech-docs/markets/generic): by **haToken**, then one page per collateral (plus related hs / sUSDe / deprecated feeds under that haToken).

To add a new aggregator: add `mainnet/<hatoken>/<collateral>.md`, update that haToken `index.md`, and add a sidebar entry.

## By haToken

| haToken | Market collaterals | Index |
| ------- | ------------------ | ----- |
| haETH | fxUSD | [haETH oracles](./mainnet/haeth/) |
| haBTC | fxUSD, stETH | [haBTC oracles](./mainnet/habtc/) |
| haEUR | fxUSD, stETH | [haEUR oracles](./mainnet/haeur/) |
| haGOLD | fxUSD, stETH | [haGOLD oracles](./mainnet/hagold/) |
| haSILVER | fxUSD, stETH | [haSILVER oracles](./mainnet/hasilver/) |
| haMCAP | fxUSD, stETH | [haMCAP oracles](./mainnet/hamcap/) |
| haUSD | stETH, PAXG, wBTC, tBTC | [haUSD oracles](./mainnet/hausd/) |

### haETH

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [fxUSD](./mainnet/haeth/fxusd.md) | `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097` (market-wired; inventory also `0xea5292…`) | Active | v3 |
| [hs fxUSD](./mainnet/haeth/hs-fxusd.md) | `0xA8643E35Ef119F983B09C322039e8AA49A3e3372` | Active | v4 leverage |
| [sUSDe](./mainnet/haeth/susde.md) | `0x969Fb67331d6Fa3E729292FAa5752BBA759f2b7F` | Active | v4 |

### haBTC

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [fxUSD](./mainnet/habtc/fxusd.md) | `0xF7657CD7890904d108384E289997c993e2e2bBc0` | Active | v3 |
| [stETH](./mainnet/habtc/steth.md) | `0x42018953e5174dC07058BeEE0618aa569fbFBE90` | Active | v3 |
| [hs fxUSD](./mainnet/habtc/hs-fxusd.md) | `0xF36648F44763eFE7c528140a2f804b2124CC3FE1` | Active | v4 leverage |
| [hs stETH](./mainnet/habtc/hs-steth.md) | `0xFf37Db6dea33228A5D84546250a5D0D0da942fd7` | Active | v4 leverage |
| [sUSDe](./mainnet/habtc/susde.md) | `0x0D0fDBb10B9EAf18A1034e9942F95af0147CC310` | Active | v4 |

### haEUR

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [fxUSD](./mainnet/haeur/fxusd.md) | `0x305454F8B46Aa3485D8B350D8E832459974F5e9F` | Active | v3 |
| [stETH](./mainnet/haeur/steth.md) | `0x5e27965689B4B8B425d98fbc676fE22d74caf7C7` | Active | v3 |
| [hs fxUSD](./mainnet/haeur/hs-fxusd.md) | `0x657bE7a2b91F95222D163Bee3B5F4C27bed598C5` | Active | v4 leverage |
| [hs stETH](./mainnet/haeur/hs-steth.md) | `0x777BD12e1f61B8cac19Cbd30c0233C46B4683C00` | Active | v4 leverage |
| [sUSDe](./mainnet/haeur/susde.md) | `0xDA6097f2b8805a01FcBE8BA8Fc2c45FCb7D3e206` | Active | v4 |

### haGOLD

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [fxUSD](./mainnet/hagold/fxusd.md) | `0x1f7F62889E599E51b9e21B27d589Fa521516D147` | Active | v3 |
| [stETH](./mainnet/hagold/steth.md) | `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` | Active | v3 |
| [hs fxUSD](./mainnet/hagold/hs-fxusd.md) | `0x652E9B0ad84fD2A0c3806129bDbDEF4585bb29e8` | Active | v4 leverage |
| [hs stETH](./mainnet/hagold/hs-steth.md) | `0x34dfDF00262E1A3b61c7a0616F0645A928Dd8187` | Active | v4 leverage |
| [sUSDe](./mainnet/hagold/susde.md) | `0x5C38C744CfF6ec051d955566384BF921CFAaAc26` | Active | v4 |
| [fxUSD/XAU](./mainnet/hagold/fxusd-xau.md) | `0xd71538769Af1c8f4D663BD0a5eA667D67E1623e2` | Deprecated | v3 |
| [stETH/XAU](./mainnet/hagold/steth-xau.md) | `0x2962ECcF1B9cc46FE1aFf7bfc0f7179Fc87939ee` | Deprecated | v3 |
| [sUSDe/XAU](./mainnet/hagold/susde-xau.md) | `0xA8A130Bbf041962B60e81009F09C41bd930D1294` | Deprecated | v4 |

### haSILVER

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [fxUSD](./mainnet/hasilver/fxusd.md) | `0x14816ff286f2eA46AB48c3275401Fd4b1ef817B5` | Active | v3 |
| [stETH](./mainnet/hasilver/steth.md) | `0x7223E17bD4527AcbE44644300eA0F09A4AeBC995` | Active | v3 |
| [hs fxUSD](./mainnet/hasilver/hs-fxusd.md) | `0x70387587a0d3A01a2C75904Dd8CA355a921cd1F3` | Active | v4 leverage |
| [hs stETH](./mainnet/hasilver/hs-steth.md) | `0x50E198a8Fa7e4c95B355E34cba026133F68D1637` | Active | v4 leverage |
| [sUSDe](./mainnet/hasilver/susde.md) | `0x7A4AC7b91bCbd069Fa0B45bdb5e393915A663cfD` | Active | v4 |
| [fxUSD/XAG](./mainnet/hasilver/fxusd-xag.md) | `0xB4E46a2E299F28FFa86BaeE19201B1BB9cd4c153` | Deprecated | v3 |
| [stETH/XAG](./mainnet/hasilver/steth-xag.md) | `0x7FE8D4590A5aa0C8bdcA581BBc30d68aB59Dad78` | Deprecated | v3 |
| [sUSDe/XAG](./mainnet/hasilver/susde-xag.md) | `0x436C33222136554192733C6771669c4B51B7fE3D` | Deprecated | v4 |

### haMCAP

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [fxUSD](./mainnet/hamcap/fxusd.md) | `0x88430c0F09A6D603c43E2816F2EA9Ab45dB7e1a8` | Active | v3 |
| [stETH](./mainnet/hamcap/steth.md) | `0x4fe6fa14db0D3C8a4709A4F3e37C1c862381859F` | Active | v3 |
| [sUSDe](./mainnet/hamcap/susde.md) | `0xf2ac2880E1569D2CaB50be41F6bfA92e5e6e03C9` | Active | v4 |

### haUSD

App-wired addresses for the mainnet USD stack (`contracts.mainnetUsd.ts`). Earlier inventory addresses are listed as aliases on each detail page.

| Oracle | Address | Status | Version |
| ------ | ------- | ------ | ------- |
| [stETH](./mainnet/hausd/steth.md) | `0xcE8633B7198d02860873689Bb2566BD2efD11F52` | Active | v4 |
| [PAXG](./mainnet/hausd/paxg.md) | `0x647633122f9d9ba87210210d5A3ded365911BF9b` | Active | v4 |
| [wBTC](./mainnet/hausd/wbtc.md) | `0x189d6CA0271F06c222873b4C09A26C83AdCCF73d` | Active | v4 |
| [tBTC](./mainnet/hausd/tbtc.md) | `0x4D72FfE2499C4e66b2c6C11D7AfeA04001dB440C` | Active | v4 |
| [wstETH](./mainnet/hausd/wsteth.md) | `0x28bBAaf05dEE8A06d4206089bCd17c1129e6Edca` | Active | v4 inventory |

## Market Integration

Prefer the inventory address on each pair page. Where the live app still wires a legacy alias (notably early ETH/BTC markets), both addresses are listed on the pair detail page. Consumers:

| Oracle pair | Market doc(s) |
| ----------- | ------------- |
| fxUSD/ETH | [haETH / fxUSD](../../markets/haeth/fxusd.md) |
| fxUSD/BTC | [haBTC / fxUSD](../../markets/habtc/fxusd.md) |
| stETH/BTC | [haBTC / stETH](../../markets/habtc/steth.md) |
| fxUSD/EUR | [haEUR / fxUSD](../../markets/haeur/fxusd.md) |
| stETH/EUR | [haEUR / stETH](../../markets/haeur/steth.md) |
| fxUSD/GOLD | [haGOLD / fxUSD](../../markets/hagold/fxusd.md) |
| stETH/GOLD | [haGOLD / stETH](../../markets/hagold/steth.md) |
| fxUSD/SILVER | [haSILVER / fxUSD](../../markets/hasilver/fxusd.md) |
| stETH/SILVER | [haSILVER / stETH](../../markets/hasilver/steth.md) |
| fxUSD/MCAP | [haMCAP / fxUSD](../../markets/hamcap/fxusd.md) |
| stETH/MCAP | [haMCAP / stETH](../../markets/hamcap/steth.md) |
| stETH/USD | [haUSD / stETH](../../markets/hausd/steth.md) |
| PAXG/USD | [haUSD / PAXG](../../markets/hausd/paxg.md) |
| wBTC/USD | [haUSD / wBTC](../../markets/hausd/wbtc.md) |
| tBTC/USD | [haUSD / tBTC](../../markets/hausd/tbtc.md) |

## Version Information

- **v3 Contracts**: Use proxy pattern for upgradeability
- **v4 Contracts**: Direct implementation (no proxy)
- **v4 Leverage Contracts**: Specialized for leveraged token pricing

## Pending: Harbor Yield ETH-peg oracles

[harbor-price-aggregators PR #4](https://github.com/baofinance/harbor-price-aggregators/pull/4) (`harbor-yield`) adds CREATE3-wired mainnet helpers for Harbor Yield valuation — **not yet** in the inventory tables above until merge + deploy:

| Pair | Role |
| ---- | ---- |
| ETH/ETH | Constant 1e18 peg |
| Peg/ETH | `peg_USD / ETH_USD` |
| stETH/ETH | stETH/ETH + wstETH rate |
| BTC/EUR/GOLD/MCAP/SILVER → ETH | Peg→ETH wrappers |

See [Harbor Yield](/tech-docs/contracts/harbor-yield).

## Notes

- Deprecated oracles (XAU/XAG) live under haGOLD / haSILVER and have been replaced by GOLD/SILVER naming for active markets
- Most v3 contracts are upgradeable via proxy pattern
- Leverage oracles track NAV of leveraged tokens for pricing
