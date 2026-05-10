# Bao Factory Contract

The Bao Factory (`BaoFactory_v1`) is a shared UUPS upgradeable deployer used for **deterministic contract addresses** via **CREATE3**. Harbor integrations (for example [HarborAggregator_v3](price-oracle) proxy deployments) reference deployments made through this factory.

## Overview

- **Implementation**: `BaoFactory_v1` implements `IBaoFactory` and Solady’s `UUPSUpgradeable`.
- **Determinism**: Uses Solady `CREATE3` so the deployed address depends **only** on the **factory’s address** and the **salt**, not on `initCode`. That lets you predict addresses before deployment and keep stable addresses across implementation swaps when the same salt is used.
- **Interaction**: Use the factory through its **proxy** address, not the implementation.

## Contract Architecture

- **Upgradeable**: UUPS; only the baked-in owner may authorize upgrades.
- **Storage**: ERC-7201 namespaced storage for operator data.
- **Owner**: A **compile-time constant** (`_OWNER`), returned by `owner()` (EIP-173 style). It is not transferable except by upgrading the implementation logic—upgrade authorization is still restricted to that owner.
- **Operators**: Time-limited deployer addresses set by the owner. Each operator has an **expiry timestamp**; there is no separate cleanup step once expired.

## Operator Model

- **`setOperator(address operator, uint256 delay)`** (owner only):
  - **`delay == 0`**: removes the operator.
  - **`delay > 0`**: sets expiry to `block.timestamp + delay`. Delay is capped by a large maximum (`100 * 52 weeks` in the reference implementation).
  - **`operator == address(0)`**: reverts.
- **`operatorAt(uint256 index)`**: iterate the operator map (address and expiry).
- **`isCurrentOperator(address)`**: `true` if the address is listed and `expiry > block.timestamp`.

Operators may **deploy** only; they cannot change factory configuration or upgrades.

## Deployment API

| Function | Description |
| -------- | ----------- |
| `deploy(bytes initCode, bytes32 salt)` | Deploy with CREATE3; emits `Deployed(deployed, salt, 0)`. |
| `deploy(uint256 value, bytes initCode, bytes32 salt)` | `payable`; forwards `value` to the new contract’s constructor; `msg.value` must equal `value`; emits `Deployed` with the value. |
| `predictAddress(bytes32 salt)` | `view`; returns the address that would be used for `salt` at this factory. |

Access: **`_onlyOwnerOrOperator()`** — the fixed owner or any **non-expired** operator.

## Salted (Deterministic) Deployments

1. Choose a `bytes32` **salt** (project conventions may namespace salts to avoid collisions).
2. Optionally call **`predictAddress(salt)`** to verify the future address off-chain or in scripts.
3. Call **`deploy`** (or **`deploy` with value**) with the contract’s **creation bytecode** (`initCode`) and the same salt.

Because CREATE3 fixes the address from the **factory and salt only**, you can compute the deployment address **before** knowing or finalizing `initCode`. For UUPS proxies deployed through this pattern, the **proxy** can keep that address while the **implementation** is upgraded behind it.

Always confirm salt and factory address against the environment you target (mainnet vs testnets, wrong factory, etc.).

## Salt naming and deployment manifests

