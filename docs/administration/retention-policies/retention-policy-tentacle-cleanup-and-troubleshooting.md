---
title: Retention Policy Tentacle Cleanup and Troubleshooting
description: Reviewing and troubleshooting why some files aren't cleaned up by Octopus retention policies.
---

We get a lot of questions about why isn't the retention policy deleting all of my files on the Tentacle, or reporting a bug because files weren't deleted.

This page will show what is checked, what is deleted and why something might not be deleted.

## Deployment Journal {#RetentionpolicyTentaclecleanupandtroubleshooting-DeploymentJournal}

The deployment journal on the Tentacle is the source of truth for what Octopus will know has been deployed to the Tentacle but more importantly what still exists on the Tentacle.

If the deployment journal is deleted, on the next deployment, it will be created and contain one record. But you might have many more deployments than that on the server. If the release is not in the DeploymentJournal.xml it will not be deleted with the execution of the retention policy. Any deployments not in the deployment journal will need to be manually deleted.

By default your deployment journal is located at: C:\Octopus\DeploymentJournal.xml. If you have multiple Tentacle instances configured on the same server you will find a unique deployment journal for each instance located at c:\Octopus\[Instance Name]\DeploymentJournal.xml, this is shown in the image shown below with the instance name set to DWebApp01.

![](/docs/images/3048641/3278384.png "width=500")

