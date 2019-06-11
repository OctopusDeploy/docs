---
title: Service
description: Using the Tentacle.exe command line executable to start, stop, install and configure the Tentacle service.
---

Start, stop, install and configure the Tentacle service

**Service options**

```text
Usage: tentacle service [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --start                Start the Windows Service if it is not already
                               running
      --stop                 Stop the Windows Service if it is running
      --reconfigure          Reconfigure the Windows Service
      --install              Install the Windows Service
      --username, --user=VALUE
                             Username to run the service under
                               (DOMAIN\Username format). Only used when --
                               install or --reconfigure are used.
      --uninstall            Uninstall the Windows Service
      --password=VALUE       Password for the username specified with --
                               username. Only used when --install or --
                               reconfigure are used.
      --dependOn=VALUE

Or one of the common options:

      --help                 Show detailed help for this command
```

