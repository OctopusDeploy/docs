---
title: Moving Octopus Server folders
position: 0
---


If you need to move any of the folders used by the Octopus Server you can follow the instructions on this page to move individual folders and reconfigure the Octopus Server to use the new folder locations.

- [Move the Octopus Home folder](/docs/home/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md)
- [Move the Octopus NuGet Repository folder](/docs/home/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md)
- [Move the Octopus artifacts folder](/docs/home/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md)
- [Move the Octopus task logs folder](/docs/home/administration/server-configuration-and-file-storage/moving-octopus-server-folders.md)


## Move Octopus Home folder


If you need to move the Octopus Home folder, you can do that using the command-line as described below:

**Usage**

```powershell
Usage: Octopus.Server configure [<options>]
```


Where `[&lt;options&gt;]` is:

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

## Move other Octopus Server folders


If you need to move other folders than the Octopus Home folder, you can do that using the command-line as described below

**Usage**

```powershell
Octopus.Server path [<options>]
```


Where `[&lt;options&gt;]` is any of:

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

## Move NuGet repository folder


A PowerShell script showing the steps is set out below. You need to change the variables to match your Octopus installation, and you may wish to run each step separately to deal with any issues like locked files.

```powershell
$oldNuGetRepository = "C:\Octopus\Packages"
$newNuGetRepository = "C:\YourNewHomeDir\Packages"
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"

& "$octopus" service --stop
mv $oldNuGetRepository $newNuGetRepository
  
& "$octopus" path --nugetRepository="$newNuGetRepository"
& "$octopus" service --start
```

## Move artifacts folder


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

## Move task logs folder


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
