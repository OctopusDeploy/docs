---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Migrating from Octopus Server to Octopus Cloud
navOrder: 30
description:  Migrating from Octopus Server to Octopus Cloud.
---

This guide will walk you through a general set of steps to take to migrate your self-hosted instance to Octopus Cloud.  This guide was written to minimize risk and keep any potential downtime as low as possible.

It is impossible to cover every last use case in a single guide, and as such, if you have any questions, please [email our support team](mailto:support@octopus.com). We're always happy to help, and we can provide more specific information when you are ready to migrate.

:::div{.hint}
This guide will follow the recommended approach to migrating to Octopus Cloud using the **Export/Import Projects** feature released in **Octopus 2021.1**. Learn more: [Exporting and Importing Projects](/docs/projects/export-import).
:::

:::div{.problem}

**Historical Data is not included in the migration.**

The Export/Import Projects feature will create releases and "shells" of your deployments.  The releases are created so you can promote existing releases through your environments.  The deployments are created because lifecycle conditions need to be met prior to those releases being promoted.  

The deployments will **not** include:

- Task Log (the deployment screen will be blank)
- Artifacts
- Task History (including, but not limited to):
    - Who created the deployment
    - When the deployment was created
    - When the deployment started
    - When the deployment finished
    - Guided Failure logs
    - Manual Intervention logs
- Audit History
- Event Exports
:::

## Prep Work

Before starting your migration to Octopus Cloud, you will need to address the following:

1. Understand the differences between Octopus Cloud and your Octopus Server.
1. Upgrading your Octopus Server instance to the latest major/minor release of Octopus Deploy (2021.1, 2021.2, etc.).
1. Determine if you are using [Polling or Listening tentacles](/docs/infrastructure/deployment-targets/tentacle/windows) for your deployment targets and workers.
1. Creating your Octopus Cloud instance.
1. Configuring any firewall settings for your tentacles.
1. Configuring workers and worker pools.
1. Testing external package repository connectivity.
1. Creating your Octopus Cloud users.

### Differences between Octopus Cloud and Octopus Server

Octopus Cloud and Octopus Server are built on the same code base.  The differences stem from the additional configuration steps we perform during the Octopus Cloud build.  The differences are:

