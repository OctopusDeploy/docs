---
title: Authentication provider compatibility
description: Compatibility of authentication providers differ between Octopus Server and Octopus Cloud.
position: 0
---

Octopus ships with a number of authentication providers. The support for these providers differ between Octopus Server and [Octopus Cloud](/docs/octopus-cloud/index.md). Some authentication providers only work with Octopus Server, whilst others only work with Octopus Cloud. This page describes the compatibility of these providers in Octopus.

## Login support {#login-support}

The following table shows login support for each authentication provider in Octopus Server and Octopus Cloud:

|                                       | Octopus Server     | Octopus Cloud   | Octopus Linux Container |
|---------------------------------------|:------------------:|:---------------:|:-----------------------:|
| Username and Password                 | :white_check_mark: | :white_check_mark: **\*** | :white_check_mark: |
| Active Directory Authentication       | :white_check_mark: | :x:&nbsp;&nbsp; | :x: |
| Azure Active Directory Authentication | :white_check_mark: | :white_check_mark: **\*** | :white_check_mark: |
| GoogleApps Authentication             | :white_check_mark: | :white_check_mark: **\*** | :white_check_mark: |
| Okta Authentication                   | :white_check_mark: | :x:&nbsp;&nbsp; | :white_check_mark: |
| Guest Login                           | :white_check_mark: | :white_check_mark:&nbsp;&nbsp; | :white_check_mark: |
| GitHub                                | :x: | :white_check_mark: **\*** | :x: |

**Note:** Entries marked with **\*** are supported via [Octopus ID](octopusid-authentication.md).

## External groups and roles support {#external-groups-and-roles}

Octopus allows [external groups and roles](/docs/security/users-and-teams/external-groups-and-roles.md) to be added as members of Teams in Octopus. The following table shows which authentication providers support this in Octopus Server and Octopus Cloud:

|                                       | Octopus Server     | Octopus Cloud   | Octopus Linux Container |
|---------------------------------------|:------------------:|:---------------:|:-----------------------:|
| Username and Password                 | :x:&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp; |
| Active Directory Authentication       | :white_check_mark:&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp; |
| Azure Active Directory Authentication | :white_check_mark: **\*** | :x: | :white_check_mark: **\*** |
| GoogleApps Authentication             | :x:&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp; |
| Okta Authentication                   | :white_check_mark: **†**| :x: | :white_check_mark: **†**|
| Guest Login                           | :x:&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp; |
| GitHub                                | :x:&nbsp;&nbsp; | :x: | :x:&nbsp;&nbsp; |

**\*** For Azure Active Directory (AAD) users and groups, these must also be mapped in the Azure App Registration. Please read the [Mapping AAD users into Octopus teams](/docs/security/authentication/azure-ad-authentication.md#mapping-aad-users-into-octopus-teams-optional) section for more details.

**†** For Okta groups to flow through to Octopus, you'll need to change the _Groups claim_ fields. Please read the [Okta group integration](/docs/security/authentication/okta-authentication.md#Oktaauthentication-OpenIDConnectSettings-OktaGroups) section for more details.
