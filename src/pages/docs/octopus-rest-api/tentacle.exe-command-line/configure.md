---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Configure
description: Using the Tentacle.exe command line executable to configure Tentacle settings.
---

Sets Tentacle settings such as the port number and thumbprints.

**Configure options**

```
Usage: tentacle configure [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
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

This example removes all trusted Octopus Servers:

```
tentacle configure --reset-trust
```

This example configures the Tentacle to trust the thumbprint from an Octopus Server of `9202C9DCB8C14A62ED9A4C25F9F83DD04CC3CD40`:

```
tentacle configure --trust="9202C9DCB8C14A62ED9A4C25F9F83DD04CC3CD40"
```

This example changes the Tentacle home directory to `NewHome`:

Windows:

```
tentacle configure --homedir="c:\NewHome"
```
Linux:

```
Tentacle configure --homedir="/NewHome"
```
