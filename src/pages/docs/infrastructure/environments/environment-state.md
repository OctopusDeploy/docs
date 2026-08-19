---
layout: src/layouts/Default.astro
pubDate: 2026-08-07
modDate: 2026-08-19
title: Environment state
navTitle: Environment state
description: Save key/value state during a deployment or runbook run, then read it back in later deployments and runs.
navOrder: 30
---

Environment state lets a deployment or [runbook](/docs/runbooks) run store important values generated during the process for later use. Future deployments and runbook runs for the same project, environment, and tenant get access to these state values as variables.

A primary use case for environment state is provisioning and deprovisioning [ephemeral environments](/docs/infrastructure/ephemeral-environments). For example, a provisioning runbook creates a Kubernetes namespace, Azure resource group, or similar to deploy the application to for testing. The identifiers for these resources are stored as environment state values. When it comes time to deprovision the ephemeral environment the deprovisioning runbook can tear down these resources using the identifiers provided as variables.

Each state entry is scoped to project, environment, and optionally a tenant, allowing them to be isolated. Setting an entry with a key that already exists for the same project, environment, and tenant overwrites the previous value. Keys are case insensitive.

## Setting environment state

Set state from a PowerShell or Bash [script step](/docs/deployments/custom-scripts) using the wrapper functions Octopus provides.

<details data-group="set-environment-state">
<summary>PowerShell</summary>

```powershell
Set-EnvironmentState -Key "namespace" -Value "webstore-pr-482"
```

</details>
<details data-group="set-environment-state">
<summary>Bash</summary>

```bash
set_environmentstate "namespace" "webstore-pr-482"
```

</details>

### Sensitive values

Mark a value as sensitive to store it encrypted at rest and mask it in task logs. Add the `-Sensitive` switch in PowerShell, or `-sensitive` as the third argument in Bash.

<details data-group="set-sensitive-environment-state">
<summary>PowerShell</summary>

```powershell
Set-EnvironmentState -Key "connectionString" -Value "Server=db;Password=s3cret" -Sensitive
```

</details>
<details data-group="set-sensitive-environment-state">
<summary>Bash</summary>

```bash
set_environmentstate "connectionString" "Server=db;Password=s3cret" -sensitive
```

</details>

## Using environment state

Octopus makes each state entry available as a [variable](/docs/projects/variables) named `Octopus.Environment.State[key]`, where `key` is the key you set.

Read it from a script:

<details data-group="consume-environment-state">
<summary>PowerShell</summary>

```powershell
$namespace = $OctopusParameters["Octopus.Environment.State[namespace]"]
```

</details>
<details data-group="consume-environment-state">
<summary>Bash</summary>

```bash
namespace=$(get_octopusvariable "Octopus.Environment.State[namespace]")
```

</details>

## Setting an environment URL

An environment URL is a special type of environment state that gets first-class support in Octopus. It is stored like any other environment state, and surfaced as a clickable link in the Octopus Web Portal and available from the API.

Set a URL with the `Set-EnvironmentUrl` (PowerShell) or `set_environmenturl` (Bash) function. The first argument is the key that names the URL, and the second is the URL itself.

<details data-group="environment-url">
<summary>PowerShell</summary>

```powershell
Set-EnvironmentUrl -Key "Store front" -Url "https://pr-123.example.com"
```

</details>
<details data-group="environment-url">
<summary>Bash</summary>

```bash
set_environmenturl "Store front" "https://pr-123.example.com"
```

</details>

URLs set this way show as clickable links on the [Ephemeral Environments](/docs/projects/ephemeral-environments#environment-urls) in the project, providing convenient access to the deployed application.

:::div{.hint}
The key used for a URL entry must be unique across all state entries (including non-URLs) for the same project, environment, and tenant. As with all state entries, reusing a key will overwrite its value.
:::

### Getting URLs from the API

You can fetch the environment URLs from the API, which is useful for AI agents and scripts that need a link to the running app. Add an optional `tenantId` query parameter for [tenanted](/docs/tenants) runs.

```text
GET /api/spaces/{spaceId}/projects/{projectId}/environments/{environmentId}/urls
```

The response is an array of name and URL pairs:

```json
[
  { "Name": "Store front", "Url": "https://pr-123.example.com" }
]
```

## Limits on environment state

Environment state entries have the following limits:

- Maximum of 10 environment state entries per combination of project, environment, and optional tenant
- Maximum key length is 100 characters
- Maximum value length is 1000 characters

If any of these limits are exceeded during a deployment or runbook run, the task will fail with an error message explaining how the limit was hit.

Use [Octopus variable logging](/docs/support/how-to-turn-on-variable-logging-and-export-the-task-log) to check if you are nearing your maximum number of environment state entries.

## Deleting environment state

If a project, environment, and tenant combination has hit the limit above, delete entries you no longer need to make room for new ones. This function is only available via the HTTP API.

For environment state scoped to a project and environment:

```text
DELETE /api/spaces/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/states/{key}
```

For environment state scoped to a project, environment and tenant:

```text
DELETE /api/spaces/{spaceId}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/states/{key}
```

Use [Octopus variable logging](/docs/support/how-to-turn-on-variable-logging-and-export-the-task-log) to get a list of environment state keys for a project, environment, and optional tenant scope.

## Availability

Environment state is rolling out to Octopus Cloud, and will be available to self-hosted customers from version `2026.3`.

## Learn more

- [Ephemeral environments](/docs/infrastructure/ephemeral-environments)
- [Runbooks](/docs/runbooks)
- [System variables](/docs/projects/variables/system-variables)
