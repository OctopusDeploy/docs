---
title: Octopus Server commands - Built-in Worker
description: Configure the built-in worker used to run deployment actions and scripts on the Octopus Server
---

Use the builtin-worker command to configure the user context that the [built-in worker](/docs/administration/workers/index.md#built-in-worker) runs under.  Available in **Octopus 2018.1.0** and later.

**builtin-worker options**

```text
Usage: octopus.server builtin-worker [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --auto-configure       Automatically configure accounts on the local
                               machine with the correct privileges, and set up
                               the built-in worker to use the down-level
                               account.
      --reset                Reset the built-in worker configuration to its
                               factory default, which is to execute scripts
                               using the same account as the Octopus Server
                               itself.
      --username=VALUE       The username for a user account the built-in
                               worker should use when executing custom scripts,
                               like 'octopus-worker' or 'octopus-
                               worker@mycomany.com'. Default is to use the same
                               user account as the Octopus Server itself.
      --password=VALUE       The password for the custom account.
      --domain=VALUE         The domain for the custom account. This works
                               best when the user account is defined in a
                               different Active Directory domain where cross-
                               domain trusts are involved. Set this if using a
                               domain account like 'mycompany.com\octopus-
                               worker', otherwise leave it blank to use an
                               account on the local machine, or when using
                               'octopus-worker@mycompany.com' (UPN) format.

Or one of the common options:

      --help                 Show detailed help for this command
```