Canonical deployment metadata (proxy address, implementation, salt string, timestamps) lives in the [`deployments`](https://github.com/baofinance/harbor/tree/main/deployments) directory of the [`baofinance/harbor`](https://github.com/baofinance/harbor) repo. Manifests are versioned JSON (`schemaVersion`, per-network `chainId`, aggregator `version`, and so on). For Ethereum mainnet, the full **protocol** proxy table from [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) is maintained as [Mainnet Harbor deployment proxies](../reference/mainnet-harbor-proxies.md).

Salts are recorded there as **human-readable strings**. Deploy tooling converts each string to the `bytes32` value passed to `deploy` / `predictAddress` (see the harbor deploy scripts for the exact encoding). With a fixed **BaoFactory proxy** and salt, the proxy address is reproducible independent of implementation bytecode (CREATE3).

For the manifests below, the factory proxy address is:

`0xD696E56b3A054734d4C6DCBD32E11a278b0EC458`

### Pattern: wrapped price aggregators (UUPS proxies)

Aggregator proxies use a `::`-separated string ending in `wrappedPriceAggregator`:

| Prefix | Network / stack | Example salt |
| ------ | ----------------- | ------------ |
| `harbor_v1` | Ethereum mainnet, `HarborAggregator_v3`-style manifests (`version: v3`, `chainId: 1`) | `harbor_v1::fxUSD::BTC::wrappedPriceAggregator` |
| `harbor_megaeth_v1` | MegaETH, `HarborAggregator_v4`-style manifests (`version: v4`, `chainId: 4326`) | `harbor_megaeth_v1::USDM::ETH::wrappedPriceAggregator` |

Middle segments match the oracle **pair** naming in the manifest (e.g. `fxUSD` / `BTC`, `stETH` / `XAU`).

### Ethereum mainnet — aggregator salts (`harbor_v1`, `chainId` 1)

| Pair | Salt |
| ---- | ---- |
| fxUSD/BTC | `harbor_v1::fxUSD::BTC::wrappedPriceAggregator` |
| fxUSD/ETH | `harbor_v1::fxUSD::ETH::wrappedPriceAggregator` |
| fxUSD/EUR | `harbor_v1::fxUSD::EUR::wrappedPriceAggregator` |
| fxUSD/MCAP | `harbor_v1::fxUSD::MCAP::wrappedPriceAggregator` |
| fxUSD/XAG | `harbor_v1::fxUSD::XAG::wrappedPriceAggregator` |
| fxUSD/XAU | `harbor_v1::fxUSD::XAU::wrappedPriceAggregator` |
| stETH/BTC | `harbor_v1::stETH::BTC::wrappedPriceAggregator` |
| stETH/EUR | `harbor_v1::stETH::EUR::wrappedPriceAggregator` |
| stETH/MCAP | `harbor_v1::stETH::MCAP::wrappedPriceAggregator` |
| stETH/XAG | `harbor_v1::stETH::XAG::wrappedPriceAggregator` |
| stETH/XAU | `harbor_v1::stETH::XAU::wrappedPriceAggregator` |
| fxUSD/GOLD | `harbor_v1::fxUSD::GOLD::wrappedPriceAggregator` |
| fxUSD/SILVER | `harbor_v1::fxUSD::SILVER::wrappedPriceAggregator` |
| stETH/GOLD | `harbor_v1::stETH::GOLD::wrappedPriceAggregator` |
| stETH/SILVER | `harbor_v1::stETH::SILVER::wrappedPriceAggregator` |

### MegaETH — aggregator salts (`harbor_megaeth_v1`, `chainId` 4326, `version: v4`)

| Pair | Salt |
| ---- | ---- |
| USDM/ETH | `harbor_megaeth_v1::USDM::ETH::wrappedPriceAggregator` |
| USDM/BTC | `harbor_megaeth_v1::USDM::BTC::wrappedPriceAggregator` |
| USDE/ETH | `harbor_megaeth_v1::USDE::ETH::wrappedPriceAggregator` |
| USDE/BTC | `harbor_megaeth_v1::USDE::BTC::wrappedPriceAggregator` |
| stETH/USD | `harbor_megaeth_v1::stETH::USD::wrappedPriceAggregator` |

### MegaETH — Harbor market proxies (`saltPrefix: harbor_megaeth_v1`, `chainId` 4326)

Harbor core contracts on MegaETH use the same prefix without the `wrappedPriceAggregator` suffix. Path segments identify the market and **role** (from manifest `proxy` keys).

| Role / proxy key | Salt |
| ---------------- | ---- |
| USD::pegged | `harbor_megaeth_v1::USD::pegged` |
| USD::stETH::genesis | `harbor_megaeth_v1::USD::stETH::genesis` |
| USD::stETH::leveraged | `harbor_megaeth_v1::USD::stETH::leveraged` |
| USD::stETH::minter | `harbor_megaeth_v1::USD::stETH::minter` |
| USD::stETH::reservePool | `harbor_megaeth_v1::USD::stETH::reservePool` |
| USD::stETH::stabilityPoolCollateral | `harbor_megaeth_v1::USD::stETH::stabilityPoolCollateral` |
| USD::stETH::stabilityPoolLeveraged | `harbor_megaeth_v1::USD::stETH::stabilityPoolLeveraged` |
| USD::stETH::stabilityPoolManager | `harbor_megaeth_v1::USD::stETH::stabilityPoolManager` |

Other networks or markets may add more JSON files under [`deployments`](https://github.com/baofinance/harbor/tree/main/deployments); treat this page as **pattern documentation** plus the salts from the referenced manifests, not an on-chain registry.

## Security Notes

- All mutating deploy paths are gated by owner or active operator.
- Upgrades require the hardcoded owner and a non-zero new implementation in `_authorizeUpgrade`.
- Reverts include **unauthorized** callers, **invalid zero** addresses where applicable, **delay** above the cap, and **ETH value mismatch** on the payable deploy path.

## Related Documentation

- UUPS aggregators: [Price Oracle Contracts](price-oracle.md)
- High-level diagram: [Contract architecture](../process-flows/contract-architecture.md)
