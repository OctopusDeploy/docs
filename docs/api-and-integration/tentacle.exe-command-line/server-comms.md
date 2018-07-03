---
title: Server comms
description: Using the Tentacle.exe command line executable to configure how the Tentacle communicates with the Octopus Server.
---

Configure how the Tentacle communicates with an Octopus Server

**Server communication options**

```text
Usage: Tentacle server-comms [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --thumbprint=VALUE     The thumbprint of the Octopus Server to
                               configure communication with; if only one
                               Octopus Server is configured, this may be omitted
      --style=VALUE          The communication style to use with the Octopus
                               server - either TentacleActive or TentaclePassive
      --host=VALUE           When using active communication, the host name
                               of the Octopus Server
      --port=VALUE           When using active communication, the
                               communications port of the Octopus Server; the
                               default is 10943
Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```

