# Build on Harbor

Sequenced path for another protocol to integrate Harbor **without** a Harbor-hosted REST or WebSocket API. Prefer the thin [`@harbor/sdk`](./sdk.md) for quotes and calldata, or call **on-chain views + dry-runs** directly with the published [address/ABI package](./addresses-and-abis.md).

:::info Pre-production vs live
**Live on Ethereum mainnet today:** markets (ha / hs), minters (`Minter_v2`), stability pools, price aggregators, zaps where listed.  
**Not live for production integration:** Harbor Yield Compounders and **hyTOKENS** — see [hy / ERC-7575](./hy-erc7575.md).
:::

:::note Graphics (design)
Placeholder: one-pager call graph (your protocol → minter / oracle / stability pool). Design team to supply.
:::

## Read in this order

1. [Token taxonomy](./token-taxonomy.md) — ha / hs / hy / AC / pool shares  
2. [Addresses and ABIs](./addresses-and-abis.md) — published JSON + market pages  
3. [SDK](./sdk.md) — `@harbor/sdk` consumer guide (`quoteMint`, `getPrice`, `encodeTx`, …)  
4. [Pricing](./pricing.md) — minter prices vs aggregator `latestAnswer` vs Chainlink examples  
5. [Mint and redeem](./mint-redeem.md) — approve → dry-run → tx  
6. [Zaps](./zaps.md) — ETH/stETH/USDC convenience wrap + genesis/minter  
7. [Market state and fees](./market-state-and-fees.md) — CR, incentive bands, `config()`  
8. [Stability pools](./stability-pools.md) — ha-only deposits, claims, rebalance receipts  
9. [Harbor Swap](./swap.md) — DEX routing for Harbor Yield / keepers (not mint)  
10. [Oracle adapters](./oracle-adapters.md) — Chainlink-shaped wrappers (spec; not deployed)  
11. [hy / ERC-7575](./hy-erc7575.md) — Compounder = ERC-4626; hy = ERC-7575 (design only until mainnet)  

Architecture and rebalance narratives (product + process flows): [Contract architecture](../process-flows/contract-architecture.md), [Rebalance](../process-flows/rebalance.md), [Technical overview](/technical-overview).

## SDK surface

Shipped as [`@harbor/sdk`](./sdk.md) ([baofinance/harbor-sdk](https://github.com/baofinance/harbor-sdk) `0.2.0`):

| Method | On-chain source |
| ------ | --------------- |
| `getAddresses(marketId)` | [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json) |
| `getPrice(market)` | Minter `peggedTokenPrice` / `leveragedTokenPrice`; aggregator `latestAnswer` |
| `getMarketState(market)` | `collateralRatio`, `leverageRatio`, `config()` |
| `quoteMint` / `quoteRedeem` | `*DryRun` views on the minter |
| `encodeTx` | `mint*` / `redeem*` + ERC-20 `approve` |
| `encodeZap` | Genesis / minter zap calldata |
| `swap.getRoute` / `encodeSwap` | `Swapper_v1` + executor (pass `swapper` address) |

Still eng follow-on: Chainlink-shaped [oracle adapters](./oracle-adapters.md); npm registry publish of `@harbor/sdk`. There is **no** public REST/WebSocket API.

## Product vs tech docs

| Surface | Use for |
| ------- | ------- |
| [Documentation](/) | User-facing protocol, yield, TIDE, risks |
| **This section** | Integrator path: addresses, quotes, txs, prices |
| [Contracts](../contracts/minter.md) / [Markets](../markets/haeth/fxusd.md) | Function-level and per-market SoT |
