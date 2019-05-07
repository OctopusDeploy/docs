---
title: Machine Policies
description: Machine Policies allow you to customize the behavior of Tentacle and SSH endpoints like health check settings, machine connectivity, updates and more.
position: 50
---

Machine policies are groups of settings that can be applied to Tentacle and SSH endpoints to modify their behavior. They can be used to:

- Customize the interval between health checks.
- Run custom health check scripts.
- Ignore machines that are unavailable during health checks.
- Configure how Calamari and Tentacles, and SSH Targets are updated.
- Automatically delete machines.

You can access the machine policies by navigating to **{{Infrastructure,Machine policies}}**.

## Health Check

Octopus periodically runs health checks on deployment targets and workers to ensure that they are available and running the latest version of Calamari.  

## Health Status

The health status of a deployment target can be set by custom health check scripts. Deployment targets can have four health statuses:

- Healthy
- Healthy with Warnings
- Unhealthy
- Unavailable

A *healthy* deployment target completes a health check without any errors or warnings.  A deployment target that is *healthy with warnings* completes a health check but encounters a non-critical failure during the health check.  An *unhealthy* deployment target completes a health check but encounters a critical failure while running the health check script.  An *unavailable* deployment target is not contactable by Octopus during a health check.

## Initial Health Check

After installing and configuring a new Tentacle, you need to run a health check and can upgrade the version of Calamari.

1. From the **Infrastructure** tab, select **deployment targets**.
2. Click the overflow menu and select **Check Health**. If you've installed multiple Tentacles, it will check all of your Tentacles (if you'd rather check only one Tentacle, select that Tentacle from the Deployment Targets section, click **Connectivity** and then **Check health**).

The first time you complete a health check on a Tentacle or SSH Target, you will see health warnings and that Calamari needs to be installed.

Learn more about [Calamari](/docs/api-and-integration/calamari.md).

Octopus will automatically push the latest version of Calamari with your first deployment, but you can do the following to install Calamari:

1. From the Infrastructure tab, select deployment targets.
2. Click the overflow menu and select **Upgrade Calamari on Deployment Targets**.

### Health Check Interval {#MachinePolicies-Healthcheckinterval}

You can set the "Time between checks" to control how frequently automatic health checks run.

![](/docs/images/5669423/5865585.png)

### Health Check Type {#MachinePolicies-Healthchecktype}

You can configure health checks to run scripts on deployment targets, or just check that a connection can be established with the deployment target. When the "Run health check scripts" option is selected you will also have the opportunity to customize the PowerShell and Bash scripts that will be executed during the health check. The "Only perform connection test" option is recommended if you are using the raw scripting feature.

### Custom Health Check Scripts {#MachinePolicies-Customhealthcheckscripts}

Machine policies allow the configuration of custom health check scripts for Tentacle and SSH deployment targets. While we do not expose the full underlying script that runs during health checks, we give you an entry point to inject your own custom scripts. For example, here is the default custom health check script for PowerShell that checks disk space:

**Default PowerShell Health Check Script**

```powershell
$freeDiskSpaceThreshold = 5GB
Try {
	Get-WmiObject win32_LogicalDisk -ErrorAction Stop  | ? { ($_.DriveType -eq 3) -and ($_.FreeSpace -ne $null)} |  % { CheckDriveCapacity @{Name =$_.DeviceId; FreeSpace=$_.FreeSpace} }
} Catch [System.Runtime.InteropServices.COMException] {
	Get-WmiObject win32_Volume | ? { ($_.DriveType -eq 3) -and ($_.FreeSpace -ne $null) -and ($_.DriveLetter -ne $null)} | % { CheckDriveCapacity @{Name =$_.DriveLetter; FreeSpace=$_.FreeSpace} }
	Get-WmiObject Win32_MappedLogicalDisk | ? { ($_.FreeSpace -ne $null) -and ($_.DeviceId -ne $null)} | % { CheckDriveCapacity @{Name =$_.DeviceId; FreeSpace=$_.FreeSpace} }
}
```

The function *CheckDriveCapacity* informs you about how much space is available on your deployment target's local hard disk and will write a warning if the free disk space is less than this threshold. You can add additional PowerShell to this script to customize your health checks as you wish, modify or remove the disk space checking altogether. It's entirely up to you! Just remember, you can copy and paste the original script above *back* into your machine policy if you run into any problems and wish to get back to the default behavior.

## Setting the Status

A health check script can set the status of a target by returning a non-zero exit code or by writing a service message during the health check. PowerShell based deployment targets can use *Write-Warning*, *Write-Error* and *Fail-HealthCheck* to convey a healthy with warnings or unhealthy status:

