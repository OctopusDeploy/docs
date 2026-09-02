---
layout: src/layouts/Default.astro
pubDate: 2026-08-06
modDate: 2026-08-06
title: Webhook runbook triggers
description: Webhook runbook triggers let an external system run a runbook by sending an HTTP request to Octopus.
navOrder: 45
---

Webhook runbook triggers let an external system run a [runbook](/docs/runbooks) by sending an HTTP request to Octopus. This is useful when the runbook needs to run in response to something happening outside Octopus, for instance:

- Run a diagnostic runbook when your monitoring tool raises an alert.
- Restart a service when your incident management tool creates an incident.

:::div{.warning}
Webhook runbook triggers are available from Octopus version **2026.3**. This feature can be disabled for your instance under **Configuration ➜ Features**.
:::

:::div{.hint}
Only published snapshots can be used by a webhook runbook trigger, draft snapshots cannot. For config-as-code runbooks, webhook runbook triggers will always run the runbook from the latest commit on your default branch.
:::

## Add a webhook runbook trigger

1. In a project, select **Runbook Triggers**, then **Create trigger** and select **Webhook**.
2. Give the trigger a name.
3. Select a runbook.
4. Specify the target environments the runbook will run against.

   If you are using [tenants](/docs/tenants) you can select the tenants that the runbook will run against. For each tenant, the published runbook will run against the tenant's environment.

5. Choose how callers [authenticate](#authentication) with the webhook.
6. Save the trigger.

Once the trigger is saved, the **Endpoint** section shows the URL to call. Select the copy icon to copy it.

## Endpoint

Octopus generates a unique endpoint for each webhook trigger:

```plaintext
POST https://your-octopus-url/api/{spaceId}/webhook/{webhookId}
```

The endpoint only accepts `POST` requests. A request body is optional, and can be up to **5 MB**.

A successful request returns `200 OK` with an empty body. This means Octopus accepted the request and queued the runbook run, not that the run has finished. Use the trigger's run history, or the task log for the runbook run, to see the outcome.

## Authentication {#authentication}

Every request to the endpoint must be authenticated. Each webhook trigger uses one of two methods, chosen in the **Authentication** section when you create or edit the trigger.

### Shared secret

With **Shared secret**, callers send a secret that only the trigger knows in the `X-Octopus-Webhook-Secret` header:

```bash
curl -X POST https://your-octopus-url/api/Spaces-1/webhook/{trigger-guid} \
  -H "X-Octopus-Webhook-Secret: your-secret" \
  -H "Content-Type: application/json" \
  -d '{ "reason": "Disk usage above threshold" }'
```

Requests with a missing or incorrect secret are rejected with `401 Unauthorized`, and Octopus records an audit event including the caller's IP address.

Runbook runs created this way are not attributed to an Octopus user, so no permission checks are applied to the run. Anyone who holds the secret can run the runbook against the environments and tenants configured on the trigger.

### Octopus API key

With **Octopus API key**, callers authenticate as an Octopus user by sending an [API key](/docs/api/authentication/create-an-api-key) in the `X-Octopus-ApiKey` header:

```bash
curl -X POST https://your-octopus-url/api/Spaces-1/webhook/00000000-0000-0000-0000-000000000000 \
  -H "X-Octopus-ApiKey: API-YOUR-KEY" \
  -H "Content-Type: application/json" \
  -d '{ "reason": "Disk usage above threshold" }'
```

The runbook run is created as the owner of the API key, which means:

- The key's owner needs the `RunbookRunCreate` [permission](/docs/runbooks/runbook-permissions) for the project, and for every environment and tenant the trigger targets.
- The run appears in the audit log and task list as being run by that user, rather than by the Octopus system user.

We recommend using a [service account](/docs/security/users-and-teams/service-accounts) scoped to only what the runbook needs, rather than a key belonging to a person.

:::div{.warning}
**Payload signature verification is not supported.** Webhook runbook triggers are generic, and signing schemes are specific to the system sending the request so Octopus ignores signed payload headers.
:::

## Rate limiting

The webhook endpoint is rate limited. The limit applies to all webhook triggers on the instance:

- Up to **60** requests can be made in a burst.
- The bucket replenishes at **1 request per second**.

:::div{.hint}
This limit is separate from the [rate limiting](/docs/administration/managing-infrastructure/rate-limiting) policies you configure under **Configuration ➜ Settings ➜ Rate Limiting**, and is always active.

As with those policies, the count is not shared across nodes when Octopus Server is configured for [high availability](/docs/administration/high-availability). Each node counts requests independently.
:::
