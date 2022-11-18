---
title: Retention policies
description: Retention policies allow you to specify the releases, packages and files you want to keep as well as the ones you want cleaned up.
position: 70
hideInThisSectionHeader: true
---

As you deploy more often and to different environments, files and releases can build up. Octopus handles this using retention policies. They allow you to control how Octopus decides which releases, packages and files are kept.   

## What is deleted {#what-is-deleted}

There are a number of different types of retention policies that run. Those on the Octopus Server, those on the Tentacle, and those in the built-in package repository.

### Releases {#releases-whats-deleted}

The Octopus Server settings delete **releases** from the database. This is a data deletion. It also cleans up any **artifacts**, **deployments, tasks, events**, and **logs** attached to the release. No packages from the internal package repository will be deleted as part of this policy, but they may be deleted by a corresponding repository retention policy.

#### Releases included on a dashboard

One important thing to note about the release retention policy is that any releases displayed on either the main dashboard or a project dashboard are **never deleted**. This is true even if it matches a retention policy rule. 

These releases are assumed to be a working release and may still be promoted (even if their dates fall well outside the retention policy). This can be helpful as it means you don't have to worry about a recent release in the Staging environment being deleted before it can be promoted to Production. 

:::hint
If you see a release that isn't being cleaned up, check the dashboards to see if it's being displayed.
:::

#### Rollbacks

