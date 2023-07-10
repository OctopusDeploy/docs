---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create auto deployment override
description: Using the Octopus CLI to create automatic deployment release overrides.
navOrder: 30
---

The [Octopus CLI](/docs/octopus-rest-api/octopus-cli) can be used to create automatic deployment release overrides.

```text
Overrides the release that auto deploy will use.

Usage: octo create-autodeployoverride [<options>]

Where [<options>] is any of:

Auto deploy release override:

      --project=VALUE        Name of the project.
      --environment=VALUE    Name of an environment the override will apply
                             to. Specify this argument multiple times to add
                             multiple environments.
      --version, --releaseNumber=VALUE
                             Release number to use for auto deployments.
      --tenant=VALUE         [Optional] Name of a tenant the override will
                             apply to. Specify this argument multiple times
                             to add multiple tenants or use `*` wildcard for
                             all tenants.
      --tenantTag=VALUE      [Optional] A tenant tag used to match tenants
                             that the override will apply to. Specify this
                             argument multiple times to add multiple tenant
                             tags

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

## Basic example {#Creatingautodeployoverrides-Basicexample}

The following creates an automatic deployment release override for version 1.3.0 of the project *HelloWorld* to the environment Development:

```bash
octo create-autodeployoverride --project HelloWorld --environment Development --version 1.3.0 --server http://octopus/ --apikey API-ABCDEF123456
```

## Tenanted example (by name) {#Creatingautodeployoverrides-Tenantedexample(byname)}

The following creates an automatic deployment release override for version 1.3.0 of the project *HelloWorld* to the environment Development for the tenant *Acme*:

```bash
octo create-autodeployoverride --project HelloWorld --environment Development --tenant Acme --version 1.3.0 --server http://octopus/ --apikey API-ABCDEF123456
```

## Tenanted example (by tags) {#Creatingautodeployoverrides-Tenantedexample(bytags)}

The following creates an automatic deployment release override for version 1.3.0 of the project *HelloWorld* to the environment Development for all tenants with the *Hosting/Cloud* tag:

```bash
octo create-autodeployoverride --project HelloWorld --environment Development --tenanttag Hosting/Cloud --version 1.3.0 --server http://octopus/ --apikey API-ABCDEF123456
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)
- [Automatic deployments](/docs/projects/project-triggers/deployment-target-triggers)
