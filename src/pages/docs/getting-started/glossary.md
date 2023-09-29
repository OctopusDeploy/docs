---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Glossary
description: A page containing the definitions of terms used in Octopus Deploy.
navOrder: 60
---

Octopus Deploy is a deployment tool. It takes your build server's packages and artifacts and deploys them to various targets using a safe and consistent process. Targets you can deploy to include Windows, Linux, Azure, AWS, and Kubernetes.

We do our best to make Octopus Deploy as user friendly as possible.  However, it covers such a wide range of technologies, and at times can be complex.  Our recommendation for learning Octopus Deploy is similar to learning any tool.

1. Start with a Proof of Concept or a POC to understand the core concepts.
2. Assign a pilot project to learn how to use the tool to deploy to Production.
3. Bring on other projects and learn how to scale Octopus Deploy.

As you proceed through each phase you will need to learn new terms and concepts.  This page breaks down those terms and concepts into each phase we think it is useful to learn.

## POC Phase Terms

When first setting up a POC or Hello World project you will become familiar with the following terms and concepts.  

- **Octopus Server**: responsible for hosting the Octopus Web Portal, the Rest API, and orchestrating deployments.
    - **Self-Hosted**: When the Octopus Server application is installed on your infrastructure.  You manage all the upgrades and other maintenance, along with when an upgrade occurs as well as to what version.  
    - [**Octopus Cloud**](/docs/octopus-cloud): When the Octopus Server application is hosted by Octopus Deploy (the company).  We manage all the upgrades and maintenace, and we determine when to upgrade and the version to upgrade to.
