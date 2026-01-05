# Price Oracle Contracts (Harbor Aggregators)

The Harbor Price Aggregator system provides validated price feeds for wrapped collateral tokens and their underlying assets, combining Chainlink price feeds with rate providers to deliver accurate pricing data.

## Overview

Harbor uses a system of price aggregators (`HarborAggregator_v3` and specific implementations) that combine:
- **Chainlink Price Feeds**: For underlying asset prices (ETH/USD, BTC/USD, EUR/USD, etc.)
- **Rate Providers**: For wrapped token exchange rates (fxSAVE, wstETH)
- **Price Validation**: Staleness checks, heartbeat validation, and price bounds

## Contract Architecture

### Base Contract: HarborAggregator_v3

- **Upgradeable**: Uses UUPS (Universal Upgradeable Proxy Standard) pattern
- **Ownership**: Fixed owner address (immutable)
- **Version**: Version 3 oracle system
- **Identity**: Provides `baseName()`, `quoteName()`, and `oracleName()` for identification

### Specific Aggregators

Each market pair has its own aggregator contract:

**fxUSD Pairs** (Single Feed):
- `Aggregator_fxUSD_ETH` - fxUSD/ETH oracle
- `Aggregator_fxUSD_BTC` - fxUSD/BTC oracle
- `Aggregator_fxUSD_EUR` - fxUSD/EUR oracle
- `Aggregator_fxUSD_XAU` - fxUSD/GOLD oracle
- `Aggregator_fxUSD_XAG` - fxUSD/SILVER oracle
- `Aggregator_fxUSD_MCAP` - fxUSD/MCAP oracle

**stETH Pairs** (Double Feed):
- `Aggregator_stETH_BTC` - stETH/BTC oracle
- `Aggregator_stETH_EUR` - stETH/EUR oracle
- `Aggregator_stETH_XAU` - stETH/GOLD oracle
- `Aggregator_stETH_XAG` - stETH/SILVER oracle
- `Aggregator_stETH_MCAP` - stETH/MCAP oracle

**Arbitrum Pairs** (Stock indices):
- `Aggregator_stETH_AAPL`, `Aggregator_stETH_AMZN`, etc.
- `Aggregator_USDE_AAPL`, `Aggregator_USDE_AMZN`, etc.

## Key Functions

### Price Query

#### `latestAnswer() returns (uint256 minUnderlyingPrice, uint256 maxUnderlyingPrice, uint256 minWrappedRate, uint256 maxWrappedRate)`
Returns validated price and rate information.

**Returns:**
- `minUnderlyingPrice`: Minimum underlying asset price (18 decimals)
- `maxUnderlyingPrice`: Maximum underlying asset price (18 decimals)
- `minWrappedRate`: Minimum wrapped token rate (18 decimals)
- `maxWrappedRate`: Maximum wrapped token rate (18 decimals)

**Note:** Currently, min and max values are the same (no price bounds), but the interface supports future price bounds.

### Identity Functions

- `baseName() returns (string)` - Base asset name (e.g., "fxUSD", "stETH")
- `quoteName() returns (string)` - Quote asset name (e.g., "ETH", "BTC", "EUR")
- `oracleName() returns (string)` - Full oracle name (e.g., "fxUSD/ETH")
- `rateProvider() returns (address)` - Address of rate provider (fxSAVE or wstETH)
- `version() returns (uint256)` - Oracle version (3)

## Oracle Types

### Single Feed Oracles (fxUSD Pairs)

For fxUSD-based markets:

**Components:**
- **FXSAVE**: Rate provider contract (fxSAVE vault)
- **PRICE_FEED**: Single Chainlink feed (e.g., ETH/USD, BTC/USD)
- **PRICE_FEED_HEARTBEAT**: Maximum staleness threshold
- **PRICE_DIVISOR**: Divisor for price normalization (typically 1 or 1e12)
- **INVERT_PRICE**: Whether to invert the price feed

