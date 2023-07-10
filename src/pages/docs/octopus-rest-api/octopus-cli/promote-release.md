---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Promote release
description: Using the Octopus CLI to promote releases between environments.
navOrder: 270
---

The [Octopus CLI](/docs/octopus-rest-api/octopus-cli) can be used to promote a release from one environment to another.

```text
Promotes a release.

Usage: octo promote-release [<options>]

Where [<options>] is any of:

Release Promotion:

      --project=VALUE        Name or ID of the project.
      --from=VALUE           Name or ID of the environment to get the current
                             deployment from, e.g., 'Staging' or
                             'Environments-2'.
      --to, --deployTo=VALUE Name or ID of the environment to deploy to, e.g-
                             ., 'Production' or 'Environments-1'.
      --updateVariables      Overwrite the variable snapshot for the release
                             by re-importing the variables from the project.
      --latestSuccessful     Use the latest successful release to promote.

Deployment:

      --progress             [Optional] Show progress of the deployment.
      --forcePackageDownload [Optional] Whether to force downloading of
                             already installed packages (flag, default false).
      --waitForDeployment    [Optional] Whether to wait synchronously for
                             deployment to finish.
      --deploymentTimeout=VALUE
                             [Optional] Specifies maximum time (timespan
                             format) that the console session will wait for
                             the deployment to finish(default 00:10:00). This
                             will not stop the deployment. Requires --
                             waitForDeployment parameter set.
      --cancelOnTimeout      [Optional] Whether to cancel the deployment if
                             the deployment timeout is reached (flag, default
                             false).
      --deploymentCheckSleepCycle=VALUE
                             [Optional] Specifies how much time (timespan
                             format) should elapse between deployment status
                             checks (default 00:00:10).
      --guidedFailure=VALUE  [Optional] Whether to use guided failure mode.
                             (True or False. If not specified, will use
                             default setting from environment).
      --specificMachines=VALUE
                             [Optional] A comma-separated list of machine
                             names to target in the deployed environment. If
                             not specified all machines in the environment
                             will be considered.
      --excludeMachines=VALUE
                             [Optional] A comma-separated list of machine
                             names to exclude in the deployed environment. If
                             not specified all machines in the environment
                             will be considered.
      --force                [Optional] If a project is configured to skip
                             packages with already-installed versions,
                             override this setting to force re-deployment
                             (flag, default false).
      --skip=VALUE           [Optional] Skip a step by name.
      --noRawLog             [Optional] Don't print the raw log of failed
                             tasks.
      --rawLogFile=VALUE     [Optional] Redirect the raw log of failed tasks
                             to a file.
  -v, --variable=VALUE       [Optional] Specifies the value for a prompted
                             variable in the format Label:Value. For JSON
                             values, embedded quotation marks should be
                             escaped with a backslash.
      --deployAt=VALUE       [Optional] Time at which deployment should start
                             (scheduled deployment), specified as any valid
                             DateTimeOffset format, and assuming the time
                             zone is the current local time zone.
      --noDeployAfter=VALUE  [Optional] Time at which scheduled deployment
                             should expire, specified as any valid
                             DateTimeOffset format, and assuming the time
                             zone is the current local time zone.
      --tenant=VALUE         [Optional] Create a deployment for the tenant
                             with this name or ID; specify this argument
                             multiple times to add multiple tenants or use
                             `*` wildcard to deploy to all tenants who are
                             ready for this release (according to lifecycle).
      --tenantTag=VALUE      [Optional] Create a deployment for tenants
                             matching this tag; specify this argument
                             multiple times to build a query/filter with
                             multiple tags, just like you can in the user
                             interface.

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

## Basic Example {#Promotingreleases-Basicexample}

The following command promotes the latest release of the *Web* project deployed to Development to the environment Staging.

```bash
octo promote-release --project Web --from Development --to Staging -progress --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)
- [Releases](/docs/releases)
