---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Diagnosing Tentacle VM extension issues
description: How to diagnose and resolve installation issues with the Tentacle VM Extension
navOrder: 8
---

!include <azure-vm-extension-deprecated>

## Diagnosing Issues {#AzureVirtualMachines-Diagnosingissues}

If, for some reason, the machine fails to register after 20 minutes, you can access logs on the VM to determine what went wrong.

1. Use the **connect** button on the VM to set up a remote desktop connection.

   ![Connecting to a VM via RDP](/docs/infrastructure/deployment-targets/tentacle/windows/azure-virtual-machines/diagnosing-issues-connect-via-rdp.png "width=500")

   For more information, see [How to Log on to a Virtual Machine](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/connect-logon).

2. In the remote desktop session, open Windows Explorer, and browse to `C:\WindowsAzure\Logs\Plugins\OctopusDeploy.Tentacle.OctopusDeployWindowsTentacle\` and into the versioned folder below that.

3. In this folder, you'll find a number of text files. Open these to view the output of the commands, and look for any error messages.

   ![Windows Explorer - logs folder](/docs/infrastructure/deployment-targets/tentacle/windows/azure-virtual-machines/diagnosing-issues-logs-folder.png "width=500")

The `OctopusAzureVmExtension*` file is usually the best place to look. If there are no error messages or you are unable to troubleshoot the problem, please send a copy of these log files, a copy of the files from `C:\Packages\Plugins\OctopusDeploy.Tentacle.OctopusDeployWindowsTentacle` and a description of how the VM was configured to [our support team](http://octopus.com/support), and we'll be happy to help!
