# Tech Documentation

:::info Work in Progress
This technical documentation section is still under active development. Content may be incomplete or subject to change.
:::

Welcome to the Harbor Protocol Technical Documentation. This section provides detailed information about the smart contracts, their functions, and process flows.

## Overview

Harbor Protocol is built on a modular architecture with several core contracts that work together to provide tokenized market data exposure with yield and protected leverage.

## Documentation Structure

- **[Coverage audit](./coverage.md)**: Repo / PR checklist — what is documented vs still missing
- **[Templates](./templates/market.md)**: Fill-in pages for new [markets](./templates/market.md) and [price aggregators](./templates/price-aggregator.md)
- **Contracts**: Detailed documentation for each smart contract, including functions, parameters, and usage
- **Markets**: Deployed markets (same shape via the market template) and the [generic CREATE3 registry](./markets/generic.md)
- **Price oracles**: Per-chain inventories ([mainnet](./contracts/price-oracles/mainnet.md), …) for looking up deployed aggregators
- **Process Flows**: Step-by-step explanations of key protocol processes

## Key Components

- **Minter**: Handles minting and burning of leveraged and pegged tokens
- **Stability Pool Manager**: Manages multiple stability pools
- **Stability Pool**: Provides rebalancing and yield mechanisms
- **Genesis**: Handles initial market setup
- **Reserve Pool**: Manages protocol reserves
- **Price Oracle**: Provides price feeds for collateral and assets
