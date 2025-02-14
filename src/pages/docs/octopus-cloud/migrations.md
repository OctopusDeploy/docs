---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-02-14
title: Migrating to Octopus Cloud
navOrder: 30
description:  Migrating to Octopus Cloud.
---

Migrating from a self-hosted instance of Octopus Deploy to Octopus Cloud can streamline your deployment processes by removing infrastructure overhead while ensuring you continue to enjoy the robust capabilities of Octopus.
This guide outlines the benefits of Octopus Cloud, the effort involved in migrating, and step-by-step instructions to help you have a smooth transition.

For large or complex migrations, unsupported scenarios or any questions, we strongly recommend contacting our **Sales team**. We’re always happy to help, and we can provide more specific information when you are ready to migrate.

## Benefits of migrating to Octopus Cloud

Before diving into the migration process, it’s worth evaluating the benefits of Octopus Cloud. Octopus Cloud is the easiest way to run Octopus Deploy. It has the same functionality as Octopus Server, delivered as a highly available, scalable, secure SaaS application hosted for you. You get the best Octopus experience from the experts in hosting, maintaining, scaling, and securing Octopus Deploy. We recommend Octopus Cloud over Octopus Server for the following reasons:
- **Minimize downtime and increase resilience**
    - We handle backups, upgrades, and maintenance so you don’t have to worry about downtime, data loss, or disruptions
- **Secure and compliant out-of-the-box**
    - Peace of mind with internationally recognized security standards (ISO 27001 and SOC II certifications), ensuring business compliance and protecting your reputation.
- **Faster Feature Updates**: Access the latest Octopus Deploy features automatically.
    - Automatic upgrades to the latest version of Octopus, including improvements, bug fixes, security enhancements, and new features 
- **Effortlessly scale your deployments**
    - Your teams can scale their use without the hassle of resource management and additional infrastructure costs
- **Cost Efficiency**: Reduce infrastructure and operational costs.

In short, Octopus Cloud offloads your maintenance burden and provides the best experience for the majority of our customers. However, if your organization primarily uses self-hosted tools, you may encounter some challenges enabling connectivity between Octopus Cloud and other resources and tools within your ecosystem. 
If you're uncertain whether Octopus Cloud is the right choice for your organization, contact our **Sales team** to discuss your needs and determine the best fit.

## Migration assessment and planning
### Estimating Migration Effort
#### Estimate rough guide

Before you start planning your migration, it’s worth setting some expectations upfront about the level of effort involved. No two instances are identical, so this doesn't cover every possible scenario. Based on our experience, the figures here are estimates you can use to plan how long your own migration may take.

| **Instance Size**         | **Characteristics** | **Effort** |
| ------------------------- | ---- | ----------- |
| Small and/or simple       | <ul><li>10 or fewer projects</li><li>10 or fewer deployment targets</li><li>Integrations with cloud-based products only</li><li>No config as code</li></ul> | Migration typically takes 1-3 days with minimal manual configuration. |
| Medium                    | <ul><li>10–50 projects</li><li>Integrations with a mix of self-hosted and cloud-based products</li><li>Fewer than 100 deployment targets</li></ul> | Migration requires thorough planning, testing, and may take multiple weeks to migrate. |
| Large or complex          | <ul><li>50+ projects</li><li>Advanced configurations</li><li>Integrations primarily with other self-hosted tools</li><li>More than 100 deployment targets</li></ul> | Migrations may take several weeks or months of preparation, testing, and execution. |

#### Effort factors to refine your estimate

Use this checklist to guide you as to the complexity of your migration. The more effort factors you need to resolve, the longer or more complex your migration will be. 

