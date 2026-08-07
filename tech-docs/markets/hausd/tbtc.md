# tBTC collateral (haUSD)

> **Status**: ✅ Deployed (mainnet USD stack, May 2026)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `tbtc-usd`

Mint **haUSD** and **hsTBTC-USD** using **tBTC** as collateral. Shares **haUSD** with [stETH](./steth.md), [PAXG](./paxg.md), and [wBTC](./wbtc.md).

App source: [`contracts.mainnetUsd.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/contracts.mainnetUsd.ts).

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | USD |
| **Pegged token (ha)** | haUSD |
| **Leveraged token (hs)** | hsTBTC-USD |
| **Collateral (underlying)** | tBTC |
| **Wrapped collateral** | tBTC |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `USD::tBTC::*` ; pegged `USD::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `USD::tBTC::minter` | `0x1E326fFF476a5d107f1f6684380f677d2fd5E492` |
| **peggedToken** | `USD::pegged` | `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` (haUSD) |
| **leveragedToken** | `USD::tBTC::leveraged` | `0x0348b423C1Fd6d426609b7dCA560398CC3e4eA1B` (hsTBTC-USD) |
| **reservePool** | `USD::tBTC::reservePool` | `0xaF52B331D523dc7eF0A1145638048D218456EBd1` |
| **stabilityPoolManager** | `USD::tBTC::stabilityPoolManager` | `0xD9Bc7F5B90BBf7fCCeC24c67905A6205627D8674` |
| **genesis** | `USD::tBTC::genesis` | `0x64E72Cbb24D1f80A0f66778dA0b95A46ead30539` |
| **priceOracle** | — | `0x4D72FfE2499C4e66b2c6C11D7AfeA04001dB440C` (tBTC/USD — [detail](../../contracts/price-oracles/mainnet/hausd/tbtc.md)) |
| **feeReceiver** | — | `0xdC903fe5ebCE440f22578D701b95424363D20881` (shared TokenDistributor / app `FEE_RECEIVER`) |
| **stabilityPoolCollateral** | `USD::tBTC::stabilityPoolCollateral` | `0x9a229b4ec6A0D2154689De8EDa9d14C884DE707b` |
| **stabilityPoolLeveraged** | `USD::tBTC::stabilityPoolLeveraged` | `0x6a059A79bD261e2bFD160CAc4733108a8BDa2BD6` |
| **collateralToken** | — | `0x18084fbA666a33d37592fA2633fD49a74DD93a88` (tBTC) |
| **wrappedCollateralToken** | — | `0x18084fbA666a33d37592fA2633fD49a74DD93a88` (tBTC) |
| **genesisZap** | — | none |
| **peggedTokenZap** | — | none |
| **leveragedTokenZap** | — | none |

## Token details

### Pegged token (haUSD)

**Address:** `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` — USD peg (shared haUSD). Shared across all mainnet USD collateral stacks.

### Leveraged token (hsTBTC-USD)

**Address:** `0x0348b423C1Fd6d426609b7dCA560398CC3e4eA1B` — variable USD exposure with tBTC collateral.

### Collateral

- **tBTC:** `0x18084fbA666a33d37592fA2633fD49a74DD93a88`
- **tBTC:** `0x18084fbA666a33d37592fA2633fD49a74DD93a88`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `USD::tBTC::stabilityPoolCollateral` | `0x9a229b4ec6A0D2154689De8EDa9d14C884DE707b` | tBTC / tBTC |
| Sail (leveraged) | `USD::tBTC::stabilityPoolLeveraged` | `0x6a059A79bD261e2bFD160CAc4733108a8BDa2BD6` | hsTBTC-USD |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | tBTC/USD |
| **Address** | `0x4D72FfE2499C4e66b2c6C11D7AfeA04001dB440C` |
| **Rate provider** | — (direct / market-wired) |
| **Detail page** | [tBTC/USD](../../contracts/price-oracles/mainnet/hausd/tbtc.md) |

## Zaps

No genesis/minter zaps in app config for mainnet USD stacks — deposit **tBTC** / **tBTC** directly. See [Zap contracts](/tech-docs/contracts/zap).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | — | none |
| Pegged / leveraged (minter) | — | none |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | tBTC |
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
- [wBTC](wbtc.md)

