---
layout: src/layouts/Default.astro
pubDate: 2026-09-04
modDate: 2026-09-17
title: Send a Microsoft Teams Message step
description: Send a Microsoft Teams Message steps let you post messages to Microsoft Teams channels as part of a deployment or runbook process.
navOrder: 21
---

The Send a Microsoft Teams Message step can be used to post a message to a Teams channel at any point in a deployment or runbook process, for example to report the outcome of a deployment or alert your team to a failure.

The Send a Microsoft Teams Message step is available from Octopus Server version `2026.4.1197`. Posting through the Octopus app and sending an Adaptive Card are available from `2026.4.2390`.

Each step targets one or more [channels](/docs/administration/managing-infrastructure/microsoft-teams-integration#teams-integration-channels), and can mix the two kinds:

- **A channel through the Octopus app**, picked from a list. This needs the [Microsoft Teams integration](/docs/administration/managing-infrastructure/microsoft-teams-integration) to be connected, and reaches standard channels only.
- **A Teams webhook**, which needs no setup in Octopus and is the only way to reach a private channel. To create one, open the channel in Teams and choose **More options ➜ Workflows**, then pick the webhook template.

:::figure
![The Send a Microsoft Teams Message step editor showing channel configuration and message fields.](/docs/img/projects/built-in-step-templates/images/send-teams-message-step.png)
:::

## Add the step

1. Navigate to your project's deployment process and click **Add step**.
2. Search for and select **Send a Microsoft Teams Message**.
3. Give the step a name.
4. Add one or more channels. If the integration is connected, pick a team and channel from the list. Otherwise, or to reach a private channel, add a webhook and enter a display name and its URL. You can use an [Octopus variable](/docs/projects/variables/variable-substitutions) for either if you want to vary it per environment or tenant.

    :::div{.hint}
    Webhook URLs are sensitive. In version-controlled projects a webhook URL must come from a [sensitive variable](/docs/projects/variables/sensitive-variables) rather than being typed in, and Octopus only accepts a variable reference there.
    :::
5. Optionally set a **Title**, shown in bold above the message.
6. Enter the message to post.
7. Set conditions to control when the step runs.
8. Save the deployment process.

## Message content {#send-teams-message-formatting}

The step posts either a plain text **Message** or an **Adaptive Card**. Both support [Octopus variable substitution](/docs/projects/variables/variable-substitutions).

### Example

```text
#{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name} has #{if Octopus.Deployment.Error}failed#{else}completed successfully#{/if}. [View deployment](#{Octopus.Web.ServerUri}#{Octopus.Web.DeploymentLink})
```

For an Adaptive Card, paste card JSON from the [Adaptive Card Designer](https://adaptivecards.io/designer) and pipe any variable that can contain quotes or newlines through `JsonEscape`, or the card won't be valid JSON when the deployment runs. Octopus sets the card's schema version to `1.4`, so design against that version. Buttons must be `Action.OpenUrl`, because the Octopus app never receives anything back from Teams.

:::div{.hint}
See [system variables](/docs/projects/variables/system-variables) for the full list of variables available during a deployment.
:::
