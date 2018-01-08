
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