**PowerShell Health Check Service Messages**

```powershell
# For setting a health status of Healthy with Warnings:
Write-Warning "This is a warning"
# For setting a health status of Unhealthy:
Write-Error "This is an error"
Fail-HealthCheck "This is an error"
```

Bash targets do not include a disk space check by default like PowerShell targets do. As such, there is no default Bash script listed in your machine policy for Bash targets by default. However, you may write your own, or choose to add additional Bash script to run against your Bash targets during health checks. Again, it's entirely up to you. Unless you select the `Only perform connection test` option, there are some [system prerequisites](/docs/infrastructure/deployment-targets/linux/requirements.md) that are included as part of the standard health check.

Bash deployment targets can use *echo\_warning*, *echo\_error* and *fail\_healthcheck* to convey a *healthy with warnings* or *unhealthy* status:

**Bash Health Check Service Messages**

```bash
# For setting a health status of Healthy with Warnings:
echo_warning "This is a warning"
# For setting a health status of Unhealthy:
echo_error "This is an error"
fail_healthcheck "This is an error"
```

:::hint
**Agent-Level Variables**

When using a custom health check script, the script execution through Calamari is bypassed. This results in some behavioral differences compared with the normal scripting in Octopus that you would be accustomed to. You can still use the standard `#` variable substitution syntax, however since this is replaced on the server, environment variables from your target will not be available through Octopus variables.
:::

## Ignore Machines That are Unavailable During Health Checks {#MachinePolicies-Ignoremachinesthatareunavailableduringhealthchecks}

By default, health checks fail if any deployment targets are unavailable during the health check.  Machine policies offer an option to ignore machines if they are unavailable during a health check:

![](/docs/images/5669423/5865592.png)

By selecting **Unavailable machines will not cause health checks to fail,** any deployment targets that Octopus cannot contact during a health check will be skipped and the health check marked as successful. If the target is contactable but encounters an error or warning, the usual health check behavior will proceed (ie. a warning will be reported or the health check will fail with an error).

## Configure How Calamari and Tentacle are Updated {#MachinePolicies-ConfigurehowCalamariandTentacleareupdated}

Brand new Tentacle and SSH endpoints require the installation of Calamari to perform a deployment.  Also, if Calamari is updated, the Octopus Server will push the update to Tentacle and SSH endpoints. When there is a Tentacle update, Octopus can automatically update Tentacle endpoints.  Machine policies allow the customization of when Calamari and Tentacle updates occur.

![](/docs/images/5669423/5865594.png)

By default, Calamari will be installed or updated when a machine is involved in a deployment.  The other two options will update Calamari:

- the first time a machine is added to Octopus and then subsequently when it is involved in a deployment.
- any time Octopus detects Calamari is out of date (after health checks for example).

Tentacle can be toggled to manually or automatically update Tentacle.  If **Automatically update Tentacle** is selected, Octopus will start a task to update Tentacles whenever Octopus detects that there is a pending Tentacle upgrade (after health checks for example). Conversely, Octopus will not automatically start a task to update Tentacle but will prompt to begin a Tentacle update on the environments screen.

### Tentacle Update Account {#MachinePolicies-TentacleUpdateAccount}
You can select a username/password account to perform automatic Tentacle updates.  When no account is selected, the account that the Tentacle service is running as will attempt to perform Tentacle updates. Sometimes that account does not have enough permission to perform Tentacle updates. Create a [username/password account](/docs/infrastructure/accounts/ssh-key-pair.md) for a user with enough permissions to install software on your machines (Administrator works great!) and select it from the drop down.

**Note:** This option can not be used when Tentacle is running as Local System.

## Automatically Delete Machines {#MachinePolicies-Automaticallydeletemachines}

Machine policies can be configured to automatically remove unavailable machines after a time period.  When a health check runs, Octopus detects if machines are unavailable (cannot be contacted). When the **Automatically delete unavailable machines** option is set, Octopus checks how long a machine has been unavailable.  If the specified time period has elapsed, the machine is permanently deleted from Octopus.

![](/docs/images/5669423/5865595.png)

## Assign Machine Policies to Machines {#MachinePolicies-Assignmachinepoliciestomachines}

Assign a machine policy to a machine by selecting a machine from the *Environments* screen and using the *Policy* drop down to select the machine policy:

![](/docs/images/5669423/5865599.png)

Machine policy can also be set from the command line by using the --policy argument:

**Setting Machine Policy**

```powershell
Tentacle.exe register-with --instance "Tentacle" --server "http://YOUR_OCTOPUS" --apiKey="API-YOUR_API_KEY" --role "web-server" --environment "Staging" --comms-style TentaclePassive --policy "Transient machines"
```
