---
title: Subscriptions
description: Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly.
position: 16
version: "[3.9,)"
---

:::hint
Subscriptions are available in Octopus Deploy 3.5 and later
:::
markse-2
Subscriptions allow you to subscribe to events that are happening within Octopus, so you can be notified when events have occurred and react accordingly. Both email and webhook notifications are currently supported.

Subscriptions can be accessed from the Configuration menu.

## Email Notifications {#Subscriptions-EmailNotifications}

Email notifications can be setup to send an email periodically to the users of one or more [teams](/docs/administration/managing-users-and-teams/index.md). Emails will be sent periodically according to the frequency you specify, and the email will include a digest of events that have occurred (up to a maximum of 100 events). For example, this can be useful if your team has setup automated deployments with the [Elastic and Transient Environment](/docs/guides/elastic-and-transient-environments/index.md) features of Octopus and wish to be notified if an auto-deployment is ever blocked or has failed.

Emails may also include a link to your Octopus Audit screen, filtered to match the events delivered in the email. To include this link, you need to have set the publicly-accessible URL of your Octopus instance (see the {{Configuration,Nodes,Configuration Settings}} menu or the [Server Configuration](/docs/administration/server-configuration.md) documentation for more details).

## Webhook Notifications {#Subscriptions-WebhookNotifications}

Webhook notifications allow you to receive a JSON payload, posted to a specified URL when events have occurred.

Two payload types are supported

### Single event

In this payload type, each payload will contain a single event, and webhook requests will be sent for each event. The payload will have the following structure: 

```powershell
{
    "Timestamp": "2017-04-03T03:46:51.7930362+00:00",
    "EventType": "SubscriptionPayload",
    "Payload": {
        "ServerUri": null,
        "ServerAuditUri": null,
        "BatchProcessingDate": "2017-04-03T13:41:55.8150429+10:00",
        "Subscription": {
            "Id": "...",
            "Name": "...",
            "Type": 0,
            "IsDisabled": false,
            "EventNotificationSubscription": {
                "Filter": {
                    "Users": [],
                    "Projects": [],
                    "Environments": [],
                    "EventGroups": [],
                    "EventCategories": [],
                    "Tenants": [],
                    "Tags": []
                },
                "EmailTeams": [],
                "EmailFrequencyPeriod": "01:00:00",
                "EmailDigestLastProcessed": null,
                "EmailDigestLastProcessedEventAutoId": null,
                "EmailShowDatesInTimeZoneId": "...",
                "WebhookURI": "...",
                "WebhookTeams": [],
                "WebhookLastProcessed": null,
                "WebhookLastProcessedEventAutoId": 1234,
                "WebhookPayloadType": 0,
                "WebhookFrequencyPeriod": "00:02:00"
            },
            "Links": {
                "Self": {}
            }
        },
        "Event": {
            "Id": "Events-1234",
            "RelatedDocumentIds": ["...", "..."],
            "Category": "...",
            "UserId": "...",
            "Username": "...",
            "IdentityEstablishedWith": "...",
            "Occurred": "2017-04-03T03:07:16.7681579+00:00",
            "Message": "...",
            "MessageHtml": "...",
            "MessageReferences": [{
                "ReferencedDocumentId": "...",
                "StartIndex": 8,
                "Length": 7
            }],
            "Comments": null,
            "Details": "...",
            "Links": {
                "Self": {}
            }
        },
        "BatchId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "TotalEventsInBatch": 1234,
        "EventNumberInBatch": 123
    }
}
```

### Digest of events

In this payload type, each payload will include an array of all events in the batch, up to a maximum of 100 events. Only one webhook will be sent with this payload. The payload will have the following structure: 

