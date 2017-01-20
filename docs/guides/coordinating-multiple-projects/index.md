---
title: Coordinating Multiple Projects
position: 10
---


When working with multiple related projects, it is often necessary to co-ordinate between them and take some action that depends on their combined status. For example, ensure a related project is deployed first or send an email when all projects are deployed. This guide discusses some approaches to this problem and provides some examples showing how to query and control projects programatically.




:::success
**Samples**
For in depth code samples covering many of the processes discussed in this guide, see the [Project Coordination Code Samples](/docs/home/guides/coordinating-multiple-projects/project-coordination-code-samples.md) page
:::





- Responding to events across multiple projects
- Orchestrating the deployment of multiple projects
 - Master project
 - Cooperating projects

# Responding to events across multiple projects


There are various ways to respond to events within Octopus, which is useful for:

- Sending an email once a set of projects is deployed
- Generating a report of the day's deployments
- Promoting all projects from one environments to another at a certain time
- Triggering another process, for example another deployment
- Verifying that some conditions have been met



The simplest trigger is a periodic timer setup through a Windows schedules task, Azure Function or as a windows service. Alternatively it can also be a project within Octopus as a project that re-queues itself when run (see the [samples](/docs/home/guides/coordinating-multiple-projects/project-coordination-code-samples.md)).


Octopus 3.5 introduced [subscriptions](/docs/home/administration/subscriptions.md), which can call a web service or send an email when Octopus events occur.


The event can also be a script step in a project. If the script is defined as a [step template](/docs/home/deploying-applications/step-templates.md) it can be  shared among the related projects. However it is difficult to ensure that two copies of the script do not run at the same time.

# Orchestrating the deployment of multiple projects


Below are two different approaches to orchestrating multiple projects. Depending on the projects and requirements, one or a combination of these two approaches may be used.  This orchestration is useful for when:

- A set of projects should always be deployed together or in a specific order
- A project depends on a certain version of another project
- A project should not be be deployed while another project is being deployed
- A certain step should not execute at the same time as a step in another project


## Master project


This approach consists of creating a project that co-ordinates the deployment of other projects and any other related actions. For example it could define steps that

1. Deploy and wait for projects A and B
2. Send an email informing users Project A and B have been deployed
3. Deploy project C
4. If the deployment of project C fails, redeploy an older version of A and B


## Cooperating projects


This approach consists of each project taking on the role of checking that the other projects are in the right state so that it can deploy itself. It is usually implemented as one or more script steps. For example the project could:

- Trigger a deployment of Project A if it has not been deployed to the environment
- If Project B is running, wait for it to reach step 3