**Price Calculation:**
- Gets rate from fxSAVE using `ChainlinkRateLib.getRate()`: `rate = FXSAVE.getRate()`
- Gets price from Chainlink feed using `ChainlinkFeedLib` (with validation and optional inversion)
- Returns: `(price, price, rate, rate)`

**Libraries Used:**
- `ChainlinkRateLib`: For rate retrieval and validation
- `ChainlinkFeedLib`: For feed data retrieval and staleness checks

**Example:** `Aggregator_fxUSD_ETH`
- Uses fxSAVE for fxUSD rate (via `ChainlinkRateLib`)
- Uses ETH/USD Chainlink feed (inverted to get USD/ETH)
- Returns fxUSD/ETH price

### Double Feed Oracles (stETH Pairs)

For stETH-based markets:

**Components:**
- **WSTETH**: Rate provider contract (wrapped stETH)
- **FIRST_FEED**: First Chainlink feed (e.g., ETH/USD)
- **SECOND_FEED**: Second Chainlink feed (e.g., BTC/USD)
- **FIRST_FEED_HEARTBEAT**: Staleness threshold for first feed
- **SECOND_FEED_HEARTBEAT**: Staleness threshold for second feed
- **PRICE_DIVISOR**: Divisor for price normalization
- **INVERT_PRICE**: Whether to invert the final price

**Price Calculation:**
- Gets rate from wstETH using `ChainlinkRateLib.getRate()`: `rate = WSTETH.getRate()`
- Gets prices from both feeds using `ChainlinkFeedLib` and divides: `price = (firstFeedPrice / secondFeedPrice) / divisor`
- Returns: `(price, price, rate, rate)`

**Libraries Used:**
- `ChainlinkRateLib`: For rate retrieval and validation
- `ChainlinkFeedLib`: For feed data retrieval and staleness checks
- `DoubleFeedPriceLib`: For combining two feeds (division-based)

**Example:** `Aggregator_stETH_BTC`
- Uses wstETH for stETH rate (via `ChainlinkRateLib`)
- Uses ETH/USD and BTC/USD Chainlink feeds
- Calculates: `(ETH/USD) / (BTC/USD) = ETH/BTC`
- Returns stETH/BTC price

### Multi-Feed Oracles (Stock Indices)

For markets requiring multiple price feeds (e.g., stock indices):

**Components:**
- **Rate Provider**: fxSAVE or wstETH (depending on base asset)
- **FEEDS**: Array of Chainlink feeds (e.g., AAPL/USD, MSFT/USD, etc.)
- **FEED_DECIMALS**: Array of decimals for each feed
- **FEED_HEARTBEATS**: Array of heartbeat thresholds for each feed
- **NORMALIZATION_FACTORS**: (Optional) Array of normalization factors for weighted averages
- **DIVISOR**: (Optional) Custom divisor for price calculation

**Price Calculation Strategies:**

1. **Sum Strategy** (`MultiFeedSumPriceLib`):
   - Sums all feed prices: `price = sum(feed_prices)`
   - Used for index calculations where prices are summed

2. **Average Strategy** (`MultiFeedDivPriceLib`):
   - Sums and divides by feed count: `price = sum(feed_prices) / feed_count`
   - Used for simple average calculations

3. **Normalized Average Strategy** (`MultiFeedNormalizedPriceLib`):
   - Weighted average with normalization factors: `price = sum(normalized_prices) / feed_count`
   - Used for market-cap weighted or supply-adjusted averages

**Libraries Used:**
- `ChainlinkRateLib`: For rate retrieval
- `MultiFeedSumPriceLib`: For summing multiple feeds
- `MultiFeedDivPriceLib`: For sum-and-divide calculations
- `MultiFeedNormalizedPriceLib`: For normalized weighted averages

