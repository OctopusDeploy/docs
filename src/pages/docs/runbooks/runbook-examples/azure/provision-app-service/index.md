---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Provision an Azure App Service
description: Provision an Azure App Service using a runbook
navOrder: 20
---

One of the most convenient aspects of Platform as a Service (PaaS) is the ability to spin up and tear down resources quickly.  This ability can be used for a number of different reasons: feature branching, testing, cost savings, etc... 

You can use runbooks in Octopus to spin up resources in Azure.

To provision an Azure App Service, there are a couple of things that need to be in place:
- Resource group
- App Service Plan

:::hint
We recommend grouping the resources for testing a feature branch into their own Azure Resource Group.  Doing this makes it easier to make sure you destroy all the resources you created by simply deleting the resource group itself.
:::

## Create the runbook

:::hint
A quick way to create the App Service Plan is go use the Azure Portal UI to begin the creation process, and export the App Plan as an Azure Resource Manager (ARM) template and use that as a basis to start from.
:::

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a **Run an Azure script** step.
5. Create an Azure Resource Group using the following code:

```powershell
$resourceGroupName = $OctopusParameters["Azure.ResourceGroup.Name"]
$resourceGroupLocation = $OctopusParameters["Azure.Location.Abbr"]

if ((az group exists --name $resourceGroupName) -eq $false)
{
    Write-Output "Creating resource group $resourceGroupName in $resourceGroupLocation"
    az group create --location $resourceGroupLocation --name $resourceGroupName --tags "Space=#{Octopus.Space.Name}" "Environment=Space"
}
```
6. Add a **Deploy an Azure Resource Manager Template** step.
7. Add the template code (example below):

```
{
    "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "name": {
            "type": "string"
        },
        "location": {
            "type": "string"
        },
        "sku": {
            "type": "string"
        },
        "skucode": {
            "type": "string"
        },
        "workerSize": {
            "type": "string"
        },
        "workerSizeId": {
            "type": "string"
        },
        "numberOfWorkers": {
            "type": "string"
        }
    },
    "resources": [
        {
            "apiVersion": "2018-11-01",
            "name": "[parameters('name')]",
            "type": "Microsoft.Web/serverfarms",
            "location": "[parameters('location')]",
            "kind": "",
            "tags": {},
            "properties": {
                "name": "[parameters('name')]",
                "workerSize": "[parameters('workerSize')]",
                "workerSizeId": "[parameters('workerSizeId')]",
                "numberOfWorkers": "[parameters('numberOfWorkers')]",
                "reserved": false
            },
            "sku": {
                "Tier": "[parameters('sku')]",
                "Name": "[parameters('skuCode')]"
            }
        }
    ]
}
```
Fill in the parameters from the template:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| name | Name of the App Service Plan | ASP-#{Octopus.Space.Name} |
| location | The region the service plan will be in | centralus |
| sku | The SKU name for your plan | Free |
| skucode | The SKU code for the plan | F1 |
| workerSize | Scaling worker size | 0 |
| workerSizeId | Scaling worker size Id | 0 |
| numberOfWorkers | Number of workers | 1 |

With the Resource Group and App Service Plan created, you can create an Azure Web App target.

8. Add a **Deploy an Azure Resource Manager Template** step.
9. Add the template code (example below):
```
{
    "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "name": {
            "type": "string"
        },
        "location": {
            "type": "string"
        },
        "hostingPlanName": {
            "type": "string"
        },
        "serverFarmResourceGroup": {
            "type": "string"
        },
        "alwaysOn": {
            "type": "bool"
        },
        "currentStack": {
            "type": "string"
        },
        "phpVersion": {
            "type": "string"
        },
        "errorLink": {
            "type": "string"
        }
    },
    "resources": [
        {
            "apiVersion": "2018-11-01",
            "name": "[parameters('name')]",
            "type": "Microsoft.Web/sites",
            "location": "[parameters('location')]",
            "tags": {},
            "dependsOn": [],
            "properties": {
                "name": "[parameters('name')]",
                "siteConfig": {
                    "appSettings": [
                        {
                            "name": "ANCM_ADDITIONAL_ERROR_PAGE_LINK",
                            "value": "[parameters('errorLink')]"
                        }
                    ],
                    "metadata": [
                        {
                            "name": "CURRENT_STACK",
                            "value": "[parameters('currentStack')]"
                        }
                    ],
                    "phpVersion": "[parameters('phpVersion')]",
                    "alwaysOn": "[parameters('alwaysOn')]"
                },
                "serverFarmId": "[concat('/subscriptions/', subscription().subscriptionId,'/resourcegroups/', parameters('serverFarmResourceGroup'), '/providers/Microsoft.Web/serverfarms/', parameters('hostingPlanName'))]",
                "clientAffinityEnabled": true
            }
        }
    ]
}
```
Fill in the parameters from the template:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| name | Name of the web app | OctPetShop-Web |
| location | Region of the web app | centralus |
| hostingPlanName | Name of the hosting plan to use | ASP-#{Octopus.Space.Name} (name from above) |
| serverFarmResourceGroup | Name of the resource group to use | #{Azure.ResourceGroup.Name} |
| alwaysOn | Whether you want to configure Always On | false |
| currentStack | Name of the stack to use | dotnetcore |
| phpVersion | Version of PHP | OFF |
| errorLink | Uri of the error link | https://s-octopetshop.scm.azurewebsites.net/detectors?type=tools&name=eventviewer |

