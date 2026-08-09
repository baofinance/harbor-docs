# PAXG collateral (haUSD)

> **Status**: ✅ Deployed (mainnet USD stack, May 2026)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `paxg-usd`

Mint **haUSD** and **hsPAXG-USD** using **PAXG** as collateral (wrapped = PAXG). Shares **haUSD** with [stETH](./steth.md), [wBTC](./wbtc.md), and [tBTC](./tbtc.md).

App source: [`contracts.mainnetUsd.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/contracts.mainnetUsd.ts).

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | USD |
| **Pegged token (ha)** | haUSD |
| **Leveraged token (hs)** | hsPAXG-USD |
| **Collateral (underlying)** | PAXG |
| **Wrapped collateral** | PAXG |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `USD::PAXG::*` ; pegged `USD::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `USD::PAXG::minter` | `0x7E1D48774F6faD0Aa41cbb47A66BB8Ec3094e3c2` |
| **peggedToken** | `USD::pegged` | `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` (haUSD) |
| **leveragedToken** | `USD::PAXG::leveraged` | `0xba7d5212B74CBB6A8EC3418a1F7C2B360f8aF144` (hsPAXG-USD) |
| **reservePool** | `USD::PAXG::reservePool` | `0x4C60a87BC13Aa44Fa16b657868FA8a0cDA5DCC52` |
| **stabilityPoolManager** | `USD::PAXG::stabilityPoolManager` | `0xf0ab0C95E5cb0C36780D09d4DED29AF869E65f86` |
| **genesis** | `USD::PAXG::genesis` | `0x68edA29187587DEf950d566f862FFA85FdA594cf` |
| **priceOracle** | — | `0x647633122f9d9ba87210210d5A3ded365911BF9b` (PAXG/USD — [detail](../../contracts/price-oracles/mainnet/hausd/paxg.md)) |
| **feeReceiver** | — | `0xdC903fe5ebCE440f22578D701b95424363D20881` (shared TokenDistributor / app `FEE_RECEIVER`) |
| **stabilityPoolCollateral** | `USD::PAXG::stabilityPoolCollateral` | `0xAf7B276dF93F74AE7780E1D5f550bEaf4Ff26415` |
| **stabilityPoolLeveraged** | `USD::PAXG::stabilityPoolLeveraged` | `0x45B3e0dC9DdaDE6D5e2D45AD08c28B794Bdbf985` |
| **collateralToken** | — | `0x45804880De22913dAFE09f4980848ECE6EcbAf78` (PAXG) |
| **wrappedCollateralToken** | — | `0x45804880De22913dAFE09f4980848ECE6EcbAf78` (PAXG) |
| **genesisZap** | — | none |
| **peggedTokenZap** | — | none |
| **leveragedTokenZap** | — | none |

## Token details

### Pegged token (haUSD)

**Address:** `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` — USD peg (shared haUSD). Shared across all mainnet USD collateral stacks.

### Leveraged token (hsPAXG-USD)

**Address:** `0xba7d5212B74CBB6A8EC3418a1F7C2B360f8aF144` — variable USD exposure with PAXG collateral.

### Collateral

- **PAXG** (underlying and wrapped collateral): `0x45804880De22913dAFE09f4980848ECE6EcbAf78`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `USD::PAXG::stabilityPoolCollateral` | `0xAf7B276dF93F74AE7780E1D5f550bEaf4Ff26415` | PAXG |
| Sail (leveraged) | `USD::PAXG::stabilityPoolLeveraged` | `0x45B3e0dC9DdaDE6D5e2D45AD08c28B794Bdbf985` | hsPAXG-USD |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | PAXG/USD |
| **Address** | `0x647633122f9d9ba87210210d5A3ded365911BF9b` |
| **Rate provider** | — (direct / market-wired) |
| **Detail page** | [PAXG/USD](../../contracts/price-oracles/mainnet/hausd/paxg.md) |

## Zaps

No genesis/minter zaps in app config for mainnet USD stacks — deposit **PAXG** directly. See [Zap contracts](/tech-docs/contracts/zap).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | — | none |
| Pegged / leveraged (minter) | — | none |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | PAXG |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 0 (app placeholder) |
| **Deployment** | Mainnet USD stack (`contracts.mainnetUsd.ts`, May 2026) |

## Genesis (Maiden Voyage)

| Field | Value |
| ----- | ----- |
| **Start** | May 17, 2026 (`2026-05-17T22:51:35Z`) |
| **End** | January 1, 2027 (`2027-01-01T00:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [stETH](steth.md)
- [wBTC](wbtc.md)
- [tBTC](tbtc.md)

