---
sidebar_position: 100
title: Privacy Policy
description: How the Harbor Protocol web interface handles data at app.harborfinance.io.
slug: /privacy-policy
---

# Harbor Protocol Privacy Policy

**Effective date:** 19 December 2025

This policy applies to your use of the Interface from the Effective date above. If you used the Interface before this policy was first published on the Interface or documentation site, your **continued use after publication** constitutes your ratification of, and agreement to, this policy for all such use from the Effective date forward.

Harbor is a **non-custodial** interface for interacting with Harbor Protocol smart contracts. There is **no sign-up form**, **no identity verification**, and **no requirement** to provide your name, email address, phone number, or government identifiers. We do not want them and we do not ask for them.

This policy describes **what the Interface does touch**, **why**, and **what we do not do**. It applies to [app.harborfinance.io](https://app.harborfinance.io) and related Harbor front ends (the "Interface"). For rules of use, see [Terms of Use](/terms-of-use).

The Interface is maintained by open-source contributors and community members (collectively, "Harbor Protocol," "Harbor," "we," or the "DAO"). Harbor is operationally coordinated by **core contributors** from the broader community. That coordination does not create a company, partnership, or other legal entity that holds your personal data as a traditional service provider would.

---

## What we do not collect

We do **not** intentionally collect or maintain:

- Legal name, email, phone number, or postal address
- Government ID or KYC documents
- Payment card or bank account details (the Interface is not a custodian)
- Social media profiles tied to your identity
- Advertising profiles or cross-site behavioral tracking (see [No trackers](#no-trackers-no-sale-of-data))

---

## Wallet addresses and on-chain activity

When you connect a wallet, the Interface reads your **public wallet address** to show balances, positions, transaction history, and to help you build transactions you submit to the blockchain.

**Wallet addresses and confirmed transactions are public** on the blockchains you use. Anyone can view them on a block explorer, independently of Harbor.

We do **not** attempt to identify who owns a wallet address. We do not run a public "name registry" tied to Interface usage.

---

## Wallet connection and signatures

Connecting a wallet uses standard browser wallet extensions or connectors (for example, injected wallets, MetaMask, or Safe). Those providers operate under **their own** privacy policies and may collect data when you use their products.

When you sign a message or transaction:

- **On-chain transactions** are broadcast to the network and become public record.

Harbor does not receive or store your **private keys**.

---

## RPC and chain data

To read chain state and submit transactions, the Interface communicates with blockchain nodes. Depending on configuration:

- **Default path:** Some traffic may be routed through Harbor's **server-side RPC proxy** (`/api/rpc`) so provider API keys stay off the client. That proxy sees request metadata (such as IP address and user agent) and the JSON-RPC payloads needed to serve your request, which may relate to addresses you query.
- **Direct RPC:** Some chains may use public or configured RPC endpoints from your browser. Those endpoints see traffic from your connection under their own terms.

You can reduce reliance on Harbor's default RPC path by using wallet or network settings that point to RPC endpoints you trust, where the Interface exposes that option.

---

## Preferences and data on your device

The Interface stores some settings in your browser:

| Storage | Examples | Purpose |
|--------|----------|---------|
| `localStorage` | Background theme (e.g. Ethereum vs MegaETH), dashboard module layout, in-progress genesis deposit state | Remember UI preferences and resume flows |
| `sessionStorage` | Optional admin "view as wallet" address (only when that feature is enabled) | Internal support / QA tooling |

These values stay on your device except where sending them is required for a feature (for example, submitting a transaction). Clearing site data in your browser removes them.

The Interface does **not** set advertising or cross-site tracking cookies for Harbor's own analytics.

---

## Server and hosting logs

Our hosting and API infrastructure (for example, **Vercel** and related edge/network providers) may record **standard operational request metadata** while handling a request: for example, IP address, user agent, requested path, timestamps, and error diagnostics. We use this only to operate the service, debug issues, enforce rate limits, and protect against abuse.

We do **not** maintain user accounts, profiles, or long-term log histories on our hosting platform. **Retention:** on Vercel, logs are kept for approximately **one day**, then discarded. We do not use hosting logs to build user-related records beyond that short operational window.

---

## Restricted jurisdictions

Our [Terms of Use](/terms-of-use) restrict use from certain jurisdictions. We **may** use technical measures (including IP-based region signals from our hosting or edge provider) to **limit or block** access from prohibited regions. If used, region data is applied for **access control only**, not for marketing or building location history.

---

## No trackers, no sale of data

As of the date above, the Harbor Interface does **not** intentionally run first-party third-party **analytics**, **advertising pixels**, or **fingerprinting** scripts (for example, Google Analytics, Meta Pixel, or similar).

We do **not** sell, rent, trade, or "share" (as U.S. state privacy laws use that term) personal data about you for cross-context behavioral advertising.

**Wallet and infrastructure providers** (MetaMask, Safe, RPC hosts, block explorers) may collect data under their own policies when you use their services alongside Harbor.

Because we do not run Harbor-owned behavioral tracking, the Interface should behave the same whether or not your browser sends a **Do Not Track** signal, subject to wallet and network provider behavior outside our control.

---

## Third-party services

Using the Interface necessarily involves services we do not operate. They receive traffic you send them under **their own** privacy policies, including but not limited to:

- **Wallet extensions and connectors** when you connect or sign
- **Blockchain RPC providers** (directly or via our proxy)
- **Hosting and CDN / edge providers** (for example, Vercel)
- **Indexers and subgraphs** that serve public on-chain data
- **Block explorers** when you follow links from the Interface
- **Community links** (for example, Discord) when you leave the app

Market and portfolio data shown in the Interface is generally derived from **public on-chain state** and Harbor-operated or third-party APIs. Your browser may not contact every upstream provider directly; some data is aggregated on our servers before display.

---

## Retention and security

| Data type | Typical retention |
|-----------|-------------------|
| Server / edge logs | Approximately **one day** on Vercel; operational metadata only, not user profiles |
| On-chain transactions | **Permanent** on the blockchain; not controlled by Harbor |
| Browser preferences | Until you clear site storage |

We apply reasonable administrative and technical safeguards to systems we operate. The structural security story for users is: **we never hold your private keys or custody your assets**. A compromise of Interface servers could expose metadata described on this page (for example, IP logs and RPC request patterns), not your seed phrase.

---

## Where processing happens

Harbor's Interface and APIs are hosted on cloud infrastructure that may process data in the **United States** and other regions where our providers operate (including global edge networks). If you access the Interface from outside those regions, your data may be transferred to and processed in those locations.

---

## Your rights and choices

Depending on where you live, privacy law may give you rights to **access**, **correct**, **delete**, **port**, or **object** to processing of personal data we hold.

**You can always:**

- **Disconnect your wallet** and stop using the Interface
- **Clear browser storage** for the site to remove local preferences and session data
- **Use the Protocol without this Interface** via block explorers, scripts, or other tools

**Contact us** through official Harbor channels linked from the Interface (for example, [Discord](https://discord.com/invite/BW3P62vJXT)) to exercise rights regarding data stored on our systems. We will respond where required by law.

**Honest limit:** Blockchain transactions are **public and permanent**. No one, including Harbor, can delete or edit confirmed on-chain activity. Deletion rights cannot reach data that lives on-chain or on third-party explorers.

---

## Children

The Interface is not directed at anyone under **18**. We do not knowingly collect information from children.

---

## Changes to this policy

We may update this policy if our practices change. The **Effective date** at the top will change when we do. Material changes may also be noted on the Interface or documentation site.

Continued use of the Interface after an update means you accept the revised policy for new processing from that date forward. If you used the Interface before an updated version was posted, your continued use after that update is posted constitutes ratification of the updated policy for your use from the revised effective date, to the extent permitted by applicable law.

---

## Contact

Harbor is community-maintained. Privacy questions or requests: use official channels published on the Interface (for example, Discord). There is no guaranteed response time.

For product and risk context, see [Risk Considerations](/risk-considerations) and [Terms of Use](/terms-of-use).

---

## Summary

- **Wallet-only.** No accounts, no email signup, no KYC.
- **Public chain.** Addresses and transactions are visible on-chain to everyone.
- **Limited server data.** RPC proxy traffic and ~1-day operational hosting logs (no user accounts or profiles).
- **Local prefs.** Some UI state stays in your browser.
- **No Harbor ad tracking.** We do not sell your data for ads.
- **You stay in control** of your keys; we are non-custodial.
