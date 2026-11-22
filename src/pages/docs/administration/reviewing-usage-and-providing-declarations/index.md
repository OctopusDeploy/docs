---
layout: src/layouts/Default.astro
pubDate: 2026-11-18
modDate: 2026-11-22
title: Reviewing usage and providing declarations
sidebarLabel: Usage and declarations
description: Review your usage against licensed entitlements and send usage declarations from Octopus Server, automatically or manually.
subject: usage, usage declarations, licensing, billing, telemetry, Control Center
type: guide
audience: [admin]
navSearch: false
navSitemap: false
navMenu: true
---

This page covers reviewing your usage against your licensed entitlements and, if your plan requires it, sending usage declarations to Octopus, either automatically or manually.

## Review your subscriptions usage

Review your usage to see how your instance compares with your licensed entitlements.

To review your usage:

1. In the Octopus Web Portal, select **Configuration > Usage**.

:::figure
![The billable usage page in Octopus showing usage against licensed entitlements](/docs/img/administration/reviewing-usage-and-providing-declarations/images/in-product-billable-usage.png)
:::

Once received, your usage also appears in [Control Center](/docs/getting-started/managing-octopus-subscriptions). If you have multiple instances, Control Center shows usage aggregated across all of them. Depending on your plan, we may also show which usage we're tracking for your renewal.

:::figure
![The Billable usage section of the Billing page in Control Center showing projects and machines usage by month](/docs/img/administration/reviewing-usage-and-providing-declarations/images/control-center-billable-usage.png)
:::

Your instance's usage is calculated on a schedule, so it may not reflect your current usage. If you use your license on more than one instance, the usage shown will be aggregated across all of them.

## Usage declarations

Subscriptions on plans that require usage uploads, must provide usage declarations to ensure accurate billing.

On Octopus Cloud, this is handled for you automatically and you don't need to upload usage declarations.

On Octopus Server, you can tell whether your subscription requires usage declarations from:

- Your contract, which states that you must provide usage, either from an instance that can send it over the internet or manually.
- Your license XML, which contains a `<UsageDeclarationRequired ExpiryDays="X-days">` node indicating that usage declarations are required and specifying the expiry period for each declaration.
- Your Octopus instance, which notifies you in product when a usage declaration is required.

If you don't upload your usage declaration, you may be restricted from adding billable units to your Octopus subscription.

## Send usage declarations automatically

If your Octopus Server can connect to Octopus over the internet, it can send usage declarations for you, so you don't need to download and upload them manually. This is the recommended approach because it keeps your usage declarations up to date.

To send usage declarations automatically:

1. In the Octopus Web Portal, select **Configuration > Telemetry**.
2. Set **Telemetry level** to **Standard (recommended)**.

:::figure
![The Telemetry page in Octopus showing the telemetry level options](/docs/img/administration/reviewing-usage-and-providing-declarations/images/automated-upload-of-usage-declarations.png)
:::

| Telemetry level | What it means for usage declarations |
| --- | --- |
| Standard (recommended) | Sends usage declarations and [telemetry](/docs/security/outbound-requests/telemetry) that helps us develop the product and diagnose issues. |
| Essential | Sends just the telemetry essential for billing your subscription.
| None | Sends nothing automatically. [Upload a usage declaration manually](#upload-a-usage-declaration-manually) instead, or send telemetry from the in-product user interface. Use this level if your instance isn't connected to the internet or you don't want to share information automatically. |

Your telemetry history is recorded in the task log, which you can open from the **Telemetry** page or from **Tasks**.

## Upload a usage declaration manually

If your instance can't send usage declarations automatically, download the declaration from Octopus Server, upload it to Octopus, and apply the receipt you get back.

To upload a usage declaration manually:

1. In the Octopus Web Portal, select **Configuration > Usage**.
2. Download your usage declaration.
3. Upload the usage declaration on the [Usage Declaration Public Upload](https://octopus.com/usage-declaration) page.
4. On the **Usage** page in Octopus, apply the receipt you received from Control Center.

:::figure
![The usage declaration dialog on the Usage page showing the steps to get, send and complete a usage declaration](/docs/img/administration/reviewing-usage-and-providing-declarations/images/download-your-usage-declaration.png)
:::

After you apply the receipt, your instance continues as normal until the next usage declaration is required. The time between usage declarations is set by the `ExpiryDays` value in your license XML.

If you can't download your usage declaration or apply the receipt, contact our [support team](https://octopus.com/support).

## FAQ

**I'm not sure if I need to provide a usage declaration.**

We notify you in product when a usage declaration is required. You can also check your contract or license XML. If you're still unsure, contact our [support team](https://octopus.com/support) or our sales team.

**I don't think my usage is accurate, or I'm not clear on how it's calculated.**

Usage is calculated on a schedule and may be aggregated across instances that share a license. See [Review your subscriptions usage](#review-your-subscriptions-usage). If you still have questions, contact our [support team](https://octopus.com/support).

## Version notes

- Usage declarations, including automatic and manual usage declaration uploads, are available from Octopus Server `2027.0`.

## Related links

- [Manage your Octopus subscriptions](/docs/getting-started/managing-octopus-subscriptions)
- [Telemetry](/docs/security/outbound-requests/telemetry)
