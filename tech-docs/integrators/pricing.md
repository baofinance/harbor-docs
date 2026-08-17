# Pricing

Harbor exposes **several price surfaces**. They are not interchangeable. ha/hs ERC-20s are mint/burn tokens — **do not assume** they implement Chainlink `latestRoundData` or a token `price()` unless you have verified the bytecode.

![Choose the price surface that matches the job.](/img/12-pricing-oracle-compose.png)

:::note
WIP — final versions pending.
:::


## Which function to call

| Need | Call | Units | Notes |
| ---- | ---- | ----- | ----- |
| ha (pegged) value in collateral / protocol NAV | Minter `peggedTokenPrice()` | 18 decimals (`1e18` = 1.0) | Market-specific minter |
| hs (Sail) NAV | Minter `leveragedTokenPrice()` | 18 decimals | Residual claim; moves with CR and collateral |
| Wrap rate + underlying used by the minter | Harbor aggregator `latestAnswer()` | Four `uint256`s, **18 decimals** | **Not** AggregatorV3 |
| Raw Chainlink (ETH/USD, BTC/USD, …) | Chainlink proxy `latestRoundData()` | Often **8 decimals** | Harbor aggregators already compose these |
| Token ERC-20 `price()` | — | — | **Not** a documented Harbor ha/hs API. Use minter views. |

Aggregator signature (Harbor):

```solidity
function latestAnswer()
    external
    view
    returns (
        uint256 minUnderlyingPrice,
        uint256 maxUnderlyingPrice,
        uint256 minWrappedRate,
        uint256 maxWrappedRate
    );
```

Today min and max are typically equal (bounds reserved). Wrapped rate is fxSAVE / wstETH (etc.) vs underlying. Full behaviour: [Price oracle contracts](../contracts/price-oracle.md).

Minter views: [Minter](../contracts/minter.md) (`peggedTokenPrice`, `leveragedTokenPrice`, `collateralRatio`).

## Worked example 1 — fxUSD / ETH (single feed + rate)

Market: [haETH / fxUSD](../markets/haeth/fxusd.md). Oracle detail: [fxUSD/ETH](../contracts/price-oracles/mainnet/haeth/fxusd.md).

**Composition (conceptual):**

1. `rate = fxSAVE.getRate()` (fxUSD per fxSAVE, 18 decimals via Harbor rate lib).  
2. Chainlink **ETH/USD**, inverted → **USD/ETH**, scaled to 18 decimals.  
3. Aggregator returns `(price, price, rate, rate)` as fxUSD/ETH-style inputs the minter consumes.

**Sample `eth_call` (aggregator):**

```text
to: <market priceOracle from the market page>
data: latestAnswer()   // 0x50d25bcd
```

Decode four `uint256`s. Convert with `formatUnits(x, 18)`.

**Solidity (read-only):**

```solidity
interface IHarborAggregator {
    function latestAnswer()
        external
        view
        returns (uint256, uint256, uint256, uint256);
}

function wrappedValueHint(address oracle, uint256 wrappedAmount)
    external
    view
    returns (uint256 minUnderlyingPrice, uint256 minWrappedRate)
{
    (minUnderlyingPrice, , minWrappedRate, ) = IHarborAggregator(oracle).latestAnswer();
    // wrappedAmount * minWrappedRate / 1e18  → underlying units (then * price as needed)
}
```

Prefer the **market-wired** oracle address on the market page if it differs from the inventory alias.

## Worked example 2 — stETH / BTC (double feed + wstETH rate)

Market: [haBTC / stETH](../markets/habtc/steth.md). Oracle: [stETH/BTC](../contracts/price-oracles/mainnet/habtc/steth.md).

**Composition (conceptual):**

1. `rate = wstETH.getRate()` (stETH per wstETH).  
2. `price ≈ (ETH/USD) / (BTC/USD)` (both Chainlink), optional divisor / invert as configured.  
3. Result is stETH/BTC-style pricing for the minter.

Same `latestAnswer()` ABI. Do not pass Harbor aggregator addresses into code that expects AggregatorV3.

## Worked example 3 — hs leverage NAV feed

Inventory example: [hs fxUSD (haBTC)](../contracts/price-oracles/mainnet/habtc/hs-fxusd.md) — type **leverage**, no collateral rate provider.

These feeds estimate **USD-denominated Sail NAV** for listings / wrappers. For **protocol mint/redeem accounting**, use the **market minter** `leveragedTokenPrice()`, not a standalone leverage oracle, unless you are explicitly consuming that inventory feed.

## Chainlink vs Harbor

Harbor aggregators **already** combine Chainlink feeds + rate providers + heartbeat/staleness checks. Integrators who need a **Chainlink-shaped** `latestRoundData` / 8-decimal `price()` should use a **wrapper adapter** once deployed — [Oracle adapters](./oracle-adapters.md) (spec only today).

## Related

- Inventories: [Mainnet oracles](../contracts/price-oracles/mainnet.md)  
- Product: [Supporting features](/supporting-features)
