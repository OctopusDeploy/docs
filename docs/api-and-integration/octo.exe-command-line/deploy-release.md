---
title: deploy-release
description: Using the Octo.exe command line tool to deploy releases.
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to deploy releases that have [already been created](/docs/api-and-integration/octo.exe-command-line/create-release.md).

```text
Usage: octo deploy-release [<options>]

Where [<options>] is any of:

Deployment:

      --progress             [Optional] Show progress of the deployment
      --forcepackagedownload [Optional] Whether to force downloading of
                             already installed packages (flag, default false).
      --waitfordeployment    [Optional] Whether to wait synchronously for
                             deployment to finish.
      --deploymenttimeout=VALUE
                             [Optional] Specifies maximum time (timespan
                             format) that the console session will wait for
                             the deployment to finish(default 00:10:00). This
                             will not stop the deployment. Requires --
                             waitfordeployment parameter set.
      --cancelontimeout      [Optional] Whether to cancel the deployment if
                             the deployment timeout is reached (flag, default
                             false).
      --deploymentchecksleepcycle=VALUE
                             [Optional] Specifies how much time (timespan
                             format) should elapse between deployment status
                             checks (default 00:00:10)
      --guidedfailure=VALUE  [Optional] Whether to use Guided Failure mode.
                             (True or False. If not specified, will use
                             default setting from environment)
      --specificmachines=VALUE
                             [Optional] A comma-separated list of machine
                             names to target in the deployed environment. If
                             not specified all machines in the environment
                             will be considered.
      --excludemachines=VALUE
                             [Optional] A comma-separated list of machine
                             names to exclude in the deployed environment. If
                             not specified all machines in the environment
                             will be considered.
      --force                [Optional] If a project is configured to skip
                             packages with already-installed versions,
                             override this setting to force re-deployment
                             (flag, default false).
      --skip=VALUE           [Optional] Skip a step by name
      --norawlog             [Optional] Don't print the raw log of failed
                             tasks
      --rawlogfile=VALUE     [Optional] Redirect the raw log of failed tasks
                             to a file
  -v, --variable=VALUE       [Optional] Values for any prompted variables in
                             the format Label:Value. For JSON values,
                             embedded quotation marks should be escaped with
                             a backslash.
      --deployat=VALUE       [Optional] Time at which deployment should start
                             (scheduled deployment), specified as any valid
                             DateTimeOffset format, and assuming the time
                             zone is the current local time zone.
      --tenant=VALUE         Create a deployment for this tenant; specify
                             this argument multiple times to add multiple
                             tenants or use `*` wildcard to deploy to all
                             tenants who are ready for this release
                             (according to lifecycle).
      --tenanttag=VALUE      Create a deployment for tenants matching this
                             tag; specify this argument multiple times to
                             build a query/filter with multiple tags, just
                             like you can in the user interface.
      --project=VALUE        Name of the project
      --deployto=VALUE       Environment to deploy to, e.g., Production;
                             specify this argument multiple times to deploy
                             to multiple environments
      --releaseNumber, --version=VALUE
                             Version number of the release to deploy. Or
                             specify --version=latest for the latest release.
      --channel=VALUE        [Optional] Channel to use when getting the
                             release to deploy
      --updateVariables      Overwrite the variable snapshot for the release
                             by re-importing the variables from the project

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

## Basic Examples {#Deployingreleases-Basicexamples}

This will deploy release 1.0.0 of the *HelloWorld* project to the *Production* environment:

```bash
octo deploy-release --project HelloWorld --releaseNumber 1.0.0 --deployto Production --server http://octopus/ --apiKey API-ABCDEF123456
```

This will deploy the latest release in the *1.x Normal* Channel of the *HelloWorld* project to the *Production* environment:

```bash
octo deploy-release --project HelloWorld --channel "1.x Normal" --version latest --deployto Production --server http://octopus/ --apiKey API-ABCDEF123456
```

This will deploy the latest release in the *1.x Normal* Channel of the *HelloWorld* project to the *Production* environment for the Tenants tagged as *Upgrade Ring/Early Adopters*:

```bash
octo deploy-release --project HelloWorld --channel "1.x Normal" --version latest --deployto Production --tenantTag "Upgrade Ring/Early Adopters" --server http://octopus/ --apiKey API-ABCDEF123456
```

:::success
You can deploy to ALL tenants in an environment by using the `--tenant=*` argument. This instructs Octopus to create a deployment for each tenant which is ready for that Release to be deployed to the project/environment.
:::

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/api-and-integration/api/how-to-create-an-api-key.md).
:::
