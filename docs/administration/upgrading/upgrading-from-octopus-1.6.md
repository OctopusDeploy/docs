---
title: Upgrading From Octopus 1.6
description: Information on how to upgrade from Octopus 1.6 to a more modern version.
position: 4
---

:::problem
You will not be able to upgrade directly from Octopus 1.6 to the latest version of Octopus. If you are running a version of Octopus prior to 2.0, use this guide to upgrade from 1.6 to 2.6, then follow the [guide to upgrade from 2.6 to the latest version of Octopus](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md).
:::

A **lot** changed between Octopus 1.6 and Octopus 2.0; so much that we had to to handle upgrades differently to the way we handle upgrades from, say, 1.5 to 1.6. This page will walk you through the process of upgrading an Octopus 1.6 instance to Octopus 2.0. Rather than being an in-place upgrade, Octopus 2.0 is designed to be a **side-by-side** upgrade.

## Preparing {#UpgradingfromOctopus1.6-Preparing}

:::problem
If your Octopus 1.x installation is at an earlier version than 1.6, please [upgrade it to Octopus 1.6](https://octopusdeploy.com/downloads/previous) before proceeding.
:::

Below is the dashboard from an Octopus 1.6 server that will be used as an example for this walkthrough.

![](/docs/images/3048130/3278001.png "width=500")

Before attempting to migrate, make sure that you don't have any projects, environments, or machines with duplicated names (this is no longer allowed in Octopus 2.0, and the migration wizard will report an error if it finds duplicates).

Then go to the **Storage** tab in the **Configuration** area, and make sure that you have a recent backup:

![](/docs/images/3048130/3277999.png "width=500")

## Install Octopus 2.0 {#UpgradingfromOctopus1.6-InstallOctopus2.0}

Next, install Octopus Deploy 2.0, either on the same server as your current Octopus 1.6 server, or on a new server (ideal). Octopus 2.0 uses different paths, ports and service names to 1.0 so there should not be any conflicts between them.

:::hint
View our [guide to installing an Octopus Deploy 2.0 server](/docs/installation/index.md), which includes a video walkthrough.
:::

## Importing {#UpgradingfromOctopus1.6-Importing}

On the Octopus 2.0 server, open the Octopus Manager from your start menu/start screen.

![](/docs/images/3048130/3277998.png)

In the Octopus Manager, click **Import from 1.6...**

![](/docs/images/3048130/3277997.png "width=500")

When the wizard appears, select the backup file from Octopus 1.6 that you created earlier

Next, you'll be asked if you want to change the Tentacle port on all machines that get imported. For more information on why you might like to do this, see the section on upgrading Tentacles below.

:::success
If you don't change the Tentacle port, make sure you completely shut down your Octopus 1.6 server after the upgrade, or remove the upgraded machines from it. Leaving the 1.6 server running will generate large numbers of invalid connection attempts from the old server to the new Tentacles, and this can adversely affect performance.
:::

![](/docs/images/3048130/3277995.png "width=500")

Next, click Import and your Octopus 1.6 backup will be imported.

![](/docs/images/3048130/3277994.png "width=500")

The import process will take a few minutes to run, and any errors will be reported in the output window.

![](/docs/images/3048130/3277993.png "width=500")

At this point, you should be able to view the imported projects, environments and machines, but all the machines will be offline.

![](/docs/images/3048130/3277992.png "width=500")

## Permissions {#UpgradingfromOctopus1.6-Permissions}

The Octopus 2.x migrator will not import permission settings from 1.6, due to changes made between the permission models. After you upgrade to 2.x, you will need to configure [Teams](/docs/administration/managing-users-and-teams/index.md) to assign permissions.

## Upgrading Tentacles {#UpgradingfromOctopus1.6-UpgradingTentacles}

Octopus 2.x changed the communication stack between Octopus and Tentacle, meaning that your Octopus 2.x server can no longer communicate with Tentacle 1.6. So in addition to upgrading Octopus, you'll also need to upgrade any Tentacles.

The following PowerShell script can be used to download the latest Tentacle MSI, install it, import the X.509 certificate used for Tentacle 1.6, and configure it in listening mode.

```powershell
function Uninstall-OldTentacle {
  Write-Output "Uninstalling the 1.0 Tentacle"
  $app = Get-WmiObject -Query "SELECT * FROM Win32_Product WHERE Name = 'Octopus Deploy Tentacle' AND Version < 2.0"          
  $app.Uninstall()
  & sc.exe delete "Octopus Tentacle"
}

function Upgrade-Tentacle ($rel, $loc, $hm, $sthumb, $sxsPort)
{
  Write-Output "Beginning Tentacle installation"
  Write-Output "Downloading Octopus Tentacle MSI..."
  $downloader = new-object System.Net.WebClient
  $downloader.DownloadFile("http://download.octopusdeploy.com/octopus/Octopus.Tentacle.$rel.msi", [System.IO.Path]::GetFullPath(".\Tentacle.msi"))

  Write-Output "Installing MSI"
  $msiExitCode = (Start-Process -FilePath "msiexec.exe" -ArgumentList "/i Tentacle.msi /quiet" -Wait -Passthru).ExitCode
  Write-Output "Tentacle MSI installer returned exit code $msiExitCode"
  if ($msiExitCode -ne 0) {
    throw "Installation aborted"
  }

  Write-Output "Configuring the 2.0 Tentacle"

  cd "$loc"

  & .\tentacle.exe create-instance --instance "Tentacle" --config "$hm\Tentacle\Tentacle.config" --console
  & .\tentacle.exe import-certificate --instance "Tentacle" --from-registry  --console
  & .\tentacle.exe new-certificate --instance "Tentacle" --if-blank --console
  & .\tentacle.exe configure --instance "Tentacle" --home "$hm" --console
  & .\tentacle.exe configure --instance "Tentacle" --app "$hm\Applications" --console
  & .\tentacle.exe configure --instance "Tentacle" --trust="$sthumb"
 
  if ($sxsPort) {
    & .\tentacle.exe configure --instance "Tentacle" --port "$sxsPort" --console
  }
 
  if (!$sxsPort) {
    Write-Output "Stopping the 1.0 Tentacle"
    Stop-Service "Octopus Tentacle"
  }
 
  Write-Output "Starting the 2.0 Tentacle"
  & .\tentacle.exe service --instance "Tentacle" --install --start --console

  if (!$sxsPort) {
    Uninstall-OldTentacle
  }
 
  Write-Output "Tentacle commands complete"
}
 
# If sxsPort ('side-by-side port') is specified, the old Tentacle will remain running
# alongside the new one. If an sxsPort is not specified, the old Tentacle will be
# uninstalled.
Upgrade-Tentacle `
  -rel "2.0.13.1100-x64" `
  -loc "${env:ProgramFiles}\Octopus Deploy\Tentacle" `
  -hm "${env:SystemDrive}\Octopus" `
  -sthumb "*** ENTER OCTOPUS THUMBPRINT HERE ***" `
  -sxsPort "10934"
```

*(Many thanks to James Crowley for his improvements to this script.)*
