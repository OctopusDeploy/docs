---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-03-19
title: Deployments
navTitle: Overview
navSection: Deployments
description: Deployment examples, patterns and practices, and their practical implementation using Octopus.
navOrder: 80
hideInThisSectionHeader: true
---

Great deployments are stress-free deployments. They should be non-events that ‘just work’ without the need for a wet signature or change-approval board sign-off.

You can use Octopus to deploy anything, anywhere. Whether it’s [Kubernetes](/docs/deployments/kubernetes), Linux or [Windows](/docs/deployments/windows) virtual machines, [Amazon Web Services](/docs/deployments/aws), [Azure](/docs/deployments/azure), or [Google Cloud](/docs/deployments/google-cloud), so long as Octopus can speak to it via our Tentacle agent, SSH, command line, or a web service, Octopus can deploy to it.

## Why deploy with Octopus?

Octopus models deployments in advanced ways, allowing you to tame complexity at scale. 

Octopus is more than just automating your existing deployment process. It has features that streamline the complex aspects of deployments, which are where manual and scripted deployments often fail.

Deploying software with Octopus involves [packaging your applications](/docs/packaging-applications/) and [configuring your infrastructure](/docs/infrastructure/). With those two completed, you’ll use the following features to complete your deployment setup in Octopus.

### Deployment process
The Octopus [deployment process](/docs/projects/deployment-process/) allows you to define all the tasks required to deploy your software. The process acts like a deployment checklist, making sure each task is completed before proceeding to the next one.

Critically, unlike a manual checklist, Octopus will never forget to run a step and always completes them in the correct order.

:::figure
![Octopus deployment process](/docs/deployments/octopus-deployment-process.png)
:::

### Steps
Octopus provides a library of pre-built step templates for deployment tasks, offering a simplified configuration experience by separating scripts and API calls. 
These steps can be easily added to processes, with configurations allowing for conditions based on environments, channels, previous steps, or package acquisition. Options include running steps in parallel or sequence, setting time limits, and configuring retries for failed steps. 

:::figure
![Octopus process step templates](/docs/deployments/octopus-step-templates.png)
:::

Additionally, there's a [community library](https://library.octopus.com/) with over 500 step templates, enabling tasks to be completed without coding. You can still create custom script steps or develop your own custom step templates for use across projects.

#### Guided failure mode and step retries
Deployments in Octopus can be configured to fail when there’s an error. Guided failure mode and step retries are alternative options rather than outright failing the deployment.

Guided failure mode pauses the deployment when a step fails and allows you to retry the failed step (after fixing any errors if required), skip it, or fail the deployment.

When switched on, step retries will re-attempt to run the failed step 3 times before it gives up and fails the deployment. This is useful in situations where there is a temporary network issue where the destination is temporarily unavailable.

### Variables
Octopus Variables allow you to apply the correct variables easily during a deployment. Octopus can manage simple values, secrets, and accounts as variables.

:::figure
![Octopus variables](/docs/deployments/octopus-variables.png)
:::

Variables can be scoped by:

- Environments
- Deployment target roles
- Deployment targets
- Deployment Processes and steps
- Channels

### Releases
A release in Octopus is a snapshot of the deployment process and assets at creation, ensuring consistency in deployments. Changes to assets don't affect existing releases. 

Tenant variables are excluded, allowing for easier onboarding of new tenants without needing a new release.

## Getting started with deployments

Use the navigation menu to discover deployment examples for different types of applications and technologies using Octopus. It also includes a number of [common deployment patterns and practices](/docs/deployments/patterns).