10. Add a **Run a script** step to register the Azure Web App as a target:

```powershell
# Define parameters
$baseUrl = $OctopusParameters['Global.Base.Url']
$apiKey = $OctopusParameters['Global.Api.Key']
$spaceId = $OctopusParameters['Octopus.Space.Id']
$spaceName = $OctopusParameters['Octopus.Space.Name']
$environmentName = $OctopusParameters['Octopus.Environment.Name']
$environmentId = $OctopusParameters['Octopus.Environment.Id']
$azureAccount = $OctopusParameters['Azure.Account.Name']
$name = $OctopusParameters['Project.WebApp.Name']
$resourceGroupName = $OctopusParameters['Azure.ResourceGroup.Name']

# Get default machine policy
$machinePolicy = (Invoke-RestMethod -Method Get -Uri "$baseUrl/api/$spaceId/machinepolicies/all" -Headers @{"X-Octopus-ApiKey"="$apiKey"}) | Where-Object {$_.Name -eq "Default Machine Policy"}

# Build JSON payload
$jsonPayload = @{
	Id = $null
    MachinePolicyId = $machinePolicy.Id
    Name = $name
    IsDisabled = $false
    HealthStatus = "Unknown"
    HasLatestCalamari = $true
    StatusSummary = $null
    IsInProcess = $true
    EndPoint = @{
    	Id = $null
        CommunicationStyle = "AzureWebApp"
        Links = $null
        AccountId = $azureAccount
        ResourceGroupName = $resourceGroupName
        WebAppName = $name
    }
    Links = $null
    TenantedDeploymentParticipation = "Untenanted"
    Roles = @(
    	"OctoPetShop-Web"
    )
    EnvironmentIds = @(
    	$environmentId
    )
    TenantIds = @()
    TenantTags = @()
}

# Register the target to Octopus Deploy
Invoke-RestMethod -Method Post -Uri "$baseUrl/api/$spaceId/machines" -Headers @{"X-Octopus-ApiKey"="$apiKey"} -Body ($jsonPayload | ConvertTo-Json -Depth 10)
```
11. Add another **Run a script** step to force a health check:

```powershell
# Define parameters
$baseUrl = $OctopusParameters['Global.Base.Url']
$apiKey = $OctopusParameters['Global.Api.Key']
$spaceId = $OctopusParameters['Octopus.Space.Id']
$spaceName = $OctopusParameters['Octopus.Space.Name']
$environmentName = $OctopusParameters['Octopus.Environment.Name']
$name = $OctopusParameters['Project.WebApp.Name']

# Get worker
$machine = (Invoke-RestMethod -Method Get -Uri "$baseUrl/api/$spaceId/machines/all" -Headers @{"X-Octopus-ApiKey"="$apiKey"}).Items | Where-Object {$_.Name -eq "$name"}

# Build payload
$jsonPayload = @{
	Name = "Health"
    Description = "Check $spaceName-$environmentName health"
    Arguments = @{
    	Timeout = "00:05:00"
        MachineIds = @(
        	$machine.Id
        )
    OnlyTestConnection = "false"
    }
    SpaceId = "$spaceId"
}

# Execute health check
Invoke-RestMethod -Method Post -Uri "$baseUrl/api/tasks" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers @{"X-Octopus-ApiKey"="$apiKey"}
```

Forcing the health check like this will allow you to immediately deploy to your target if it is included in your process.

## Samples

We have a [Target - Hybrid](https://oc.to/TargetHybridSampleSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `Space Infrastructure` project.
