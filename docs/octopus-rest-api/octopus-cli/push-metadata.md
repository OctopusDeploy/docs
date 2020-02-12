---
title: push-metadata
description: Pushes package metadata to Octopus Server.
position: 285
---

Pushes package metadata (and [build information](/docs/packaging-applications/build-servers/index.md#build-information)) to your Octopus Server.

This command has been deprecated. Please use the [build-information](/docs/octopus-rest-api/octopus-cli/build-information.md) command for Octopus Server 2019.10.0 and above.

**push-metadata options**

```text
Usage: octo push-metadata [<options>]

Where [<options>] is any of:

Package metadata pushing:

      --package-id=VALUE     The ID of the package, e.g., 'MyCompany.MyApp'.
      --version=VALUE        The version of the package; defaults to a
                             timestamp-based version
      --metadata-file=VALUE  Octopus Package metadata Json file.
      --overwrite-mode=VALUE If the package metadata already exists in the
                             repository, the default behavior is to reject
                             the new package metadata being pushed
                             (FailIfExists). You can use the overwrite mode
                             to OverwriteExisting or IgnoreIfExists.
      --replace-existing     If the package metadata already exists in the
                             repository, the default behavior is to reject
                             the new package metadata being pushed. You can
                             pass this flag to overwrite the existing package
                             metadata. This flag may be deprecated in a
                             future version; passing it is the same as using
                             the OverwriteExisting overwrite-mode.

Common options:

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid
                             option is json
      --outputFormat=VALUE   [Optional] Output format, only valid option is
                             json
      --server=VALUE         [Optional] The base URL for your Octopus Server,
                             e.g., 'https://octopus.example.com/'. This URL
                             can also be set in the OCTOPUS_CLI_SERVER
                             environment variable.
      --apiKey=VALUE         [Optional] Your API key. Get this from the user
                             profile page. Your must provide an apiKey or
                             username and password. If the guest account is
                             enabled, a key of API-GUEST can be used. This
                             key can also be set in the OCTOPUS_CLI_API_KEY
                             environment variable.
      --user=VALUE           [Optional] Username to use when authenticating
                             with the server. Your must provide an apiKey or
                             username and password. This Username can also be
                             set in the OCTOPUS_CLI_USERNAME environment
                             variable.
      --pass=VALUE           [Optional] Password to use when authenticating
                             with the server. This Password can also be set
                             in the OCTOPUS_CLI_PASSWORD environment variable.
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
      --keepalive=VALUE      [Optional] How frequently (in seconds) to send a
                             TCP keepalive packet.
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.
```

