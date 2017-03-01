---
title: Installing the Tentacle VM Extension via an ARM Template
description: How to install the Tentacle VM Extension using an Azure Resource Manager (ARM) Template
position: 5
---

:::hint
The Azure VM Extension is currently in preview.
:::

You can deploy the extension at virtual machine creation time, or update an extension resource group to apply the extension later.

Create your ARM template as normal, and add a `resources` element under your `Microsoft.Compute/virtualMachine` resource:

```json
"resources": [
  {
    "type": "Microsoft.Compute/virtualMachines/extensions",
    "name": "[concat(parameters('vmName'),'/OctopusDeployWindowsTentacle')]",
    "apiVersion": "2015-05-01-preview",
    "location": "[resourceGroup().location]",
    "dependsOn": [
      "[concat('Microsoft.Compute/virtualMachines/', parameters('vmName'))]"
    ],
    "properties": {
      "publisher": "OctopusDeploy.Tentacle",
      "type": "OctopusDeployWindowsTentacle",
      "typeHandlerVersion": "2.0",
      "autoUpgradeMinorVersion": "true",
      "settings": {
        "OctopusServerUrl": "http://localhost:81",
        "Environments": [
          "Development",
          "Staging"
        ],
        "Roles": [
          "App Server",
          "Web Server"
        ],
        "CommunicationMode": "Listen",
        "Port": 10933,
        "PublicHostNameConfiguration": "PublicIP"
      },
      "protectedSettings": {
        "ApiKey": "API-ABCDEF1234567890ABCDEF12345"
      }
    }
  }
]
```

Please refer to the [configuration structure](configuration-structure.md) for details regarding the format of the `settings` and `protectedSettings` elements.

