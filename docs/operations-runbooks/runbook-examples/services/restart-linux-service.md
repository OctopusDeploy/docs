---
title: Restart service on Ubuntu
description: With Octopus Deploy you can restart an Ubuntu service with a Runbook.
position: 10
---
Using a Runbook in Octopus can provide a self-service mechanism for developers to be able to restart a service on Ubuntu without having to track down a server administrator.  

## Create the Runbook
1. To create a runbook, navigate to {{Project, Operations, Runbooks, Add Runbook}}.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **Linux Service - Start, Stop, Restart**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables/index.md) rather than entering the values directly in the step parameters.

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Service Name | Name of the service to start (case sensitive) | wildfly |
| Action | Start, Stop, Restart | Restart |
| Sleep in seconds | Lenght of time in seconds to wait for service to start | 5 (default) |

:::warning
Use variables where possible so you can assign scopes to values. This will ensure that things like service name are correct for the environment you're executing the runbook on.
:::

After adding all of the required parameters, click **Save**, and you have a basic runbook to restart a service on Ubuntu! You can also add additional steps to add security to your runbooks, such as a [manual intervention](/docs/deployment-process/steps/manual-intervention-and-approvals.md) step for business approvals. 

## Samples
We have a [Target - Wildfly](https://g.octopushq.com/TargetWildflySamplePetClinic) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `PetClinic` project.

## Learn More
- [Linux Service - Start, Stop, Restart](https://library.octopus.com/step-templates/cc2aa1d1-975b-4ac4-a145-094bbd92a2c9/actiontemplate-linux-service-start,-stop,-restart)
