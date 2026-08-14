# Tech Documentation

:::info Work in Progress
This technical documentation section is still under active development. Content may be incomplete or subject to change.
:::

Welcome to the Harbor Protocol Technical Documentation. This section provides detailed information about the smart contracts, their functions, and process flows.

**Building a protocol on Harbor?** Start at **[Build on Harbor](./integrators/index.md)** (addresses, quotes, prices, mint/redeem).

## Overview

Harbor Protocol is built on a modular architecture with several core contracts that work together to provide tokenized market data exposure with yield and protected leverage.

## Documentation Structure

- **[Integrators](./integrators/index.md)**: Sequenced path for external protocols (no REST SDK yet — use on-chain dry-runs)
- **[Coverage audit](./coverage.md)**: Repo / PR checklist — what is documented vs still missing
- **Contracts**: Core contracts including [Zap](./contracts/zap.md), [Harbor Yield](/tech-docs/contracts/harbor-yield), and [Harbor Swap](/tech-docs/contracts/harbor-swap)
- **Markets**: Every deployed market uses the same page layout — copy an existing market page when adding a new one; [generic CREATE3 registry](./markets/generic.md)
- **Price oracles**: Chain inventories plus one detail page per deployed aggregator (same layout everywhere)
- **Process Flows**: Step-by-step explanations of key protocol processes

## Key Components

- **Minter**: Handles minting and burning of leveraged and pegged tokens
- **Stability Pool Manager**: Manages multiple stability pools
- **Stability Pool**: Provides rebalancing and yield mechanisms
- **Genesis**: Handles initial market setup
- **Reserve Pool**: Manages protocol reserves
- **Price Oracle**: Provides price feeds for collateral and assets
