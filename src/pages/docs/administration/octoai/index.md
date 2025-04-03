---
layout: src/layouts/Default.astro
pubDate: 2025-04-04
modDate: 2025-04-04
title: OctoAI
description: How to use OctoAI
navOrder: 100
hideInThisSection: true
---

OctoAI is a Alpha feature currently under development that integrates AI functionality into the Octopus user interface. The goal of OctoAI is:

* To support new Octopus users as they get started with the platform
* To guide teams with large existing Octopus spaces with best practices and suggestions to optimize and scale their Octopus usage

:::div{.warning}
The OctoAI Alpha is a feature released to an audience who has opted-in to provide feedback. The feature is not finished or fully tested. It may not be supported through regular channels. It may change drastically or may never ship.
:::

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

On-premises Octopus instances must allow HTTP requests from the IP addresses listed in [this file](https://github.com/OctopusSolutionsEngineering/OctopusCopilot/blob/main/outboundips.txt) in order to integrate with the OctoAI backend. These IP addresses represent the possible addresses that the Octopus Copilot Extension may use when making API requests to an Octopus instance.

:::div{.warning}
It is not possible to integrate the Octopus Copilot Extension with an on-premises Octopus instance that can not accept HTTP requests from these public IP addresses.
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