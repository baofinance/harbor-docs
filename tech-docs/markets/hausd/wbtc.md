# wBTC collateral (haUSD)

> **Status**: ✅ Deployed (mainnet USD stack, May 2026)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `wbtc-usd`

Mint **haUSD** and **hsWBTC-USD** using **WBTC** as collateral. Shares **haUSD** with [stETH](./steth.md), [PAXG](./paxg.md), and [tBTC](./tbtc.md).

App source: [`contracts.mainnetUsd.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/contracts.mainnetUsd.ts).

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | USD |
| **Pegged token (ha)** | haUSD |
| **Leveraged token (hs)** | hsWBTC-USD |
| **Collateral (underlying)** | WBTC |
| **Wrapped collateral** | WBTC |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `USD::wBTC::*` ; pegged `USD::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `USD::wBTC::minter` | `0x0aA2b6Ee6D079f39A52725B33B15854505542B51` |
| **peggedToken** | `USD::pegged` | `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` (haUSD) |
| **leveragedToken** | `USD::wBTC::leveraged` | `0xC5492515fAcfEe2d0C8B475FF3b57B3b79497456` (hsWBTC-USD) |
| **reservePool** | `USD::wBTC::reservePool` | `0x81f15ff2deAd8F3D97e84849072b8550facCd5ee` |
| **stabilityPoolManager** | `USD::wBTC::stabilityPoolManager` | `0x2506223d01072f795487Ff1f67aD40E1D3B15De0` |
| **genesis** | `USD::wBTC::genesis` | `0xbaE2Cab2Ed87D488CF264bA9411A3fDDAB43ec22` |
| **priceOracle** | — | `0x189d6CA0271F06c222873b4C09A26C83AdCCF73d` (wBTC/USD — [detail](../../contracts/price-oracles/mainnet/hausd/wbtc.md)) |
| **feeReceiver** | — | `0xdC903fe5ebCE440f22578D701b95424363D20881` (shared TokenDistributor / app `FEE_RECEIVER`) |
| **stabilityPoolCollateral** | `USD::wBTC::stabilityPoolCollateral` | `0xa1959F3dae8C3e7c8825dD7902D30569aF092Ed8` |
| **stabilityPoolLeveraged** | `USD::wBTC::stabilityPoolLeveraged` | `0xd16C291456060bF36023D9a935719380a14dE3AD` |
| **collateralToken** | — | `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` (WBTC) |
| **wrappedCollateralToken** | — | `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` (WBTC) |
| **genesisZap** | — | none |
| **peggedTokenZap** | — | none |
| **leveragedTokenZap** | — | none |

## Token details

### Pegged token (haUSD)

**Address:** `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` — USD peg (shared haUSD). Shared across all mainnet USD collateral stacks.

### Leveraged token (hsWBTC-USD)

**Address:** `0xC5492515fAcfEe2d0C8B475FF3b57B3b79497456` — variable USD exposure with WBTC collateral.

### Collateral

- **WBTC** (underlying and wrapped collateral): `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `USD::wBTC::stabilityPoolCollateral` | `0xa1959F3dae8C3e7c8825dD7902D30569aF092Ed8` | WBTC |
| Sail (leveraged) | `USD::wBTC::stabilityPoolLeveraged` | `0xd16C291456060bF36023D9a935719380a14dE3AD` | hsWBTC-USD |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | wBTC/USD |
| **Address** | `0x189d6CA0271F06c222873b4C09A26C83AdCCF73d` |
| **Rate provider** | — (direct / market-wired) |
| **Detail page** | [wBTC/USD](../../contracts/price-oracles/mainnet/hausd/wbtc.md) |

## Zaps

No genesis/minter zaps in app config for mainnet USD stacks — deposit **WBTC** directly. See [Zap contracts](/tech-docs/contracts/zap).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | — | none |
| Pegged / leveraged (minter) | — | none |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | WBTC |
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
- [PAXG](paxg.md)
- [tBTC](tbtc.md)

