---
title: Server Configuration and File Storage
description: Octopus Server configuration command reference including how to specify your file storage locations.
position: 1100
---

Occasionally, it may be necessary to change the location at which Octopus stores its data (called the "Octopus Home" folder) as well as the Registry Key which defines the Octopus Server instance, you may also want to clean up the Octopus Home folder after migrating from **Octopus 2.6** to **Octopus 3.x**. This page will explain what settings can be configured using the command-line on the Octopus Server and what folders can safely be removed from the Octopus Home folder after successfully migrating to **Octopus 3.x**.

:::problem
Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

## Server Configuration {#ServerconfigurationandFilestorage-ConfigurationServerconfiguration}

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
      --serverNodeName=VALUE Unique Server Node name for a clustered
                               environment
      --cachePackages=VALUE  Days to cache packages for. Default: 20
      --maxConcurrentTasks=VALUE
                             Maximum number of concurrent tasks that the
                               Octopus Server can execute. Default is 0 (no
                               limit)
      --upgradeCheck=VALUE   Whether checking for upgrades is allowed (true
                               or false)
      --upgradeCheckWithStatistics=VALUE
                             Include usage statistics when checking for
                               upgrades (true or false)
      --commsListenPort=VALUE
                             TCP port that the communications service should
                               listen on
      --commsListenWebSocket=VALUE
                             WebSocket prefix that the communications service
                               should listen on (e.g.
                               'https://+:443/OctopusComms'); Set to blank to
                               disable websockets; Refer to http://g.octopush-
                               q.com/WebSocketComms
      --webListenPrefixes=VALUE
                             Comma-separated list of HTTP.sys listen prefixes
                               (e.g., 'http://localhost/octopus')
      --webForceSSL=VALUE    Whether SSL should be required (HTTP requests
                               get redirected to HTTPS)
      --requestLoggingEnabled=VALUE
                             Whether to enable logging of web requests
      --azurePowerShellModule=VALUE
                             Path to Azure PowerShell module to be used
      --customBundledPackageDirectory=VALUE
                             A custom folder for getting packages (like
                               Calamari) that are normally bundled with Octopus
                               Server
      --webCorsWhitelist=VALUE
                             Comma-separated whitelist of domains that are
                               allowed to retrieve data (empty turns CORS off,
                               * allows all).
      --xFrameOptionAllowFrom=VALUE
                             A uri to provide in the X-Frame-Option http
                               header in conjunction with the ALLOW-FROM value.
      --hstsEnabled=VALUE    Enables or disables sending the Strict-Transport-
                               Security (HSTS) header. Defaults to false.
      --hstsMaxAge=VALUE     Sets the max-age value (in seconds) of the
                               Strict-Transport-Security (HSTS) header.
                               Defaults to 1 year (31556926 seconds).
      --webContentSecurityPolicyEnabled=VALUE
                             Enables or disables sending the Content-Security-
                               Policy header. Defaults to true.
      --webReferrerPolicy=VALUE
                             Sets the 'Referrer-Policy' response header.
                               Defaults to 'no-referrer'.
      --webTrustedRedirectUrls=VALUE
                             Comma-seperated list of URLs that are trusted
                               for redirection
      --autoLoginEnabled=VALUE
                             Enable/disable automatic user login.
      --azureADIsEnabled=VALUE
                             Set the azureAD IsEnabled, used for
                               authentication.
      --azureADIssuer=VALUE  Set the azureAD Issuer, used for authentication.
      --azureADClientId=VALUE
                             Set the azureAD ClientId.
      --azureADScope=VALUE   Set the azureAD Scope.
      --azureADNameClaimType=VALUE
                             Set the azureAD NameClaimType.
      --azureADAllowAutoUserCreation=VALUE
                             Set azureAD AllowAutoUserCreation.
      --azureADRoleClaimType=VALUE
                             Set the RoleClaimType.
      --activeDirectoryIsEnabled=VALUE
                             Set whether active directory is enabled.
      --activeDirectoryContainer=VALUE
                             Set the active directory container used for
                               authentication.
      --webAuthenticationScheme=VALUE
                             When Domain authentication is used, specifies
                               the scheme (Basic, Digest,
                               IntegratedWindowsAuthentication, Negotiate,
                               Ntlm).
      --allowFormsAuthenticationForDomainUsers=VALUE
                             When Domain authentication is used, specifies
                               whether the HTML-based username/password form
                               can be used to sign in.
      --activeDirectorySecurityGroupsEnabled=VALUE
                             When Domain authentication is used, specifies
                               whether to support security groups from AD.
      --activeDirectoryAllowAutoUserCreation=VALUE
                             Whether unknown users will be automatically upon
                               successful login.
      --googleAppsIsEnabled=VALUE
                             Set the googleApps IsEnabled, used for
                               authentication.
      --googleAppsIssuer=VALUE
                             Set the googleApps Issuer, used for
                               authentication.
      --googleAppsClientId=VALUE
                             Set the googleApps ClientId.
      --googleAppsScope=VALUE
                             Set the googleApps Scope.
      --googleAppsNameClaimType=VALUE
                             Set the googleApps NameClaimType.
      --googleAppsAllowAutoUserCreation=VALUE
                             Set googleApps AllowAutoUserCreation.
      --googleAppsHostedDomain=VALUE
                             Set the googleApps HostedDomain.
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --oktaIsEnabled=VALUE  Set the okta IsEnabled, used for authentication.
      --oktaIssuer=VALUE     Set the okta Issuer, used for authentication.
      --oktaClientId=VALUE   Set the okta ClientId.
      --oktaScope=VALUE      Set the okta Scope.
      --oktaNameClaimType=VALUE
                             Set the okta NameClaimType.
      --oktaAllowAutoUserCreation=VALUE
                             Set okta AllowAutoUserCreation.
      --oktaRoleClaimType=VALUE
                             Set the RoleClaimType.
      --usernamePasswordIsEnabled=VALUE
                             Set whether Octopus username/password
                               authentication is enabled.

Or one of the common options:

      --help                 Show detailed help for this command
 
Or one of the options supported/provided by the server extensions.
```

## Server Folders {#ServerconfigurationandFilestorage-Serverfolders}

If you need to move other folders than the Octopus Home folder, you can do that using the command-line as described below. Also see [moving Octopus Server folders](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome)

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

## File Storage {#ServerconfigurationandFilestorage-FileStorageFilestorage}

The Octopus Server stores files in the following folders by default:

- `C:\Octopus`
    - This is where the Octopus Server config file and deployment journal is stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome) on how to move the Octopus home folder
- `C:\Octopus\Artifacts`
    - This is where artifacts created by deployments are stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-Artifacts) on how to move the Octopus Server artifacts folder
- `C:\Octopus\Logs`
    - This is where the Octopus Server log file is stored.
- `C:\Octopus\OctopusServer\PackageCache`
    - This is where the signature and delta files used for package acquisitions are stored.
- `C:\Octopus\Packages`
    - This is where the packages pushed to the Octopus Server built-in package repository are stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-NuGetRepository) on how to move the Octopus Server built-in package folder
- `C:\Octopus\TaskLogs`
    - This is where all logs from deployments and other server tasks are stored.
    - See this [page](/docs/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-TaskLogs) on how to move the Octopus Server task logs folder

## Clean Up Post-2.6 Migration {#ServerconfigurationandFilestorage-CleanUpCleanuppost-2.6migration}

In **Octopus 2.6** the Server stored files in the following folders by default:

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

Once an **Octopus 2.6** server has been migrated to **Octopus 3.x** the following folder can safely be removed:

- `C:\Octopus\Backup`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`
