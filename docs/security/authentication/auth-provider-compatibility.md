---
title: Authentication provider compatibility
description: Compatibility of authentication providers differ between Octopus Server and Octopus Cloud.
position: 0
---

Octopus ships with a number of authentication providers. The support for these providers differ between Octopus Server and [Octopus Cloud](/docs/octopus-cloud/index.md). Some only support authentication with Octopus Server, and others only support Octopus Cloud.

## Authentication provider login support {#authentication-provider-login-support}

The following table highlights login support for each authentication provider in Octopus Server and Octopus Cloud:

|                                       | Octopus Server     | Octopus Cloud   |
|---------------------------------------|:------------------:|:---------------:|
| Username and Password                 | :white_check_mark: | :white_check_mark: **\*** |
| Active Directory Authentication       | :white_check_mark: | :x:&nbsp;&nbsp; |
| Azure Active Directory Authentication | :white_check_mark: | :white_check_mark: **\*** |
| GoogleApps Authentication             | :white_check_mark: | :white_check_mark: **\*** |
| Okta Authentication                   | :white_check_mark: | :x:&nbsp;&nbsp; |
| Octopus ID                            | :x: | :white_check_mark: |
| Guest Login                           | :white_check_mark: | :white_check_mark: |
| GitHub                                | :x: | :white_check_mark: **\*** |

**Note:** Entries marked with **\*** are supported via [Octopus ID](octopusid-authentication.md).