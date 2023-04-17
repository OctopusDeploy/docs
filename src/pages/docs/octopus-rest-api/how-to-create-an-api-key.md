---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: How to Create an API Key
description: How to create an API key to interact with Octopus without the need for a username and password.
navOrder: 10
---

API keys allow you to access the Octopus Deploy [REST API](/docs/octopus-rest-api/) and perform tasks such as creating and deploying releases. API keys can be saved in scripts or external tools, without having to use your username and password. Each user and service account can have multiple API keys.

See the [Service Accounts docs](/docs/security/users-and-teams/service-accounts/) for information about creating service accounts.

## Creating an API Key {#HowtocreateanAPIkey-CreatinganAPIkey}

<iframe width="560" height="315" src="https://www.youtube.com/embed/f3-vRjpB0cE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can create API keys by performing the following steps:

1. Log into the Octopus Web Portal, click your profile image and select **Profile**.
1. Click **My API Keys**.
1. Click **New API key**, state the purpose of the API key and click **Generate new**.
1. Copy the new API key to your clipboard.

:::warning
**Write Your Key Down**
After you generate an API key, it cannot be retrieved from the Octopus Web Portal again, we store only a one-way hash of the API key. If you want to use the API key again, you need to store it in a secure place such as a password manager. Read about [why we hash API keys](https://octopus.com/blog/hashing-api-keys).
:::

## Setting an expiry date

:::hint
The ability to set an expiry date on new API keys was added in Octopus Deploy **2020.6**.
:::

You can optionally set an expiry date on new API keys. By default, keys have no expiry date and are valid until they're revoked.

When creating an API key in the Octopus Web Portal, you can choose from a preset list of offsets from the current date, or select a custom date. Keys will expire at the end of the selected day. When using the Octopus REST API to create a key, you can set the expiry date to your preferred  date and time, including time zone offset.

There are two restrictions on the expiry date:

- It cannot be in the past.
- It cannot be after the expiry date of the key being used to create it (when using the REST API).

## Configure API keys for expiry notifications

[Octopus Subscriptions](/docs/administration/managing-infrastructure/subscriptions/) can be used to configure notifications when API keys are close to expiry or have expired.

There is an "API key expiry events" event-group and three events:

- API key expiry 20-day warning.
- API key expiry 10-day warning.
- API key expired.

:::info
The background task which raises the api-key-expiry events runs:
- 10 minutes after the Octopus Server service starts
- Every 4 hours
:::

## Disabling API Key Creation {#HowtocreateanAPIkey-DisablingAPIKeyCreation}
:::hint
The ability to disable API key creation for user accounts was added in Octopus Deploy **2023.2**.
:::

Octopus administrators can disable the creation of API keys for regular user accounts. Existing API keys will continue to function, and new API keys can still be created for [Service Accounts](/docs/security/users-and-teams/service-accounts/).

You can disable API keys by performing the follow steps:
1. Log into the Octopus Web Portal, navigate to **{{Configuration,Settings}}**.
1. Click **Authentication**
1. Click **User API Keys**.
1. Uncheck the **User API Keys** checkbox.
1. Click **SAVE**.