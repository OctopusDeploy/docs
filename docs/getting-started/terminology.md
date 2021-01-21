---
title: Terminology
description: A page containing the definitions of terms used in Octopus Deploy.
position: 10
---

As you start using Octopus Deploy, you will learn a lot of new terms. This is a list of common terms used in the product and the documentation.

## Octopus Server

The **Octopus Server** is responsible for hosting the Octopus Web Portal, the Rest API, and orchestrating deployments.

- **Self-Hosted**: The version of Octopus Server that is installed on your infrastructure.
- [**Octopus Cloud**](/docs/octopus-cloud/index.md): The hosted version of Octopus Server that connects to Tentacles installed on the infrastructure where Octopus Cloud will install your software.
- **Task**: A unit of work performed by the Octopus Server.  A task can be a deployment, a machine health check, a runbook run, and more.  All tasks are dropped onto the task queue and picked up in a FIFO order (unless the task is scheduled to run at a specific time).
- [**Task Cap**](/docs/support/increase-the-octopus-server-task-cap.md): How many concurrent tasks the Octopus Server can process.  For self-hosted instances this can be increased from the default of 5.
- **Instance**: The database, file share, and 1 to N nodes running the Octopus Server service.  Each self-hosted Octopus Deploy license allows for three active instances.
- [**Node**](/docs/administration/high-availability/managing-high-availability-nodes.md): An individual server running the Octopus Server in an Octopus Instance.
- [**High Availability**](/docs/administration/high-availability/index.md): High availability is where you run multiple Octopus Servers to distributes load and tasks between them for a single Octopus Deploy instance.
- [**Spaces**](/docs/administration/spaces/index.md): A feature built in to Octopus Server to allow you to partition your server for different teams and projects.  Each space has its own projects, teams, environments, infrastructure, library, and more.

## Infrastructure

Your [**Infrastructure**](/docs/infrastructure/index.md) is made up of the servers, services, and accounts where the Octopus Server will deploy your software.

