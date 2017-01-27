---
title: Service
---

Start, stop, install and configure the Tentacle service

**Service options**

```text
Usage: Tentacle service [<options>]

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

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```
