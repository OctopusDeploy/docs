---
layout: src/layouts/Default.astro
pubDate: 2026-09-24
modDate: 2026-09-24
title: Deployment and runbook run entry points
sidebarLabel: Deployment and runbook entry points
navOrder: 5
description: Every way a deployment or runbook run can start in Octopus, and whether Octopus records agent involvement for each one.
subject: agent visibility, deployment triggers, runbook triggers, ActorType, audit log, automation
type: reference
audience: [devops-eng, platform-eng, admin]
image:
imageAlt:
---

This page lists every way a deployment or runbook run can start in Octopus, and whether Octopus records that an AI agent was involved. An agent's involvement is recorded through its identity: when an [agent service account or agent API key](/docs/security/users-and-teams/service-accounts#agent-service-accounts) is behind the action, Octopus tags it as agent activity and surfaces it in the [audit log](/docs/security/users-and-teams/auditing). Where a start method runs as a background job with no user behind it, Octopus records it as a system action instead, regardless of who configured the trigger that fired it.

Some start methods create the deployment later, from a background task, rather than directly from the request that asked for it. For those, Octopus can still confirm agent involvement if the account behind the request is a dedicated [agent service account](/docs/security/users-and-teams/service-accounts#agent-service-accounts), because that's a permanent property of the account. It can't confirm agent involvement if the request instead came from an ordinary account that was just using an agent-flagged API key for that one call, because that flag belongs to the key used on the original request, and doesn't carry through to the background task.

## Directly started deployments and runbook runs

Someone or something calls Octopus directly to start the deployment or runbook run. Because the call happens under a live, authenticated identity, Octopus can tell whether that identity is an agent.

| Start method | How it works | Is agent involvement reported? |
| --- | --- | --- |
| The web portal | A person starts a deployment or runbook run from the Octopus web portal. | No. Portal sessions are always people, so Octopus never records these as agent activity. |
| The API or CLI | A direct call to the Octopus REST API, or the `octopus` CLI, which calls the API on your behalf. | Yes, when the API key used is an agent API key. Octopus records the action against that key's identity. |
| Octopus MCP | An AI agent, such as Claude, calls Octopus through the [Octopus MCP server](/docs/octopus-ai/mcp). | Yes, when the credential behind the MCP session is an agent API key or agent service account. Octopus MCP has no attribution of its own; it inherits whatever credential authenticated the session. |
| Bulk deploy | Starting several deployments at once, across releases, environments, or tenants, from a single action. | Only for an agent service account. Bulk deploy queues a background task that creates each deployment later, under a rebuilt identity for the requesting account; only a dedicated agent service account survives that rebuild, not an ordinary account using an agent-flagged key for the request. |

## Automatically started deployments and runbook runs

Octopus itself starts the deployment as a consequence of something else finishing. These run from background processing rather than a live request, so only a dedicated agent service account's identity carries through; an agent-flagged key used on an otherwise-ordinary account does not.

| Start method | How it works | Is agent involvement reported? |
| --- | --- | --- |
| A Deploy a Release step | A step in a running deployment creates a child deployment of another project. | Only for an agent service account. The child deployment is created by server-side orchestration under a rebuilt identity for the account that owns the parent deployment, on the same terms as bulk deploy. |
| Automatic deployment to a lifecycle's first phase | A lifecycle phase configured to deploy automatically starts a deployment as soon as a release is created. | Only for an agent service account, on the same terms as bulk deploy. The account attributed is the one that created the release. |
| Automatic deployment to a later lifecycle phase | A lifecycle phase configured to deploy automatically starts a deployment once an earlier phase's deployment succeeds. | Only for an agent service account, on the same terms as bulk deploy. The account attributed is the one recorded against the earlier phase's deployment, not the account that created the release. If that earlier deployment's own attribution was lost, this one can't recover it either, so attribution can degrade further with each automatic phase in the chain. |
| Retry or redeploy | Redeploying a release, or retrying a failed deployment. | Yes. Redeploying starts a fresh request under whoever (or whatever) clicks Redeploy or calls the API, on the same terms as the API or CLI. |

## Trigger-started deployments and runbook runs

A configured trigger fires and starts the deployment or runbook run. Most of these run as scheduled background jobs with no user behind them, so Octopus can't tell whether the person who configured the trigger was an agent, only that the trigger itself fired.

| Start method | How it works | Is agent involvement reported? |
| --- | --- | --- |
| A scheduled trigger | A [scheduled deployment trigger](/docs/projects/project-triggers/scheduled-deployment-trigger) or [scheduled runbook trigger](/docs/runbooks/scheduled-runbook-trigger) fires at its configured time. | No. These always run as a system action. |
| A deployment target trigger | A [deployment target trigger](/docs/projects/project-triggers/deployment-target-triggers) fires when a machine becomes available, or another machine-health event occurs. | No. These always run as a system action. |
| An external feed trigger | A configured external feed, such as a Docker or Helm feed, has a new image or chart version. | No. These always run as a system action. |
| A built-in package repository trigger | A new package version is pushed to the built-in Octopus package repository. | No. These always run as a system action. |
| A Git repository trigger | A new commit lands on a branch used by a version-controlled project. | No. These always run as a system action. |
| A webhook trigger | An external system calls a [webhook configured to run a runbook](/docs/runbooks/webhook-runbook-trigger). | Yes, if the webhook was configured with an API key, on the same terms as the API or CLI. If no API key is attached, it runs as a system action instead. |

## Related links

- [Agent service accounts](/docs/security/users-and-teams/service-accounts#agent-service-accounts)
- [Auditing](/docs/security/users-and-teams/auditing)
- [Project triggers](/docs/projects/project-triggers)
