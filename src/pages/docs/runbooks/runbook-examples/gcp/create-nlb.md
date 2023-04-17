---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create Network Load Balancer
description: With runbooks, you can automate the creation of a Network Load Balancer to distribute traffic among virtual machine instances in GCP.
navOrder: 10
---

Google Cloud (GCP) has a [Network Load Balancing solution](https://cloud.google.com/load-balancing/docs/network/) that allows you to distribute traffic among virtual machine instances in the same region in a Virtual Private Cloud (VPC) network. A network load balancer can direct TCP or UDP traffic across regional backends.

The other benefit of a network load balancer in GCP is that it supports any and all ports.

In this example, we'll walk through how to create a runbook with a number of [PowerShell Script steps](/docs/deployments/custom-scripts/run-a-script-step/) to create a network load balancer in GCP for both a test and production environment using ports to differentiate traffic:

- Port `8080` is used for traffic destined for the test environment.
- Port `80` is used for traffic destined for the production environment.

## Runbook pre-requisites {#runbook-prerequisites}

In order to execute this runbook successfully, there are a couple of pre-requisites:

- [Google Cloud CLI](#gcloud-cli)
- [Google Cloud authorization](#gcloud-authorization)

### Google Cloud CLI {#gcloud-cli}

In order to access Google Cloud, you usually have to use tools such as the [Google Cloud CLI](https://cloud.google.com/sdk/gcloud), which this runbook uses.

This example assumes you have either the gcloud CLI installed on the machine where you run the runbook, or that you are using [execution containers for workers](/docs/projects/steps/execution-containers-for-workers/) with an image that includes the gcloud CLI.

### Google Cloud authorization {#gcloud-authorization}

The gcloud CLI needs to be authorized to access and manage resources in Google Cloud.

This example assumes that you already have a Google Cloud [service account](https://cloud.google.com/docs/authentication#service_accounts) that can be used, as the commands used here make use of the gcloud CLI, which must be authorized before it can be used. 

For further information on gcloud authorization, please refer to the [gcloud documentation](https://cloud.google.com/sdk/docs/authorizing).

The next sections explains how to configure a service account to be authorized to use the gcloud CLI.

#### Create project variables {#gcp-project-variables}

We'll use project [variables](/docs/projects/variables/) to authorize the gcloud CLI with Google Cloud with the the help of a Powershell function included in a [Script module](/docs/deployments/custom-scripts/script-modules/).

Create two [sensitive variables](/docs/projects/variables/sensitive-variables/), one for the service account email, and the other will contain the service account key. This is a JSON payload you obtain when creating the service account in Google Cloud:

![Google Cloud Project variables](/docs/runbooks/runbook-examples/gcp/images/gcp-auth-project-variables.png
 "width=500")

#### Create authorization function in script module

The instructions at [Creating a script module](/docs/deployments/custom-scripts/script-modules/#ScriptModules-CreatingaScriptmodule) detail the procedure for creating a script module in Octopus.

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

This script defines a function named `Set-GCPAuth` which uses the `auth activate-service-account` command that is used in the runbook steps to authorize with Google Cloud.

Add the script module into your runbook process following [these instructions](/docs/deployments/custom-scripts/script-modules/#ScriptModules-UsingaScriptModuleonaDeployment):

![Google Cloud Project variables](/docs/runbooks/runbook-examples/gcp/images/gcp-runbook-include-script-module.png
 "width=500")

## Create the runbook {#create-runbook}

1. To create the runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.

Next, we'll add the steps to create the network load balancer.

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

There are a number of variables used in the script:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| GCP.Region | The region to create the IP address in. | europe-west1 |
| Project.GCP.LoadBalancer.ExternalIP.Name | The name of the IP address. | my-project-nlb-ip |
| Project.GCP.LoadBalancer.NetworkTier | The network tier to assign to the reserved IP address. | PREMIUM or STANDARD |

### Create load balancer health-check step {#create-health-check-step}

In order to know if your machines behind the network load balancer are healthy you need to include [health checks](https://cloud.google.com/load-balancing/docs/health-check-concepts).

Add the step to create the necessary health checks for the load balancer:

1. Navigate to **{{Project, Operations, Runbooks}}**, and choose the runbook.
1. Click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```powershell
# Activate service account
Set-GCPAuth

$projectName = $OctopusParameters["Project.GCP.ProjectName"]
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

This script will check to see if the health checks exist for both test and production. If they do, it will skip creating that environment's health check. If they don't exist, it will create a new HTTP health check using the `compute http-health-checks create` command.

There are a number of variables used in the script:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| Project.GCP.LoadBalancer.Test.HealthCheckName | The name of the test environment health check. | my-project-lbhealth-http-8080 |
| Project.GCP.LoadBalancer.Prod.HealthCheckName | The name of the prod environment health check. | my-project-lbhealth-http-80 |

### Create load balancer target pools step {#create-target-pools-step}

As we are creating a single load balancer that routes traffic for both the test and production environment we want to avoid re-using the same virtual machines. We use dedicated target pools for the test and production environments to do this. A [target pool](https://cloud.google.com/load-balancing/docs/target-pools) is the name given to a group of virtual machine instances hosted in Google Cloud.

Add the step to create the necessary target pools for the load balancer:

1. Navigate to **{{Project, Operations, Runbooks}}**, and choose the runbook.
1. Click **ADD STEP**.
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
$testTargetPoolName = $OctopusParameters["Project.GCP.LoadBalancer.Test.TargetPoolName"]
$productionTargetPoolName = $OctopusParameters["Project.GCP.LoadBalancer.Prod.TargetPoolName"]

function CreateLoadBalancerTargetPoolIfNotExists([string]$targetPoolName, [string] $healthCheckName) {
	Write-Host "Getting compute target-pools matching name: $targetPoolName"
    Write-Host "##octopus[stderr-progress]"
    $listedPoolName=(& gcloud compute target-pools list --project=$projectName --filter="region:($region) AND name=($targetPoolName)" --format="get(name)" --quiet)
	Test-LastExit "gcloud compute target-pools list"
    
    if( -not ([string]::IsNullOrEmpty($listedPoolName))) 
    {
        Write-Highlight "Found existing target pool named: $listedPoolName"
    }
    else {
    	Write-Highlight "Creating new target pool named: $targetPoolName as no existing match."
        
        $listedPoolName=(& gcloud compute target-pools create $targetPoolName --region=$region --http-health-check=$healthCheckName --project=$projectName --format="get(name)" --quiet)
        Test-LastExit "gcloud compute target-pools create"
        
        if([string]::IsNullOrEmpty($listedPoolName)) 
        {
            Write-Error "Name for new target pool couldnt be determined from attempted create!"
        }
    }
}

CreateLoadBalancerTargetPoolIfNotExists $testTargetPoolName $testHealthCheckName 
CreateLoadBalancerTargetPoolIfNotExists $productionTargetPoolName $productionHealthCheckName 
```

This script will check to see if the target pools exist for both Test and Production. If they do, it will skip creating that environment's pool. If they don't exist, it will create a new target pool using the `compute target-pools create` command.

There are a number of variables used in the script:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| GCP.Region | The region to create the target pools in. | europe-west1 |
| Project.GCP.LoadBalancer.Test.HealthCheckName | The name of the test environment health check. | my-project-lbhealth-http-8080 |
| Project.GCP.LoadBalancer.Prod.HealthCheckName | The name of the prod environment health check. | my-project-lbhealth-http-80 |
| Project.GCP.LoadBalancer.Test.TargetPoolName | The name of the test environment target pool. | my-project-test-pool |
| Project.GCP.LoadBalancer.Prod.TargetPoolName | The name of the prod environment target pool. | my-project-prod-pool |

### Create load balancer forwarding rules step {#create-forwarding-rules-step}

In order to direct traffic that hits the load balancer to the correct backend target pool, we need to specify a [forwarding rule](https://cloud.google.com/load-balancing/docs/using-forwarding-rules) for each port.

Add the step to create the necessary forwarding rules for the load balancer:

1. Navigate to **{{Project, Operations, Runbooks}}**, and choose the runbook.
1. Click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```powershell
# Activate service account
Set-GCPAuth

$projectName = $OctopusParameters["Project.GCP.ProjectName"]
$region = $OctopusParameters["GCP.Region"]
$loadBalancerIPName = $OctopusParameters["Project.GCP.LoadBalancer.ExternalIP.Name"]
$testTargetPoolName = $OctopusParameters["Project.GCP.LoadBalancer.Test.TargetPoolName"]
$productionTargetPoolName = $OctopusParameters["Project.GCP.LoadBalancer.Prod.TargetPoolName"]
$testForwardingRuleName = $OctopusParameters["Project.GCP.LoadBalancer.Test.ForwardingRule"]
$productionForwardingRuleName = $OctopusParameters["Project.GCP.LoadBalancer.Prod.ForwardingRule"]
$networkTier = $OctopusParameters["Project.GCP.LoadBalancer.NetworkTier"]

function CreateForwardingRulesForTargetPoolIfNotExists([string] $forwardingRuleName, [string] $targetPoolName, [string] $port) {
	Write-Host "Getting compute forwarding-rules matching name: $forwardingRuleName"
    Write-Host "##octopus[stderr-progress]"
    $listedPortRange=(& gcloud compute forwarding-rules list --project=$projectName --filter="region:($region) AND name=($forwardingRuleName)" --format="get(portRange)" --quiet)
	Test-LastExit "gcloud compute forwarding-rules list"
    
    if( -not ([string]::IsNullOrEmpty($listedPortRange))) 
    {
        Write-Highlight "Found existing forwarding-rule named: $forwardingRuleName with portRange: $listedPortRange"
    }
    else {
    
    	Write-Highlight "Creating new forwarding-rule named: $forwardingRuleName for port: $port as no existing match"
        
        $listedPortRange=(& gcloud compute forwarding-rules create $forwardingRuleName --region=$region --ports=$port --address=$loadBalancerIPName --target-pool=$targetPoolName --project=$projectName --network-tier=$networkTier --format="get(portRange)" --quiet)
        Test-LastExit "gcloud compute forwarding-rules create"
        
        if([string]::IsNullOrEmpty($listedPortRange)) 
        {
            Write-Error "Port Range for new forwarding-rule couldnt be determined from create!"
        }
    }
}

CreateForwardingRulesForTargetPoolIfNotExists $testForwardingRuleName $testTargetPoolName "8080"
CreateForwardingRulesForTargetPoolIfNotExists $productionForwardingRuleName $productionTargetPoolName "80"
```

This script will check to see if the forwarding rules exist for both test and production. If they do, it will skip creating that environment's rule. If they don't exist, it will create a new forwarding rule using the `compute forwarding-rules create` command.

There are a number of variables used in the script:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| GCP.Region | The region to create the rules in. | europe-west1 |
| Project.GCP.LoadBalancer.ExternalIP.Name | The name of the IP address. | my-project-nlb-ip |
| Project.GCP.LoadBalancer.Test.TargetPoolName | The name of the test environment target pool. | my-project-test-pool |
| Project.GCP.LoadBalancer.Prod.TargetPoolName | The name of the prod environment target pool. | my-project-prod-pool |
| Project.GCP.LoadBalancer.Test.ForwardingRule | The name of the test environment forwarding rule. | my-project-test-rule |
| Project.GCP.LoadBalancer.Prod.ForwardingRule | The name of the prod environment forwarding rule. | my-project-prod-rule |
| Project.GCP.LoadBalancer.NetworkTier | The network tier to assign to the forwarding rule. | PREMIUM or STANDARD |

### Create add machines to target pool step {#create-machines-add-step}

Finally, in order to have a functioning load balancer, we need virtual machines to add to the target pools.

:::hint
This step assumes you have already created one or more Compute Engine instance in Google Cloud to add to the target pool, which follow a naming convention of `machinename-number`. This is to allow multiple machines to be added to the target pool in a single step.
:::

Add the step to add machines to a target pool for the load balancer:

1. Navigate to **{{Project, Operations, Runbooks}}**, and choose the runbook.
1. Click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```powershell
# Activate service account
Set-GCPAuth

$projectName = $OctopusParameters["Project.GCP.ProjectName"]
$zone = $OctopusParameters["GCP.Zone"]
$targetPoolName = $OctopusParameters["Project.GCP.Targets.LoadBalancer.Pool"]
$targetMachineName = $OctopusParameters["Project.GCP.Targets.VM.Name"]
$instanceNumberRequired = [int]$OctopusParameters["Project.GCP.Targets.NumberRequired"]

$instances=@()
For($i=1; $i -le $instanceNumberRequired; $i++) {
	$instances += "$targetMachineName-$i"
}

$instanceCount = $instances.Length
$instances = $instances -Join ","

Write-Highlight "Adding $instanceCount instances to target-pool: $targetPoolName"
Write-Host "Adding instances: $instances to target-pool: $targetPoolName"
Write-Host "##octopus[stderr-progress]"
$response=(& gcloud compute target-pools add-instances $targetPoolName --instances=$instances --instances-zone=$zone --project=$projectName --quiet)
Test-LastExit "gcloud compute target-pools add-instances"

Write-Host "Completed adding instances: $instances to target-pool: $targetPoolName"
```

This script will generate a list of machine names, and then add them to a target pool using the `compute target-pools` command.

There are a number of variables used in the script:

| Variable name  | Description | Example |
| -------------  | ------------- | ------------- |
| Project.GCP.ProjectName | Project in Google Cloud. | my-project |
| GCP.Zone | The zone where the machines are located. | europe-west1 |
| Project.GCP.Targets.LoadBalancer.Pool | The name of the target pool to add machines to. | my-project-test-pool |
| Project.GCP.Targets.VM.Name | The base name of the machine in GCP. Used with Project.GCP.Targets.NumberRequired to add multiple machines.  | my-project-vm-name |
| Project.GCP.Targets.NumberRequired | The number of machines to add to the pool. | my-project-vm-name |

And that's it! In a few steps, you have a network load balancer set up in Google Cloud routing traffic to both test and production machines.

## Samples

We have a [Pattern - Rolling](https://oc.to/PatternRollingSamplesSpace) Space on our Samples instance of Octopus. 
You can sign in as `Guest` to take a look at these runbook steps in the `PetClinic Infrastructure` project:

- The runbook named `Configure GCP NLB Target Pools` includes all of the steps to create the network load balancer. 
- The step to add machines to a target pool is included in the runbook named `Spin up GCP PetClinic Project Infrastructure`.
