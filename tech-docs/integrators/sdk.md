# SDK (`@harbor/sdk`)

Thin TypeScript client over the same on-chain surface as these integrator guides. **No Harbor REST/WebSocket API** — quotes are dry-runs; prices and market state are view calls; txs are ABI-encoded calldata.

| | |
| - | - |
| Package | `@harbor/sdk` (`0.2.0`) |
| Repo | [`baofinance/harbor-sdk`](https://github.com/baofinance/harbor-sdk) |
| Peer | [`viem`](https://viem.sh) `^2` |
| Chain | Ethereum mainnet (`chainId` `1`) only |
| npm | Pending — install from GitHub until `@harbor` publish runs |

Addresses and ABIs match the docs-hosted package: [Addresses and ABIs](./addresses-and-abis.md).

## Install

```bash
npm install github:baofinance/harbor-sdk viem
```

After npm publish:

```bash
npm install @harbor/sdk viem
```

## Quick start

```ts
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { createHarborClient } from "@harbor/sdk";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const harbor = createHarborClient({ publicClient, chainId: 1 });

const quote = await harbor.quoteMint("eth-fxusd", {
  side: "pegged",
  wrappedCollateralIn: 10n ** 18n,
});
if (!quote.allowed) throw new Error("mint disallowed at current CR");

const approve = harbor.encodeTx.approveWrappedCollateral({
  marketId: "eth-fxusd",
  amount: quote.wrappedCollateralIn,
});
const mint = harbor.encodeTx.mintPeggedToken({
  marketId: "eth-fxusd",
  wrappedCollateralIn: quote.wrappedCollateralIn,
  receiver: "0xYourReceiver",
  minPeggedOut: quote.minOut,
});
```

## API surface

| Method | On-chain source |
| ------ | --------------- |
| `getAddresses` / `getMarket` / `listMarkets` | [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json) |
| `getPrice(marketId)` | Minter `peggedTokenPrice` / `leveragedTokenPrice`; aggregator `latestAnswer` |
| `getMarketState(marketId)` | `collateralRatio`, `leverageRatio`, `config()` |
| `quoteMint` / `quoteRedeem` | `*DryRun` (`allowed` is false when incentive ratio is `1e18`) |
| `encodeTx.*` | `mint*` / `redeem*` + ERC-20 `approve` |
| `encodeZap.*` | Genesis / minter zap calldata (market must list zap addresses) |
| `swap.getRoute` / `encodeSwap` | Harbor Swap registry + executor — pass `swapper` into `createHarborClient` |

Default `minOut` uses **50 bps** slippage off the dry-run out amount; override per call.

### Zaps

```ts
harbor.encodeZap.minterCollateralToToken({
  marketId: "eth-fxusd",
  side: "pegged",
  receiver: "0x…",
  collateralAmount: 1_000_000n,
  minWrappedCollateralOut: 0n,
  minTokenOut: quote.minOut,
});
```

Also: `genesisNativeAsset`, `genesisCollateral`, `minterNativeToToken` (ETH rail), `minterBaseAssetToToken` (USDC rail). Prefer [direct minter](./mint-redeem.md) when you already hold wrapped collateral. Cookbook: [Zaps](./zaps.md).

### Harbor Swap (Yield / keepers)

```ts
const harbor = createHarborClient({
  publicClient,
  swapper: "0x…", // Swapper_v1 once published
});
const route = await harbor.swap!.getRoute(from, to);
const tx = await harbor.swap!.encodeRouteSwap({
  fromToken: from,
  toToken: to,
  amountIn: 10n ** 18n,
  minAmountOutPerUnitIn: 0n, // rate floor; see ISwapExecutor
});
```

Not for mint/redeem. See [Harbor Swap](./swap.md).

Not shipped: Chainlink-shaped [oracle adapters](./oracle-adapters.md).

## Market ids

Use the address-book keys (examples): `eth-fxusd`, `btc-fxusd`, `btc-steth`, `steth-eur`, `fxusd-eur`. Filter with `listMarkets("live")`. Check `market.status` before production use.

**Alias:** the app `marketId` for haUSD/stETH is **`steth-usd`**. The integrator address book uses **`usd-steth`** for the same market. Treat them as the same stack; prefer the key your SoT publishes (`getMarket("usd-steth")` in `@harbor/sdk`, `steth-usd` in harbor-app).

## Related cookbooks

- [Mint and redeem](./mint-redeem.md)  
- [Pricing](./pricing.md)  
- [Market state and fees](./market-state-and-fees.md)  
- [Zaps](./zaps.md)  
- [Harbor Swap](./swap.md)
