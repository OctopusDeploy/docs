---
title: Create Network Load Balancer
description: With Runbooks, you can automate the creation of a Network Load Balancer to distribute traffic among virtual machine instances in GCP.
position: 10
---

Google Cloud (GCP) has a [Network Load Balancing solution](https://cloud.google.com/load-balancing/docs/network/) which allows you to distribute traffic among virtual machine instances in the same region in a Virtual Private Cloud (VPC) network. A network load balancer can direct TCP or UDP traffic across regional backends.

The other benefit of a network load balancer in GCP is that it supports any and all ports.

In this example, we'll walk through how to to create a runbook with a number of [PowerShell Script steps](/docs/deployment-examples/custom-scripts/run-a-script-step.md) to create a network load balancer in GCP for both a Test and Production environment using ports to differentiate traffic:

- Port `8080` is used for traffic destined for the Test environment.
- Port `80` is used for traffic destined for the Production environment.

## Runbook pre-requisites {#runbook-prerequisites}

In order to execute this runbook successfully, there are a couple of pre-requisites:

- [Google Cloud CLI](#gcloud-cli)
- [Google Cloud authorization](#gcloud-authorization)

### Google Cloud CLI {#gcloud-cli}

In order to access Google Cloud, you usually have to use tools such as the [Google Cloud CLI](https://cloud.google.com/sdk/gcloud), which this runbook uses.

This example assumes you have either the gcloud CLI installed on the machine where you run the runbook, or that you are using [execution containers for workers](/docs/deployment-process/execution-containers-for-workers/index.md) with an image which includes the gcloud CLI.

### Google Cloud authorization {#gcloud-authorization}

The gcloud CLI needs to be authorized to access and manage resources in Google Cloud.

This example assumes that you already have a Google Cloud [service account](https://cloud.google.com/docs/authentication#service_accounts) that can be used, as the commands used here make use of the gcloud CLI, which must be authorized before it can be used. 

For further information on gcloud authorization, please refer to the [documentation](https://cloud.google.com/sdk/docs/authorizing).

The next sections explains how to configure a service account to be authorized to use the gcloud CLI.

#### Create project variables {#gcp-project-variables}

We'll use project [variables](/docs/projects/variables/index.md) to authorize the gcloud CLI with Google Cloud with the the help of a Powershell function included in a [Script module](/docs/deployment-examples/custom-scripts/script-modules.md).

Create two [sensitive variables](/docs/projects/variables/sensitive-variables.md), one for the service account email, and the other will contain the service account key. This is a JSON payload you obtain when creating the service account in Google Cloud:

![Google Cloud Project variables](images/gcp-auth-project-variables.png
 "width=500")

#### Create authorization function in script module

The instructions at [Creating a script module](/docs/deployment-examples/custom-scripts/script-modules.md#ScriptModules-CreatingaScriptmodule) detail the procedure for creating a script module in Octopus.

In the **Body** of the script module, include the following PowerShell code:

:::hint
Note the use of the `Project.GCP.ProjectName` variable which also needs to be created in your project. The value defines the scope of the project in Google Cloud you are authorizing the service account for.
:::

```powershell
function Set-GCPAuth() {
  $JsonKey = $OctopusParameters["GCP.ServiceAccount.Key"]
  $JsonFile = [System.IO.Path]::GetTempFileName()

  if (Test-Path $JsonFile)
  {
      Remove-Item $JsonFile -Force
  }

  New-Item $JsonFile -Type "File" -Force

  $JsonKey | Set-Content $JsonFile
  $gcpServiceAccountEmail = $OctopusParameters["GCP.ServiceAccount.Email"]
  $gcpProjectName = $OctopusParameters["Project.GCP.ProjectName"]
  Write-Host "Activating service account $gcpServiceAccountEmail"

  Write-Host "##octopus[stderr-progress]"
  gcloud auth activate-service-account $gcpServiceAccountEmail --key-file=$JsonFile --project=$gcpProjectName --quiet
  Test-LastExit "gcloud auth activate-service-account"

  if (Test-Path $JsonFile)
  {
      Write-Host "Clearing up temp auth file"
      Remove-Item $JsonFile -Force
  }
}
```

This script defines a function named `Set-GCPAuth` which utilises the `auth activate-service-account` command which is used in the runbook steps to authorize with Google Cloud.

Add the script module into your runbook process following [these instructions](/docs/deployment-examples/custom-scripts/script-modules.md#ScriptModules-UsingaScriptModuleonaDeployment):

![Google Cloud Project variables](images/gcp-runbook-include-script-module.png
 "width=500")

## Create the runbook {#create-runbook}

1. To create the runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.

Next, we'll add the steps to create the Network Load Balancer

### Create IP address for load balancer step {#create-ip-address-step}

To add the step for creating the IP address for the load balancer:

1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```powershell
# Activate service account
Set-GCPAuth

$projectName = $OctopusParameters["Project.GCP.ProjectName"]
$region = $OctopusParameters["GCP.Region"]
$loadbalancerIPName = $OctopusParameters["Project.GCP.LoadBalancer.ExternalIP.Name"]
$networkTier = $OctopusParameters["Project.GCP.LoadBalancer.NetworkTier"]

Write-Host "Getting compute address matching name: $loadbalancerIPName"
Write-Host "##octopus[stderr-progress]"
$ipAddress=(& gcloud compute addresses list --project=$projectName --filter="name=($loadbalancerIPName)" --format="get(address)" --quiet)
Test-LastExit "gcloud compute addresses list"

if( -not ([string]::IsNullOrEmpty($ipAddress))) 
{
	Write-Highlight "Found $loadbalancerIPName of: $ipAddress"
}
else {
	Write-Highlight "Found no compute addresses matching: $loadbalancerIPName"
    $ipAddress=(& gcloud compute addresses create $loadbalancerIPName --project=$projectName --network-tier=$networkTier --region=$region --format="get(address)" --quiet)
    Test-LastExit "gcloud compute addresses create"
    
    if( -not ([string]::IsNullOrEmpty($ipAddress))) 
    {
        Write-Highlight "Created new ip address of: $ipAddress for $loadbalancerIPName"
    }
    else {
    	Write-Error "IP address could not be determined from attempted create!"
    }
}
```
This script will check to see if an IP address matching the name specified in the variable `Project.GCP.LoadBalancer.ExternalIP.Name` already exists. If it does, it will complete as an IP address is present. If it doesn't exist, it will create a static IP address using the `compute addresses create` command.

There are a number of variables used in the script which need to be created:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| GCP.Region | The region to create the IP address | europe-west1 |
| Project.GCP.LoadBalancer.ExternalIP.Name | The name of the IP address. | my-project-nlb-ip |
| Project.GCP.LoadBalancer.NetworkTier | The network tier to assign to the reserved IP address. | PREMIUM or STANDARD |

### Create load balancer health-check step {#create-health-check-step}

In order to know if your machines behind the network load balancer are healthy you need to include [health checks](https://cloud.google.com/load-balancing/docs/health-check-concepts).

To add the step for creating the necessary health checks for the load balancer:

1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```powershell
# Activate service account
Set-GCPAuth

$projectName = $OctopusParameters["Project.GCP.ProjectName"]
$region = $OctopusParameters["GCP.Region"]
$testHealthCheckName = $OctopusParameters["Project.GCP.LoadBalancer.Test.HealthCheckName"]
$productionHealthCheckName = $OctopusParameters["Project.GCP.LoadBalancer.Prod.HealthCheckName"]

function CreateHealthCheckIfNotExists([string]$healthCheckName, [string] $healthCheckPort) {
	Write-Host "Getting compute http-health check matching name: $healthCheckName"
    Write-Host "##octopus[stderr-progress]"
    $listedPort=(& gcloud compute http-health-checks list --project=$projectName --filter="name=($healthCheckName)" --format="get(port)" --quiet)
	Test-LastExit "gcloud compute http-health-checks list"
    
    if( -not ([string]::IsNullOrEmpty($listedPort))) 
    {
        Write-Highlight "Found existing http-health check named: $healthCheckName probing port: $listedPort"
        if($listedPort -ne $healthCheckPort) {
        	Write-Warning "Existing http-health check port: $listedPort doesnt match expected port: $healthCheckPort"
        }
    }
    else {
    	Write-Highlight "Found no http-health check named: $healthCheckName"
        
        $listedPort=(& gcloud compute http-health-checks create $healthCheckName --port=$healthCheckPort --project=$projectName --format="get(port)" --quiet)
        Test-LastExit "gcloud compute http-health-checks create"
        
        if([string]::IsNullOrEmpty($listedPort)) 
        {
            Write-Error "Port for new http-health check couldnt be determined from attempted create!"
        }
    }
}

CreateHealthCheckIfNotExists $testHealthCheckName "8080"
CreateHealthCheckIfNotExists $productionHealthCheckName "80"
```

This script will check to see if the health checks for both Test and Production exist. If they do, it will skip creating that environment's health check. If they don't exist, it will create a new HTTP health check using the `compute http-health-checks create` command.

There are a number of variables used in the script which need to be created:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| GCP.Region | The region to create the IP address | europe-west1 |
| Project.GCP.LoadBalancer.Test.HealthCheckName | The name of the test environment health check. | my-project-lbhealth-http-8080 |
| Project.GCP.LoadBalancer.Prod.HealthCheckName | The name of the prod environment health check. | my-project-lbhealth-http-80 |


## Samples

We have a [Pattern - Rolling](https://g.octopushq.com/PatternRollingSamplesSpace) Space on our Samples instance of Octopus. 
You can sign in as `Guest` to take a look at this runbook example named `Configure GCP NLB Target Pools` in the `PetClinic Infrastructure` project.
