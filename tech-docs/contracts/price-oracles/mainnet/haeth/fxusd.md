# fxUSD oracle (haETH)

> **Status**: Active  
> **Chain**: Ethereum mainnet (1)  
> **Version**: v3  
> **Address (market-wired)**: `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097`

Bind integrators and the app to the **market-wired** address on [fxUSD/ETH](../../../../markets/haeth/fxusd.md). Prefer that over inventory-only aliases.

## Summary

| Field | Value |
| ----- | ----- |
| **Pair** | fxUSD/ETH |
| **Rate provider** | fxSAVE |
| **Formula / feeds** | ETH/USD (inverted) |
| **Type** | single |
| **Market-wired address** | `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097` |

## Feeds

| Field | Value |
| ----- | ----- |
| **Primary configuration** | ETH/USD (inverted) |
| **Rate provider** | fxSAVE |

## Consumers

| Market | Role |
| ------ | ---- |
| [fxUSD/ETH Market](../../../../markets/haeth/fxusd.md) | Minter `priceOracle` for `eth-fxusd` |

## Addresses / aliases

| Address | Notes |
| ------- | ----- |
| `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097` | **Use this** — app / market / `mainnet-v1.json` |
| `0xea5292c58288DcE24C52C1dB13ca048275665EbC` | Inventory / alternate listing — do not prefer over the market-wired proxy |

## See also

- Chain index: [Mainnet inventory](../../mainnet.md)
- Overview: [Price oracle contracts](../../../price-oracle.md)
