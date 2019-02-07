---
title: Deleting Auto Deploy Overrides
description: Using the Octo.exe command line tool to delete automatic deployment release overrides.
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to delete automatic deployment release overrides.

```text
Usage: octo delete-autodeployoverride [<options>]

Where [<options>] is any of:

Delete auto deploy release override:

      --project=VALUE        Name of the project
      --environment=VALUE    Name of an environment the override will apply
                             to. Specify this argument multiple times to add
                             multiple environments.
      --tenant=VALUE         [Optional] Name of a tenant the override will
                             apply to. Specify this argument multiple times
                             to add multiple tenants or use `*` wildcard for
                             all tenants.
      --tenanttag=VALUE      [Optional] A tenant tag used to match tenants
                             that the override will apply to. Specify this
                             argument multiple times to add multiple tenant
                             tags

Common options:

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid
                             option is json
      --outputFormat=VALUE   [Optional] Output format, only valid option is
                             json
      --server=VALUE         [Optional] The base URL for your Octopus Server -
                              e.g., http://your-octopus/. This URL can also
                             be set in the OCTOPUS_CLI_SERVER environment
                             variable.
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
      --proxy=VALUE          [Optional] The URI of the proxy to use, eg
                             http://example.com:8080.
      --proxyUser=VALUE      [Optional] The username for the proxy.
      --proxyPass=VALUE      [Optional] The password for the proxy. If both
                             the username and password are omitted and
                             proxyAddress is specified, the default
                             credentials are used.
      --space=VALUE          [Optional] The name of a space within which this
                             command will be executed. The default space will
                             be used if it is omitted.
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.
```

## Basic Example {#Deletingautodeployoverrides-Basicexample}

The following will delete an automatic deployment release override for the project *HelloWorld* to the environment *Development*:

```bash
Octo delete-autodeployoverride --project HelloWorld --environment Development --server http://octopus/ --apikey API-ABCDEF123456
```

## Tenanted Example (By Name) {#Deletingautodeployoverrides-Tenantedexample(byname)}

The following will delete an automatic deployment release override for the project *HelloWorld* to the environment *Development* for the tenant *Acme*:

```bash
Octo delete-autodeployoverride --project HelloWorld --environment Development --tenant Acme --server http://octopus/ --apikey API-ABCDEF123456
```

## Tenanted Example (By Tags) {#Deletingautodeployoverrides-Tenantedexample(bytags)}

The following will delete an automatic deployment release override for the project *HelloWorld* to the environment *Development* for all tenants with the *Hosting/Cloud* tag:

```bash
Octo delete-autodeployoverride --project HelloWorld --environment Development --tenanttag Hosting/Cloud --server http://octopus/ --apikey API-ABCDEF123456
```
