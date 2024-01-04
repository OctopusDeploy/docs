---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-27
title: Service accounts
description: Creating Service Accounts to provide individual services with the least privileges required for the tasks they will perform.
navOrder: 2
---

When using Octopus Deploy it is common to have other automated services control certain aspects of your deployments. Some examples:

- You might configure your [build server](/docs/octopus-rest-api) to push deployment packages to the built-in package feed, create releases, and deploy them to your test environment after each successful build.
- You might be deploying to an [elastic environment](https://octopus.com/blog/rfc-cloud-and-infrastructure-automation-support) and want to add/remove deployment targets dynamically via the [Octopus API](/docs/octopus-rest-api).
- You might have your own dashboard solution and want to get data directly from the [Octopus API](/docs/octopus-rest-api).

It is best to create **Service accounts** for this purpose to provide each service with the least privileges required for the tasks each service will perform.

:::div{.hint}
**Service accounts** are **API-only accounts** that can be assigned permissions in the same way you do for normal user accounts, but are prevented from using the Octopus Web Portal.

Service accounts authenticate with the Octopus API using [OpenID Connect](/docs/octopus-rest-api/openid-connect) or an [Octopus API Key](/docs/octopus-rest-api/how-to-create-an-api-key).
:::

## Creating a service account {#ServiceAccounts-CreatingAServiceAccount}

[Getting Started - Service Accounts](https://www.youtube.com/watch?v=SMsZMpUwCZc)

Creating a new Service account is very similar to creating a new User account:

1. Go to **Configuration ➜ Users** and click **Create user**.
2. Check **The user is a service account** to indicate this will be a Service account.
3. Enter a unique **Username** and **Display name** so you can distinguish this Service account.
4. Save the user to create the Service account.

:::figure
![Create service account](/docs/security/users-and-teams/images/create-service-account.png)
:::

:::div{.hint}
This Service account is not very useful until it [belongs to one or more teams](/docs/security/users-and-teams/), and has one or more [OpenID Connect Identities](/docs/octopus-rest-api/openid-connect) or [Octopus API keys](/docs/octopus-rest-api/how-to-create-an-api-key) associated with it.
:::

## OpenID Connect (OIDC)

You can use [OpenID Connect (OIDC)](/docs/octopus-rest-api/openid-connect) to automate Octopus with another service without needing to provision or manage API Keys. To do this you configure a specific *OIDC Identity* for the service which allows it to connect to Octopus securely. The service then exchanges an ID token with Octopus for a short-lived access token which it can then use for API requests.

## API Keys

:::figure
![Service account API Key](/docs/security/users-and-teams/images/service-account-apikey.png)
:::

Once you have created an [Octopus API key](/docs/octopus-rest-api/how-to-create-an-api-key/) and [added this Service account to a team](/docs/security/users-and-teams), you can start using this Service account to automate Octopus with another service.

## Logins

If you are using Active Directory there is also the option of using an Active Directory account's group membership to determine the service account's Team membership. To use this option all you need to do is add the Active Directory account as an external login entry for the service account.

![Add Active Directory login](/docs/security/users-and-teams/images/add-adlogin.png)
