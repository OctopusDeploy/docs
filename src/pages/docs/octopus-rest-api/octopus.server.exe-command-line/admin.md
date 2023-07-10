---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Admin
description:  Reset admin user passwords, re-enable them, and ensure they are in the admin group
navOrder: 10
---

Use the admin command to reset admin user passwords, re-enable them, and ensure they are in the admin group.

**Admin options**

```text
Usage: octopus.server admin [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --wait=VALUE           Milliseconds to wait
      --username, --user=VALUE
                             The username of the administrator to
                               create/modify
      --email=VALUE          The email of the administrator to create/modify
      --password=VALUE       The password to set for the administrator
      --apiKey=VALUE         The API Key to set for the administrator. If
                               this is set and no password is provided then a
                               service account user will be created. If this is
                               set and a password is also set then a standard
                               user will be created.
      --externalGroup=VALUE  The partial name of an Active Directory group to
                               add to the administrators team
      --externalGroupId, --externalRoleId=VALUE
                             The id of an external (e.g. AzureAD, Okta)
                               group/role to add to the administrators team
      --externalGroupDescription, --externalRoleDescription=VALUE
                             The description of an external (e.g. AzureAD,
                               Okta) group/role to add to the administrators
                               team
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example will add or update the administrator account with the username of `OctoAdmin`:

```
octopus.server admin --username="OctoAdmin" --password="My$uper$cr3tP@ssword!" --email="admin@octopus.com"
```
