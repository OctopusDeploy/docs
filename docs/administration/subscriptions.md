---
title: Subscriptions
position: 16
---


:::hint
Subscriptions are available in Octopus Deploy 3.5 and later
:::


Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly. Both email and webhook notifications are currently supported.


Subscriptions can be accessed from the Audit screen from of the Configuration menu.


![](/docs/images/5670596/5865722.png)

## Email Notifications


Email notifications can be setup to send an email periodically to the users of one or more [teams](/docs/home/administration/managing-users-and-teams.md). Emails will be sent periodically according to the frequency you specify, and the email will include a digest of events that have occurred (up to a maximum of 100 events). For example, this can be useful if your team has setup automated deployments with the [Elastic and Transient Environment](/docs/home/guides/elastic-and-transient-environments.md) features of Octopus and wish to be notified if an auto-deployment is ever blocked or has failed.


Emails may also include a link to your Octopus Audit screen, filtered to match the events delivered in the email. To include this link, you need to have set the publicly-accessible URL of your Octopus instance (see the *Configuration > Nodes > Configuration Settings* menu or the [Server Configuration](/docs/home/administration/server-configuration.md) documentation for more details).

## Webhook Notifications


Webhook notifications allow you to receive a JSON payload, posted to a specified URL when events have occurred. Webhook notifications will be sent **per event** (unlike email notifications that send a digest of events) and will include a payload with the following structure:

```powershell
{
  "Timestamp": "0001-01-01T00:00:00+00:00",
  "EventType": "SubscriptionPayload",
  "Payload": {
    "ServerUri": "http://my-octopus.com",
    "ServerAuditUri": "http://my-octopus.com",
    "BatchProcessingDate": "0001-01-01T00:00:00+00:00",
    "Subscription": {},
    "Event": {}
  }
}
```


The `Payload` includes:

- **ServerUri**: The Octopus server that generated this webhook \*.
- **ServerAuditUri**: The URL to the Octopus server's audit screen where this event may be found in more detail \*.
- **BatchProcessingDate**: Because subscriptions are run from a schedule every 30 seconds within Octopus, when events have been found that match the subscription's filtering criteria and a webhook has been setup to respond to those events, the results will be processed in batches. The batch date is included here for your reference.
- **Subscription**: The subscription object that triggered this webhook (including all filtering criteria so you can see exactly why you are receiving this webhook).
- **Event**: The event object that this webhook is responding to.



\* This property will be null unless the publicly-accessible URL has been set for your Octopus instance (see the *Configuration > Nodes > Configuration Settings* menu).

## Event Visibility and Permissions


Because certain teams may be restricted to only see certain events, subscriptions give you the ability to scope to one or more teams. Teams may be restricted to certain criteria, such as project(s) and/or environment(s). Combine these restrictions with team roles and you can successfully control which events get seen for a given subscription. See more information on [Managing Users and Teams](/docs/home/administration/managing-users-and-teams.md) as well as our [User Roles](/docs/home/administration/managing-users-and-teams/user-roles.md) documentation if you wish to learn more.
