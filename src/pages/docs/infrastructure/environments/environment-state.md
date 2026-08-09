---
layout: src/layouts/Default.astro
pubDate: 2026-08-07
modDate: 2026-08-08
title: Environment state
navTitle: Environment state
description: Save key/value state against a project, environment, and optionally a tenant during a deployment or runbook run, then read it back in later deployments and runs.
navOrder: 30
---

Environment state lets a deployment or [runbook](/docs/runbooks) run save key/value pairs scoped to the combination of project, environment, and optionally a tenant. Later deployments and runbook runs for the same project and environment can then read those values back.

Environment state addresses a common problem with [ephemeral environments](/docs/infrastructure/ephemeral-environments). A provisioning runbook often creates infrastructure that later steps depend on, such as a Kubernetes namespace, a connection string, or an application URL. Without environment state, each step must re-derive these values independently, usually by repeating the same expression from one step to the next, which is error-prone. With environment state, the step that creates the infrastructure records each value once, and every later deployment, runbook run, and the deprovisioning runbook reads it directly from Octopus. Although this example shows a use case for ephemeral environments, you can use environment state with any environment.

An environment URL is a type of environment state, but gets first-class support in Octopus. It is stored like any other state, and surfaced as a clickable link in the Octopus Web Portal. For more information, see [Setting an environment URL](#setting-an-environment-url).

## How environment state works

- A step in a deployment or runbook run sets a state entry with a key and a value.
- Octopus captures the entry when the step completes successfully, and stores it based on the project, environment, and tenant that the deployment or runbook run is executing against.
- Later deployment or runbook run for the same project, environment, and tenant, can read the value from a variable named `Octopus.Environment.State[key]`.

Each entry is keyed by project, environment, and optionally a tenant, so state isn't shared with other projects, environments, or tenants. Setting an entry with a key that already exists for the same project, environment, and tenant overwrites the previous value.

## Setting environment state

Set state from any [script step](/docs/deployments/custom-scripts) using the wrapper functions Octopus provides for PowerShell and Bash.

```powershell PowerShell
Set-EnvironmentState -Key "namespace" -Value "webstore-pr-482"
```
```bash Bash
set_environmentstate "namespace" "webstore-pr-482"
```

### Sensitive values

Mark a value as sensitive to store it encrypted at rest and mask it in task logs. Add the `-Sensitive` switch in PowerShell, or `-sensitive` as the third argument in Bash.

```powershell PowerShell
Set-EnvironmentState -Key "connectionString" -Value "Server=db;Password=s3cret" -Sensitive
```
```bash Bash
set_environmentstate "connectionString" "Server=db;Password=s3cret" -sensitive
```

## Using environment state in later runs

Octopus makes each state entry available as a [variable](/docs/projects/variables) named `Octopus.Environment.State[key]` in later deployment or runbook run, where `key` is the name you set.

Use the variable in a step field with [variable binding syntax](/docs/projects/variables/variable-substitutions):

```
#{Octopus.Environment.State[namespace]}
```

Or read it from a script:

```powershell PowerShell
$namespace = $OctopusParameters["Octopus.Environment.State[namespace]"]
```
```bash Bash
namespace=$(get_octopusvariable "Octopus.Environment.State[namespace]")
```

Environment state variables also appear in the variable helper in the process editor, so you can pick them without typing the full name.

## Setting an environment URL
An environment URL is a special kind of environment state. Octopus stores it alongside your other state entries, shows it as a clickable link and makes it available from the API.

Set a URL with the `Set-EnvironmentUrl` (PowerShell) or `set_environmenturl` (Bash) function. The first argument is the key that names the URL, and the second is the URL itself.

```powershell PowerShell
Set-EnvironmentUrl -Key "Store front" -Url "https://pr-123.example.com"
```
```bash Bash
set_environmenturl "Store front" "https://pr-123.example.com"
```

URLs set this way show as clickable links on the **Ephemeral Environments** page in the project, so anyone reviewing the environment can open the running app.

:::hint
A URL is a special kind of environment state, so its key must be unique across your state entries and your URLs for the same project, environment, and tenant. Reusing a key overwrites the value stored under it.
:::

### Getting URLs from the API

You can fetch the environment URLs from the API, which is useful for agents and scripts that need a link to the running app without reading the task log:

```
GET /api/spaces/{spaceId}/projects/{projectId}/environments/{environmentId}/urls
```

Add an optional `tenantId` query parameter for [tenanted](/docs/tenants) runs. The response is an array of name and URL pairs:

```json
[
  { "Name": "Store front", "Url": "https://pr-123.example.com" }
]
```

This endpoint is also available through the [Octopus MCP server](/docs/octopus-ai/mcp), so agents can discover the URL directly.

## Availability
//TODO: confirm version number

Environment state is available to all cloud and self-hosted customers from version `2026.3.X`.

## Learn more

- [Ephemeral environments](/docs/infrastructure/ephemeral-environments)
- [Runbooks](/docs/runbooks)
- [System variables](/docs/projects/variables/system-variables)
