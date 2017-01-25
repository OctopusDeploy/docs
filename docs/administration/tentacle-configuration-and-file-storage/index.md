---
title: Tentacle configuration and file storage
position: 12
---

Occasionally it may be necessary to change the location at which Tentacle stores its configuration and data, called the **Tentacle Home Directory**. By default your applications will be deployed into a folder under the Tentacle Home Directory, but you can configure this to be at a different location. This page will explain what each of the folders used by Tentacle are, how you can change the Tentacle configuration, and how you can clean up after upgrading from an earlier version of Tentacle.

:::problem
Make sure you have a **current backup** of your Tentacle Home Directory before proceeding.
:::

## Tentacle configuration {#Tentacleconfigurationandfilestorage-Tentacleconfiguration}

If you need to re-configure your Tentacle instance, you can do that using the command-line as described below.

**Usage**

```powershell
Tentacle configure [<options>]
```

Where`[&lt;options&gt;]`is any of:

**configure options**

```powershell
      --instance=VALUE       Name of the instance to use
      --home, --homedir=VALUE
                             Home directory
      --app, --appdir=VALUE  Default directory to deploy applications to
      --port=VALUE           TCP port on which Tentacle should listen to
                               connections
      --noListen=VALUE       Suppress listening on a TCP port (intended for
                               polling Tentacles only)
      --listenIpAddress=VALUE
                             IP address on which Tentacle should listen.
                               Default: any
      --trust=VALUE          The thumbprint of the Octopus Server to trust
      --remove-trust=VALUE   The thumbprint of the Octopus Server to remove
                               from the trusted list
      --reset-trust          Removes all trusted Octopus servers
 
Or one of the common options:

      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```

## File storage {#Tentacleconfigurationandfilestorage-Filestorage}

The Octopus server stores files in the following folders by default:

- `C:\Octopus\Tentacle\&lt;Instance&gt;`
 - This is the Tentacle Home Directory where `&lt;Instance&gt;` is an optional instance name in case you have multiple instances of Tentacle on the same computer.
 - This is where the Tentacle config file and deployment journal is stored.
- `&lt;Tentacle Home&gt;\Calamari`
 - This is where the Calamari packages are installed so Tentacle can execute deployments on your behalf.
- `&lt;Tentacle Home&gt;\Files`
 - This is the package cache used to store the most recent packages in case they need to be used again.

`&lt;Tentacle Home&gt;\Logs`
 - This is where the Tentacle log files are stored.
- `&lt;Tentacle Home&gt;\Work`
 - This is the temporary working directory used when Tentacle and Calamari execute deployments on your behalf.

## Clean up post-2.6 migration {#Tentacleconfigurationandfilestorage-Cleanuppost-2.6migration}

In 2.6 Tentacle stored files in the following folders by default:

- `C:\Octopus\Applications`
 - This is a mixed-purpose folder containing your deployed applications and some parts of Tentacle
- `C:\Octopus\Applications\.Tentacle`
 - This is where the deployment journal is stored
- `C:\Octopus\Applications\.Tentacle\Octopus.Tentacle`
 - This is where some versions of Tentacle put their "automatic upgrade" application files when Tentacle was upgraded from the Octopus Server
- `C:\Octopus\Applications\.SQ-OCTOPUS-&lt;SQUID&gt;` where `&lt;SQUID&gt;` is a unique identifier for this Tentacle instance
 - This is where some other versions of Tentacle put their "automatic upgrade" application files when Tentacle was upgraded from the Octopus Server
- `C:\Octopus\Application\.Tentacle\Packages`

 - This is the package cache used to store the most recent packages in case they need to be used again.
- `C:\Octopus\Logs`
 - This is where Tentacle stores its log files.
- `C:\Octopus\Tentacle\&lt;Instance&gt;`
 - This is where the Tentacle config file and Pipefish protocol files are stored, namely Actors, Messages and Streams.

Once a 2.6 Tentacle has been migrated to 3.x the following folders can safely be removed:

- `C:\Octopus\Applications\.Tentacle`
- `C:\Octopus\Applications\.Tentacle\Octopus.Tentacle`
- `C:\Octopus\Applications\.SQ-OCTOPUS-&lt;SQUID&gt;`
- `C:\Octopus\Application\.Tentacle\Packages`
- `C:\Octopus\Logs`
- `C:\Octopus\Tentacle\&lt;Instance&gt;`
