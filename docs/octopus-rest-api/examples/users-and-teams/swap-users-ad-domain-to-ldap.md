---
title: Change users AD domain to LDAP
description: An example script that swaps an Octopus user's Active Directory login record for a matching LDAP one.
---

This script demonstrates how to programmatically swap an Octopus user's Active Directory login record for a matching LDAP one. This can be useful when you are migrating from the active directory authentication provider to the LDAP provider.

:::hint
The [LDAP authentication provider](/docs/security/authentication/ldap/index.md) must be enabled for this script to work as it queries for matching users in LDAP.
:::

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Max number of records to update in the script execution.
- Name of the domain to use to find a users existing Active Directory record to optionally remove, in the format `your-ad-domain.com`.
- Name of the domain to use when searching LDAP for matching external user records in the format `your-ldap-domain.com`. *This is typically the same value as the Active Directory domain*.
- WhatIf - A boolean value to toggle whether or not to perform the actual updates to users in Octopus.
- Remove old Active Directory records - A boolean value to toggle whether or not to remove the existing active directory record from each user.

## Script

!include <switch-users-ad-domain-to-ldap-scripts>