---
title: Terminology
description: A page containing the definitions of terms used in Octopus Deploy.
position: 10
---

As you start using Octopus Deploy, you are going to learn a lot of new terms.  Below is a list of common terms used through the product and documentation.

- **Octopus Server**: the service responsible for hosting the Octopus UI and orchestrating deployments.
- **Self-Hosted**: when you install the Octopus Server on your infrastructure.
- [**Octopus Cloud**](/docs/octopus-cloud/index.md): the hosted version of Octopus Server; but you still install tentacles on your infrastructure that connect to Octopus Cloud.
- **Task**: a unit of work performed by the Octopus Server.  A task can be a deployment, a machine health check, a runbook run, and more.  All tasks are dropped onto the task queue and picked up in a FIFO order (unless the task is scheduled to run at a specific time).
- [**Task Cap**](/docs/support/increase-the-octopus-server-task-cap.md): how many concurrent tasks the Octopus Server can process.  For self-hosted instances this can be increased from the default of 5.
- **Instance**: the database, file share, and 1 to N nodes running the Octopus Server service.  Each self-hosted Octopus Deploy license allows for three active instances.
- [**Node**](/docs/administration/high-availability/managing-high-availability-nodes.md): an individual server running the Octopus Server in an Octopus Instance.  
- [**Infrastructure**](/docs/infrastructure/index.md): what the Octopus Server will deploy to.
    - [**Tentacle**](/docs/security/octopus-tentacle-communication/index.md): the service responsible for facilitating communication between the Octopus Server and your [Linux](/docs/infrastructure/deployment-targets/linux/index.md) or [Windows-based](/docs/infrastructure/deployment-targets/windows-targets/index.md) servers.
    - [**Listening Tentacle**](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#listening-tentacles-recommended): the Tentacle communication mode in which all traffic is inbound from the Octopus Server to the Tentacle.  The Tentacle is the TCP server, and Octopus Server is the TCP client.
    - [**Polling Tentacle**](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles): the Tentacle communication mode in which all traffic is outbound from the Tentacle to the Octopus Server.  The Tentacle is the TCP client, and Octopus Server is the TCP Server.
    - [**Deployment Targets**](/docs/infrastructure/deployment-targets/index.md): represent the servers, machines, and cloud services where you will deploy your software and services.
    - [**Environments**](/docs/infrastructure/environments/index.md): how you organize your deployment targets (whether on-premises servers or cloud services) into groups representing the different stages of your deployment pipeline, for example, development, test, and production.
    - [**Workers**](/docs/infrastructure/workers/index.md): machines that can execute tasks that don't need to be run on the Octopus Server or individual deployment targets.
    - [**Worker Pools**](/docs/infrastructure/workers/worker-pools.md): a group of workers.  One pool might be in a particular network security zone. Another pool might have a specific set of tools installed.
    - [**Health Check**](/docs/infrastructure/deployment-targets/machine-policies.md#health-check): a task Octopus periodically runs on deployment targets and workers to ensure that they are available.
    - [**Machine Policies**](/docs/infrastructure/deployment-targets/machine-policies.md): groups of settings that can be applied to Tentacle and SSH endpoints used for health checks, updating calamari, and more.
    - [**Machine Proxies**](/docs/infrastructure/deployment-targets/proxy-support.md): allow you to specify a proxy server for Octopus to use when communicating with a Tentacle or SSH Target; you can also specify a proxy server when a Tentacle and the Octopus Server make web requests to other servers.
    - [**Accounts**](/docs/infrastructure/deployment-targets/index.md#accounts): credential details used during your deployments, including things like username/password, tokens, Azure and AWS credentials, and SSH key pairs.  
- [**Projects**](/docs/projects/index.md): where the deployment process, configuration variables, runbooks are defined and configured to deploy and manage your software.
    - [**Deployment Process**](/docs/deployment-process/index.md): the recipe for deploying your software. You define the recipe by adding steps and variables to a project. 
    - [**Deployment Steps**](/docs/deployment-process/steps/index.md): the specific action (or set of actions) executed as part of the deployment process each time your software is deployed.
    - [**Release**](/docs/releases/index.md): a snapshot of the deployment process and the associated assets (packages, scripts, variables) as they existed when the release was created. 
    - [**Variables**](/docs/projects/variables/index.md): a value stored in the Octopus Server for use in different phases of your deployments.  Variables can be scoped to environments, steps, and more.  Variables allow you to have a consistent deployment process across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.
    - [**Manual Interventions**](/docs/deployment-process/steps/manual-intervention-and-approvals.md): the approval step in Octopus Deploy.  Manual interventions can be scoped to specific teams and environments.
    - [**Runbooks**](/docs/runbooks/index.md): used to automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.    
## Library 

The Octopus library is where you store artifacts and assets that can be used across multiple projects
    - [**Packages**](/docs/packaging-applications/index.md): an archive ([zip, tar, Nuget](/docs/packaging-applications/index.md#supported-formats)) that contains your application assets (binaries, .js files, .css files, .html files, etc.).    
    - [**Feed**](/docs/packaging-applications/package-repositories/index.md): the package repository.  Octopus Deploy has a built-in feed, as well as support for external feeds such as TeamCity, Azure DevOps, Docker, MyGet, Maven, Artifactory, GitHub, and more.
    - [**Lifecycles**](/docs/releases/lifecycles/index.md): give you control over the way releases of your software are promoted between your environments.
    - [**Script Modules**](/docs/deployment-examples/custom-scripts/script-modules.md): language-specific functions that can be used in deployment processes across multiple projects.
    - [**Step Templates**](/docs/deployment-process/steps/custom-step-templates.md): pre-configured steps created by you to be reused in multiple projects.
    - [**Community Step Templates**](/docs/deployment-process/steps/community-step-templates.md): step templates contributed by the Octopus Community.
    - [**Variable Sets**](/docs/projects/variables/library-variable-sets.md): collections of variables that can be shared between multiple projects.
