---
title: Diagnosing Tentacle VM Extension Issues
description: How to diagnose and resolve installation issues with the Tentacle VM Extension
position: 7
---

## Diagnosing issues {#AzureVirtualMachines-Diagnosingissues}

If, for some reason, the machine fails to register after 20 minutes, you can access logs on the VM to determine what went wrong.

1. Use the **connect** button on the VM to set up a remote desktop connection.

   ![](/docs/images/3048116/3277912.png "width=500")

   For more information, see [How to Log on to a Virtual Machine](http://azure.microsoft.com/en-us/documentation/articles/virtual-machines-log-on-windows-server/).

2. In the remote desktop session, open Windows Explorer, and browse to `C:\WindowsAzure\Logs\Plugins\OctopusDeploy.Tentacle.OctopusDeployWindowsTentacle\` and into the versioned folder below that.

3. In this folder, you'll find a number of text files. Open these to view the output of the commands, and look for any error messages. 

   ![](/docs/images/3048116/3277911.png "width=500")

The `OctopusAzureVmExtension*` file is usually the best place to look. If there are no error messages or you are unable to troubleshoot the problem, please send a copy of these log files, a copy of the files from `C:\Packages\Plugins\OctopusDeploy.Tentacle.OctopusDeployWindowsTentacle` and a description of how the VM was configured to [our support team](http://octopusdeploy.com/support), and we'll be happy to help!
