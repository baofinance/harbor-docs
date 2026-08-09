# Contract Architecture

This document provides an overview of the Harbor Protocol contract architecture and how contracts interact with each other.

## Architecture Diagram

### SVG

![Contract Architecture Diagram](/img/contract-architecture-diagram.svg)

### Mermaid

```mermaid
flowchart LR
    classDef bigbox padding:26px,font-size:18px;
    Minter["minter<br/><small>Minter_v1</small>"]:::bigbox
    StabilityPoolManager["stabilityPoolManager<br/><small>StabilityPoolManager_v1</small>"]:::bigbox
    PeggedToken["peggedToken<br/><small>MintableBurnableERC20_v1</small>"]:::bigbox
    LeveragedToken["leveragedToken<br/><small>MintableBurnableERC20_v1</small>"]:::bigbox
    PriceOracle["priceOracle<br/><small>StakedETHWrappedPriceOracle_v1</small>"]:::bigbox
    ReservePool["reservePool<br/><small>ReservePool_v1</small>"]:::bigbox
    FeeReceiver["feeReceiver<br/><small>TokenDistributor_v1</small>"]:::bigbox
    Genesis["genesis<br/><small>Genesis_v1</small>"]:::bigbox
    StabilityPoolCollateral["stabilityPoolCollateral<br/><small>StabilityPool_v1</small>"]:::bigbox
    StabilityPoolSail["stabilityPoolSail<br/><small>StabilityPool_v1</small>"]:::bigbox

    Minter -->|LEVERAGED_TOKEN| LeveragedToken
    Minter -->|PEGGED_TOKEN| PeggedToken
    Minter -->|feeReceiver| FeeReceiver
    Minter -->|priceOracle| PriceOracle
    Minter -->|reservePool| ReservePool

    StabilityPoolManager -->|LEVERAGED_TOKEN| LeveragedToken
    StabilityPoolManager -->|MINTER| Minter
    StabilityPoolManager -->|PEGGED_TOKEN| PeggedToken
    StabilityPoolManager -->|feeReceiver| FeeReceiver
    StabilityPoolManager -->|depositReward| StabilityPoolCollateral
    StabilityPoolManager -->|depositReward| StabilityPoolSail

    Genesis -->|LEVERAGED_TOKEN| LeveragedToken
    Genesis -->|MINTER| Minter
    Genesis -->|PEGGED_TOKEN| PeggedToken

    StabilityPoolCollateral -->|ASSET_TOKEN| PeggedToken
    StabilityPoolCollateral -->|LIQUIDATION_TOKEN| LeveragedToken
    StabilityPoolCollateral -->|notifyLiquidation| StabilityPoolManager

    StabilityPoolSail -->|ASSET_TOKEN| PeggedToken
    StabilityPoolSail -->|LIQUIDATION_TOKEN| LeveragedToken
    StabilityPoolSail -->|notifyLiquidation| StabilityPoolManager
```

## Core Contracts

### Minter
The central contract for minting and burning tokens. It interacts with:
- Token contracts (leveraged and pegged)
- Price oracle for valuations
- Reserve pool for protocol reserves
- Fee receiver for fee distribution

### Stability Pool Manager
Manages multiple stability pools. Coordinates:
- Pool creation and management
- Interactions with minter
- Fee distribution

### Stability Pools
Two types of stability pools:
1. **Collateral Pool**: Uses wrapped collateral (wstETH) for liquidations
2. **Sail Pool**: Uses leveraged tokens for liquidations

Both pools:
- Accept deposits of pegged tokens
- Distribute rewards via compounding accumulator
- Participate in rebalancing through StabilityPoolManager

### Reward System

- **MultipleRewardCompoundingAccumulator**: Tracks and compounds rewards for users
- **LinearMultipleRewardDistributor**: Distributes rewards linearly over time periods
- **Reward Tokens**: Multiple tokens supported (TIDE, wstETH from harvests, liquidation tokens)

**For detailed information, see [Reward System Contracts](../contracts/reward-system.md).**

## Data Flow

1. **Minting Flow**:
   - User deposits collateral → Minter → Mints tokens → Updates reserve pool → Distributes fees

2. **Stability Pool Flow**:
   - User deposits assets → Stability Pool → Updates balance → Earns rewards via compounding accumulator

3. **Rebalance Flow**:
   - Collateral ratio below threshold → StabilityPoolManager rebalances → Stability Pools participate → Distributes rebalance tokens as rewards

4. **Reward Flow**:
   - StabilityPoolManager harvests yield → Deposits rewards to pools → Rewards accumulate → Users claim rewards
