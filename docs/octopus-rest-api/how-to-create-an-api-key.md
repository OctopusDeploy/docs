---
title: How to Create an API Key
description: How to create an API key to interact with Octopus without the need for a username and password.
position: 7
---

API keys allow you to access the Octopus Deploy [REST API](/docs/api-and-integration/api/index.md) and perform tasks such as creating and deploying releases. API keys can be saved in scripts or external tools, without having to use your username and password. Each user and service account can have multiple API keys.

See the [Service Accounts docs](/docs/administration/managing-users-and-teams/service-accounts.md) for information about creating service accounts.

## Creating an API Key {#HowtocreateanAPIkey-CreatinganAPIkey}

You can create API keys by performing the following steps:

1. From the Octopus Deploy web portal, sign in, and view your profile:
![](select-profile.png)
2. Go to the API keys tab. This lists any previous API keys that you have created:
![](api-keys-view.png)
3. Click on **New API key**, and give the API key a name that you can use to remember what the key was for:
![](new-api-key.png)
4. Click **Generate new**, and copy the new API key to your clipboard:
![](api-key.png)

:::warning
**Write Your Key Down**
Once you generate an API key, it cannot be retrieved from the Octopus web portal again - we store only a one-way hash of the API key. If you want to use the API key again, you need to store it in a secure place such as a password manager. Read about [why we hash API keys](https://octopus.com/blog/hashing-api-keys).
:::
