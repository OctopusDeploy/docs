---
title: update-trust
description: Replaces the trusted Octopus Server thumbprint of any matching polling or listening registrations with a new thumbprint to trust
---

Replaces the trusted Octopus Server thumbprint of any matching polling or listening registrations with a new thumbprint to trust

**update-trust options**

```text
Usage: tentacle update-trust [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --oldThumbprint=VALUE  The thumbprint of the old Octopus Server to be
                               replaced
      --newThumbprint=VALUE  The thumbprint of the new Octopus Server

Or one of the common options:

      --help                 Show detailed help for this command
```

