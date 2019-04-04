---
title: Retention Policies
description: Retention policies allow you to specify the releases, packages and files you want to keep as well as the ones you want cleaned up.
position: 90
---

As you deploy more often and to different environments, files and releases can build up. This is what retention policies are for. They allow you to define what is kept in terms of releases, packages and files.  

:::hint
We talk about Tentacles in this page, but the same process and logic applies to [SSH Targets](/docs/infrastructure/deployment-targets/linux/index.md) also.
:::

## What is Deleted {#RetentionPolicies-Whatisdeleted}

There are three different types of retention policies that run. Those on the Octopus Server, those on the Tentacle and those in the in-built NuGet repository.

### Releases

The Octopus Server settings delete **releases** from the database. This is a data deletion. It also cleans up any **artifacts**, **deployments, tasks, events** and **logs** attached to the release. Releases that are still on the overall dashboard are never deleted. It is assumed to be the working release and may still be promoted (even if their dates fall well outside the retention policy). No packages from the internal NuGet repository will be deleted as part of this policy, but they may be deleted by a corresponding repository retention policy.

### Tentacle Files

The Tentacle settings delete **packages**, and expanded **files and folders** from packages on the Tentacle machine that is being deployed to. Note that if you use the [Custom Installation Directory ](/docs/deployment-process/configuration-features/custom-installation-directory.md)feature, we will never delete from that directory during retention policies. This can be purged during deployment in the project step settings. But it is assumed this will have a working release in it.

### Built-in Repository

The in-built repository will delete any **packages** that are not attached to any release. If you happen to have higher versions of packages that have not been released, we will keep them assuming a release will be created. If you delete releases using the Octopus Server retention policy then any packages that were associated with those releases will then be deleted with that task.

A list of packages IDs that a project has deployed is kept and then used to determine retention for projects that [dynamically select packages using variables](/docs/deployment-examples/package-deployments/dynamically-selecting-packages.md). A package will be kept if it appears in that list and the package's version matches any of the package versions referenced by the project's releases.

## When the Retention Policies are Applied {#RetentionPolicies-Whentheretentionpoliciesareapplied}

Both the Octopus Server and NuGet repository retention policies are run under a scheduled task from the Octopus Server every 4 hours. This task does not apply retention policies to Tentacles.

Tentacle retention policies are run **during a deployment**, specifically **after all package acquisition steps have completed**. So if you have a retention policy of 3 days and do not deploy to a Tentacle for 5 days, the files that are over 3 days old will not be deleted until after a deployment is run to that Tentacle. It will also only delete any packages or files that are associated with the **current project** being deployed. If it's a development server, and you have multiple projects deploying there, only the active deployed project files will be deleted. It does not have any information about other project's retention policies tagged with the deployment.

## How Retention Policies Work With Lifecycle Phases {#RetentionPolicies-HowretentionpoliciesworkwithLifecyclephases}

You can set individual retention policies to phases. This gives you much more control over environments, such as never deleting from Production but having a strict rigorous deletion from your Development environment.

But how does it work? For a release we determine what phase it is currently in. So if a release is created and no deployments have been done, the default Lifecycle retention policy is the active setting for that release. When it is then deployed to the first phase, that retention policy becomes the active setting for the release, and so on. So when the release hits the production phase, and is set to keep all, that release will be kept, as will any deployments done to any environment of that release.

If you have an Octopus Server retention policy for a project that has a final phase of keep all releases, once the release enters that phase it will never be deleted. But if you have a release that has not yet deployed to any environments in the final phase, and is set to only keep the last 3 releases, then the release will be deleted when it becomes the 4th release of the project that has not yet been deployed to any final phase environment. (Unless it is still on the dashboard!).

## Set Retention Policies {#RetentionPolicies-IthinkIgotit,howdoIsetmyretentionpolicies?}

Under **{{Library,Lifecycles}}** you select the Lifecycle you want to define or edit your retention policy for:

![](/docs/images/3048140/3278063.png)

Each phase will inherit the retention policy from the above phase, but this is something you can change.

![](/docs/images/3048140/3278062.png)

Clicking on the change link will bring up a dialog to change your retention policy.

![](/docs/images/3048140/3278061.png)

Releases determines what is kept on the Octopus Server, and Files on Tentacle determines what files are kept on the Tentacle.

You can keep all, or select a number of releases to keep.

You are also able to specify a number of days worth of releases and files to keep if this is preferred.

## NuGet Feed Retention Policy {#RetentionPolicies-NuGetfeedretentionpolicy}

You can find the in-built repository retention policy settings under **{{Library,Packages}}**.

![](/docs/images/3048140/3278060.png)

This can also be set to keep a set number, or keep for a set number of days:

![](/docs/images/3048140/3278059.png)

:::success
**External Feeds**
Octopus does not apply any retention policies to external feeds. However the packages that are currently in-use can be retrieved from the API ([example](https://github.com/OctopusDeploy/OctopusDeploy-Api/blob/master/Octopus.Client/LINQPad/GetInUsePackages.linq)) and those results then used to remove packages from those feeds.
:::
