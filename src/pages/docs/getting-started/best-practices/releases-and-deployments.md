---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Releases and Deployments
description: Guidelines and recommendations for creating releases and deploying them in Octopus Deploy.
navOrder: 95
hideInThisSection: true
---

[Releases](/docs/releases/) are snapshots of your deployment process and other associated assets (references to package versions, scripts, variables) as they existed when the release was created.  A release is [deployed](/docs/deployments/) to [environments](/docs/infrastructure/environments/), or different stages in your deployment pipeline.  

A release snapshot takes references (rather than the entire resource) for certain items in a release. For example, packages are referenced by their version and not the package itself. Take care when overwriting existing packages that may be used in releases or snapshots.

:::hint 
**Tenant variables** are not included in release snapshots. Find out more in our [tenant documentation](/docs/tenants/tenant-variables/).
:::

## Release creation

When you create a release, you must enter or choose the following items:

- Release version number, such as `2.1.5`.
- The version of the package you wish to deploy.
- The channel (only appears when a project has more than one channel).
- Release notes (optional)

Our recommendation is to let the CI, or Build Server, create the release after it finishes uploading the package you wish to deploy.  The build server knows when it has finished uploading the package, along with other important information, such as the current branch, was the build triggered by a pull request, and more.  

:::hint
Octopus Deploy provides [automatic release creation](/docs/projects/project-triggers/automatic-release-creation/) functionality.  That monitors a specific package in the built-in package repository.  When a new version is pushed, it automatically creates a release.  

That has the following limitations:
- Only works for the built-in repository.
- The order the build server pushes the packages becomes very important, as you'll have to configure Automatic Release Creation to monitor the last package pushed by the build server.  That makes the build server and Octopus Deploy more tightly coupled.
- You are required to pre-select a channel when configuring Automatic Release Creation.  Creating a release automatically for another channel is possible but will require the build server or other tool to be configured.
:::

## Updating a release

When a release is created, the release snapshot is also created.  The release snapshot includes the deployment process, variables (including Library Variable Sets), and package versions.  

After a release is created, you can update the following:

- Version number
- Package version
- Release notes
- Variables

However, you cannot change the following in the release snapshot:

- Channel
- Deployment Process

Our recommendation is never to modify a release.  Especially if the release has been deployed to an **acceptance**, **uat**, or **production** environment.  A release represents a snapshot in time, and it should be the same when deploying to the different stages, or environments, in your pipeline.  Changing it after the fact can lead to unpredictable results.  

## Deploying a release

A release is deployed to different stages, or environments, in your pipeline.  Depending on your lifecycle configuration, a release can be deployed 0 to N times before being deployed to **production**.    

Our recommendation is a release must be deployed to at least **ONE** environment before deploying to **production**, even during an emergency or a production outage.  Deploying to **production** should go from an "all hands on deck" event to a non-event.  The release will have been tested at least once, if not multiple times, in different stages in your pipeline by the time you deploy to **production**.  By that point most, if not all, surprises should have been found and fixed.

## Blocking a release

During testing, you might find a show-stopping bug.  Or, the UI isn't acceptable to the business owner.  There are several reasons for a release rejection to occur.  

When a release is rejected, our recommendation is to leverage the [prevent release progression](/docs/releases/prevent-release-progression/) functionality to block that release from being deployed to additional stages, or environments, in your pipeline.  

## Release and Deployment retention

As stated earlier, creating a release snapshots the variables, deployment process, etc.  Each deployment also has a snapshot of the variables and deployment process created.  As you can imagine, all of these snapshots start to consume more and more space in the database.  

Our recommendation is to configure [retention policies](/docs/administration/retention-policies/) to clean up old releases.  Have a unique retention policy per environment. For example:

- Development: keep the last 1 release
- Test: keep the last 2 releases
- Staging: keep the last 5 releases
- Production: keep releases for the last 90 days (or whatever your regulations require)

Some notes about retention policies:

- No release appearing on either a project dashboard or the main dashboard will be deleted.  Even if the release falls well outside of the dates for the retention policy.
- Octopus will always keep the current release and the most recent previous release in any lifecycle phase.  Keeping the most recent release ensures you can quickly roll back in the event of an emergency.
- The algorithm calculating the releases to delete is very conservative.  It prefers to keep releases rather than delete them.

:::hint
When the retention policies delete a release, it removes that release from the project (along with corresponding snapshots).  Audit information about the release, who created it, when it was deployed, and so on is still retained and can be viewed in the [audit log](/docs/security/users-and-teams/auditing/).  
:::

## Free up deployment target disk space

As you deploy more frequently, the available disk space on your deployment targets will be reduced.  That reduction will continue until you either run out of disk space or retention policies are configured.  When you configure the retention policy in the lifecycle, you are presented with two options:

- How long should we keep releases? That means how long the release is retained on the Octopus Server.
- How long should we keep extracted packages and files on disk on Tentacles?  That means how long the release is retained on your deployment targets.

Unless you are using a [custom install directory](/docs/projects/steps/configuration-features/custom-installation-directory/), Octopus Deploy will create a unique folder on your deployment targets to extract packages to.  The unique folder is generated _per deployment_.  If the same release is deployed five times, expect to see five unique folders.

Our recommendation is to configure your deployment target retention policies to match your release retention policies.  Unless, of course, you are limited by disk space.  If that happens, then set your deployment target retention policy to something smaller than the release retention policy.  

:::hint
Both retention policies follow the same rules.  No release appearing on a dashboard will be deleted, nor will the current and previous release.  
:::

Retention policies are not applied to any package with a custom install directory configured.  You are responsible for cleaning up the custom install directory.

## Further reading

For further reading on releases and deployments in Octopus Deploy please see:

- [Releases](/docs/releases/)
- [Deployments](/docs/deployments/) 
- [Environments](/docs/infrastructure/environments/)
- [Lifecycles](/docs/releases/lifecycles/)
- [Retention Policies](/docs/administration/retention-policies/)

<span><a class="btn btn-secondary" href="/docs/getting-started/best-practices/deployment-and-runbook-processes">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/notifications">Next</a></span>
