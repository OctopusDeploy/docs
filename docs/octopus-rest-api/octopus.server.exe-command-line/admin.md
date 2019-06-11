---
title: Admin
description:  Reset admin user passwords, re-enable them, and ensure they are in the admin group
---

Use the admin command to reset admin user passwords, re-enable them, and ensure they are in the admin group.

**Admin options**

```text
Usage: octopus.server admin [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --wait=VALUE           Milliseconds to wait
      --username, --user=VALUE
                             The username of the administrator to
                               create/modify
      --email=VALUE          The email of the administrator to create/modify
      --password=VALUE       The password to set for the administrator
      --externalGroup=VALUE  The partial name of an Active Directory group to
                               add to the administrators team
      --externalGroupId, --externalRoleId=VALUE
                             The id of an external (e.g. AzureAD, Okta)
                               group/role to add to the administrators team
      --externalGroupDescription, --externalRoleDescription=VALUE
                             The description of an external (e.g. AzureAD,
                               Okta) group/role to add to the administrators
                               team

Or one of the common options:

      --help                 Show detailed help for this command
```

