Whilst a Tentacle could poll a load balancer in an Octopus High Availability cluster, there is a risk, depending on your load balancer configuration, that the Tentacle will not poll all servers in a timely manner.

We recommend two options when configuring Polling Tentacles to connect to your Octopus High Availability cluster:

- Using a **unique address**, and the same listening port (`10943` by default) for each node.
- Using the same address and a **unique port** for each node.

These are discussed further in the next sections.