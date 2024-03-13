---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Troubleshooting
description: Solutions to common problems with Octopus High Availability (HA).
navOrder: 60
---

If you're running into issues with Octopus High Availability it's possible you are running into one of the problems listed here. If this page doesn't help, please [email our support team](mailto:support@octopus.com).

## Node license limits exceeded

If you see the following licensing error, it means you have exceeded the number of active nodes:

*"Unfortunately your license limits have been exceeded, and you will no longer be able to create or deploy releases. Your Octopus Deploy license only allows X active nodes. You currently have Y active nodes."*

You can still login to your Octopus instance. You are only restricted from creating or deploying releases.

This may unintentionally occur if you have copied or moved your Octopus folders on your servers and you have multiple instances pointing to the same Octopus database.

### Instructions to remove unwanted nodes

If you go to your nodes screen **Configuration ➜ Nodes**, you can delete the node(s) that are no longer applicable using the Delete option in the node's ... overflow menu.

:::figure
![](/docs/administration/high-availability/troubleshooting/images/deleting-nodes.png)
:::

## Octopus Server starts and stops again

Something has gone wrong and the Octopus Server has crashed. Look at the Octopus Server log to see what has gone wrong.

You may see a message in the Octopus Server logs like this:

```
Could not find a part of the path 'Z:\Octopus\TaskLogs'
```

This usually means the drive `Z:\` has not been mapped for the user account running the Octopus Server, or the mapping has not been persisted across sessions. Drives are mounted per-user, so you need to create a persistent mapping for the user account the Octopus Server is running under.

You may see a message in the Octopus Server logs like this:

```
Access to the path 'Z:\Octopus\TaskLogs' is denied
```

This usually means the user account running the Octopus Server does not have the correct permissions to the file share. Make sure this user account has full control over each of the folders. You may need to share permissions, and check the ACLs on the actual folders.

## Task logs are empty for certain deployments

Sometimes you go to a deployment and there are no steps displayed, and detailed logs are not available for the deployment. Sometimes refreshing your browser fixes it and the logs come back. The cause for this is when you have not configured [shared storage](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises/#shared-storage) correctly. The most common situation is when you have configured each node to use a folder on a local disk instead of a shared network location.

To fix this problem you should:

1. Plan some downtime for your Octopus HA cluster.
2. Create shared storage as [described here](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises/#shared-storage).
3. Put your Octopus HA cluster into [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode) after draining tasks from each node.
3. Reconfigure your Octopus HA cluster to use the shared storage.
4. Copy all of the files into the shared storage location - there shouldn't be any filename collisions since each node will generally run independent tasks.
5. Bring your Octopus HA cluster back online.

## Deployment artifacts are not available for certain deployments

This has the same root cause as missing task logs - see above.

## Packages in the built-in repository are not available for some deployments

This has the same root cause as missing task logs - see above.

