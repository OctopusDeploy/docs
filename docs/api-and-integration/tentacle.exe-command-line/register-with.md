---
title: Register With
description: Using the Tentacle.exe command line executable to register this machine with an Octopus Server.
---

Registers this machine with an Octopus server

**Register with options**

```text
Usage: Tentacle register-with [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --server=VALUE         The Octopus server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username=VALUE       If not using API keys, your username
  -p, --password=VALUE       In not using API keys, your password
      --env, --environment=VALUE
                             The environment name to add the machine to
                               e.g., 'Production'; specify this argument multiple
                               times to add multiple environments
  -r, --role=VALUE           The machine role that the machine will assume -
                               e.g., 'web-server'; specify this argument
                               multiple times to add multiple roles
      --tenant=VALUE         A tenant who the machine will be connected to;
                               specify this argument multiple times to add multiple tenants
      --tenanttag=VALUE      A tenant tag which the machine will be tagged
                               with - e.g., 'CustomerType/VIP'; specify this argument
                               multiple times to add multiple tenant tags
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
      --server-comms-port=VALUE
                             When using active communication, the comms port
                               on the Octopus server; the default is 10943

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```
