# haUSD

> **Peg family**: USD  
> **Chain**: Ethereum mainnet (1)  
> **Pegged token**: `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` (`USD::pegged`)

Shared **haUSD** across the collateral stacks below. Each subpage is one collateral market (minter, hs token, oracle, pools).

Not the same deployment as [haUSD on MegaETH](../hausd-megaeth/).

## Collaterals

| Collateral | Wrapped / underlying |
| ---------- | -------------------- |
| [stETH](./steth.md) | wstETH / stETH |
| [PAXG](./paxg.md) | PAXG |
| [wBTC](./wbtc.md) | WBTC |
| [tBTC](./tbtc.md) | tBTC |

## Registry

Proxy keys and CREATE3 salts: [Generic market deployments](../generic.md).
