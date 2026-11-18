---
layout: src/layouts/Default.astro
title: Reviewing usage and providing declarations
pubDate: 2026-11-18T14:05:55.480Z
navSearch: false
navSitemap: false
navMenu: true
subtitle: Understand your usage and provide declarations for billing
modDate: 2026-11-18T14:05:56.380Z
---

You can review your usage against your licensed entitlements in your Octopus Product by navigating to **Configuration ➜ Usage**. If your plan requires it, you may also be required to provide usage declarations.

:::figure
![The billable usage page in Octopus showing usage against licensed entitlements](/docs/img/administration/reviewing-usage-and-providing-declarations/images/in-product-billable-usage.png)
:::

## Reviewing your usage for your subscription

Once we receive your usage we will display this information in the control center. If you have multiple instances you will find that this is aggregated across all your instances. Depending on your plan we may provide insight into what usage we are tracking for your renewal.

:::figure
![The Billable usage section of the Billing page in Control Center showing projects and machines usage by month](/docs/img/administration/reviewing-usage-and-providing-declarations/images/control-center-billable-usage.png)
:::

## Usage Declarations

Octopus subscriptions that are on a plan which requires usage uploads must provide usage declarations to ensure accurate billing.

If you are on **Octopus Cloud** this is all handled for you automatically and you do not need to manually upload usage declarations.

If you are on **Octopus Server**, you can identify whether your Octopus subscription requires usage declarations from:
- Your contract, which will stipulate that you are required to provide usage via an instance that can provide this information over the internet or manually.
- Your license XML, which will contain a node `<UsageDeclarationRequired ExpiryDays="X-days">` indicating that usage declarations are required and specifying the expiry period for the declaration.
- Your Octopus instance, which will advise if a usage declaration is required.

It is important that you upload your usage declaration, or you may be restricted from adding additional billable units to your Octopus subscription.

If you find yourself stuck or with questions regarding usage declarations, you should reach out to Octopus support for assistance.

## Automatic usage declaration uploads

If your Octopus Server can connect to Octopus over the internet, it can send usage declarations for you, so you don't need to download and upload them manually. This is the recommended approach to ensure your usage declarations are always up to date.

To configure this, go to **Configuration ➜ Telemetry** in the Octopus Web Portal and set the **Telemetry level**:

- **Standard (recommended)** is the recommended for providing usage information and [telemetry](/docs/security/outbound-requests/telemetry) on your octopus instance.

If you prefer to send limited telemetry, the **Essential** and **None** reduces the information you share with us.

Alternatively, if your instance is not exposed to the internet or you decide you don't want to share information automatically you can set the telemetry level to **None**. This will allow you the options to:
1. Download the usage declaration from your Octopus Server and manually upload usage declarations
2. Manually send the telemetry via the in-product user interface.

:::figure
![The Telemetry page in Octopus showing the telemetry level options](/docs/img/administration/reviewing-usage-and-providing-declarations/images/automated-upload-of-usage-declarations.png)
:::

Your Telemetry history is recorded as part of our task log and can be accessed from this screen or the task logs.

## Upload usage declarations manually to Control Center

If you decide to manually upload usage declarations, you will need to undertake a three step process. This consists of:
1. **Downloading the usage declaration from your Octopus Server** from the Settings ➜ Usage page.
2. **Upload the usage declaration to the Control Center** using the [Usage Declaration Public Upload](https://octopus.com/usage-declaration) page.
3. **Receiving and applying your receipt** from the Control Center after successfully uploading your usage declaration and applying back on the usage page.

You can start and follow this process from the **Usage** screen in your Octopus product

:::figure
![The usage declaration dialog on the Usage page showing the steps to get, send and complete a usage declaration](/docs/img/administration/reviewing-usage-and-providing-declarations/images/download-your-usage-declaration.png)
:::

After following the steps and applying your receipt your instance will continue as normal until the next usage declaration is required. The time between usage declarations is stipulated on your license serial number.
 
## FAQ
1. I'm unable to download my usage or apply the receipt and need assistance.

If you encounter issues with downloading your usage declaration or applying the receipt, please reach out to Octopus support for guidance and troubleshooting.

2. I'm not sure if I need to provide a usage declaration.

Generally, we will notify you in product if a usage declaration is required. If you are unsure you can review your contract or license XML. If in doubt reach out to Octopus support or our sales team for clarification.

3. I don't think my usage is accurate or I'm not clear on how it's calculated.

Your usage in the instance is calculated on a schedule so it may not represent the current usage in your Octopus instance. 

Furthermore, if you are using your license on more the one Octopus instance, the usage may be aggregated across all instances, which could affect the reported usage. If you have concerns or questions about how your usage is calculated, please reach out to Octopus support for clarification.
