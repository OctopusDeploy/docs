---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Health check step
description: Health check steps allow you to perform a health check on deployment targets as part of a deployment or runbook, and take action based on the result.
navOrder: 30
---

Octopus periodically runs health checks on deployment targets and workers to ensure that they are available and running the latest version of Calamari as part of a [machine policy](/docs/infrastructure/deployment-targets/machine-policies).

However, often it can be useful to check the health of deployment targets when executing a runbook or deployment, particularly with [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/) and [transient deployment targets](/docs/deployments/patterns/elastic-and-transient-environments/deploying-to-transient-targets).

This can be achieved using the _Health Check_ step.

![Health check step search](/docs/projects/built-in-step-templates/images/health-check-step-search.png "width=500")

This step allows a deployment target that was created in the currently executing deployment to be confirmed as healthy and then added to the running deployment for subsequent steps.

Similarly, it allows you to confirm that the Tentacle service on a deployment target is running prior to attempting to perform an action against it.

## Configure a Health check step

Health check steps are added to deployment and runbook processes in the same way as other steps:

1. Add a new `Health Check` step to your [project's deployment process](/docs/projects/steps).

    ![Health check step](/docs/projects/built-in-step-templates/images/health-check-step-select.png "width=170")
2. In the **On Behalf Of** section, select the [target roles](/docs/infrastructure/deployment-targets/#target-roles) that match the deployment targets you want to run a health check against. 

3. In the **Health check** section select an option for **Health check type**:
    - Perform a full health check - this will run the [health check script](/docs/infrastructure/deployment-targets/machine-policies/#MachinePolicies-Customhealthcheckscripts) defined by the machine policy.
    - Perform a connection-only test - this only checks the machine is available (connected).

   For **Health check errors**, select which action to take on a health check error:
    - Fail the deployment (default).
    - Skip deployment targets that are unavailable.
4. In the **Machine Selection** section, select which action to take for any new machines found as a result of the health check:
    - Ignore any newly available deployment targets (default)
    - Include new deployment targets in the deployment - This option is recommended in dynamic deployments that involve targets that are created as part of the _current deployment_.

## Maximum number of concurrent health checks

There is a limit to the number of concurrent health checks possible when running the health check step. This ensures that the step doesn't adversely effect the performance of your Octopus Server.

The number of concurrent health checks will be double the Octopus Server's logical processor count which is a minimum of 2 and will not exceed 32.

## Health check for workers

Whilst the built-in Health check step works for deployment targets, it was not designed for [Workers](/docs/infrastructure/workers).

To check the health of a worker in a deployment or runbook, there is a [Worker - Health check](https://library.octopus.com/step-templates/c6c23c7b-876d-4758-a908-511f066156d7/actiontemplate-worker-health-check) community step template.
