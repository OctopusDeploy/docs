---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-07-06
title: Send a Slack Message step
description: Send a Slack Message steps let you post messages to Slack channels as part of a deployment or runbook process.
navOrder: 20
---

The Send a Slack Message step posts a message to one or more Slack channels during a deployment or runbook run. You can use it to notify your team when a deployment succeeds or fails, or at any point in your deployment process.

The Send a Slack Message step is available from Octopus Server version `2026.3.5228`.

You can add this step to a process at any time. If a Slack workspace isn't connected yet, the step editor shows a prompt to set one up. See [Slack integration](/docs/administration/managing-infrastructure/slack-integration) for instructions.

:::figure
![The Send a Slack Message step editor showing channel selection and message fields.](/docs/img/projects/built-in-step-templates/images/send-slack-message-step.png)
:::

## Add the step

1. Navigate to your project's deployment process and click **Add step**.
2. Search for and select **Send a Slack Message**.
3. Give the step a short memorable name.
4. Select one or more **Channels** to post to. For more information on what channels the Slack app can post to, see [public and private channels](/docs/administration/managing-infrastructure/slack-integration#slack-integration-channels).
5. Enter the **Message** to post.
6. Set conditions to determine when the step runs.
7. Save the deployment process.

## Message formatting {#send-slack-message-formatting}

The message field supports [Slack markdown formatting](https://api.slack.com/reference/surfaces/formatting) and [Octopus variable substitution](/docs/projects/variables/variable-substitutions).

### Example

```text
#{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name} has #{if Octopus.Deployment.Error}failed#{else}completed successfully#{/if}. <#{Octopus.Web.ServerUri}#{Octopus.Web.DeploymentLink}|View deployment>
```

:::div{.hint}
See [system variables](/docs/projects/variables/system-variables) for the full list of variables available during a deployment.
:::
