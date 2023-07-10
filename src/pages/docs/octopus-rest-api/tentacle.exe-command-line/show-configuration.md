---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Show configuration
description:  Outputs the Tentacle configuration
---

Use the show configuration command to output the Tentacle configuration. The configuration is output as JSON. If you pass credentials to the relevant Octopus Server, it will return server side configuration (roles, environments, machine policy and display name) as well.

For Tentacles, the server-side configuration includes roles, environments, machine policy, and display name.
For Workers, the server-side configuration includes the associated worker pools, machine policy, and display name.

**Show configuration options**

```text
Usage: tentacle show-configuration [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --file=VALUE           Exports the server configuration to a file. If
                               not specified output goes to the console
      --space=VALUE          The space from which the server data
                               configuration will be retrieved for, - e.g.
                               'Finance Department' where Finance Department is
                               the name of an existing space; the default value
                               is the Default space, if one is designated.
      --server=VALUE         The Octopus Server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username, --user=VALUE
                             If not using API keys, your username
  -p, --password=VALUE       If not using API keys, your password

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the configuration of the Tentacle (or Worker) on the machine in JSON format:

```
tentacle show-configuration
```

This example displays the configuration of the Tentacle (or Worker) on the machine, as well as the configuration from the Octopus Server in JSON format:

```
tentacle show-configuration --server="https://MyOctopusServer" --apiKey="API-MyApiKey"
```
