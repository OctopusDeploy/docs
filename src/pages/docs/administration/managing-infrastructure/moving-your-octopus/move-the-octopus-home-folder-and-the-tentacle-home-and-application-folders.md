---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Move the Octopus home folder and the Tentacle home and application folders
description: How to move the Octopus home folder and the Tentacle home and application folders.
navOrder: 13
---

## Move the Octopus home folder {#MovetheOctopusHomefolderandtheTentacleHomeandApplicationfolders-MovetheOctopusHomefolder}

:::div{.problem}

Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

Occasionally it may be necessary to change the location at which Octopus stores its data (called the "Octopus Home" folder) as well as the Registry Key which defines the Octopus Server instance. This can be done using the command-line on the Octopus Server.

A PowerShell script showing the steps is set out below. You need to change the variables to match your Octopus installation, and you may wish to run each step separately to deal with any issues like locked files.

:::div{.hint}
**Administrator Rights Required**
The following commands will need to be run as Administrator as they require access to the Registry.

N.B. The delete-instance command will not actually delete any files, just the Registry key referring to the configuration file. This is a safe operation which will not delete your Octopus Server data.
:::

```powershell
$oldHome = "C:\Octopus"
$newHome = "C:\YourNewHomeDir"
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"
$newConfig = $newHome + "\OctopusServer.config"
& "$octopus" service --stop
mv $oldHome $newHome

& "$octopus" delete-instance --instance=OctopusServer
& "$octopus" create-instance --instance=OctopusServer --config=$newConfig

& "$octopus" configure --home="$newHome"

& "$octopus" service --start
```

## Move the Tentacle home and application folders {#MovetheOctopusHomefolderandtheTentacleHomeandApplicationfolders-MovetheTentacleHomeandApplicationfolders}

Occasionally it may be necessary to change the location at which a Tentacle stores its data (called the "Tentacle Home" and "Tentacle Applications" folder) as well as the Registry Key which defines the Tentacle instance. This can be done using the command-line on the machine where the Tentacle is installed.

A PowerShell script showing the steps is set out below. You need to change the variables to match your Tentacle installation, and you may wish to run each step separately to deal with any issues like locked files.

Default Tentacle instances are named *Tentacle*. You can find your instance names by running the [Tentacle.exe list-instances](/docs/octopus-rest-api/tentacle.exe-command-line/list-instances) command.

:::div{.hint}
**Administrator rights required**
The following commands will need to be run as Administrator as they require access to the Registry.

N.B. The delete-instance command will not actually delete any files, just the Registry key referring to the configuration file. This is a safe operation which will not delete your Tentacle data.
:::

```powershell
##Config##
$instance = "InstanceName" #Name of the instance.
$oldHome = "C:\Octopus\$instance" #Current home of the instance.
$newHome = "C:\NewHome\$instance" #New home path for the instance.
$appFolder = "Applications" #Name of the folder being used for applications.

##Process##
$oldConfig = Get-Item "$oldHome\*.config"
$newConfig = "$newHome\$($oldConfig.name)"
$tentacleExe = "C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe"

# Stop the current Tentacle service
& "$tentacleExe" service --instance $instance --stop

#Copy Tentacle configuration and application files from OldHome to NewHome
new-item $newHome -type directory -Force
$source = $oldHome + "\*"
copy-item -Recurse $source $newHome

# Delete the current Tentacle instance
& "$tentacleExe" delete-instance --instance $instance

# Create the new Tentacle instance with its new configuration file
& "$tentacleExe" create-instance --instance $instance --config $newConfig

# Configure the Tentacle's Home folder
& "$tentacleExe" configure --home $newHome --instance $instance

# Configure Tentacle's Application folder. Next line assumes app folder is a child of home folder
$appFolder = "$newHome\$appFolder"
& "$tentacleExe" configure --app $appFolder --instance $instance

# Start the new Tentacle service
& "$tentacleExe" service --instance $instance --start

write-host "The source folder $oldHome was not removed. You need to do that manually after testing." -ForegroundColor yellow
```
