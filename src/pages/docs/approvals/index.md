---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-04-15
title: Approvals
subtitle: Defining your change approval process
icon: fa-solid fa-square-check
navTitle: Overview
navSection: Approvals
description: Octopus Deploy can integrate with supported ITSM tools for deployment control using Change Request approvals
navOrder: 110
hideInThisSection: true
---

Managing deployment pipelines at scale is complex and time-consuming for DevOps teams, and it's more complicated when you add in change management. Manually filling out change requests takes time and is prone to error. It's also common to have strict change processes needing thorough reviews to get approval to ship new releases of applications. Change advisory boards can be perceived as roadblocks that slow development teams.

When CI/CD systems create change requests automatically, you can work towards best practices with less friction. We want to make change management easier by helping you integrate Octopus with IT service management (ITSM) systems to reduce friction and simplify your development teams' lives.

Octopus Deploy includes ITSM integrations for ServiceNow and Jira Service Management that let you balance audit and compliance requirements with team productivity.

:::div{.hint}
Octopus Approvals is a native, built-in approval system that works without an external ITSM tool. This feature is currently in Alpha, available to a small set of customers. If you are interested in this feature please register your interest on the [roadmap card](https://roadmap.octopus.com/c/243-approvals-for-deployments) and we'll keep you updated.
:::

Our support focuses on:

1. **Productive teams** - Automatically create change requests and associate them with Octopus deployments or runbook runs so you can work with the right stakeholders to ensure your changes are compliant and approved. Octopus can also prevent deployments and runbook runs from executing until all approvals are complete.
2. **Compliant DevOps** - Be sure that no one is deploying unapproved changes to production. Your audits become a smooth process as you can demonstrate your company's processes are being adhered to with system reports.

## Native change approvals with Octopus Approvals

Octopus Approvals is a built-in change approval system that lets you gate deployments and runbook runs on sign-off from designated users or teams — no external ITSM tool required. When a controlled deployment triggers, Octopus automatically creates a change request (formatted as `OCT-{number}`) and pauses execution. Once the minimum number of approvals is reached, Octopus allows the task to proceed. If any approver rejects the request, Octopus terminates the task immediately.

What's included in Octopus Approvals?

- Octopus manages the full approval workflow with no external dependencies.
- Approval policies define which users or teams can approve and how many approvals Octopus requires before proceeding.
- Octopus creates change requests automatically at deployment time.
- Octopus supports change windows — the task waits until an approved time period before Octopus allows execution.
- Octopus records an audit trail of approvals and rejections in the task log.

:::div{.hint}
Octopus Feature Toggles are currently in Alpha, available to a small set of customers.

If you are interested in this feature please register your interest on the [roadmap card](https://roadmap.octopus.com/c/121-feature-toggles) and we'll keep you updated.
:::

Learn more about [Octopus Approvals](/docs/approvals/octopus-approvals).

## ServiceNow change management without friction

:::figure
![ServiceNow deployment waiting for approval](/docs/img/approvals/servicenow-task-status-with-cr.png)
:::

This new integration links Octopus deployments and runbook runs to ServiceNow change requests and automatically creates pre-populated, normal change requests. You get improved traceability out-of-the-box, and you can prove to auditors that every controlled deployment and runbook has a change request. This ensures your CI/CD and release management processes are compliant with company policies and regulations.
What's included in our ServiceNow support?

- Easy workflow configuration, so it's straightforward to integrate Octopus with ServiceNow.
- Link a deployment or runbook run to an existing change request to manually associate deployments with change requests.
- Automatically create normal and emergency change requests at execution time. Octopus pauses the execution until the appropriate approvals are complete.
- Let Octopus do the work for you by automating the transition between stages in the change request once created, leaving a deployment or runbook run record in ServiceNow.
- Use change templates to auto-create standard change requests to reduce manual work and control what information is populated.
- Ensure "Change Windows" are honored on existing change requests so deployments or runbook runs won't execute until the specified time window.
- Add work notes to change requests with information about deployment or runbook run start and finish time and whether it was successful or not.
- Create change requests with pre-populated fields through variables.
- View and export audit logs of controlled deployments and runbook runs for easy compliance and post-execution reconciliation.

Learn more about our [ServiceNow integration](/docs/approvals/servicenow).

:::div{.hint}
ServiceNow integration is available to customers with an [enterprise subscription](https://octopus.com/pricing).
:::

## Efficient change management approvals with Jira Service Management

:::figure
![Jira Service Management approvals configuration](/docs/img/approvals/jira-task-settings.png)
:::

To build on our ITSM change management support further, we are also pleased to announce our Jira Service Management integration.

The Jira Service Management integration ensures that teams using this platform can access the benefits of creating change requests automatically in Octopus. It makes it easier to manage deployment pipelines at scale, reducing the complexity of change management. Integrating Octopus with Jira Service Management reduces the need for manually filling out change requests, making it faster and less prone to error. By using Octopus to create change requests automatically, you can create best practice change management easily.

This new integration links Octopus deployments and runbook runs to Jira Service Management change requests and automatically creates pre-populated "Request for change" change requests. You get improved traceability out-of-the-box, and you can prove to auditors that every controlled deployment and runbook has a change request. This ensures your CI/CD and release management processes are compliant with company policies and regulations.

What's included in our Jira Service Management support?

- Easy workflow configuration, so it's straightforward to integrate Octopus with Jira Service Management
- Link a deployment or runbook run to an existing change request, to manually associate deployments and runbook runs with change requests
- Automatically create "Request for change" requests at execution time. Octopus pauses the execution until the appropriate approvals are complete
- View and export audit logs of controlled deployments and runbook runs for easy compliance and post-execution reconciliation

If your team uses Jira Service Management change management, we'd love for you to try it and provide your feedback.

Register for the [Jira Service Management EAP](https://octopusdeploy.typeform.com/jsm-eap).
