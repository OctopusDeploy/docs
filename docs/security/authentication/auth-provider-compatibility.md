---
title: Authentication provider compatibility
description: Compatibility of authentication providers differ between Octopus Server and Octopus Cloud.
position: 0
---

Octopus ships with a number of authentication providers. The support for these providers differ between Octopus Server and [Octopus Cloud](/docs/octopus-cloud/index.md). Some authentication providers only work with Octopus Server, whilst others only work with Octopus Cloud. This page describes the compatibility of these providers in Octopus.

## Login support {#login-support}

The following table shows login support for each authentication provider in Octopus Server and Octopus Cloud:

|                                       | Octopus Server     | Octopus Cloud   |
|---------------------------------------|:------------------:|:---------------:|
| Username and Password                 | :white_check_mark: | :white_check_mark: **\*** |
| Active Directory Authentication       | :white_check_mark: | :x:&nbsp;&nbsp; |
| Azure Active Directory Authentication | :white_check_mark: | :white_check_mark: **\*** |
| GoogleApps Authentication             | :white_check_mark: | :white_check_mark: **\*** |
| Okta Authentication                   | :white_check_mark: | :x:&nbsp;&nbsp; |
| Octopus ID                            | :x: | :white_check_mark:&nbsp;&nbsp; |
| Guest Login                           | :white_check_mark: | :white_check_mark:&nbsp;&nbsp; |
| GitHub                                | :x: | :white_check_mark: **\*** |

**Note:** Entries marked with **\*** are supported via [Octopus ID](octopusid-authentication.md).

## External group and roles support {#external-groups-and-roles}

Octopus allows [external groups and roles](/docs/security/users-and-teams/external-groups-and-roles.md) to be added as Members of Teams in Octopus. The following table shows which authentication providers support this in Octopus Server and Octopus Cloud:

|                                       | Octopus Server     | Octopus Cloud   |
|---------------------------------------|:------------------:|:---------------:|
| Username and Password                 | :x:&nbsp;&nbsp; | :x: |
| Active Directory Authentication       | :white_check_mark:&nbsp;&nbsp; | :x: |
| Azure Active Directory Authentication | :white_check_mark: **\*** | :x: |
| GoogleApps Authentication             | :x:&nbsp;&nbsp; | :x: |
| Okta Authentication                   | :x:&nbsp;&nbsp; | :x: |
| Octopus ID                            | :x:&nbsp;&nbsp; | :x: |
| Guest Login                           | :x:&nbsp;&nbsp; | :x: |
| GitHub                                | :x:&nbsp;&nbsp; | :x: |

**\*** For Azure Active Directory (AAD) users and groups, these must also be mapped in the Azure App Registration. Please read the [Mapping AAD users into Octopus teams](/docs/security/authentication/azure-ad-authentication.md#mapping-aad-users-into-octopus-teams-optional) section for further information.

