In this scenario, no load balancer is required. Instead, each Octopus node would be configured to listen on the same port (`10943` by default) for inbound traffic. In addition, each node would be able to be reached directly by your Polling Tentacle on a unique address for the node.

For each node in your HA cluster:

- Ensure the communication port Octopus listens on (`10943` by default) is open, including any firewall.
- Register the node with the [Poll Server command line](/docs/octopus-rest-api/tentacle.exe-command-line/poll-server.md) option. Specify the unique address for the node, including the listening port. For example, in a three-node cluster:
    - Node1 would use address: **Octo1.domain.com:10943** 
    - Node2 would use address: **Octo2.domain.com:10943** 
    - Node3 would use address: **Octo3.domain.com:10943** 

The important thing to remember is that each node should be using a **unique address** and the **same port**. 

:::hint
**Tip:**
A Polling Tentacle will connect to the Octopus Rest API over ports 80 or 443 when it is registering itself with the Octopus Server. After that, it will connect over port `10943` (by default) with the Octopus Server node.

It's important to ensure that any firewalls also allow port 80 or 443 for the initial Tentacle registration.
:::