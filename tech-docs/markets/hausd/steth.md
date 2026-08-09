# stETH collateral (haUSD)

> **Status**: ✅ Deployed (mainnet USD stack, May 2026)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-usd`

Mint **haUSD** and **hsSTETH-USD** using **stETH** via **wstETH** as collateral on Ethereum mainnet. Shares the **haUSD** pegged token with [PAXG](./paxg.md), [wBTC](./wbtc.md), and [tBTC](./tbtc.md). Not the same deployment as [MegaETH stETH](../hausd-megaeth/steth.md).

App source: [`contracts.mainnetUsd.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/contracts.mainnetUsd.ts).

## Market overview

| Field | Value |
| ----- | ----- |
| **Peg family** | USD |
| **Pegged token (ha)** | haUSD |
| **Leveraged token (hs)** | hsSTETH-USD |
| **Collateral (underlying)** | stETH |
| **Wrapped collateral** | wstETH |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `USD::stETH::*` ; pegged `USD::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](../generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `USD::stETH::minter` | `0xC14837C30BEdF3081cBa2cDeB067fA6F0381e69b` |
| **peggedToken** | `USD::pegged` | `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` (haUSD) |
| **leveragedToken** | `USD::stETH::leveraged` | `0xf9B67dE4346458cD9cB18AfA884b25c869A9161B` (hsSTETH-USD) |
| **reservePool** | `USD::stETH::reservePool` | `0x8EBcE958BAAa46163D32b57b07a36DaA1E36CA8d` |
| **stabilityPoolManager** | `USD::stETH::stabilityPoolManager` | `0x377a4A6BEC4C75F2B7054B67Df03ce9A7497c33d` |
| **genesis** | `USD::stETH::genesis` | `0x40ff767FF4055D53b1BC1B0141221a37B25905fD` |
| **priceOracle** | — | `0xcE8633B7198d02860873689Bb2566BD2efD11F52` (stETH/USD — [detail](../../contracts/price-oracles/mainnet/hausd/steth.md)) |
| **feeReceiver** | — | `0xdC903fe5ebCE440f22578D701b95424363D20881` (shared TokenDistributor / app `FEE_RECEIVER`) |
| **stabilityPoolCollateral** | `USD::stETH::stabilityPoolCollateral` | `0xD21613339E8A6adba7a084f67802731e6045d801` |
| **stabilityPoolLeveraged** | `USD::stETH::stabilityPoolLeveraged` | `0x6E7b445e4dac4787445f31382f4E3dCAd510c238` |
| **collateralToken** | — | `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH) |
| **wrappedCollateralToken** | — | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH) |
| **genesisZap** | — | none |
| **peggedTokenZap** | — | none |
| **leveragedTokenZap** | — | none |

## Token details

### Pegged token (haUSD)

**Address:** `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` — USD peg (shared haUSD). Shared across all mainnet USD collateral stacks.

### Leveraged token (hsSTETH-USD)

**Address:** `0xf9B67dE4346458cD9cB18AfA884b25c869A9161B` — variable USD exposure with wstETH collateral.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `USD::stETH::stabilityPoolCollateral` | `0xD21613339E8A6adba7a084f67802731e6045d801` | wstETH / stETH |
| Sail (leveraged) | `USD::stETH::stabilityPoolLeveraged` | `0x6E7b445e4dac4787445f31382f4E3dCAd510c238` | hsSTETH-USD |

## Price oracle

| Field | Value |
| ----- | ----- |
| **Pair** | stETH/USD |
| **Address** | `0xcE8633B7198d02860873689Bb2566BD2efD11F52` |
| **Rate provider** | wstETH |
| **Detail page** | [stETH/USD](../../contracts/price-oracles/mainnet/hausd/steth.md) |

## Zaps

No genesis/minter zaps in app config for mainnet USD stacks — deposit **wstETH** / **stETH** directly. See [Zap contracts](/tech-docs/contracts/zap).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | — | none |
| Pegged / leveraged (minter) | — | none |

## Market parameters

| Field | Value |
| ----- | ----- |
| **Yield source** | wstETH |
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

- [PAXG](paxg.md)
- [wBTC](wbtc.md)
- [tBTC](tbtc.md)
- [stETH (MegaETH haUSD)](../hausd-megaeth/steth.md)