- Octopus Cloud users cannot be Octopus Administrators, the "highest" level of permission possible is [Octopus Manager](/docs/octopus-cloud/permissions).
- Octopus Cloud has a subset of auth providers available to the Octopus Server.  Most notably, Octopus Cloud does not include Active Directory or LDAP.  Please see the [authentication provider compatibility page](/docs/security/authentication/auth-provider-compatibility) for an up to date list of what is available.
- Octopus Cloud is subject to [storage limits and default retention policies](/docs/octopus-cloud/#octopus-cloud-storage-limits).
- Octopus Cloud does not support running tasks on the server itself.  Everything must run on a deployment target or worker.  To help, Octopus Cloud includes [dynamic worker pools](/docs/infrastructure/workers/dynamic-worker-pools) with both Windows and Linux workers.

Before starting your migration, please ensure you are familiar with these fundamental differences (and limitations).  Depending on your requirements, Octopus Cloud, in its current form, might not be suitable for you.  If any of these limitations are deal-breakers, we'd love to know; please [email our support team](mailto:support@octopus.com).  We are constantly improving Octopus Cloud; a current limit has a genuine chance of changing in the future.

### Upgrading your Octopus Server instance

You must be running **Octopus 2021.1.x** or higher to leverage the [Export/Import Projects](/docs/projects/export-import) feature in order to migrate your projects.  We recommend upgrading to the latest version of Octopus Deploy prior to starting your upgrade.

### Listening or Polling Tentacles

Listening Tentacles require an inbound connection from Octopus Cloud to your infrastructure.  Listening tentacles are required to have a public hostname or IP address Octopus Cloud can see.  Polling Tentacles require an outbound connection from your infrastructure to Octopus Cloud.  Because of that difference, our customers tend to use Polling Tentacles.

### Create your Octopus Cloud instance

The remaining prep work involves testing connectivity.  You will need to create an Octopus Cloud instance at this time if you haven't already done so. You can sign-up for an Octopus Cloud instance [here](https://octopus.com/start/cloud).

### Firewall settings for your Tentacles

Regardless of your tentacle communication mode, ensure you have the appropriate firewall rules configured.  The default rules are:

- Listening Tentacle
    - Port `443` outbound (to register the tentacle with Octopus Cloud)
    - Port `10933` inbound (communications)
- Polling Tentacle
    - Port `443` outbound (to register the tentacle with Octopus Cloud)
    - Port `10943` outbound (communications)

:::div{.hint}
Our recommendation is to create a test server in each of your data centers, install a tentacle on it with the desired communication mode, and register it with Octopus Cloud.  Work out any firewall configuration issues before starting the migration.
:::

### Configuring Workers and Worker Pools

Octopus Cloud does not support running steps directly on the server.  Instead, we provide each Octopus Cloud instance with [dynamic workers](/docs/infrastructure/workers/dynamic-worker-pools).  The dynamic workers are there to help get you started but have the following limitations.

- Dynamic workers cannot see any of your internal infrastructure.  That includes file shares, database servers, and internal load balancers.
- Dynamic workers cannot see any cloud infrastructure behind a firewall or on a virtual network with restricted access.  That includes K8s clusters, database servers, file shares, load balancers, and more.
- Dynamic workers have a max life of **72 hours**.  While you can install software on a dynamic worker, your deployment process will need to ensure any required software is installed at the start of each deployment.

Our recommendation is to:

1. Create a worker pool (or pools) per local data center or cloud provider.  For example, if you have a data center in Omaha and are using AWS, you'd have two worker pools, one for your Omaha data center and another for AWS.
2. Create virtual machines and install tentacles as workers for each worker pool.  For redundancy, we recommend a minimum of two (2) workers per worker pool.  Install any required software on each worker.  Consider leveraging [execution containers](/docs/projects/steps/execution-containers-for-workers).
3. Change your deployment and runbook processes to target the appropriate worker pool.  You can leverage [worker pool variables](/docs/projects/variables/worker-pool-variables) to change worker pools per environment.  Ensure all deployments and runbooks work as expected.

:::div{.warning}
Please do not skip Step 3.  In doing step 3, you will start your migration in a known good state.  If you change to workers _after_ migration to Octopus Cloud, you will have changed two things (workers and your instance), making it much harder to troubleshoot.
:::

### Testing External Package Repository Connectivity

If you use an external package repository, such as a self-hosted Artifactory instance, you'll need to test that Octopus Cloud can see and connect to it.  You might have to expose that server to the internet, or leverage a [proxy server](/docs/infrastructure/deployment-targets/proxy-support/#ProxySupport-WorkingwithExternalNuGetFeeds).

### Proof of Concept Deployments

Set up a couple of sample projects to deploy to your servers.  That will be a final "plugs-out" test to ensure you are ready to start your migration.

### User Migration

The project export/import feature does not include users.  All users must be created from scratch.  If you are using an external authentication provider, such as Azure AD, or Okta, you can turn on "auto-create users" feature.

## Migration

The migration will use the **Export/Import Projects** feature in **Octopus 2021.1**. That feature was specifically designed for [migrating from Octopus Server to Octopus Cloud](/docs/projects/export-import).  Our recommendations when using this tool are:

- Migrate using a phased approach over migrating everything at once.  Migrate a project group or suite of applications to Octopus Cloud, test some deployments, then move onto the next batch.
- The first couple of projects will take more time as you work through any configuration issues.  As such, pick some non-mission-critical projects or applications first.

Your process for each project or application will generally follow these steps.

1. **Export** the project from your Octopus Server instance.
1. **Import** the project into your Octopus Cloud instance.
1. Upload any packages, project images, and reconfigure triggers.
1. Copy or Create deployment targets.
1. Update your build or CI server to connect to Octopus Cloud for that application.
1. Test to ensure the migration was successful, and your deployment targets are online.
1. Disable the project in your Octopus Server instance.

We recommend choosing an "off-cycle" or "slow time" whenever possible to keep any potential impact to a minimum.  The last thing you want is to change your deployment process in the middle of a project with a tight deadline.

:::div{.hint}
Following this approach, you will have a time period with both an Octopus Server instance and an Octopus Cloud instance.  
:::

### Export / Import the project

Follow the instructions on [exporting and importing page](/docs/projects/export-import) to export and import a project.  Make a note of what is _not_ exported.  Releases and deployments are exported, but only "shells" (not the full deployment) to ensure any preexisting releases can be promoted.

### Upload any packages, project images, and reconfigure triggers

As stated on the [export and import page](/docs/projects/export-import/#what-is-imported), packages, project images, and project triggers are **not exported**.  If you have any preexisting releases you intend to promote and use the internal package feed; you'll need to manually upload packages associated with those releases.  You will also have to upload project images and reconfigure any triggers.

### Copy or Create Deployment Targets

A Windows or Linux server can have [1 to N tentacle instances](/docs/administration/managing-infrastructure/managing-multiple-instances).  Our recommendation is to create a second tentacle instance on your server.

1. Original Tentacle Instance -> connects to your Octopus Server.
2. New Tentacle Instance -> connects to Octopus Cloud.

We have a [script to help create](https://github.com/OctopusDeployLabs/SpaceCloner/blob/master/docs/UseCase-CopyExistingTentacles/) a cloned tentacle instance pointing to Octopus Cloud.  You can copy a listening tentacle as a polling tentacle, a polling tentacle as a polling tentacle, or a listening tentacle as a listening tentacle. 

:::div{.hint}
That script requires PowerShell 5.1 or greater for Windows.  We recommend PowerShell 7.
:::

That script only works for servers running tentacles.  Any other deployment targets, such as Azure Web Apps, Kubernetes clusters, or SSH targets, will need to be manually recreated.

### Update your build server

For the project(s) you have migrated, update the corresponding build configurations in your build server.  Updating the build server will typically involve:

- Ensuring you have the latest build server plug-in installed.
- Updating the Octopus URL
- Updating the Octopus API Key

### Test the migration

After the build server has been updated, create a small change to trigger your CI/CD pipeline for that application to test:

- The build server to Octopus Cloud connection is working.
- Octopus Deploy can connect to your deployment targets and workers.
- Octopus Deploy can successfully deploy to your deployment targets.

### Disable the project in your Octopus Server instance

Disabling a project will prevent it from being able to create and deploy releases.  It is also an excellent signal to all Octopus users that the project has been migrated.  

1. Go to **Project ➜ Settings ➜ General**
2. Click the overflow menu (`...`)
3. Select **Disable** on the menu

If anything goes wrong immediately after the migration, you can re-enable this project so your application can still be deployed while troubleshooting the migration.

## Deprecate your Octopus Server instance

Eventually, you will migrate all your projects over to Octopus Cloud.  When that day comes, we recommend [turning on maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode/) and setting the [task cap to 0](/docs/support/increase-the-octopus-server-task-cap) on your Octopus Server.  That will make your Octopus Server read-only.  No new deployments will be triggered.  Keep this running for a short while to review any old audit logs.

At this point, we recommend deleting all the tentacle instances still pointing to your Octopus Server instance.  You can run this script in the [script console](/docs/administration/managing-infrastructure/script-console) to delete the original tentacle instance.  Please test this on a few non-production servers first.

```powershell
& "C:\Program Files\Octopus Deploy\tentacle\tentacle.exe" delete-instance --instance="Tentacle"
```

In our experience, most people turn off their Octopus Server in about three to six months.  When you decide to turn off your Octopus server, first take a full backup of the database and delete all the appropriate resources.

## No Longer Offered or Supported

Before the **Export/Import Projects** feature, we offered a manual migration process.  With the release of that feature, we no longer offer manual migrations from a self-hosted Octopus Server to Octopus Cloud and vice-versa. 

Please note that our existing [Migration API](/docs/octopus-rest-api/migration-api) is **not supported** for migrations to cloud instances due to configuration differences between self-hosted and cloud installations.

The legacy [Data Migration](/docs/administration/data/data-migration) included with Octopus Deploy is **not supported** for migrations to cloud instances.  That tool is a Windows command-line application that must be run directly on the server hosting Octopus Deploy via an RDP session.  Octopus Cloud runs on our Linux Container image on a Kubernetes Cluster.
