---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Tenant infrastructure
description: Add tenants to infrastructure as part of a multi-tenant region setup in Octopus Deploy.
navOrder: 50
hideInThisSectionHeader: true
---

The Car Rental applications consist of a PHP web UI and a MySQL database back end.  To support this, an Azure App Service and MySQL database server are provisioned in each Azure region.  Using [workers](/docs/infrastructure/workers), it's not necessary to configure the database server as a deployment target and is considered best practice not to do so.  This section of the guide will focus on the Azure App Service deployment target type.

## Configuring targets for tenant deployments

By default, deployment targets in Octopus Deploy aren't configured for tenanted deployments.  To configure the target for tenanted deployments, navigate to **Infrastructure ➜ Deployment Targets**

![](/docs/tenants/guides/multi-tenant-region/images/octopus-deployment-targets.png "width=500")

Click on the deployment target you wish to edit.  In this case, we're editing the DeMoines Azure App Service for the development environment.

![](/docs/tenants/guides/multi-tenant-region/images/tenant-demoines-development.png "width=500")

In the **Restrictions** section, expand the **Tenanted Deployments** option and select **Include only in tenanted deployments**.  Expand the **Associated Tenants** section and assign the `De Moines` tenant.

![](/docs/tenants/guides/multi-tenant-region/images/tenant-demoines-tenanted.png "width=500")

These options configure the deployment target to be tenanted and only for the `De Moines` tenant.

## Adding Tenant Tags to Infrastructure
The above screenshot shows that it is possible to attach Tenant Tags to infrastructure.  An example of how this can be used is if we assign the `Alpha` Release Ring tag to the target, it would further restrict this target in that it can only be deployed to for the `Des Moines` tenant and `Alpha` releases.  Conversely, if we remove the `Des Moines` tenant, this target can participate in any deployment that uses the `Alpha` Release Ring tag.

![](/docs/tenants/guides/multi-tenant-region/images/tenant-demoines-tenanted-alpha-tag.png "width=500")

## Example automation script

Car Rental has plans on expanding in the future.  Rather than having to run through the above steps to configure a tenanted target, they've automated the creation of region infrastructure using the [Octopus REST API](/docs/octopus-rest-api).  This script automates the above procedure of configuring the target as tenanted and assigning it to the appropriate tenant. 

:::div{.success}
The entire runbook process can be found on our [Octopus samples instance](https://samples.octopus.app/app#/Spaces-682/projects/car-rental/operations/runbooks/Runbooks-1361/overview)
:::

```powershell
# Define parameters
$baseUrl = $OctopusParameters['Global.Base.Url']
$apiKey = $OctopusParameters['Global.Api.Key']
$spaceId = $OctopusParameters['Octopus.Space.Id']
$spaceName = $OctopusParameters['Octopus.Space.Name']
$environmentName = $OctopusParameters['Octopus.Environment.Name']
$environmentId = $OctopusParameters['Octopus.Environment.Id']
$azureAccount = $OctopusParameters['Azure.Account']
$name = "#{Octopus.Deployment.Tenant.Name | Replace " "}-#{Octopus.Environment.Name}-AppService"
$resourceGroupName = "OctopusSamples-$($OctopusParameters["Octopus.Space.Name"].Replace(' ', ''))-$($OctopusParameters["Octopus.Deployment.Tenant.Name"].Replace(' ', ''))-$($OctopusParameters["Octopus.Environment.Name"])-rg"

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
    TenantedDeploymentParticipation = "Tenanted"
    Roles = @(
    	"CarRental-Web"
    )
    EnvironmentIds = @(
    	$environmentId
    )
    TenantIds = @("$($OctopusParameters['Octopus.Deployment.Tenant.Id'])")
    TenantTags = @()
}

($jsonPayload | ConvertTo-Json -Depth 10)

# Register the target to Octopus Deploy
Invoke-RestMethod -Method Post -Uri "$baseUrl/api/$spaceId/machines" -Headers @{"X-Octopus-ApiKey"="$apiKey"} -Body ($jsonPayload | ConvertTo-Json -Depth 10)
```

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-region/manage-tenant-and-tenant-tags">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-region/deploying-to-release-ring">Next</a></span>
