---
layout: src/layouts/Default.astro
pubDate: 2026-04-15
modDate: 2026-10-08
title: Octopus Approvals
description: Octopus Approvals is a built-in change approval system that gates deployments on sign-off from designated users or teams, without requiring an external ITSM tool.
navOrder: 5
---

:::div{.hint}
Octopus Approvals is currently in Public Preview. It is currently being rolled out to Cloud Customers and will become available to self-hosted installations in Octopus Server 2026.3 behind a feature toggle. If you would like to request this functionality early, please contact [support](https://octopus.com/support).
:::

## Overview

Octopus Approvals is a built-in change approval system for Octopus Deploy. Octopus gates deployments until designated approvers sign off directly within Octopus. This means you don't need any external ITSM tools to manage your changes.

When a deployment to a change controlled environment triggers, Octopus automatically creates a change request and prevents execution. Designated users or team members can then approve or reject the request. Once the minimum number of approvals is reached, Octopus allows execution to proceed. If any approver rejects the request, Octopus terminates the task.

## Getting started

Octopus Approvals is enabled by default. Ensure Octopus Approvals is enabled on your Octopus instance by navigating to **Configuration ➜ Settings ➜ Octopus Approvals** and verifying that **Is Enabled** is ticked.

Once Octopus Approvals is enabled, navigate to **Deploy ➜ Manage ➜ Approvals ➜ Manage** to create your first approval rule, then configure scope to apply it to the relevant projects and environments.

## Configuring an approval rule

Navigate to **Deploy ➜ Manage ➜ Approvals ➜ Manage** and select **Add Approval Rule**. Each rule includes the following settings:

- **Name**: A short, memorable, unique name for this approval rule.
- **Description**: An optional description for this approval rule.
- **Scope**: The projects and environments that this approval rule should apply to. Octopus will require approvals for deployments that match the selected project and environment combination.

  You can scope the approval rule by project and environment tags or individual project and environments.

- **Approvers**: Select the Octopus teams or individual users who are authorized to approve change requests under this rule. Any member of an approving team counts toward the minimum approvers total.

  Octopus can optionally block the deployment creator from approving their own change request. Enable **Block approvals by the deployment creator** to enforce this separation of duties.

- **Minimum approvers required**: The number of approvals Octopus requires before allowing execution to proceed. If any approver rejects the change request before this threshold is reached, Octopus immediately terminates the task.
- **Multi-tenant Approvals**: Choose whether one change request covers all tenants or each tenant has separate change requests.

## How it works

Octopus will generate a change request depending on the configured approval rules. If the required number of approvals is reached, the deployment will continue according to change windows. If the change request is rejected, the task is terminated.

### Change request creation

When a deployment triggers and it is in scope for an approval rule, Octopus automatically creates a change request with a unique reference number in the format `OCT-{number}` (for example, `OCT-42`) if an applicable change request does not already exist. Octopus immediately pauses execution and displays the change request status in the task log.

Octopus will link the execution to an existing change request if there is a pending or approved change request with the same project, environment, release number and tenant (depending on the multi-tenant approval setting for an approval rule). If the change request is already approved, the execution is allowed to proceed according to the change window.

If multiple approval rules match, the rules are merged to a resultant rule.

- Approvers are merged as a union of the approvers from each rule that has a matching scope.
- The minimum approvers required will be equal to the highest value from all approval rules with matching scope.

### Change windows

Octopus supports change windows. Change windows are scheduled time periods during which a deployment is allowed to run. If a change request is approved but the change window has not yet opened, Octopus keeps execution paused. If the change window closes before the deployment runs (whether the request is approved or still pending), Octopus terminates the task.

#### Change window creation

To create a change window in Octopus select the `Later` option in the `When` section of scheduling a Release for deployment. The `Later` option allows users to define when the deployment start date/time and a duration. Octopus evaluates the approval rule when the deployment is scheduled (queued), so approvers can approve or reject a deployment before it executes. This differs from the [Manual Intervention](https://octopus.com/docs/projects/built-in-step-templates/manual-intervention-and-approvals) step that triggers only after the deployment starts.

### Rejection

If any designated approver rejects the change request, Octopus immediately terminates the deployment task. You can't retry a rejected task, but you can create a new deployment of the same release. Octopus will create a new change request for that deployment.

The deployment creator can always reject their own change request, even if they're not an approver. This lets them withdraw a deployment they've queued.

## Reviewing change requests

Octopus surfaces change requests in several places so approvers can act on them without leaving their current context.

### Approvals

Navigate to **Deploy ➜ Manage ➜ Approvals** for a complete list of all change requests. The list is divided into three tabs:

- **Needs Approval**: Change requests that are still pending the required number of approvals.
- **Completed**: Change requests that have been approved or rejected.
- **All**: All change requests regardless of state.

Each row shows the **Change Request** number (as a link). Select the change request link to open the **Review change request** page, where you can see the full approval details and submit your approval or rejection.

### Tasks Page

Navigate to **Tasks** and select the **Needs Approval** tab for a filtered view of all tasks currently waiting on an approval. If the task is waiting for an Octopus Approval, the row will have a button to review the change request associated with this task.

Select **Review** to open the drawer to view the change request details and submit your approval or rejection.

### Deployment Page

When a deployment is blocked on an Octopus Approval, a warning callout appears at the top of the task page:

> **Approval needed to continue this deployment**
> This deployment is blocked by change request OCT-n and requires approval from N approvers.

Select **Review** to open the drawer to view the change request details and submit your approval or rejection.

### Release Page

When viewing a release, under **Progression** you will see a list of deployments to the environments in your lifecycle and lifecycle phases. If a deployment to an environment is blocked on an Octopus Approval, the environment will have a button to review the change request associated with this task.

Select **Review** to open the drawer to view the change request details and submit your approval or rejection.

## Permissions

To create, edit, or delete approval rules, you need the **ApprovalRuleAdminister** permission. This permission applies to the whole space and can't be scoped to specific projects or environments. The built-in **Space manager** and **Environment manager** roles include it. Anyone can view approval rules.

Approving or rejecting a change request doesn't require a specific permission. The approval rule controls it: only the users and team members listed as **Approvers** on the matching rule can approve or reject.

## Approvals for Runbooks

Approvals aren't available for runbooks at this stage, but they're on the roadmap for future work. If this would be helpful for your organization, please [leave feedback here](https://survey.octopus.com/t/15JLhBiYAZus).
