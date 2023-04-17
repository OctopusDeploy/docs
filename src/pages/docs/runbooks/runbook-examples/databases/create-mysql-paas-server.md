---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create PaaS MySQL database server
description: With Octopus Deploy you can create a MySQL PaaS database server with a runbook.
navOrder: 50
---

Cloud based applications often need databases to store their data.  Cloud providers such as Azure, AWS, and Google Cloud Platform (GCP) all offer database Platform as a Service (PaaS) which allows you to create a database server without having to create the underlying infrastructure that goes along with it.  These servers are fully managed by the cloud platform provider, allowing you to focus on delivering software instead of worrying about maintenance.  This can easily be automated using a runbook.

In this example, we'll create a MySQL database server on [Google Cloud](https://cloud.google.com/gcp).


:::hint
**gcloud CLI and authorization**
Most of the commands used for interacting with Google in this next section make use of the [Google Cloud CLI](https://cloud.google.com/sdk/gcloud). To use the **gcloud** CLI you usually need to authorize it. For further information on gcloud authorization, please refer to the [documentation](https://cloud.google.com/sdk/docs/authorizing).
:::

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Run a script** step to check to see if the server already exists:

```powershell
$zone = $OctopusParameters["GCP.Zone"]
$projectName = $OctopusParameters["Project.GCP.ProjectName"]
$instanceName = $OctopusParameters["Project.GCP.MySQL.InstanceName"]

Write-Host "Getting list of MySQL instances with name: $instanceName"
Write-Host "##octopus[stderr-progress]"
$Names=(& gcloud sql instances list --project=$projectName --filter="name=$instanceName" --format="get(name)" --quiet) -join ", "
Test-LastExit "gcloud sql instances list"

$dbDoesntExist = $true
if( -not ([string]::IsNullOrEmpty($Names))) 
{
	Write-Highlight "Found MySQL instance: $Names"
    $dbDoesntExist = $false
}
else {
	Write-Highlight "Found no mysql instance matching $instanceName"
}
Set-OctopusVariable -name "DatabaseDoesntExist" -value $dbDoesntExist
```
5. Add another **Run a script** with the run condition of `#{Octopus.Action[Check if MySQL instance exists].Output.DatabaseDoesntExist}` is true:

```powershell
$zone = $OctopusParameters["GCP.Zone"]
$projectName = $OctopusParameters["Project.GCP.ProjectName"]
$instanceName = $OctopusParameters["Project.GCP.MySQL.InstanceName"]
$machineTier = $OctopusParameters["Project.GCP.MySQL.MachineTier"]
$storageType = $OctopusParameters["Project.GCP.MySQL.StorageType"]
$storageAutoIncreaseLimit = $OctopusParameters["Project.GCP.MySQL.StorageIncreaseLimitInGB"]
$vpcNetworkName = $OctopusParameters["GCP.Network.VPC.Default"]
$rootPassword = $OctopusParameters["MySQL.Database.Admin.UserPassword"]

Write-Host "Running gcloud beta sql instances create"
Write-Host "##octopus[stderr-progress]"

& gcloud beta sql instances create $instanceName `
--tier=$machineTier `
--root-password=$rootPassword `
--zone=$zone --project=$projectName `
--no-backup `
--network=$vpcNetworkName `
--storage-type=$storageType `
--storage-auto-increase `
--storage-auto-increase-limit=$storageAutoIncreaseLimit `
--no-assign-ip `
--quiet

  
Test-LastExit "gcloud beta sql instances create"

Write-Host "Completed creating mysql instance"
```
6. Add project [variables](/docs/projects/variables/) for use with the scripts

:::hint
If you have a keen eye, you may have noticed that the script above uses the gcloud `beta` option to create the MySQL database server. This is done to allow use of the `--network` flag where you can specify a specific network in which to place the database server. This can be useful if you want to specify a [private ip address](https://cloud.google.com/sql/docs/mysql/configure-private-ip) for your server.
:::

In just a few steps, you're able to create a MySQL database server on GCP.

## Samples

We have a [Pattern - Rolling](https://oc.to/PatternRollingSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `PetClinic Infrastructure` project.
