---
title: Configure
description: Using the Tentacle.exe command line executable to configure Tentacle settings.
---

Sets Tentacle settings such as the port number and thumbprints

**Configure options**

```text
Usage: tentacle configure [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --home, --homedir=VALUE
                             Home directory
      --app, --appdir=VALUE  Default directory to deploy applications to
      --port=VALUE           TCP port on which Tentacle should listen to
                               connections
      --noListen=VALUE       Suppress listening on a TCP port (intended for
                               polling Tentacles only)
      --listenIpAddress=VALUE
                             IP address on which Tentacle should listen.
                               Default: any
      --trust=VALUE          The thumbprint of the Octopus Server to trust
      --remove-trust=VALUE   The thumbprint of the Octopus Server to remove
                               from the trusted list
      --reset-trust          Removes all trusted Octopus Servers

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples
This example will remove all trusted Octopus Servers
```text
tentacle configure --reset-trust
```

This example will trust the thumbprint from an Octopus Server
```text
tentacle configure --trust="9202C9DCB8C14A62ED9A4C25F9F83DD04CC3CD40"
```

This example will change the Tentacle home directory to NewHome
```text Windows
tentacle configure --homedir="c:\NewHome"
```
```text Linux
Tentacle configure --homedir="/NewHome"
```
