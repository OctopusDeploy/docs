---
title: Updating Windows
description: With Octopus Deploy you can update and patch Windows machines with a runbook as part of a routine operations task.
position: 60
---

It is not always possible to use products such as Microsfot System Center Configuration Manager to orchestrate the installation of patches for Windows, especially if your VMs are in the cloud and not connected to your Active Directory.  In situations like these, you can take advantage of Octopus Deploy runbooks and [triggers](/docs/runbooks/scheduled-runbook-trigger/index.md) to periodically check and apply updates to your application infrastructure.

## Create the runbook

To create a runbook to perform updates on your Windows machines:

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **PowerShell** and add the following code:
```PowerShell
function Get-NugetPackageProviderNotInstalled
{
	# See if the nuget package provider has been installed
    return ($null -eq (Get-PackageProvider -ListAvailable -Name Nuget -ErrorAction SilentlyContinue))
}

function Get-ModuleInstalled
{
    # Define parameters
    param(
        $PowerShellModuleName
    )

    # Check to see if the module is installed
    if ($null -ne (Get-Module -ListAvailable -Name $PowerShellModuleName))
    {
        # It is installed
        return $true
    }
    else
    {
        # Module not installed
        return $false
    }
}


# Force use of TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Check to see if the NuGet package provider is installed
if ((Get-NugetPackageProviderNotInstalled) -ne $false)
{
  # Display that we need the nuget package provider
  Write-Host "Nuget package provider not found, installing ..."

  # Install Nuget package provider
  Install-PackageProvider -Name Nuget -Force

  Write-Output "Nuget package provider succesfully installed ..."
}


Write-Output "Checking for PowerShell module PSWindowsUpdate ..."

if ((Get-ModuleInstalled -PowerShellModuleName "PSWindowsUpdate") -ne $true)
{
	Write-Output "PSWindowsUpdate not found, installing ..."
    
    # Install PSWindowsUpdate
    Install-Module PSWindowsUpdate -Force
    
    Write-Output "Installation of PSWindowsUpdate complete ..."
}

Write-Output "Checking for updates ..."

$windowsUpdates = Get-WindowsUpdate 

# Check to see if there's anything to install
if ($windowsUpdates.Count -gt 0)
{
	Write-Output "Installing updates ..."
	Install-WindowsUpdate -AcceptAll -AutoReboot
}
else
{
	Write-Output "There are no updates available."
}
```
:::warning
Be aware that the `AutoReboot` switch will reboot the machine after the first update that needs it.  If there is more than one update that requires a reboot, you may need to run the above PowerShell again to get the rest of the available updates.
:::

## Samples

We have a [Target - Windows](https://g.octopushq.com/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `PetClinic` project.