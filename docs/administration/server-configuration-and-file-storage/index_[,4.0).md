---
title: Server configuration and File storage
description: Octopus Server configuration command reference including how to specify your file storage locations.
position: 1100
---

Occasionally it may be necessary to change the location at which Octopus stores its data (called the "Octopus Home" folder) as well as the Registry Key which defines the Octopus Server instance, you may also want to clean up the Octopus Home folder after migrating from 2.6 to 3.x. This page will explain what settings can be configured using the command-line on the Octopus Server and what folders can safely be removed from the Octopus Home folder after successfully migrating to 3.x.

:::problem
Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

## Server configuration {#ServerconfigurationandFilestorage-ConfigurationServerconfiguration}

If you need to re-configure your Octopus Server instance, you can do that using the command-line as described below

**Usage**

```powershell
Octopus.Server configure [<options>]
```

Where`[<options>]`is any of:

**configure options**

```powershell
      --instance=VALUE       Name of the instance to use
      --home=VALUE           Home directory
      --storageConnectionString=VALUE
                             SQL Server connection string
      --serverNodeName=VALUE Unique Server Node name for a clustered
                               environment
      --cachePackages=VALUE  Days to cache packages for. Default: 20
      --maxConcurrentTasks=VALUE
                             Maximum number of concurrent tasks that the
                               Octopus Server can execute. Default is 0 (no
                               limit).
      --upgradeCheck=VALUE   Whether checking for upgrades is allowed (true
                               or false)
      --upgradeCheckWithStatistics=VALUE
                             Include usage statistics when checking for
                               upgrades (true or false)
      --masterKey=VALUE      Set the current master key
      --webAuthenticationMode=VALUE
                             Authentication mode to use for the web portal
                               (UsernamePassword, Domain)
      --webAuthenticationScheme=VALUE
                             When Domain authentication is used, specifies
                               the scheme (Basic, Digest,
                               IntegratedWindowsAuthentication, Negotiate, Ntlm)
      --allowFormsAuthenticationForDomainUsers=VALUE
                             When Domain authentication is used, specifies
                               whether the HTML-based username/password form
                               can be used to sign in.
      --webForceSsl=VALUE    Whether SSL should be required (HTTP requests
                               get redirected to HTTPS)
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --webListenPrefixes=VALUE
                             Comma-seperated list of HTTP.sys listen prefixes
                               (e.g., 'http://localhost/octopus')
      --requestLoggingEnabled=VALUE
                             Whether to enable logging of web requests
      --commsListenPort=VALUE
                             TCP port that the communications service should
                               listen on
      --activeDirectoryContainer=VALUE
                             Set the active directory container used for
                               authentication.
      --webCorsWhitelist=VALUE
                             Comma-separated whitelist of domains that are
                               allowed to retrieve data (empty turns CORS off,
                               * allows all).
      --azurePowerShellModule=VALUE
                             Path to Azure PowerShell module to be used

Or one of the common options:

      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
 
Or one of the options supported/provided by the server extensions.
```

## Server folders {#ServerconfigurationandFilestorage-Serverfolders}

If you need to move other folders than the Octopus Home folder, you can do that using the command-line as described below. Also see [moving Octopus server folders](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome)

**Usage**

```powershell
Octopus.Server path [<options>]
```

Where `[<options>]` is any of:

**Options**

```powershell
      --instance=VALUE       Name of the instance to use
      --nugetRepository=VALUE
                             Set the package path for the built-in NuGet 
                               repository.
      --artifacts=VALUE      Set the path where artifacts are stored.
      --taskLogs=VALUE       Set the path where task logs are stored.

Or one of the common options: 
      --console              Don't attempt to run as a service, even if the 
                               user is non-interactive
      --nologo               Don't print title or version information 
```

## File storage {#ServerconfigurationandFilestorage-FileStorageFilestorage}

The Octopus server stores files in the following folders by default:

- `C:\Octopus`
    - This is where the Octopus server config file and deployment journal is stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome) on how to move the Octopus home folder
- `C:\Octopus\Artifacts`
    - This is where artifacts created by deployments are stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-Artifacts) on how to move the Octopus server artifacts folder
- `C:\Octopus\Logs`
    - This is where the Octopus server log file is stored.
- `C:\Octopus\OctopusServer\PackageCache`
    - This is where the signature and delta files used for package acquisitions are stored.
- `C:\Octopus\Packages`
    - This is where the packages pushed to the Octopus server built-in package repository are stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-NuGetRepository) on how to move the Octopus server built-in package folder
- `C:\Octopus\TaskLogs`
    - This is where all logs from deployments and other server tasks are stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-TaskLogs) on how to move the Octopus server task logs folder

## Clean up post-2.6 migration {#ServerconfigurationandFilestorage-CleanUpCleanuppost-2.6migration}

In 2.6 Octopus server stored files in the following folders by default:

- `C:\Octopus`
- `C:\Octopus\Backup`
- `C:\Octopus\Logs`
- `C:\Octopus\OctopusServer`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository\Index`
- `C:\Octopus\OctopusServer\Repository\Packages`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`

Once a 2.6 server has been migrated to 3.x the following folder can safely be removed:

- `C:\Octopus\Backup`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`
