---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-06-18
title: How to Create an API Key
description: How to create an API key to interact with Octopus without the need for a username and password.
navOrder: 10
---

API keys allow you to access the Octopus Deploy [REST API](/docs/octopus-rest-api) and perform tasks such as creating and deploying releases. API keys can be saved in scripts or external tools, without having to use your username and password. Each user and service account can have multiple API keys.

See the [Service Accounts docs](/docs/security/users-and-teams/service-accounts) for information about creating service accounts.

## Creating an API Key

[Getting Started - API Keys](https://www.youtube.com/watch?v=f3-vRjpB0cE)

You can create API keys by performing the following steps:

1. Log into the Octopus Web Portal, click your profile image and select **Profile**.
1. Click **My API Keys**.
1. Click **New API key**, state the purpose of the API key.
1. Choose the level of **Access** to grant (see below).
1. Click **Generate new**.
1. Copy the new API key to your clipboard.

:::div{.warning}
**Write Your Key Down**
After you generate an API key, it cannot be retrieved from the Octopus Web Portal again, we store only a one-way hash of the API key. If you want to use the API key again, you need to store it in a secure place such as a password manager. Read about [why we hash API keys](https://octopus.com/blog/hashing-api-keys).
:::

## Choosing an access level

:::div{.hint}

This feature is currently being rolled out to Octopus Cloud customers and will become available to self-hosted installations in Octopus Server 2026.3.

If you don't see the access option when creating an API key, the API key will be created with full access and have the same permissions as your user account.

:::

Recent versions of Octopus Server add the ability to limit the scope of an API key, to allow only read-only access. Alternatively, you can grant the API key full access to give it the same permissions as your user account. Use the **Preview Permissions** link to see the exact list of permissions that apply to the chosen access level.

Read-only scopes are useful for tooling that doesn't need to be able to make changes, perform actions or trigger deployments, such as AI agents (like Claude Code) or for external monitoring systems (like release progression dashboards).

Note that it is not possible to create an API key with more permissions than your user account. For these scenarios, you should look at creating an API key under a dedicated [Service Account](/docs/security/users-and-teams/service-accounts) instead. Use this approach for tooling that is not acting on behalf of a particular user.

## Setting an expiry date

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

## Disabling API key creation for user accounts

:::div{.hint}
The ability to disable API key creation for user accounts was added in Octopus Deploy **2023.2**.
:::

Octopus administrators can disable the creation of API keys for regular user accounts. Existing API keys will continue to function, and new API keys can still be created for [Service Accounts](/docs/security/users-and-teams/service-accounts).

To change the value in the Octopus Web Portal:

1. Navigate to **Configuration ➜ Settings** and click **Authentication**.
1. Expand the section for **User API Keys** and alter the value.
1. Click Save.
