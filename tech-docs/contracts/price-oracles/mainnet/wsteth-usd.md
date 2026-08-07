# wstETH/USD Oracle

> **Status**: Active  
> **Chain**: Ethereum mainnet (1)  
> **Version**: v4  
> **Address**: `0x28bBAaf05dEE8A06d4206089bCd17c1129e6Edca`

## Summary

| Field | Value |
| ----- | ----- |
| **Pair** | wstETH/USD |
| **Rate provider** | None — direct USD price feed |
| **Formula / feeds** | Direct |
| **Type** | direct |
| **Contract address** | `0x28bBAaf05dEE8A06d4206089bCd17c1129e6Edca` |

## Feeds

| Field | Value |
| ----- | ----- |
| **Primary configuration** | Direct |
| **Rate provider** | None — direct USD price feed |

## Consumers

| Market | Role |
| ------ | ---- |
| — | Inventory feed; live mainnet `steth-usd` uses [stETH/USD](./steth-usd.md) |

## Addresses / aliases

| Address | Notes |
| ------- | ----- |
| `0xcE8633B7198d02860873689Bb2566BD2efD11F52` | App-wired stETH/USD for [stETH/USD Market (Mainnet)](../../../markets/hausd/steth.md) |

## See also

- [stETH/USD](./steth-usd.md) (app USD stack)
- Chain index: [Mainnet inventory](../mainnet.md)
- Overview: [Price oracle contracts](../../price-oracle.md)
