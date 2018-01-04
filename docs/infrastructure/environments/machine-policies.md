---
title: Machine Policies
description: Machine Policies allow you to customize the behavior of Tentacle and SSH endpoints like health check settings, machine connectivity, updates and more.
position: 3
version: 3.3
---

Machine policies are groups of settings that can be applied to Tentacle and SSH endpoints to modify their behavior. They can be used to:

- Customize the interval between health checks
- Run custom health check scripts
- Ignore machines that are unavailable during health checks
- Configure how Calamari and Tentacle are updated
- Automatically delete machines

![](/docs/images/5669423/5865583.png "width=500")

## Health Check Interval {#MachinePolicies-Healthcheckinterval}

Octopus periodically runs health checks on deployment targets to ensure that they are available for deployment.  Setting "Time between checks" configures how frequently automatic health checks run.

![](/docs/images/5669423/5865585.png "width=500")

## Custom Health Check Scripts {#MachinePolicies-Customhealthcheckscripts}

Machine policies allow the configuration of custom health check scripts for Tentacle and SSH targets. While we do not expose the full underlying script that runs during health checks, we give you an entry point to inject your own custom scripts. For example, here is the default custom health check script for Tentacles that checks disk space:

**Default Tentacle Health Check Script**

```powershell
$freeDiskSpaceThreshold = 5GB
Try {
	Get-WmiObject win32_LogicalDisk -ErrorAction Stop  | ? { ($_.DriveType -eq 3) -and ($_.FreeSpace -ne $null)} |  % { CheckDriveCapacity @{Name =$_.DeviceId; FreeSpace=$_.FreeSpace} }
} Catch [System.Runtime.InteropServices.COMException] {
	Get-WmiObject win32_Volume | ? { ($_.DriveType -eq 3) -and ($_.FreeSpace -ne $null) -and ($_.DriveLetter -ne $null)} | % { CheckDriveCapacity @{Name =$_.DriveLetter; FreeSpace=$_.FreeSpace} }
	Get-WmiObject Win32_MappedLogicalDisk | ? { ($_.FreeSpace -ne $null) -and ($_.DeviceId -ne $null)} | % { CheckDriveCapacity @{Name =$_.DeviceId; FreeSpace=$_.FreeSpace} }
}
```

The function *CheckDriveCapacity* informs you about how much space is available on your Tentacle's local hard disk and will write a warning if the free disk space is less than this threshold. You can add additional Powershell to this script to customize your health checks as you wish, modify or remove the disk space checking altogether. It's entirely up to you! Just remember, you can copy and paste the original script above *back* into your machine policy if you run into any problems and wish to get back to the default behavior.

The health status of a deployment target can be set by custom health check scripts.  Deployment targets can have four health statuses:

- Healthy
- Healthy with Warnings
- Unhealthy
- Unavailable

A *healthy* deployment target completes a health check without any errors or warnings.  A deployment target that is *healthy with warnings* completes a health check but encounters a non-critical failure during the health check.  An *unhealthy* deployment target completes a health check but encounters a critical failure while running the health check script.  An *unavailable* deployment target is not contactable by Octopus during a health check.

A health check script can set the status of a target by returning a non-zero exit code or by writing a service message during the health check. Tentacle deployment targets can use *Write-Warning*, *Write-Error* and *Fail-HealthCheck* to convey a healthy with warnings or unhealthy status:

**Tentacle Health Check Service Messages**

```powershell
# For setting a health status of Healthy with Warnings:
Write-Warning "This is a warning"
# For setting a health status of Unhealthy:
Write-Error "This is an error"
Fail-HealthCheck "This is an error"
```

SSH targets do not include a disk space check by default like Tentacle targets do. As such, there is no default Bash script listed in your machine policy for SSH targets by default. However, you may write your own, or choose to add additional Bash script to run against your SSH targets during health checks. Again, it's entirely up to you. Unless you select the `Only perform connection test` option, there are some [system prerequisites](/docs/infrastructure/ssh-targets/index.md#SSHTargets-Requirements) that are included as part of the standard health check.

