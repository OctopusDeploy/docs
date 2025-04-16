---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-04-16
title: Subscriptions
description: Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly.
navOrder: 1600
---

Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly. Both **email** and **webhook** notifications are currently supported.

Subscriptions can be accessed from the `Configuration` menu.

:::div{.hint}
**Running on an Octopus version below 3.12?**
For earlier versions of Octopus, Subscriptions can be accessed from the **Configuration ➜ Audit ➜ Subscriptions** menu.
:::

:::figure
![](/docs/administration/managing-infrastructure/subscriptions/images/subscriptions-menu.png)
:::

## Email notifications {#Subscriptions-EmailNotifications}

Email notifications can be setup to send an email periodically to the users of one or more [teams](/docs/security/users-and-teams/). Emails will be sent periodically according to the frequency you specify, and the email will include a digest of events that have occurred (up to a maximum of 100 events). For example, this can be useful if your team has setup automated deployments with the [Elastic and Transient Environment](/docs/deployments/patterns/elastic-and-transient-environments) features of Octopus and wish to be notified if an auto-deployment is ever blocked or has failed.

Emails may also include a link to your Octopus Audit screen, filtered to match the events delivered in the email. To include this link, you need to have set the publicly-accessible URL of your Octopus instance (see the **Configuration ➜ Nodes ➜ Configuration Settings** menu or the [Server Configuration](/docs/administration/managing-infrastructure/server-configuration) documentation for more details).

## Example

