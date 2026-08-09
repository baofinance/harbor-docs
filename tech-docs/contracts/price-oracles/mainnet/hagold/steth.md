# stETH oracle (haGOLD)

> **Status**: Active  
> **Chain**: Ethereum mainnet (1)  
> **Version**: v3  
> **Address**: `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31`

## Summary

| Field | Value |
| ----- | ----- |
| **Pair** | stETH/GOLD |
| **Rate provider** | wstETH |
| **Formula / feeds** | ETH/USD ÷ XAU/USD |
| **Type** | double |
| **Contract address** | `0x4ebde6143C5E366264ba7416FdEa18BC27C04A31` |

## Feeds

| Field | Value |
| ----- | ----- |
| **Primary configuration** | ETH/USD ÷ XAU/USD |
| **Rate provider** | wstETH |

## Consumers

| Market | Role |
| ------ | ---- |
| [stETH/GOLD Market](../../../../markets/hagold/steth.md) | Minter price oracle for `steth-gold` |

## See also

- Chain index: [Mainnet inventory](../../mainnet.md)
- Overview: [Price oracle contracts](../../../price-oracle.md)
