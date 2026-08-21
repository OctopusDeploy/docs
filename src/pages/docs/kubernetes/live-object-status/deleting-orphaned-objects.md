---
layout: src/layouts/Default.astro
pubDate: 2026-08-19
modDate: 2026-08-21
navSection: Deleting orphaned objects
title: Deleting orphaned objects
navTitle: Deleting orphaned objects
description: How to review and delete Kubernetes objects that Octopus no longer deploys but that are still running in your cluster.
navOrder: 60
---

When a deployment stops including an object that a previous release deployed, Octopus marks that object as **Orphaned** in Kubernetes Live Object Status, and it keeps running in your cluster until someone removes it. Octopus can delete orphaned objects for you, one at a time or in bulk, from the project's Live Status page.

## Requirements

To delete orphaned objects you need:

- Octopus Server 2026.3 or later
- Every Kubernetes monitor in the application on agent version 2.38.3 or later (v2) / 3.0.1 or later (v3), the same requirement as orphan tracking itself
- The `DeployedResourceAdminister` permission for the project, environment, and tenant you are deleting in
- A Kubernetes agent whose service account is allowed to delete the objects in question
- Objects reported by the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor). Objects observed through Argo CD are never orphaned and cannot be deleted this way

## Delete a single orphaned object

The Live Status table offers a delete action on every orphaned row. To delete one orphaned object:

1. Open your project.
2. Select **Live Status** for the environment (and tenant) you want.
3. Find the orphaned object. To list only orphaned objects, use the **Sync status** filter and select **Orphaned**.
4. Open the row's **Resource actions** menu and choose **Review & delete**.
5. Confirm in the **Delete orphaned resource** dialog by choosing **Delete**.

You can also select the object to open its detail drawer and use the **Delete** button there.

The object's Sync Status changes to **Deleting** while the task runs, then the object drops out of the Live Status table once the monitor reports it as gone. If it stays orphaned, or the deletion fails, see [deleting orphaned objects](/docs/kubernetes/live-object-status/troubleshooting#deleting-orphaned-objects).

## Delete orphaned objects in bulk

When an application has orphaned objects, the Live Status page shows a card counting them. To delete several orphaned objects at once:

1. Choose **Review & delete** on that card to open the **Delete orphaned resources** drawer.
2. Select the objects to delete. Objects are grouped by deployment target, so you can select a whole target or everything at once.
3. Choose **Next**.
4. Review the **Confirm deletion** step, which lists every selected object grouped by deployment target.
5. Choose **Delete**.

Every selected object moves to a Sync Status of **Deleting**, and the card's count falls as the objects leave the table. If any stay orphaned, or the deletion fails, see [deleting orphaned objects](/docs/kubernetes/live-object-status/troubleshooting#deleting-orphaned-objects).

## The deletion task

Deletion is asynchronous. Each request queues one **Delete Kubernetes resources** task, and the **Deleting** Sync Status links to it. Octopus runs one deletion task at a time per project, environment, and tenant, and deletion tasks do not queue behind deployments.

Deletion uses kubectl's default propagation behavior, so Kubernetes garbage collects any dependent objects the deleted object owns. Deleting a Deployment therefore also removes its ReplicaSets and Pods.

If some objects delete and others don't, the task deletes everything it can, records every outcome, and then fails. Objects that succeeded stay deleted, and a failed object returns to **Orphaned** with a link to the task log. Cancelling the task leaves in-flight deletions unresolved, because Octopus cannot tell what the agent had already deleted.

Octopus validates your selection when you confirm, and silently skips an object when:

- The object is no longer orphaned, most likely because a deployment re-added it.
- A deletion task for the object is already queued or running.
- The monitor no longer reports the object in the cluster, so there is nothing to delete.
- Status information for the object is stale, so Octopus cannot safely delete it.

Stale objects are the common one. When a Kubernetes monitor stops reporting, everything it owns goes stale and cannot be deleted until the monitor reconnects. See [I can't delete an object because its status is stale](/docs/kubernetes/live-object-status/troubleshooting#cannot-delete-stale-object).

## Permissions

Deleting an orphaned object needs permission in two places: in Octopus, to request the deletion, and in your cluster, for the agent that carries it out.

### Octopus permissions

Requesting a deletion requires the `DeployedResourceAdminister` permission ("Administer deployed resources managed by Octopus"), scoped to the project, environment, and tenant. It is included by default in the **Project Contributor**, **Project Deployer**, **Project Lead**, and **Space Manager** built-in roles, and is added to those roles on existing instances when you upgrade.

### Cluster permissions

Octopus deletes objects by running `kubectl delete` on the Kubernetes agent, so the deletion uses the **agent's** service account. Make sure that account is allowed to delete the kinds and namespaces you expect to clean up. When you use the [permissions controller](/docs/kubernetes/targets/kubernetes-agent/granular-permissions) to scope permissions per step, deletions run under the reserved step slug `octopus-kubernetes-resource-deletion`.

## Auditing

Every deletion task writes one audit event to the **Audit** screen in **Configuration**, succeeded or failed, recorded against the user who requested it. Its details list every object with its outcome, grouped by deployment target, with failures first.

## Known limitations

- Only top-level orphaned objects can be deleted. Child objects, such as Pods belonging to a Deployment can't be deleted from Octopus to restart a service.
- You cannot stop tracking an orphaned object without deleting it. If the object is still needed by something else, delete it and recreate it from a different project.

## Learn more

- [Kubernetes Live Object Status](/docs/kubernetes/live-object-status)
- [Orphaned objects](/docs/kubernetes/live-object-status#orphaned-objects)
- [Troubleshooting Live Object Status](/docs/kubernetes/live-object-status/troubleshooting)
- [Kubernetes agent permissions controller](/docs/kubernetes/targets/kubernetes-agent/granular-permissions)
