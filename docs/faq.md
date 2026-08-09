---
sidebar_position: 7
---

# FAQ

Harbor: Supercharged Yield. Smarter Leverage. Set Sail.

Find answers to common questions about the Harbor Protocol.

## General Questions

### What is Harbor?

Harbor is a decentralized protocol for creating and using synthetic assets — tokens that track a price feed — backed by yield-bearing collateral. It is live on Ethereum at [app.harborfinance.io](https://app.harborfinance.io).

### What are HA Tokens (Harbor Anchored)?

HA tokens are pegged tokens that track a reference price 1:1 via oracles. They are:

- Fully collateralized within healthy markets
- Redeemable against collateral through the protocol
- Mintable and redeemable with dynamic fees (see [Protocol Fees](/fees))
- Usable across DeFi like other ERC-20s

Examples: haETH, haBTC, haEUR.

### What are HS Tokens (Harbor Sail)?

HS tokens provide:

- Variable leverage exposure (residual claim on collateral vs the peg)
- Liquidation protection via protocol rebalancing
- No funding fees and no margin calls

You do **not** pick a leverage multiple or set a stop-loss. Leverage is an outcome of the market’s collateral ratio and token supply. Examples: hsFXUSD-ETH, hsSTETH-BTC.

## Stability Pools

### What are Stability Pools?

Stability pools:

- Help maintain protocol solvency
- Generate yield for participants from productive collateral
- Enable automated rebalancing
- May distribute Marks and/or TIDE incentives where allocated

### How do I participate in Stability Pools?

1. Connect your wallet on [app.harborfinance.io](https://app.harborfinance.io/anchor)
2. Choose a market and pool (Collateral or Sail)
3. Deposit haTokens
4. Start earning yield

### What are the risks of Stability Pools?

Risks include:

- Market volatility and rebalancing into collateral or Sail tokens
- Smart contract risks
- Oracle risks
- Pool depletion in extreme scenarios (see [Risk Considerations](/risk-considerations))

### How is yield calculated?

Yield comes from:

- Collateral token yield (e.g., fxSAVE, wstETH)
- Protocol fees / revenue sharing (Yield Share first when eligible, then **75%** to stability pools after any TVL-threshold treasury take; see [Tokenomics](/tide-token/tokenomics))
- Marks / TIDE incentives where allocated

## Using the Protocol

### How do I get HA tokens?

1. Connect your wallet in the app
2. Open the relevant market (Earn / mint flows)
3. Deposit the market’s **main collateral** when you can (**fxSAVE** or **wstETH**, depending on the market)
4. Optionally use a **zap** for convenience if you hold ETH/USDC (or similar) — see [Supporting Features](/supporting-features); zaps are helpers, not the preferred long-term path
5. Mint haTokens and confirm the transaction

You can also receive haTokens from a [Maiden Voyage](/maiden-voyage) at market launch.

### How do I get HS tokens?

1. Mint hsTokens against collateral in the Leverage / Sail flows, or
2. Receive them from Maiden Voyage distribution, or
3. Acquire them via secondary markets / swaps where liquidity exists

There is no “set leverage / stop-loss” trade ticket — Sail is a token, not a perpetual position UI.

### What fees should I expect?

- **Dynamic mint/redeem fees** based on system stress (see [Protocol Fees](/fees))
- Network gas fees
- Possible early-withdrawal fees on Stability Pools outside the request window
- **Swap / zap routing fees** when using helpers — prefer depositing **main collateral** (fxSAVE / wstETH) directly; see [Supporting Features](/supporting-features)

## Technical Questions

### What wallets are supported?

Typical Web3 wallets via the app connectors (e.g. MetaMask, WalletConnect, Coinbase Wallet, and other RainbowKit / WalletConnect-compatible wallets).

### What networks are supported?

- **Ethereum mainnet** — primary user-facing network for [app.harborfinance.io](https://app.harborfinance.io)

Other deployments may exist for testing or expansion; treat the app’s network selector as source of truth.

### How do I integrate with the protocol?

- Interact with published smart contracts (see [Tech Documentation](/tech-docs))
- Use the open-source app and contract repos under [github.com/baofinance](https://github.com/baofinance/)

There is no public REST/WebSocket SDK promised in these docs.

## Security

### Is the protocol audited?

Yes. Harbor has a Sherlock [Collaborative Audit Report](https://www.harborfinance.io/2025_10_21_Final_Harbor_Collaborative_Audit_Report_1761050317.pdf) scoped to **bao-base** and **bao-minter** (now Harbor core). That report does **not** fully cover every currently deployed Ethereum contract — some post-audit upgrades have shipped, and packages such as **zap contracts** were out of scope. Always review current audit materials before depositing large amounts.

### What security measures are in place?

- Market-specific price oracles / aggregators
- Stability pool rebalancing
- Upgradeable contracts with ownership controls and pause-via-upgrade patterns
- Ongoing operational monitoring

### How are funds protected?

- Collateralization requirements and rebalancing
- Liquidation protection for Sail holders (value can still go to zero in extreme undercollateralization — see risks)
- No separate insurance product is documented here

## Governance

### What is TIDE token?

TIDE is Harbor’s governance and value-accrual token (1B hard cap). Use the [Tide dashboard](https://app.harborfinance.io/tide) for airdrop / claim / BAO swap views. See [TIDE overview](/tide-token/overview).

### How do I participate in governance?

Early growth uses **team-directed incentives** with community discussion (Discord, forums). Holders can discuss and propose; full on-chain gauge voting is not the current model. See [Governance & TIDE](/tide-token/governance).

## Support

### Where can I get help?

- [Discord](https://discord.com/invite/BW3P62vJXT)
- This documentation
- [Twitter/X](https://x.com/0xHarborFi)

### How do I report issues?

- GitHub issues on relevant [baofinance](https://github.com/baofinance/) repos
- Community channels (Discord)

### Where can I find updates?

- [Twitter/X](https://x.com/0xHarborFi)
- [Discord](https://discord.com/invite/BW3P62vJXT)
- [GitHub](https://github.com/baofinance/)
- App announcements / Tide and Maiden Voyage pages
