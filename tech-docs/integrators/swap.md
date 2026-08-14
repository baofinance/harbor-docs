# Harbor Swap

Harbor Swap is a **token routing** registry (direct DEX executors + optional aggregators). It does **not** mint ha/hs and does **not** change yield math.

Use it when a Harbor Yield vault or keeper needs to move one asset to another (e.g. fxSAVE ↔ wstETH). For mint/redeem, use the [minter](./mint-redeem.md) (or [zaps](./zaps.md)).

Contract SoT: [Harbor Swap](/tech-docs/contracts/harbor-swap). Yield consumer: [hy / ERC-7575](./hy-erc7575.md) (pre-prod).

:::info Production status
Registry + direct executors live on `harbor-swap` `main`. **Velora** as primary aggregator is still an open PR (`velora-swap` / [#3](https://github.com/baofinance/harbor-swap/pull/3)). Do not assume a mainnet swapper address until it is listed on a market / yield deploy page.
:::

:::note Graphics (design)
Placeholder: HY/keeper → Swapper_v1 → UniV3/Curve/Balancer or Velora. Design team to supply.
:::

## Two modes

| Mode | Caller | How |
| ---- | ------ | --- |
| **Direct** | Hot path (`compound` on HarborYield) | On-chain `Swapper_v1` `(from, to) → executor`; no off-chain calldata |
| **Aggregator** | Discretionary (`redistribute`) | Keeper supplies `routerData`; **role-gated on the consumer** (Harbor Yield `REDISTRIBUTOR_ROLE`), not on the adapter |

Adapters are callable; safety is **consumer role + `minAmountOut` + executor envelope**. Selector allowlists do not validate swap parameters.

## What to integrate (when addresses exist)

1. Resolve `swapper` (CREATE3 key `swapper`) — do not hard-code; predict via Harbor deploy helpers.  
2. Direct: `getRoute(from, to)` then executor `swap` with a real `minAmountOut`.  
3. Aggregator: Velora Market API (`GET /prices`, `POST /transactions/:chainId`) with `userAddress` = adapter proxy; optional 1inch Pathfinder.  
4. Treat `routerData` as untrusted.

CREATE3 keys and Velora/1inch notes: [Harbor Swap](../contracts/harbor-swap.md).

## Not for

- Quoting ha/hs mint or redeem (use minter dry-runs)  
- Reading Harbor oracle prices (use [Pricing](./pricing.md))  
- Generic DEX aggregation for your own users unless you are the Harbor Yield keeper path

## Related

- [Harbor Yield contracts](../contracts/harbor-yield.md)
