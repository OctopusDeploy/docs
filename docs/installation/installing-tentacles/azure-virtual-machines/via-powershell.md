---
title: Installing the Tentacle VM Extension via Poweshell
description: How to install the Tentacle VM Extension using the Powershell
position: 3
---

The Azure VM Extension can be added to your virtual machine using the Azure PowerShell cmdlets.

Refer to the [configuration structure](configuration-structure.md) for information regarding the format of the `publicSettings.json` and `privateSettings.json` files mentioned in these examples.

## Azure Service Management (ASM) mode {#AzureVirtualMachines-AzureServiceManagement}

To install the extension on a VM:

```powershell
$vm = Get-AzureVm -Name "<vm-name>" -servicename "<cloud-service-name>"

$publicSettings = "{`"OctopusServerUrl`": `"https://octopus.example.com`", `"Environments`": [ `"Env1`", `"Env2`" ], `"Roles`": [ `"app-server`", `"web-server`" ], `"CommunicationMode`": `"Listen`", `"Port`": 10933 }"
$privateSettings = "{`"ApiKey`": `"MY SECRET API KEY`"}"

$publicSettings | Out-File "publicsettings.config"
$privateSettings | Out-File "privatesettings.config"

Write-Host "Setting extension"
Set-AzureVmExtension `
    -ExtensionName "OctopusDeployWindowsTentacle" `
    -Publisher "OctopusDeploy.Tentacle" `
    -Version "2.0" `
    -PublicConfigPath "publicsettings.config" `
    -PrivateConfigPath "privatesettings.config" `
    -VM $vm | Update-AzureVM

Write-Host "Adding endpoint to allow network traffic from the server to the Tentacle"
# optionally add an endpoint to allow the Octopus Server to contact the Tentacle
# not required if this is a polling Tentacle

Add-AzureEndpoint -Name "OctopusTentacle" `
    -Protocol "tcp" `
    -PublicPort 10933 `
    -LocalPort 10933 `
    -VM $vm | Update-AzureVM
```

To find out what extensions are installed on a VM:

```powershell
$vm = Get-AzureVm -Name "<vm-name>" -servicename "<cloud-service-name>"
Get-AzureVMExtension -VM $vm
```

To remove an extension from a VM:

```powershell
$vm = Get-AzureVm -Name "<vm-name>" -servicename "<cloud-service-name>"
Remove-AzureVMExtension -VM $vm -ExtensionName "OctopusDeployWindowsTentacle" -Publisher "OctopusDeploy.Tentacle"
```

## Azure Resource Manager (ARM) mode {#AzureVirtualMachines-AzureResourceManager}

To install the extension on a VM:

```powershell
$publicSettings = @{
  OctopusServerUrl = "https://octopus.example.com";
  Environments = @("Env1", "Env2");
  Roles = @("app-server", "web-server");
  CommunicationMode = "Listen";
  Port = 10933
}

$privateSettings = @{"ApiKey" = "<MY SECRET API KEY>"}

Set-AzureRmVMExtension -ResourceGroupName "<resource-group-name>" `
    -Location "Australia East" `
    -VMName "<vm-name>" `
    -Name "OctopusDeployWindowsTentacle" `
    -Publisher "OctopusDeploy.Tentacle" `
    -TypeHandlerVersion "2.0" `
    -Settings $publicSettings `
    -ProtectedSettings $privateSettings `
    -ExtensionType "OctopusDeployWindowsTentacle"

# optional - add an NSG rule to allow the Octopus Server to contact the Tentacle
# only required in Listening mode
$vm = Get-AzureRmVm -Name "<vm-name>" -ResourceGroupName "<resource-group-name>"
$nic = Get-AzureRmNetworkInterface -ResourceGroupName "<resource-group-name>" | ? { $_.VirtualMachine.Id -eq $vm.Id -and $_.Primary }
$secGrp = Get-AzureRmNetworkSecurityGroup -ResourceGroupName "<resource-group-name>" | ? { $_.Id -eq $nic.NetworkSecurityGroup.Id }
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

To find out what extensions are installed on a VM:

```powershell
Get-AzureRmVMExtension -ResourceGroupName "<resource-group-name>" `
    -VMName "<vm-name>" `
    -Name "OctopusDeployWindowsTentacle"
```

To remove an extension from a VM:

```powershell
Remove-AzureRmVMExtension -ResourceGroupName "<resource-group-name>" `
    -VMName "<vm-name>" `
    -Name "OctopusDeployWindowsTentacle"
```
