---
layout: src/layouts/Default.astro
pubDate: 2025-07-09
modDate: 2025-07-09
title: Custom prompts
description: 
navOrder: 50
---

Custom prompts allow you to tailor the Octopus AI Assistant to your organization's specific needs and business processes. Instead of relying solely on the AI's general knowledge, you can embed your internal documentation, troubleshooting procedures, and domain-specific guidance directly into the assistant's responses.

## Why use custom prompts?

Custom prompts are particularly valuable for:

- Platform teams providing self-service support to development teams with organization-specific guidance
- Embedding internal documentation and troubleshooting procedures into AI responses
- Standardizing responses across teams with consistent, approved solutions
- Reducing support burden by providing context-aware, automated first-line support

For example, instead of getting generic advice about deployment failures, a custom prompt can direct users to your internal runbooks, specific team contacts, or approved remediation procedures.

## How custom prompts work

Custom prompts are defined using Library Variable Sets in Octopus Deploy and work alongside the AI's built-in knowledge. When a user interacts with the Octopus AI Assistant on a specific page, any custom prompts configured for that page will appear as suggested options.

There are two types of custom prompt variables:

- **Prompt variables** (`PageName[#].Prompt`) - The text displayed to users and sent to the AI
- **System prompt variables** (`PageName[#].SystemPrompt`) - Optional additional instructions that guide the AI's response but aren't shown to users

## Adding custom prompts to Octopus

To add custom prompts to your Octopus AI Assistant:

1. Open the Octopus Deploy web portal
2. On the main page for the space, click **Variable Sets**
3. Click **Add Variable Set**
4. Enter `Octopus AI Assistant Prompts` for the variable set name
5. Add variables in the new variable set using the naming convention below

### Variable naming convention

Variables must follow this format:

- `PageName[#].Prompt` - The prompt displayed in the UI and passed to the LLM
- `PageName[#].SystemPrompt` - Optional additional prompt instructions passed to the LLM but not shown in the UI

Where:

- `PageName` is one of the supported Octopus Deploy page names (see [Supported pages table](#supported-pages) below)
- `#` is a number from 0 to 4 inclusive for up to 5 prompts per page

For example:

- `Project.Deployment[0].Prompt` - A prompt displayed in the Octopus AI Assistant when viewing a project deployment
- `Project.Deployment[0].SystemPrompt` - The system prompt for that deployment prompt

## Writing custom prompts

### Basic prompt structure

A basic prompt variable defines what users see and what gets sent to the AI. For example:

| Variable name | Variable value |
|----------|-------|
| `Project.Deployment[0].Prompt` | Why did the deployment fail? If the deployment didn't fail, say so. Provide suggestions for resolving the issue. |

This prompt relies on the AI's built-in knowledge and the deployment context (logs, process configuration, etc.) to provide an answer.

### Adding system prompts for business context

System prompts allow you to embed your organization's specific knowledge and procedures. The system prompt guides the AI's response without being visible to users.

For example:

| Variable name | Variable value |
|----------|-------|
| `Project.Deployment[0].SystemPrompt` | If the logs indicate that a Docker image is missing, You must only provide the suggestion that the user must visit <https://help/missingdocker> to get additional instructions to resolve missing docker containers. You will be penalized for offering generic suggestions to resolve a missing docker image. You will be penalized for offering script suggestions to resolve a missing docker image. You will be penalized for suggesting step retries to resolve a missing docker image. |

This system prompt is sent to the LLM to provide specific instructions on how to respond to the request, and:

- Detects a specific condition (missing Docker image)
- Provides organization-specific guidance (internal documentation link)
- Prevents generic responses that don't align with your procedures

## Supported pages

The following table shows all the pages where custom prompts can be configured. Each page corresponds to a specific area of the Octopus web interface, allowing you to provide targeted assistance based on what users are currently viewing.

| Page Name | Description |
|-----------|-------------|
| Dashboard | The main dashboard |
| Tasks | The tasks overview |
| Project | The project dashboard |
| Project.Settings | The project settings |
| Project.VersionControl | The project version control settings |
| Project.ITSMProviders | The project ITSM settings |
| Project.Channels | The project channels |
| Project.Triggers | The project triggers |
| Project.Process | The project deployment process editor |
| Project.Step | An individual step in the deployment process editor |
| Project.Variables | The project variables editor |
| Project.AllVariables | The overview of all the project variables |
| Project.PreviewVariables | The preview of all the project variables |
| Project.VariableSets | The project library variable sets |
| Project.TenantVariables | The project tenant variables |
| Project.Operations | The project runbooks dashboard |
| Project.Operations.Triggers | An runbook triggers |
| Project.Deployment | The project deployments |
| Project.Release | The project releases |
| Project.Runbooks | The project runbooks |
| Project.Runbook.Runbook | An individual runbook |
| Project.Runbook.Run | A runbook run |
| LibraryVariableSets | The library variable sets |
| LibraryVariableSet.LibraryVariableSet | An individual library variable set |
| Machines | The targets dashboard |
| Machine.Machine | An individual target |
| Accounts | The accounts dashboard |
| Account.Account | An individual account |
| Workers | The workers dashboard |
| WorkerPools | The workerpool dashboard |
| MachinePolicies | An machine policies dashboard |
| MachineProxies | An machine proxies dashboard |
| Feeds | The feeds dashboard |
| GitCredentials | The git credentials dashboard |
| GitConnections | The GitHub App dashboard |
| Lifecycles | The lifecycles dashboard |
| Packages | The built-in feed dashboard |
| ScriptModules | The script modules dashboard |
| StepTemplates | The step templates dashboard |
| TagSets | The tag sets dashboard |
| TagSets.TagSet | An individual tag set |
| Tenants | The tenants dashboard |
| Tenant.Tenant | An individual tenant |
| Certificates | The certificates dashboard |
| Environments | The environments dashboard |
| Environment.Environment | An individual environment |
| Infrastructure | The infrastructure dashboard |
| BuildInformation | The build information dashboard |
