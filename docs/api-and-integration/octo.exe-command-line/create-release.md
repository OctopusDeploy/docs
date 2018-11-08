---
title: Creating Releases
description: Using the Octo.exe command line tool to create releases.
position: 2
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to automate the creation of releases using the **`create-release`** command. This allows you to easily integrate Octopus with other continuous integration servers.

This command allows you to create a release, and optionally deploy it to one or more environments.

:::success
**Using Channels?**
If you are using [Channels](/docs/deployment-process/channels/index.md) (introduced in **Octopus 3.2**) this command will automatically select the most appropriate channel for your release, unless you provide a specific channel using `--channel=VALUE`.
:::

Usage:

```text
Usage: octo create-release [<options>]

Where [<options>] is any of:

Release creation:

      --project=VALUE        Name of the project
      --defaultpackageversion, --packageversion=VALUE
                             Default version number of all packages to use
                             for this release. Override per-package using --
                             package.
      --version, --releaseNumber=VALUE
                             [Optional] Release number to use for the new
                             release.
      --channel=VALUE        [Optional] Channel to use for the new release.
                             Omit this argument to automatically select the
                             best channel.
      --package=VALUE        [Optional] Version number to use for a package
                             in the release. Format: StepName:Version or
                             PackageID:Version or
                             StepName:PackageName:Version. StepName,
                             PackageID, and PackageName can be replaced with
                             an asterisk.
      --packagesFolder=VALUE [Optional] A folder containing NuGet packages
                             from which we should get versions.
      --releasenotes=VALUE   [Optional] Release Notes for the new release.
                             Styling with Markdown is supported.
      --releasenotesfile=VALUE
                             [Optional] Path to a file that contains Release
                             Notes for the new release. Supports Markdown
                             files.
      --ignoreexisting       [Optional, Flag] Don't create this release if
                             there is already one with the same version
                             number.
      --ignorechannelrules   [Optional, Flag] Create the release ignoring any
                             version rules specified by the channel.
      --packageprerelease=VALUE
                             [Optional] Pre-release for latest version of all
                             packages to use for this release.
      --whatif               [Optional, Flag] Perform a dry run but don't
                             actually create/deploy release.

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
      --deployto=VALUE       [Optional] Environment to automatically deploy
                             to, e.g., Production

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
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.
```

## Basic Examples {#Creatingreleases-Basicexamples}

This will create a new release of the *HelloWorld* project using the latest available NuGet packages for each step in the project. The version number of the release will be the highest NuGet package version. You can override this using:

```bash
octo create-release --project HelloWorld --server http://octopus/ --apiKey API-ABCDEF123456
```

This will create a release with a specified release number (note that this is not the NuGet package version number):

```bash
octo create-release --project HelloWorld --version 1.0.3 --server http://octopus/ --apiKey API-ABCDEF123456
```

## Specifying the Package Version {#Creatingreleases-Specifyingthepackageversion}

For each step that has a package, the version is determined in the following order:

 1. The step name matches a `--package` parameter or a file filename found by `--packagesFolder`.
 1. The package id matches a `--package` parameter or a file found by `--packagesFolder`.
 1. The value from the ` --defaultpackageversion` or `--packageversion` parameter.

 If there are duplicate names/ids resulting from the `--package` and `--packagesFolder` parameters, the last one specified is used.

### Option --packageVersion
This will create a release *(1.0.3)* with a specified NuGet package version *(1.0.1)*:

```bash
octo create-release --project HelloWorld --version 1.0.3 --packageVersion 1.0.1 --server http://octopus/ --apiKey API-ABCDEF123456
```

### Option --package
This will create a release for a project with multiple packages, each with a different version. You are able to specify a step name and version pair with this option. This way you can use different versions of the same package for different steps:

```bash
octo create-release --project HelloWorld --version 1.0.3 --package StepA:1.0.1 --package StepB:1.0.2 --server http://octopus/ --apiKey API-ABCDEF123456
```

If you want to use a specific version of a package for `StepA`, and the latest version of the package available for `StepB`, you can simply omit the parameter for the second step/package:

```bash
octo create-release --project HelloWorld --version 1.0.3 --package StepA:1.0.1 --server http://octopus/ --apiKey API-ABCDEF123456
```

The example above will use `1.0.3` for `StepA`, and the latest version available at the moment for `StepB`.

For steps which have multiple packages (e.g. _Run a Script_ steps can [reference multiple packages](/docs/deployment-examples/custom-scripts/standalone-scripts.md#referencing-packages
)), the format `StepName:PackageName:Version` can also be used:  

```bash
octo create-release --project HelloWorld --version 1.0.3 --package StepA:Acme.Web:1.0.0 --package StepA:Acme.Data:2.0.0 --server http://octopus/ --apiKey API-ABCDEF123456
```

In the example above, `StepA` will use `1.0.0` for `Acme.Web` and `2.0.0` for `Acme.Data`. 

### Option --packagesFolder

This will create a release for a project with multiple packages, by taking the version for each package from a folder containing the packages (this approach works well if your build server has just built the packages):

```bash
octo create-release --project HelloWorld --version 1.0.3 --packagesFolder packages --server http://octopus/ --apiKey API-ABCDEF123456
```

## Deploying a Release After Creating It {#Creatingreleases-Deployingareleaseaftercreatingit}

To create a release *and* deploy it to an environment named *Production*:

```bash
octo create-release --project HelloWorld --deployto Production --server http://octopus/ --apiKey API-ABCDEF123456 --progress
```

## Release Notes Supported Syntax
We use [showdownjs](https://github.com/showdownjs/showdown) to render release notes on the dashboard.
Showdownjs supports the common markdown syntax as well as a rich set of extras such as tables and task lists. For the full list see https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax.
