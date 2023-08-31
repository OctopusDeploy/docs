---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Auditing
description: Octopus Deploy captures audit information whenever significant events happen in the system.
---

For team members to collaborate in the deployment of software, there needs to be trust and accountability. Octopus Deploy captures audit information whenever significant events happen in the system.

## What does Octopus capture? {#Auditing-WhatdoesOctopuscapture?}

Below is a short list of just some of the things that Octopus captures:

- Changes to [deployment processes](/docs/deployments/) and [variables](/docs/projects/variables).
- Create/modify/delete events for [projects](/docs/projects/), [environments](/docs/infrastructure/environments/), [deployment targets](/docs/infrastructure), releases, and so on.
- Environment changes, such as adding new deployment targets or modifying the environment a deployment target belongs to.
- Queuing and canceling of deployments and other tasks.

Some general points worth noting:

- Octopus **does** capture the details of every mutating action (create/edit/delete) including who initiated the action.
- Octopus **does** capture login events for specific user accounts, but **not** logout.
- Octopus **does not** capture when data is read, however certain sensitive actions like downloading a certificate with its private key is captured.

If you are concerned that Octopus does not capture a specific action of interest to you, please contact our [support team](https://octopus.com/support).

## Viewing the audit history {#Auditing-Viewingtheaudithistory}

You can view the full audit history by navigating to the **Audit** tab in the **Configuration** area.

:::figure
![Audit Configuration](/docs/security/users-and-teams/auditing/images/audit-configuration.png)
:::

Some audit events will also include details, which you can see by clicking the **show details** link. For example:

:::figure
![Audit Event Details](/docs/security/users-and-teams/auditing/images/audit-event-details.png)
:::

![Audit Event Details extended](/docs/security/users-and-teams/auditing/images/audit-event-details-extended.png)

This feature makes it extremely easy to see who made what changes on the Octopus Server.

## Security concerns

We take great care to ensure the security and integrity of your audit logs, to make sure they are a trustworthy indelible record of every important activity in your Octopus installation. If you have any concerns please [reach out to us](https://octopus.com/support).

### Viewing audit logs

To grant a user access to audit logs you can make use of a built-in User Role that contains **EventView**. All project related user roles contain it. **EventView** can also be scoped to narrow down which audit information a user can see, for example, it can be restricted to specific Projects or Environments. Learn more about [managing users and teams](/docs/security/users-and-teams).

In **Octopus 2019.1** we removed **AuditView** in an effort to simplify permissions so only **EventView** is now required.

### Streaming audit logs

From **Octopus 2022.4** [enterprise-tier](https://octopus.com/pricing) customers have the option to [stream their audit logs](/docs/security/users-and-teams/auditing/audit-stream) to their chosen security information and event management (SIEM) solution.

### Sensitive values in audit logs

If you make a change to a sensitive value in Octopus, you will notice we write an audit log showing the fact the sensitive value changed. The value we show in the audit log is simply **an indicator the value has changed**. This is **not** the unencrypted/raw value. This is **not** even the encrypted value.

We take the sensitive value and hash it using an irreversible hash algorithm. We then encrypt that hash with a new, unique, non-deterministic salt. We use this irreversible value as an indicator that the sensitive value actually changed in some way.

## Archived audit logs {#archived-audit-events}

:::div{.hint}
The audit log retention functionality was gradually made available to **Cloud** customers from **Octopus 2023.1** onwards.

Audit log retention will be made available to self-hosted customers later in 2023. However, from **Octopus 2022.3** onwards, self-hosted customers will be able to change the **Event retention days** configuration, allowing you to adjust to your preferred retention period prior to retention archiving audit logs. 
:::

Audit log entries can require a significant amount of database space to store, degrading overall system performance. For this reason, Octopus Server applies a retention policy to automatically archive audit log entries older than the configured number of days and remove them from the database. The retention period can be configured via **Configuration ➜ Settings ➜ Event Retention**. The location of the archived audit log files can be changed via **Configuration ➜ Settings ➜ Server Folders**.

Periodically, Octopus will apply the retention policy to existing entries and store them as [JSONL](https://jsonlines.org/) files, grouped as a single file for each day (for example, `events-2019-01-01.jsonl`).

Users with appropriate permissions (typically `Octopus Manager`) can download or delete the archived files. The downloaded files are intended to be imported into a datalake for querying and analysis.

### Accessing archived logs {#accessing-archived-logs}

Audit entries older than the configured retention period (defaults to 90 days, configurable up to 365 days or 3650 days for self-hosted customer) are archived and can be accessed via the overflow menu (`...`) in the top right corner of the audit page by selecting the **Manage archived audit logs** option.

:::figure
![Manage Archived Audit Logs Menu](/docs/security/users-and-teams/auditing/images/manage-archived-audit-logs-menu.png)
:::

The archived files can also be accessed via the Octopus REST API endpoints `/api/events/archives` and `/api/events/archives/{filename}`.

### Modifying and deleting audit logs is restricted

Octopus actively prevents modifying or deleting audit logs within the configured retention period via its API. That said, a user with the appropriate permissions to the `Events` table in your Octopus SQL Database could modify or delete records in that table. If you are concerned about this kind of tampering you should configure the permissions to the `Events` table in your Octopus SQL Database appropriately.

Entries older than the retention period can be deleted by users with the appropriate permissions (typically `Octopus Manager`). An audit log entry will be created each time an archived event file is deleted. Archived files are saved at a filesystem level. So any user that has the appropriate permissions could view or delete these files. If this is a concern, you should restrict the permissions to access the configured folder appropriately.

:::div{.warning}
**Take care deleting archived files**
Deleting the archived files will permanently erase the audit entries. As a safeguard, deletion of audit log files is only allowed on files that are at least 30 days old from when they were created.
:::

## IP address forwarding

From **Octopus 2023.1**, the originating IP address of a request is recorded as part of any audit event. If you host Octopus on-premises and run multiple nodes in a High Availability setup, incoming requests will be redirected from your load balancer. This means that by default, the IP address recorded with any event will be the IP address of your load balancer. To resolve this, you can configure any trusted IP addresses via **Configuration ➜ Settings ➜ Web Portal ➜ Trusted Proxies**.

Octopus accepts any number of trusted proxies. A trusted proxy can either be a single IP address such as `192.168.123.111` or an IP range such as `192.168.0.0/16`.

Octopus reads forwarded IP addresses from the `X-Forwarded-For` header. Given the IP address of the client sending the request is trusted, the rightmost IP address that is **not** configured in the list of trusted proxies will be used as the IP address for the event. If all IP addresses are trusted, the leftmost value in the `X-Forwarded-For` header will be used. Some examples include:
- If the IP range `0.0.0.0/0` is configured as a trusted proxy, then any request will always use the leftmost IP address found in the `X-Forwarded-For` header, or the IP address of the client if no header is provided
- If no trusted proxies are configured, the IP address of the client that sent the request will always be used as it is not considered trusted, even if there is a valid `X-Forwarded-For` header
- If the IP address `192.168.123.111` is configured as a trusted proxy, and a request is received with a client IP address of `192.168.123.111` and the header `X-Forwarded-For: 100.100.101.102, 200.123.124.125`, then `200.123.124.125` will be used as the IP address of this request as it is the rightmost untrusted IP address
