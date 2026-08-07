# stETH/EUR Market

> **Status**: ✅ Deployed  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-eur`

Mint **haEUR** and **hsSTETH-EUR** using **stETH** via **wstETH** as collateral.

## Market overview

| | |
| --- | --- |
| **Peg family** | EUR |
| **Pegged token (ha)** | haEUR |
| **Leveraged token (hs)** | hsSTETH-EUR |
| **Collateral (underlying)** | stETH |
| **Wrapped collateral** | wstETH |
| **Proxy salt prefix** | `harbor_v1` |
| **Proxy key prefix** | `EUR::stETH::*` ; pegged `EUR::pegged` |

## Contract addresses

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

| Component | Proxy key | Address |
| --------- | --------- | ------- |
| **minter** | `EUR::stETH::minter` | `0x68911ea33E11bc77e07f6dA4db6cd23d723641cE` |
| **peggedToken** | `EUR::pegged` | `0x83Fd69E0FF5767972b46E61C6833408361bF7346` (haEUR) |
| **leveragedToken** | `EUR::stETH::leveraged` | `0xEA23FaAf5e464488ECc29883760238B68410D92b` (hsSTETH-EUR) |
| **reservePool** | `EUR::stETH::reservePool` | `0xdfE995CdAa4D956C0673428cA999782239b0C03D` |
| **stabilityPoolManager** | `EUR::stETH::stabilityPoolManager` | `0x29AAEe8b76A5970D7d5041F500512e2b9d70Aa94` |
| **genesis** | `EUR::stETH::genesis` | `0xf4F97218a00213a57A32E4606aAecC99e1805A89` |
| **priceOracle** | — | `0x5e27965689B4B8B425d98fbc676fE22d74caf7C7` (stETH/EUR — [detail](../contracts/price-oracles/mainnet/steth-eur.md)) |
| **feeReceiver** | `EUR::stETH::minterFeeReceiver` | TBD |
| **stabilityPoolCollateral** | `EUR::stETH::stabilityPoolCollateral` | `0x000564B33FFde65E6c3b718166856654e039D69B` |
| **stabilityPoolLeveraged** | `EUR::stETH::stabilityPoolLeveraged` | `0x7553fb328ef35aF1c2ac4E91e53d6a6B62DFDdEa` |
| **collateralToken** | — | `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH) |
| **wrappedCollateralToken** | — | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH) |
| **genesisZap** | — | `0x173B98E27dF83DC6fC930c1465F65cd10aA21657` (GenesisETHZap_v4) |
| **peggedTokenZap** | — | `0x31bd3B75672bAfbBa1b2F27789DCBF6ee7429D74` (MinterETHZap_v3) |
| **leveragedTokenZap** | — | `0x31bd3B75672bAfbBa1b2F27789DCBF6ee7429D74` (MinterETHZap_v3) |

## Token details

### Pegged token (haEUR)

**Address:** `0x83Fd69E0FF5767972b46E61C6833408361bF7346` — EUR exposure.

### Leveraged token (hsSTETH-EUR)

**Address:** `0xEA23FaAf5e464488ECc29883760238B68410D92b` — variable EUR exposure with wstETH yield.

### Collateral

- **stETH:** `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84`
- **wstETH:** `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0`

## Stability pools

| Pool | Proxy key | Address | Rebalance asset |
| ---- | --------- | ------- | --------------- |
| Collateral | `EUR::stETH::stabilityPoolCollateral` | `0x000564B33FFde65E6c3b718166856654e039D69B` | wstETH / stETH |
| Sail (leveraged) | `EUR::stETH::stabilityPoolLeveraged` | `0x7553fb328ef35aF1c2ac4E91e53d6a6B62DFDdEa` | hsSTETH-EUR |

## Price oracle

| | |
| --- | --- |
| **Pair** | stETH/EUR |
| **Address** | `0x5e27965689B4B8B425d98fbc676fE22d74caf7C7` |
| **Rate provider** | wstETH |
| **Detail page** | [stETH/EUR](../contracts/price-oracles/mainnet/steth-eur.md) |

## Zaps

Convenience helpers from [`harbor-zap-contracts`](https://github.com/baofinance/harbor-zap-contracts). Prefer depositing **wstETH** / **stETH** directly — see [Zap contracts](../contracts/zap.md).

| Zap | Contract | Address |
| --- | -------- | ------- |
| Genesis | GenesisETHZap_v4 | `0x173B98E27dF83DC6fC930c1465F65cd10aA21657` |
| Pegged / leveraged (minter) | MinterETHZap_v3 | `0x31bd3B75672bAfbBa1b2F27789DCBF6ee7429D74` |

## Market parameters

| | |
| --- | --- |
| **Yield source** | wstETH |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock** | 24271147 |
| **Deployment** | Mainnet (`startBlock`: 24271147) |

## Genesis (Maiden Voyage)

| | |
| --- | --- |
| **Start** | January 19, 2026 (`2026-01-19T15:21:11Z`) |
| **End** | February 2, 2026 (`2026-02-02T17:00:00Z`) |
| **Distribution** | typically 50% ha / 50% hs at launch |

## Related markets

- [fxusd-eur](./fxusd-eur.md)
