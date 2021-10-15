---
title: Swap AD group with LDAP group
description: An example script that swaps any active directory external group for a matching LDAP external group in each Octopus team.
---

This script demonstrates how to programmatically swap any active directory external group for a matching LDAP external group in each Octopus team. This can be useful when you are migrating from the active directory authentication provider to the LDAP provider.

:::hint
Both the [Active Directory](/docs/security/authentication/active-directory/index.md) and [LDAP](/docs/security/authentication/ldap/index.md) providers must be enabled for this script to work as it queries both providers.
:::

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Name of the active directory domain to use to look up the groups to swap
- WhatIf - A boolean value to toggle whether or not to perform the actual updates to teams in Octopus.
- Remove old teams - A boolean value to toggle whether or not to remove the existing active directory groups from each team.

## Script

!include <switch-ad-domain-group-to-ldap-group-scripts>