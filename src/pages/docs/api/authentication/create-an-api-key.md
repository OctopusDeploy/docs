---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-10-09
title: Create an API Key
description: How to create an API key to interact with Octopus without the need for a username and password.
navOrder: 10
---

API keys let you access the Octopus Deploy [REST API](/docs/octopus-rest-api) and perform tasks such as creating and deploying releases. You can save API keys in scripts or external tools, without having to use your username and password. Each user and service account can have multiple API keys.

See the [Service Accounts docs](/docs/security/users-and-teams/service-accounts) for information about creating service accounts.

<a id="creating-an-agent-api-key"></a>

## Creating an API Key {#creating-an-api-key}

You can create API keys by performing the following steps:

1. Log into the Octopus Web Portal, click your profile image and select **Profile**.
1. Click **My API Keys**.
1. Click **New API key**, then state the name or purpose of the API key.
1. Choose an expiry date for the key.
1. Choose whether the key will be used by an AI Agent (such as the [Octopus MCP server](/docs/octopus-ai/mcp)) or another tool. Agent keys are tagged throughout Octopus so you can filter for and audit agent activity separately from human activity.
1. Choose the level of **Access** to grant (see below).
1. Click **Create API Key**.
1. Copy the new API key to your clipboard.

:::div{.warning}
**Write Your Key Down**
After you generate an API key, you can't retrieve it from the Octopus Web Portal again, because we store only a one-way hash of the API key. If you want to use the API key again, you need to store it in a secure place such as a password manager. Read about [why we hash API keys](https://octopus.com/blog/hashing-api-keys).
:::

## Choosing an access level {#choosing-an-access-level}

:::figure
![The Access level options: Read-only, Custom, and Full access](/docs/img/api/authentication/api-key-access-level.png)
:::

Recent versions of Octopus Server let you limit an API key to read-only access, or define custom access scopes for it. We're rolling these features out gradually, so they might not be available on your Octopus instance yet.

Read-only scopes are useful for tooling that doesn't need to be able to make changes, perform actions or trigger deployments, such as AI agents (like Claude Code) or for external monitoring systems (like release progression dashboards).

Custom scopes are useful for tooling that needs to make changes, but only in specific areas. You can add one or more access scopes to an API key, each granting the user roles you choose in specific spaces, projects, and environments. For example, one access scope can grant read-only access to your Production environment, while a second lets the key make changes in Development. See [Defining custom access scopes](#custom-access-scopes) below.

Alternatively, you can grant the API key full access to give it the same permissions as your user account. Any existing API keys created before the access level options were added to Octopus Server have full access.

:::div{.hint}
You can't create an API key with more permissions than your user account. If your tooling needs more permissions, or doesn't act on behalf of a particular user, create the API key under a dedicated [Service Account](/docs/security/users-and-teams/service-accounts) instead.
:::

## Defining custom access scopes {#custom-access-scopes}

:::figure
![An access scope with Space roles selected, a searchable list of roles, and the option to add spaces](/docs/img/api/authentication/api-key-access-scopes.png)
:::

When you choose the **Custom** access level, you can add one or more access scopes to the API key. Each access scope has:

- A name. For example, "Read-only access to the corporate website in Development".
- A role type, either **Space** or **System**. System roles apply across all spaces. An access scope can only contain one type of role, so if your API key needs both types, add a separate access scope for each.
- One or more spaces for the user roles to apply to. Select **All space permissions** to give the API key the same access to the selected spaces as the user who owns it.
- The projects, environments, or both, that the API key can access in each space.

:::div{.warning}
You can't change an API key after you create it. To change the permissions later, create a new API key.
:::

## Setting an expiry date

:::figure
![The Details section, with the Name field and the Expiry dropdown set to 180 days (default)](/docs/img/api/authentication/api-key-details.png)
:::

:::div{.hint}
The ability to set an expiry date on new API keys was added in Octopus Deploy **2020.6**.
:::
By default, new API keys are valid for 180 days from the point they are created.

When creating an API key in the Octopus Web Portal, you can choose from a preset list of offsets from the current date, or select a custom date. Keys will expire at the end of the selected day. When using the Octopus REST API to create a key, you can set the expiry date to your preferred date and time, including time zone offset.

There are three restrictions on the expiry date:

- It cannot be in the past.
- It cannot be after the expiry date of the key being used to create it (when using the REST API).
- **Octopus Deploy 2025.4 and newer:** It cannot exceed the server's configured maximum expiry period (defaults to 366 days, configurable)

## Configure API keys for expiry notifications

[Octopus Subscriptions](/docs/administration/managing-infrastructure/subscriptions) can be used to configure notifications when API keys are close to expiry or have expired.

There is an "API key expiry events" event-group and three events:

- API key expiry 20-day warning.
- API key expiry 10-day warning.
- API key expired.

:::div{.info}

The background task which raises the api-key-expiry events runs:

- 10 minutes after the Octopus Server service starts
- Every 4 hours

:::

## Configuring API Key default and maximum expiry durations

:::div{.hint}
The ability to control the default and maximum API key expiry was added in Octopus Deploy **2025.4**. The ability to create keys that never expire was removed in this version.

Versions 2025.3 and below will use a default expiry of 180 days and have no maximum.
:::

Octopus administrators can change the maximum API key expiry from 366 days to a value of their choice, up to 1096 days.

Octopus administrators can change the default API key expiry from 180 days to a value of their choice. The default period must be less than or equal to the maximum.

To change these values in the Octopus Web Portal:

1. Navigate to **Configuration ➜ Settings** and click **Authentication**.
1. Expand the sections for **API Key default expiry (days)** and **API Key maximum expiry (days)** and alter the values.
1. Click Save.

## Managing API keys

Octopus administrators can view all API keys across the instance from the **API Keys** page.

### Identifying key types

Each key's row shows an **API key type** column with a type tag—**User**, or **AI Agent**—so you can tell at a glance which kind of identity each key belongs to.

### Filtering by agent

Check **AI Agents** to filter the list to agent keys only. This is useful when you want to review the credentials your agents are using without wading through keys belonging to human users.

### Last used

The list shows when each key was last used. Use this to spot dormant credentials that may need rotating.

### Viewing permissions

Each row has an overflow menu. Select **View permissions** to open the Test Permissions page for that identity, so you can see exactly what the key can do.

## Disabling API key creation for user accounts

:::div{.hint}
The ability to disable API key creation for user accounts was added in Octopus Deploy **2023.2**.
:::

Octopus administrators can disable the creation of API keys for regular user accounts. Existing API keys will continue to function, and new API keys can still be created for [Service Accounts](/docs/security/users-and-teams/service-accounts).

To change the value in the Octopus Web Portal:

1. Navigate to **Configuration ➜ Settings** and click **Authentication**.
1. Expand the section for **User API Keys** and alter the value.
1. Click Save.
