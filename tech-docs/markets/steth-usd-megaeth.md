# stETH/USD Market (MegaETH)

> **Status**: ✅ Deployed on MegaETH (`chainId` **4326**)

Harbor market with **stETH** collateral and a **USD** peg. This deployment uses the MegaETH manifest family (`harbor_megaeth_v1`, proxy keys like `USD::stETH::*`); it is **not** the same product stack as [Ethereum mainnet markets](./eth-fxsave.md) (`harbor_v1`, fxSAVE/fxUSD–centric). Scope and comparison: [Generic market deployments](./generic.md#megaeth-harbor-deployment-proxies).

## Market overview

| | |
| --- | --- |
| **Collateral** | Lido stETH (wrapped for the minter per chain configuration) |
| **Peg** | USD — haToken proxy `USD::pegged` |
| **Leveraged token** | Proxy `USD::stETH::leveraged` (Sail-style exposure for this market) |
| **Mechanics** | Wrapped collateral in, pegged + leveraged tokens out; rebalances via stability pools ([Minter](../contracts/minter.md), [Stability pool](../contracts/stability-pool.md)) |

## Context (read once)

| Topic | Detail |
| --- | --- |
| **Token symbols / collateral ERC-20** | Confirm on-chain via the minter’s immutable token addresses or a block explorer — not duplicated here to avoid drift from the registry table. |
| **Stability pools** | Collateral pool liquidates against the stETH/wrapped collateral leg; Sail pool liquidates against `USD::stETH::leveraged`. Manager: proxy `USD::stETH::stabilityPoolManager`. |
| **Price oracle** | Minter uses the Harbor **stETH/USD** wrapped aggregator (row below), not the chain’s standalone [wstETH/USD feed](../contracts/price-oracles/megaeth.md). |
| **Genesis** | Proxy `USD::stETH::genesis` is in the registry; maiden-voyage calendar dates / zap addresses are not in the excerpted manifest — add when published under `deployments` or product docs. |

## Deployment registry (proxies, implementations, CREATE3 salts)

Single source for this market: all **proxy** and **implementation** addresses and **CREATE3 salt (string)** values. Deploy tooling maps each salt string to `bytes32` for [Bao Factory](../contracts/bao-factory.md) (`0xD696E56b3A054734d4C6DCBD32E11a278b0EC458`). Manifest snapshot **`lastUpdated`:** `2026-04-29T21:50:12Z` (per-proxy times may be a few seconds earlier).

| Component | Proxy key | Proxy address | Implementation | CREATE3 salt (string) | Proxy `deploymentTime` |
| --------- | --------- | ------------- | -------------- | --------------------- | ---------------------- |
| Pegged (USD haToken) | `USD::pegged` | `0xbEd2c24Cf10d7aC58350364aF8d3AbC0ce0D626f` | `0x50eA38B09612B508ECBeb432cb9Bf9ae91362908` | `harbor_megaeth_v1::USD::pegged` | `2026-04-29T21:49:49Z` |
| Genesis | `USD::stETH::genesis` | `0x004C7091051bBD43dd1C26e3E37C85F869a987e7` | `0x6774745AfC1574Cda36D7cc2D53Df0028480790e` | `harbor_megaeth_v1::USD::stETH::genesis` | `2026-04-29T21:49:49Z` |
| Leveraged | `USD::stETH::leveraged` | `0x6c8Bf305a6F8C4613265DB876c8A1c3fCdd0d1F1` | `0x2fa33C10A5833c1a983d6a373128C736d5eE9a11` | `harbor_megaeth_v1::USD::stETH::leveraged` | `2026-04-29T21:49:49Z` |
| Minter | `USD::stETH::minter` | `0x77aD4a052812f1EeD89Fb4ED309e81c815D8d755` | `0x2A9bd9829B690Ee36B79f735412E0959F7813534` | `harbor_megaeth_v1::USD::stETH::minter` | `2026-04-29T21:49:49Z` |
| Reserve pool | `USD::stETH::reservePool` | `0x0d60a96678066f3f9dCD1227481E7c1B5e2cbD96` | `0xa3287C1A9A777426bC3022d2a94AfDA9561bda3a` | `harbor_megaeth_v1::USD::stETH::reservePool` | `2026-04-29T21:49:49Z` |
| Stability pool manager | `USD::stETH::stabilityPoolManager` | `0xfc45f502B0C04fF8dE7cca1703440D87De4B5dE7` | `0xCE23e54B1b47277f2B5F1deff06908e95E0Bf38C` | `harbor_megaeth_v1::USD::stETH::stabilityPoolManager` | `2026-04-29T21:49:49Z` |
| Collateral stability pool | `USD::stETH::stabilityPoolCollateral` | `0xe4C4C226A2a267172C09efD43f9Db92B875FdA72` | `0x1b46529C3b3E708215C5C7D3BCf5d70443f98588` | `harbor_megaeth_v1::USD::stETH::stabilityPoolCollateral` | `2026-04-29T21:49:49Z` |
| Leveraged stability pool | `USD::stETH::stabilityPoolLeveraged` | `0x981D002e7A14E9f37f5feC17caa0B69f7A722132` | `0xaa47742C019357c7DD85917A4126676265D12EBE` | `harbor_megaeth_v1::USD::stETH::stabilityPoolLeveraged` | `2026-04-29T21:49:49Z` |
| Price oracle (Harbor stETH/USD) | — | `0xEDd3dC3E699360846c87CB69052EcbC900201854` | `0xDe10BEd5236B786cAA18Ca39FFa5de1b904a8a94` | `harbor_megaeth_v1::stETH::USD::wrappedPriceAggregator` | `2026-04-27T21:50:24Z` |

Duplicate listing (implementations + MegaETH-wide notes): [Generic](./generic.md#megaeth-harbor-deployment-proxies).

## See also

| Resource | Use for |
| -------- | ------- |
| [Generic market deployments](./generic.md) | Full mainnet + MegaETH proxy registries, manifest fields, mainnet vs MegaETH comparison |
| [MegaETH price oracles](../contracts/price-oracles/megaeth.md) | Chain oracle inventory (direct feeds, deprecated USDMY, Harbor aggregator cross-link) |
| [Bao Factory](../contracts/bao-factory.md) | CREATE3 / salt naming conventions |
