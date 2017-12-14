---
title: Immutable Infrastructure
description: This guide covers deploying to immutable infrastructure where a new version of the infrastructure is provisioned and the old infrastructure is terminated.
position: 4
version: 3.4 
---

This guide assumes familiarity with Octopus Deploy.  If you don't already know how to set up projects, install Tentacles and configure basic deployment processes it may be helpful to review the [Getting Started pages](/docs/getting-started.md) before beginning this guide. Familiarity with the concepts in [Elastic and Transient Environments](/docs/guides/elastic-and-transient-environments/index.md) would be an added bonus.

The features in [Elastic and Transient Environments](/docs/guides/elastic-and-transient-environments/index.md) make it easier to deploy infrastructure in addition to applications.  This guide focuses on deploying immutable infrastructure.  Traditionally the infrastructure that hosts applications is mutable: it is constantly changing.  The changes that infrastructure could experience include things like: new firewall rules, operating system updates and patches to your own deployed applications. Immutable infrastructure, as the name suggests, does not change after the initial configuration. In order to apply changes, a new version of the infrastructure is provisioned and the old infrastructure is terminated:

![](/docs/images/5670238/5865664.png "width=500")

In this example we will create an infrastructure project and an application project.  The infrastructure project will provision new Tentacles and terminate the old ones. The application project gets deployed to the Tentacles.  We will then automate deploying our application to brand new infrastructure with each release.

## Machine policy {#ImmutableInfrastructure-Machinepolicy}

The Tentacles provisioned in this guide belong the to **Immutable Infrastructure** machine policy. For now, create a new machine policy called **Immutable Infrastructure** and leave all of the settings at their default value.

![](/docs/images/5670238/5865674.png "width=500")

## Application project {#ImmutableInfrastructure-Applicationproject}

For this demonstration, let's create a project called **Hello World** that will run a script echoing "Hello World" to each of our Tentacles.  In practice, this would be the project that deploys your application to the Tentacles.

1. Create a project called **Hello World**
2. Add a script step that outputs "Hello World" on each Tentacle:

   ![](/docs/images/5670238/5865675.png "width=500")

## Infrastructure project {#ImmutableInfrastructure-Infrastructureproject}

The infrastructure project runs a script that provisions two new Tentacles and removes any old Tentacles in the environment we are deploying to. In practice this project would create your new infrastructure, add it to your load balancer and terminate your old infrastructure.

1. Download the [HelloWorldInfrastructure.1.0.0.0.zip](/docs/attachments/helloworldinfrastructure.1.0.0.0.zip) package that contains the scripts that run in this project and make any modifications required by your Octopus installation.
2. Upload the package to your Octopus package feed:

   ![](/docs/images/5670238/5865676.png "width=500")
   
3. Install Tentacle on the same machine as your Octopus Server (there is no need to configure a Tentacle instance).
4. Create a project called **Hello World Infrastructure**.
5. Add a step that runs the script called **Provision.ps1** from the package **HelloWorldInfrastructure** on the Octopus Server:

   ![](/docs/images/5670238/5865669.png "width=500")
   
6. Add a step that performs a health check, excluding unavailable machines from the deployment:

   ![](/docs/images/5670238/5865670.png "width=500")
   
7. Add a step that runs **Teminate.ps1** from the package **HelloWorldInfrastructure** on the Octopus Server on behalf of all roles:

   ![](/docs/images/5670238/5865671.png "width=500")

## Intermission {#ImmutableInfrastructure-Intermission}

At this stage you should be able to provision new Tentacles by creating a release of the **Hello World Infrastructure** project and deploying it to an environment. If you create another release of the project and deploy it, the Tentacles for the previous release will be stopped but will remain in the Octopus environment.

You could also create and deploy a release of the **Hello World** project to your shiny new Tentacles, but it requires a lot of button clicking.

## Automating all the things {#ImmutableInfrastructure-Automatingallthethings}

Imagine a developer makes a change to Hello World and would like to deploy it. At this stage, they would need to create and deploy a release of the Hello World Infrastructure project, wait for the new infrastructure to become available and then create and deploy a release of Hello World.  It is possible but clunky. Also, someone would be required to remove all of the orphaned deployment targets left in Octopus when new Tentacles are provisioned.

### Cleaning machines {#ImmutableInfrastructure-Cleaningmachines}

Cleaning up old Tentacles can be accomplished through the use of machine policies. The **Immutable Infrastructure** machine policy that we created earlier can be edited so that it performs health checks more frequently, doesn't mind if machines are unavailable during that health check and automatically removes unavailable machines after a period of time.  This is perfect for ensuring the Tentacles that we terminate are automatically cleaned up in a timely manner.

1. Edit the Immutable Infrastructure machine policy.
2. Change "Time between checks" to 2 minutes
3. Select "Unavailable machines will not cause health checks to fail"
4. Select "Automatically delete unavailable machines"
5. Change "Time unavailable" to 5 minutes

![](/docs/images/5670238/5865677.png "width=500")

### Automatically deploying {#ImmutableInfrastructure-Automaticallydeploying}

The **Hello World** project can be configured to automatically deploy when a new deployment target becomes available.  Once this has been configured, any Tentacles created when **Hello World Infrastructure** is deployed will automatically receive the current successful deployment of the **Hello World** project.

1. Create a new trigger for the Hello World project
2. Select the event "New deployment target becomes available"

   ![](/docs/images/5670238/5865666.png "width=500")

Create and deploy a new release of **Hello World Infrastructure**.  You should notice that immediately after new Tentacles are provisioned, **Hello World** is automatically deployed to those Tentacles:

![](/docs/images/5670238/5865678.png)

We are almost there! Next we need to bump the version of **Hello World** and automatically deploy it.

### Automatically deploying a new release {#ImmutableInfrastructure-Automaticallydeployinganewrelease}

Octopus will automatically deploy the current successful deployment for a project. That means if you deploy release 1.0.0 and then create release 1.0.1, the version 1.0.0 will continue to be deployed until 1.0.1 has been manually deployed.  This is not ideal for immutable infrastructure, because we do not want to deploy 1.0.1 to our old infrastructure, so we have no way to indicate to Octopus that it should start deploying release 1.0.1.  Enter auto deploy overrides. By creating both a new release and an auto deploy override when our infrastructure is provisioned, we can indicate to Octopus that the new release should be deployed to the new infrastructure.

1. Create an auto deploy override using Octo.exe

```powershell
Octo.exe create-autodeployoverride --project "Hello World" --environment $environment --version $version --server $octopusURI --apiKey $apiKey
```

## Magic {#ImmutableInfrastructure-Magic}

Wouldn't it be amazing if a developer checked in some changes to **Hello World** and new immutable infrastructure was created with their changes on it? With a few lines of script, your build server can tell Octopus to automatically deploy new infrastructure and deploy the latest release of your project to that infrastructure when it comes online and becomes available to Octopus.  Here is an example that could be adapted to your projects and build server:

```powershell
Add-Type -Path 'Octopus.Client.dll'
 
$octopusURI = "http://your-octopus"
$apiKey = "API-ABC123"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI, $apiKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

.\Octo.exe create-release --project "Hello World Infrastructure"  --packageversion "1.0.0.0" --deployto "Development" --server $octopusURI --apiKey $apiKey
.\Octo.exe create-release --project "Hello World" --server $octopusURI --apiKey $apiKey

$project = $repository.Projects.FindByName("Hello World")
$release = $repository.Projects.GetReleases($project).Items | Select-Object -first 1
   
.\Octo.exe create-autodeployoverride --project "Hello World" --environment "Development" --version $release.Version --server $octopusURI --apiKey $apiKey

```