```powershell
{
    "Timestamp": "2017-04-03T03:46:51.7930362+00:00",
    "EventType": "SubscriptionPayload",
    "Payload": {
        "ServerUri": null,
        "ServerAuditUri": null,
        "BatchProcessingDate": "2017-04-03T13:41:55.8150429+10:00",
        "Subscription": {
            "Id": "...",
            "Name": "...",
            "Type": 0,
            "IsDisabled": false,
            "EventNotificationSubscription": {
                "Filter": {
                    "Users": [],
                    "Projects": [],
                    "Environments": [],
                    "EventGroups": [],
                    "EventCategories": [],
                    "Tenants": [],
                    "Tags": []
                },
                "EmailTeams": [],
                "EmailFrequencyPeriod": "01:00:00",
                "EmailDigestLastProcessed": null,
                "EmailDigestLastProcessedEventAutoId": null,
                "EmailShowDatesInTimeZoneId": "...",
                "WebhookURI": "...",
                "WebhookTeams": [],
                "WebhookLastProcessed": null,
                "WebhookLastProcessedEventAutoId": 1234,
                "WebhookPayloadType": 0,
                "WebhookFrequencyPeriod": "00:02:00"
            },
            "Links": {
                "Self": {}
            }
        },
        "Events": [ {
            "Id": "Events-1234",
            "RelatedDocumentIds": ["...", "..."],
            "Category": "...",
            "UserId": "...",
            "Username": "...",
            "IdentityEstablishedWith": "...",
            "Occurred": "2017-04-03T03:07:16.7681579+00:00",
            "Message": "...",
            "MessageHtml": "...",
            "MessageReferences": [{
                "ReferencedDocumentId": "...",
                "StartIndex": 8,
                "Length": 7
            }],
            "Comments": null,
            "Details": "...",
            "Links": {
                "Self": {}
            }
        }, {
            "Id": "Events-1234",
            "RelatedDocumentIds": ["...", "..."],
            "Category": "...",
            "UserId": "...",
            "Username": "...",
            "IdentityEstablishedWith": "...",
            "Occurred": "2017-04-03T03:07:16.7681579+00:00",
            "Message": "...",
            "MessageHtml": "...",
            "MessageReferences": [{
                "ReferencedDocumentId": "...",
                "StartIndex": 8,
                "Length": 7
            }],
            "Comments": null,
            "Details": "...",
            "Links": {
                "Self": {}
            }
        }],
        "BatchId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "TotalEventsInBatch": 2,
        "IsPayloadTruncated": false
    }
}
```

### Payload properties

| Property                 | Description                              | Exclusive to payload Type  |
| -----------------------  | ---------------------------------------- | |
| ServerUri                | The Octopus server that generated this webhook \* | |
| ServerAuditUri           | The URL to the Octopus server's audit screen where this event may be found in more detail \* | |
| Subscription             | The subscription object that triggered this webhook (including all filtering criteria so you can see exactly why you are receiving this webhook) | |
| Event                    | The event object that this webhook is responding to | Single |
| Events                   | The event objects that this webhook is responding to | Digest |
| BatchProcessingDate      | The processing date for the current batch. For 'Single' payload types, the events will be sent in batches. The batch date is included here for your reference | |
| BatchId                  | A unique GUID given to the current batch of events being processed | |
| TotalEventsInBatch       | The total number of events, in the current batch of events being processed | |
| EventNumberInBatch       | The event number of this event, in the current batch of events being processed | Single |
| IsPayloadTruncated       | A boolean value that indicates whether the `Events` array has reached the maximum of 100 and was truncated | Digest |

\* This property will be null unless the publicly-accessible URL has been set for your Octopus instance (see the {{Configuration,Nodes,Configuration Settings}} menu).


## Event Visibility and Permissions {#Subscriptions-EventVisibilityandPermissions}

Because certain teams may be restricted to only see certain events, subscriptions give you the ability to scope to one or more teams. Teams may be restricted to certain criteria, such as project(s) and/or environment(s). Combine these restrictions with team roles and you can successfully control which events get seen for a given subscription. See more information on [Managing Users and Teams](/docs/administration/managing-users-and-teams/index.md) as well as our [User Roles](/docs/administration/managing-users-and-teams/user-roles.md) documentation if you wish to learn more.

## Troubleshooting

Logs for subscriptions can be found in the `Configuration` menu under `Diagnostics` (see the `Subscription logs` tab).