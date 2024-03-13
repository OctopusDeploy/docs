---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Tentacle configuration and file storage
description: Octopus Tentacle configuration command reference including how to specify your file storage locations.
navOrder: 1200
---

Occasionally it may be necessary to change the location at which Tentacle stores its configuration and data, called the **Tentacle Home Directory**. By default your applications will be deployed into a folder under the Tentacle Home Directory, but you can configure this to be at a different location. This page will explain what each of the folders used by Tentacle are, how you can change the Tentacle configuration, and how you can clean up after upgrading from an earlier version of Tentacle.

:::div{.problem}

Make sure you have a **current backup** of your Tentacle Home Directory before proceeding.
:::

## Tentacle configuration {#Tentacleconfigurationandfilestorage-Tentacleconfiguration}

If you need to re-configure your Tentacle instance, you can do that using the Tentacle [configure](/docs/octopus-rest-api/tentacle.exe-command-line/configure) command.

## File storage {#Tentacleconfigurationandfilestorage-Filestorage}

By default, the Octopus Tentacle stores all files in the following folder:
- For Windows Tentacles, the default directory is: `C:\Octopus/<Instance>`. 
- For Linux Tentacles, the default directory is: `/etc/octopus/<Instance>`

This is known as the Tentacle Home Directory where `<Instance>` is an optional instance name in case you have multiple instances of Tentacle on the same computer. This is where both the Tentacle config file and deployment journal is stored.

The Octopus Tentacle stores additional files in sub-folders of the home directory:

- `<Tentacle Home>\Tools`
    - This is where the Calamari packages and other tools are installed so Tentacle can execute deployments on your behalf.
- `<Tentacle Home>\Files`
    - This is the package cache used to store the most recent packages in case they need to be used again.
- `<Tentacle Home>\Logs`
    - This is where the Tentacle log files are stored.
- `<Tentacle Home>\Work`
    - This is the temporary working directory used when Tentacle and Calamari execute deployments on your behalf.

## Clean up for older Tentacle versions {#cleanup-older-tentacles}

For Octopus Server versions older than **2020.2**, Calamari packages were stored in:

- `<Tentacle Home>\Calamari`. 

This folder can be safely removed after upgrading to a newer version.

Once a 2.6 Tentacle has been migrated to a modern version the following folders can also safely be removed:

- `C:\Octopus\Applications\.Tentacle`
- `C:\Octopus\Applications\.Tentacle\Octopus.Tentacle`
- `C:\Octopus\Applications\.SQ-OCTOPUS-<SQUID>`
- `C:\Octopus\Application\.Tentacle\Packages`
- `C:\Octopus\Logs`
- `C:\Octopus\Tentacle\<Instance>`
