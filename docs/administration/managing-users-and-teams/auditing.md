---
title: Auditing
description: Octopus Deploy captures audit information whenever significant events happen in the system.
position: 30
---

For team members to collaborate in the deployment of software, there needs to be trust and accountability. Octopus Deploy captures audit information whenever significant events happen in the system.

!toc

## What Does Octopus Capture? {#Auditing-WhatdoesOctopuscapture?}

Below is a short list of just some of the things that Octopus captures:

- Changes to [deployment processes](/docs/deployment-examples/index.md) and [variables](/docs/deployment-process/variables/index.md).
- Create/modify/delete events for [projects](/docs/deployment-process/projects/index.md), [environments](/docs/infrastructure/environments/index.md), [deployment targets](/docs/infrastructure/index.md), releases, and so on.
- Environment changes, such as adding new deployment targets or modifying the environment a deployment target belongs to.
- Queuing and canceling of deployments and other tasks.

Some  general points worth noting:

- Octopus **does** capture the details of every mutating action (create/edit/delete) including who initiated the action.
- Octopus **does not** capture login and logout events for specific user accounts.
- Octopus **does not** capture when data is read, however certain sensitive actions like downloading a certificate with its private key is captured.

If you are concerned that Octopus does not capture a specific action of interest to you, please contact our [support team](https://octopus.com/support).

## Viewing the Audit History {#Auditing-Viewingtheaudithistory}

You can view the full audit history by navigating to the **Audit** tab in the **Configuration** area.

![Audit Configuration](/docs/images/3048138/3278051.png "width=500")

Some audit events will also include details, which you can see by clicking the **show details** link. For example:

![Audit Event Details](/docs/images/3048138/3278050.png "width=500")

![Audit Event Details extended](/docs/images/3048138/3278049.png "width=500")

This feature makes it extremely easy to see who made what changes on the Octopus Deploy Server.

## Security Concerns

We take great care to ensure the security and integrity of your audit logs, to make sure they are a trustworthy indelible record of every important activity in your Octopus installation. If you have any concerns please [reach out to us](https://octopus.com/support).

### Viewing Audit Logs

To grant a user access to audit logs you can make use of a built-in User Role that contains **EventView**. All project related user roles contain it. **EventView** can also be scoped to narrow down which audit information a user can see, for example, it can be restricted to specific Projects or Environments. Learn more about [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

In **Octopus 2019.1** we removed **AuditView** in an effort to simplify permissions so only **EventView** is now required.

### Modifying and Deleting Audit Logs is Prevented

Octopus actively prevents modifying or deleting audit logs via its API. That being said, a user with the appropriate permissions to the `Events` table in your Octopus SQL Database could modify or delete records in that table. If you are concerned about this kind of tampering you should configure the permissions to the `Events` table in your Octopus SQL Database appropriately.

### Sensitive Values in Audit Logs

If you make a change to a sensitive value in Octopus, you will notice we write an audit log showing the fact the sensitive value changed. The value we show in the audit log is simply **an indicator the value has changed**. This is **not** the unencrypted/raw value. This is **not** even the encrypted value.

We take the sensitive value and hash it using an irreversible hash algorithm. We then encrypt that hash with a new, unique, non-deterministic salt. We use this irreversible value as an indicator that the sensitive value actually changed in some way.
