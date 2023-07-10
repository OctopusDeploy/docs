---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Push metadata
description: Pushes package metadata to Octopus Server.
navOrder: 285
---

This command has been deprecated. Please use the [build-information](/docs/octopus-rest-api/octopus-cli/build-information) command for Octopus Server 2019.10.0 and above.

Pushes package metadata (and [build information](/docs/packaging-applications/build-servers/build-information)) to your Octopus Server.

```text
Pushes package metadata to Octopus Server.  Deprecated. Please use the build-information command for Octopus Server 2019.10.0 and above.

Usage: octo push-metadata [<options>]

Where [<options>] is any of:

Package metadata pushing:

      --package-id=VALUE     The ID of the package, e.g., 'MyCompany.MyApp'.
      --version=VALUE        The version of the package; defaults to a
                             timestamp-based version.
      --metadata-file=VALUE  Octopus Package metadata Json file.
      --overwrite-mode=VALUE Determines behavior if the package already
                             exists in the repository. Valid values are
                             FailIfExists, OverwriteExisting and
                             IgnoreIfExists. Default is FailIfExists.
      --replace-existing     If the package metadata already exists in the
                             repository, the default behavior is to reject
                             the new package metadata being pushed. You can
                             pass this flag to overwrite the existing package
                             metadata. This flag may be deprecated in a
                             future version; passing it is the same as using
                             the OverwriteExisting overwrite-mode.

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

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)
