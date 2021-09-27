Octopus Server provides a health check endpoint for your load balancer to ping: `/api/octopusservernodes/ping`.

Making a standard `HTTP GET` request to this URL on your Octopus Server nodes will return:

- HTTP Status Code `200 OK` as long as the Octopus Server node is online and not in [drain mode](#drain).
- HTTP Status Code `418 I'm a teapot` when the Octopus Server node is online, but it is currently in [drain mode](#drain) preparing for maintenance.
- Anything else indicates the Octopus Server node is offline, or something has gone wrong with this node.

:::hint
The Octopus Server node configuration is also returned as JSON in the HTTP response body.
:::