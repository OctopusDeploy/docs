---
title: Migrate to Octopus Server Linux Container from Windows Container
description: A guide on how to migrate to the Octopus Server Linux Container from the Octopus Server Windows Container
position: 3
---

The Octopus Server Windows Container has been deprecated starting with Octopus Server 2020.6.  We made this decision because the uptake was low, and Microsoft has stopped supporting the OS Versions we were publishing (Windows [1809](https://docs.microsoft.com/en-us/windows/release-health/status-windows-10-1809-and-windows-server-2019), [1903](https://docs.microsoft.com/en-us/lifecycle/announcements/windows-10-1903-end-of-servicing), and [1909](https://docs.microsoft.com/en-us/windows/release-health/status-windows-10-1909)).  Going forward, we will only publish the Octopus Server Linux Container.  

:::hint
We will continue to publish Windows Docker images for Tentacle. Once we've updated the images for Tentacle to Windows 2019 and Windows 20H2, we will deprecate the existing Windows 1809/1903/1909 containers.
:::

This guide will help you migrate from the Octopus Server Windows Container to the Octopus Server Linux Container.  It assumes you are already familiar with running Octopus Deploy in a container and is meant to address the differences you will encounter when switching over.

## Differences between Windows and Linux Containers

This guide is designed to address the differences between the Windows and Linux Containers.

- Folder Paths -> Windows Containers follow Windows folder structure, including `C:\` and `\` slashes.  Linux Containers follow Linux folder structure, including `/` slashes
- Pre-installed software -> Windows Containers include PowerShell and .NET 4.7.2 or 4.8 but not Bash.  Linux Containers include PowerShell Core and Bash but not .NET.  The Linux Container doesn't support ScriptCS.  
- Authentication -> The Octopus Server Linux Container does not support Active Directory authentication.  Some users have had success using Active Directory with the Octopus Server Windows Container, but any workarounds will no longer work with the Linux Container.

:::hint
If you require Active Directory authentication, our recommendation is to run Octopus Server on a bare-bones or virtual machine running Windows Server.  
:::

## Prep Work - Configure a Windows Worker

If you currently have many PowerShell and C# script steps configured to run on the Octopus Server, there will be some prep work before switching over to the Linux Container.  

Under the covers, the Octopus Server includes a [built-in worker](/docs/security/built-in-worker.md).  When you configure a step to run on the Octopus Server, it runs on the built-in worker.  Switching from the Windows Container to the Linux Container means changing the underlying OS those steps previously ran on.  If your scripts are not PowerShell Core compliant, this means they will fail.  The vast majority of scripts we encounter work with both PowerShell 5.1 and PowerShell Core.  However, if you have a lot of older scripts, there is a chance they could fail.      

Instead of running directly on the Octopus Server's built-in worker, you will need to offload that work onto Windows [workers](/docs/infrastructure/workers/index.md).  

When you create your first worker, you will notice a pre-existing worker pool, `Default Worker Pool`.  When the `Default Worker Pool` does not have any workers, all tasks run configured to run on the Octopus Server run on the built-in worker.  The fastest way to change all the steps configured to run on the Octopus Server to run on a worker is to add a worker to the `Default Worker Pool`.  However, doing so is also the riskiest as you cause a lot of deployments to fail.

Our recommendation is to keep that risk to a minimum.

1. Create a new worker pool, `Windows Worker Pool`.  
1. Create the new Windows Servers and configure them as workers.  Register them to the `Windows Worker Pool`.
1. Pick a handful of projects and update the deployment process to use the new `Windows Worker Pool`.
1. Create some test releases and deployments to ensure the new Windows Workers are working correctly.
1. Assuming the testing is successful, you can add those workers to the `Default Worker Pool` or update the remaining steps.

All this should be done before switching over to the Octopus Server Linux Container.  

## Folder Paths

The DockerFile runs the Octopus Server installer each time the Octopus Server Windows Container or Octopus Server Linux Container starts up.  The installer runs a series of commands to configure Octopus Deploy.  The installer will run the [path](/docs/octopus-rest-api/octopus.server.exe-command-line/path.md) command to update the paths to leverage the different folder structure.

For example:

```
./Octopus.Server path --instance OctopusServer --nugetRepository "/repository" --artifacts "/artifacts" --taskLogs "/taskLogs" --cacheDirectory="/cache" --skipDatabaseCompatibilityCheck --skipDatabaseSchemaUpgradeCheck
```

Just like the Octopus Server Windows Container, you will want to provide the following volume mounts.  Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.  You will need to update your Docker compose or Docker run command to point your existing folders to the new volume mounts.  

|  Name       |    |
| ------------- | ------- |
|**/repository**|Package path for the built-in package repository|
|**/artifacts**|Path where artifacts are stored|
|**/taskLogs**|Path where task logs are stored|
|**/cache**|Path where cached files are stored|

:::hint
Due to how paths are stored, you cannot run an Octopus Server Windows Container and Octopus Server Linux Container simultaneously.  It has to be all Windows or all Linux.
:::

## Database Connection String and Master Key

Like with the Octopus Server Windows Container, you will need to provide the database connection string and master key to the Octopus Server Linux Container.  The underlying database technology Octopus Deploy relies on, SQL Server, has not changed.  The connection string format is the same, so you shouldn't need to change anything.

## Further Reading

This guide is meant to address the differences you may encounter when switching from the Octopus Server Windows Container to the Octopus Server Linux Container.  For a deeper dive in how to run the Octopus Server Linux Container please refer to [this documentation](/docs/installation/octopus-in-container/octopus-server-container-linux.md).
