---
title: Admin
description:  Reset admin user passwords, re-enable them, and ensure they are in the admin group
---

Use the admin command to reset admin user passwords, re-enable them, and ensure they are in the admin group.

**Admin options**

```text
Usage: Octopus.Server admin [<options>]

Where [<options>] is any of:
      --wait=VALUE          Milliseconds to wait
      --username=VALUE      The username of the administrator to create/modify
      --email=VALUE         The email of the administrator to create/modify
      --password=VALUE      The password to set for the administrator

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```