| **Question**         | **Considerations** | **Your answer** |
| ------------------------- | ---- | ----------- |
| What version of Octopus are you using?       | You should run the most recent release before migration to minimise feature differences with Octopus Cloud. At a minimum, [Export/Import Projects](https://octopus.com/docs/projects/export-import) is only available in Octopus 2021.1.x or higher. ||
| How many projects do you have? | The more projects you have the more time your migration is likely to take. ||
| How many runbooks do you have? | Runbooks may need to be updated manually where worker pools have changed, and sensitive values or variables are used. ||
| How many Tentacles do you manage? | You’ll need to achieve connectivity between Octopus Cloud and all the Tentacles you use.<br/><br/> We also recommend converting Listening Tentacles to Polling Tentacles for a Cloud Instance. ||
| Are all the resources you need access to reachable from Octopus Cloud?<br/><ul><li>Private, self-hosted package repositories (Artifactory, Nexus, etc)</li><li>On-prem listening tentacle or ssh targets and workers</li><li>An internal SMTP server</li><li>Other on-prem integrations that are not reachable from Octopus Cloud</li></ul>|You’ll need to achieve connectivity between Octopus Cloud and all the integrations and resources you use.<br/><br/>How are firewall and VPN configurations typically managed to ensure secure connections? Do you anticipate any network, firewall, or VPN configuration updates will be needed to support this migration? ||
| Do you have specific security requirements or policies around accessing deployment targets or managing API keys? | You will need to manage these through the migration.  ||
| Do you need to retain historical data and task logs? | Historical data and task logs are **not supported by Export/Import Projects**. You will need to continue to host the older version to retain historical data. ||
| How long are your Audit log retention policies? | Octopus Cloud archived audit logs has **a max of 365 days** ||
| Do you have any Projects using Config-as-Code? | Config-as-Code Projects are **not supported by Export/Import Projects** ||
| Do you store build information?  | You will need to continue to host the older version to retain historical data, as build information **is not migrated**. ||
| Do you have any subscriptions? | Subscription migration is **not supported by Export/Import Projects**. These will need to be migrated manually or with a script. ||
| How many variable sets do you use? | Variable sets should be named uniquely. When importing, if a variable set with the same name already exists, the variables will be merged. If a variable in the export doesn’t exist on the destination, it will be created. If a variable with the same name and scopes already exists, the variable on the destination will be left untouched. ||
| Do you use project triggers? | Project trigger migration is **not supported by Export/Import Projects**. These will need to be migrated manually or with a script. ||
| Are you using the built-in package repository? | Package repository migration is supported via [this script](https://github.com/OctopusDeploy/OctopusDeploy-Api/blob/master/REST/PowerShell/Feeds/SyncPackages.ps1). ||
| Do any Projects use the Built-in Octopus Worker? | The Built-in Octopus Worker is **not a feature available in Octopus Cloud.** ||
| Are you using any Targets with older, unsupported operating systems (RHEL 6, Windows 2008, etc)? | Octopus Cloud is the most up-to-date version of Octopus, and Targets running older operating systems are **not supported**. ||
| Are you using Active Directory or LDAP authentication? | Active Directory or LDAP authentication is **not a feature available in Octopus Cloud**. ||
| Do you have any ITSM integrations or other automated processes? | Automated processes and shared settings, such as workflows for routine tasks or usage of library variable sets across projects, need to be set up again after migration. This includes common scripts, standardized settings, or configurations supporting multiple projects. ||
| What are your cutover requirements? Can you stagger the migration or incur downtime?| A big-bang migration, where everything is transitioned simultaneously, is harder than an incremental approach, where you migrate project-by-project or in defined phases. ||

If your instance includes **unsupported features** or matches several of the **effort factors**, migration complexity increases. For these cases, our **Sales team** can help you identify workarounds, plan for manual adjustments, or determine if Octopus Cloud is the right fit for you.

### Migration approach: self-serve or supported?

If you’re confident Octopus Cloud is right for you, and you have a relatively straightforward migration path, we encourage you to use this guide to get started and wish you a speedy and smooth migration. 
If you're uncertain whether Octopus Cloud is the right choice for your organization or there are complicating factors in your migration, we recommend you contact our **Sales team** to discuss your needs and determine the best fit. We can discuss several options, from extending your trial during a longer migration to connecting you with a professional services partner who can help you complete the migration.

#### Pilot project migration

If you need more precise estimates or to understand the complexity of the challenges you may face, migrate a pilot project to see how long one project takes. You will get more efficient with each additional project; however, this is a good base for multiplying your efforts.

## Self-directed migration using Export/Import
### Overview

This guide uses the [Export/Import Projects](https://octopus.com/docs/projects/export-import) feature as the recommended approach to migrating to Octopus Cloud.

Using this guide as a basis for your migration, your project will roughly break down into the following phases:

1. Preparation
1. Proof of Concept Deployments
1. Migration
1. Clean up and decommission

We’ll step through each of these phases and provide pointers and tips to ensure a successful outcome at each stage.

**Historical Data is not included in the migration.**

The Export/Import Projects feature will create releases and “shells” of your deployments. The releases are created so you can promote existing releases through your environments. The deployments are created because lifecycle conditions need to be met prior to those releases being promoted.

We recommend making a backup of your self-hosted DB including historical data should you need it for audit and compliance purposes, as the deployments will **not** include:

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

## 1. Preparation

**Before starting your migration to Octopus Cloud, you will need to address the following:**
1. Understand the differences between Octopus Cloud and your Octopus Server.
1. Upgrading your Octopus Server instance to the latest release of Octopus Deploy.
1. Determine whether you need to convert your [Listening tentacles to Polling Tentacles](https://octopus.com/docs/infrastructure/deployment-targets/tentacle/tentacle-communication) for your deployment targets and workers.
1. Creating your Octopus Cloud instance.
1. Configuring any firewall settings for your tentacles.
1. Configuring workers and worker pools.
1. Testing external package repository connectivity.
1. Creating your Octopus Cloud users.

### 1. Differences between Octopus Cloud and Octopus Server
Octopus Cloud and Octopus Server are built on the same code base. The differences stem from the additional configuration steps we perform during the Octopus Cloud build. The differences are:

|   | **Self-host** | **Cloud** |
| - | ------------- | --------- |
| Upgrades | Quarterly upgrades are made available for you to apply to your instance.  | We upgrade your instance continuously |
| Infrastructure | Your responsibility.  | Our responsibility |
| Compliance | Your responsibility.  | ISO 27001 and SOC II certifications with regular audits, ensuring your deployments and data are safe and secure |
| Roles | Highest level of user privileges is the role of Octopus Administrator | Highest level of user privileges is the role of Octopus Manager |
| Auth | | Octopus Cloud does not support Active Directory or LDAP. Please see the [authentication provider compatibility page](https://octopus.com/docs/security/authentication/auth-provider-compatibility) for an up to date list of what is available.
| Storage limits | Your responsibility. | Octopus Cloud is subject to [storage limits and default retention policies](https://octopus.com/docs/octopus-cloud/#octopus-cloud-storage-limits). <br/><br/><ul><li>Maximum file storage for artifacts, task logs, packages, package cache, and event exports is limited to 1 TB.</li><li>Maximum database size for configuration data (for example, projects, deployment processes, and inline scripts) is limited to 100 GB.</li><li>Maximum size for any single package is 5 GB.</li><li>[Retention policies](https://octopus.com/docs/administration/retention-policies) default to 30 days, but you can change this figure as needed.<br/>If any of these limits are a concern for your migration, please reach out to our Sales team.</li></ul> |
| Functional differences | | Octopus Cloud does not support running tasks on the server itself. Everything must run on a deployment target or worker. To help, Octopus Cloud includes [dynamic worker pools](https://octopus.com/docs/infrastructure/workers/dynamic-worker-pools) with both Windows and Linux workers. |

Before starting your migration, please ensure you are familiar with these fundamental differences (and limitations). Depending on your requirements, Octopus Cloud, in its current form, might not be suitable for you. If any of these limitations are deal-breakers, we’d love to know; please contact our sales team. We are constantly improving Octopus Cloud; a current limit has a strong likelihood of changing in the future.

### 2. Upgrading your Octopus Server instance to the latest release of Octopus Deploy
You must be running Octopus **2021.1.x** or higher to leverage the [Export/Import Projects](https://octopus.com/docs/projects/export-import) feature in order to migrate your projects. We recommend upgrading to the latest version of Octopus Deploy prior to starting your upgrade.

### 3. Determine whether you need to convert your [Listening tentacles to Polling Tentacles](https://octopus.com/docs/infrastructure/deployment-targets/tentacle/tentacle-communication) for your deployment targets and workers 

Listening Tentacles require an inbound connection from Octopus Cloud to your infrastructure. Listening tentacles are required to have a public hostname or IP address Octopus Cloud can see. Polling Tentacles require an outbound connection from your infrastructure to Octopus Cloud. Because of that difference, our customers tend to use Polling Tentacles.

### 4. Create your Octopus Cloud instance
The remaining prep work involves testing connectivity. You will need to create an Octopus Cloud instance at this time if you haven’t already done so. You can sign-up for an Octopus Cloud instance [here](https://octopus.com/start/cloud).

### 5. Firewall settings for your Tentacles
Regardless of your tentacle communication mode, ensure you have the appropriate firewall rules configured. The default rules are:
- Listening Tentacle
    - Port 443 outbound (to register the tentacle with Octopus Cloud)
    - Port 10933 inbound (communications)
- Polling Tentacle
    - Port 443 outbound (to register the tentacle with Octopus Cloud)
    - Port 10943 or 443 outbound (communications). [We recommend using Port 10943](https://octopus.com/docs/infrastructure/deployment-targets/tentacle/polling-tentacles-over-port-443).

Our recommendation is to create a test server in each of your data centers, install a tentacle on it with the desired communication mode, and register it with Octopus Cloud. Work out any firewall configuration issues before starting the migration. 

### 6. Configuring Workers and Worker Pools
Octopus Cloud does not support running steps directly on the server. Instead, we provide each Octopus Cloud instance with [dynamic workers](https://octopus.com/docs/infrastructure/workers/dynamic-worker-pools). The dynamic workers are there to help get you started but have the following limitations.
- Dynamic workers cannot see any of your internal infrastructure. That includes file shares, database servers, and internal load balancers.
- Dynamic workers cannot see any cloud infrastructure behind a firewall or on a virtual network with restricted access. That includes K8s clusters, database servers, file shares, load balancers, and more.
- Dynamic workers have a max life of **72 hours**. While you can install software on a dynamic worker, your deployment process will need to ensure any required software is installed at the start of each deployment.

Our recommendation is to:
1. Create a worker pool (or pools) per local data center or cloud provider. For example, if you have a data center in Omaha and are using AWS, you’d have two worker pools, one for your Omaha data center and another for AWS.
1. If you already use or are comfortable using Kubernetes, we recommend using Kubernetes worker — a scalable worker developed for optimal use of compute when running multiple deployment tasks. To use the Kubernetes worker, you need to install a worker once on a cluster and [configure autoscaling](https://octopus.com/blog/kubernetes-worker).
<br/>If you cannot use Kubernetes, create virtual machines and install tentacles as workers for each worker pool. For redundancy, we recommend a minimum of two (2) workers per worker pool. Install any required software on each worker.
2. Consider leveraging [execution containers](https://octopus.com/docs/projects/steps/execution-containers-for-workers). If you use Kubernetes worker, these containers will run as pods on a cluster. If you use virtual machines, the containers will run in Docker.
3. Change your deployment and runbook processes to target the appropriate worker pool. You can leverage [worker pool variables](https://octopus.com/docs/projects/variables/worker-pool-variables) to change worker pools per environment. Ensure all deployments and runbooks work as expected.

Please do not skip Step 4. In doing step 4, you will start your migration in a known good state. If you change to workers after migration to Octopus Cloud, you will have changed two things (workers and your instance), making it much harder to troubleshoot.

### 7. Testing External Package Repository Connectivity
If you use an external package repository, such as a self-hosted Artifactory instance, you’ll need to test that Octopus Cloud can see and connect to it. You might have to expose that server to the internet, or leverage a [proxy server](https://octopus.com/docs/infrastructure/deployment-targets/proxy-support/#external-nuget-feed).

### 8. User migration
The project export/import feature does not include users. All users must be created from scratch. If you are using an external authentication provider, such as Azure AD, or Okta, you can turn on the [Automatic user creation](https://octopus.com/docs/security/authentication/auto-user-creation) feature.

## 2. Migration

The migration will use the **Export/Import Projects** feature. This feature was specifically designed for [migrating from Octopus Server to Octopus Cloud](https://octopus.com/docs/projects/export-import). Our recommendations when using this tool are:
- Migrate using a phased approach over migrating everything at once. Migrate a project group or suite of applications to Octopus Cloud, test some deployments, then move onto the next batch.
- The first couple of projects will take more time as you work through any configuration issues. As such, pick some non-mission-critical projects or applications first.

Your process for each project or application will generally follow these steps.
1. **Export and Import** the project from your Octopus Server instance into your Octopus Cloud instance.
1. Upload any packages, project images, and reconfigure triggers.
1. Copy or Create deployment targets.
1. Update your build or CI server to connect to Octopus Cloud for that application.
1. Test to ensure the migration was successful, and your deployment targets are online.
1. Disable the project in your Octopus Server instance.

We recommend choosing an “off-cycle” or “slow time” whenever possible to keep any potential impact to a minimum. The last thing you want is to change your deployment process in the middle of a project with a tight deadline.

Following this approach, you will have a time period with both an Octopus Server instance and an Octopus Cloud instance.

### 1. Export and import the project
Follow the instructions on [exporting and importing page](https://octopus.com/docs/projects/export-import) to export and import a project. Make a note of what is *not* exported. Releases and deployments are exported, but only “shells” (not the full deployment) to ensure any pre-existing releases can be promoted.

### 2. Upload any packages, project images, and reconfigure triggers
As stated on the [export and import page](https://octopus.com/docs/projects/export-import/#what-is-imported), packages, project images, and project triggers are **not exported**. If you have any pre-existing releases you intend to promote and use the internal package feed; you’ll need to manually upload packages associated with those releases. You will also have to upload project images and reconfigure any triggers.

### 3. Copy or Create Deployment Targets
A Windows or Linux server can have [1 to N tentacle instances](https://octopus.com/docs/administration/managing-infrastructure/managing-multiple-instances). Our recommendation is to create a second tentacle instance on your server.
1. Original Tentacle Instance -> connects to your Octopus Server.
1. New Tentacle Instance -> connects to Octopus Cloud.

We have a [script to help create](https://github.com/OctopusDeployLabs/SpaceCloner/blob/main/docs/UseCase-CopyExistingTentacles.md) a cloned tentacle instance pointing to Octopus Cloud. You can copy a listening tentacle as a polling tentacle, a polling tentacle as a polling tentacle, or a listening tentacle as a listening tentacle.
That script requires PowerShell 5.1 or greater for Windows. We recommend PowerShell 7.
That script only works for servers running tentacles. Any other deployment targets, such as Azure Web Apps, Kubernetes clusters, or SSH targets, will need to be manually recreated.

### 4. Update your build server
For the project(s) you have migrated, update the corresponding build configurations in your build server. Updating the build server will typically involve:
- Ensuring you have the latest build server plug-in installed.
- Updating the Octopus URL
- Updating the Octopus API Key

### 5. Test the migration
After the build server has been updated, create a small change to trigger your CI/CD pipeline for that application to test:
- The build server to Octopus Cloud connection is working.
- Octopus Deploy can connect to your deployment targets and workers.
- Octopus Deploy can successfully deploy to your deployment targets.

### 6. Disable the project in your Octopus Server instance
Disabling a project will prevent it from being able to create and deploy releases. It is also an excellent signal to all Octopus users that the project has been migrated.
- Go to **Project Settings**
- Click the overflow menu (...)
- Select **Disable** on the menu

If anything goes wrong immediately after the migration, you can re-enable this project so your application can still be deployed while troubleshooting the migration.

## **Clean up & deprecate**
### Deprecate your Octopus Server instance

Eventually, you will migrate all your projects over to Octopus Cloud. When that day comes, we recommend [turning on maintenance mode](https://octopus.com/docs/administration/managing-infrastructure/maintenance-mode/) and setting the [task cap to 0](https://octopus.com/docs/support/increase-the-octopus-server-task-cap) on your Octopus Server. That will make your Octopus Server read-only. No new deployments will be triggered. Keep this running for a short while to review any old audit logs.

At this point, we recommend deleting all the tentacle instances still pointing to your Octopus Server instance. You can run this script in the [script console](https://octopus.com/docs/administration/managing-infrastructure/script-console) to delete the original tentacle instance. Please test this on a few non-production servers first.

```bash
& "C:\Program Files\Octopus Deploy\tentacle\tentacle.exe" delete-instance --instance="Tentacle"
```
In our experience, most people turn off their Octopus Server in about three to six months. When you decide to turn off your Octopus server, first take a full backup of the database and delete all the appropriate resources.

## Older versions
The **Export/Import Projects** feature is available from Octopus Deploy **2021.1** onwards.

## No longer offered or supported
Please note that our existing [Migration API](https://octopus.com/docs/octopus-rest-api/migration-api) is **not supported** for migrations to cloud instances due to configuration differences between self-hosted and cloud installations.

The legacy[ Data Migration](https://octopus.com/docs/administration/data/data-migration) included with Octopus Deploy is **not supported** for migrations to cloud instances. That tool is a Windows command-line application that must be run directly on the server hosting Octopus Deploy via an RDP session. Octopus Cloud runs on our Linux Container image on a Kubernetes Cluster and therefore access to the Container is not permitted for security reasons.
