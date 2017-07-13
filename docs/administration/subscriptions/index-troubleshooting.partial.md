## Troubleshooting

Logs for subscriptions can be found in the `Configuration` menu under `Diagnostics` (see the `Subscription logs` tab). You can then click the `Verbose` flag to view all related information to help with troubleshooting.

### Event Group Listing
For a full list of all Event Groups, Events and Document types please refer to the [following reference page](/docs/administration/subscriptions/subscriptions-events.md)

### Email notification troubleshooting

If you are setting up email subscriptions for the first time and would like a good test SMTP server (before you involve your real SMTP servers), we have found [mailtrap.io](https://mailtrap.io/) to be extremely helpful. This can help you to see what the actual emails will look like once you involve your real SMTP servers.

### Webhook notification troubleshooting

If you are setting up webhook subscriptions for the first time and would like a simple test server where you can see the payloads that Octopus will actually send, we have found [request bin](https://requestb.in/) to be extremely helpful.

For example, to test whether the subscription webhooks are sending correctly from Octopus, you could setup a temporary request bin, and use that URL in your subscription to confirm whether the payload is sending successfully from Octopus. This will also show you a real-time payload of what your API can expect to receive from an Octopus webhook subscription.
