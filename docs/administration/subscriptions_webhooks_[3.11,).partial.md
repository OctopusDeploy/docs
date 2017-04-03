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
