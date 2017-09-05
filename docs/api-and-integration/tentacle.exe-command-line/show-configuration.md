---
title: Show Configuration
description:  Outputs the Tentacle configuration
---

Use the show configuration command to output the Tentacle configuration. The configuration is output as json. If you pass credentials to the relevant Octopus server, it will return server side configuration as well.

**Show configuration options**

```text
Usage: Tentacle show-configuration [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --file=VALUE           Exports the server configuration to a file. If
                               not specified output goes to the console
      --server=VALUE         The Octopus server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username=VALUE       If not using API keys, your username
  -p, --password=VALUE       If not using API keys, your password

Or one of the common options:

      --help                 Show detailed help for this command
```
