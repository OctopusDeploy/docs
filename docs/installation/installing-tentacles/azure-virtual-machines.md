---
title: Azure Virtual Machines
position: 4
---

:::problem
**Azure VM Extension temporarily unavailable**
The Octopus Tentacle VM extension is temporarily unavailable. We are working with Microsoft to rectify this and you can watch [this GitHub Issue](https://github.com/OctopusDeploy/Issues/issues/2859) to be notified of progress.
:::

If you deploy software to virtual machines hosted in Microsoft Azure, Octopus Deploy makes it easy to install the [Tentacle agent](/docs/installation/installing-tentacles/index.md). This page will explain how to install the Tentacle agent extension for Azure VM's, as well as how to install the extension via command line, and how to diagnose problems when using the extension.

## Overview {#AzureVirtualMachines-Overview}

The Azure Tentacle VM extension is an extension that can be added to an Azure virtual machine. Currently, only Windows Server 2012 R2 is supported.

When enabled, the extension automatically downloads the Tentacle MSI, installs it, and registers the agent with your [Octopus Deploy server](/docs/installation/installing-octopus/index.md). It does this by building on top of the PowerShell DSC support in Windows Azure. The [Octopus DSC resources](https://github.com/OctopusDeploy/OctopusDSC) used by the extension are open source, and the commands the extension runs are very similar to the commands in our guide to [automatically installing the Tentacle agent](/docs/installation/installing-tentacles/automating-tentacle-installation.md).

:::success
**Listening agents only**
The Tentacle will be configured in [listening mode](/docs/installation/installing-tentacles/listening-tentacles.md) **only**. This means that the agent will listen on a TCP port, and the Octopus server will connect to the agent on that port. After installing the agent, you'll need to add an endpoint to your virtual machine to enable traffic on this port. For details on how to do this, please see below.
:::

## Adding the Tentacle agent extension {#AzureVirtualMachines-AddingtheTentacleagentextension}

After creating a virtual machine on Azure using the management portal, browse to the virtual machine, then click on **Extensions**:

![](/docs/images/3048116/3277917.png "width=500")

Click **Add** to add a new extension.

![](/docs/images/3048116/3277916.png "width=500")

Select the **Octopus Deploy Tentacle Agent** extension, and click **Create**.

![](/docs/images/3048116/3277915.png "width=500")

The settings for the extension are:

Octopus Server URL
:   URL to your Octopus Deploy server. You'll need your own Octopus server (possibly also running on Azure), and you should [consider using HTTPS](/docs/how-to/expose-the-octopus-web-portal-over-https.md). The extension will use the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md) against this URL to register the machine.

API Key
:   [Your API key](/docs/how-to/how-to-create-an-api-key.md). This key will only be used when registering the machine with the Octopus server; it isn't used for [subsequent communication](/docs/reference/octopus-tentacle-communication/index.md).

Environments
:   The name of the [environment](/docs/key-concepts/environments/index.md) to add the machine to. You can specify more than one by using commas; for example: `UAT1,UAT2`

Roles
:   The roles to give to the machine. Again, separate them using commas for more than one, for example: `web-server,app-server`

Listen port
:   TCP port that the Tentacle will listen on. The default value is 10933.

After entering the extension settings, click Create, and the extension will be enabled.

:::problem
**Reboot may be required**
The extension relies on a PowerShell DSC module, which in turn depends on some Windows updates. The machine may reboot during the installation.
:::

After a few minutes, the machine should appear in the environments tab of your Octopus Deploy server. If it doesn't, read the **Diagnosing issues** section below.

## Adding the endpoint {#AzureVirtualMachines-Addingtheendpoint}

When you first add the extension, the machine may appear in the environments tab, but it will be offline:

![](/docs/images/3048116/3277910.png "width=500")

This is because the Octopus server is now trying to connect to the VM using the listen port that you configured. When the extension is enabled, it automatically adds a firewall rule to allow incoming traffic on that port. However, an Endpoint also needs to be registered in the VM configuration on Azure to allow this traffic.

To add the endpoint, browse to the VM in the Azure portal, then click **Endpoints**, then **Add**, and enter the endpoint details.

![](/docs/images/3048116/3277913.png "width=500")

## Command line {#AzureVirtualMachines-Commandline}

*The extension and endpoint can also be added using the Azure PowerShell cmdlets:*

### Azure Service Management way {#AzureVirtualMachines-AzureServiceManagementway}

```powershell
$vm = Get-AzureVM -Name "OctoVM44" -ServiceName "OctoVM44"

$publicConfiguration = ConvertTo-Json -Depth 8 @{
    SasToken               = ""
    ModulesUrl             = "https://octopusdsc.blob.core.windows.net/octopus-azure/Octopus.zip"
    ConfigurationFunction  = "Octopus.ps1\OctopusAzureConfig"
    Properties             = @{
        ApiKey = "API-ABC123DEF456789ABC123DEF"
        OctopusServerUrl = "https://demo.octopusdeploy.com/"
        Environments = "Production"
        Roles = "web-server"
        ListenPort = 10933
    }
}

$vm = Set-AzureVMExtension `
    -VM $vm `
    -Publisher Microsoft.Powershell `
    -ExtensionName DSC `
    -Version 1.3 `
    -Verbose `
    -PublicConfiguration $publicConfiguration `
$vm | Add-AzureEndpoint -Name "TentacleIn" -Protocol "tcp" -PublicPort 10933 -LocalPort 10933
$vm | Update-AzureVM
```

### Azure Resource Manager way {#AzureVirtualMachines-AzureResourceManagerway}

```powershell
$resourceGroupName = "octovm42-resources"
$vmName = "octovm42"
$extensionName = "OctopusTentacle"
$location = "Australia Southeast"

$vmAccessAgent = Get-AzureVMAvailableExtension | ? { $_.Publisher -eq "Microsoft.Compute" -and $_.ExtensionName -eq "VMAccessAgent" }
Set-AzureRmVMExtension `
    -ResourceGroupName $resourceGroupName `
    -VMName $vmName `
    -Name $vmAccessAgent.ExtensionName `
    -Publisher $vmAccessAgent.Publisher `
    -TypeHandlerVersion $vmAccessAgent.Version `
    -ExtensionType $vmAccessAgent.ExtensionName `
    -Location $location

$settings = @{
    ModulesUrl = "https://octopusdsc.blob.core.windows.net/octopus-azure/Octopus.zip";
    SasToken = "";
    ConfigurationFunction = "Octopus.ps1\OctopusAzureConfig";
    Properties = @{
        OctopusServerUrl = "https://demo.octopusdeploy.com";
        ApiKey = "API-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Environments = "Production";
        Roles = "web-server";
        ListenPort = 10933;
    }
}

$dsc = Get-AzureVMAvailableExtension | ? { $_.Publisher -eq "Microsoft.Powershell" -and $_.ExtensionName -eq "DSC" }
Set-AzureRmVMExtension `
    -ResourceGroupName $resourceGroupName `
    -VMName $vmName `
    -Name $extensionName `
    -Publisher $dsc.Publisher `
    -ExtensionType $dsc.ExtensionName `
    -TypeHandlerVersion $dsc.Version `
    -Settings $settings `
    -Location $location `
    -Verbose

$vm = Get-AzureRmVm -Name $vmName -ResourceGroupName $resourceGroupName
$nic = Get-AzureRmNetworkInterface -ResourceGroupName $resourceGroupName | ? { $_.VirtualMachine.Id -eq $vm.Id -and $_.Primary }
$secGrp = Get-AzureRmNetworkSecurityGroup -ResourceGroupName $resourceGroupName | ? { $_.Id -eq $nic.NetworkSecurityGroup.Id } 
$secGrp | Add-AzureRmNetworkSecurityRuleConfig `
    -Name "AllowTentacleInBound" `
    -Description "Allow inbound traffic to Tentacle" `
    -Protocol TCP `
    -SourcePortRange "*" `
    -SourceAddressPrefix "*" `
    -DestinationPortRange 10933 `
    -DestinationAddressPrefix "*" `
    -Access Allow `
    -Priority 999 `
    -Direction Inbound
$secGrp | Set-AzureRmNetworkSecurityGroup
```

## Diagnosing issues {#AzureVirtualMachines-Diagnosingissues}

If, for some reason, the machine fails to register after 20 minutes, you can access logs on the VM to determine what went wrong.

1. Use the **connect** button on the VM to set up a remote desktop connection.

   ![](/docs/images/3048116/3277912.png "width=500")
   
   For more information, see [How to Log on to a Virtual Machine](http://azure.microsoft.com/en-us/documentation/articles/virtual-machines-log-on-windows-server/).
   
2. In the remote desktop session, open Windows Explorer, and browse to `C:\WindowsAzure\Logs\Plugins\Microsoft.Powershell.DSC\1.3.0.0`

3. In this folder, you'll find a number of text files. Open these to view the output of the commands, and look for any error messages. 

   ![](/docs/images/3048116/3277911.png "width=500")

The `DscExtensionHandler*` file is usually the best place to look. If there are no error messages or you are unable to troubleshoot the problem, please send a copy of these log files and a description of how the VM was configured to [our support team](http://octopusdeploy.com/support), and we'll be happy to help!
