---
layout: src/layouts/Default.astro
pubDate: 2026-08-19
modDate: 2026-10-22
navSection: Orphaned objects
title: Managing orphaned objects
navTitle: Orphaned objects
sidebarLabel: Orphaned objects
navOrder: 60
description: Stop monitoring Kubernetes objects that Octopus no longer deploys, and optionally delete them from your cluster.
subject: orphaned objects, Kubernetes, live object status, stop monitoring, delete, Kubernetes agent
type: guide
audience: [devops-eng, platform-eng]
image:
imageAlt:
---

When a deployment stops including an object that a previous release deployed, Octopus marks that object as **Orphaned** in Kubernetes Live Object Status, and it keeps running in your cluster until someone removes it. This page covers how to stop Octopus monitoring orphaned objects, either leaving them in your cluster or deleting them from it, from the **Kubernetes Live Status** tab of the [Environment status](/docs/projects/environment-status) page.

## Orphaned object removal

Removing an orphaned object takes it out of Kubernetes Live Object Status, so the object no longer appears in the Live Objects table or the orphaned object count. You choose whether the object also stays in your cluster, which lets you clean up what Octopus shows without touching workloads that something else still needs.

**Stopping monitoring** leaves the object in your cluster. It takes effect as soon as you confirm, with no task: Octopus stops tracking the object and tells the Kubernetes monitor to stop watching it. If a later deployment includes the object again, Octopus starts monitoring it again.

**Deleting from the cluster** queues a **Delete Kubernetes resources** task, which runs `kubectl delete` on the Kubernetes agent with a 5 minute timeout for each object. While the task runs, the object's sync status is **Deleting**. Octopus stops monitoring each object once the agent confirms it's gone. An object that fails to delete stays in the table, so you can try again. If some objects delete and others don't, the task deletes everything it can, records every outcome, and then fails. Deletion tasks can run at the same time as deployments.

Only top-level orphaned objects can be removed. Child objects, such as the Pods belonging to a Deployment, can't be removed from Octopus, for example to restart a service. Objects observed through Argo CD are never orphaned, so they can't be removed this way.

## Stop monitoring orphaned objects

Stop monitoring an orphaned object when it's still needed in your cluster, for example because another project or tool now manages it, but you no longer want Octopus to show it as orphaned.

**Before you begin**

You'll need:

- The `DeployedResourceAdminister` permission for the project, environment, and tenant. See [Permissions](#permissions).
- Orphaned objects reported by the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor).

To stop monitoring orphaned objects:

1. From the project, open the [Environment status](/docs/projects/environment-status) page for the environment (and tenant) you want.
2. Select the **Kubernetes Live Status** tab.
3. On the orphaned resources message above the Live Objects table, select **Review**.
   :::figure
   ![Live Status table showing orphaned objects](/docs/img/kubernetes/live-object-status/live-status-orphaned-objects.png)
   :::
4. In the **Remove orphaned resources** drawer, select the objects to stop monitoring. Objects are grouped by deployment target, so you can select a whole target or everything at once.
5. Select **Next**.
6. Review the objects listed, grouped by deployment target, and leave **Also delete from cluster** cleared.
7. Select **Stop monitoring**.

:::div{.hint}
To stop monitoring a single object, you can also open the row's **Resource actions** menu in the Live Objects table and select **Stop monitoring**, or select the object to open its drawer and select **Stop monitoring** there.
:::

The objects disappear from the Live Objects table, and the orphaned resources count goes down by the number of objects you selected. The objects are still in your cluster.

## Delete orphaned objects from the cluster

Delete an orphaned object from your cluster when nothing needs it any more. Octopus deletes the object and then stops monitoring it. You can't undo a deletion.

**Before you begin**

You'll need:

- The `DeployedResourceAdminister` permission for the project, environment, and tenant. See [Permissions](#permissions).
- A Kubernetes agent whose service account is allowed to delete the objects' kinds in their namespaces. See [Permissions](#permissions).
- Orphaned objects reported by the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor).

To delete orphaned objects from the cluster:

1. From the project, open the [Environment status](/docs/projects/environment-status) page for the environment (and tenant) you want.
2. Select the **Kubernetes Live Status** tab.
3. On the orphaned resources message above the Live Objects table, select **Review**.
4. In the **Remove orphaned resources** drawer, select the objects to delete. Objects are grouped by deployment target, so you can select a whole target or everything at once.
5. Select **Next**.
6. Review the objects listed, grouped by deployment target, and select **Also delete from cluster**.
7. Select **Delete resources**.

:::div{.hint}
To delete a single object, you can also open the row's **Resource actions** menu in the Live Objects table, or the object's drawer, select **Stop monitoring**, select **Also delete from cluster**, and then select **Delete resource**.
:::

Each object's sync status changes to **Deleting**, which links to the **Delete Kubernetes resources** task. When the task finishes, the deleted objects disappear from the Live Objects table.

If an object stays in your cluster or the deletion task fails, see [Troubleshooting deleting orphaned objects](/docs/kubernetes/live-object-status/troubleshooting#deleting-orphaned-objects).

## Permissions

Removing an orphaned object needs permission in Octopus to request it. Deleting an object from the cluster also needs permission in your cluster for the Kubernetes agent that carries it out.

| Action | Octopus permission | Cluster permission |
| :-- | :-- | :-- |
| Stop monitoring | `DeployedResourceAdminister` ("Administer deployed resources managed by Octopus"), scoped to the project, environment, and tenant | None |
| Delete from the cluster | `DeployedResourceAdminister` ("Administer deployed resources managed by Octopus"), scoped to the project, environment, and tenant | `delete` on each object's kind and namespace for the Kubernetes agent's service account. With the [permissions controller](/docs/kubernetes/targets/kubernetes-agent/granular-permissions), deletions run under the reserved step slug `octopus-kubernetes-resource-deletion` |

`DeployedResourceAdminister` is included by default in the **Project Contributor**, **Project Deployer**, **Project Lead**, and **Space Manager** built-in roles.

## Skipped objects

Octopus validates your selection when you confirm, and skips an object without removing it in the cases below. These apply to both stopping monitoring and deleting from the cluster.

| Reason | When Octopus skips the object |
| :-- | :-- |
| No longer orphaned | A deployment has included the object again. |
| Deletion in progress | A deletion task for the object is already queued or running. |
| Already removed | Octopus no longer tracks the object, or the monitor no longer reports it in the cluster. |
| Stale | Status information for the object is stale, so Octopus can't safely remove it. |

## Audit events

Octopus records removals on the **Audit** screen in **Configuration**, against the user who requested them.

| Action | Audit event | Details |
| :-- | :-- | :-- |
| Stop monitoring | **Kubernetes resource monitoring stopped**, one per request | Every object no longer monitored, grouped by deployment target |
| Delete from the cluster | One event per deletion task, whether it succeeded or failed | Every object with its outcome, grouped by deployment target, with failures first |

## Version notes

- Deleting orphaned Kubernetes objects is available from Octopus Server 2026.3.13597, with Kubernetes agent 2.38.3 or later (v2) or 3.0.1 or later (v3).
- Stopping monitoring orphaned Kubernetes objects without deleting them from the cluster is available from Octopus Server 2026.4.8535. Before 2026.4.8535, removing an orphaned object always deleted it from the cluster.

## Related links

- [Kubernetes Live Object Status](/docs/kubernetes/live-object-status)
- [Environment status](/docs/projects/environment-status)
- [Troubleshooting Live Object Status](/docs/kubernetes/live-object-status/troubleshooting)
- [Kubernetes agent permissions controller](/docs/kubernetes/targets/kubernetes-agent/granular-permissions)
