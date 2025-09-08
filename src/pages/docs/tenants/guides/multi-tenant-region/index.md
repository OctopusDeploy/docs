---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-29
title: Multi-tenant regions
icon: fa-solid fa-earth-americas
description: A guide showing you how to use tenants to deploy an application to regions using different release rings in Octopus Deploy.
navOrder: 10
hideInThisSectionHeader: true
---

:::div{.info}
You can find the example project in this guide on our [samples instance](https://samples.octopus.app/app#/Spaces-682/projects/car-rental).
:::

This guide introduces the concept of using geographic locations as tenants for an application as well as different upgrade rings.  In this guide, we are using a fictitious Car Rental company that has three locations: Los Angeles International Airport (LAX), Des Moines Iowa, and Norfolk Virginia. In this scenario, the Des Moines location is used as a pilot facility, with Norfolk testing beta features. LAX is their busiest location so it uses only stable releases.

The Car Rental company uses Azure to host the application for its stores. To minimize latency, the application is deployed to the closest Azure datacenter known as regions; LAX uses `West US`, Des Moines uses `Central US`, and the Norfolk location uses `East US`.

The following resources have been pre-configured in Octopus:

* Four environments: Development, Test, Staging and Production.

## Creating tenant tags

Each store is hosted in a different region and plays a different role in the development lifecycle by participating in different upgrade rings. To designate which tenant (store) is in which region and upgrade ring, we define [tenant tag sets](/docs/tenants/tenant-tags). For this scenario, we'll need two tenant tag sets - one for the region, and one for the upgrade ring.

To create a tenant tag set, navigate to **Deploy ➜ Tenant Tag Sets ➜ Add Tag Set**.

Give the first tag set the name **Azure Region**, and add a tag for each of the regions - **West US**, **Central US** and **East US**.

Give the second tag set the name **Release Ring**, and add a tag for each of the upgrade rings - **Alpha**, **Beta** and **Stable**.

## Creating tenants

The Car Rental company has three stores which have access to the following environments:

- Des Moines (Development, Test, Staging, Production)
- Norfolk (Test, Staging, Production)
- LA International Airport (Staging, Production)

Each store is modeled as a tenant. Since Des Moines is the pilot facility it has access to all environments, while LAX will only receive more stable releases.

See [tenant creation](/docs/tenants/tenant-creation) for how to create your tenants. Once you've created the tenants, you'll need to [connect them to a project and environment(s)](/docs/tenants/tenant-creation/connecting-projects). You may find it easier to connect tenants from the Car Rental project, which [allows you to connect multiple tenants at once](/docs/projects/tenants/bulk-connection).

We'll also need to associate the tags we created earlier to each tenant. In the tenant overview, click on **Manage Tags** and give each tenant the following tags:

- Des Moines
  - Azure Region: `Central US`
  - Release Ring: `Alpha`, `Beta`, and `Stable`
- Norfolk
  - Azure Region: `East US`
  - Release Ring: `Beta` and `Stable`
- LA International Airport
  - Azure Region: `West US`
  - Release Ring: `Stable`

## Creating infrastructure

The Car Rental applications consist of a PHP web UI and a MySQL database backend. To support this, an Azure App Service and MySQL database server are provisioned in each Azure region. Using [workers](/docs/infrastructure/workers), it's not necessary to configure the database server as a deployment target and is considered best practice not to do so. For the Azure App Service, see [creating an Azure Web App deployment target](/docs/infrastructure/deployment-targets/azure/web-app-targets#creating-web-app-targets) for how to create your deployment targets.

After you've added each deployment target, ensure the target is associated with its respective tenant and tags by updating the **Tenanted Deployments** and **Associated Tenants** sections. For example, to configure the target which will deploy the Alpha version of the application to Des Moines, use the following associations:

:::figure
![](/docs/img/tenants/guides/multi-tenant-region/images/tenant-demoines-tenanted-alpha-tag.png)
:::

### Example automation script

Car Rental has plans on expanding in the future. Rather than having to run through the above steps to configure a tenanted target, they've automated the creation of region infrastructure using the [Octopus REST API](/docs/octopus-rest-api). This script automates the above procedure of configuring the target as tenanted and assigning it to the appropriate tenant. 

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

## Region-specific workers

The SecOps team at Car Rental have a policy that when a deployment occurs, the infrastructure used must reside within the same region datacenter. Database deployments for Car Rental are handled by [workers](/docs/infrastructure/workers), so the deployment process needs to automatically select the correct worker during a deployment.

### Region worker pools

To accommodate the policy, you can create worker pools for each Azure region and create a worker in each one.

:::figure
![Region worker pools](/docs/img/tenants/guides/multi-tenant-region/images/region-worker-pools.png)
:::

### Worker pool variable

Region-specific worker pools are only half of the equation; the deployment still needs to be configured to select the correct pool based on the tenant being deployed to.  To solve this issue, you can use a [worker pool variable](/docs/projects/variables/worker-pool-variables). Just like other variables, these variables can be scoped to tenant tags.

:::figure
![Worker pool variables](/docs/img/tenants/guides/multi-tenant-region/images/worker-pool-variables.png)
:::

### Configure steps to use a worker pool variable

The *MySQL - Create Database If Not Exists* step of the Car Rental deployment process is configured to run on a worker and use the `Project.Worker.Pool` variable

:::figure
![](/docs/img/tenants/guides/multi-tenant-region/images/car-rental-mysql-step.png)
:::

Because the tenants for the Car Rental application have been assigned their appropriate Azure Region tag, Octopus Deploy will automatically select the correct worker when performing a deployment to the tenant.

## Deploying to a release ring

The developers for Car Rental have finished some work on a new feature and are ready to test it out in stores. Let's follow the release that was created as it's deployed to tenants in the `Beta` release ring.

Deploying a multi-tenanted application follows the same process as any other application. The one difference is that when choosing where to deploy the release, you'll also need to choose the tenants or tags to deploy the release to. To deploy to all tenants that participate in the Beta release ring, you'll want to select the **Beta** tag from the **Release Ring** tag set.

If you deploy to the Development environment, you'll notice that only Des Moines will be deployed to, as this is the only tenant available in the environment with the **Beta** tag. Promoting the same release to Test with the **Beta** tag selected again will result in Des Moines and Norfolk being chosen for deployment.

:::figure
![Beta release ring test deployment](/docs/img/tenants/guides/multi-tenant-region/images/beta-release-ring-test-deployment.png)
:::

Because we assigned the infrastructure to their respective tenants, Octopus Deploy already knows what targets to deploy to. Deploying to Staging and Production would yield the same results as Test as `Des Moines` and `Norfolk` are the only two locations who are participating in the `Beta` tag.
