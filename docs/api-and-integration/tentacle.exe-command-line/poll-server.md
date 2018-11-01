---
title: Poll Server
description: Using the Tentacle.exe command line executable to configure the Octopus Server this Tentacle will poll.
---

Configures an Octopus Server that this Tentacle will poll

**Poll server options**

```text
Usage: tentacle poll-server [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --server=VALUE         The Octopus Server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username=VALUE       If not using API keys, your username
  -p, --password=VALUE       If not using API keys, your password
      --server-comms-port=VALUE
                             The comms port on the Octopus Server; the
                               default is 10943
      --server-web-socket=VALUE
                             When using active communication over websockets,
                               the address of the Octopus Server, eg
                               'wss://example.com/OctopusComms'. Refer to
                               http://g.octopushq.com/WebSocketComms

Or one of the common options:

      --help                 Show detailed help for this command
```

