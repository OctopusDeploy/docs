In this scenario, a type of [Network Address Translation (NAT)](https://en.wikipedia.org/wiki/Network_address_translation) is leveraged by using the same address and **unique ports**, usually routed through a load balancer or other network device. Each Octopus node would be configured to listen on a different port (starting at `10943` by default) for inbound traffic. 

:::hint
The advantage of using unique ports is that the Polling Tentacle doesn't need to know each node's address, only the port. The address translation is handled by the load balancer. This allows each node to have a private IP address, with no public access from outside your network required.
:::

Imagine a three-node HA cluster. For each one, we expose a different port to listen on using the [Octopus.Server configure command](/docs/octopus-rest-api/octopus.server.exe-command-line/configure.md):

- Node1 - Port `10943`
- Node2 - Port `10944`
- Node3 - Port `10945`

Next on the load balancer, create Network Address Translation (NAT) rules and point them to each node in your HA Cluster:
- Open port `10943` and route traffic to **Node1** in your HA Cluster
- Open port `10944` and route traffic to **Node2** in your HA Cluster
- Open port `10945` and route traffic to **Node3** in your HA Cluster
- Continue for any additional nodes in your HA cluster.

If you configured your nodes to use a different listening port, replace `10943`-`10945` with your port range. 

The important thing to remember is that each node should be using the **same address** and a **different port**. 
