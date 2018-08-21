---
title: Moving the Octopus Home Directory
description: Information on how to move any of the Octopus Server folders.
position: 400
---

If you need to move any of the folders used by the Octopus Server you can follow the instructions on this page to move individual folders and reconfigure the Octopus Server to use the new folder locations.

## Move Octopus Home Folder {#MovingOctopusServerfolders-OctopusHomeMoveOctopusHomefolder}

If you need to move the Octopus Home folder, you can do that using the command-line as described below:

**Usage**

```powershell
Usage: Octopus.Server configure [<options>]
```

Where `[<options>]` is:

**Options**

```powershell
      --instance=VALUE       Name of the instance to use
      --home=VALUE           Home directory

Or one of the common options:

      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
```

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

## Move Other Octopus Server Folders {#MovingOctopusServerfolders-MoveotherOctopusServerfolders}

If you need to move other folders than the Octopus Home folder, you can do that using the command-line as described below

**Usage**

```powershell
Octopus.Server path [<options>]
```

Where `[<options>]` is any of:

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

## Move NuGet Repository Folder {#MovingOctopusServerfolders-NuGetRepositoryMoveNuGetrepositoryfolder}

A PowerShell script showing the steps is set out below. You need to change the variables to match your Octopus installation, and you may wish to run each step separately to deal with any issues like locked files. The new path will apply to existing packages in the repository, so it is important to move the packages.

```powershell
$oldNuGetRepository = "C:\Octopus\Packages"
$newNuGetRepository = "C:\YourNewHomeDir\Packages"
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"

& "$octopus" service --stop
mv $oldNuGetRepository $newNuGetRepository

& "$octopus" path --nugetRepository="$newNuGetRepository"
& "$octopus" service --start
```
The restart of the service will re-index the directory. If it is missing files, they will then go missing from the internal repository and again from your releases. So be sure that all files are moved.

The above script will take the server offline for the duration of the move. If there are a large number of packages, this can be quite some time, and taking the server offline for the duration may not be possible. To prevent the server re-indexing all the packages however, the packages should not be removed from expected folder while the server is running. Therefore an alternative approach is to:
1. Copy the folder while the server is running.
1. Stop the server.
1. Use a file mirroring tool like `robocopy` to ensure the new folder reflects the added and removed files while the copy was running.
1. Update the path in Octopus config.
1. Start the server.


## Move Artifacts Folder {#MovingOctopusServerfolders-ArtifactsMoveartifactsfolder}

A PowerShell script showing the steps is set out below. You need to change the variables to match your Octopus installation, and you may wish to run each step separately to deal with any issues like locked files.

```powershell
$oldArtifacts = "C:\Octopus\Artifacts"
$newArtifacts = "C:\YourNewHomeDir\Artifacts"
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"

& "$octopus" service --stop
mv $oldArtifacts $newArtifacts

& "$octopus" path --artifacts="$newArtifacts"
& "$octopus" service --start
```

## Move Task Logs Folder {#MovingOctopusServerfolders-TaskLogsMovetasklogsfolder}

A PowerShell script showing the steps is set out below. You need to change the variables to match your Octopus installation, and you may wish to run each step separately to deal with any issues like locked files.

```powershell
$oldTaskLogs = "C:\Octopus\TaskLogs"
$newTaskLogs = "C:\YourNewHomeDir\TaskLogs"
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"

& "$octopus" service --stop
mv $oldTaskLogs $newTaskLogs

& "$octopus" path --taskLogs="$newTaskLogs"
& "$octopus" service --start
```
