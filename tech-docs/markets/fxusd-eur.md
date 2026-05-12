# fxUSD/EUR Market

> **Status**: Coming soon — planned mainnet deployment; Harbor protocol contracts not live yet. The **fxUSD/EUR price oracle** (aggregator) is already deployed and documented below.

Mint **haEUR** (EUR peg) and **hsFXUSD-EUR** (leveraged EUR exposure) using **fxUSD** via the **fxSAVE** vault as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md) when launched.

## Market overview

| Token | Role |
| ----- | ---- |
| **haEUR** | Pegged token — EUR exposure |
| **hsFXUSD-EUR** | Leveraged token — variable EUR exposure |

Collateral: **fxUSD** via **fxSAVE** (addresses match live mainnet markets).

## Contract addresses (planned)

When deployed, proxies and **CREATE3 salt strings** will land in [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) and the [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Expected proxy key shapes: `EUR::fxUSD::*`, pegged `EUR::pegged`.

| Component | Value |
| --------- | ----- |
| **minter** | TBD (`EUR::fxUSD::minter`) |
| **peggedToken** | TBD — haEUR (`EUR::pegged`) |
| **leveragedToken** | TBD — hsFXUSD-EUR (`EUR::fxUSD::leveraged`) |
| **reservePool** | TBD |
| **stabilityPoolManager** | TBD |
| **genesis** | TBD |
| **priceOracle** | `0x8f6F9C8af44f5f15a18d0fa93B5814a623Fa6353` (fxUSD/EUR aggregator — **available**) |
| **feeReceiver** | TBD |
| **stabilityPoolCollateral** | TBD |
| **stabilityPoolLeveraged** | TBD |
| **collateralToken** | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |

## Price oracle

The fxUSD/EUR aggregator (`0x8f6F9C8af44f5f15a18d0fa93B5814a623Fa6353`) uses the fxSAVE rate provider and EUR/USD Chainlink data (composed for fxUSD/EUR). See [Price oracle contracts](../contracts/price-oracle.md).

## Market parameters (planned)

| | |
| --- | --- |
| **Collateral** | fxUSD (via fxSAVE vault) |
| **Leverage** | Variable, collateral-ratio bands |
| **Yield** | fxSAVE vault |
| **Rebalancing** | Stability pools |
| **Deployment** | Planned February 2026 |

## Genesis (Maiden Voyage, planned)

| | |
| --- | --- |
| **Start** | February 1, 2026 (planned) |
| **End** | February 8, 2026 (planned) |
