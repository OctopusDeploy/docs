---
title: Diagnosing Tentacle VM Extension Issues
description: How to diagnose and resolve installation issues with the Tentacle VM Extension
position: 8
---

## Diagnosing Issues {#AzureVirtualMachines-Diagnosingissues}

If, for some reason, the machine fails to register after 20 minutes, you can access logs on the VM to determine what went wrong.

1. Use the **connect** button on the VM to set up a remote desktop connection.

   ![Connecting to a VM via RDP](diagnosing-issues-connect-via-rdp.png)

   For more information, see [How to Log on to a Virtual Machine](http://azure.microsoft.com/en-us/documentation/articles/virtual-machines-log-on-windows-server/).

2. In the remote desktop session, open Windows Explorer, and browse to `C:\WindowsAzure\Logs\Plugins\OctopusDeploy.Tentacle.OctopusDeployWindowsTentacle\` and into the versioned folder below that.

3. In this folder, you'll find a number of text files. Open these to view the output of the commands, and look for any error messages.

   ![Windows Explorer - logs folder](diagnosing-issues-logs-folder.png)

The `OctopusAzureVmExtension*` file is usually the best place to look. If there are no error messages or you are unable to troubleshoot the problem, please send a copy of these log files, a copy of the files from `C:\Packages\Plugins\OctopusDeploy.Tentacle.OctopusDeployWindowsTentacle` and a description of how the VM was configured to [our support team](http://octopus.com/support), and we'll be happy to help!
