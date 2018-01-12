---
title: Auditing
description: Octopus Deploy captures audit information whenever significant events happen in the system.
position: 0
---

For team members to collaborate in the deployment of software, there needs to be trust and accountability. Octopus Deploy captures audit information whenever significant events happen in the system.

!toc

## What does Octopus capture? {#Auditing-WhatdoesOctopuscapture?}

Below is a short list of just some of the things that Octopus captures:

- Changes to [deployment processes](/docs/deploying-applications/index.md) and [variables](/docs/deployment-process/variables/index.md)
- Create/modify/delete events for [projects](/docs/deployment-process/projects/index.md), [environments](/docs/infrastructure/environments/index.md), [deployment targets](/docs/infrastructure/index.md), releases, and so on
- Environment changes, such as adding new deployment targets or modifying the environment a deployment target belongs to
- Queuing and canceling of deployments and other tasks

Some  general points worth noting:

- Octopus **does** capture the details of every mutating action (create/edit/delete) including who initiated the action
- Octopus **does not** capture login and logout events for specific user accounts
- Octopus **does not** capture when data is read, however certain sensitive actions like downloading a certificate with its private key is captured

If you are concerned that Octopus does not capture a specific action of interest to you, please contact our [support team](https://octopus.com/support).

## Viewing the audit history {#Auditing-Viewingtheaudithistory}

You can view the full audit history by navigating to the **Audit** tab in the **Configuration** area.

![](/docs/images/3048138/3278051.png "width=500")

Some audit events will also include details, which you can see by clicking the **show details** link. For example:

![](/docs/images/3048138/3278050.png "width=500")

![](/docs/images/3048138/3278049.png "width=500")

This feature makes it extremely easy to see who made what changes on the Octopus Deploy server.

## Security concerns

### Viewing audit logs

In Octopus 3.4 we have introduced a new permission called **AuditView** which allows someone to view the audit logs without needing other permissions. In earlier versions of Octopus you would require the **AdministerSystem** permission. Learn about [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

### Modifying and deleting audit logs is prevented

Octopus actively prevents modifying or deleting audit logs via its API. That being said, a user with the appropriate permissions to the `Events` table in your Octopus SQL Database could modify or delete records in that table. If you are concerned about this kind of tampering you should configure the permissions to the `Events` table in your Octopus SQL Database appropriately.
