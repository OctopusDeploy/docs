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
image:
imageAlt:
---

This page covers reviewing your usage against your license and sending usage declarations to Octopus, automatically or manually.

## Review your subscription's usage

Review your usage to see how your instance compares with your licensed entitlements.

To review your usage:

1. In the Octopus Web Portal, select **Configuration > Usage**.

:::figure
![The billable usage page in Octopus showing usage against licensed entitlements](/docs/img/administration/reviewing-usage-and-providing-declarations/images/in-product-billable-usage.png)
:::

After we receive your usage, it also appears in [Control Center](/docs/getting-started/managing-octopus-subscriptions). If you have multiple instances, Control Center shows usage aggregated across all of them. Depending on your plan, we may also show which usage we're tracking for your renewal.

:::figure
![The Billable usage section of the Billing page in Control Center showing projects and machines usage by month](/docs/img/administration/reviewing-usage-and-providing-declarations/images/control-center-billable-usage.png)
:::

Your instance's usage is calculated on a schedule, so it may not reflect your current usage.

## Usage declarations

Subscriptions on plans that require usage uploads must provide usage declarations to ensure accurate billing.

Octopus Cloud handles this for you, so you don't need to upload usage declarations.

On Octopus Server, you can tell whether your subscription requires usage declarations from:

- Your contract, which states that you must provide usage, either from an instance that can send it over the internet or manually.
- Your license XML, which contains a `<UsageDeclarationRequired ExpiryDays="X">` node indicating that usage declarations are required and specifying the expiry period for each declaration.
- Your Octopus instance, which notifies you in Octopus when a usage declaration is required.

You can always find when your next usage declaration is due in [Control Center](/docs/getting-started/managing-octopus-subscriptions). We'll also let you know in Octopus, with a banner notification, at least 30 days before it's due.

If you don't provide your usage declaration by the due date, Octopus may restrict you from adding billable units to your subscription.

## Send usage declarations automatically

If your Octopus Server can connect to Octopus over the internet, it can send usage declarations for you, so you don't need to download and upload them manually. This is the recommended approach because it keeps your usage declarations up to date.

To send usage declarations automatically:

1. In the Octopus Web Portal, select **Configuration > Telemetry**.
2. Set **Telemetry level** to **Standard (recommended)**.

:::figure
![The Telemetry page in Octopus showing the telemetry level options](/docs/img/administration/reviewing-usage-and-providing-declarations/images/automated-upload-of-usage-declarations.png)
:::

| Telemetry level | What it sends |
| --- | --- |
| Standard (recommended) | Sends usage declarations and [telemetry](/docs/security/outbound-requests/telemetry) that helps us develop the product and diagnose issues. |
| Essential | Sends just the telemetry essential for billing your subscription. |
| None | Sends nothing automatically. [Upload a usage declaration manually](#upload-a-usage-declaration-manually) instead, or send telemetry from the Octopus Web Portal. Use this level if your instance isn't connected to the internet or you don't want to share information automatically. |

Octopus records your telemetry history in the task log, which you can open from the **Telemetry** page or from **Tasks**.

## Upload a usage declaration manually

If your instance can't send usage declarations automatically, download the declaration from Octopus Server, upload it to Octopus, and apply the receipt you get back.

To upload a usage declaration manually:

1. In the Octopus Web Portal, select **Configuration > Usage**.
2. Select **Get your usage declaration**.
3. Upload the usage declaration on the [Usage Declaration Public Upload](https://octopus.com/usage-declaration) page.
4. Return to the Octopus (product) **Usage** > **Usage Declaration** modal. In the modal, paste the receipt from the upload page.
5. Select **Complete declaration**.

:::figure
![The usage declaration dialog on the Usage page showing the steps to get, send and complete a usage declaration](/docs/img/administration/reviewing-usage-and-providing-declarations/images/download-your-usage-declaration.png)
:::

After you apply the receipt, your instance continues as normal until the next usage declaration is required. `ExpiryDays` in your license XML sets the time between usage declarations.

If you can't download your usage declaration or apply the receipt, contact our [support team](https://octopus.com/support).

## FAQ

**I'm not sure if I need to provide a usage declaration.**

We notify you in Octopus when a usage declaration is required. You can also check your contract or license XML. If you're still unsure, contact our [support team](https://octopus.com/support) or our [sales team](https://octopus.com/company/contact).

**I don't think my usage is accurate, or I'm not clear on how it's calculated.**

Usage is calculated on a schedule and may be aggregated across instances that share a license. See [Review your subscription's usage](#review-your-subscriptions-usage). If you still have questions, contact our [support team](https://octopus.com/support).

## Version notes

- Usage declarations, including automatic and manual usage declaration uploads, are available from Octopus Server `2027.0`.

## Learn more

- [Manage your Octopus subscriptions](/docs/getting-started/managing-octopus-subscriptions)
- [Telemetry](/docs/security/outbound-requests/telemetry)