SSH deployment targets can use *echo\_warning*, *echo\_error* and *fail\_healthcheck* to convey a *healthy with warnings* or *unhealthy* status:

**SSH Health Check Service Messages**

```bash
# For setting a health status of Healthy with Warnings:
echo_warning "This is a warning"
# For setting a health status of Unhealthy:
echo_error "This is an error"
fail_healthcheck "This is an error"
```

:::hint
**Agent-Level Variables**

When using a custom health check script, the script execution through Calamari is bypassed. This results in some behavioral differences as compared with the normal scripting in Octopus that you would be accustomed to. You can still use the standard `#` variable substitution syntax, however since this is replaced on the server, environment variables from your target will not be available through Octopus variables.
:::

## Ignore Machines That are Unavailable During Health Checks {#MachinePolicies-Ignoremachinesthatareunavailableduringhealthchecks}

By default, health checks fail if any deployment targets are unavailable during the health check.  Machine policies offer an option to ignore machines if they are unavailable during a health check:

![](/docs/images/5669423/5865592.png "width=500")

By selecting **Unavailable machines will not cause health checks to fail,** any deployment targets that Octopus cannot contact during a health check will be skipped and the health check marked as successful. If the target is contactable but encounters an error or warning, the usual health check behavior will proceed (ie. a warning will be reported or the health check will fail with an error).

## Configure How Calamari and Tentacle are Updated {#MachinePolicies-ConfigurehowCalamariandTentacleareupdated}

Brand new Tentacle and SSH endpoints require the installation of Calamari to perform a deployment.  Also, if Calamari is updated, the Octopus Server will push the update to Tentacle and SSH endpoints. When there is a Tentacle update, Octopus can automatically update Tentacle endpoints.  Machine policies allow the customization of when Calamari and Tentacle updates occur.

![](/docs/images/5669423/5865594.png "width=500")

By default, Calamari will be installed or updated when a machine is involved in a deployment.  The other two options will update Calamari:

- the first time a machine is added to Octopus and then subsequently when it is involved in a deployment
- any time Octopus detects Calamari is out of date (after health checks for example)

Tentacle can be toggled to manually or automatically update Tentacle.  If **Automatically update Tentacle** is selected, Octopus will start a task to update Tentacles whenever Octopus detects that there is a pending Tentacle upgrade (after health checks for example). Conversely, Octopus will not automatically start a task to update Tentacle but will prompt to begin a Tentacle update on the environments screen.

### Tentacle Update Account {#MachinePolicies-TentacleUpdateAccount}
You can select a username/password account to perform automatic Tentacle updates.  When no account is selected, the account that the Tentacle service is running as will attempt to perform Tentacle updates. Sometimes that account does not have enough permission to perform Tentacle updates. Create a [username/password account](/docs/infrastructure/ssh-targets/username-and-password.md) for a user with enough permissions to install software on your machines (Administrator works great!) and select it from the drop down.

**Note:** This option can not be used when Tentacle is running as Local System.

## Automatically Delete Machines {#MachinePolicies-Automaticallydeletemachines}

!partial <automatically-delete-machines>

![](/docs/images/5669423/5865595.png "width=500")

## Assign Machine Policies to Machines {#MachinePolicies-Assignmachinepoliciestomachines}

Assign a machine policy to a machine by selecting a machine from the *Environments* screen and using the *Policy* drop down to select the machine policy:

![](/docs/images/5669423/5865599.png "width=500")

Machine policy can also be set from the command line by using the --policy argument:

**Setting Machine Policy**

```powershell
Tentacle.exe register-with --instance "Tentacle" --server "http://YOUR_OCTOPUS" --apiKey="API-YOUR_API_KEY" --role "web-server" --environment "Staging" --comms-style TentaclePassive --policy "Transient machines"
```