Octopus will never remove the latest release or the release previous to the latest in any lifecycle phase. This allows you to deploy the previous release in case you need to rollback for any reason. Learn more about how [retention policies work with lifecycle phases](#retention-policies-and-lifecycle-phases) below.

### Tentacle files {#targets-whats-deleted}

The Tentacle settings delete **packages**, and **files and folders** extracted from packages on the Tentacle machine that is being deployed to. Note that if you use the [Custom Installation Directory ](/docs/projects/steps/configuration-features/custom-installation-directory.md) feature, we will never delete from that directory during retention policies as it's assumed this directory has a working release in it. This can be purged during deployment in the project step settings.

:::hint
We talk about Tentacles here, but the same process and logic applies to [SSH Targets](/docs/infrastructure/deployment-targets/linux/ssh-target.md) also.
:::

### Built-in repository {#built-in-repo-whats-deleted}

A retention policy can be applied to packages in the built-in Octopus package repository. By default, the policy is set to keep all packages indefinitely. This policy is *separate* from the [release retention policy](#releases-whats-deleted) described above.

![](images/3278059.png "width=500")

When a package retention policy is applied, Octopus will delete packages that meet *both* of the following criteria:
1. The time span from the package's initial publish date exceeds the configured time period in the policy
2. The package is **not associated with any releases in Octopus**.

:::hint
When configuring the repository retention policy, it's also worth making note of your [release retention policy](#releases-whats-deleted) settings too. When releases are deleted as a result of your release retention policy, then packages associated with those releases may become subject to cleanup by your repository policy.
:::

### Build information {#build-information-whats-deleted}

[Build information](/docs/packaging-applications/build-servers/build-information/index.md) stored in Octopus is associated with **packages**. Octopus will decide how long to keep the build information based on the package they are linked to:
- If the package is used by a release, it will be kept.
- If the package is present in the built-in repository, and a package retention policy has been configured, then the record will be kept according to that value. If no package retention policy has been configured, then the build information record will be kept indefinitely.
- If the package is not present in the built-in repository, it's assumed that the package belongs to an [external package repository](/docs/packaging-applications/package-repositories/index.md). The build information record will be kept for a fixed value of 100 days from when it was published to Octopus.

## What isn't deleted {#what-isnt-deleted}

Some items in Octopus are not affected by Retention policies, and are never deleted. One example of this is [Audit logs](/docs/security/users-and-teams/auditing/index.md). Octopus actively [prevents modifying or deleting audit logs](/docs/security/users-and-teams/auditing/index.md#modifying-and-deleting-audit-logs-is-prevented).

:::hint
From version **Octopus 2022.3** the [Audit Retention functionality](/docs/security/users-and-teams/auditing/index.md#archived-audit-events) will start being rolled out. This **does not** delete audit records. It just moves them from the database to the file system.
:::

## When the retention policies are applied {#when-retention-policies-applied}

Both the Octopus Server and built-in repository retention policies are run under a scheduled task from the Octopus Server every 4 hours. This task does not apply retention policies to Tentacles.

Tentacle retention policies are run **during a deployment**, specifically **after all package acquisition steps have completed**. So if you have a retention policy of 3 days and do not deploy to a Tentacle for 5 days, the files that are over 3 days old will not be deleted until after a deployment is run to that Tentacle. It will also only delete any packages or files that are associated with the **current project** being deployed. If it's a development server, and you have multiple projects deploying there, only the active deployed project files will be deleted. It does not have any information about other project's retention policies tagged with the deployment.

## How retention policies work with lifecycle phases {#retention-policies-and-lifecycle-phases}

You can set individual retention policies to phases. This gives you much more control over environments, such as never deleting from Production but having a strict rigorous deletion from your Development environment.

But how does it work? For a release we determine what phase it is currently in. So if a release is created and no deployments have been done, the default Lifecycle retention policy is the active setting for that release. When it is then deployed to the first phase, that retention policy becomes the active setting for the release, and so on. So when the release hits the production phase, and is set to keep all, that release will be kept, as will any deployments done to any environment of that release.

If you have an Octopus Server retention policy for a project that has a final phase of keep all releases, once the release enters that phase it will never be deleted. But if you have a release that has not yet deployed to any environments in the final phase, and is set to only keep the last 3 releases, then the release will be deleted when it becomes the 4th release of the project that has not yet been deployed to any final phase environment. (Unless it is still on the dashboard!).

### Example lifecycle retention policy task

In this section we walk through what's deleted for an example project when the lifecycle retention policy task runs. Consider a project that has the following lifecycle defined:

![Release retention task example lifecycle](images/retention-lifecycle-example.png "width=500")

It contains two phases, both are set to keep the last 3 releases. 

The project has 15 releases, of which:

- `0.0.10` through `0.0.15` have not been deployed to any environment.
- `0.0.7` through `0.0.9` are deployed to Staging.
- `0.0.1` through `0.0.6` are deployed to both Staging and Production.

When the retention policy runs for this lifecycle, it keeps a count of both **undeployed releases** it finds, as well as a separate count for **releases per phase**. 

For a release to be deleted, the count must be greater than the required number for each phase the release has been deployed to. In this example, Release `0.0.2` is the fourth release kept for Staging, but only the third for Production, so it will be kept.

Each phase defined in this lifecycle will keep a maximum of **5 releases**:
- 1 release for the current dashboard version.
- 1 release for the dashboard version's rollback.
- The last 3 releases, as configured in the phase.

Undeployed releases will simply keep the number we have selected and no more. When the retention policy task runs, 4 releases are deleted:

```text
                    |     == Success: Apply policy for Retention Policy Examples to Sample Project Default ==
13:51:03   Info     |       Retention Policy Examples/[Default] - Project name: Sample Project
                    |       Retention Policy Examples/[Default] - Channel name: Default
                    |       Retention Policy Examples/[Default] - Policy: Last 3 items
                    |       Retention Policy Examples/[Default] - Phase 1. Staging: Last 3 items (inherited)
                    |       Retention Policy Examples/[Default] - Phase 2. Production: Last 3 items (inherited)
13:51:03   Info     |       Retention Policy Examples/[Default] - Releases currently on the dashboard: 0.0.9, 0.0.6
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.15 is in phase Staging, with a policy of Last 3 items; it will be kept. Reason: Undeployed, kept so far = 0
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.14 is in phase Staging, with a policy of Last 3 items; it will be kept. Reason: Undeployed, kept so far = 1
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.13 is in phase Staging, with a policy of Last 3 items; it will be kept. Reason: Undeployed, kept so far = 2
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.12 is in phase Staging, with a policy of Last 3 items; it will be deleted. Reason: Undeployed, but 3 of 3 have been kept
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.11 is in phase Staging, with a policy of Last 3 items; it will be deleted. Reason: Undeployed, but 3 of 3 have been kept
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.10 is in phase Staging, with a policy of Last 3 items; it will be deleted. Reason: Undeployed, but 3 of 3 have been kept
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.9 is on the dashboard, so it will be kept
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.8 is the previous release for a release on the dashboard, so it will be kept to allow rollback
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.7 has progressed through phase Staging, with a policy of Last 3 items, but has not yet been deployed to phase Production; it will be kept. Reason: Deployed to: Staging, kept so far = 0
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.6 is on the dashboard, so it will be kept
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.5 is the previous release for a release on the dashboard, so it will be kept to allow rollback
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.4 is in phase Production, with a policy of Last 3 items; it will be kept. Reason: Deployed to: Staging, kept so far = 1; Deployed to: Production, kept so far = 0
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.3 is in phase Production, with a policy of Last 3 items; it will be kept. Reason: Deployed to: Staging, kept so far = 2; Deployed to: Production, kept so far = 1
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.2 is in phase Production, with a policy of Last 3 items; it will be kept. Reason: Deployed to: Staging, but 3 of 3 have been kept; Deployed to: Production, kept so far = 2
13:51:03   Info     |       Retention Policy Examples/[Default] - Release 0.0.1 is in phase Production, with a policy of Last 3 items; it will be deleted. Reason: Deployed to: Staging, but 3 of 3 have been kept; Deployed to: Production, but 3 of 3 have been kept
13:51:03   Verbose  |       Delete release 0.0.12
13:51:03   Verbose  |       Delete release 0.0.11
13:51:03   Verbose  |       Delete release 0.0.10
13:51:03   Verbose  |       Delete release 0.0.1
```

## Set release retention policies {#set-release-retention-policies}

Under **{{Library,Lifecycles}}** you select the Lifecycle you want to define or edit your retention policy for:

![](images/3278063.png "width=500")

Each phase will inherit the retention policy from the above phase, but this is something you can change by expanding the Retention Policy panel.

![](images/3278062.png "width=500")

Releases determines what is kept on the Octopus Server, and Files on Tentacle determines what files are kept on the Tentacle.

In Octopus Server, you can keep all, or select a number of releases to keep.

Alternatively, you can specify a number of days worth of releases and files to keep.

!include <octopus-cloud-storage-limits-hint>

### Inherited retention policies

As mentioned above, any phase that does not have a retention policy set will inherit its retention policy in the following priority:
1. From the latest previous phase with a custom retention policy
2. From the lifecycle retention policy

This can be observed in the following retention policy setup:
* Lifecycle: Keep 3 Releases
* Phase 1 (Dev): Inherit (Keep 3 Releases)
* Phase 2 (Test): Inherit (Keep 3 Releases)
* Phase 3 (Staging): Keep 5 Releases
* Phase 4 (Prod): Inherit (Keep 5 Releases)

Note how Dev and Test inherit their policies from the lifecycle retention policy as there is no previous phase with a custom retention policy. As Prod comes after Staging, a phase which has a custom retention policy, Prod inherits its retention policy from Staging instead.

Phases prioritize retention policies from the latest previous phase over the lifecycle retention policy as later phases tend to be treated more seriously. The more serious a phase is, the more the retention policy matters. The final phases are more likely to be production environments, and therefore once a release reaches this point you will want to keep more of them.

## Set Built-in feed retention policy {#set-builtinfeed-retentionpolicy}

You can find the built-in repository retention policy settings under **{{Library,Packages}}**.

![](images/3278060.png "width=500")

In Octopus Server, this can be set to keep packages forever, or for a set number of days.

!include <octopus-cloud-storage-limits-hint>

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
