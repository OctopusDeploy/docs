---
title: Show Configuration
description:  Outputs the Tentacle configuration
---

Use the show configuration command to output the Tentacle configuration. The configuration is output as JSON. If you pass credentials to the relevant Octopus Server, it will return server side configuration (roles, environments, machine policy and display name) as well.

**Show configuration options**

```text
Usage: tentacle show-configuration [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
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

