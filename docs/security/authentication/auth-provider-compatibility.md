---
title: Authentication provider compatibility
description: Compatibility of authentication providers differ between Octopus Server and Octopus Cloud.
position: 0
---

Octopus ships with a number of authentication providers. The support for these providers differ between Octopus Server, [Octopus Cloud](/docs/octopus-cloud/index.md) and the [Octopus Linux Container](/docs/installation/octopus-in-container/octopus-server-container-linux.md). Some authentication providers only work with Octopus Server, whilst others only work with Octopus Cloud. This page describes the compatibility of these providers in Octopus.

:::hint
Most of the authentication providers listed here are available in modern versions of Octopus. However, some are only available from a specific version. Where this is the case, the version will be noted alongside the provider.
:::

## Login support {#login-support}

The following table shows login support for each authentication provider in Octopus Server, Octopus Cloud and the Octopus Linux Container:


|                                       | Octopus Server     | Octopus Cloud   | Octopus Linux Container |
|---------------------------------------|:------------------:|:---------------:|:-----------------------:|
| Username and Password                 | :white_check_mark: | :white_check_mark: **\*** | :white_check_mark: |
| Active Directory Authentication       | :white_check_mark: | :x:&nbsp;&nbsp;&nbsp; | :x: |
| Azure Active Directory Authentication | :white_check_mark: | :white_check_mark: **\*** | :white_check_mark: |
| GoogleApps Authentication             | :white_check_mark: | :white_check_mark: **\*** | :white_check_mark: |
| LDAP Authentication <br/>**2021.2.0+**| :white_check_mark: | :x:&nbsp;&nbsp;&nbsp; | :white_check_mark: |
| Okta Authentication                   | :white_check_mark: | :x:&nbsp;&nbsp;&nbsp; | :white_check_mark: |
| GitHub                                | :x: | :white_check_mark: **\*** | :x: |
| Guest Login                           | :white_check_mark: | :white_check_mark:&nbsp;&nbsp;&nbsp; | :white_check_mark: |

**Note:** Entries marked with **\*** are supported via [Octopus ID](octopusid-authentication.md).

## External groups and roles support {#external-groups-and-roles}

Octopus allows [external groups and roles](/docs/security/users-and-teams/external-groups-and-roles.md) to be added as members of Teams in Octopus. The following table shows which authentication providers support this in Octopus Server, Octopus Cloud and the Octopus Linux Container:

|                                         | Octopus Server     | Octopus Cloud   | Octopus Linux Container |
|-----------------------------------------|:------------------:|:---------------:|:-----------------------:|
| Username and Password                   | :x:&nbsp;&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp;&nbsp; |
| Active Directory Authentication         | :white_check_mark:&nbsp;&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp;&nbsp; |
| Azure Active Directory Authentication   | :white_check_mark: **\*** | :x: | :white_check_mark: **\*** |
| GoogleApps Authentication               | :x:&nbsp;&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp;&nbsp; |
| LDAP Authentication <br/>**2021.2.0+**  | :white_check_mark:&nbsp;&nbsp;&nbsp; | :x: | :white_check_mark: |
| Okta Authentication                     | :white_check_mark: **†**| :x: | :white_check_mark: **†**|
| GitHub                                  | :x:&nbsp;&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp;&nbsp; |
| Guest Login                             | :x:&nbsp;&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp;&nbsp; |

**\*** For Azure Active Directory (AAD) users and groups, these must also be mapped in the Azure App Registration. Please read the [Mapping AAD users into Octopus teams](/docs/security/authentication/azure-ad-authentication.md#mapping-aad-users-into-octopus-teams-optional) section for more details.

**†** For Okta groups to flow through to Octopus, you'll need to change the _Groups claim_ fields. Please read the [Okta group integration](/docs/security/authentication/okta-authentication.md#Oktaauthentication-OpenIDConnectSettings-OktaGroups) section for more details.
