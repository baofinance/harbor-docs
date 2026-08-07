# stETH/EUR Market

> **Status**: ✅ Deployed — proxies in `harbor_v1.state.json` / [Generic](./generic.md)  
> **Chain**: Ethereum mainnet (1)  
> **App `marketId`**: `steth-eur`

Mint **haEUR** and **hsSTETH-EUR** using **stETH** via **wstETH** as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md).

## Market overview

| Token | Role |
| ----- | ---- |
| **haEUR** | Pegged token — EUR exposure |
| **hsSTETH-EUR** | Leveraged token — variable EUR exposure |

Collateral: **stETH** via **wstETH**.

| | |
| --- | --- |
| **Peg family** | EUR |
| **Proxy key prefix** | `EUR::stETH::*` ; pegged `EUR::pegged` |

## Contract addresses (Mainnet)

Proxy keys and **CREATE3 salt strings**: [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Authoritative file: [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json).

- **minter** (`EUR::stETH::minter`): `0x68911ea33E11bc77e07f6dA4db6cd23d723641cE`
- **peggedToken** (`EUR::pegged`): `0x83Fd69E0FF5767972b46E61C6833408361bF7346` (haEUR)
- **leveragedToken** (`EUR::stETH::leveraged`): `0xEA23FaAf5e464488ECc29883760238B68410D92b` (hsSTETH-EUR)
- **reservePool** (`EUR::stETH::reservePool`): `0xdfE995CdAa4D956C0673428cA999782239b0C03D`
- **stabilityPoolManager** (`EUR::stETH::stabilityPoolManager`): `0x29AAEe8b76A5970D7d5041F500512e2b9d70Aa94`
- **genesis** (`EUR::stETH::genesis`): `0xf4F97218a00213a57A32E4606aAecC99e1805A89`
- **priceOracle**: `0x5e27965689B4B8B425d98fbc676fE22d74caf7C7` (stETH/EUR — [inventory](../contracts/price-oracles/mainnet.md))
- **feeReceiver**: TBD (not in generic table for `EUR::stETH::minterFeeReceiver`)
- **stabilityPoolCollateral** (`EUR::stETH::stabilityPoolCollateral`): `0x000564B33FFde65E6c3b718166856654e039D69B`
- **stabilityPoolLeveraged** (`EUR::stETH::stabilityPoolLeveraged`): `0x7553fb328ef35aF1c2ac4E91e53d6a6B62DFDdEa`
- **collateralToken**: `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH)
- **wrappedCollateralToken**: `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH)

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
| **Inventory** | [Mainnet price oracles](../contracts/price-oracles/mainnet.md) |

## Market parameters

| | |
| --- | --- |
| **Yield source** | wstETH |
| **Leverage** | Variable (collateral-ratio bands) |
| **Rebalancing** | Dual stability pools |
| **startBlock / genesis dates** | TBD — confirm in app config / deploy notes |

## Related markets

- [fxusd-eur](./fxusd-eur.md)

## Template

New markets: copy [Market page template](../templates/market.md).
