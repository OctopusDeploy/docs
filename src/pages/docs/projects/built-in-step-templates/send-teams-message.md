---
layout: src/layouts/Default.astro
pubDate: 2026-09-04
modDate: 2026-09-04
title: Send a Microsoft Teams Message step
description: Send a Microsoft Teams Message steps let you post messages to Microsoft Teams channels using incoming webhooks as part of a deployment or runbook process.
navOrder: 21
---

The Send a Microsoft Teams Message step can be used to post a message to a Teams channel at any point in a deployment or runbook process, for example to report the outcome of a deployment or alert your team to a failure.

The Send a Microsoft Teams Message step is available from Octopus Server version `2026.4.1197`.

Each step targets one or more channels via incoming webhooks. You'll need a webhook URL for each channel before adding the step. To create one, see [Create an Incoming Webhook](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) in the Microsoft Teams documentation.

:::figure
![The Send a Microsoft Teams Message step editor showing channel configuration and message fields.](/docs/img/projects/built-in-step-templates/images/send-teams-message-step.png)
:::

## Add the step

1. Navigate to your project's deployment process and click **Add step**.
2. Search for and select **Send a Microsoft Teams Message**.
3. Give the step a name.
4. Add one or more channels. For each, enter a display name and the incoming webhook URL. You can use an [Octopus variable](/docs/projects/variables/variable-substitutions) for the URL if you want to vary it per environment or tenant.
5. Enter the message to post.
6. Set conditions to control when the step runs.
7. Save the deployment process.

## Message content {#send-teams-message-formatting}

The message field supports [Octopus variable substitution](/docs/projects/variables/variable-substitutions).

### Example

```text
#{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name} has #{if Octopus.Deployment.Error}failed#{else}completed successfully#{/if}. [View deployment](#{Octopus.Web.ServerUri}#{Octopus.Web.DeploymentLink})
```

:::div{.hint}
See [system variables](/docs/projects/variables/system-variables) for the full list of variables available during a deployment.
:::
