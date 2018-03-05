---
title: Subscriptions
description: Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly.
position: 1600
version: "[3.5,)"
---

Subscriptions are available in **Octopus Deploy 3.5** and later


Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly. Both **email** and **webhook** notifications are currently supported.

Subscriptions can be accessed from the `Configuration` menu.

:::hint
**Running on an Octopus version below 3.12?**
For earlier versions of Octopus, Subscriptions can be accessed from the `Configuration` > `Audit` > `Subscriptions` menu. See the version-selector of the documentation to jump to your specific Octopus version.
:::

![](subscriptions-menu.png "width=800")

## Email Notifications {#Subscriptions-EmailNotifications}

Email notifications can be setup to send an email periodically to the users of one or more [teams](/docs/administration/managing-users-and-teams/index.md). Emails will be sent periodically according to the frequency you specify, and the email will include a digest of events that have occurred (up to a maximum of 100 events). For example, this can be useful if your team has setup automated deployments with the [Elastic and Transient Environment](/docs/infrastructure/environments/elastic-and-transient-environments/index.md) features of Octopus and wish to be notified if an auto-deployment is ever blocked or has failed.

Emails may also include a link to your Octopus Audit screen, filtered to match the events delivered in the email. To include this link, you need to have set the publicly-accessible URL of your Octopus instance (see the {{Configuration,Nodes,Configuration Settings}} menu or the [Server Configuration](/docs/administration/server-configuration/index.md) documentation for more details).

### Example

Let's say you have some critical projects and you want your administrators to receive an email if something is wrong with these deployments. You can setup an email subscription to notify your teams when these critical events have occurred.

Consider the following example:

![](subscriptions-email-example.png "width=800")

We can select the _Deployment-critical events_ group, which will automatically filter all deployment-critical events for us.

We can then select just the projects/environments we want to monitor. In this case: our _Infrastructure_ and _Code_ projects. Also, we only want to get notified when these critical events occur in our _Production_ environment.

So in this example, all users in the _Octopus Administrators_ team (with a valid email address) will receive an email notification for _Deployment-critical events_, in the _Infrastructure_ and _Code_ projects, that occurred in our _Production_ environment.

:::hint
**Dates and Timezone**
In this example, we have also configured the timezone dropdown so all dates shown in the emails will be in our preferred timezone.
:::

We can then hit _Save_ and this subscription will show up in our subscriptions list screen.

### Role permissions

Each email will be customized based on the user's roles, so they will only be emailed with events that they have permission to see. See the "Event Visibility and Permissions" section below for more details.


!partial <webhooks>

!partial <visibility>

!partial <troubleshooting>
