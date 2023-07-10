---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Clean environments
description: Using the Octopus CLI to delete/remove machines with a particular status from environments on your Octopus instance.
navOrder: 15
---

The [Octopus CLI](/docs/octopus-rest-api/octopus-cli) can be used to delete/remove machines with a particular status from environments on your Octopus instance.

This is most useful when your environments can have temporary/ephemeral machines. The best example of this is in virtualized or cloud environments where new machines are created and destroyed frequently.

```text
Cleans all Offline Machines from an Environment.

Usage: octo clean-environment [<options>]

Where [<options>] is any of:

Cleanup:

      --environment=VALUE    Name of an environment to clean up.
      --status=VALUE         Status of Machines clean up (Online, Offline,
                             Unknown, NeedsUpgrade, CalamariNeedsUpgrade,
                             Disabled). Can be specified many times.
      --health-status, --healthStatus=VALUE
                             Health status of Machines to clean up (Healthy,
                             Unavailable, Unknown, HasWarnings, Unhealthy).
                             Can be specified many times.
      --disabled=VALUE       [Optional] Disabled status filter of Machine to
                             clean up.
      --calamari-outdated=VALUE
                             [Optional] State of Calamari to clean up. By
                             default ignores Calamari state.
      --tentacle-outdated=VALUE
                             [Optional] State of Tentacle version to clean u-
                             p. By default ignores Tentacle state.

Common options:

      --help                 [Optional] Print help for a command.
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, valid options
                             are Default or Json
      --outputFormat=VALUE   [Optional] Output format, valid options are
                             Default or Json
      --server=VALUE         [Optional] The base URL for your Octopus Server,
                             e.g., 'https://octopus.example.com/'. This URL
                             can also be set in the OCTOPUS_CLI_SERVER
                             environment variable.
      --apiKey=VALUE         [Optional] Your API key. Get this from the user
                             profile page. You must provide an apiKey or
                             username and password. If the guest account is
                             enabled, a key of API-GUEST can be used. This
                             key can also be set in the OCTOPUS_CLI_API_KEY
                             environment variable.
      --user=VALUE           [Optional] Username to use when authenticating
                             with the server. You must provide an apiKey or
                             username and password. This Username can also be
                             set in the OCTOPUS_CLI_USERNAME environment
                             variable.
      --pass=VALUE           [Optional] Password to use when authenticating
                             with the server. This Password can also be set
                             in the OCTOPUS_CLI_PASSWORD environment variable.
      --configFile=VALUE     [Optional] Text file of default values, with one
                             'key = value' per line.
      --debug                [Optional] Enable debug logging.
      --ignoreSslErrors      [Optional] Set this flag if your Octopus Server
                             uses HTTPS but the certificate is not trusted on
                             this machine. Any certificate errors will be
                             ignored. WARNING: this option may create a
                             security vulnerability.
      --enableServiceMessages
                             [Optional] Enable TeamCity or Team Foundation
                             Build service messages when logging.
      --timeout=VALUE        [Optional] Timeout in seconds for network
                             operations. Default is 600.
      --proxy=VALUE          [Optional] The URL of the proxy to use, e.g.,
                             'https://proxy.example.com'.
      --proxyUser=VALUE      [Optional] The username for the proxy.
      --proxyPass=VALUE      [Optional] The password for the proxy. If both
                             the username and password are omitted and
                             proxyAddress is specified, the default
                             credentials are used.
      --space=VALUE          [Optional] The name or ID of a space within
                             which this command will be executed. The default
                             space will be used if it is omitted.
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.
```

## Basic example {#Cleaningenvironments-Basicexample}

The following command cleans any *offline* machines from the Production environment:

```bash
octo clean-environment --environment Production --status Offline --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)
- [Environments](/docs/infrastructure/environments)
- [Automatically clean up environments](/docs/deployments/patterns/elastic-and-transient-environments/cleaning-up-environments)
