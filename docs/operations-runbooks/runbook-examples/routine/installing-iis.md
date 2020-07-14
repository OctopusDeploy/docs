---
title: Installing IIS
description: With Octopus Deploy you can install IIS with a Runbook as part of a routine operatons task.
position: 10
---

For many organisations, [IIS](https://docs.microsoft.com/en-us/iis/get-started/introduction-to-iis/iis-web-server-overview) remains an essential piece of software for running their web-applications. With Operation Runbooks, you can create a runbook as part of a routine operations task to install IIS and any additional IIS features you need on your [deployment targets](/docs/octopus-concepts/deployment-targets.md).

To create a runbook to install IIS:

1. From your project's overview page, navigate to Operations ➜ Runbooks, click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the target role on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```ps
if ((Get-WindowsFeature Web-Server).InstallState -eq "Installed") {
    Write-Host "IIS is installed"
} 
else {
    Write-Host "IIS is not installed and proceeding with Install"
    
    Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole
    Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServer
}
```

The script checks to see if IIS is already installed by inspecting the `InstallState` for the `Web-Server` feature. If it’s installed it will skip the install of IIS.

:::hint
**Tips:**

1. It’s possible you may need to set the [Execution policy](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy) to an appropriate value (as part of the script) in order for it to run successfully. 

2. To list all available Windows features, run the following PowerShell:
```ps
Get-WindowsOptionalFeature -Online
```

3. There are over 25 additional IIS features you could choose to install as part of your Runbook. To list all of the IIS Windows features, run the following PowerShell:
```ps
Get-WindowsOptionalFeature -Online | where FeatureName -like 'IIS-*'
```

You can then install any additional features using the [Enable-WindowsOptionalFeature](https://docs.microsoft.com/en-us/powershell/module/dism/enable-windowsoptionalfeature?view=win10-ps) PowerShell cmdlet as highlighted in the script above.
:::

## Samples

We have a [Target - Windows](https://g.octopushq.com/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more Runbooks.

## Learn more

- Generate an Octopus guide for [IIS and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=IIS).
- [PowerShell and IIS: 20 practical examples blog post](https://octopus.com/blog/iis-powershell)