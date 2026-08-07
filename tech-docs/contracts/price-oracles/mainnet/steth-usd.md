# stETH/USD Oracle

> **Status**: Active  
> **Chain**: Ethereum mainnet (1)  
> **Version**: v4  
> **Address**: `0xcE8633B7198d02860873689Bb2566BD2efD11F52`

## Summary

| Field | Value |
| ----- | ----- |
| **Pair** | stETH/USD |
| **Rate provider** | wstETH |
| **Formula / feeds** | stETH/USD + wstETH rate (app-wired USD stack) |
| **Type** | aggregator |
| **Contract address** | `0xcE8633B7198d02860873689Bb2566BD2efD11F52` |

## Feeds

| Field | Value |
| ----- | ----- |
| **Primary configuration** | stETH/USD + wstETH rate (app-wired USD stack) |
| **Rate provider** | wstETH |

## Consumers

| Market | Role |
| ------ | ---- |
| [stETH/USD Market (Mainnet)](../../../markets/steth-usd.md) | Minter price oracle for `steth-usd` |

## Addresses / aliases

| Address | Notes |
| ------- | ----- |
| `0x28bBAaf05dEE8A06d4206089bCd17c1129e6Edca` | Inventory `wstETH/USD` direct feed (different address) |

## See also

- Chain index: [Mainnet inventory](../mainnet.md)
- Overview: [Price oracle contracts](../../price-oracle.md)