**Example:** `Aggregator_stETH_MCAP` (Market Cap Index)
- Uses wstETH for stETH rate
- Uses multiple stock price feeds (AAPL, MSFT, TSLA, etc.)
- Calculates normalized average using market cap weights
- Returns stETH/MCAP price

## Rate Providers

### fxSAVE Rate Provider

For fxUSD pairs, the rate comes from the fxSAVE vault:
- **Interface**: `IFxSAVE` (ERC4626 vault)
- **Rate**: `FXSAVE.getRate()` - Exchange rate of fxSAVE shares to underlying assets
- **Purpose**: Accounts for yield accrual in fxSAVE vault

### wstETH Rate Provider

For stETH pairs, the rate comes from wrapped stETH:
- **Interface**: `IWstETH`
- **Rate**: `WSTETH.getRate()` - Exchange rate of wstETH to stETH
- **Purpose**: Accounts for staking rewards accrual

## Price Calculation Libraries

The Harbor aggregator system uses several internal libraries for price calculations and validation:

### ChainlinkRateLib

Library for retrieving and validating rates from Chainlink feeds.

**Key Features:**
- **Rate Normalization**: Normalizes rates to 18 decimals regardless of feed decimals
- **Staleness Validation**: Validates feed freshness using heartbeat thresholds (default: 24 hours)
- **Bounds Validation**: Validates rates are within acceptable bounds (default: 1e18 to 2e18)
- **Error Handling**: Reverts with specific errors for invalid rates or stale feeds

**Functions:**
- `getRate(AggregatorV3Interface feed)`: Get rate with default validation
- `getRate(feed, feedDecimals, minRate, maxRate, maxAge)`: Get rate with custom validation

**Default Constants:**
- `DEFAULT_MIN_RATE`: 1e18
- `DEFAULT_MAX_RATE`: 2e18
- `DEFAULT_MAX_AGE`: 86,400 seconds (24 hours)

**Errors:**
- `InvalidRate(uint256 rate)`: Rate is invalid (negative, zero, or out of bounds)
- `StaleRateSource(address source, uint256 updatedAt)`: Feed data is stale

### MultiFeedSumPriceLib

Library for summing prices from multiple Chainlink feeds.

**Key Features:**
- **Multi-Feed Aggregation**: Sums prices from up to 50 feeds
- **Individual Validation**: Each feed is validated independently for staleness
- **Normalization**: All feed prices normalized to 18 decimals before summing
- **Array Validation**: Ensures feed arrays match in length

**Function:**
- `getPrice(feeds, feedDecimals, feedHeartbeats)`: Returns sum of all feed prices

**Errors:**
- `EmptyFeeds()`: No feeds provided
- `InvalidFeedCount(uint256 count)`: Feed count exceeds limit (50) or array length mismatch

**Use Case**: Used for aggregating multiple price sources (e.g., summing multiple stock prices for an index)

### MultiFeedDivPriceLib

Library for summing prices from multiple feeds and dividing by a custom divisor.

**Key Features:**
- **Custom Divisor**: Allows dividing sum by a custom value (e.g., feed count for average, or index divisor)
- **Same Validation**: Uses same validation as `MultiFeedSumPriceLib`
- **Flexible Calculation**: `price = sum / divisor`

**Function:**
- `getPrice(feeds, feedDecimals, feedHeartbeats, divisor)`: Returns `sum / divisor`

**Use Case**: Used for calculating average prices or indexed values where a divisor is needed

### MultiFeedNormalizedPriceLib

Library for calculating normalized average prices from multiple feeds.

**Key Features:**
- **Normalization Factors**: Each feed can have a custom normalization factor (18 decimals)
- **Weighted Average**: Calculates average of normalized prices: `(sum of normalized prices) / feed count`
- **Supply Scaling**: Normalization factors account for supply differences between feeds
- **Precision**: Uses OpenZeppelin's `Math.mulDiv` for precision-preserving multiplication

**Function:**
- `getPrice(feeds, feedDecimals, feedHeartbeats, normalizationFactors)`: Returns normalized average

