---
title: Managing High Availability Nodes

---


Managing the nodes in your Octopus Server High Availability cluster can be done on the **Nodes** tab in the **Configuration** area:


![](/docs/images/3048617/3278371.png "width=500")


Information regarding each of your nodes is displayed here.  You can see:

- **Rank**: follower or leader
- **Last seen**: the last time the node checked in
- **Tasks**: the number of task currently running on the node
- **Task cap**: the maximum number of tasks that may run on the node
- **Drain**: on or off depending on if the node can execute new tasks


## Rank


The nodes in your Octopus Server High Availability cluster can be either a leader or a follower.  Only one node can be the cluster leader and the rest of the nodes will be followers.  Some maintenance and scheduled tasks will only run on the cluster leader, such as:

- applying retention policy
- cleaning the package cache
- initiating Tentacle health checks (though the actual health check may be run by any node)
- re-indexing the built-in NuGet package repository



If your leader node goes offline or into drain mode, one of your followers will become the new leader.

**Example**

Node A joins the High Availability cluster and becomes *leader*


Node B joins the High Availability cluster and becomes *follower*


Node C joins the High Availability cluster and becomes *follower*





Node B is placed in maintenance mode so cannot become *leader*


Node A goes offline


Node C elects itself *leader*

## Last seen


Octopus Server nodes will check-in at regular intervals.  If an Octopus Server node goes offline a warning will be displayed and the time that it went offline can be determined by looking at the **last seen** field.


![](/docs/images/3048617/3278372.png "width=500")

## Tasks


Each Octopus Server node will execute tasks as they are queued. The **tasks** field displays the number of tasks currently running on that node. Following the active tasks link will display more information about all of the tasks for that node.

## Task cap


Each Octopus Server node can execute a maximum number of tasks in parallel.  This is to prevent death by multi-tasking. The **task cap** allows you to configure the maximum number of tasks for each node.  If more tasks are created than the total available task cap, the tasks will queue for up to a day until an Octopus Server node is available to execute the task.


You may consider setting a low cap for your Octopus Servers on poorer hardware or have a dedicated UI node with a low task cap to improve UI performance.

## Drain


The drain toggle can be used to prevent an Octopus Server node from executing any new tasks.  While draining:

- an Octopus Server node will finish running any tasks is it currently executing and then idle
- a leader will relinquish its leadership rank
- a follower will not become leader
- the Octopus Server ping url will not return 200 OK


## Load balancing


To distribute the load among Octopus Server nodes with a single point of access it is recommend to use a load balancer.  Octopus Server facilitates this by providing the url `/api/octopusservernodes/ping` for a load balancer to ping:


![](/docs/images/3048617/3278353.png)


The url will return HTTP status code 200 as long as the Octopus Server node is online and not in drain mode.

## Example procedure: installing Windows Updates


One of the great benefits of High Availability is the ability to perform maintenance on one node, while allowing other nodes to continue to perform deployments or server users.


For example, imagine it is time to install Windows Updates on one node. The process would be:

1. Use the *Drain* feature on the **Nodes** page to tell the node to continue executing any deployments that it is currently running, but not to start any new deployments (other nodes in the cluster will take over)
2. Once the node isn't executing any more deployments, remove it from the load balancer
3. Install updates, restart the node, etc. as required
4. Add the node back to the load balancer
5. Disable the *Drain* feature, so that the node can now execute deployments again
