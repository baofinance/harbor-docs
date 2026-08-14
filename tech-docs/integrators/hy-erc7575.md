# hyTOKEN / ERC-7575 (design only)

:::danger Not production
**Compounders** (`hc…`) and **hyTOKENS** (`hy…`) are **not** live mainnet UX. Do **not** integrate them for production until addresses ship on market pages / [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json). Design source: [`baofinance/harbor-yield`](https://github.com/baofinance/harbor-yield) ([`doc/design.md`](https://github.com/baofinance/harbor-yield/blob/main/doc/design.md), [`doc/integrations.md`](https://github.com/baofinance/harbor-yield/blob/main/doc/integrations.md)). Product: [Harbor Yield](/harbor-yield). Tech: [Harbor Yield contracts](../contracts/harbor-yield.md).
:::

Product **Levels 1–3** = design doc **0–2** (SP / Compounder / HarborYield). See [Token taxonomy](./token-taxonomy.md).

## Standards (do not confuse)

| Layer | Contract | Standard | What you integrate |
| ----- | -------- | -------- | ------------------ |
| **Compounder** (`hcXXX.COLn`) | `Compounder_v1` | **ERC-4626** (+ EIP-2612) | Plain single-asset vault. `asset()` is the **pegged token** (`haXXX`), not the pool token. |
| **hyTOKEN share** (`hyXXX`) | `HarborYield_v1` | **ERC-7575 share** (+ ERC-20 / EIP-2612) | Multi-asset basket share. **Not** ERC-4626 — a single `asset()` would be a lie. Discovers doors via `vault(asset)`. |
| **hy entry/exit door** | `HarborYieldEntry_v1` | **ERC-7575 vault** = ERC-4626 **minus** ERC-20 | One door per holding. `share()` → `hyXXX`. Deposit/redeem that door’s `asset()`; doors mint/burn the shared hy share. |

**hyTOKEN is ERC-7575, not ERC-4626.** The doors reuse the familiar ERC-4626 mutation surface (`deposit` / `mint` / `withdraw` / `redeem` / `preview*`), but the **share token is split out** onto `hyXXX` (ERC-7575’s share/vault split). Approvals for exits go to **hyXXX**, not the door.

```text
door = IERC7575Share(hyXXX).vault(asset)   // discovery
IERC20(hyXXX).approve(door, shares)        // redeem path
IERC7575Vault(door).deposit(assets, receiver)
IERC7575Vault(door).redeem(shares, receiver, owner)
```

Also on `hyXXX` itself: fee-free **`redeemProportional`** (Harbor extension — slice of every holding). Per-asset door exits pay a basket-drift fee (`preview*` includes it; `convertTo*` does not).

Peg-priced **ERC-4626-style views** on `hyXXX` (`totalAssets`, `convertToShares`, …) exist for indexers; hy does **not** advertise `IERC4626` via ERC-165.

## Architecture (siblings, not a stack)

Compounder and HarborYield both wrap stability pools **independently**. Neither holds the other.

| Product | Holds | Enter with |
| ------- | ----- | ---------- |
| Compounder | **One** StabilityPool position | `haXXX` (standard ERC-4626 `deposit`) |
| HarborYield | **Several** pool positions **directly** + peg-equivalent ERC-4626 vaults (e.g. wstETH adapter) | Door `asset()` = market **wrappedCollateral** (pool holding) or the equivalent vault’s own asset |

Do **not** asset-hunt for an ERC-4626 inside HY holdings for hy depositors — internal adapters are for the basket, not for hy holders. Follow `vault(asset)`.

## Integration sequences (ready when addresses ship)

These are the intended Phase 3 cookbooks — wire addresses into docs/`@harbor/sdk` when eng publishes them.

### Compounder (ERC-4626)

1. Approve **haXXX** to the Compounder (or use permit).  
2. Respect `maxDeposit` / `maxMint` (pool supply caps).  
3. `deposit(assets, receiver)` or `mint(shares, receiver)`.  
4. Exit with `withdraw` / `redeem`. Optional: `claim()` for pro-rata pool rewards without exiting.  
5. `depositStabilityPool` only if you already hold pool shares and want them wrapped.

### hyTOKEN deposit (ERC-7575 door)

1. Resolve `door = hy.vault(asset)` for the wrappedCollateral or equivalent asset you hold.  
2. Check `door.maxDeposit(receiver)`.  
3. Approve **asset** to the **door**, then `door.deposit(assets, receiver)` → receive **hyXXX**.  
4. Deposits that cross the Minter are all-or-nothing (band / CR) — size against `maxDeposit`.

### hyTOKEN exit

| Path | Call | Fee |
| ---- | ---- | --- |
| Whole basket | `hy.redeemProportional(shares, receiver)` | Free; returns a slice of every holding (pool legs pay out in ha terms) |
| Single asset | Approve **hyXXX** to **door**, then `door.redeem` / `withdraw` | Basket-drift fee; use `preview*` for the fee-inclusive amount |

Wrap door exits with your own min-out — ERC-4626 has no slippage arg.

## Go-live checklist (eng + docs)

- [ ] Mainnet Compounder / hy / door addresses published  
- [ ] Rows in market pages + [`mainnet-v1.json`](/integrators/addresses/mainnet-v1.json)  
- [ ] Optional: `@harbor/sdk` helpers for `vault(asset)` / door encode  
- [ ] Remove “not production” banners on this page  

Until then, integrate **minter + stability pools** only ([Mint and redeem](./mint-redeem.md)).
