---
title: Deleting Releases
description: Using the Octo.exe command line tool to delete releases.
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to delete releases from your Octopus instance. Releases deleted this way **cannot be recovered**.

:::success
**Using Channels?**
If you are using [channels](/docs/deployment-process/channels/index.md) (introduced in **Octopus 3.2**) you can filter this command so it only deletes releases for a particular channel.
:::

```bash
octo delete-releases [<options>]

Where `[<options>]` is any of:

Deletion:

      --project=VALUE        Name of the project
      --minversion=VALUE     Minimum (inclusive) version number for the range
                             of versions to delete
      --maxversion=VALUE     Maximum (inclusive) version number for the range
                             of versions to delete
      --channel=VALUE        [Optional] if specified, only releases
                             associated with the channel will be deleted;
                             specify this argument multiple times to target
                             multiple channels.
      --whatif               [Optional, Flag] if specified, releases won't
                             actually be deleted, but will be listed as if
                             simulating the command

Common options:

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid
                             option is json
      --outputFormat=VALUE   [Optional] Output format, only valid option is
                             json
      --server=VALUE         The base URL for your Octopus Server - e.g.,
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

## Basic Example {#Deletingreleases-Basicexample}

The following command will delete all the releases from the project **Web** between versions **0.0.8** to **0.0.12**.

```bash
octo delete-releases --project Web --minversion="0.0.8" --maxversion="0.0.12" --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::warning
On the example above, both **minversion** and **maxversion** will be delete as well. The complete list of releases deleted by that command will be:

0.0.8, 0.0.9, 0.0.10, 0.0.11, 0.0.12.
:::

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/api-and-integration/api/how-to-create-an-api-key.md).
:::

Want to delete individual releases via the web portal? This process is outlined in our [deleting releases](/docs/deployment-process/releases/deleting-releases.md) documentation page.
