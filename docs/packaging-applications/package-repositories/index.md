---
title: Package repositories
position: 0
---


When planning your Octopus installation, you will need to decide how to host your packages. Your continuous integration server should create your packages, and publish them to a package repository.

:::hint
**Supported package and repository types**
The Octopus built-in repository [supports several different types of packages](/docs/home/packaging-applications/supported-packages.md). If you would like to use a package type other than NuGet (zip or tag.gz for example) you must use the Octopus built-in repository.


If you would like to use an external repository, the only external repository type supported are [NuGet feeds](https://docs.nuget.org/create/hosting-your-own-nuget-feeds) (either HTTP or file-system based feeds). If you want to use an external repository, you must use NuGet packages.
:::


On this page:


- Choosing the right repository
- Using the built-in repository
 - Pushing packages to the built-in repository
 - Security considerations
 - Moving the location of the built-in repository
- Using external repositories
- NuGet.Server performance
- Troubleshooting


Your package repository will typically be:

- The Octopus server's built-in repository
- A [remote feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Remote_Feeds "Remote NuGet feeds") exposed over HTTP
- A [local feed](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds "Local NuGet package repositories") exposed as a File Share or local directory
- A [JetBrains TeamCity](http://blogs.jetbrains.com/dotnet/2011/08/native-nuget-support-in-teamcity/ "JetBrains TeamCity") server (version 7 and above)
- A [MyGet](http://www.myget.org/ "MyGet") server
- A [VSTS Package Management](https://www.visualstudio.com/en-us/docs/package/overview) feed (see note below)


:::success
**Mix and match feeds**
Octopus can consume packages from multiple feeds at once if necessary.
:::

:::warning
**NuGet v3 feed support**
Support for NuGet v3 external feeds was introduced in Octopus Deploy 3.4.


Earlier releases of Octopus Deploy only support external NuGet v2 feeds:

- If you are using a MyGet external feed, please use the [v2 API URL](http://docs.myget.org/docs/reference/feed-endpoints) or upgrade to Octopus 3.4 (or later)
:::

:::warning
**VSTS Package Feeds**
If you are using VSTS Package Management, Octopus can consume either the v2 or v3 NuGet feeds.

- To connect to the v3 URL, you must use [a Personal Access Token](https://www.visualstudio.com/en-us/docs/integrate/get-started/auth/overview) in the password field. The username field is not used, so you can put anything in here. Ensure that the PAT has (at least) the *Packaging (read)* scope.
- To connect to the v2 URL, you can use either [alternate credentials or a Personal Access Token](https://www.visualstudio.com/en-us/docs/integrate/get-started/auth/overview) in the password field.
:::

## Choosing the right repository

:::success
The Octopus built-in repository is generally the best choice for deployment packages because it offers better performance and most suitable [retention policies](/docs/home/administration/retention-policies.md).
:::


Our recommendation is to use different repositories for different purposes, and each repository provides different benefits. A typical example is where you produce your own application library packages in addition to your own deployment packages:

- For application library packages consider using the repository provided by your build server, a [file-share](http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds#Creating_Local_Feeds), or something like [MyGet](http://www.myget.org/ "MyGet") or [VSTS Package Management](https://www.visualstudio.com/en-us/docs/package/overview).
- For deployment packages consider using the Octopus built-in repository (see below).



This configuration will make it easier to find the right packages for the right purpose, but the most important benefit of the built-in repository is that Octopus Deploy knows exactly which deployment packages are still required according to the [retention policies](/docs/home/administration/retention-policies.md) you have configured, and which packages can be cleaned up.

## Using the built-in repository


Your Octopus server comes with a built-in repository which is the best choice for deployment packages. It offers **better performance** for your deployments and the most **robust [retention policy](/docs/home/administration/retention-policies.md)****support** for deployment packages.

:::hint
**Built-in feed can only be consumed by Octopus**
It is important to understand that the Octopus server provides a write-only repository; intended for hosting deployment packages only. Packages that are pushed to the Octopus server can't be consumed by other NuGet clients like Visual Studio. If you need a NuGet feed for sharing libraries between your development projects, a separate NuGet repository is required.
:::

### Pushing packages to the built-in repository


We offer several ways to add packages to the built-in repository, so many that we built a new page: [pushing packages to the built-in repository](/docs/home/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md). Alternatively you can go to *Library > Packages* which describes some of the most convenient ways to push packages to the built-in repository.


![](/docs/images/3048094/3277775.png)

:::success
To push packages to the built-in repository you will need an [Octopus API key](/docs/home/how-to/how-to-create-an-api-key.md).
:::

### Security considerations


To add a new package to the built-in feed requires the `BuiltInFeedPush` permission. To delete a package, or replace an existing package requires the `BuiltInFeedAdminister` permission.


For your convenience Octopus Deploy provides a built-in role called **Package Publisher** that has been granted the `BuiltInFeedPush` permission.

:::hint
**Consider using a Service Account**
Instead of using your own API key, consider using a [Service Account](/docs/home/administration/managing-users-and-teams/service-accounts.md) to provide limited permissions since packages will normally be pushed by an automated service like your build server. Service Accounts are API-only accounts that cannot be used sign in to the Octopus Deploy web portal.
:::

:::hint
**Using automatic release creation?**
If you are using [automatic release creation](/docs/home/deploying-applications/automatic-release-creation.md) you will also require the permissions to create a release for all of the relevant projects in the required environments. To diagnose issues with pushing packages used for automatic release creation follow the troubleshooting guide on the [automatic release creation](/docs/home/deploying-applications/automatic-release-creation.md) page.
:::

### Moving the location of the built-in repository


In 3.0 you can now configure the directory that these packages are kept in. You will need to follow the steps below or you may lose some data.

1. Stop your Octopus Server service
2. Update the path location using the following command

```powershell
Octopus.Server.exe path --nugetRepository=your new location
```
3. Move your files from the old path (default is:  C:\Octopus\Packages) to your new location
4. Restart the Octopus Server service



The restart of the service will re-index the directory. If it is missing files, they will then go missing from the internal repository and again from your releases. So be sure that all files are moved.

## Using external repositories

:::hint
**Only NuGet feeds are supported**
The only external repository type supported is NuGet. If you wish to use an external repository, you must use NuGet packages.
:::

:::warning
**NuGet v3 feed support**
Support for NuGet v3 external feeds was introduced in Octopus Deploy 3.4.


Earlier releases of Octopus Deploy only support external NuGet v2 feeds:

- If you are using a MyGet external feed, please use the [v2 API URL](http://docs.myget.org/docs/reference/feed-endpoints) or upgrade to Octopus 3.4 (or later)
:::


If you're using an external NuGet feed, you can register it with Octopus and use them as part of your deployments. Go to *Library > External feeds*.


![](/docs/images/3048094/3277774.png)


You can add NuGet feeds by clicking the **Add feed** button.


![](/docs/images/3048094/3277773.png)


In the URL field, enter the HTTP/HTTPS URL to the feed, or the file share or local directory path. Then click **Save and test**.


On the test page, you can check whether the feed is working by searching for packages:


![](/docs/images/3048094/3277772.png)

## NuGet.Server performance


A popular external NuGet hosting option is **NuGet.Server.**However, be aware that it suffers from performance problems when dealing with large packages or large numbers of smaller packages. Users may report high CPU usage, timeouts when displaying package details, or memory issues. A great alternative that we recommend is [NuGet.Lucene](https://github.com/themotleyfool/NuGet.Lucene).


The built-in NuGet server in Octopus stores metadata in SQL Server, and doesn't suffer from these performance issues.

## Troubleshooting

- For network file shares, keep in mind that Octopus and Tentacle run under system accounts by default, which may not have access to the file share
- NuGet.Server only allows 30MB packages [by default](http://help.octopusdeploy.com/discussions/problems/184-30mb-default-maximum-nuget-package-size)