[Getting Started - Subscriptions](https://www.youtube.com/watch?v=wtBrGaAMqfM)

Let's say you have some critical projects and you want your administrators to receive an email if something is wrong with these deployments. You can setup an email subscription to notify your teams when these critical events have occurred.

Consider the following example:

:::figure
![](/docs/administration/managing-infrastructure/subscriptions/images/subscriptions-email-example.png)
:::

We can select the _Deployment-critical events_ group, which will automatically filter all deployment-critical events for us.

We can then select just the projects/environments we want to monitor. In this case: our _Infrastructure_ or _Code_ projects. Also, we only want to get notified when these critical events occur in our _Production_ environment.

So in this example, all users in the _Octopus Administrators_ team (with a valid email address) will receive an email notification for _Deployment-critical events_, in the _Infrastructure_ or _Code_ projects, that occurred in our _Production_ environment.

:::div{.hint}
Each filter you add is an "AND," while each option you add to the filter is an "OR."

A subscription with the filters:
- Event Categories: Deployment Started
- Environments: Staging, Production
- Projects: Hello World

That filter is translated to look for events where the category is Deployment Started AND for the environments Staging OR Production AND for the project Hello World.  
:::

You can read more about getting started with notifications in our [Getting Started guide](/docs/getting-started/best-practices/notifications).

:::div{.hint}
**Dates and Timezone**
In this example, we have also configured the timezone drop-down so all dates shown in the emails will be in our preferred timezone.
:::

We can then hit _Save_ and this subscription will show up in our subscriptions list screen.

## Role permissions

Each email will be customized based on the user's roles, so they will only be emailed with events that they have permission to see. See the "Event Visibility and Permissions" section below for more details.


## Webhook notifications {#Subscriptions-WebhookNotifications}

Webhook notifications allow you to receive a JSON payload, posted to a specified URL when events have occurred. Webhook notifications will be sent **per event** (unlike email notifications that send a digest of events) and will include a payload with the following structure:

```powershell
{
  "Timestamp": "0001-01-01T00:00:00+00:00",
  "EventType": "SubscriptionPayload",
  "Payload": {
    "ServerUri": "http://my-octopus.com",
    "ServerAuditUri": "http://my-octopus.com",
    "Subscription": {},
    "Event": {},
    "BatchProcessingDate": "0001-01-01T00:00:00+00:00",
    "BatchId": "[guid]",
    "TotalEventsInBatch": "3",
    "EventNumberInBatch": "10"
  }
}
```

The `Payload` includes:

| Property                     | Hint | Description |
| ---------------------------- | ---- | ----------- |
| ServerUri                    | \* |  The Octopus Server that generated this webhook |
| ServerAuditUri               | \* | The URL to the Octopus Server's audit screen where this event may be found in more detail |
| Subscription                 | | The subscription object that triggered this webhook (including all filtering criteria so you can see exactly why you are receiving this webhook) |
| Event                        | | The event object that this webhook is responding to |
| BatchProcessingDate          | | The processing date for the current batch. For 'Single' payload types, the events will be sent in batches. The batch date is included here for your reference |
| BatchId                      | \** | A unique GUID given to the current batch of events being processed |
| TotalEventsInBatch           | \** | The total number of events, in the current batch of events being processed |
| EventNumberInBatch           | \** | The event number of this event, in the current batch of events being processed |

\* This property will be null unless the publicly-accessible URL has been set for your Octopus instance (see the **Configuration ➜ Nodes ➜ Configuration Settings** menu).

\** This property is available since version `3.12.5`

:::div{.hint}
**Consuming Events**
While we make every effort to ensure events are only ever sent *once* to a given email or webhook subscription, we can offer no guarantees and advise that you design your consuming API with this in mind.
:::


## Event visibility and permissions {#Subscriptions-Event-Visibility-and-Permissions}

Because certain teams may be restricted to only see certain events, subscriptions give you the ability to scope to one or more teams. Teams may be restricted to certain criteria, such as project(s) and/or environment(s). Combine these restrictions with team roles and you can successfully control which events get seen for a given subscription. See more information on [Managing Users and Teams](/docs/security/users-and-teams/) as well as our [User Roles](/docs/security/users-and-teams/user-roles) documentation if you wish to learn more.

## Troubleshooting

Logs for subscriptions can be found in the `Configuration` menu under `Diagnostics` (see the `Subscription logs` tab). You can then click the `Verbose` flag to view all related information to help with troubleshooting.

## Email notification troubleshooting

If you are setting up email subscriptions for the first time and would like a good test SMTP server (before you involve your real SMTP servers), we have found [mailtrap.io](https://mailtrap.io/) to be extremely helpful. This can help you to see what the actual emails will look like once you involve your real SMTP servers.

## Webhook notification troubleshooting

If you are setting up webhook subscriptions for the first time and would like a simple test server where you can see the payloads that Octopus will actually send, we have found [RequestBin](https://requestbin.com/) to be extremely helpful.

For example, to test whether the subscription webhooks are sending correctly from Octopus, you could setup a temporary RequestBin, and use that URL in your subscription to confirm whether the payload is sending successfully from Octopus. This will also show you a real-time payload of what your API can expect to receive from an Octopus webhook subscription.

## Subscription events

The following is a list of all options for subscriptions including Event Groups, Events, and Document Types:

| EVENT GROUPS                                  |
|-----------------------------------------------|
| API key expiry events                         |
| Auto-deploy events                            |
| Auto-Deploy critical-events                   |
| Certificate expiry events                     |
| Deployment critical-events                    |
| Deployment events                             |
| Document events                               |
| License key expiry events \*                  |
| License usage events \*\*                     |
| Machine becomes available for deployment      |
| Machine critical-events                       |
| Machine events                                |
| Machine health changed                        |
| Machine is no longer available for deployment |

| EVENTS                                                 |
|--------------------------------------------------------|
| API key expired                                        |
| API key expiry 10-day warning                          |
| API key expiry 20-day warning                          |
| Artifact content modified                              |
| Attachment deleted                                     |
| Auto-deploy trigger blocked                            |
| Auto-deploy trigger succeeded                          |
| Build Information created                              |
| Build Information deleted                              |
| Build Information modified                             |
| Certificate expired                                    |
| Certificate expiry 10-day warning                      |
| Certificate expiry 20-day warning                      |
| Certificate private-key exported                       |
| Certificate replaced                                   |
| Comment                                                |
| Deployment failed                                      |
| Deployment precondition evaluated                      |
| Deployment queued                                      |
| Deployment resumed                                     |
| Deployment started                                     |
| Deployment succeeded                                   |
| Document created                                       |
| Document deleted                                       |
| Document modified                                      |
| Export complete                                        |
| File downloaded                                        |
| Guided failure interruption raised                     |
| Import complete                                        |
| IP address banned                                      |
| License key expired \*                                 |
| License key expiry 10-day warning \*                   |
| License key expiry 20-day warning \*                   |
| License usage at 80% warning \*\                       |
| License usage at 90% warning \*\*                      |
| License usage at 95% warning \*\*                      |
| License usage at limit \*\*                            |
| Login banned                                           |
| Login failed                                           |
| Login succeeded                                        |
| Machine cleanup failed                                 |
| Machine created                                        |
| Machine deleted                                        |
| Machine deployment-related property modified           |
| Machine disabled                                       |
| Machine enabled                                        |
| Machine found healthy                                  |
| Machine found to be unavailable                        |
| Machine found to be unhealthy                          |
| Machine found to have warnings                         |
| Manual intervention interruption raised                |
| Package deleted by package repository index sync       |
| Package deleted by package repository retention policy |
| Package replaced                                       |
| Project export complete                                |
| Project export queued                                  |
| Project import complete                                |
| Project import queued                                  |
| Release deleted by retention policy                    |
| Runbook run deleted by retention policy                |
| Runbook snapshot deleted by retention policy           |
| Runbook snapshot published                             |
| RunbookRun failed                                      |
| RunbookRun queued                                      |
| RunbookRun resumed                                     |
| RunbookRun started                                     |
| RunbookRun succeeded                                   |
| Task canceled                                          |
| User password changed                                  |

| DOCUMENT TYPES                       |
|--------------------------------------|
| Account                              |
| Action Template                      |
| Action Template Version              |
| Api Key                              |
| Artifact                             |
| Auto Deploy Queue Item               |
| Build Information                    |
| Certificate                          |
| Channel                              |
| Community Action Template            |
| Connect Project to Tenants Task      |
| Dashboard Configuration              |
| Data Migration State                 |
| Deleted Space                        |
| Deployment                           |
| Deployment Completion                |
| Deployment Environment               |
| Deployment Freeze                    |
| Deployment Freeze Override           |
| Deployment History                   |
| Deployment Process                   |
| Deployment Settings                  |
| Deployment Target Tag                |
| Deprecation Usage                    |
| Event                                |
| Extension Configuration              |
| Feature Toggle                       | 
| Feature Toggle Publishing Signing Key |
| Feed                                 |
| Git Credential                       | 
| Git Hub App Connection               |
| Git Hub App Token                    |
| Insights Report                      |
| Interruption                         |
| Invitation                           |
| Kubernetes Monitor                   |
| Kubernetes Resource Manifest         |
| Kubernetes Task Resource Status      |
| Library Variable Set                 |
| Lifecycle                            |
| Machine                              |
| Machine Policy                       |
| Octopus Server Node                  | 
| Process Execution                    |
| Project                              |
| Project Group                        |
| Project Intents                      |
| Project Trigger                      |
| Proxy                                |
| Release                              |
| Runbook                              |
| Runbook Process                      |
| Runbook Run                          |
| Runbook Run History                  |
| Runbooks Snapshot                    |
| Sample Project                       |
| Scoped User Role                     |
| Server Task                          |
| Server Task Approval                 |
| Server Account Oidc Identity         |
| Signing Key                          |
| Space                                |
| Subscription                         |
| Tag Set                              |
| Team                                 |
| Tenant                               |
| Tenant Variable                      |
| User                                 |
| User Favorite Project                |
| User Onboarding                      |
| User Role                            |
| User Session                         |
| Variable Set                         |
| Worker                               |
| Worker Pool                          |
| Worker Task Lease                    |

\* License key expiry events are only available in Octopus Server version `2025.2.6402` and later.

\*\* License usage events are only available in Octopus Server version `2025.2.7065` and later.
