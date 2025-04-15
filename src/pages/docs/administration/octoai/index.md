---
layout: src/layouts/Default.astro
pubDate: 2025-04-04
modDate: 2025-04-14
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

- To support new Octopus users as they get started with the platform
- To guide teams with large existing Octopus spaces with best practices and suggestions to optimize and scale their Octopus usage

:::div{.warning}
The OctoAI Alpha is a feature released to an audience who has opted-in to provide feedback. The feature is not finished or fully tested. It may not be supported through regular channels. It may change drastically or may never ship.
:::

![OctoAI Screenshot](/docs/administration/octoai/octoai.png)

## What can I do with OctoAI?

- Onboard new DevOps teams to Octopus with prompts like `What is an Octopus Runbook?`
- Generate Terraform configuration for the Octopus Terraform provider with prompts like `Generate a Terraform module that creates 3 environments called "Development", "Test", and "Production"`
- Optimize your Octopus space with prompts like `Check the space for unused projects` and `Find unused variables in the project.`
- Debug failed deployments with prompts like `Why did the deployment fail?`

## We want your feedback!

We are looking for feedback on the OctoAI feature, specifically:

- What prompts do you want the service to respond to?
- What would you change about the service?
- Have the responses been helpful?

As part of the Alpha, we will invite you to a private channel in the [Octopus Community Slack](https://octopus.com/community) where you can provide feedback.

## Getting started with OctoAI

OctoAI has the following prerequisites:

- An Octopus instance, either
  - A cloud instance
  - An on-premises Octopus instance with a hostname accessible from the OctoAI service (more on this requirement below)
- Google Chrome

OctoAI is delivered via a Chrome extension which is available from the [Chrome Store](https://chromewebstore.google.com/detail/octoai/acpcjpmjmbdmfabgdpdkiaadnbkcgfon). Once the extension is installed, you will see a new icon in the top right corner of your Chrome browser. Click on the icon to open the OctoAI interface.

## Using OctoAI with an on-premises Octopus instance

OctoAI is implemented as an Azure Function. The function must be able to call the Octopus API.

On-premises Octopus instances must allow HTTP requests from the IP address `51.8.40.170`.

:::div{.warning}
It is not possible to integrate OctoAI with an on-premises Octopus instance that can not accept HTTP requests from this public IP address.
:::

## Adding custom prompts

OctoAI will present custom prompts defined in a Library Variable Set called `OctoAI Prompts`. The Library Variable set contains variables named:

- `PageName[#].Prompt` - The prompt displayed in the UI and passed to the LLM
- `PageName[#].SystemPrompt` - Additional prompt instructions passed to the LLM but not shown in the UI

Where:

- `PageName` is one of the pages listed in the table below
- `#` is a number from 0 to 4 inclusive for up to 5 prompts per page

For example:

- `Project.Deployment[0].Prompt` - A prompt displayed when a project deployment is viewed
- `Project.Deployment[0].SystemPrompt` - The system prompt passed to the LLM when the project deployment is viewed

| Page Name                               | Description                                         |
|-----------------------------------------|-----------------------------------------------------|
| `Dashboard`                             | The main dashboard                                  |
| `Tasks`                                 | The tasks overview                                  |
| `Project`                               | The project dashboard                               |
| `Project.Settings`                      | The project settings                                |
| `Project.VersionControl`                | The project version control settings                |
| `Project.ITSMProviders`                 | The project ITSM settings                           |
| `Project.Channels`                      | The project channels                                |
| `Project.Triggers`                      | The project triggers                                |
| `Project.Process`                       | The project deployment process editor               |
| `Project.Step`                          | An individual step in the deployment process editor |
| `Project.Variables`                     | The project variables editor                        |
| `Project.AllVariables`                  | The overview of all the project variables           |
| `Project.PreviewVariables`              | The preview of all the project variables            |
| `Project.VariableSets`                  | The project library variable sets                   |
| `Project.TenantVariables`               | The project tenant variables                        |
| `Project.Operations`                    | The project runbooks dashboard                      |
| `Project.Operations.Triggers`           | An runbook triggers                                 |
| `Project.Deployment`                    | The project deployments                             |
| `Project.Release`                       | The project releases                                |
| `Project.Runbooks`                      | The project runbooks                                |
| `Project.Runbook.Runbook`               | An individual runbook                               |
| `Project.Runbook.Run`                   | A runbook run                                       |
| `LibraryVariableSets`                   | The library variable sets                           |
| `LibraryVariableSet.LibraryVariableSet` | An individual library variable set                  |
| `Machines`                              | The targets dashboard                               |
| `Machine.Machine`                       | An individual target                                |
| `Accounts`                              | The accounts dashboard                              |
| `Account.Account`                       | An individual account                               |
| `Workers`                               | The workers dashboard                               |
| `WorkerPools`                           | The workerpool dashboard                            |
| `MachinePolicies`                       | An machine policies dashboard                       |
| `MachineProxies`                        | An machine proxies dashboard                        |
| `Feeds`                                 | The feeds dashboard                                 |
| `GitCredentials`                        | The git credentials dashboard                       |
| `GitConnections`                        | The GitHub App dashboard                            |
| `Lifecycles`                            | The lifecycles dashboard                            |
| `Packages`                              | The built-in feed dashboard                         |
| `ScriptModules`                         | The script modules dashboard                        |
| `StepTemplates`                         | The step templates dashboard                        |
| `TagSets`                               | The tag sets dashboard                              |
| `TagSets.TagSet`                        | An individual tag set                               |
| `Tenants`                               | The tenants dashboard                               |
| `Tenant.Tenant`                         | An individual tenant                                |
| `Certificates`                          | The certificates dashboard                          |
| `Environments`                          | The environments dashboard                          |
| `Environment.Environment`               | An individual environment                           |
| `Infrastructure`                        | The infrastructure dashboard                        |
| `BuildInformation`                      | The build information dashboard                     |

## Writing custom prompts

To write a custom prompt, you need to define the prompt variable, which is in the format `PageName[#].Prompt`. The prompt variable represents what an Octopus user might write themselves when interacting with OctoAI.

You can optionally define the system prompt variable, which is in the format `PageName[#].SystemPrompt`. The system prompt variable is used to provide additional context to the LLM, usually to capture unique business knowledge. The system prompt is not shown to the user.

For example, the prompt variable `Project.Deployment[0].Prompt`, which is displayed when a project deployment is viewed, might be:

> Why did the deployment fail? If the deployment didn't fail, say so. Provide suggestions for resolving the issue.

On its own, this prompt variable relies on the knowledge built into the LLM to provide an answer based on the context. The context for a project deployment is:

- The deployment logs
- The deployment process

To improve the response, you can add a system prompt variable `Project.Deployment[0].SystemPrompt`:

> If the logs indicate that a Docker image is missing, You must only provide the suggestion that the user must visit https://help/missingdocker to get additional instructions to resolve missing docker containers. You will be penalized for offing generic suggestions to resolve a missing docker image. You will be penalized for offering script suggestions to resolve a missing docker image. You will be penalized for suggesting step retries to resolve a missing docker image.

The system prompt allows you to embed business knowledge to guide the LLM to provide a more accurate response. In this example we have instructed the LLM to determine if the deployment logs indicate that a Docker image is missing, and if so, to provide a custom link to internal documentation. We have also instructed the LLM to not provide generic suggestions, script suggestions, or step retries to resolve a missing docker image.

## FAQ

Q: What data is collected?

A: We collect prompts entered into OctoAI. All logs are sanitized to remove personally identifiable information. We do not log:

- Prompt responses
- Sensitive values
- Octopus configurations

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