Below is a sample DeploymentJournal.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Deployments>

  <Deployment Id="8edf23f3-225a-44ff-849b-a9e8b9cd9be5" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.Database" PackageVersion="3.0.938" InstalledOn="2015-08-31 02:06:18" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.Database.3.0.938.nupkg-7e3882e6-d08a-497b-a64a-dc9f14a48bf0" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.938" RetentionPolicySet="Environments-4/Projects-1/Step-Database/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.938" WasSuccessful="True" />

  <Deployment Id="3e16c611-4e06-4b5b-a453-8af5b82ae011" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.RateService" PackageVersion="3.0.938" InstalledOn="2015-08-31 02:06:23" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.RateService.3.0.938.nupkg-33168819-e693-4aa2-8a90-41a772990e98" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.938" RetentionPolicySet="Environments-4/Projects-1/Step-Rate service/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.938" WasSuccessful="True" />

  <Deployment Id="65521b1d-3fff-4c6e-aa1a-b0902148bdf7" EnvironmentId="Environments-4" ProjectId="Projects-2" PackageId="OctoFX.TradingWebsite" PackageVersion="3.0.938" InstalledOn="2015-08-31 02:06:42" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.TradingWebsite.3.0.938.nupkg-76cbe5ea-2db2-4296-afa5-073acc4e2944" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.TradingWebsite\3.0.938" RetentionPolicySet="Environments-4/Projects-2/Step-Trading Website/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Websites\DWebApp01\TradingWebsite" WasSuccessful="True" />

  <Deployment Id="ee3da487-e32a-4b61-aa81-1375527f97ee" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.Database" PackageVersion="3.0.939" InstalledOn="2015-08-31 03:06:04" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.Database.3.0.939.nupkg-6558d7f1-9647-4790-9dcf-f72599a3e1f0" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.939" RetentionPolicySet="Environments-4/Projects-1/Step-Database/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.939" WasSuccessful="True" />

  <Deployment Id="11516f98-488f-4178-9c33-bf4af593e9c3" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.RateService" PackageVersion="3.0.939" InstalledOn="2015-08-31 03:06:10" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.RateService.3.0.939.nupkg-c631069c-2231-4abf-8eb8-402d5aba4e31" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.939" RetentionPolicySet="Environments-4/Projects-1/Step-Rate service/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.939" WasSuccessful="True" />

  <Deployment Id="e8dbf933-e60b-4de6-86d4-b210333c2c5f" EnvironmentId="Environments-4" ProjectId="Projects-2" PackageId="OctoFX.TradingWebsite" PackageVersion="3.0.939" InstalledOn="2015-08-31 03:06:28" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.TradingWebsite.3.0.939.nupkg-9bc37a9b-d5de-4dc5-a994-bd2cba3de6ba" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.TradingWebsite\3.0.939" RetentionPolicySet="Environments-4/Projects-2/Step-Trading Website/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Websites\DWebApp01\TradingWebsite" WasSuccessful="True" />

  <Deployment Id="c256e7af-a01c-4e4f-a61c-0fecff92e1fd" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.Database" PackageVersion="3.0.940" InstalledOn="2015-08-31 04:06:04" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.Database.3.0.940.nupkg-8ac2b355-4eda-4688-89a2-a4b33e34f00a" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.940" RetentionPolicySet="Environments-4/Projects-1/Step-Database/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.940" WasSuccessful="True" />

  <Deployment Id="43fd845a-0a4b-4d58-84a4-e7f83bd50e7e" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.RateService" PackageVersion="3.0.940" InstalledOn="2015-08-31 04:06:09" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.RateService.3.0.940.nupkg-4ce208ff-19fe-4eb0-bbd1-2f45ce48dc10" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.940" RetentionPolicySet="Environments-4/Projects-1/Step-Rate service/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.940" WasSuccessful="True" />

  <Deployment Id="264dae42-4e47-40aa-9521-1a3e373481c0" EnvironmentId="Environments-4" ProjectId="Projects-2" PackageId="OctoFX.TradingWebsite" PackageVersion="3.0.940" InstalledOn="2015-08-31 04:06:29" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.TradingWebsite.3.0.940.nupkg-8f5a7177-a6a9-439f-b8aa-d15f0c1fb13f" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.TradingWebsite\3.0.940" RetentionPolicySet="Environments-4/Projects-2/Step-Trading Website/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Websites\DWebApp01\TradingWebsite" WasSuccessful="True" />

  <Deployment Id="ee3e96d9-e82b-4f84-a378-2023ef266f8b" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.Database" PackageVersion="3.0.941" InstalledOn="2015-08-31 05:06:14" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.Database.3.0.941.nupkg-b2959e9a-05b2-478a-a499-9bcb6d778afe" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.941" RetentionPolicySet="Environments-4/Projects-1/Step-Database/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.941" WasSuccessful="True" />

  <Deployment Id="7f1a1926-eae1-4704-8e85-af31c588c7da" EnvironmentId="Environments-4" ProjectId="Projects-1" PackageId="OctoFX.RateService" PackageVersion="3.0.941" InstalledOn="2015-08-31 05:06:19" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.RateService.3.0.941.nupkg-a1740fe7-c686-4a50-b4ff-784e783589f6" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.941" RetentionPolicySet="Environments-4/Projects-1/Step-Rate service/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.941" WasSuccessful="True" />

  <Deployment Id="effd23a1-3649-440e-a8c9-131f11840fd1" EnvironmentId="Environments-4" ProjectId="Projects-2" PackageId="OctoFX.TradingWebsite" PackageVersion="3.0.941" InstalledOn="2015-08-31 05:06:37" ExtractedFrom="C:\Octopus\DWebApp01\Files\OctoFX.TradingWebsite.3.0.941.nupkg-766ca566-0926-4114-ac11-942a4cb9382b" ExtractedTo="C:\Octopus\Applications\DWebApp01\Development\OctoFX.TradingWebsite\3.0.941" RetentionPolicySet="Environments-4/Projects-2/Step-Trading Website/Machines-3/&lt;default&gt;" CustomInstallationDirectory="C:\Websites\DWebApp01\TradingWebsite" WasSuccessful="True" />

