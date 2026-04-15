---
layout: src/layouts/Default.astro
pubDate: 2026-04-15
modDate: 2026-04-15
title: Octopus Approvals
description: Octopus Approvals is a built-in change approval system that gates deployments and runbook runs on sign-off from designated users or teams, without requiring an external ITSM tool.
navOrder: 5
---

:::div{.hint}
Octopus Approvals is currently in Alpha, available to a small set of customers. If you are interested in this feature please register your interest on the [roadmap card](https://roadmap.octopus.com/c/243-approvals-for-deployments) and we'll keep you updated.
:::

## Overview

Octopus Approvals is a built-in change approval system for Octopus Deploy. Octopus blocks deployments and runbook runs until designated approvers sign off directly within Octopus. This means you don't need any external ITSM tools to manage your changes.

When a controlled deployment or runbook run triggers, Octopus automatically creates a change request (with the format `OCT-{number}`) and pauses execution. Designated users or team members can then approve or reject the request. Once the minimum number of approvals is reached, Octopus allows execution to proceed. If any approver rejects the request, Octopus terminates the task.

## Getting started

Enable Octopus Approvals on your Octopus instance by navigating to **Configuration ➜ Settings ➜ Octopus Approvals** and tick **Is Enabled** and save. `

Once Octopus Approvals is enabled, navigate to **Library ➜ Approvals ➜ Manage Approvals** to create your first approval policy, then configure scope to apply it to the relevant projects and environments.

## Configuring an approval policy

Navigate to **Library ➜ Approvals ➜ Manage Approvals** and select **Add Approval Policy**. Each policy includes the following settings:

- **Name**: A short, memorable, unique name for this approval policy.
- **Description**: An optional description for this approval policy.
- **Scope**: The projects and environments that this approval policy should apply to. Octopus will require approvals for deployments and runbook runs that match the selected project and environment combination.

  You can scope the approval policy by project and environment tags or individual project and environments.

- **Approvers**: Select the Octopus teams or individual users who are authorized to approve change requests under this policy. Any member of an approving team counts toward the minimum approvers total.

  Octopus can optionally block the deployment creator from approving their own change request. Enable **Block approvals by the deployment creator** to enforce this separation of duties.

- **Minimum approvers required** The number of approvals Octopus requires before allowing execution to proceed. If any approver rejects the change request before this threshold is reached, Octopus immediately terminates the task.

## How it works

### Change request creation

When a deployment or runbook run triggers and it is in scope for an approval policy, Octopus automatically creates a change request with a unique reference number in the format `OCT-{number}` (for example, `OCT-42`). Octopus immediately pauses execution and displays the change request status in the task log.

If multiple approval policies match, the policies are merged to a resultant policy.

- Approvers are merged as a union of the approvers from each policy that has a matching scope.
- The minimum approvers required will be equal to the highest value from all approval policy with matching scope.

### Change windows

Octopus supports change windows. Change windows are scheduled time periods during which a deployment is allowed to run. If a change request is approved but the change window has not yet opened, Octopus keeps execution paused. If the change window closes before the deployment runs (whether the request is approved or still pending), Octopus terminates the task.

### Rejection

If any designated approver rejects the change request, Octopus immediately terminates the task. You cannot retry a rejected task; you must trigger a new deployment or runbook run, which will create a fresh change request.

## Reviewing change requests

Octopus surfaces change requests in several places so approvers can act on them without leaving their current context.

### Approvals

Navigate to **Library ➜ Approvals** for a complete list of all change requests. The list is divided into three tabs:

- **Needs Approval**: Change requests that are still pending the required number of approvals.
- **Completed**: Change requests that have been approved or rejected.
- **All**: All change requests regardless of state.

Each row shows the **Change Request** number (as a link). Select the change request link to open the **Review change request** page, where you can see the full approval details and submit your approval or rejection.

### Tasks Page

Navigate to **Tasks** and select the **Needs Approval** tab for a filtered view of all tasks currently waiting on an approval. If the task is waiting for an Octopus Approval, the row will have button to review the change request associated with this task.

Select **Review** to open the drawer to view the change request details and submit your approval or rejection.

### Deployment or Runbook Run Page

When viewing a deployment or runbook run is blocked on an Octopus Approval, a warning callout appears at the top of the task page:

> **Approval needed to continue this deployment**
> This deployment is blocked by change request OCT-n and requires approval from N approvers.

Select **Review** to open the drawer to view the change request details and submit your approval or rejection.

### Release Page

When viewing a release, under **Progression** you will see a list of deployments to the environments in your lifecycle and lifecycle phases. If a deployment to an environment is blocked on a Octopus Approval, the environment will have a button to review the change request associated with this task.

Select **Review** to open the drawer to view the change request details and submit your approval or rejection.
