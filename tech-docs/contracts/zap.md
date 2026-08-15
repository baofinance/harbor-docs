# Zap contracts

> **Status**: ✅ Deployed (per market)  
> **Repo**: [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts)

Integrator path (when to zap vs minter): [Zaps](../integrators/zaps.md).

## Contract families

| Family | Purpose | Typical versions in app |
| ------ | ------- | ----------------------- |
| **GenesisETHZap** | Zap ETH/stETH into Genesis | v1 / v3 / v4 |
| **MinterETHZap** | Zap ETH/stETH to mint ha / hs (incl. stability-pool paths) | **v1** on live ETH/BTC/EUR rails; v3 on some relaunch markets |
| **GenesisUSDCZap** | Zap USDC/fxUSD into Genesis | v2 / v4 |
| **MinterUSDCZap** | Zap USDC/fxUSD to mint ha / hs (incl. stability-pool paths) | **v1** on live fxUSD rails (ETH/BTC/EUR); v3 on GOLD/SILVER |

Source layout: `src/minter/` / upgradeable zap packages in the zap repo (`GenesisETHZap_v1.sol`, `GenesisETHZap_v3.sol`, `GenesisUSDCZap_v2.sol`, …). Mainnet **haUSD / stETH** uses **v1** CREATE3 zaps (`harbor_zap_v1_USD`); older markets may use v3/v4.

## Per-market addresses

Each [market page](../markets/haeth/fxusd.md) lists **genesisZap**, **peggedTokenZap**, and **leveragedTokenZap** in the contract table (same layout for every market). Summary of mainnet app wiring:

| Market | Genesis zap | Minter zap (pegged = leveraged) |
| ------ | ----------- | ------------------------------- |
| [fxUSD/ETH](../markets/haeth/fxusd.md) | `0x424D373141a845eB2822B2a8e5ED0f529Ece4F7a` (GenesisUSDCZap_v2) | `0xdb4E78f6F76cd9B188043448AAD95066914B3c51` (MinterUSDCZap_v1) |
| [fxUSD/BTC](../markets/habtc/fxusd.md) | `0xF012a1BA66a411404FEae0a2AeD68dEB18D7de32` (GenesisUSDCZap_v2) | `0x7DEAeA986944C8d742668C95fb6fABdE0c7Ca079` (MinterUSDCZap_v1) |
| [stETH/BTC](../markets/habtc/steth.md) | `0x8Ee0D6AD1d15b3515Ba81CCE16Bba344Deea6781` (GenesisETHZap_v3) | `0xa074c930a854eCEe953549c2f06D642f2C5638e2` (MinterETHZap_v1) |
| [fxUSD/EUR](../markets/haeur/fxusd.md) | `0xE4f3Ce4F27f6bB520668F35101052831C80802ca` (GenesisUSDCZap_v4) | `0x03Fc8dfE4DF3e7A826207157D41b1532191725e3` (MinterUSDCZap_v1) |
| [stETH/EUR](../markets/haeur/steth.md) | `0x173B98E27dF83DC6fC930c1465F65cd10aA21657` (GenesisETHZap_v4) | `0x020e05a06f519e9a6740484A8444b72bfD731e97` (MinterETHZap_v1) |
| [fxUSD/GOLD](../markets/hagold/fxusd.md) | `0x1048a287DDefF38E9A5c1e564A83f6978a2DC1eF` (GenesisUSDCZap_v4) | `0xf0ff6D8d707D81d87caf2faa2447253f283f8873` (MinterUSDCZap_v3) |
| [stETH/GOLD](../markets/hagold/steth.md) | `0xCDf5BdcD7A035C2F20782e607D4f9F8f26280f93` (GenesisETHZap_v4) | `0x3ce5e801A89eA0AC36fC29C12562695d4E6F0fec` (MinterETHZap_v3) |
| [fxUSD/SILVER](../markets/hasilver/fxusd.md) | `0xd19d801a0427Dd91bcbAfB0FcA783a3231a749c8` (GenesisUSDCZap_v4) | `0xfbB196c2C053F8a9E9d3e611a40D12aE450A4baB` (MinterUSDCZap_v3) |
| [stETH/SILVER](../markets/hasilver/steth.md) | `0xC128Cbf15920455569e1926C982567d2bE21AC50` (GenesisETHZap_v4) | `0x68fafa07471e02d33706681d9e3e2160c1901b4c` (MinterETHZap_v3) |
| [fxUSD/MCAP](../markets/hamcap/fxusd.md) / [stETH/MCAP](../markets/hamcap/steth.md) | none in app config | none in app config |
| [stETH/USD Mainnet](../markets/hausd/steth.md) | `0x2E70388011a20d8dd80637765F8FA53e01F611ef` (GenesisETHZap_v1) | `0x103EE4E35C2C1C96bF6C040fd0c0769F0d3f82Eb` (MinterETHZap_v1) |
| [PAXG](../markets/hausd/paxg.md) / [wBTC](../markets/hausd/wbtc.md) / [tBTC](../markets/hausd/tbtc.md) | none in app config | none in app config |
| [stETH/USD MegaETH](../markets/hausd-megaeth/steth.md) | none published | none published |

App source of truth: [`harbor-app` `src/config/contracts.ts`](https://github.com/baofinance/harbor-app/blob/main/src/config/contracts.ts) (`genesisZap`, `peggedTokenZap`, `leveragedTokenZap`).

## Adding a zap for a new market

1. Deploy the matching Genesis + Minter zap from [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts) against that market’s genesis/minter.
2. Wire addresses in the app config.
3. Fill **genesisZap** / **peggedTokenZap** / **leveragedTokenZap** on the market page (same rows as every other market).
4. Add a row to the summary table above.
