---
title: Retention policies
description: Retention policies allow you to specify the releases, packages and files you want to keep as well as the ones you want cleaned up.
position: 90
hideInThisSectionHeader: true
---

As you deploy more often and to different environments, files and releases can build up. Octopus handles this using retention policies. They allow you to control how Octopus decides which releases, packages and files are kept.   

## What is deleted {#what-is-deleted}

There are a number of different types of retention policies that run. Those on the Octopus Server, those on the Tentacle and those in the built-in package repository.

### Releases {#releases-whats-deleted}

The Octopus Server settings delete **releases** from the database. This is a data deletion. It also cleans up any **artifacts**, **deployments, tasks, events** and **logs** attached to the release. No packages from the internal package repository will be deleted as part of this policy, but they may be deleted by a corresponding repository retention policy.

#### Releases included on a dashboard

One important thing to note about the release retention policy is that any releases displayed on either the main dashboard or a project dashboard are **never deleted**. This is true even if it matches a retention policy rule.

These releases are assumed to be a working release and may still be promoted (even if their dates fall well outside the retention policy).

This can be helpful as it means you don't have to worry about a recent release in the Staging environment being deleted before it can be promoted to Production. 

:::hint
If you see a release that isn't being cleaned up, check the dashboards to see if it's being displayed.
:::

#### Rollbacks

