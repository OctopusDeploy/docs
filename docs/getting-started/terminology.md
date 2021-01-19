---
title: Terminology
description: A page containing the definitions of terms used in Octopus Deploy.
position: 10
---

As you start using Octopus Deploy, you are going to learn a lot of new terms.  Below is a list of common terms used through the product and documentation.

- **Octopus Server**: the service responsible for hosting the Octopus UI and orchestrating deployments.
- **Self-Hosted**: when you install the Octopus Server on your infrastructure.
- [**Octopus Cloud**](https://octopus.com/docs/octopus-cloud): the hosted version of Octopus Server; but you still install tentacles on your infrastructure that connect to Octopus Cloud.
- **Task**: a unit of work performed by the Octopus Server.  A task can be a deployment, a machine health check, a runbook run, and more.  All tasks are dropped onto the task queue and picked up in a FIFO order (unless the task is scheduled to run at a specific time).
- [**Task Cap**](https://octopus.com/docs/support/increase-the-octopus-server-task-cap): how many concurrent tasks the Octopus Server can process.  For self-hosted instances this [can be increased] from the default of 5.
- **Instance**: the database, file share, and 1 to N nodes running the Octopus Server service.  Each self-hosted Octopus Deploy license allows for three active instances.
- [**Node**](https://octopus.com/docs/administration/high-availability/managing-high-availability-nodes): an individual server running the Octopus Server in an Octopus Instance.  
- [**Infrastructure**](https://octopus.com/docs/infrastructure): what the Octopus Server will deploy to.
    - [**Tentacle**](https://octopus.com/docs/security/octopus-tentacle-communication#Octopus-Tentaclecommunication-Octopus/Tentacletrustrelationship): the service responsible for facilitating communication between the Octopus Server and your [Linux](https://octopus.com/docs/infrastructure/deployment-targets/linux) or [Windows-based](https://octopus.com/docs/infrastructure/deployment-targets/windows-targets) servers.
    - [**Listening Tentacle**]((https://octopus.com/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication#listening-tentacles-recommended)): the Tentacle communication mode in which all traffic is inbound from the Octopus Server to the Tentacle.  The Tentacle is the TCP server, and Octopus Server is the TCP client.
    - [**Polling Tentacle**](https://octopus.com/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication#polling-tentacles): the Tentacle communication mode in which all traffic is outbound from the Tentacle to the Octopus Server.  The Tentacle is the TCP client, and Octopus Server is the TCP Server.
    - [**Deployment Targets**](https://octopus.com/docs/infrastructure/deployment-targets): represent the servers, machines, and cloud services where you will deploy your software and services.
    - [**Environments**](https://octopus.com/docs/infrastructure/environments): how you organize your deployment targets (whether on-premises servers or cloud services) into groups representing the different stages of your deployment pipeline, for example, development, test, and production.
    - [**Workers**](https://octopus.com/docs/infrastructure/workers): machines that can execute tasks that don't need to be run on the Octopus Server or individual deployment targets.
    - [**Worker Pools**](https://octopus.com/docs/infrastructure/workers/worker-pools): a group of workers.  One pool might be in a particular network security zone. Another pool might have a specific set of tools installed.
    - [**Health Check**](https://octopus.com/docs/infrastructure/deployment-targets/machine-policies#health-check): a task Octopus periodically runs on deployment targets and workers to ensure that they are available.
    - [**Machine Policies**](https://octopus.com/docs/infrastructure/deployment-targets/machine-policies): groups of settings that can be applied to Tentacle and SSH endpoints used for health checks, updating calamari, and more.
    - [**Machine Proxies**](https://octopus.com/docs/infrastructure/deployment-targets/proxy-support): allow you to specify a proxy server for Octopus to use when communicating with a Tentacle or SSH Target; you can also specify a proxy server when a Tentacle and the Octopus Server make web requests to other servers.
    - [**Accounts**](https://octopus.com/docs/infrastructure/deployment-targets/#accounts): credential details used during your deployments, including things like username/password, tokens, Azure and AWS credentials, and SSH key pairs.  
- [**Projects**](https://octopus.com/docs/projects): where the deployment process, configuration variables, runbooks are defined and configured to deploy and manage your software.
    - [**Deployment Process**](https://octopus.com/docs/deployment-process): the recipe for deploying your software. You define the recipe by adding steps and variables to a project. 
    - [**Deployment Steps**](https://octopus.com/docs/deployment-process/steps): the specific action (or set of actions) executed as part of the deployment process each time your software is deployed.
    - [**Release**](https://octopus.com/docs/releases): a snapshot of the deployment process and the associated assets (packages, scripts, variables) as they existed when the release was created. 
    - [**Variables**](https://octopus.com/docs/projects/variables): a value stored in the Octopus Server for use in different phases of your deployments.  Variables can be scoped to environments, steps, and more.  Variables allow you to have a consistent deployment process across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.
    - [**Manual Interventions**](https://octopus.com/docs/deployment-process/steps/manual-intervention-and-approvals): the approval step in Octopus Deploy.  Manual interventions can be scoped to specific teams and environments.
    - [**Runbooks**](https://octopus.com/docs/runbooks): used to automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.    
- **Library** - stores items used across multiple projects
    - [**Packages**](https://octopus.com/docs/packaging-applications): an archive ([zip, tar, Nuget](https://octopus.com/docs/packaging-applications#supported-formats)) that contains your application assets (binaries, .js files, .css files, .html files, etc.).    
    - [**Feed**](https://octopus.com/docs/packaging-applications/package-repositories): the package repository.  Octopus Deploy has a built-in feed, as well as support for external feeds such as TeamCity, Azure DevOps, Docker, MyGet, Maven, Artifactory, GitHub, and more.
    - [**Lifecycles**](https://octopus.com/docs/releases/lifecycles): give you control over the way releases of your software are promoted between your environments.
    - [**Script Modules**](https://octopus.com/docs/deployment-examples/custom-scripts/script-modules): language-specific functions that can be used in deployment processes across multiple projects.
    - [**Step Templates**](https://octopus.com/docs/deployment-process/steps/custom-step-templates): pre-configured steps created by you to be reused in multiple projects.
    - [**Community Step Templates**](https://octopus.com/docs/deployment-process/steps/community-step-templates): step templates contributed by the Octopus Community.
    - [**Variable Sets**](https://octopus.com/docs/projects/variables/library-variable-sets): collections of variables that can be shared between multiple projects.