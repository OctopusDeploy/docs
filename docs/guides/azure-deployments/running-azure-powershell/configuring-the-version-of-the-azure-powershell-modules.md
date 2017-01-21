---
title: Configuring the version of the Azure PowerShell modules

---


A version of Azure PowerShell is bundled with Octopus Deploy.  To determine the versions of the various Azure modules, add the PowerShell below to an Azure PowerShell Script Step:

**Azure Module Versions**

```powershell
Get-Module -ListAvailable -Name Azure*
```





If you wish to use a different version, you can install the Azure PowerShell modules on your Octopus server, and configure Octopus to use the installed version.  The procedure to configure this differs depending on which version of Octopus Deploy you are using:

### Octopus 3.3 (or newer)


We made this configurable by variables in Octopus 3.3 to be more flexible. Create a [variable](/docs/deploying-applications/variables/index.md) named **Octopus.Action.Azure.UseBundledAzurePowerShellModules** and set it's value to **False**.


With this value set, Octopus Deploy will not load the bundled Azure PowerShell modules, and PowerShell will automatically load the Azure modules installed on the Octopus Server.

### Octopus 3.2 (or older)


Below is an example of a PowerShell script to configure the version of the Azure PowerShell modules:

```powershell
$octopus = "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"
$azurePowerShell = "C:\Program Files (x86)\Microsoft SDKs\Azure\PowerShell\ServiceManagement\Azure\Azure.psd1"
& "$octopus" service --stop
& "$octopus" configure --azurePowerShellModule "$azurePowerShell"
& "$octopus" service --start

```


Now Octopus will attempt to load these modules when executing an Azure step, rather than the version bundled with Octopus.
