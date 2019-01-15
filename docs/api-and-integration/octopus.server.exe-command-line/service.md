---
title: Service
description:  Start, stop, install and configure the Octopus service.
---

Use this to configure and manage your Octopus service.

**Service options**

```text
Usage: octopus.server service [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --start                Start the Windows Service if it is not already
                               running
      --stop                 Stop the Windows Service if it is running
      --reconfigure          Reconfigure the Windows Service
      --install              Install the Windows Service
      --username=VALUE       Username to run the service under
                               (DOMAIN\Username format). Only used when --
                               install is used.
      --uninstall            Uninstall the Windows Service
      --password=VALUE       Password for the username specified with --
                               username. Only used when --install is used.
      --dependOn=VALUE

Or one of the common options:

      --help                 Show detailed help for this command
```

