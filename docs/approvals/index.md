---
title: Approvals
description: Octopus Deploy can integrate with supported ITSM tools for deployment control using Change Request approvals
position: 95
hideInThisSection: true
---

Managing deployment pipelines at scale is complex and time-consuming for DevOps teams, and it's more complicated when you add in change management. Manually filling out change requests takes time and is prone to error. It's also common to have strict change processes needing thorough reviews to get approval to ship new releases of applications. Change advisory boards can be perceived as roadblocks that slow development teams.

When CI/CD systems create change requests automatically, you can work towards best practices with less friction. We want to make change management easier by helping you integrate Octopus with ServiceNow to reduce friction and simplify your development teams' lives.

Octopus Deploy includes ITSM integrations for ServiceNow and Jira Service Management (early access) that let you balance audit and compliance requirements with team productivity. 

Our support focuses on:

1. **Productive teams** - Automatically create change requests and associate them with Octopus deployments so you can work with the right stakeholders to ensure your changes are compliant and approved. Octopus can also prevent deployments from executing until all approvals are complete. 
2. **Compliant DevOps** - Be sure that no one is deploying unapproved changes to production. Your audits become a smooth process as you can demonstrate your company’s processes are being adhered to with system reports.

## ServiceNow change management without friction

![ServiceNow deployment waiting for approval](service-nowtask-status-with-cr.png)

This new integration links Octopus deployments to ServiceNow change requests and automatically creates pre-populated, normal change requests. You get improved traceability out-of-the-box, and you can prove to auditors that every controlled deployment has a change request. This ensures your CI/CD and release management processes are compliant with company policies and regulations.
What’s included in our ServiceNow support?

- Easy workflow configuration, so it's straightforward to integrate Octopus with ServiceNow.
- Link a deployment to an existing change request, to manually associate deployments with change requests.
- Automatically create normal change requests at deployment time. Octopus pauses the deployment until the appropriate approvals are complete.
- Let Octopus do the work for you by automating the transition between stages in the change request once it’s created, leaving a record of deployment in ServiceNow.
- Use change templates to auto-create standard change requests to reduce manual work and control what information is populated.
- Ensure “Change Windows” are honored on existing change requests so deployments won’t execute until the time-window specified.
- Add work notes to change requests with information about deployment start and finish time, and whether it was successful or not.
- View and export audit logs of controlled deployments for easy compliance and post-deployment reconciliation.

Learn more about our [ServiceNow integration](https://octopus.com/docs/approvals/service-now).

:::hint
ServiceNow integration is available to customers with an [enterprise subscription](https://octopus.com/pricing).
:::

## Efficient change management approvals with Jira Service Management (early access)

![Jira Service Management approvals configuration](jira-task-settings.png)

To build on our ITSM change management support further, we are also pleased to announce our Jira Service Management integration as an early access preview. 

The Jira Service Management integration ensures that teams using this platform can access the benefits of creating change requests automatically in Octopus. It makes it easier to manage deployment pipelines at scale, reducing the complexity of change management. Integrating Octopus with Jira Service Management reduces the need for manually filling out change requests, making it faster and less prone to error. By using Octopus to create change requests automatically, you can create best practice change management easily. 

This new integration links Octopus deployments to Jira Service Management change requests and automatically creates pre-populated “Request for change” change requests. You get improved traceability out-of-the-box, and you can prove to auditors that every controlled deployment has a change request. This ensures your CI/CD and release management processes are compliant with company policies and regulations.

What's included in our Jira Service Management support?

- Easy workflow configuration, so it's straightforward to integrate Octopus with Jira Service Management
- Link a deployment to an existing change request, to manually associate deployments with change requests
- Automatically create "Request for change" requests at deployment time. Octopus pauses the deployment until the appropriate approvals are complete
- View and export audit logs of controlled deployments for easy compliance and post-deployment reconciliation

If your team uses Jira Service Management change management, we'd love for you to try it and provide your feedback.

Register for the [Jira Service Management EAP](https://octopusdeploy.typeform.com/jsm-eap).