**Formula**: 
```
normalized_price[i] = (feed_price[i] * normalization_factor[i]) / 1e18
average_price = sum(normalized_price) / feed_count
```

**Use Case**: Used for calculating market-cap weighted averages or supply-adjusted prices

### Library Integration

These libraries work together with `ChainlinkFeedLib` (which handles feed data retrieval and staleness checks) to provide robust price aggregation:

1. **ChainlinkFeedLib**: Retrieves and validates individual feed data
2. **Price Libraries**: Aggregate multiple feeds using different strategies
3. **Rate Libraries**: Handle rate provider data (fxSAVE, wstETH)

## Price Validation

All prices are validated for:

1. **Staleness**: Prices must be within heartbeat threshold (validated by `ChainlinkFeedLib`)
2. **Zero Values**: Invalid feeds return zero (reverts in Minter)
3. **Decimals**: All prices normalized to 18 decimals
4. **Feed Health**: Chainlink feed status checked
5. **Rate Bounds**: Rates validated against min/max bounds (via `ChainlinkRateLib`)

## Deployment

### Mainnet Deployments

Each aggregator has a mainnet-specific deployment:
- `Aggregator_fxUSD_ETH_mainnet`
- `Aggregator_fxUSD_BTC_mainnet`
- `Aggregator_stETH_BTC_mainnet`
- etc.

These contracts hard-code mainnet addresses in their constructors.

### Contract Addresses

See market configurations for deployed oracle addresses:
- **ETH/fxUSD Market**: `0x71437C90F1E0785dd691FD02f7bE0B90cd14c097`
- **BTC/fxUSD Market**: `0x8F76a260c5D21586aFfF18f880FFC808D0524A73`
- **BTC/stETH Market**: `0xE370289aF2145A5B2F0F7a4a900eBfD478A156dB`

## Price Usage in Protocol

### Minter Contract

The Minter uses price oracles for:

1. **Minting Calculations**:
   - Determines collateral value in quote terms
   - Calculates how many pegged/leveraged tokens to mint

2. **Redemption Calculations**:
   - Determines redemption value
   - Calculates collateral to return

3. **Collateral Ratio**:
   - Monitors system health
   - Triggers rebalancing when below threshold

4. **Fee Calculations**:
   - Some fees based on asset values
   - Discounts based on collateral ratio

### Price Feed Requirements

- Prices must be fresh (within heartbeat)
- Prices must be non-zero
- Rate providers must return valid rates
- All values normalized to 18 decimals

## Security Considerations

- **Staleness Protection**: Heartbeat thresholds prevent stale prices
- **Zero Price Protection**: Invalid feeds return zero (reverts operations)
- **Upgradeability**: UUPS pattern allows upgrades (owner-only)
- **Fixed Owner**: Owner address immutable in base contract
- **Chainlink Reliability**: Uses battle-tested Chainlink feeds
- **Rate Provider Validation**: Rate providers validated on construction

## Oracle Pair Examples

### fxUSD/ETH
- **Rate**: fxSAVE exchange rate
- **Price**: Inverted ETH/USD Chainlink feed
- **Result**: Price of fxUSD in ETH terms

### stETH/BTC
- **Rate**: wstETH exchange rate
- **Price**: (ETH/USD) / (BTC/USD)
- **Result**: Price of stETH in BTC terms

### fxUSD/GOLD (XAU)
- **Rate**: fxSAVE exchange rate
- **Price**: Inverted XAU/USD Chainlink feed
- **Result**: Price of fxUSD in gold terms

## Integration

Price oracles are integrated with:
- **Minter**: Primary consumer of price data
- **StabilityPoolManager**: Uses prices for rebalancing decisions
- **Frontend**: Displays current prices and rates

## Events

Price oracles don't emit events (view-only contracts), but price changes are tracked via:
- Chainlink feed updates
- Rate provider changes (via their own events)
