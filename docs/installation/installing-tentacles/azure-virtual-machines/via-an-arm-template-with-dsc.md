---
title: Installing the Tentacle via DSC in an ARM Template
description: How to install the Tentacle using Desired State configuration (DSC) in Azure Resource Manager (ARM) Template
position: 6
---

While the [Azure VM Extension](index.md) is the recommended approach to installing the Tentacle, it does not expose all possible configuration options and permutations. If you need more power and configurability, you can use [Desired State Configuration](https://msdn.microsoft.com/en-us/powershell/dsc/overview) (DSC).

The following example shows how to install a Tentacle during VM provisioning.

1. Download the latest release of the OctopusDSC from the [OctopusDSC repo](https://github.com/OctopusDeploy/OctopusDSC/releases) and extract it into a new folder
2. Create a configuration file (eg `OctopusTentacle.ps1`) next to the `OctopusDSC` folder:

```powershell
configuration OctopusTentacle
{
    param ($ApiKey, $OctopusServerUrl, $Environments, $Roles, $ServerPort)

    Import-DscResource -Module OctopusDSC

    Node "localhost"
    {
        cTentacleAgent OctopusTentacle
        {
            Ensure = "Present"
            State = "Started"

            # Tentacle instance name. Leave it as 'Tentacle' unless you have more
            # than one instance
            Name = "Tentacle"

            # Registration - all parameters required
            ApiKey = $ApiKey
            OctopusServerUrl = $OctopusServerUrl
            Environments = $Environments
            Roles = $Roles

            # How Tentacle will communicate with the server
            CommunicationMode = "Poll"
            ServerPort = $ServerPort

            # Where deployed applications will be installed by Octopus
            DefaultApplicationDirectory = "C:\Applications"

            # Where Octopus should store its working files, logs, packages etc
            TentacleHomeDirectory = "C:\Octopus"
        }
    }
}
```

3. Create a new zip file containing both the `OctopusDSC` folder and the `OctopusTentacle.ps1` file.
4. Upload the zip file to a location accessible during VM provisioning. You can either use a public location, or a private location protected with a [SAS token](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-shared-access-signature-part-1).
5. Create an ARM template (eg `arm-template.json`) that creates your virtual machine as normal. eg:

```json
{
  "$schema": "http://schema.management.azure.com/schemas/2014-04-01-preview/deploymentTemplate.json",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "vmAdminUsername": {
      "type": "string",
      "metadata": {
        "description": "Admin username for the Virtual Machine."
      }
    },
    "vmAdminPassword": {
      "type": "securestring",
      "metadata": {
        "description": "Admin password for the Virtual Machine."
      }
    },
    "vmDnsName": {
      "type": "string",
      "metadata": {
        "description": "Unique DNS Name for the Public IP used to access the Virtual Machine."
      }
    },
    "vmSize": {
      "defaultValue": "Standard_D2_v2",
      "type": "string",
      "metadata": {
        "description": "Size of the Virtual Machine"
      }
    },
    "tentacleOctopusServerUrl": {
      "type": "string",
      "metadata": {
        "description": "The URL of the octopus server with which to register"
      }
    },
    "tentacleApiKey": {
      "type": "securestring",
      "metadata": {
        "description": "The Api Key to use to register the Tentacle with the server"
      }
    },
    "tentacleCommunicationMode": {
      "defaultValue": "Listen",
      "allowedValues": [
        "Listen",
        "Poll"
      ],
      "type": "string",
      "metadata": {
        "description": "The type of Tentacle - whether the Tentacle listens for requests from server, or actively polls the server for requests"
      }
    },
    "tentaclePort": {
      "defaultValue": 10933,
      "minValue": 0,
      "maxValue": 65535,
      "type": "int",
      "metadata": {
        "description": "The port on which the Tentacle should listen, when CommunicationMode is set to Listen, or the port on which to poll the server, when CommunicationMode is set to Poll. By default, Tentacle's listen on 10933 and poll the Octopus Server on 10943."
      }
    },
    "tentacleRoles": {
      "type": "string",
      "metadata": {
        "description": "A comma delimited list of roles to apply to the Tentacle"
      }
    },
    "tentacleEnvironments": {
      "type": "string",
      "metadata": {
        "description": "A comma delimited list of environments in which the Tentacle should be placed"
      }
    },
    "tentaclePublicHostNameConfiguration": {
      "defaultValue": "PublicIP",
      "allowedValues": [
        "PublicIP",
        "FQDN",
        "ComputerName",
        "Custom"
      ],
      "type": "string",
      "metadata": {
        "description": "How the Octopus Server should contact the Tentacle. Only required when CommunicationMode is 'Listen'."
      }
    },
    "tentacleCustomPublicHostName": {
      "type": "string",
      "defaultValue": "",
      "metadata": {
        "description": "The custom public host name that the Octopus Server should use to contact the Tentacle. Only required when communicationMode is 'Listen' and publicHostNameConfiguration is 'Custom'."
      }
    }
  },
  "variables": {
    "namespace": "octopus",
    "location": "[resourceGroup().location]",
    "tags": {
      "vendor": "Octopus Deploy",
      "description": "Example deployment of Octopus Tentacle to a Windows Server."
    },
    "diagnostics": {
      "storageAccount": {
        "name": "[concat('diagnostics', uniquestring(resourceGroup().id))]"
      }
    },
    "networkSecurityGroupName": "[concat(variables('namespace'), '-nsg')]",
    "publicIPAddressName": "[concat(variables('namespace'), '-publicip')]",
    "vnet": {
      "name": "[concat(variables('namespace'), '-vnet')]",
      "addressPrefix": "10.0.0.0/16",
      "subnet": {
        "name": "[concat(variables('namespace'), '-subnet')]",
        "addressPrefix": "10.0.0.0/24"
      }
    },
    "nic": {
      "name": "[concat(variables('namespace'), '-nic')]",
      "ipConfigName": "[concat(variables('namespace'), '-ipconfig')]"
    },
    "vmName": "[concat(variables('namespace'),'-vm')]"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2016-01-01",
      "name": "[variables('diagnostics').storageAccount.name]",
      "location": "[variables('location')]",
      "tags": {
        "vendor": "[variables('tags').vendor]",
        "description": "[variables('tags').description]"
      },
      "kind": "Storage",
      "sku": {
        "name": "Standard_LRS"
      },
      "properties": {}
    },
    {
      "type": "Microsoft.Network/networkSecurityGroups",
      "apiVersion": "2016-03-30",
      "name": "[variables('networkSecurityGroupName')]",
      "location": "[variables('location')]",
      "tags": {
        "vendor": "[variables('tags').vendor]",
        "description": "[variables('tags').description]"
      },
      "properties": {
        "securityRules": [
          {
            "name": "allow_rdp",
            "properties": {
              "description": "Allow inbound RDP",
              "protocol": "Tcp",
              "sourcePortRange": "*",
              "destinationPortRange": "3389",
              "sourceAddressPrefix": "*",
              "destinationAddressPrefix": "*",
              "access": "Allow",
              "priority": 123,
              "direction": "Inbound"
            }
          }
        ]
      }
    },
    {
      "type": "Microsoft.Network/publicIPAddresses",
      "name": "[variables('publicIPAddressName')]",
      "apiVersion": "2016-03-30",
      "location": "[variables('location')]",
      "tags": {
        "vendor": "[variables('tags').vendor]",
        "description": "[variables('tags').description]"
      },
      "properties": {
        "publicIPAllocationMethod": "Dynamic",
        "dnsSettings": {
          "domainNameLabel": "[parameters('vmDnsName')]"
        }
      }
    },
    {
      "type": "Microsoft.Network/virtualNetworks",
      "name": "[variables('vnet').name]",
      "apiVersion": "2016-03-30",
      "location": "[variables('location')]",
      "tags": {
        "vendor": "[variables('tags').vendor]",
        "description": "[variables('tags').description]"
      },
      "dependsOn": [
        "[concat('Microsoft.Network/networkSecurityGroups/', variables('networkSecurityGroupName'))]"
      ],
      "properties": {
        "addressSpace": {
          "addressPrefixes": [
            "[variables('vnet').addressPrefix]"
          ]
        },
        "subnets": [
          {
            "name": "[variables('vnet').subnet.name]",
            "properties": {
              "addressPrefix": "[variables('vnet').subnet.addressPrefix]",
              "networkSecurityGroup": {
                "id": "[resourceId('Microsoft.Network/networkSecurityGroups', variables('networkSecurityGroupName'))]"
              }
            }
          }
        ]
      }
    },
    {
      "type": "Microsoft.Network/networkInterfaces",
      "name": "[variables('nic').name]",
      "apiVersion": "2016-03-30",
      "location": "[variables('location')]",
      "tags": {
        "vendor": "[variables('tags').vendor]",
        "description": "[variables('tags').description]"
      },
      "dependsOn": [
        "[concat('Microsoft.Network/virtualNetworks/', variables('vnet').name)]",
        "[concat('Microsoft.Network/publicIPAddresses/', variables('publicIPAddressName'))]",
        "[concat('Microsoft.Network/networkSecurityGroups/', variables('networkSecurityGroupName'))]"
      ],
      "properties": {
        "ipConfigurations": [
          {
            "name": "[variables('nic').ipConfigName]",
            "properties": {
              "privateIPAllocationMethod": "Dynamic",
              "publicIPAddress": {
                "id": "[resourceId('Microsoft.Network/publicIPAddresses', variables('publicIPAddressName'))]"
              },
              "subnet": {
                "id": "[concat(resourceId('Microsoft.Network/virtualNetworks', variables('vnet').name), '/subnets/', variables('vnet').subnet.name)]"
              }
            }
          }
        ]
      }
    },
    {
      "type": "Microsoft.Compute/virtualMachines",
      "name": "[variables('vmName')]",
      "apiVersion": "2016-04-30-preview",
      "location": "[variables('location')]",
      "tags": {
        "vendor": "[variables('tags').vendor]",
        "description": "[variables('tags').description]"
      },
      "dependsOn": [
        "[concat('Microsoft.Storage/storageAccounts/', variables('diagnostics').storageAccount.name)]",
        "[concat('Microsoft.Network/networkInterfaces/', variables('nic').name)]"
      ],
      "properties": {
        "hardwareProfile": {
          "vmSize": "[parameters('vmSize')]"
        },
        "osProfile": {
          "computerName": "[variables('vmName')]",
          "adminUsername": "[parameters('vmAdminUsername')]",
          "adminPassword": "[parameters('vmAdminPassword')]"
        },
        "storageProfile": {
          "imageReference": {
            "publisher": "MicrosoftWindowsServer",
            "offer": "WindowsServer",
            "sku": "2016-Datacenter",
            "version": "latest"
          },
          "osDisk": {
            "createOption": "FromImage",
            "caching": "ReadWrite",
            "managedDisk": {
              "storageAccountType": "Standard_LRS"
            }
          }
        },
        "networkProfile": {
          "networkInterfaces": [
            {
              "id": "[resourceId('Microsoft.Network/networkInterfaces', variables('nic').name)]"
            }
          ]
        },
        "diagnosticsProfile": {
          "bootDiagnostics": {
            "enabled": true,
            "storageUri": "[concat('http://', variables('diagnostics').storageAccount.name, '.blob.core.windows.net')]"
          }
        }
      }
    },
    {
      "type": "Microsoft.Compute/virtualMachines/extensions",
      "name": "[concat(variables('vmName'),'/dscExtension')]",
      "apiVersion": "2015-05-01-preview",
      "location": "[resourceGroup().location]",
      "dependsOn": [
        "[concat('Microsoft.Compute/virtualMachines/', variables('vmName'))]"
      ],
      "properties": {
        "publisher": "Microsoft.Powershell",
        "type": "DSC",
        "typeHandlerVersion": "2.20",
        "autoUpgradeMinorVersion": true,
        "forceUpdateTag": "2",
         "settings": {
            "configuration": {
                "url": "https://myfilehost.example.com/OctopusTentacle.zip",
                "script": "OctopusTentacle.ps1",
                "function": "OctopusTentacle"
            },
            "configurationArguments": {
                "ApiKey": "[parameters('tentacleApiKey')]",
                "OctopusServerUrl": "[parameters('tentacleOctopusServerUrl')]",
                "Environments": "[parameters('tentacleEnvironments')]",
                "Roles": "[parameters('tentacleRoles')]",
                "ServerPort": "[parameters('tentaclePort')]"
            }
        },
        "protectedSettings": null
      }
    }
  ]
}
```

If you are using your own template, and not the sample above, you can just add the resource to your existing template:

```json
{
      "type": "Microsoft.Compute/virtualMachines/extensions",
      "name": "[concat(variables('vmName'),'/dscExtension')]",
      "apiVersion": "2015-05-01-preview",
      "location": "[resourceGroup().location]",
      "dependsOn": [
        "[concat('Microsoft.Compute/virtualMachines/', variables('vmName'))]"
      ],
      "properties": {
        "publisher": "Microsoft.Powershell",
        "type": "DSC",
        "typeHandlerVersion": "2.20",
        "autoUpgradeMinorVersion": true,
        "forceUpdateTag": "2",
         "settings": {
            "configuration": {
                "url": "https://myfilehost.example.com/OctopusTentacle.zip",
                "script": "OctopusTentacle.ps1",
                "function": "OctopusTentacle"
            },
            "configurationArguments": {
                "ApiKey": "[parameters('tentacleApiKey')]",
                "OctopusServerUrl": "[parameters('tentacleOctopusServerUrl')]",
                "Environments": "[parameters('tentacleEnvironments')]",
                "Roles": "[parameters('tentacleRoles')]",
                "ServerPort": "[parameters('tentaclePort')]"
            }
        },
        "protectedSettings": null
      }
    }
```

Note that if you are using a private Azure storage location that requires a SAS Token, add this under `protectedSettings` as `configurationUrlSasToken`.

6. Create an ARM template properties file (eg `arm-template.properties.json`) with the parameters you need:

```json
{
  "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "vmAdminUsername": {
      "value": "AdminUser"
    },
    "vmAdminPassword": {
      "value": "MySuperSecretPassw0rd"
    },
    "vmDnsName": {
      "value": "mytentaclevm"
    },
    "vmSize": {
      "value": "Standard_D2_v2"
    },
    "tentacleOctopusServerUrl": {
      "value": "https://octopus.example.com"
    },
    "tentacleApiKey": {
      "value": "API-ABCDEFG1234567890"
    },
    "tentacleCommunicationMode": {
      "value": "Poll"
    },
    "tentaclePort": {
      "value": 10943
    },
    "tentacleRoles": {
      "value": "app-server"
    },
    "tentacleEnvironments": {
      "value": "Development"
    },
    "tentaclePublicHostNameConfiguration": {
      "value": "PublicIP"
    },
    "tentacleCustomPublicHostName": {
      "value": ""
    }
  }
}
```

To deploy the template, you can use the [Azure CLI](https://docs.microsoft.com/cli/azure/install-az-cli2):

```bash
az login
az account set --subscription 'xxxxxxxxxxx'
az group create --name "OctopusDeployTentacle" --location "Australia East"
az group deployment create \
    --name "DeployTentacle" \
    --resource-group "OctopusDeployTentacle" \
    --template-file "arm-template.json" \
    --parameters "@arm-template.parameters.json"
```