- [**Infrastructure**](/docs/infrastructure): made up of the servers, services, and accounts where the Octopus Server will deploy your software.
    - [**Tentacle**](/docs/security/octopus-tentacle-communication/): The service responsible for facilitating communication between the Octopus Server and your [Linux](/docs/infrastructure/deployment-targets/linux/) or [Windows-based](/docs/infrastructure/deployment-targets/tentacle/windows) servers.
    - [**Listening Tentacle**](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#listening-tentacles-recommended): The Tentacle communication mode in which all traffic is inbound from the Octopus Server to the Tentacle.  The Tentacle is the TCP server, and Octopus Server is the TCP client.
    - [**Polling Tentacle**](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles): The Tentacle communication mode in which all traffic is outbound from the Tentacle to the Octopus Server.  The Tentacle is the TCP client, and Octopus Server is the TCP Server.
    - [**Deployment Targets**](/docs/infrastructure/deployment-targets): The servers, machines, or cloud services where you will deploy your software and services.
    - [**Environments**](/docs/infrastructure/environments): Environments let you organize your deployment targets (whether on-premises servers or cloud services) into groups representing the different stages of your deployment pipeline, for example, development, test, and production.
- [**Projects**](/docs/projects): contain the deployment process, configuration variables, and runbooks to deploy and manage your software.
    - [**Deployment Process**](/docs/projects/deployment-process): The recipe for deploying your software. You define the recipe by adding steps and variables to a project. 
    - [**Deployment Steps**](/docs/projects/steps): The specific action (or set of actions) executed as part of the deployment process each time your software is deployed.
    - [**Release**](/docs/releases): A snapshot of the deployment process and the associated assets (packages, scripts, variables) as they existed when the release was created. 
    - [**Manual Interventions**](/docs/projects/built-in-step-templates/manual-intervention-and-approvals): The approval step in Octopus Deploy.  Manual interventions can be scoped to specific teams and environments so they can be skipped on deployments to dev or testing but required for deployments to production. 
    - [**Variables**](/docs/projects/variables): A value stored in the Octopus Server for use in different phases of your deployments.  Variables can be scoped to environments, steps, and more.  Variables allow you to have a consistent deployment process across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.
- **Library**: where you store build artifacts and other assets that can be used across multiple projects.
    - [**Packages**](/docs/packaging-applications): An archive ([zip, tar, Nuget](/docs/packaging-applications/#supported-formats)) that contains your application assets (binaries, .js files, .css files, .html files, etc.).    
    - [**Feed**](/docs/packaging-applications/package-repositories): The package repository.  Octopus Deploy has a built-in feed, as well as support for external feeds such as TeamCity, Azure DevOps, Docker, MyGet, Maven, Artifactory, Cloudsmith, GitHub, and more.
- [**Deployments**](/docs/deployments) are the execution of the deployment process with all the associated details as they existed when the release was created.
    - **Raw Log**: The unfiltered and raw look at the deployment log.  During the deployment Octopus will capture the output of each step and save it for review.
    - **Task Log**: The raw log formatted so it is easier to read on a web page.
    - **Task History**: The audit history of the deployment.  Includes who and when a deployment was triggered, who and when a manual intervention was approved, and more.

## Pilot Phase Terms

As you move on from the POC phase to the Pilot phase you should familiarize yourself with these terms and concepts.

- **Octopus Server**
    - **Task**: A unit of work performed by the Octopus Server.  A task can be a deployment, a machine health check, a runbook run, and more.  All tasks are dropped onto the task queue and picked up in a FIFO order (unless the task is scheduled to run at a specific time).
    - [**Task Cap**](/docs/support/increase-the-octopus-server-task-cap): How many concurrent tasks the Octopus Server can process.  For self-hosted instances this can be increased from the default of 5.
    - [**Spaces**](/docs/administration/spaces): A feature built in to Octopus Server to allow you to partition your server for different teams and projects.  Each space has its own projects, teams, environments, infrastructure, library, and more.
- **Infrastructure**
    - [**Workers**](/docs/infrastructure/workers): Workers are machines that can execute tasks that don't need to be run on the Octopus Server or individual deployment targets.
    - [**Worker Pools**](/docs/infrastructure/workers/worker-pools): A group of workers.  One pool might be in a particular network security zone. Another pool might have a specific set of tools installed.
    - [**Accounts**](/docs/infrastructure/deployment-targets/#accounts): Credentials that are used during your deployments, including things like username/password, tokens, Azure and AWS credentials, and SSH key pairs. 
- **Projects**
    - [**Runbooks**](/docs/runbooks): Runbooks automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.   
- **Library**
    - [**Lifecycles**](/docs/releases/lifecycles): Give you control over the way releases of your software are promoted between your environments.
    - [**Variable Sets**](/docs/projects/variables/library-variable-sets): Collections of variables that can be shared between multiple projects.
    - [**Step Templates**](/docs/projects/custom-step-templates): Pre-configured steps created by you to be reused in multiple projects.
    - [**Community Step Templates**](/docs/projects/community-step-templates): Step templates contributed by the Octopus Community.
- **Deployments**
    - [**Deployment Notes**](/docs/releases/deployment-notes): The summarization of all the releases rolled up and included since the previous deployment to the deployment environment.  
    - [**Artifacts**](/docs/projects/deployment-process/artifacts): Files collected from remote machines during the deployment which can be downloaded from the Octopus Web Portal for review.

## General Adoption Phase Terms

After the pilot phase is successful it is time to start bringing other projects on board.  As you do that you should familiarize yourself with these terms and concepts.

- **Octopus Server**
    - **Instance**: The database, file share, and 1 to N nodes running the Octopus Server service.  Each self-hosted Octopus Deploy license allows for three active instances.
    - [**Node**](/docs/administration/high-availability/maintain/maintain-high-availability-nodes): An individual server running the Octopus Server in an Octopus Instance.
    - [**High Availability**](/docs/administration/high-availability): High availability is where you run multiple Octopus Servers to distribute load and tasks between them for a single Octopus Deploy instance.
- **Infrastructure**
    - [**Built-in Worker**](/docs/security/built-in-worker): The underlying worker built in to the Octopus Server to allow you to run part of your deployment process without the need to install an external worker.  Please note, this only applies to self-hosted Octopus.  The built-in worker is disabled in Octopus Cloud.
    - [**Health Check**](/docs/infrastructure/deployment-targets/machine-policies/#health-check): A task Octopus periodically runs on deployment targets and workers to ensure that they are available.
    - [**Machine Policies**](/docs/infrastructure/deployment-targets/machine-policies): Groups of settings that can be applied to Tentacle and SSH endpoints used for health checks, updating calamari, and more.
    - [**Machine Proxies**](/docs/infrastructure/deployment-targets/proxy-support): Machine proxies allow you to specify a proxy server for Octopus to use when communicating with Tentacles or SSH Targets; you can also specify a proxy server when a Tentacle and the Octopus Server make web requests to other servers.
- **Projects**
    - [**Projects**](/docs/projects) contain the deployment process, configuration variables, and runbooks to deploy and manage your software.
    - [**Channels**](/docs/releases/channels/): How a [lifecycle](/docs/releases/lifecycles) is associated with a project.  Every project has at least one channel.
    - [**Runbook Publishing**](/docs/runbooks/runbook-publishing): A snapshot of the runbook process and associated assets (packages, scripts, variables) as they existed when the snapshot was created.
    - [**Triggers**](/docs/projects/project-triggers): Triggers automate your deployments and runbooks by responding to deployment target changes or time-based schedules.
- **Library**
    - [**Script Modules**](/docs/deployments/custom-scripts/script-modules): Script modules let you use language-specific functions that can be used in deployment processes across multiple projects.
- **Deployments**
    - [**Guided Failure Mode**](/docs/releases/guided-failures): An option to prompt a user to intervene when a deployment encounters an error so the deployment can continue.
