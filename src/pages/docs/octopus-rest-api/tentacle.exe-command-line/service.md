---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Service
description: Using the Tentacle.exe command line executable to start, stop, install and configure the Tentacle service.
---

Start, stop, install and configure the Tentacle service.

**Service options**

```
Usage: tentacle service [<options>]

Where [<options>] is any of:

      --start                Start the service if it is not already running
      --stop                 Stop the service if it is running
      --restart              Restart the service if it is running
      --reconfigure          Reconfigure the service
      --install              Install the service
      --username, --user=VALUE
                             Username to run the service under
                               (DOMAIN\Username format for Windows). Only used
                               when --install or --reconfigure are used.  Can
                               also be passed via an environment variable
                               OCTOPUS_SERVICE_USERNAME. Defaults to 'root' for
                               Systemd services.
      --uninstall            Uninstall the service
      --password=VALUE       Password for the username specified with --
                               username. Only used when --install or --
                               reconfigure are used. Can also be passed via an
                               environment variable OCTOPUS_SERVICE_PASSWORD.
      --dependOn=VALUE
      --instance=VALUE       Name of the instance to use, or * to use all
                               instances

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example stops the default Tentacle service:

```
tentacle service --stop
```

This example restarts the Tentacle service for instance `MyNewInstance`:

```
tentacle service --restart --instance="MyNewInstance"
```

This example uninstalls the Tentacle service for instance `MyNewInstance`:

```
tentacle service --uninstall --instance="MyNewInstance"
```
