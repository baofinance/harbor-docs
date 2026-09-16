---
sidebar_position: 5
---

# Live Markets

What is on **Ethereum mainnet** today, aligned with the [Earn](https://app.harborfinance.io/anchor) tab and [integrator registry](/tech-docs/integrators/addresses-and-abis). **App UI is source of truth** for “live / soon / archived”, update this table when the app ships new markets.

## Headline product surface (Earn today)

The app’s primary **Earn** set today is **fxSAVE → haETH**, **wstETH → haBTC**, and **wstETH → haEUR** (plus other live rows in the table, not every peg on every collateral). **haUSD** and commodity pegs are **soon** or **relaunch-pending**, not headline live markets.

## Market table

<div class="table-scroll table-markets">

| Market | Collateral | ha | hs | Status | Detail |
| ------ | ---------- | -- | -- | ------ | ------ |
| fxUSD → ETH | fxSAVE | haETH | hsFXUSD-ETH | **Live** | [haETH / fxUSD](/tech-docs/markets/haeth/fxusd) |
| fxUSD → BTC | fxSAVE | haBTC | hsFXUSD-BTC | **Live** | [haBTC / fxUSD](/tech-docs/markets/habtc/fxusd) |
| fxUSD → EUR | fxSAVE | haEUR | hsFXUSD-EUR | **Live** | [haEUR / fxUSD](/tech-docs/markets/haeur/fxusd) |
| stETH → BTC | wstETH | haBTC | hsSTETH-BTC | **Live** | [haBTC / stETH](/tech-docs/markets/habtc/steth) |
| stETH → EUR | wstETH | haEUR | hsSTETH-EUR | **Live** | [haEUR / stETH](/tech-docs/markets/haeur/steth) |
| stETH → USD | wstETH | haUSD | hsSTETH-USD | **Soon**\* | [haUSD / stETH](/tech-docs/markets/hausd/steth) |
| wBTC → USD | wBTC | haUSD | hsWBTC-USD | **Soon** | [haUSD / wBTC](/tech-docs/markets/hausd/wbtc) |
| fxUSD → GOLD | fxSAVE | haGOLD | hsFXUSD-GOLD | **Pending** | [haGOLD / fxUSD](/tech-docs/markets/hagold/fxusd) |
| stETH → GOLD | wstETH | haGOLD | hsSTETH-GOLD | **Pending** | [haGOLD / stETH](/tech-docs/markets/hagold/steth) |
| fxUSD → SILVER | fxSAVE | haSILVER | hsFXUSD-SILVER | **Pending** | [haSILVER / fxUSD](/tech-docs/markets/hasilver/fxusd) |
| stETH → SILVER | wstETH | haSILVER | hsSTETH-SILVER | **Pending** | [haSILVER / stETH](/tech-docs/markets/hasilver/steth) |
| fxUSD → MCAP | fxSAVE | haMCAP | hsFXUSD-MCAP | **Pending** | [haMCAP / fxUSD](/tech-docs/markets/hamcap/fxusd) |
| stETH → MCAP | wstETH | haMCAP | hsSTETH-MCAP | **Pending** | [haMCAP / stETH](/tech-docs/markets/hamcap/steth) |

</div>

\* **Soon** for haUSD / stETH: contracts are live; product surfacing in the app may still lag. **Pending** = relaunch pending.

Statuses come from the [mainnet-v1 integrator registry](https://github.com/baofinance/harbor-docs/blob/main/static/integrators/addresses/mainnet-v1.json) plus app product surfacing. Voyages in progress appear on [Maiden Voyage](https://app.harborfinance.io/genesis), not always in this table.

## Maiden Voyage & archived campaigns

Historical voyages (e.g. early FXUSD-ETH / FXUSD-BTC / STETH-BTC launches) may show as **archived** in the app when deposits are closed. Claims and withdrawals depend on voyage stage; see each card in [genesis](https://app.harborfinance.io/genesis).

## How to use this page

- **Users**: pick collateral family (fxSAVE vs wstETH) and peg (ETH, BTC, EUR), then open the matching market in the app.
- **Integrators**: use market pages and [Addresses and ABIs](/tech-docs/integrators/addresses-and-abis) for proxy addresses. Prefer integrator keys in **`<index>-<collateral>`** order (e.g. `usd-steth`); the app may use the reverse (e.g. `steth-usd`). Both map to the same market via `marketIdAliases` in the registry.
