---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-25
title: Policies best practices
subtitle: Best practices for creating policies within Platform Hub
icon: fa-solid fa-lock
navTitle: Best Practices
navSection: Policies
description: Best practices for creating policies within Platform Hub
navOrder: 165
---

## Policies administration

### Establish a naming standard

Use a [ Prefix ] - [ Policy Name ] that is easy for everyone to understand the policy's purpose.  The [ Prefix ] should reflect when the policy will run.

For example:

- Deployments - [ Policy Name ] for policies designed to run during deployments only.
- Runbook Runs - [ Policy Name ] for policies designed to run during runbooks runs only.
- Deployments and Runbook Runs - [ Policy Name ] for policies for designed to run for deployments or runbooks runs.

### Turn on SIEM audit log streaming

All policy evaluations are logged to the audit log.  Ensure [audit log streaming](/docs/security/users-and-teams/auditing/audit-stream) is enabled to log those evaluations to Splunk, SumoLogic, or an OpenTelemetry collector.  SIEM tools can provide alerting and visualizations that you can customize to your requirements.

## Creating and Updating Policies

### Start restrictive, then make generic

Consider a policy that will block the execution of deployments and runbook runs.  By default, that policy applies to all deployments and runbook runs.

When creating a new policy, be as restrictive as possible by limiting it to:

- A specific hook - such a deployment or a runbook run (not both)
- A specific project

That will limit a policy's "blast radius." Once you are confident the policy is working as intended, extend the policy to cover more projects or tenants.  When acceptable, switch the policy to project groups or spaces.

### Provide a verbose failure reason

A policy violation will be the first experience for must users with policies within Octopus Deploy.  For example, when a policy blocks a deployment or runbook run.  Provide a verbose failure reason to help the user self-service the solution.  

:::figure
![An example of a verbose policy violation error message to help users self-service](/docs/img/platform-hub/policies/policy-violation-user-message.png)
:::

### Check for both the existence of steps and if they’ve been skipped

Policies can be written to check for the existence of specific steps within a deployment or runbook process.  It's important to remember that in many cases those deployments and runbook processes have existed for years.  Octopus Deploy has the capability to require a step and prevent it from being skipped.  But it is unlikely that _all_ of those required steps in _all_ of your deployment and runbook processes have been configured to prevent them from being skipped.

It is not enough for a policy to simply check for the existence of a specific step.  The policy must also ensure users don't elect to skip the required step (for whatever reason).

:::figure
![An example of a step that can be skipped before scheduling a deployment or runbook run](/docs/img/platform-hub/policies/a-step-that-can-be-skipped-violating-a-policy.png)
:::

The resulting policy will have two conditions.

:::figure
![An example of a policy that has both the existence and that isn't skipped](/docs/img/platform-hub/policies/example-of-policy-with-two-conditions.png)
:::

### Check for parallel execution

Steps can be configured to run in parallel or sequentially. If your organization requires sequential execution for compliance or troubleshooting purposes, create a policy to check the `Execution` array in the input schema.

Each execution phase has a `StartTrigger` property that indicates when it should run:
- `StartAfterPrevious` - Steps run sequentially
- `StartWithPrevious` - Steps run in parallel

To enforce sequential execution, check that no execution phases have `StartTrigger` set to `StartWithPrevious`. See the [examples page](/docs/platform-hub/policies/examples) for a sample policy.
