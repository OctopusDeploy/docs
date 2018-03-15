---
title: Cleaning environments
description: Using the Octo.exe command line tool to delete/remove machines with a particular status from environments on your Octopus instance.
position: 9
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to delete/remove machines with a particular status from environments on your Octopus instance.

:::hint
This command was added in Octo.exe 3.3.4.
:::

:::success
This is most useful when your environments can have temporary/ephemeral machines. The best example of this is in virtualized or cloud environments where new machines are created and destroyed frequently.
:::

:::success
**Using Octopus 3.4 or newer?**
We added first-class support for automatically [cleaning up environments](/docs/deployment-patterns/elastic-and-transient-environments/cleaning-up-environments.md).
:::

```bash
octo clean-environment [<options>]
```

Where `[<options>]` is any of:

**clean-environment options**

```text
Cleanup: 
      --environment=VALUE    Name of an environment to clean up.
      --status=VALUE         Status of Machines clean up (Online, Offline, 
                             Unknown, NeedsUpgrade, CalamariNeedsUpgrade, 
                             Disabled). Can be specified many times.
      --health-status, --healthstatus=VALUE
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
                             p. By default ignores Tentacle state

Common options: 

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid 
                             option is json
      --outputFormat=VALUE   [Optional] Output format, only valid option is 
                             json
      --server=VALUE         The base URL for your Octopus server - e.g., 
                             http://your-octopus/
      --apiKey=VALUE         [Optional] Your API key. Get this from the user 
                             profile page. Your must provide an apiKey or 
                             username and password. If the guest account is 
                             enabled, a key of API-GUEST can be used.
      --user=VALUE           [Optional] Username to use when authenticating 
                             with the server. Your must provide an apiKey or 
                             username and password.
      --pass=VALUE           [Optional] Password to use when authenticating 
                             with the server.
      --configFile=VALUE     [Optional] Text file of default values, with one 
                             'key = value' per line.
      --debug                [Optional] Enable debug logging
      --ignoreSslErrors      [Optional] Set this flag if your Octopus server 
                             uses HTTPS but the certificate is not trusted on 
                             this machine. Any certificate errors will be 
                             ignored. WARNING: this option may create a 
                             security vulnerability.
      --enableServiceMessages
                             [Optional] Enable TeamCity or Team Foundation 
                             Build service messages when logging.
      --timeout=VALUE        [Optional] Timeout in seconds for network 
                             operations. Default is 600.
      --proxy=VALUE          [Optional] The URI of the proxy to use, eg 
                             http://example.com:8080.
      --proxyUser=VALUE      [Optional] The username for the proxy.
      --proxyPass=VALUE      [Optional] The password for the proxy. If both 
                             the username and password are omitted and 
                             proxyAddress is specified, the default 
                             credentials are used. 
      --logLevel=VALUE       [Optional] The log level. Valid options are 
                             verbose, debug, information, warning, error and 
                             fatal. Defaults to 'debug'.
```

## Basic example {#Cleaningenvironments-Basicexample}

The following command will clean any *offline* machines from the *production* environment.

```bash
Octo clean-environment --environment Production --status Offline --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/api-and-integration/api/how-to-create-an-api-key.md).
:::
