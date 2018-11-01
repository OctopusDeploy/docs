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
      --thumbprint=VALUE     The thumbprint of the Octopus Server to
                               configure communication with; if only one
                               Octopus Server is configured, this may be omitted
      --style=VALUE          The communication style to use with the Octopus
                               Server - either TentacleActive or TentaclePassive
      --host=VALUE           When using active communication, the host name
                               of the Octopus Server
      --port=VALUE           When using active communication, the
                               communications port of the Octopus Server; the
                               default is 10943
      --web-socket=VALUE     When using active communication over websockets,
                               the address of the Octopus Server, eg
                               'wss://example.com/OctopusComms'. Refer to
                               http://g.octopushq.com/WebSocketComms

Or one of the common options:

      --help                 Show detailed help for this command
```

