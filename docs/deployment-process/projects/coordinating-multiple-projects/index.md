---
title: Coordinating Multiple Projects
description: This guide covers scenarios where it is necessary to co-ordinate deployment between multiple projects and take some action that depends on their combined status.
position: 10
---

When working with multiple related projects, it is often necessary to co-ordinate between them and take some action that depends on their combined status. For example, ensure a related project is deployed first or send an email when all projects are deployed. This section discusses some approaches to this problem and provides some examples showing how to query and control projects programatically.

:::success
**Samples**
For in depth code samples covering many of the processes discussed in this section, see the [Project Coordination Code Samples](/docs/deployment-process/projects/coordinating-multiple-projects/project-coordination-code-samples.md) page
:::

## Responding to Events Across Multiple Projects

There are various ways to respond to events within Octopus, which is useful for:

- Sending an email after a set of projects is deployed.
- Generating a report of the day's deployments.
- Promoting all projects from one environment to another at a certain time.
- Triggering another process, for example, another deployment.
- Verifying that some conditions have been met.

The simplest trigger is a periodic timer setup through a Windows schedules task, Azure Function, or as a windows service. Alternatively, it can also be a project within Octopus as a project that re-queues itself when run (see the [samples](/docs/deployment-process/projects/coordinating-multiple-projects/project-coordination-code-samples.md)).

Octopus 3.5 introduced [subscriptions](/docs/administration/subscriptions.md), which can call a web service or send an email when Octopus events occur.

The event can also be a script step in a project. If the script is defined as a [step template](/docs/deployment-process/steps/index.md) it can be shared among the related projects. However, it is difficult to ensure that two copies of the script do not run at the same time.

## Orchestrating the Deployment of Multiple Projects

Below are two different approaches to orchestrating multiple projects. Depending on the projects and requirements, one or a combination of these two approaches may be used.  This orchestration is useful for when:

- A set of projects should always be deployed together or in a specific order.
- A project depends on a certain version of another project.
- A project should not be deployed while another project is being deployed.
- A certain step should not execute at the same time as a step in another project.

### Master Project

This approach consists of creating a project that co-ordinates the deployment of other projects and any other related actions. For example it could define steps that:

1. Deploy and wait for projects A and B.
2. Send an email informing users Project A and B have been deployed.
3. Deploy project C.
4. If the deployment of project C fails, redeploy an older version of A and B.

### Cooperating Projects

This approach consists of each project taking on the role of checking that the other projects are in the right state so that it can deploy itself. It is usually implemented as one or more script steps. For example the project could:

- Trigger a deployment of Project A if it has not been deployed to the environment.
- If Project B is running, wait for it to reach step 3.

## Deploy Release Step

The Deploy Release step was introduced to Octopus in version `2018.2`.

The [Deploy Release step](/docs/deployment-process/projects/coordinating-multiple-projects/deploy-release-step/index.md) is helpful when implementing the _Master Project_  or _Cooperating Projects_ approaches described above. It makes it simple to deploy a release of a project from another project.    

![Deploy Release Step Example Process](voltron-project-process.png "width=500")
