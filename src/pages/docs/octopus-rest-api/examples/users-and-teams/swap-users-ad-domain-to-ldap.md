---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Change users AD domain to LDAP
description: An example script that swaps an Octopus user's Active Directory login record for a matching LDAP one.
---

This script demonstrates how to programmatically swap an Octopus user's Active Directory login record for a matching LDAP one. This can be useful when you are migrating from the Active Directory authentication provider to the LDAP provider.

We also have a script that will [swap Active Directory groups with matching LDAP groups](/docs/octopus-rest-api/examples/users-and-teams/swap-ad-domain-group-with-ldap-group.md) for Octopus teams.

:::hint
**Note:**
Please note there are some things to consider before using this script:

- The [LDAP authentication provider](/docs/security/authentication/ldap/) must be enabled for this script to work as it queries for matching users in LDAP.
- The script won't work if the LDAP server and the AD Server domains are different. For example migrating from `domain-one.local` to `domain-two.local`.
- Always ensure you test the script on a non-production server first, and have a production database backup.
:::

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Max number of records to update in the script execution.
- Name of the domain to use to find a users existing Active Directory record to optionally remove, in the format `your-ad-domain.com`.
- Name of the domain to use when searching LDAP for matching external user records in the format `your-ldap-domain.com`. *This is typically the same value as the Active Directory domain*.
- LDAP username lookup - A boolean value to toggle whether or not to include the LDAP domain when matching the Active Directory username to the LDAP one.
- WhatIf - A boolean value to toggle whether or not to perform the actual updates to users in Octopus.
- Remove old Active Directory records - A boolean value to toggle whether or not to remove the existing active directory record from each user.

## Script

!include <switch-users-ad-domain-to-ldap-scripts>