---
layout: src/layouts/Default.astro
pubDate: 2026-10-26
modDate: 2026-10-26
title: Octopus Cloud support user
sidebarLabel: Octopus Cloud support user
navTitle: Octopus Cloud support user
navOrder: 16
description: How and when Octopus support creates a temporary support user on your Octopus Cloud instance, what it can access, and how its actions are audited.
subject: Octopus Cloud, support user, Octopus Administrators, permissions, audit logs, customer support
type: concept
audience: [admin]
image:
imageAlt:
---

A support user is an account that can be created by a support or engineering team member at Octopus to directly access an Octopus Cloud instance. This account is a member of the **Octopus Administrators** team and treated as a full system administrator.

:::div{.hint}
**Octopus Administrators team vs. Octopus Managers team**

The **Octopus Managers** team is the highest level of access that can be granted to a cloud user.

The **Octopus Administrators** team is the same team that the **octoadmin** service account belongs to. It differs from the **Octopus Managers** team in that it can also access system configuration settings related to the infrastructure and hosting of the instance.

Learn more about [Octopus Cloud permissions](/docs/octopus-cloud/permissions).
:::

## When is a support user created

When you contact Octopus support as an Octopus Cloud customer, our reply may contain a request for permission to create a temporary support user on your instance. The support user can help us save time when diagnosing issues or observing a bug in action, leading to faster resolution of support requests. Furthermore, it allows our engineers to see the exact conditions responsible for complex bugs and enables them to provide faster resolutions.

The support user is automatically removed from your instance after 60 minutes of inactivity. As Octopus support works closely with our engineering team, there may be times where more than one support user is created for a support request.

It's Octopus policy for any Octopus staff to receive explicit approval from a customer before creating a support user.

:::div{.hint}
**Exceptions to this policy**

As Octopus is responsible for maintaining cloud instances and their underlying infrastructure, there are certain cases where we may need to create a support user where explicit approval has not been requested. Where appropriate, we will contact you to provide information around the reason a support user was created and what actions were taken.

- Instance outage where we need access to restore it
- Security incident
- Potential breach of [Octopus Customer Agreement](https://octopus.com/legal/customer-agreement)
- Potential breach of law and/or after a lawful request.

:::

## What can a support user access on your instance

As the support user is a member of the **Octopus Administrators** team, they gain view, edit, and delete permission across all spaces and most resources on the instance. While this helps us quickly access the resources related to an issue, it does mean that we're unable to directly test and verify permission configurations. If your issue relates to permissions, see our guide on [troubleshooting permissions](/docs/security/users-and-teams/user-roles#UserRoles-TroubleshootingPermissions).

The support user can't view [sensitive values](/docs/security/data-encryption) such as passwords, sensitive variable values, or API keys.

## Support users are audited

Just like any user on your instance, any change actions are recorded and visible in the audit logs. Furthermore, Octopus staff will only make changes to resources on your instance if instructed to for the purpose of testing a reported issue, or if a configuration change is required to restore access to the instance. In either case, the actions will be recorded in the [audit logs](/docs/security/users-and-teams/auditing).

Audit entries for support users include the following:

- The creation and deletion event for the support user
- The staff email address associated with the support agent that created the support user. The email address follows a first name last name pattern and will always use the `@octopus.com` domain, for example, `first.last@octopus.com`.
- Any resources on your instance the support user creates, edits, or deletes.
- Any other user action that would typically be recorded in the audit logs.
