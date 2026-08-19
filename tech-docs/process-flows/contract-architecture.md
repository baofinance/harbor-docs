# Contract Architecture

Overview of Harbor Protocol contracts and how they interact.

## Architecture Diagram

![Live contracts, fixed pools, and explicit dependencies.](/img/23-contract-architecture-diagram.png)



### Mermaid

```mermaid
flowchart LR
    classDef bigbox padding:26px,font-size:18px;
    Minter["minter<br/><small>Minter_v2 live</small>"]:::bigbox
    StabilityPoolManager["stabilityPoolManager<br/><small>StabilityPoolManager_v1 live</small>"]:::bigbox
    PeggedToken["peggedToken<br/><small>MintableBurnableERC20_v1</small>"]:::bigbox
    LeveragedToken["leveragedToken<br/><small>MintableBurnableERC20_v1</small>"]:::bigbox
    PriceOracle["priceOracle<br/><small>Harbor price aggregator</small>"]:::bigbox
    ReservePool["reservePool<br/><small>ReservePool_v1</small>"]:::bigbox
    FeeReceiver["feeReceiver<br/><small>TokenDistributor_v1</small>"]:::bigbox
    Genesis["genesis<br/><small>Genesis_v1</small>"]:::bigbox
    StabilityPoolCollateral["stabilityPoolCollateral<br/><small>StabilityPool_v1/v2</small>"]:::bigbox
    StabilityPoolSail["stabilityPoolSail<br/><small>StabilityPool_v1/v2</small>"]:::bigbox
    WrappedCollateral["wrappedCollateral<br/><small>fxSAVE / wstETH / …</small>"]:::bigbox

    Minter -->|LEVERAGED_TOKEN| LeveragedToken
    Minter -->|PEGGED_TOKEN| PeggedToken
    Minter -->|feeReceiver| FeeReceiver
    Minter -->|priceOracle| PriceOracle
    Minter -->|reservePool| ReservePool
    Minter -->|WRAPPED_COLLATERAL| WrappedCollateral

    StabilityPoolManager -->|LEVERAGED_TOKEN| LeveragedToken
    StabilityPoolManager -->|MINTER| Minter
    StabilityPoolManager -->|PEGGED_TOKEN| PeggedToken
    StabilityPoolManager -->|feeReceiver| FeeReceiver
    StabilityPoolManager -->|depositReward| StabilityPoolCollateral
    StabilityPoolManager -->|depositReward| StabilityPoolSail

    Genesis -->|LEVERAGED_TOKEN| LeveragedToken
    Genesis -->|MINTER| Minter
    Genesis -->|PEGGED_TOKEN| PeggedToken

    StabilityPoolCollateral -->|ASSET_TOKEN ha| PeggedToken
    StabilityPoolCollateral -->|LIQUIDATION_TOKEN| WrappedCollateral
    StabilityPoolManager -->|notifyLiquidation| StabilityPoolCollateral

    StabilityPoolSail -->|ASSET_TOKEN ha| PeggedToken
    StabilityPoolSail -->|LIQUIDATION_TOKEN hs| LeveragedToken
    StabilityPoolManager -->|notifyLiquidation| StabilityPoolSail
```

:::note
Collateral pool **liquidation / rebalance payout token** is the market’s **wrapped collateral** (e.g. fxSAVE / wstETH), not hs. Sail pool payout token is **hs**. Both pools’ deposit asset is **ha**. Live SPM wires **two immutable pools** (no runtime pool factory).
:::

## Core Contracts

### Minter
Central mint/redeem of ha and hs. Live: **Minter_v2**. Interacts with tokens, price oracle, reserve pool (discounts), and fee receiver.

### Stability Pool Manager
Coordinates the market’s **fixed** collateral + Sail pools: harvest → `depositReward`, rebalance → `notifyLiquidation`, bounty / protocol cut. Does **not** create pools on the fly.

### Stability Pools
1. **Collateral pool** — rebalance payout: **wrapped collateral**  
2. **Sail pool** — rebalance payout: **hs**

Both accept **ha** deposits. Live v1/v2 use compounding balances + claimable rewards (not gauges). SP_v3 ERC-20 shares are on the Harbor Yield branch (pre-prod).

### Reward System

- Accumulators / distributors under the pool inheritance tree track **claimable** reward tokens  
- ha balances adjust via the **loss product** on rebalance — separate from reward claims  

**Detail:** [Reward System Contracts](../contracts/reward-system.md).

## Data Flow

1. **Mint / redeem** — User ↔ Minter (wrapped collateral ↔ ha/hs); fees → feeReceiver; discounts → ReservePool when funded.  
2. **Stability pool** — User deposits/withdraws **ha**; claims reward tokens separately.  
3. **Rebalance** — CR below threshold → SPM `rebalance` → pools lose ha proportionally → payout tokens accrue as rewards.  
4. **Harvest** — SPM harvests wrapped-collateral yield → `depositReward` on both pools → users `claim`.
