---
title: Auditing
position: 0
---


For team members to collaborate in the deployment of software, there needs to be trust and accountability. Octopus Deploy captures audit information whenever significant events happen in the system.


On this page:


- What does Octopus capture?
- Viewing the audit history

## What does Octopus capture?


Below is a short list of just some of the things that Octopus captures:

- Changes to [deployment processes](/docs/home/deploying-applications.md) and [variables](/docs/home/deploying-applications/variables.md)
- Create/modify/delete events for [projects](/docs/home/key-concepts/projects.md), [environments](/docs/home/key-concepts/environments.md), [deployment targets](/docs/home/deployment-targets.md), releases, and so on
- Environment changes, such as adding new deployment targets or modifying the environment a deployment target belongs to
- Queuing and cancelling of deployments and other tasks


## Viewing the audit history


You can view the full audit history by navigating to the **Audit** tab in the **Configuration** area.


![](/docs/images/3048138/3278051.png)


Some audit events will also include details, which you can see by clicking the **show details** link. For example:


![](/docs/images/3048138/3278050.png)


![](/docs/images/3048138/3278049.png)


This feature makes it extremely easy to see who made what changes on the Octopus Deploy server.

:::success
**Special audit view permission**
In Octopus 3.4 we have introduced a new Permission called **AuditView** which allows someone to view the audit logs without needing other permissions. Learn about [managing users and teams](/docs/home/administration/managing-users-and-teams.md).
:::