- [**Tentacle**](/docs/security/octopus-tentacle-communication/index.md): The service responsible for facilitating communication between the Octopus Server and your [Linux](/docs/infrastructure/deployment-targets/linux/index.md) or [Windows-based](/docs/infrastructure/deployment-targets/windows-targets/index.md) servers.
- [**Listening Tentacle**](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#listening-tentacles-recommended): The Tentacle communication mode in which all traffic is inbound from the Octopus Server to the Tentacle.  The Tentacle is the TCP server, and Octopus Server is the TCP client.
- [**Polling Tentacle**](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles): The Tentacle communication mode in which all traffic is outbound from the Tentacle to the Octopus Server.  The Tentacle is the TCP client, and Octopus Server is the TCP Server.
- [**Deployment Targets**](/docs/infrastructure/deployment-targets/index.md): Deployment targets the servers, machines, and cloud services where you will deploy your software and services.
- [**Environments**](/docs/infrastructure/environments/index.md): Environments let you organize your deployment targets (whether on-premises servers or cloud services) into groups representing the different stages of your deployment pipeline, for example, development, test, and production.
- [**Workers**](/docs/infrastructure/workers/index.md): Workers are machines that can execute tasks that don't need to be run on the Octopus Server or individual deployment targets.
- [**Built-in Worker**](/docs/security/built-in-worker.md): The underlying worker built in to the Octopus Server to allow you to run part of your deployment process without the need to install an external worker.  Please note, this only applies to self-hosted Octopus.  The built-in worker is disabled in Octopus Cloud.
- [**Worker Pools**](/docs/infrastructure/workers/worker-pools.md): A group of workers.  One pool might be in a particular network security zone. Another pool might have a specific set of tools installed.
- [**Health Check**](/docs/infrastructure/deployment-targets/machine-policies.md#health-check): A task Octopus periodically runs on deployment targets and workers to ensure that they are available.
- [**Machine Policies**](/docs/infrastructure/deployment-targets/machine-policies.md): Groups of settings that can be applied to Tentacle and SSH endpoints used for health checks, updating calamari, and more.
- [**Machine Proxies**](/docs/infrastructure/deployment-targets/proxy-support.md): Machine proxies allow you to specify a proxy server for Octopus to use when communicating with Tentacles or SSH Targets; you can also specify a proxy server when a Tentacle and the Octopus Server make web requests to other servers.
- [**Accounts**](/docs/infrastructure/deployment-targets/index.md#accounts): Credentials that are used during your deployments, including things like username/password, tokens, Azure and AWS credentials, and SSH key pairs.  

## Projects

[**Projects**](/docs/projects/index.md) contain the deployment process, configuration variables, and runbooks to deploy and manage your software.

- [**Deployment Process**](/docs/deployment-process/index.md): The recipe for deploying your software. You define the recipe by adding steps and variables to a project. 
- [**Deployment Steps**](/docs/deployment-process/steps/index.md): The specific action (or set of actions) executed as part of the deployment process each time your software is deployed.
- [**Release**](/docs/releases/index.md): A snapshot of the deployment process and the associated assets (packages, scripts, variables) as they existed when the release was created. 
- [**Manual Interventions**](/docs/deployment-process/steps/manual-intervention-and-approvals.md): The approval step in Octopus Deploy.  Manual interventions can be scoped to specific teams and environments so they can be skipped on deployments to dev or testing but required for deployments to production.
- [**Runbooks**](/docs/runbooks/index.md): Runbooks automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.   
- [**Variables**](/docs/projects/variables/index.md): A value stored in the Octopus Server for use in different phases of your deployments.  Variables can be scoped to environments, steps, and more.  Variables allow you to have a consistent deployment process across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.
- [**Channels**](/docs/releases/channels/index.md): How a [lifecycle](/docs/releases/lifecycles/index.md) is associated with a project.  Every project has at least one channel.
- [**Runbook Publishing**](/docs/runbooks/runbook-publishing/index.md): A snapshot of the runbook process and associated assets (packages, scripts, variables) as they existed when the snapshot was created.
- [**Triggers**](/docs/projects/project-triggers/index.md): Triggers automate your deployments and runbooks by responding to deployment target changes or time-based schedules.

## Library 

The Octopus library is where you store build artifacts and other assets that can be used across multiple projects.

- [**Packages**](/docs/packaging-applications/index.md): An archive ([zip, tar, Nuget](/docs/packaging-applications/index.md#supported-formats)) that contains your application assets (binaries, .js files, .css files, .html files, etc.).    
- [**Feed**](/docs/packaging-applications/package-repositories/index.md): The package repository.  Octopus Deploy has a built-in feed, as well as support for external feeds such as TeamCity, Azure DevOps, Docker, MyGet, Maven, Artifactory, GitHub, and more.
- [**Lifecycles**](/docs/releases/lifecycles/index.md): Give you control over the way releases of your software are promoted between your environments.
- [**Script Modules**](/docs/deployment-examples/custom-scripts/script-modules.md): Script modules let you use language-specific functions that can be used in deployment processes across multiple projects.
- [**Step Templates**](/docs/deployment-process/steps/custom-step-templates.md): Pre-configured steps created by you to be reused in multiple projects.
- [**Community Step Templates**](/docs/deployment-process/steps/community-step-templates.md): Step templates contributed by the Octopus Community.
- [**Variable Sets**](/docs/projects/variables/library-variable-sets.md): Collections of variables that can be shared between multiple projects.

## Deployments

[**Deployments**](/docs/deployment-examples/index.md) are the execution of the deployment process with all the associated details as they existed when the release was created.

- **Raw Log**: The unfiltered and raw look at the deployment log.  During the deployment Octopus will capture the output of each step and save it for review.
- **Task Log**: The raw log formatted so it is easier to read on a web page.
- **Task History**: The audit history of the deployment.  Includes who and when a deployment was triggered, who and when a manual intervention was approved, and more.
- [**Deployment Notes**](/docs/releases/deployment-notes.md): The summarization of all the releases rolled up and included since the previous deployment to the deployment environment.  
- [**Artifacts**](/docs/deployment-process/artifacts.md): Files collected from remote machines during the deployment which can be downloaded from the Octopus Web Portal for review.
- [**Guided Failure Mode**](/docs/releases/guided-failures.md): An option to prompt a user to intervene when a deployment encounters an error so the deployment can continue.
