---
layout: src/layouts/Default.astro
pubDate: 2026-09-17
modDate: 2026-09-17
title: Microsoft Teams integration
description: Connect Microsoft Teams to Octopus Deploy so deployments and runbooks can post to Teams channels through the Octopus app.
navOrder: 1710
---

Connecting Microsoft Teams lets a [Send a Microsoft Teams Message](/docs/projects/built-in-step-templates/send-teams-message) step pick a team and channel from a list, instead of you managing a webhook URL for every channel.

Connecting is optional. A Teams webhook works on its own, and is the only way to reach a private channel.

Microsoft Teams integration is available from Octopus Server version `2026.4.2390`.

## Prerequisites

You need to register an application and grant admin consent in Microsoft Entra, create an Azure Bot in an Azure subscription, and upload an app to your organization's Teams app catalog. If you can't do any of these, this setup needs a Microsoft 365 or Azure administrator.

## Connect Octopus to Microsoft Teams {#teams-integration-connect}

Navigate to **Configuration ➜ Settings ➜ Microsoft Teams Integration** and click **Add Teams Connection**. The wizard walks you through the steps below, most of which happen in Microsoft's portals.

### 1. Register an app in Microsoft Entra

In the [Microsoft Entra admin center](https://entra.microsoft.com), go to **App registrations ➜ New registration** and register a single-tenant app. Octopus uses this one registration both to discover your teams and to post as a bot.

Add these under **API permissions**, then click **Grant admin consent**:

| Permission | Purpose |
| ---------- | ------- |
| `Team.ReadBasic.All` | List the teams in your tenant |
| `Channel.ReadBasic.All` | List the channels in an allowed team |
| `TeamsAppInstallation.ReadWriteForTeam.All` | Install the Octopus app into an allowed team |
| `AppCatalog.Read.All` | Confirm the app package reached your tenant's catalog |
| `Organization.Read.All` | Read the tenant name |

:::div{.warning}
Add each one under **Application permissions**, not **Delegated permissions**. Octopus posts with no signed-in user, so delegated permissions of the same name will not work.
:::

Keep the **Directory (tenant) ID** and **Application (client) ID** from the Overview page for the next step.

:::figure
![The Microsoft Entra step, listing the five application permissions Octopus requires.](/docs/img/administration/managing-infrastructure/microsoft-teams-integration/images/teams-integration-register-app.png)
:::

### 2. Add the app's credentials

Enter the tenant and client IDs, then choose how Octopus authenticates:

- **Client secret**: create one under **Certificates & secrets ➜ Client secrets** and paste it. Microsoft shows the value only once, so copy it before leaving the page. Secrets expire and must be replaced.
- **OpenID Connect**: add the issuer and subject Octopus shows, plus the audience, under **Certificates & secrets ➜ Federated credentials ➜ Other issuer**. The subject must match exactly. Nothing expires, but Microsoft has to reach your Octopus Server for its [OpenID Connect](/docs/infrastructure/accounts/openid-connect) endpoints, so use a client secret if your server isn't reachable from the internet.

### 3. Confirm the granted permissions

Octopus checks which of the five permissions were granted and shows the tenant name it read back. If consent hasn't propagated yet, click **Re-check**.

### 4. Create the Azure Bot

Microsoft only lets a bot post into a channel, so Octopus needs one. In the [Azure portal](https://portal.azure.com), create an **Azure Bot** pointing at the registration you just made rather than letting Azure create a new one:

| Field | Value |
| ----- | ----- |
| Type of App | Single Tenant |
| Creation type | Use existing app registration |
| App ID | your Application (client) ID |
| App tenant ID | your Directory (tenant) ID |

:::div{.warning}
On the bot's **Channels** blade, add **Microsoft Teams** before continuing. Until that channel exists, uploading the app package fails with a bare "Bad Request" that names no cause.
:::

Leave the messaging endpoint blank, because Octopus only sends to Teams and never receives. There's nothing to copy back into Octopus: the bot is identified by the same app ID.

:::figure
![The Azure Bot step, showing the values to enter and the warning to add the Microsoft Teams channel.](/docs/img/administration/managing-infrastructure/microsoft-teams-integration/images/teams-integration-azure-bot.png)
:::

### 5. Upload the app to Microsoft Teams

Octopus builds an app package wired to your bot. Click **Download App Package**, then upload the zip in the [Teams admin center](https://admin.teams.microsoft.com) under **Teams apps ➜ Manage apps ➜ Upload new app**. Click **Check Catalog** to confirm it arrived. A freshly published app may need administrator approval, and Microsoft can take up to 48 hours to make it visible.

:::div{.hint}
Uploading from the Teams client instead (**Apps ➜ Manage your apps ➜ Upload a custom app**) *sideloads* the app. Octopus cannot install a sideloaded app, because the catalog it reads never lists one.
:::

### 6. Choose which teams Octopus can post to

Pick the teams Octopus may use. Octopus installs its app into each one, and steps can only target channels inside them. You can change the list later.

:::div{.warning}
Removing a team uninstalls the app from it. Steps already pointing at that team's channels keep their selection and fail the next time they run, and Octopus cannot list those steps for you.
:::

:::figure
![The team selection step, showing the teams Octopus may post to.](/docs/img/administration/managing-infrastructure/microsoft-teams-integration/images/teams-integration-allowed-teams.png)
:::

### 7. Send a test message

Pick a team and channel and click **Send Test Message** to confirm the whole chain works. You can do this again at any time from **Configuration ➜ Settings ➜ Microsoft Teams Integration**.

:::figure
![The connected Microsoft Teams settings page, showing the allowed teams and the test message panel.](/docs/img/administration/managing-infrastructure/microsoft-teams-integration/images/teams-integration-test-message.png)
:::

## Channels and webhooks {#teams-integration-channels}

The [Send a Microsoft Teams Message](/docs/projects/built-in-step-templates/send-teams-message) step posts to two kinds of destination, and one step can mix them.

**Channels through the Octopus app.** Pick a team and channel from the list. There's no URL to copy or rotate, and renaming the channel in Teams won't break the step. Only standard channels appear — a bot cannot post into a private channel.

**Teams webhooks.** Paste a URL created from the channel's own **Workflows** dialog. This works whether or not you've connected the integration, and it's the only way to reach a **private channel**. The URL is a credential, so Octopus stores it as a sensitive value.

## Message content {#teams-integration-message}

A step posts either a plain text **Message** with [variable substitution](/docs/projects/variables/variable-substitutions), or an **Adaptive Card** built from card JSON for full control of the layout. See [message content](/docs/projects/built-in-step-templates/send-teams-message#send-teams-message-formatting) on the step page for examples and the rules each format follows.

## Disconnect {#teams-integration-disconnect}

Go to **Configuration ➜ Settings ➜ Microsoft Teams Integration** and click **Disconnect**. Octopus uninstalls its app from the allowed teams and clears the stored secret, reporting any team it couldn't uninstall from.

The tenant and client IDs are kept, so the page then offers **Resume Setup** rather than a fresh connection. The app package also stays in your catalog, so reconnecting doesn't mean uploading it again.

## Learn more

- [Send a Microsoft Teams Message step](/docs/projects/built-in-step-templates/send-teams-message): post messages as part of a deployment or runbook process.
- [Subscriptions](/docs/administration/managing-infrastructure/subscriptions): post event digests to Teams channels using webhooks.
