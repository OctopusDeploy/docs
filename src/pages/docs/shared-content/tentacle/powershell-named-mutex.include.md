If you need even more finely grained control to a shared resource, we recommend using a [named mutex](https://docs.microsoft.com/en-us/dotnet/api/system.threading.mutex?view=net-5.0) around the process. To learn more about how you can create a named mutex around a process using PowerShell, see this [log file example](https://learn-powershell.net/2014/09/30/using-mutexes-to-write-data-to-the-same-logfile-across-processes-with-powershell/).

:::success
You can see how Octopus uses this technique with the built-in IIS step in the [open-source Calamari library](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari/Scripts/Octopus.Features.IISWebSite_BeforePostDeploy.ps1#L144).
:::
