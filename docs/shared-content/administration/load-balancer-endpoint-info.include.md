Octopus Server provides a health check endpoint for your load balancer to ping: `/api/octopusservernodes/ping`.

![](/docs/shared-content/administration/images/load-balance-ping.png "width=500")

Making a standard `HTTP GET` request to this URL on your Octopus Server nodes will return:

- HTTP Status Code `200 OK` as long as the Octopus Server node is online and not in [drain mode](#drain).
- HTTP Status Code `418 I'm a teapot` when the Octopus Server node is online, but it is currently in [drain mode](#drain) preparing for maintenance.
- Anything else indicates the Octopus Server node is offline, or something has gone wrong with this node.

:::hint
The Octopus Server node configuration is also returned as JSON in the HTTP response body.
:::

We typically recommend using a round-robin (or similar) approach for sharing traffic between the nodes in your cluster, as the Octopus Web Portal is stateless. 

Each node in the cluster keeps a local cache of data including user permissions. This cache is reloaded when a user's permissions change.

This means it is not necessary to enable session persistence on your load balancer.

All package uploads are sent as a POST to the REST API endpoint `/api/[SPACE-ID]/packages/raw`.  Because the REST API will be behind a load balancer, you'll need to configure the following on the load balancer:

- Timeout: Octopus is designed to handle 1 GB+ packages, which takes longer than the typical http/https timeout to upload.
- Request Size: Octopus does not have a size limit on the request body for packages.  Some load balancers only allow 2 or 3 MB files by default.