
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

# You also want to update the path to your artifacts, logs and internal nuget repository when moving your home directory
# The following path updates only update the paths, if you want to keep your existing artifacts and logs make sure you copy them to the new location 
$nugetPath = $newHome + "\Packages"
$artifactPath = $newHome + "\Artifacts"
$taskLogs = $newHome + "\TaskLogs"
& "$octopus" path --nugetRepository="$nugetPath"
& "$octopus" path --artifacts="$artifactPath"
& "$octopus" path --taskLogs="$taskLogs"

& "$octopus" service --start
```