</Deployments>
```

It keeps a record for every package and package extraction for each project and the relevant locations.

## Defining Your Retention Policy for Your Tentacles {#RetentionpolicyTentaclecleanupandtroubleshooting-DefiningyourretentionpolicyforyourTentacles}

Defining retention policies is done within Lifecycles. Each phase can have a different setting. So if you want to keep more files on production machines you can.

![](/docs/images/3048641/3278386.png "width=500")

You can read more about [Lifecycles](/docs/deployment-process/lifecycles/index.md) and [Retention Policies](/docs/administration/retention-policies/index.md) on their own detailed pages.

In this example the default for the Lifecycle is to Keep 3 releases on both Octopus Server and Tentacle.

## Retention Policies With Channels
{#RetentionpolicyTentaclecleanupandtroubleshooting-Retentionpolicywithchannels}

[Channels](/docs/deployment-process/channels/index.md) can be used in Octopus to handle many different deployment scenarios. In some cases you may have a hotfix channel in which deployments, as they are promoted through their environments, should be considered as overriding deployments from the default channel for the given environment. Alternatively you may be using channels to deploy feature branches which involve having several concurrent releases active at any one time across different channels for the same environment. When using the feature branch type scenario, you will likely want retention policies to recognize that since both channels should be accessible at the same time, the retention policy rules should apply to each independently. This behavior can be enabled for each project via the `Discrete Channel Releases` flag at under `Deployment Target settings` on the **{{Project,Process}}** page which is provided from version `3.12.2`.

![Discrete Channel Release](discrete-channel-release.png "width=500")


## When the Retention Policy is Run {#RetentionpolicyTentaclecleanupandtroubleshooting-Whentheretentionpolicyisrun}

For a Tentacle the retention policy is run at the end of a deployment, for that project only. So for this example the deployment looks for the project (project-1) and finds all releases within the deployment journal. It finds 4 in total (current is never counted) leaving 3, knowing it just deployed one, it deletes one copy of each package.

So for Project-1 we have 8 packages and directories still remaining on the server after the deployment. The current, and then the 3 defined by the policy. This is for each package. Any packages for other projects (project-2) were not evaluated and not removed, even if it was the same package version. Project 2 is considered it's own trigger for that retention policy, and is assumed to have different variables and transformations, thus a unique set of extracted files.

See below the messages you will have in your raw deployment logs at the end of a deployment to that environment for the specific project:

```text
                    |   == Success: Apply retention policy on Tentacles ==
05:06:20   Info     |     Apply retention policies...
05:06:22   Verbose  |     Apply Tentacle Retention Policy completed
                    |   
                    |     Success: DWebApp01
                    |     
                    |       Success: Applying retention policy using 3 Items to set Environments-4/Projects-1/Step-Database/Machines-3/<default>
05:06:21   Verbose  |         Removing directory 'C:\Octopus\Applications\DWebApp01\Development\OctoFX.Database\3.0.937'
05:06:21   Verbose  |         Removing package file 'C:\Octopus\DWebApp01\Files\OctoFX.Database.3.0.937.nupkg-ccdc6e52-9c52-4a28-ab25-5f9b44820eaf'
                    |       
                    |       Success: Applying retention policy using 3 Items to set Environments-4/Projects-1/Step-Rate service/Machines-3/<default>
05:06:22   Verbose  |         Removing directory 'C:\Octopus\Applications\DWebApp01\Development\OctoFX.RateService\3.0.937'
05:06:22   Verbose  |         Removing package file 'C:\Octopus\DWebApp01\Files\OctoFX.RateService.3.0.937.nupkg-840cf056-c7b1-4a71-9159-a2da80fa588b'

```

## Package and Extraction Directories {#RetentionpolicyTentaclecleanupandtroubleshooting-Packageandextractiondirectories}

You can find your packages under C:\Octopus\files (or c:\Octopus\[Instance Name])\files)

![](/docs/images/3048641/3278387.png "width=500")

Your extracted package files can be found under c:\Octopus\Applications\[environment name]\[package name]\

So if you have multiple packages you will have multiple directories.

![](/docs/images/3048641/3278389.png "width=500")

![](/docs/images/3048641/3278388.png "width=500")

If you have more directories than you think you should, check if they have a value in the deployment journal, if they do not they will have to be manually deleted.

You can have multiple directories for the same version of each package like the following example:

![](/docs/images/3048641/3278390.png "width=500")

This occurs when you have the same package in two different steps inside a single project. It has two extraction directories, and it is assumed to be a different set of files due to variables and transforms. So for a 3 package policy you will have a copy of each version leaving 6 plus the current 2 for a total of 8 directories. This can mean a lot of folders if you use the same package in multiple steps.

## Troubleshooting {#RetentionpolicyTentaclecleanupandtroubleshooting-Troubleshooting}

If you upgraded from 2.x to 3.x or newer the deployment journal location moved. Your choices are to clean up any old deployments manually, merge your deployment journals to the new location or run this [PowerShell Script](https://gist.github.com/vanessalove/dbc656b01df40939dcf8) on your Tentacles.

If your deployment journal is deleted for any reason, you will need to manually remove any remaining packages and package extraction directories that are not in the new deployment journal (which is automatically created on the next deployment).
