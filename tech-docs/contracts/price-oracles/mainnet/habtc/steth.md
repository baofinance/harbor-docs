# stETH oracle (haBTC)

> **Status**: Active  
> **Chain**: Ethereum mainnet (1)  
> **Version**: v3  
> **Address**: `0x42018953e5174dC07058BeEE0618aa569fbFBE90`

## Summary

| Field | Value |
| ----- | ----- |
| **Pair** | stETH/BTC |
| **Rate provider** | wstETH |
| **Formula / feeds** | ETH/USD ÷ BTC/USD |
| **Type** | double |
| **Contract address** | `0x42018953e5174dC07058BeEE0618aa569fbFBE90` |

## Feeds

| Field | Value |
| ----- | ----- |
| **Primary configuration** | ETH/USD ÷ BTC/USD |
| **Rate provider** | wstETH |

## Consumers

| Market | Role |
| ------ | ---- |
| [stETH/BTC Market](../../../../markets/habtc/steth.md) | Minter price oracle for `btc-steth` |

## Addresses / aliases

| Address | Notes |
| ------- | ----- |
| `0xE370289aF2145A5B2F0F7a4a900eBfD478A156dB` | App / market-wired address |

## See also

- Chain index: [Mainnet inventory](../../mainnet.md)
- Overview: [Price oracle contracts](../../../price-oracle.md)
