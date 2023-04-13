---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Notifications
description: Guidelines and recommendations for notifications in Octopus Deploy.
navOrder: 100
hideInThisSection: true
---

Octopus Deploy provides multiple mechanisms for notifying you and your users of specific actions within Octopus Deploy.  These include:

- [Subscriptions](/docs/administration/managing-infrastructure/subscriptions/) to send out notifications when specific events occur within Octopus.  Both email and webhook subscriptions are currently supported.
- [Email notification step](/docs/projects/built-in-step-templates/email-notifications/) to send out an email during a deployment or runbook run.
- [Slack notification step template](https://library.octopus.com/step-templates/99e6f203-3061-4018-9e34-4a3a9c3c3179/actiontemplate-slack-send-simple-notification) to send out Slack messages during a deployment or runbook run.
- [Microsoft Teams notification step template](https://library.octopus.com/step-templates/110a8b1e-4da4-498a-9209-ef8929c31168/actiontemplate-microsoft-teams-post-a-message) to send out messages to Microsoft Teams during a deployment or runbook run.
- [Twilio - send SMS step template](https://library.octopus.com/step-templates/3c3904a9-d08c-4f18-b86c-0304800bb541/actiontemplate-twilio-send-sms-(powershell)) to send out an SMS message during a deployment or runbook run.

## Subscriptions

Subscriptions allow you to receive an email or send a message to a webhook for specific events in Octopus Deploy.  Every action in Octopus Deploy is added to the audit log.  When an entry is added to the audit log, it is assigned a category and a document type.  

- Document types are the "what was changed."  For example, accounts, deployments, projects, releases, and so on.
- Categories are what caused it to change.  For example, deployment started, deployment failed, API key expired, and so on.

:::hint
If you are not careful with your subscription, you could end up with a lot of "noise" cluttering your inbox.  We recommend dialing in your subscription and running tests to limit that noise.
:::

Each filter you add is an "AND," while each option you add to the filter is an "OR."

A subscription with the filters:
- Event Categories: Deployment Started
- Environments: Staging, Production
- Projects: Hello World

That filter is translated to look for events where the category is Deployment Started AND for the environments Staging OR Production AND for the project Hello World.  

When creating subscriptions, these are our recommendations:

- If you want to create a filter to monitor for changes to the runbook process, deployment process, variables, or library variables, the event category will be `Document Modified.`
- Don't mix and match disparate event categories.  For example, don't have a subscription, look for `API Key Expired` and `Build Information Created` events.  That is very hard to maintain and is confusing.
- The majority of events don't include information about projects or environments.  Combining project or environment filters to event categories such as `Login Banned` will result in the subscription not firing.
- Octopus Deploy sends a specific [JSON payload](/docs/administration/managing-infrastructure/subscriptions/#Subscriptions-WebhookNotifications) via webhook to your service.  Generally, this won't be enough information; you will need to use the payload sent to make API calls to gather more details.
- You cannot customize the email messages sent out.  If you are looking for a custom email message sent during a deployment or runbook run, we recommend using the email notification step.

## Notifications during runbook runs or deployments

You can configure notifications in your deployment or runbook process.  Unlike subscriptions, these notifications have access to all the variables, including the current deployment or runbook state, because they are triggered as part of a deployment or runbook run.

Regardless of the notification technology (email, Slack, MS Teams, etc.), the recommendations are all the same.

- Create a library variable set called "Notifications" to house common variables used in those notifications.  Some variables can include pending notification message, email subject, and deployment or runbook run result message.
- Send notifications when pausing for approval or manual intervention to let the approver know a deployment is waiting for them.  Example variable value: `#{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name} is awaiting approval.`
- Always send notifications at the end of each deployment informing interested parties of the deployment status.  Use Octopus Deploy's built-in [extendend variable syntax](/docs/projects/variables/variable-substitutions/#VariableSubstitutionSyntax-ExtendedSyntax) to differentiate between successful and failed deployments. Example variable value: `#{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name} has #{if Octopus.Deployment.Error}failed#{else}completed successfully#{/if}`
- Include a deep link in your message back to the deployment or runbook run. Example variable value `https://samples.octopus.app/app#/#{Octopus.Space.Id}/tasks/#{Octopus.Task.Id}`

## Further reading

For further reading on subscriptions and other notifications in Octopus Deploy please see:

- [Subscriptions](/docs/administration/managing-infrastructure/subscriptions/)
- [Email Notifications](/docs/projects/built-in-step-templates/email-notifications/)

<span><a class="btn btn-secondary" href="/docs/getting-started/best-practices/releases-and-deployments">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/ongoing-maintenance">Next</a></span>
