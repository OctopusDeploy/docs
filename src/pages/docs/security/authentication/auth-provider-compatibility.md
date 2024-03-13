---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-06-06
title: Authentication provider compatibility
description: Compatibility of authentication providers differ between Octopus Server and Octopus Cloud.
navOrder: 0
---

Octopus ships with a number of authentication providers. The support for these providers differ between Octopus Server, [Octopus Cloud](/docs/octopus-cloud/) and the [Octopus Linux Container](/docs/installation/octopus-server-linux-container). Some authentication providers only work with Octopus Server, whilst others only work with Octopus Cloud. This page describes the compatibility of these providers in Octopus.

:::div{.hint}
Most of the authentication providers listed here are available in modern versions of Octopus. However, some are shipped with Octopus from a specific version. Where this is the case, the version will be noted alongside the provider.
:::

## Login support {#login-support}

The following table shows login support for each authentication provider in Octopus Server, Octopus Cloud, and the Octopus Linux Container:

|                                       | Octopus Server     | Octopus Cloud   | Octopus Linux Container |
|---------------------------------------|:------------------:|:---------------:|:-----------------------:|
| Username and Password                 | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> <span class="inline-note">[**\***](#table-note-1)</span> | <i class="fa-circle-check"></i> |
| Active Directory Authentication       | <i class="fa-circle-check"></i> | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> |
| Azure Active Directory Authentication | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> |
| GoogleApps Authentication             | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> |
| LDAP Authentication (**2021.2+**)| <i class="fa-circle-check"></i> | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-circle-check"></i> |
| Okta Authentication                   | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> |
| GitHub                                | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-circle-check"></i> <span class="inline-note">[**\***](#table-note-1)</span> | <i class="fa-solid fa-circle-xmark"></i> |
| Guest Login                           | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> | <i class="fa-circle-check"></i> |

<span id="table-note-1">**Note:**</span> Entries marked with **\*** are only supported via [Octopus ID](/docs/security/authentication/octopusid-authentication).

## External groups and roles support {#external-groups-and-roles}

Octopus allows [external groups and roles](/docs/security/users-and-teams/external-groups-and-roles) to be added as members of Teams in Octopus. The following table shows which authentication providers support this in Octopus Server, Octopus Cloud, and the Octopus Linux Container:

|                                              |              Octopus Server              |              Octopus Cloud               |         Octopus Linux Container          |
|----------------------------------------------|:----------------------------------------:|:----------------------------------------:|:----------------------------------------:|
| Username and Password                        | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> |
| Active Directory Authentication              |     <i class="fa-circle-check"></i>      | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> |
| Azure Active Directory Authentication [**\***](#table-note-2) |     <i class="fa-circle-check"></i>      |     <i class="fa-circle-check"></i>      |     <i class="fa-circle-check"></i>      |
| GoogleApps Authentication                    | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> |
| LDAP Authentication (**2021.2+**)            |     <i class="fa-circle-check"></i>      | <i class="fa-solid fa-circle-xmark"></i> |     <i class="fa-circle-check"></i>      |
| Okta Authentication [**†**](#table-note-3)                    |     <i class="fa-circle-check"></i>      |     <i class="fa-circle-check"></i>      |     <i class="fa-circle-check"></i>      |
| GitHub                                       | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> |
| Guest Login                                  | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> | <i class="fa-solid fa-circle-xmark"></i> |

<span id="table-note-2">**\***</span> For Azure Active Directory (AAD) users and groups, these must also be mapped in the Azure App Registration. Please read the [Mapping AAD users into Octopus teams](/docs/security/authentication/azure-ad-authentication/#mapping-aad-users-into-octopus-teams-optional) section for more details. For Octopus Cloud, external groups and roles cannot be configured for Azure AD when using [Octopus ID](/docs/security/authentication/octopusid-authentication).

<span id="table-note-3">**†**</span> For Okta groups to flow through to Octopus, you'll need to change the _Groups claim_ fields. Please read the [Okta group integration](/docs/security/authentication/okta-authentication/#okta-groups) section for more details.

:::div{.hint}
[Octopus ID](/docs/security/authentication/octopusid-authentication/) does not currently support configuring [external groups and roles](/docs/security/users-and-teams/external-groups-and-roles).
:::
