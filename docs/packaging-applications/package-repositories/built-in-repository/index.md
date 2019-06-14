---
title: Built-in Octopus Repository
description: Using the Octopus built-in repository.
position: 10
---

Your Octopus server comes with a built-in repository which is the best choice for deployment packages. It offers **better performance** for your deployments and the most **robust [retention policy](/docs/administration/retention-policies/index.md) support** for deployment packages.

:::hint
**Built-in Feed Can Only Be Consumed by Octopus**
It is important to understand that the Octopus Server provides a write-only repository; intended for hosting deployment packages only. Packages that are pushed to the Octopus Server can't be consumed by other NuGet clients like Visual Studio. If you need a NuGet feed for sharing libraries between your development projects, a separate NuGet repository is required.
:::

## Pushing Packages to the Built-in Repository {#Packagerepositories-Pushingpackagestothebuilt-inrepository}

We offer several ways to add packages to the built-in repository, so many that we built a new page: [pushing packages to the built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md). Alternatively you can go to **{{Library,Packages}}** which describes some of the most convenient ways to push packages to the built-in repository.  Simply click the **Show examples** link to see options to upload packages.

![](/docs/images/3048094/3277775.png)

:::success
To push packages to the built-in repository you will need an [Octopus API key](/docs/octopus-rest-api/how-to-create-an-api-key.md).
:::

## Security Considerations {#Packagerepositories-Securityconsiderations}

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

## Moving the Location of the Built-in Repository {#Packagerepositories-Movingthelocationofthebuilt-inrepository}

See [moving Octopus Server folders](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome).

## Built-in Repository Reindexing

Octopus automatically re-indexes the built-in repository at startup to ensure that it is in sync.

We do not recommend manually placing packages into the package store, however in certain limited circumstances (such as restoring a backup or a big package migration) it can be useful.

For most users, this will be a seamless background task. However, for some installations, this may cause performance issues. Users with `AdministerSystem` rights can disable the re-indexing task on the **{{Library,Packages}}** page.

Note that packages uploaded via the [recommended methods](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) will still be indexed.
