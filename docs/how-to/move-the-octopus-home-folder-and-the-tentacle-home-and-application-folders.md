---
title: Move the Octopus Home folder and the Tentacle Home and Application folders
description: How to move the Octopus Home folder and the Tentacle Home and Application folders.
position: 3
---

## Move the Octopus Home folder {#MovetheOctopusHomefolderandtheTentacleHomeandApplicationfolders-MovetheOctopusHomefolder}

Occasionally it may be necessary to change the location at which Octopus stores its data (called the "Octopus Home" folder) as well as the Registry Key which defines the Octopus Server instance. This can be done using the command-line on the Octopus server.

:::problem
Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

:::hint
**Administrator Rights Required**
The following commands will need to be run as Administrator as they require access to the Registry.

N.B. The delete-instance command will not actually delete any files, just the Registry key referring to the configuration file. This is a safe operation which will not delete your Octopus Server data.
:::

A PowerShell script showing the steps is set out below. You need to change the variables to match your Octopus installation, and you may wish to run each step separately to deal with any issues like locked files.

```powershell
$oldHome = "C:\Octopus"
$newHome = "C:\YourNewHomeDir"
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"
$newConfig = $newHome + "\OctopusServer.config"
& "$octopus" service --stop
mv $oldHome $newHome

&"$octopus" delete-instance --instance=OctopusServer
&"$octopus" create-instance --instance=OctopusServer --config=$newConfig

& "$octopus" configure --home="$newHome"
& "$octopus" service --start

```

:: hint
You may also want to modify the path of your other artifacts when moving your home directory...
```
&"$octopus" path --nugetRepository="$nugetPath"
&"$octopus" path --artifacts="$artifactPath"
&"$octopus" path --taskLogs="$taskLogs"
```


## Move the Tentacle Home and Application folders {#MovetheOctopusHomefolderandtheTentacleHomeandApplicationfolders-MovetheTentacleHomeandApplicationfolders}

Occasionally it may be necessary to change the location at which a Tentacle stores its data (called the "Tentacle Home" and "Tentacle Applications" folder) as well as the Registry Key which defines the Tentacle instance. This can be done using the command-line on the Tentacle server.

:::hint
**Administrator Rights Required**
The following commands will need to be run as Administrator as they require access to the Registry.

N.B. The delete-instance command will not actually delete any files, just the Registry key referring to the configuration file. This is a safe operation which will not delete your Tentacle data.
:::

A PowerShell script showing the steps is set out below. You need to change the variables to match your Tentacle installation, and you may wish to run each step separately to deal with any issues like locked files.

```powershell
##Config##
$instance = "InstanceName" #Name of the Instance.
$oldHome = "C:\Octopus\InstanceName" #Current home of the instance.
$newHome = "C:\NewHome\InstanceName" #New home path for the instance.
$appFolder = "Applications" #Name of the folder being used for applications.

##Process##
$oldConfig = Get-Item "$oldHome\*.config"
$newConfig = "$newHome\$($oldConfig.name)"
$tentacleExe = "C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe"

# Stop the current Tentacle service
& "$tentacleExe" service --instance $instance --stop

#Copy Tentacle configuration and appliation files from OldHome to NewHome
new-item $newHome -type directory -Force
$source = $oldHome + "\*"
copy-item $source $newHome

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
