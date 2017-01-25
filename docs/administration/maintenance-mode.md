---
title: Maintenance Mode
position: 14
---

If you are running an Octopus upgrade, applying Windows updates to your server, or you want to halt deployments for a time period, you may want to turn on Maintenance Mode. It disables all users, other than Octopus administrators, to edit projects and initiate deployments. It is managed from the **Configuration** area in Octopus, under the **Maintenance** tab.

![](/docs/images/5669968/5865693.png "width=500")

In order to avoid confusion and loss of data, give proper warning to project contributors before turning it on, as it will immediately stop allowing any changes or saves to be made by anyone other than administrators.

Once it is turned on, you will be notified of the status within the banner, and get error notifications if you attempt to save.

![](/docs/images/5669968/5865695.png "width=500")

Please note that if you manage High Availability nodes, and turn on Maintenance Mode for one node, all nodes will also turn on Maintenance Mode. [Read more about High Availability Nodes](http://docs.octopus.com/display/OD/Managing+High+Availability+Nodes)
