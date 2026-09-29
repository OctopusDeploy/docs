---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-09-29
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
5. Optionally, enter a **Title** to show as a heading above the message.
6. Choose a **Message format** and enter the message to post. See [message formatting](#send-slack-message-formatting) and [Block Kit messages](#send-slack-message-block-kit).
7. Set conditions to determine when the step runs.
8. Save the deployment process.

## Message formatting {#send-slack-message-formatting}

With the **Plain text** message format, the message field supports [Slack markdown formatting](https://api.slack.com/reference/surfaces/formatting) and [Octopus variable substitution](/docs/projects/variables/variable-substitutions).

### Example

```text
#{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name} has #{if Octopus.Deployment.Error}failed#{else}completed successfully#{/if}. <#{Octopus.Web.ServerUri}#{Octopus.Web.DeploymentLink}|View deployment>
```

:::div{.hint}
See [system variables](/docs/projects/variables/system-variables) for the full list of variables available during a deployment.
:::

## Block Kit messages {#send-slack-message-block-kit}

Select the **Block Kit** message format to post a message built from [Slack Block Kit](https://api.slack.com/block-kit) blocks, such as sections, buttons, and dividers.

Enter the `blocks` array only. If you design your message in [Block Kit Builder](https://app.slack.com/block-kit-builder), copy the value of the `blocks` property, not the whole message.

The payload must be a non-empty JSON array, every block needs a string `type`, and Slack allows at most 50 blocks per message. Octopus checks this when you save the deployment process.

If you enter a **Title**, Octopus adds it as a header block above your blocks, so it counts towards the 50-block limit. Titles are plain text and are truncated at 150 characters.

The payload supports [Octopus variable substitution](/docs/projects/variables/variable-substitutions). Variables that can contain quotes or newlines, such as release notes, should use the [`JsonEscape` filter](/docs/projects/variables/variable-filters) so they don't break the JSON. When the payload contains a variable, Octopus can't validate it until the deployment runs, so problems are reported then.

### Example

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*#{Octopus.Project.Name}* #{Octopus.Release.Number} to #{Octopus.Environment.Name} has #{if Octopus.Deployment.Error}failed#{else}completed successfully#{/if}."
    }
  },
  {
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "text": { "type": "plain_text", "text": "View deployment" },
        "url": "#{Octopus.Web.ServerUri}#{Octopus.Web.DeploymentLink}"
      }
    ]
  }
]
```
