# Addresses and ABIs

Machine-readable **address JSON** and **ABI JSON** ship under this docs site’s static integrator package. Market pages remain the human source of truth for proxies; bind to the **proxy**, not a historical implementation.

## Published package (mainnet v1)

| Artifact | URL (docs host) |
| -------- | --------------- |
| Manifest | [`/integrators/manifest.json`](/integrators/manifest.json) |
| Addresses | [`/integrators/addresses/mainnet-v1.json`](/integrators/addresses/mainnet-v1.json) |
| Minter ABI | [`/integrators/abis/Minter.json`](/integrators/abis/Minter.json) |
| ERC-20 ABI | [`/integrators/abis/ERC20.json`](/integrators/abis/ERC20.json) |
| Stability pool ABI | [`/integrators/abis/StabilityPool.json`](/integrators/abis/StabilityPool.json) |
| Stability pool manager ABI | [`/integrators/abis/StabilityPoolManager.json`](/integrators/abis/StabilityPoolManager.json) |
| Genesis ABI | [`/integrators/abis/Genesis.json`](/integrators/abis/Genesis.json) |
| Harbor price aggregator ABI | [`/integrators/abis/HarborPriceAggregator.json`](/integrators/abis/HarborPriceAggregator.json) |

Local paths in this repo: `static/integrators/…`. The thin SDK ([`@harbor/sdk`](./sdk.md)) vendors the same address map and core ABIs.

Each market entry includes `status`:

| Status | Meaning |
| ------ | ------- |
| `live` | ETH / BTC / EUR families used in production UX |
| `coming-soon` | USD (haUSD) — addresses on-chain; product surface soon |
| `relaunch-pending` | GOLD / SILVER / MCAP — do not treat as active product |

## Other address sources

| Source | Use |
| ------ | --- |
| Per-market tech pages, e.g. [haETH / fxUSD](../markets/haeth/fxusd.md) | Human lookup: minter, tokens, pools, oracle, zaps |
| [Generic CREATE3 registry](../markets/generic.md) | Proxy keys and salts |
| [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) | Full deployment inventory (proxies / implementations) |
| [Zap contracts](../contracts/zap.md) | Genesis / minter zap addresses |
| [Harbor Swap](../contracts/harbor-swap.md) | Routing registry (Yield / keepers) |
| [Price oracle inventories](../contracts/price-oracles/mainnet.md) | Aggregator addresses (prefer **market-wired** on the pair page when inventory lists an alias) |

**Market id aliases:** app `steth-usd` / `wbtc-usd` ↔ integrator JSON `usd-steth` / `usd-wbtc` (`marketIdAliases` in [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json)).

## ABI notes

- Prefer the published JSON above over random explorer copies; always verify against the **implementation** behind the UUPS proxy.
- Minter surface used by integrators / SDK: `mint*` / `redeem*` (+ `*DryRun`), `peggedTokenPrice`, `leveragedTokenPrice`, `collateralRatio`, `leverageRatio`, `config`.
- Aggregators expose Harbor-shaped `latestAnswer()` (four `uint256`s, 18 decimals) — **not** AggregatorV3 `latestRoundData`. See [Pricing](./pricing.md) and [Oracle adapters](./oracle-adapters.md).
- Full forge artifacts may later replace this docs-hosted package via npm; the URL layout and field names are intended to stay stable.

## Version matrix (Ethereum mainnet)

Split **live product** from the **Harbor Yield branch** (not mainnet UX yet):

| Surface | Live mainnet today | Yield / pre-prod (`harbor-yield`) |
| ------- | ------------------ | --------------------------------- |
| Minter | **Minter_v2** proxies (Sail mint fix) | **Minter_v3** on yield branch |
| Stability pool | **v1 / v2** compounding balances | **StabilityPool_v3** ERC-20 shares (`hp…`) |
| Stability pool manager | **v1** (two immutable pools) | **v2** with yield hooks |
| Price aggregators | **v3** proxy / **v4** immutable (see pair page) | Yield peg oracles as needed |
| Compounder / hy | — | `Compounder_v1` (ERC-4626), `HarborYield_v1` (ERC-7575) — [hy / ERC-7575](./hy-erc7575.md) |

Do not assume ERC-20 pool shares or hy doors on live markets.

## Related

- Function reference: [Minter](../contracts/minter.md)  
- Consumer guide: [SDK](./sdk.md)
