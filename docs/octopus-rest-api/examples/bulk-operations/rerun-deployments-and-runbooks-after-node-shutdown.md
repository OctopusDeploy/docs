---
title: Rerun all canceled deployments and runbook runs after node shutdown.
description: An example script that determine which deployments and runbook runs were canceled because of a node shutdown and resubmit them.
---

This script demonstrates how to programmatically determine which deployments and runbook runs can be resubmitted because they were canceled because of a node shutdown.  The node could have been shutdown for normal reasons, or it could have stopped responding, or it could have been turned off.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- The age in minutes you wish to filter on
- The comma separated list of nodes names that were shutdown
- What if is true or false

This script has guardrails in place to ensure you don't make too many changes.  

- A what if variable.  Set that to `$true` and it will skip the submission step.  It will print out all the deployments and runbook runs it would've done.
- This script will not resubmit every canceled runbook run or deployment.  For a runbook run or deployment to be considered it must:
    - Have been canceled within the time frame provided.
    - Have been running on the node or nodes that were provided.
    - Have been canceled because of a node shutdown.

## Script

!include <rerun-deployments-and-runbooks-after-node-failure>