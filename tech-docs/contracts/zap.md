# Zap contracts

> **Status**: ✅ Deployed (per market)  
> **Repo**: [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts)

One-click helpers that wrap ETH/stETH → **wstETH** or USDC/fxUSD → **fxSAVE**, then deposit into Genesis or Minter. Prefer depositing the market’s main collateral directly when possible — zaps are convenience only.

## Contract families

| Family | Purpose | Typical versions in app |
| ------ | ------- | ----------------------- |
| **GenesisETHZap** | Zap ETH/stETH into Genesis | v3 / v4 |
| **MinterETHZap** | Zap ETH/stETH to mint ha / hs (incl. stability-pool paths) | v3 |
| **GenesisUSDCZap** | Zap USDC/fxUSD into Genesis | v2 / v4 |
| **MinterUSDCZap** | Zap USDC/fxUSD to mint ha / hs (incl. stability-pool paths) | v3 |

Source layout: `src/minter/` in the zap repo (`GenesisETHZap_v3.sol`, `GenesisUSDCZap_v2.sol`, …). Newer markets may use v4 genesis zaps while still sharing a v3 minter zap.

## Per-market addresses

Each [market page](../markets/eth-fxsave.md) lists **genesisZap**, **peggedTokenZap**, and **leveragedTokenZap** in the contract table (same layout for every market). Summary of mainnet app wiring:

| Market | Genesis zap | Minter zap (pegged = leveraged) |
| ------ | ----------- | ------------------------------- |
| [fxUSD/ETH](../markets/eth-fxsave.md) | `0x424D373141a845eB2822B2a8e5ED0f529Ece4F7a` (GenesisUSDCZap_v2) | `0x81253f3Fc43D5e399610beE4D7a235826A7663b8` (MinterUSDCZap_v3) |
| [fxUSD/BTC](../markets/btc-fxusd.md) | `0xF012a1BA66a411404FEae0a2AeD68dEB18D7de32` (GenesisUSDCZap_v2) | `0x7e4f98217A085F1a06332EDff805513b6Ea79357` (MinterUSDCZap_v3) |
| [stETH/BTC](../markets/btc-steth.md) | `0x8Ee0D6AD1d15b3515Ba81CCE16Bba344Deea6781` (GenesisETHZap_v3) | `0x9Af8FBF66Bf3645f505D58614D7a13D411b99907` (MinterETHZap_v3) |
| [fxUSD/EUR](../markets/fxusd-eur.md) | `0xE4f3Ce4F27f6bB520668F35101052831C80802ca` (GenesisUSDCZap_v4) | `0x64118b5B2794088CA93D41C9f2264212dc92512f` (MinterUSDCZap_v3) |
| [stETH/EUR](../markets/steth-eur.md) | `0x173B98E27dF83DC6fC930c1465F65cd10aA21657` (GenesisETHZap_v4) | `0x31bd3B75672bAfbBa1b2F27789DCBF6ee7429D74` (MinterETHZap_v3) |
| [fxUSD/GOLD](../markets/fxusd-gold.md) | `0x1048a287DDefF38E9A5c1e564A83f6978a2DC1eF` (GenesisUSDCZap_v4) | `0xf0ff6D8d707D81d87caf2faa2447253f283f8873` (MinterUSDCZap_v3) |
| [stETH/GOLD](../markets/steth-gold.md) | `0xCDf5BdcD7A035C2F20782e607D4f9F8f26280f93` (GenesisETHZap_v4) | `0x3ce5e801A89eA0AC36fC29C12562695d4E6F0fec` (MinterETHZap_v3) |
| [fxUSD/SILVER](../markets/fxusd-silver.md) | `0xd19d801a0427Dd91bcbAfB0FcA783a3231a749c8` (GenesisUSDCZap_v4) | `0xfbB196c2C053F8a9E9d3e611a40D12aE450A4baB` (MinterUSDCZap_v3) |
| [stETH/SILVER](../markets/steth-silver.md) | `0xC128Cbf15920455569e1926C982567d2bE21AC50` (GenesisETHZap_v4) | `0x68fafa07471e02d33706681d9e3e2160c1901b4c` (MinterETHZap_v3) |
| [fxUSD/MCAP](../markets/fxusd-mcap.md) / [stETH/MCAP](../markets/steth-mcap.md) | none in app config | none in app config |
| [stETH/USD MegaETH](../markets/steth-usd-megaeth.md) | none published | none published |

App source of truth: [`harbor-app` `src/config/contracts.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/contracts.ts) (`genesisZap`, `peggedTokenZap`, `leveragedTokenZap`).

## Adding a zap for a new market

1. Deploy the matching Genesis + Minter zap from [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts) against that market’s genesis/minter.
2. Wire addresses in the app config.
3. Fill **genesisZap** / **peggedTokenZap** / **leveragedTokenZap** on the market page (same rows as every other market).
4. Add a row to the summary table above.
