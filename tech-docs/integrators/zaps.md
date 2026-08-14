# Zaps

Zaps wrap **ETH / stETH / USDC / fxUSD** into the market’s wrapped collateral, then deposit into **Genesis** or the **Minter**. They are **convenience only** — prefer calling the minter with wrapped collateral when you already hold it. See [Mint and redeem](./mint-redeem.md).

Full address table: [Zap contracts](../contracts/zap.md). Per-market rows: `genesisZap`, `peggedTokenZap`, `leveragedTokenZap` on each [market page](../markets/haeth/fxusd.md).

:::note Graphics (design)
Placeholder: ETH/stETH/USDC → zap → wstETH/fxSAVE → genesis or minter. Design team to supply.
:::

## When to use them

| Use zap | Use minter directly |
| ------- | ------------------- |
| User wallet has native ETH, stETH, USDC, or fxUSD | Your protocol already holds **fxSAVE** / **wstETH** (or that market’s wrapped collateral) |
| Maiden Voyage deposits (genesis still open) | Production mint/redeem of ha/hs with known wrapped balances |
| App-style one-click UX | Fewer contracts, no zap upgrade surface |

Zaps are **out of Sherlock audit scope** (see [FAQ](/faq#is-the-protocol-audited)). Treat them as optional helpers.

## Families

| Family | Typical inputs | Destination |
| ------ | -------------- | ----------- |
| **GenesisETHZap** | ETH, stETH (permit where supported) | Market **genesis** |
| **MinterETHZap** | ETH, stETH | Mint ha / hs (and some stability-pool paths) |
| **GenesisUSDCZap** | USDC, fxUSD | Genesis |
| **MinterUSDCZap** | USDC, fxUSD | Mint ha / hs |

Versions differ by market (v1 CREATE3 on haUSD/stETH; v2–v4 elsewhere). Always use the **proxy on the market page**.

ETH-family entrypoints commonly include `zapNativeAsset`, `zapCollateral`, and `zapCollateralWithPermit` (stETH has EIP-2612). Confirm the ABI on the zap implementation behind that proxy — [harbor-zap-contracts](https://github.com/baofinance/harbor-zap-contracts).

## Integrator path

1. Read `genesisZap` / `peggedTokenZap` / `leveragedTokenZap` from the market page (or app config). Empty / “none” means **no zap** — deposit wrapped collateral.  
2. Approve the **input token** to the zap (except native ETH `msg.value` paths).  
3. Set slippage / min-out the same way you would for a mint dry-run — if the zap has no dry-run, preview via the **minter** `*DryRun` after converting amounts to wrapped units.  
4. Pegged and leveraged minter zaps are often the **same contract** (`peggedTokenZap` = `leveragedTokenZap`).

## SDK helpers

[`@harbor/sdk`](./sdk.md) `encodeZap.*` builds calldata for common genesis / minter paths once the market lists zap addresses. Prefer minter dry-runs for `minOut` when the zap has no dry-run.

## Related

- [Addresses and ABIs](./addresses-and-abis.md)  
- [Supporting features](/supporting-features)
