---
title: Package Repositories
description: Octopus need to retrieve applications from a package repository; options include the built-in repository, local and remote NuGet feeds, Maven, JetBrains TeamCity, MyGet and Azure DevOps or TFS Package Management.
position: 30
---

When planning your Octopus installation, you will need to decide how to host your packages. Your continuous integration server should create your packages, and publish them to a package repository. A repository can be as simple as a file share, or it could be a dedicated server.

## Supported Package and Repository Types

The Octopus built-in repository [supports several different types of packages](/docs/packaging-applications/index.md#supported-formats).

If you would like to use an external repository, the following external repositories are supported:

 - [NuGet feeds](/docs/packaging-applications/package-repositories/nuget-feeds.md) (either HTTP or file-system based feeds).
 - [Docker feeds](/docs/packaging-applications/package-repositories/docker-registries/index.md).
 - [Maven feeds](/docs/packaging-applications/package-repositories/maven-feeds.md).
 - [GitHub feeds](/docs/packaging-applications/package-repositories/github-feeds.md).

Your package repository will typically be:

- The Octopus Server's [built-in repository](/docs/packaging-applications/package-repositories/index.md).
- A [remote feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Remote_Feeds) exposed over HTTP.
- A [local NuGet feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds) exposed as a File Share or local directory.
- A [maven feed](/docs/packaging-applications/package-repositories/maven-feeds.md).
- A [JetBrains TeamCity](http://blogs.jetbrains.com/dotnet/2011/08/native-nuget-support-in-teamcity/) server (version 7 and above).
- A [MyGet](http://www.myget.org/) server.
- A [Azure DevOps or TFS Package Management](https://www.visualstudio.com/en-us/docs/package/overview) feed (see note below).

:::success
**Mix and Match Feeds**
Octopus can consume packages from multiple feeds at once if necessary.
:::

:::warning
**Azure DevOps Package Feeds**
If you are using Azure DevOps Package Management, Octopus can consume either the v2 or v3 NuGet feeds.

- To connect to the v3 URL, you must use [a Personal Access Token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) in the password field. The username field is not checked, so you can put anything in here as long as it is not blank. Ensure that the PAT has (at least) the *Packaging (read)* scope.
- To connect to the v2 URL, you can use either [alternate credentials or a Personal Access Token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) in the password field.
:::

:::warning
**TFS Package Feeds**
If you are using TFS Package Management, Octopus can consume either the v2 or v3 NuGet feeds. Use a user account's username and password to authenticate.

Although the TFS documentation states that a Personal Access Token can be used, we have not had success authenticating using one with `NuGet.exe`.
:::

## Choosing the Right Repository {#Packagerepositories-Choosingtherightrepository}

:::success
The Octopus built-in repository is generally the best choice for deployment packages because it offers better performance and most suitable [retention policies](/docs/administration/retention-policies/index.md).
:::

Our recommendation is to use different repositories for different purposes, and each repository provides different benefits. A typical example is where you produce your own application library packages in addition to your own deployment packages:

- For application library packages consider using the repository provided by your build server, a [file-share](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds), or something like [MyGet](http://www.myget.org/ "MyGet") or [Azure DevOps Package Management](https://www.visualstudio.com/en-us/docs/package/overview).
- For deployment packages consider using the Octopus built-in repository (see below).
- For deployment scripts that you want to store in your source control and where a build process might be unnecessary, the [GitHub](/docs/packaging-applications/package-repositories/github-feeds.md) feed type may be appropriate.

This configuration will make it easier to find the right packages for the right purpose, but the most important benefit of the built-in repository is that Octopus Deploy knows exactly which deployment packages are still required according to the [retention policies](/docs/administration/retention-policies/index.md) you have configured, and which packages can be cleaned up.

## Planning Package Repository Placement {#Packagerepositories-Placement}

By default, when you deploy a package to a Tentacle, the package will be pushed from the Octopus Server to the Tentacle. You can override this by setting the [Action System Variable](/docs/deployment-process/variables/system-variables.md#Systemvariables-Action) `Octopus.Action.Package.DownloadOnTentacle`, which is a `boolean` data type. When set to `False`, the default behavior is applied and when set to `True` the package will be downloaded by the Tentacle, rather than pushed by the Octopus Server.

To reduce network latency, it is ideal to place your package repository in close proximity to the Octopus Server while `Octopus.Action.Package.DownloadOnTentacle` is set to the default value of `False`. Alternatively if you have explicitly set the Tentacles to download packages by the Tentacle to `True`, you would likely want to place your package repository in close proximity to your Tentacles.
