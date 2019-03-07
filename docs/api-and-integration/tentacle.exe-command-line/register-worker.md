---
title: Register Worker
description: Using the Tentacle.exe command line executable to register this machine as a Worker with an Octopus Server.
---

Registers this machine as a Worker with an Octopus Server

**Register with options**

```text
Usage: tentacle register-worker [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --server=VALUE         The Octopus Server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username, --user=VALUE
                             If not using API keys, your username
  -p, --password=VALUE       If not using API keys, your password
      --name=VALUE           Name of the machine when registered; the default
                               is the hostname
      --policy=VALUE         The name of a machine policy that applies to
                               this machine
  -h, --publicHostName=VALUE An Octopus-accessible DNS name/IP address for
                               this machine; the default is the hostname
  -f, --force                Allow overwriting of existing machines
      --comms-style=VALUE    The communication style to use - either
                               TentacleActive or TentaclePassive; the default
                               is TentaclePassive
      --proxy=VALUE          When using passive communication, the name of a
                               proxy that Octopus should connect to the
                               Tentacle through - e.g., 'Proxy ABC' where the
                               proxy name is already configured in Octopus; the
                               default is to connect to the machine directly
      --space=VALUE          The name of the space within which this command
                               will be executed. E.g. 'Finance Department'
                               where Finance Department is the name of an
                               existing space. The default space will be used
                               if omitted.
      --server-comms-port=VALUE
                             When using active communication, the comms port
                               on the Octopus Server; the default is 10943
      --server-web-socket=VALUE
                             When using active communication over websockets,
                               the address of the Octopus Server, eg
                               'wss://example.com/OctopusComms'. Refer to
                               http://g.octopushq.com/WebSocketComms
      --tentacle-comms-port=VALUE
                             When using passive communication, the comms port
                               that the Octopus Server is instructed to call
                               back on to reach this machine; defaults to the
                               configured listening port
      --workerpool=VALUE     The worker pool name to add the machine to - e.-
                               g., 'Windows Pool'; specify this argument
                               multiple times to add to multiple pools

Or one of the common options:

      --help                 Show detailed help for this command
```

