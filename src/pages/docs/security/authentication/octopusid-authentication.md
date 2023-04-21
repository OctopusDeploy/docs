---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus ID authentication
description: Octopus Deploy can use Octopus accounts to identify users.
navOrder: 30
---

:::div{.hint}
Octopus ID authentication is only available in [Octopus Cloud](/docs/octopus-cloud).
:::

Octopus ID authentication allows you to log in to your Octopus Cloud instance using the same account that you use to sign in at [Octopus.com](https://Octopus.com). This allows you to manage who is able to access your Octopus instance from [your organization](https://Octopus.com/organization/) and saves you time when moving between our website and your instance.

## Inviting users and configuring teams with Octopus ID

After you've used Octopus.com to [invite some other users](/docs/octopus-cloud/#OctopusCloud-Invitingusers) to your instance, you can configure the users with [Teams](/docs/security/users-and-teams/) and [User Roles](/docs/security/users-and-teams/user-roles) as you normally would using the product.

## Supported authentication providers

Octopus ID allows you to sign in using the following external authentication providers:

- Google
- Microsoft Azure Active Directory (AAD)
- GitHub

:::div{.hint}
Octopus ID does not currently support configuring [external groups and roles](/docs/security/users-and-teams/external-groups-and-roles) using any of the authentication providers listed.
:::

### Learn more

- [Invite users via Octopus.com](/docs/octopus-cloud/#OctopusCloud-Invitingusers)
- [Octopus Cloud specific permissions](/docs/octopus-cloud/permissions)
- [Octopus Cloud documentation](/docs/octopus-cloud)