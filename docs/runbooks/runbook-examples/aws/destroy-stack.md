---
title: Destroy an AWS CloudFormation stack
description: Use a runbook to teardown resources by destroying an AWS CloudFormation stack.
position: 10
---

In addition to automating the creation of AWS resources, CloudFormation provides a simple method for destroying the resources it created as part of a stack.  Using a runbook, you can automate tearing down environments when they're no longer needed.

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Delete an AWS CloudFormation stack** step.
1. Fill in the parameters for the template:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Region | The region your resources are located | us-west-1 |
| CloudFormation stack name | Name of existing stack | MySuperStack |

In a single step, you can destroy all the resources created within a CloudFormation stack.

## Samples

We have a [Target - PostgreSQL](https://g.octopushq.com/TargetPostgreSQLSampleSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `Space Infrastructure` project.
