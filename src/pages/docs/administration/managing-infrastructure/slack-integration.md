---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-07-06
title: Slack integration
description: Connect a Slack workspace to Octopus Deploy to send subscription notifications and deployment messages to Slack channels.
navOrder: 1700
---

Connecting a Slack workspace to Octopus lets you send subscription events and deployment notifications to Slack channels. Once connected, you can:

- Configure [subscriptions](/docs/administration/managing-infrastructure/subscriptions) to post event digests to channels.
- Add a [Send a Slack Message](/docs/projects/built-in-step-templates/send-slack-message) step to your deployment or runbook processes.

Slack integration is available from Octopus Server version `2026.3.1827`.

## Prerequisites

You need permission to install apps in your Slack workspace. If you don't have this permission, ask a Slack workspace owner or admin to complete the setup.

## Connect Octopus to Slack {#slack-integration-connect}

To connect Octopus to Slack, navigate to **Configuration ➜ Settings ➜ Slack integration** and click **Add Slack Connection**. The wizard in Octopus will walk you through the steps outlined below.

### 1. Create your Slack app

Octopus generates a JSON app manifest pre-configured with the correct redirect URL and OAuth scopes. The wizard displays this manifest for you to copy.

In a new tab, go to [Slack API Apps](https://api.slack.com/apps) and:

1. Click **Create New App**.
2. Choose **From an app manifest**.
3. Select your workspace.
4. Paste the manifest Octopus generated and click **Next**, then **Create**.

:::div{.hint}
The manifest uses your Octopus server's public address as the OAuth redirect URL. If the URL shown in the manifest doesn't match the address users access Octopus at, update the `redirect_urls` value before pasting. You can configure the public URL under **Configuration ➜ Nodes**.
:::

Once you've created the Slack app, return to Octopus and click **I Created The App**.

### 2. Add credentials

In your new Slack app, go to **Basic Information** and copy the **Client ID** and **Client Secret**. Paste these into Octopus and click **Save And Continue**.

### 3. Authorize Octopus in Slack

Click **Open Slack To Authorize**. This opens Slack's OAuth consent page in a new tab. Review the requested scopes and click **Allow**.

Once you approve, Octopus detects the connection automatically and moves to the next step.

#### Scopes

Octopus requests the following scopes when authorizing:

| Scope | Purpose |
| ----- | ------- |
| `chat:write` | Post messages as Octopus |
| `chat:write.public` | Post in channels not invited |
| `channels:read` | List public channels |
| `groups:read` | List private channels invited to |
| `team:read` | Read workspace name |
| `users:read` | Read the bot user's display name |

### 4. Confirm the connection

Your workspace is now connected. You can optionally send a test message to `#general` to confirm everything is working before finishing.

:::figure
![The Slack integration page showing a connected workspace with scopes and a test message option.](/docs/img/administration/managing-infrastructure/slack-integration/images/slack-integration-connected.png)
:::

## Test the connection {#slack-integration-test}

After connecting, you can send a test message at any time from **Configuration ➜ Settings ➜ Slack integration**. Select a channel and click **Send Test Message**. Octopus posts a short message to the selected channel so you can confirm the bot is working.

## Public and private channels {#slack-integration-channels}

By default the Slack app can post to any public channel in your workspace without needing to be invited.

For private channels, you will need to type the name of the channel when selecting which channel to post to. The Slack app must be a member of the channel. See the [Slack documentation on apps](https://slack.com/help/articles/360001537467-Guide-to-apps-in-Slack) for instructions on adding the app to a channel.

## Disconnect {#slack-integration-disconnect}

To disconnect the Slack integration, go to **Configuration ➜ Settings ➜ Slack integration** and click **Disconnect**. This removes the stored credentials and OAuth token. You can reconnect at any time by running the wizard again.

## What's next

- [Subscriptions](/docs/administration/managing-infrastructure/subscriptions): configure Octopus to post event digests to Slack channels.
- [Send a Slack Message step](/docs/projects/built-in-step-templates/send-slack-message): post messages to Slack as part of a deployment or runbook process.
