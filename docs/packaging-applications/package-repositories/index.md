---
title: Package Repositories
description: Octopus need to retrieve applications from a package repository; options include the built-in repository, local and remote NuGet feeds, Maven, JetBrains TeamCity, MyGet and Azure DevOps or TFS Package Management.
position: 5
---

When planning your Octopus installation, you will need to decide how to host your packages. Your continuous integration server should create your packages, and publish them to a package repository. A repository can be as simple as a file share, or it could be a dedicated server.

## Supported Package and Repository Types

The Octopus built-in repository [supports several different types of packages](/docs/packaging-applications/supported-packages.md).

If you would like to use an external repository, the following external repositories are supported:

 - [NuGet feeds](https://docs.nuget.org/create/hosting-your-own-nuget-feeds) (either HTTP or file-system based feeds).
 - [Docker feeds](/docs/packaging-applications/package-repositories/docker-registries/index.md).
 - [Maven feeds](/docs/packaging-applications/package-repositories/maven-feeds.md).
 - [GitHub feeds](/docs/packaging-applications/package-repositories/github-feeds.md).

Your package repository will typically be:

- The Octopus Server's built-in repository.
- A [remote feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Remote_Feeds "Remote NuGet feeds") exposed over HTTP.
- A [local feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds "Local NuGet package repositories") exposed as a File Share or local directory.
- A [maven feed](/docs/packaging-applications/package-repositories/maven-feeds.md).
- A [JetBrains TeamCity](http://blogs.jetbrains.com/dotnet/2011/08/native-nuget-support-in-teamcity/ "JetBrains TeamCity") server (version 7 and above).
- A [MyGet](http://www.myget.org/ "MyGet") server.
- A [Azure DevOps or TFS Package Management](https://www.visualstudio.com/en-us/docs/package/overview) feed (see note below).

:::success
**Mix and Match Feeds**
Octopus can consume packages from multiple feeds at once if necessary.
:::

:::warning
**NuGet v3 Feed Support**
Support for NuGet v3 external feeds was introduced in **Octopus 3.4**.

Earlier releases of Octopus Deploy only support external NuGet v2 feeds:

- If you are using a MyGet external feed, please use the [v2 API URL](http://docs.myget.org/docs/reference/feed-endpoints) or upgrade to Octopus 3.4 (or later).
:::

:::warning
**Azure DevOps Package Feeds**
If you are using Azure DevOps Package Management, Octopus can consume either the v2 or v3 NuGet feeds.

- To connect to the v3 URL, you must use [a Personal Access Token](https://www.visualstudio.com/en-us/docs/integrate/get-started/auth/overview) in the password field. The username field is not checked, so you can put anything in here as long as it is not blank. Ensure that the PAT has (at least) the *Packaging (read)* scope.
- To connect to the v2 URL, you can use either [alternate credentials or a Personal Access Token](https://www.visualstudio.com/en-us/docs/integrate/get-started/auth/overview) in the password field.
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

## Using the Built-in Repository {#Packagerepositories-Usingthebuilt-inrepository}

Your Octopus Server comes with a built-in repository which is the best choice for deployment packages. It offers **better performance** for your deployments and the most **robust [retention policy](/docs/administration/retention-policies/index.md) support** for deployment packages.

:::hint
**Built-in Feed Can Only Be Consumed by Octopus**
It is important to understand that the Octopus Server provides a write-only repository; intended for hosting deployment packages only. Packages that are pushed to the Octopus Server can't be consumed by other NuGet clients like Visual Studio. If you need a NuGet feed for sharing libraries between your development projects, a separate NuGet repository is required.
:::

### Pushing Packages to the Built-in Repository {#Packagerepositories-Pushingpackagestothebuilt-inrepository}

We offer several ways to add packages to the built-in repository, so many that we built a new page: [pushing packages to the built-in repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md). Alternatively you can go to {{Library,Packages}} which describes some of the most convenient ways to push packages to the built-in repository.  Simply click the **Show examples** link to see options to upload packages.

![](/docs/images/3048094/3277775.png "width=500")

:::success
To push packages to the built-in repository you will need an [Octopus API key](/docs/api-and-integration/api/how-to-create-an-api-key.md).
:::

### Security Considerations {#Packagerepositories-Securityconsiderations}

To add a new package to the built-in feed requires the `BuiltInFeedPush` permission. To delete a package, or replace an existing package requires the `BuiltInFeedAdminister` permission.

For your convenience Octopus Deploy provides a built-in role called **Package Publisher** that has been granted the `BuiltInFeedPush` permission.

:::hint
**Consider Using a Service Account**
Instead of using your own API key, consider using a [Service Account](/docs/administration/managing-users-and-teams/service-accounts.md) to provide limited permissions since packages will normally be pushed by an automated service like your build server. Service Accounts are API-only accounts that cannot be used sign in to the Octopus Deploy web portal.
:::

:::hint
**Using Automatic Release Creation?**
If you are using [automatic release creation](/docs/deployment-process/project-triggers/automatic-release-creation.md) you will also require the permissions to create a release for all of the relevant projects in the required environments. To diagnose issues with pushing packages used for automatic release creation follow the troubleshooting guide on the [automatic release creation](/docs/deployment-process/project-triggers/automatic-release-creation.md) page.
:::

### Moving the Location of the Built-in Repository {#Packagerepositories-Movingthelocationofthebuilt-inrepository}

See [moving Octopus Server folders](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome)

## Using External Repositories {#Packagerepositories-Usingexternalrepositories}

If you wish to use an external repository, you must use NuGet packages, a [Maven feed](/docs/packaging-applications/package-repositories/maven-feeds.md), [GitHub](/docs/packaging-applications/package-repositories/github-feeds.md) or [Docker registries as feeds](/docs/packaging-applications/package-repositories/docker-registries/index.md).

:::warning
**NuGet v3 Feed Support**
Support for NuGet v3 external feeds was introduced in **Octopus 3.4**.

Earlier releases of Octopus Deploy only support external NuGet v2 feeds:

- If you are using a MyGet external feed, please use the [v2 API URL](http://docs.myget.org/docs/reference/feed-endpoints) or upgrade to **Octopus 3.4** (or later)
:::

If you're using an external NuGet feed, you can register it with Octopus and use them as part of your deployments. Go to {{Library,External feeds}}.

You can add NuGet feeds by clicking the **Add feed** button.

![](/docs/images/3048094/3277774.png "width=500")

In the URL field, enter the HTTP/HTTPS URL to the feed, or the file share or local directory path. Then click **Save and test**.

![](/docs/images/3048094/3277773.png "width=500")

On the test page, you can check whether the feed is working by searching for packages:

![](/docs/images/3048094/3277772.png "width=500")

## Planning Package Repository Placement {#Packagerepositories-Placement}
By default, when you deploy a package to a Tentacle, the package will be pushed from the Octopus Server to the Tentacle. You can override this by setting the [Action System Variable](/docs/deployment-process/variables/system-variables.md#Systemvariables-Action) `Octopus.Action.Package.DownloadOnTentacle`, which is a `boolean` data type. When set to `False`, the default behavior is applied and when set to `True` the package will be downloaded by the Tentacle, rather than pushed by the Octopus Server.

To reduce network latency, it is ideal to place your package repository in close proximity to the Octopus Server while `Octopus.Action.Package.DownloadOnTentacle` is set to the default value of `False`. Alternatively if you have explicitly set the Tentacles to download packages by the Tentacle to `True`, you would likely want to place your package repository in close proximity to your Tentacles.

## NuGet.Server Performance {#Packagerepositories-NuGet.Serverperformance}

A popular external NuGet hosting option is **NuGet.Server**. However, be aware that it suffers from performance problems when dealing with large packages or large numbers of smaller packages. Users may report high CPU usage, timeouts when displaying package details, or memory issues. A great alternative that we recommend is [NuGet.Lucene](https://github.com/themotleyfool/NuGet.Lucene).

The built-in NuGet server in Octopus stores metadata in SQL Server, and doesn't suffer from these performance issues.

## Troubleshooting {#Packagerepositories-Troubleshooting}

- For network file shares, keep in mind that Octopus and Tentacle run under system accounts by default, which may not have access to the file share.
- NuGet.Server only allows 30MB packages [by default](http://help.octopus.com/discussions/problems/184-30mb-default-maximum-nuget-package-size).

A good first step for diagnosing NuGet feed issues is to ensure that the NuGet command line executable can access the same feed from the Octopus Server or target machine if the `Each Tentacle will download the package directly from the remote server` option is selected. The following steps can be used to troubleshoot NuGet feeds.

Run the command:

```
nuget list -Source http://example.com/MyFeed/nuget/v3/index.json
```

replacing `http://example.com/MyFeed/nuget/v3/index.json` with the path to the NuGet V3 URL. The expected output of this command is a list of the packages in the repository.

If this command prompts for credentials, then the feed is most likely private, and Octopus will need to be configured with the same credentials.

If the repository can not be accessed, you will see an error like:

```
Unable to load the service index for source http://example.com/MyFeed/nuget/v3/index.json.
```

along with additional details that can look like:

* Response status code does not indicate success: 404 (Not Found).
* An error occurred while sending the request. The remote name could not be resolved: 'hostname'.

These errors give you an indication as to why NuGet could not access the requested server.
