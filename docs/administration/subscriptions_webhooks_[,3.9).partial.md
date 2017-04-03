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

\* This property will be null unless the publicly-accessible URL has been set for your Octopus instance (see the {{Configuration,Nodes,Configuration Settings}} menu).