Octopus will never remove the latest release or the release previous to the latest in any lifecycle phase. This is to allow you to deploy the previous release in case you need to rollback for any reason. Learn more about how [retention policies work with lifecycle phases](#retention-policies-and-lifecycle-phases) below.

### Tentacle files {#targets-whats-deleted}

The Tentacle settings delete **packages**, and expanded **files and folders** from packages on the Tentacle machine that is being deployed to. Note that if you use the [Custom Installation Directory ](/docs/deployment-process/configuration-features/custom-installation-directory.md) feature, we will never delete from that directory during retention policies as it's assumed this directory has a working release in it. This can be purged during deployment in the project step settings.

:::hint
We talk about Tentacles here, but the same process and logic applies to [SSH Targets](/docs/infrastructure/deployment-targets/linux/index.md) also.
:::

### Built-in repository {#built-in-repo-whats-deleted}

The built-in repository will delete any **packages** that are not attached to any release. If you happen to have higher versions of packages that have not been released, we will keep them assuming a release will be created. If you delete releases using the Octopus Server retention policy then any packages that were associated with those releases will then be deleted with that task.

A list of packages IDs that a project has deployed is kept and then used to determine retention for projects that [dynamically select packages using variables](/docs/deployment-examples/package-deployments/dynamically-selecting-packages.md). A package will be kept if it appears in that list and the package's version matches any of the package versions referenced by the project's releases.

### Build information {#build-information-whats-deleted}

[Build information](/docs/packaging-applications/build-servers/index.md#build-information) stored in Octopus is associated with **packages**. Octopus will decide how long to keep the build information based on the package they are linked to:
- If the package is used by a release, it will be kept.
- If the package is present in the built-in repository, and a package retention policy has been configured, then the record will be kept according to that value. If no package retention policy has been configured, then the build information record will be kept indefinitely.
- If the package is not present in the built-in repository, it's assumed that the package belongs to an [external package repository](/docs/packaging-applications/package-repositories/index.md). The build information record will be kept for a fixed value of 100 days from when it was published to Octopus.

## When the retention policies are applied {#when-retention-policies-applied}

Both the Octopus Server and built-in repository retention policies are run under a scheduled task from the Octopus Server every 4 hours. This task does not apply retention policies to Tentacles.

Tentacle retention policies are run **during a deployment**, specifically **after all package acquisition steps have completed**. So if you have a retention policy of 3 days and do not deploy to a Tentacle for 5 days, the files that are over 3 days old will not be deleted until after a deployment is run to that Tentacle. It will also only delete any packages or files that are associated with the **current project** being deployed. If it's a development server, and you have multiple projects deploying there, only the active deployed project files will be deleted. It does not have any information about other project's retention policies tagged with the deployment.

## How retention policies work with lifecycle phases {#retention-policies-and-lifecycle-phases}

You can set individual retention policies to phases. This gives you much more control over environments, such as never deleting from Production but having a strict rigorous deletion from your Development environment.

But how does it work? For a release we determine what phase it is currently in. So if a release is created and no deployments have been done, the default Lifecycle retention policy is the active setting for that release. When it is then deployed to the first phase, that retention policy becomes the active setting for the release, and so on. So when the release hits the production phase, and is set to keep all, that release will be kept, as will any deployments done to any environment of that release.

If you have an Octopus Server retention policy for a project that has a final phase of keep all releases, once the release enters that phase it will never be deleted. But if you have a release that has not yet deployed to any environments in the final phase, and is set to only keep the last 3 releases, then the release will be deleted when it becomes the 4th release of the project that has not yet been deployed to any final phase environment. (Unless it is still on the dashboard!).

## Set release retention policies {#set-release-retention-policies}

Under **{{Library,Lifecycles}}** you select the Lifecycle you want to define or edit your retention policy for:

![](images/3278063.png "width=500")

Each phase will inherit the retention policy from the above phase, but this is something you can change by expanding the Retention Policy panel.

![](images/3278062.png "width=500")

Releases determines what is kept on the Octopus Server, and Files on Tentacle determines what files are kept on the Tentacle.

You can keep all, or select a number of releases to keep.

You are also able to specify a number of days worth of releases and files to keep if this is preferred.

## Set Built-in feed retention policy {#set-builtinfeed-retentionpolicy}

You can find the built-in repository retention policy settings under **{{Library,Packages}}**.

![](images/3278060.png "width=500")

This can also be set to keep packages forever, or for a set number of days:

![](images/3278059.png "width=500")

Choosing the *A limited time* option will allow you to select the number of days to keep a package in the repository. The default value is 30, but you can choose something shorter or longer based on your needs.

:::hint
**Note on package clean-up**
Only packages that are not associated with releases will be cleaned up. That means even if a package is older than the value you choose, if it's attached to an existing release, it won't be cleaned up until that release is also cleaned up.
:::

## External Feeds

Octopus does not apply any retention policies to external feeds. However the packages that are currently in-use can be retrieved from the API ([example](https://github.com/OctopusDeploy/OctopusDeploy-Api/blob/master/Octopus.Client/LINQPad/GetInUsePackages.linq)) and those results then used to remove packages from those feeds.

## Recommendations

Whether you have an existing Octopus server or are setting it up for the first time, we have some recommendations when setting retention policies.

### Change the defaults 

Octopus comes with default retention policies to keep everything, forever. If you have small packages or don't release frequently, you may never notice any adverse effects. As your usage grows, you might run into disk space or performance issues as Octopus continues to store everything. 

We recommend changing the default values on the different retention policies available in Octopus.

For releases, you have the choice to clean up after a specified number of releases or a specified number of days. If you're not sure what value to pick, we recommend keeping the last three releases for both releases and the extracted packages. 

Remember, if you have multiple lifecycles then we recommend configuring the retention policies on each lifecycle and any defined phases.

For the built-in repository, even if you don't plan to use it, it's good to update the retention policy so that it's set if you start using the repository in the future. Normally we recommend a short length of time, for instance, something close to 7 days.

### Start with larger policies

If you have a large number of existing releases, we recommend starting with a large retention policy and adjusting it down to what you need.

For example, if you have 12 months worth of releases now, perhaps set the retention policy to keep 11 months worth of releases. The Octopus server will apply these retention policies periodically. After it has cleaned up the oldest releases, you can change the policy to keep ten months of releases, and so on. You can also apply this method with the number of releases instead of the time-based setting.

## Learn more
- [Retention policy knowledge base articles](https://help.octopus.com/tag/retention).