# fxUSD/GOLD Market

> **Status**: Coming soon — planned mainnet deployment; Harbor protocol contracts not live yet. The **fxUSD/GOLD price oracle** (aggregator) is already deployed and documented below.

Mint **haGOLD** (gold / XAU peg) and **hsFXUSD-GOLD** (leveraged gold exposure) using **fxUSD** via the **fxSAVE** vault as collateral — same mechanical pattern as [fxUSD/ETH](./eth-fxsave.md) when launched.

## Market overview

| Token | Role |
| ----- | ---- |
| **haGOLD** | Pegged token — gold (XAU) exposure |
| **hsFXUSD-GOLD** | Leveraged token — variable gold exposure |

Collateral: **fxUSD** via **fxSAVE** (addresses match live mainnet markets).

## Contract addresses (planned)

When deployed, proxies and **CREATE3 salt strings** will land in [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) and the [Generic → Mainnet proxy table](./generic.md#mainnet-proxy-table). Expected proxy key shapes: `GOLD::fxUSD::*`, pegged `GOLD::pegged`.

| Component | Value |
| --------- | ----- |
| **minter** | TBD (`GOLD::fxUSD::minter`) |
| **peggedToken** | TBD — haGOLD (`GOLD::pegged`) |
| **leveragedToken** | TBD — hsFXUSD-GOLD (`GOLD::fxUSD::leveraged`) |
| **reservePool** | TBD |
| **stabilityPoolManager** | TBD |
| **genesis** | TBD |
| **priceOracle** | `0x4be4501336130E61e5872cB953e886a3a84D34Cc` (fxUSD/GOLD aggregator — **available**) |
| **feeReceiver** | TBD |
| **stabilityPoolCollateral** | TBD |
| **stabilityPoolLeveraged** | TBD |
| **collateralToken** | `0x085780639CC2cACd35E474e71f4d000e2405d8f6` (fxUSD) |
| **wrappedCollateralToken** | `0x7743e50F534a7f9F1791DdE7dCD89F7783Eefc39` (fxSAVE) |

## Price oracle

The fxUSD/GOLD aggregator (`0x4be4501336130E61e5872cB953e886a3a84D34Cc`) uses the fxSAVE rate provider and XAU/USD Chainlink data (composed for fxUSD/GOLD). See [Price oracle contracts](../contracts/price-oracle.md).

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
