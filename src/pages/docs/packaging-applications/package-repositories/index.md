---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Package repositories
description: Octopus can consume package feeds from the built-in repository, local and remote NuGet feeds, Maven, JetBrains TeamCity, MyGet and Azure DevOps or TFS Package Management.
navOrder: 30
---

When planning your Octopus installation, you need to decide how to host your packages. Your [build server](/docs/packaging-applications/build-servers/) should create your packages and publish them to a package repository.

The Octopus Server includes a [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/) and supports the following external repositories:

 - [Docker feeds](/docs/packaging-applications/package-repositories/docker-registries/).
 - [GitHub feeds](/docs/packaging-applications/package-repositories/github-feeds/).
 - [Maven feeds](/docs/packaging-applications/package-repositories/maven-feeds/).
 - [NuGet feeds](/docs/packaging-applications/package-repositories/nuget-feeds/).
 - [AWS S3 Bucket feeds](/docs/packaging-applications/package-repositories/s3-feeds/).
 - Helm feeds.
 - AWS ECR feeds.
 
Octopus can consume packages from multiple feeds at once if necessary.

Your package repository will typically be:

- The [built-in Octopus repository](/docs/packaging-applications/package-repositories/built-in-repository/).
- A [remote feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Remote_Feeds) exposed over HTTP.
- A [local NuGet feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds) exposed as a File Share or local directory.
- A [maven feed](/docs/packaging-applications/package-repositories/maven-feeds/).
- A [JetBrains TeamCity](http://blogs.jetbrains.com/dotnet/2011/08/native-nuget-support-in-teamcity/) server (version 7 and above).
- A [MyGet](http://www.myget.org/) server.
- An [Azure DevOps or TFS Package Management](/docs/packaging-applications/package-repositories/guides/nuget-repositories/tfs-azure-devops/).

## Choosing the right repository {#Packagerepositories-Choosingtherightrepository}

Because Octopus can consume packages from multiple feeds, we recommend using different repositories for different  purposes as each repository provides different benefits. For instance, if you produce your own application library packages in addition to your deployment packages you might consider something like the following:

- Use the [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/) for your deployment packages. This is generally the best choice as it offers better performance and through the [retention policies](/docs/administration/retention-policies/) you've configured, Octopus knows which packages are no longer required and can be cleaned up.
- For application library packages consider using the repository provided by your [build server](/docs/packaging-applications/build-servers/), a [file-share](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds), [MyGet](http://www.myget.org/ "MyGet"), or [Azure DevOps Package Management](https://www.visualstudio.com/en-us/docs/package/overview).
- For deployment scripts that you want to store in your source control and where a build process is unnecessary, [GitHub feeds](/docs/packaging-applications/package-repositories/github-feeds/) might be suitable.

## Planning package repository placement {#Packagerepositories-Placement}

By default, when you [deploy a package](/docs/deployments/packages/) to a Tentacle, the package will be pushed from the Octopus Server to the Tentacle. You can override this by changing the setting of the [Action System Variable](/docs/projects/variables/system-variables/#Systemvariables-Action) `Octopus.Action.Package.DownloadOnTentacle` from `False` to `True`. When set to `True` the package will be downloaded by the Tentacle, rather than pushed by the Octopus Server.

To reduce network latency, when your package repository is in close proximity to the Octopus Server leave `Octopus.Action.Package.DownloadOnTentacle` set to the default value of `False`. Alternatively, if you have explicitly set the Tentacles to download packages by the Tentacle to `True`, you should consider placing your package repository in close proximity to your Tentacles.
