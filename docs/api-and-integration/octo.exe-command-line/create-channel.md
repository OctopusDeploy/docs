---
title: Creating Channels
description: Using the Octo.exe command line tool to create channels.
position: 11
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to create [channels](/docs/deployment-process/channels/index.md) on your Octopus instance.

```bash
octo create-channel [<options>]

Where `[<options>]` is any of:

Create:

      --project=VALUE        The name of the project in which to create the
                             channel
      --channel=VALUE        The name of the channel to create
      --description=VALUE    [Optional] A description of the channel
      --lifecycle=VALUE      [Optional] if specified, the name of the
                             lifecycle to use for promoting releases through
                             this channel, otherwise this channel will
                             inherit the project lifecycle
      --make-default-channel [Optional, Flag] if specified, set the new
                             channel to be the default channel replacing any
                             existing default channel
      --update-existing      [Optional, Flag] if specified, updates the
                             matching channel if it already exists, otherwise
                             this command will fail if a matching channel
                             already exists

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

## Basic Example {#Creatingchannels-Basicexample}

The following command will create a channel in *MyProject* called *Experimental* using the *Test Only* lifecycle instead

```bash
Octo create-channel --project MyProject --name Experimental --lifecycle "Test Only" --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/api-and-integration/api/how-to-create-an-api-key.md).
:::
