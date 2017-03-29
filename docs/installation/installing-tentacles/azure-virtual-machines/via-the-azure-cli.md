---
title: Installing the Tentacle VM Extension via the Azure CLI
description: How to install the Tentacle VM Extension using the Azure Command Line Interface (CLI)
position: 4
---

:::hint
The Azure VM Extension is currently in preview.
:::

The VM Extension can be installed onto a virtual machine via the [Azure command line](https://docs.microsoft.com/en-us/azure/xplat-cli-install). The instructions are slightly different depending on whether you are using the the [Resource](#AzureResourceManagerMode) model or the [Classic](#AzureServiceManagementMode) model.

Refer to the [configuration structure](configuration-structure.md) for information regarding the format of the `publicSettings.json` and `privateSettings.json` files mentioned in these examples.

:::hint
If you need more the ability to customize more of the installation, you might want to consider using the [Azure Desired State Configuration (DSC) extension](https://docs.microsoft.com/en-us/azure/virtual-machines/virtual-machines-windows-extensions-dsc-overview) in conjunction with the [OctopusDSC](https://www.powershellgallery.com/packages/OctopusDSC) resource.
:::

## Azure Resource Manager (ARM) mode {#AzureResourceManagerMode}

To install the extension on a VM:

```sh
$ azure config mode arm
info:    Executing command config mode
info:    New mode is arm
info:    config mode command OK

$ azure vm extension set --resource-group "<resource-group-name>" --vm-name "<vm-name>" --name "OctopusDeployWindowsTentacle" --publisher-name "OctopusDeploy.Tentacle" --version "2.0" --public-config-path "publicSettings.json" --private-config-path "privateSettings.json"
info:    Executing command vm extension set
info:    Looking up the VM "<vm-name>"
info:    Installing extension "OctopusDeployWindowsTentacle", VM: "<vm-name>"
info:    vm extension set command OK
```

To find out what extension versions are available:

```sh
$ azure vm extension-image list --publisher "OctopusDeploy.Tentacle" --location "<azure-region>"
info:    Executing command vm extension list
+ Getting virtual machine extension image types (Publisher: "OctopusDeploy.Tentacle" Location:"<azure-region>")
Publisher               Type                          Version  Location
----------------------  ----------------------------  -------  -------------
OctopusDeploy.Tentacle  OctopusDeployWindowsTentacle  2.0.49   australiaeast
OctopusDeploy.Tentacle  OctopusDeployWindowsTentacle  2.0.50   australiaeast
OctopusDeploy.Tentacle  OctopusDeployWindowsTentacle  2.0.54   australiaeast
...
```

To find out what extensions are installed on a VM:

```sh
$ azure vm extension get --resource-group "<resource-group-name>" --vm-name" <vm-name>"
+ Looking up the VM "<vm-name>"
data:    Publisher          Name                        Version  State
data:    -----------------  --------------------------  -------  --------
data:    Microsoft.Compute  WinRMCustomScriptExtension  1.4      Creating
info:    vm extension get command OK
```

To remove an extension from a VM:

```sh
$ azure vm extension set --uninstall --quiet --resource-group "<resource-group-name>" --vm-name "<vm-name>" --name "OctopusDeployWindowsTentacle" --publisher-name "OctopusDeploy.Tentacle" --version "2.0"
Executing command vm extension set
Looking up the VM "<vm-name>"
Looking up extension "OctopusDeployWindowsTentacle", VM: "<vm-name>"
Uninstalling extension "OctopusDeployWindowsTentacle", VM: "<vm-name>"
vm extension set command OK
```

## Azure Service Management (ASM/Classic) mode {#AzureServiceManagementMode}

To install the extension on a VM:

```sh
$ azure config mode asm
info:    Executing command config mode
info:    New mode is asm
info:    config mode command OK

$ azure vm extension set "<vm-name>" "OctopusDeployWindowsTentacle" "OctopusDeploy.Tentacle" "2.0" --public-config-path "publicSettings.json" --private-config-path "privateSettings.json"
info:    Executing command vm extension set
info:    Getting virtual machines
info:    Updating vm extension
info:    vm extension set command OK
```

To find out what extension versions are available:

```sh
$ azure vm extension list --publisher-name "OctopusDeploy.Tentacle"
info:    Executing command vm extension list
+ Getting extensions
data:    Publisher                       : OctopusDeploy.Tentacle
data:    Name                            : OctopusDeployWindowsTentacle
data:    Version                         : 2.0
data:    Label                           : Octopus Deploy Tentacle
...
```

To find out what extensions are installed on a VM:

```sh
$ azure vm extension get "<vm-name>"
info:    Executing command vm extension get
+ Getting virtual machines
data:    Publisher             Extension name   ReferenceName              Version  State
data:    --------------------  ---------------  -------------------------  -------  ------
data:    OctopusDeploy.Ten...  OctopusDeplo...  OctopusDeployWindowsTe...  2.0      Enable
info:    vm extension get command OK
```

To remove an extension from a VM:

```sh
$ azure vm extension set --uninstall "<vm-name>" "OctopusDeployWindowsTentacle" "OctopusDeploy.Tentacle" "2.0"
info:    Executing command vm extension set
info:    Getting virtual machines
info:    Uninstalling vm extension
info:    vm extension set command OK
```