---
layout: src/layouts/Default.astro
pubDate: 2025-04-04
modDate: 2025-04-04
title: OctoAI
description: How to use OctoAI
navOrder: 100
hideInThisSection: true
navSearch: false
navSitemap: false
navMenu: false
robots: noindex, follow
---

OctoAI is a Alpha feature currently under development to integrate AI functionality into the Octopus user interface. The goal of OctoAI is:

* To support new Octopus users as they get started with the platform
* To guide teams with large existing Octopus spaces with best practices and suggestions to optimize and scale their Octopus usage

:::div{.warning}
The OctoAI Alpha is a feature released to an audience who has opted-in to provide feedback. The feature is not finished or fully tested. It may not be supported through regular channels. It may change drastically or may never ship.
:::

![OctoAI Screenshot](/docs/administration/octoai/octoai.png)

## What can I do with OctoAI?

* Onboard new DevOps teams to Octopus with prompts like `What is an Octopus Runbook?`
* Generate Terraform configuration for the Octopus Terraform provider with prompts like `Generate a Terraform module that creates 3 environments called "Development", "Test", and "Production"`
* Optimize your Octopus space with prompts like `Check the space for unused projects` and `Find unused variables in the project.`
* Debug failed deployments with prompts like `Why did the deployment fail?`

## We want your feedback!

We are looking for feedback on the OctoAI feature, specifically:

* What prompts do you want the service to respond to?
* What would you change about the service?
* Have the responses been helpful?

As part of the Alpha, we will invite you to a private channel in the [Octopus Community Slack](https://octopus.com/community) where you can provide feedback.

## Getting started with OctoAI

OctoAI has the following prerequisites:

* An Octopus instance, either
  * A cloud instance
  * An on-premises Octopus instance with a hostname accessible from the OctoAI service (more on this requirement below)
* Google Chrome

OctoAI is delivered via a Chrome extension which is available from the [Chrome Store](https://chromewebstore.google.com/detail/octoai/acpcjpmjmbdmfabgdpdkiaadnbkcgfon). Once the extension is installed, you will see a new icon in the top right corner of your Chrome browser. Click on the icon to open the OctoAI interface.

## Using OctoAI with an on-premises Octopus instance

OctoAI is implemented as an Azure Function. The function must be able to call the Octopus API.

On-premises Octopus instances must allow HTTP requests from the IP addresses found in the [Azure IP Ranges and Service Tags – Public Cloud](https://www.microsoft.com/en-us/download/details.aspx?id=56519) JSON file under the item named `AzureCloud.eastus`  in order to integrate with the OctoAI backend. These IP addresses represent the possible addresses that the OctoAI may use when making API requests to an Octopus instance.

This is the relevant [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-functions/ip-addresses?tabs=portal#find-outbound-ip-addresses):

> When a function app that runs on the Consumption plan or the Premium plan is scaled, a new range of outbound IP addresses may be assigned. When running on either of these plans, you can't rely on the reported outbound IP addresses to create a definitive allowlist. To be able to include all potential outbound addresses used during dynamic scaling, you'll need to add the entire data center to your allowlist.

:::div{.warning}
It is not possible to integrate OctoAI with an on-premises Octopus instance that can not accept HTTP requests from these public IP addresses.
:::

## FAQ

Q: What data is collected?

A: We collect prompts entered into OctoAI. All logs are sanitized to remove personally identifiable information. We do not log:
* Prompt responses
* Sensitive values
* Octopus configurations

Q: Is my data used to train AI models?

A: No, we do not train AI models on customer data. We use the Azure OpenAI platform, and [Azure does not use customer data to train models either](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy?tabs=azure-portal).

Q: How do I turn off OctoAI?

A: Disabling or uninstalling the Chrome extension will disable OctoAI.

Q: How much does the service cost?

A: The service is free during the Alpha phase.

Q: How secure is the service?

A: OctoAI is implemented as an external service that accesses Octopus via the API. This means OctoAI does not have access to any sensitive values, as the API never exposes sensitive values. It also means access to the Octopus instance is limited by the existing permissions of the current user. Additionally, OctoAI shares the same backend as the Octopus Copilot Extension, which has been audited by an independent external security team. The report is available via the [trust center](https://trust.octopus.com/).

Q: Can I see the source code?

A: Yes. The OctoAI backend source code is available from [GitHub](https://github.com/OctopusSolutionsEngineering/OctopusCopilot).

Q: Do I need to sign up for an account?

A: No, OctoAI is self-contained and only requires access to an Octopus instance.

Q: Is OctoAI a supported service?

A: No, the OctoAI Alpha is not subject to any existing SLAs or support agreements. It is an experimental feature that may not be supported through regular channels. It may change drastically or may never ship.