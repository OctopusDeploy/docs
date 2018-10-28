---
title: Server Comms
description: Using the Tentacle.exe command line executable to configure how the Tentacle communicates with the Octopus Server.
---

Configure how the Tentacle communicates with an Octopus Server

**Server communication options**

```text
Usage: tentacle server-comms [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --thumbprint=VALUE     The thumbprint of the Octopus server to
                               configure communication with; if only one
                               Octopus server is configured, this may be omitted
      --style=VALUE          The communication style to use with the Octopus
                               server - either TentacleActive or TentaclePassive
      --host=VALUE           When using active communication, the host name
                               of the Octopus server
      --port=VALUE           When using active communication, the
                               communications port of the Octopus server; the
                               default is 10943
      --web-socket=VALUE     When using active communication over websockets,
                               the address of the Octopus server, eg
                               'wss://example.com/OctopusComms'. Refer to
                               http://g.octopushq.com/WebSocketComms

Or one of the common options:

      --help                 Show detailed help for this command
```

