---
title: Creating releases
description: Using the Octo.exe command line tool to create releases.
position: 2
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to automate the creation of releases using the **`create-release`** command. This allows you to easily integrate Octopus with other continuous integration servers.

This command allows you to create a release, and optionally deploy it to one or more environments.

:::success
**Using Channels?**
If you are using Channels (introduced in Octopus 3.2) this command will automatically select the most appropriate channel for your release, unless you provide a specific channel using `--channel=VALUE`.
:::

Usage:

```bash
octo create-release [<options>]
```

Where `[<options>]` is any of:

**Create release options**

```text
Release creation: 

      --project=VALUE        Name of the project
      --defaultpackageversion, --packageversion=VALUE
                             Default version number of all packages to use 
                             for this release. Override per-package using --
                             package
      --version, --releaseNumber=VALUE
                             [Optional] Release number to use for the new 
                             release.
      --channel=VALUE        [Optional] Channel to use for the new release. 
                             Omit this argument to automatically select the 
                             best channel.
      --package=StepName     [Optional] Version number to use for a package 
                             in the release. Format: --
                             package=StepName:Version
      --packagesFolder=VALUE [Optional] A folder containing NuGet packages 
                             from which we should get versions.
      --releasenotes=VALUE   [Optional] Release Notes for the new release.
      --releasenotesfile=VALUE
                             [Optional] Path to a file that contains Release 
                             Notes for the new release.
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
                             [Optional] A comma-separated list of machines 
                             names to target in the deployed environment. If 
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
                             the format Label:Value
      --deployat=VALUE       [Optional] Time at which deployment should start 
                             (scheduled deployment), specified as any valid 
                             DateTimeOffset format, and assuming the time 
                             zone is the current local time zone.
      --deployto=VALUE       [Optional] Environment to automatically deploy 
                             to, e.g., Production
      --tenant=VALUE         [Optional] A tenant the deployment will be performed for; 
                             specify this argument multiple times to add multiple tenants or 
                             use  `*` wildcard to deploy to tenants able to deploy.
      --tenanttag=VALUE	     [Optional] A tenant tag used to match tenants that the deployment will 
                             be performed for; specify this argument multiple times to 
                             add multiple tenant tags

Common options: 

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

```

## Basic examples {#Creatingreleases-Basicexamples}

This will create a new release of the *HelloWorld* project using the latest available NuGet packages for each step in the project. The version number of the release will be the highest NuGet package version. You can override this using:

```bash
octo create-release --project HelloWorld --server http://octopus/ --apiKey API-ABCDEF123456
```

This will create a release with a specified release number (note that this is not the NuGet package version number):

```bash
octo create-release --project HelloWorld --version 1.0.3 --server http://octopus/ --apiKey API-ABCDEF123456
```

## Specifying the package version {#Creatingreleases-Specifyingthepackageversion}

This will create a release *(1.0.3)* with a specified NuGet package version *(1.0.1)*:

```bash
octo create-release --project HelloWorld --version 1.0.3 --packageversion 1.0.1 --server http://octopus/ --apiKey API-ABCDEF123456
```

This will create a release for a project with multiple packages, each with a different version:

```bash
octo create-release --project HelloWorld --version 1.0.3 --package StepA:1.0.1 --package StepB:1.0.2 --server http://octopus/ --apiKey API-ABCDEF123456
```

This will create a release for a project with multiple packages, by taking the version for each package from a folder containing the packages (this approach works well if your build server has just built the packages):

```bash
octo create-release --project HelloWorld --version 1.0.3 --packagesFolder packages --server http://octopus/ --apiKey API-ABCDEF123456
```

## Deploying a release after creating it {#Creatingreleases-Deployingareleaseaftercreatingit}

To create a release *and* deploy it to an environment named *Production*:

```bash
octo create-release --project HelloWorld --deployto Production --server http://octopus/ --apiKey API-ABCDEF123456 --progress
```
