---
title: Service Watchdog
description: The Octopus Server and Tentacle watchdog command can be used to configure a Windows Scheduled Task that ensures the services are running.
position: 2300
---

In some environment the Windows Services for Octopus Deploy Server and Tentacle may not reliably start when the server is rebooted.  This typically occurs during a restart after Windows Updates have been installed.

## Why Does it Happen? {#ServiceWatchdog-Whydoesithappen?}

The exact cause of this issue has not yet been determined, however investigation indicates that it may be related to a delay caused by slow initialization of the .NET CLR during these restarts.

## What Can You Do About It? {#ServiceWatchdog-Whatcanyoudoaboutit?}

As of Octopus Deploy 3.7.17 there is a **watchdog** command that can be used on the command line to configure a Windows Scheduled Task that ensures the services are running.  The command is used as follows.

### Configuring the Watchdog {#ServiceWatchdog-ConfiguringtheWatchdog}

```powershell
Tentacle.exe watchdog --create --instances * --interval 10
```

The instances parameter can either be an \*, to indicate all instances that can be found on the server, or a comma separated list of specific instance names.  *If not specified the value will default to \**.

The interval is the interval at which the services should be checked, specified in minutes.  *If not specified the value will default to 5*.

The scheduled task's name for the above will be **Octopus Watchdog Tentacle**.

:::hint
By default the task will be configured to run as the Local System account, but that can be changed using the Windows Task Scheduler.
:::

:::success
If the watchdog has already been configured, running the command again will reconfigure the instances and interval for the scheduled task.  Any other values that have been changed in Windows Task Scheduler will not be changed.
:::

:::hint
To specify only the default instance, use the name **Tentacle**. For example,

```
Tentacle.exe watchdog --create --instances Tentacle --interval 10
```
:::

### Canceling the Watchdog {#ServiceWatchdog-CancelingtheWatchdog}

```powershell
Tentacle.exe watchdog --delete
```

:::success
If you have scheduled the watchdog to monitor all instances on a server but you need to stop one for some reason without it being restarted you can:

- Disable the service for that instance, the watchdog will attempt to start it but will not be able to (which will be reflected in it's log)
- Edit the watchdog to only check the other instances
:::

###
Recreating the Watchdog {#ServiceWatchdog-RecreatingtheWatchdog}

As mentioned above, running create again can be used to change the instances and interval for the watchdog, but all other settings will remain unchanged.  If you do want to reset all of the other settings you can easily combine the delete and create, for example

```powershell
Tentacle.exe watchdog --delete --create --instances * --interval 10
```

### Logging {#ServiceWatchdog-Logging}

Octopus Deploy Server and Tentacle will generally endeavor to write all log entries to the instance's log file.  The watchdog is however running outside of the context of any single instance, so it writes to a log file in the user's profile.  The user in question here is the user that the Scheduled Task is running as, and as mentioned above that defaults to the Local System user.

:::hint
The default log file location is therefore **C:\Windows\System32\config\systemprofile\AppData\Local\Octopus\Logs**
:::

This is only for information related to which instances the the watchdog attempted to start, and any errors it received while trying to start the windows services.  Any instance specific errors will still be located in the instance's log file.

### Tentacle vs Octopus Server {#ServiceWatchdog-TentaclevsOctopusServer}

The above commands work equally for Octopus Deploy Server and Tentacle (by using **Octopus.Server.exe** instead of **Tentacle.exe**).  Noting that the Tentacle Watchdog will only check Tentacle instances and the Octopus Server Watchdog will only check server instances.  They can both be configured simultaneously on the same machine.

:::hint
To specify only the default instance for server, use the name **OctopusServer**. For example,

```
Octopus.Server.exe watchdog --create --instances OctopusServer --interval 10
```
:::

## Installation Locations {#ServiceWatchdog-Installationlocations}

Please note that the task created by the watchdog references the Octopus Server/Tentacle executable from the location is was in when the watchdog command was executed.

:::hint
If Tentacle has been installed to a non-default location, as illustrated in [Automating Tentacle installation](/docs/infrastructure/windows-targets/automating-tentacle-installation.md), then the watchdog task could fall out of sync with Tentacle if it gets upgraded by the server. In this scenario the service would be running from the default location and the watchdog would be running from the original location.

For this reason, it is recommended that you have your Tentacle installed in the default location before configuring the watchdog.
:::
