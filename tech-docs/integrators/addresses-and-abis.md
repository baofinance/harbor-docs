# Addresses and ABIs

Machine-readable **address JSON** and **ABI JSON** ship under this docs site’s static integrator package. Market pages remain the human source of truth for proxies; bind to the **proxy**, not a historical implementation.

**Availability:** `@harbor/sdk` **0.2.0** is installable from [GitHub](https://github.com/baofinance/harbor-sdk) (`npm install github:baofinance/harbor-sdk#f7dcd51853bf1efa083d3149b3b90dc710525f1a`). Address and ABI JSON below are **docs-hosted** from `static/integrators/`. npm registry publication of the SDK (and a future ABI npm package) is **pending**. There is **no** public REST/WebSocket API.

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
| Wrapped price oracle ABI | [`/integrators/abis/WrappedPriceOracle.json`](/integrators/abis/WrappedPriceOracle.json) |

Local paths in this repo: `static/integrators/…`. The thin SDK ([`@harbor/sdk`](./sdk.md)) vendors the same address map and core ABIs.

`HarborPriceAggregator.json` and `WrappedPriceOracle.json` currently publish the **same** Harbor view fragment (`latestAnswer` / `getPrice`). Use either name; prefer `HarborPriceAggregator` for aggregators and `WrappedPriceOracle` when matching minter `IWrappedPriceOracle` naming.

`StabilityPoolManager.json` is intentionally **narrow**: `MINTER` + `Harvested` for harvest-event indexing. It does **not** expose the full pool registry or harvest entry points — use the market’s manager address with a full forge ABI (or expand this artifact later) if you need those calls.

Each market entry includes `status`:

| Status | Meaning |
| ------ | ------- |
| `live` | Deployed mainnet markets (ETH / BTC / EUR / USD families with addresses published here) |
| `coming-soon` | Reserved for stacks that are not yet address-complete in this package |
| `relaunch-pending` | GOLD / SILVER / MCAP — do not treat as active product |

## Address field notes

| Field | Meaning |
| ----- | ------- |
| `wrappedCollateralToken` | Token the **minter** holds / pulls (e.g. fxSAVE, wstETH) |
| `underlyingCollateralToken` | Unwrap / zap input when it differs from wrapped (e.g. stETH under wstETH) |
| `collateralToken` | App/config alias for the collateral the UI labels — often equals wrapped **or** underlying depending on market; **prefer `wrappedCollateralToken` + `underlyingCollateralToken` for integrations** |
| Zap / optional keys | `genesisZap`, `peggedTokenZap`, `leveragedTokenZap` may be omitted or empty when unused |
| Zero address (`0x000…0`) | Historical placeholder (e.g. unused `rebalancePool*`) — **not** a deployed contract; treat as absent |

Missing keys vs `0x000…0`: consumers should treat **absent keys** and **zero addresses** as “not deployed / not used” unless a market page says otherwise.

`startBlock`: integer when known; **`null`** when the deployment block is unknown (e.g. some relaunch-pending or USD entries). Consumers must handle `null` explicitly — do not treat it as block `0`.

## Market id key order

Canonical integrator keys prefer **`<index>-<collateral>`** (e.g. `eth-fxusd`, `btc-steth`, `usd-steth`). Some live keys still use **`<collateral>-<index>`** (e.g. `steth-eur`, `steth-gold`) because they mirror [harbor-app](https://github.com/baofinance/harbor-app) today.

**Follow-up for harbor-app:** normalize app `marketId`s to the same **index-collateral** order as this address book (or the reverse — one order everywhere), then publish aliases for every renamed former key. Until then, use `marketIdAliases` and the per-market page keys; do not invent a third spelling.

**Market id aliases:** app `steth-usd` / `wbtc-usd` ↔ integrator JSON `usd-steth` / `usd-wbtc` (`marketIdAliases` in [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json)).

## Other address sources

| Source | Use |
| ------ | --- |
| Per-market tech pages, e.g. [haETH / fxUSD](../markets/haeth/fxusd.md) | Human lookup: minter, tokens, pools, oracle, zaps |
| [Generic CREATE3 registry](../markets/generic.md) | Proxy keys and salts |
| [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) | Full deployment inventory (proxies / implementations) |
| [Zap contracts](../contracts/zap.md) | Genesis / minter zap addresses |
| [Harbor Swap](../contracts/harbor-swap.md) | Routing registry (Yield / keepers) |
| [Price oracle inventories](../contracts/price-oracles/mainnet.md) | Aggregator addresses (prefer **market-wired** on the pair page when inventory lists an alias) |

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
