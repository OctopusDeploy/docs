---
layout: src/layouts/Default.astro
pubDate: 2025-04-04
modDate: 2025-06-30
title: Octopus AI Assistant
navTitle: Overview
navSection: Octopus AI Assistant
description: How to use Octopus AI Assistant
navOrder: 100
---


Octopus AI Assistant is a Alpha feature currently under development to integrate AI functionality into the Octopus user interface. The goal of Octopus AI Assistant is:

- To support new Octopus users as they get started with the platform
- To guide teams with large existing Octopus spaces with best practices and suggestions to optimize and scale their Octopus usage

:::div{.warning}
The Octopus AI Assistant Alpha is a feature released to an audience who has opted-in to provide feedback. The feature is not finished or fully tested. It may not be supported through regular channels. It may change drastically or may never ship.
:::

![Octopus AI Assistant Screenshot](/docs/administration/octopus-ai-assistant/octopus-ai-assistant.png)

## What can I do with Octopus AI Assistant?

- Onboard new DevOps teams to Octopus with prompts like `What is an Octopus Runbook?`
- Generate Terraform configuration for the Octopus Terraform provider with prompts like `Generate a Terraform module that creates 3 environments called "Development", "Test", and "Production"`
- Optimize your Octopus space with prompts like `Check the space for unused projects` and `Find unused variables in the project.`
- Debug failed deployments with prompts like `Why did the deployment fail?`

## We want your feedback

We are looking for feedback on Octopus AI Assistant, specifically:

- What prompts do you want the service to respond to?
- What would you change about the service?
- Have the responses been helpful?

As part of the Alpha, we will invite you to a private channel in the [Octopus Community Slack](https://octopus.com/community) where you can provide feedback.

## Getting started with Octopus AI Assistant

Octopus AI Assistant has the following prerequisites:

- An Octopus instance, either
  - A cloud instance
  - An on-premises Octopus instance with a hostname accessible from the Octopus AI Assistant service (more on this requirement below)
- Google Chrome

Octopus AI Assistant is delivered via a Chrome extension which is available from the [Chrome Store](https://oc.to/install-ai-assistant). Once the extension is installed, you will see a new icon in the top right corner of your Chrome browser. Click on the icon to open the Octopus AI Assistant interface.

## Using Octopus AI Assistant with an on-premises Octopus instance

Octopus AI Assistant is implemented as an Azure Function. The function must be able to call the Octopus API.

On-premises Octopus instances must allow HTTP requests from the IP address `51.8.40.170`.

:::div{.warning}
It is not possible to integrate Octopus AI Assistant with an on-premises Octopus instance that can not accept HTTP requests from this public IP address.
:::

## FAQ

Q: What data is collected?

A: We collect prompts entered into Octopus AI Assistant. All logs are sanitized to remove personally identifiable information. We do not log:

- Prompt responses
- Sensitive values
- Octopus configurations

Q: Is my data used to train AI models?

A: No, we do not train AI models on customer data. We use the Azure OpenAI platform, and [Azure does not use customer data to train models either](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy?tabs=azure-portal).

Q: How do I turn off Octopus AI Assistant?

A: Disabling or uninstalling the Chrome extension will disable Octopus AI Assistant.

Q: How much does the service cost?

A: The service is free during the Alpha phase.

Q: How secure is the service?

A: Octopus AI Assistant is implemented as an external service that accesses Octopus via the API. This means Octopus AI Assistant does not have access to any sensitive values, as the API never exposes sensitive values. It also means access to the Octopus instance is limited by the existing permissions of the current user. Additionally, Octopus AI Assistant shares the same backend as the Octopus Copilot Extension, which has been audited by an independent external security team. The report is available via the [trust center](https://trust.octopus.com/).

Q: Can I see the source code?

A: Yes. The Octopus AI Assistant backend source code is available from [GitHub](https://github.com/OctopusSolutionsEngineering/OctopusCopilot).

Q: Do I need to sign up for an account?

A: No, Octopus AI Assistant is self-contained and only requires access to an Octopus instance.

Q: Is Octopus AI Assistant a supported service?

A: No, the Octopus AI Assistant Alpha is not subject to any existing SLAs or support agreements. It is an experimental feature that may not be supported through regular channels. It may change drastically or may never ship.
