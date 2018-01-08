---
title: Service
description:  Start, stop, install and configure the Octopus service.
---

Use this to configure and manage your Octopus service.

**Service options**

```text
Usage: Octopus.Server service --start [<options>]

Where [<options>] is any of:
      --instance=VALUE               Name of the instance to start

Usage: Octopus.Server service --stop [<options>]

Where [<options>] is any of:
      --instance=VALUE               Name of the instance to stop

Usage: Octopus.Server service --install [<options>]

Where [<options>] is any of:
      --instance=VALUE               Name of the instance to create
      --serviceName=VALUE            Name of the service to start
      --username=VALUE               Username to run the service under (DOMAIN\\Username format)
      --password=VALUE               Password for the username specified with --username
      --serviceDescription=VALUE     Service description
      --dependOn=VALUE               Another service this depends on

Or one of the common options:
      --help                 Show detailed help for this command
```


