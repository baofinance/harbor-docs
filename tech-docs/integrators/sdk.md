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
npm install github:baofinance/harbor-sdk#f7dcd51853bf1efa083d3149b3b90dc710525f1a viem
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
  // Placeholder checksum address — replace with the real receiver
  receiver: "0x0000000000000000000000000000000000000001",
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
| `swap.getRoute` / `encodeSwap` / `encodeRouteSwap` | Harbor Swap: lookup route; encode a supplied executor; or resolve-then-encode — pass `swapper` into `createHarborClient` |

Default `minOut` uses **50 bps** slippage off the dry-run out amount; override per call.

### Zaps

```ts
const zapCollateralIn = 1_000_000n; // e.g. 1 USDC (6 decimals) on a USDC rail
// Prefer a zap-specific preview when available. Otherwise:
// - wrap leg: set a conservative minWrappedCollateralOut
// - minter leg: quoteMint / *DryRun for the same market+side after converting to wrapped units
const mintQuote = await harbor.quoteMint("eth-fxusd", {
  side: "pegged",
  wrappedCollateralIn: /* wrapped amount expected from the wrap leg */ 10n ** 18n,
});
harbor.encodeZap.minterCollateralToToken({
  marketId: "eth-fxusd",
  side: "pegged",
  receiver: "0x0000000000000000000000000000000000000001",
  collateralAmount: zapCollateralIn,
  minWrappedCollateralOut: 0n, // replace with wrap-leg floor
  minTokenOut: mintQuote.minOut, // minter-leg floor from that quote, not an unrelated mint
});
```

Also: `genesisNativeAsset`, `genesisCollateral`, `minterNativeToToken` (ETH rail), `minterBaseAssetToToken` (USDC rail). Prefer [direct minter](./mint-redeem.md) when you already hold wrapped collateral. Cookbook: [Zaps](./zaps.md).

### Harbor Swap (Yield / keepers)

```ts
import type { HexAddress } from "@harbor/sdk";

const harbor = createHarborClient({
  publicClient,
  swapper: "0x0000000000000000000000000000000000000001", // Swapper_v1 once published
});
const from = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as HexAddress; // USDC
const to = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as HexAddress; // WETH
const amountIn = 1_000_000n; // 1 USDC (6 decimals)
const route = await harbor.swap!.getRoute(from, to);
// Derive a nonzero rate floor from an off-chain quote + slippage (illustrative 50 bps):
// minAmountOutPerUnitIn ≈ expectedOut * 1e18 / amountIn * 9950 / 10000
const minAmountOutPerUnitIn = 995_000_000_000_000_000n; // replace with quote-derived floor
const tx = await harbor.swap!.encodeRouteSwap({
  fromToken: from,
  toToken: to,
  amountIn,
  minAmountOutPerUnitIn,
});
```

Not for mint/redeem. See [Harbor Swap](./swap.md).

Not shipped: Chainlink-shaped [oracle adapters](./oracle-adapters.md).

## Market ids

Use the address-book keys (examples): `eth-fxusd`, `btc-fxusd`, `btc-steth`, `steth-eur`, `fxusd-eur`. Filter with `listMarkets("live")`. Check `market.status` before production use.

**Alias:** the app `marketId` for haUSD/stETH is **`steth-usd`**. The integrator address book uses **`usd-steth`** for the same market. Treat them as the same stack; prefer the key your SoT publishes (`getMarket("usd-steth")` in `@harbor/sdk`, `steth-usd` in harbor-app).

**Key-order follow-up:** some keys are `<index>-<collateral>` and others `<collateral>-<index>`. [harbor-app](https://github.com/baofinance/harbor-app) should normalize to one order (prefer index-collateral) and keep aliases for former keys — see [Addresses and ABIs](./addresses-and-abis.md#market-id-key-order).

## Related cookbooks

- [Mint and redeem](./mint-redeem.md)  
- [Pricing](./pricing.md)  
- [Market state and fees](./market-state-and-fees.md)  
- [Zaps](./zaps.md)  
- [Harbor Swap](./swap.md)
