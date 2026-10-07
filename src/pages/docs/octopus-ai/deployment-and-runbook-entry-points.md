---
layout: src/layouts/Default.astro
pubDate: 2026-09-24
modDate: 2026-10-06
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

This page lists every way a deployment or runbook run can start in Octopus, and whether Octopus records that an AI agent was involved.

Every deployment and runbook run records who started it, and what kind of actor they were, in its `DeployedByActorType` field. You can read this field through the [deployments](/docs/api/deployments) and [runbook runs](/docs/api/runbook-runs) API. It has one of these values:

- `Agent`: an [agent service account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) started it, or someone started it with an [agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key).
- `User`: a user account started it, from the web portal or with an ordinary API key. Octopus can't tell a person apart from a script using that account's credentials.
- `ServiceAccount`: a service account that isn't an agent service account started it.
- `System`: Octopus started it as a background job, with no user behind it, such as a scheduled trigger.
- `Unknown`: Octopus started it in the background on behalf of a user account, and has no credential to tell whether a person or an agent was using that account. Deployments and runbook runs recorded before Octopus tracked actor types are also `Unknown`.

An agent service account is always recorded as `Agent`, however the deployment starts. An agent API key on a user account or ordinary service account is only recognized when Octopus can trace the deployment back to the request that used the key. Some start methods can do that and some can't, so the tables below call out the difference. When Octopus can't trace it, a user account is recorded as `Unknown` or `User`, and an ordinary service account as `ServiceAccount`.

The [audit log](/docs/security/users-and-teams/auditing) records agent activity separately, and doesn't always agree with `DeployedByActorType`. See [What the audit log records](#what-the-audit-log-records).

## Directly started deployments and runbook runs

Someone or something calls Octopus directly to start the deployment or runbook run. Because the call happens under a live, authenticated identity, Octopus can tell whether that identity is an agent.

| Start method | How it works | Is agent involvement recorded? |
| --- | --- | --- |
| The web portal | A person starts a deployment or runbook run from the Octopus web portal. | No. Portal sessions are always people, so these are recorded as `User`. |
| The API or CLI | A direct call to the Octopus REST API, or the `octopus` CLI, which calls the API on your behalf. | Yes, when the caller is an agent service account or uses an agent API key. |
| Octopus MCP | An AI agent, such as Claude, calls Octopus through the [Octopus MCP server](/docs/octopus-ai/mcp). | Yes. The [remote MCP server](/docs/octopus-ai/mcp/remote) only accepts agent credentials, so it's always recorded as `Agent`. The [local MCP server](/docs/octopus-ai/mcp/local) calls the API with the API key you give it, on the same terms as the API or CLI. |
| Bulk deploy | Starting several deployments at once, across releases, environments, or tenants, from a single action in the web portal. | No. Bulk deploy is only available from the web portal, so these are recorded as `User`. Octopus creates each deployment later, from a background task, under the credential of the person who started the bulk deployment. Retrying a bulk deployment attributes the remaining deployments to whoever retries it. |
| Retry or redeploy | Redeploying a release, or using **Re-deploy**, **Re-run**, or **Try again** on a deployment or runbook run's task page. | Yes, on the same terms as the API or CLI. Octopus doesn't re-run the original task. Each of these creates a new deployment or runbook run under whoever (or whatever) starts it, including retrying a run of a runbook stored in Git. |
| Deploy at a later time | A deployment request that's scheduled to start at a set time. | Yes, on the same terms as the API or CLI. Octopus records who requested it when the request is made, not when it starts. |
| A deployment freeze override | Someone overrides a [deployment freeze](/docs/deployments/deployment-freezes) to start a deployment. | Yes, on the same terms as the API or CLI. |
| Ephemeral environment provisioning retry or deprovisioning | Someone retries provisioning an [ephemeral environment](/docs/projects/ephemeral-environments), [deprovisions one](/docs/projects/ephemeral-environments#deprovisioning-an-environment), or retries deprovisioning, and Octopus runs the provisioning or deprovisioning runbook. | Yes, on the same terms as the API or CLI. |

## Automatically started deployments and runbook runs

Octopus itself starts the deployment or runbook run as a consequence of something else happening. These run from background processing rather than a live request, so how much Octopus can recognize depends on whether it carries the original request's API key.

| Start method | How it works | Is agent involvement recorded? |
| --- | --- | --- |
| A Deploy a Release step | A step in a running deployment or runbook run creates a child deployment of another project. | Yes. The child deployment carries the API key the parent was created with, so an agent API key on a user account is still recognized. If the parent wasn't created with an API key, such as a parent started from the web portal or started automatically and recorded as `Unknown`, there's no key to carry, so a child on a user account is recorded as `User`. A child of a parent started by a service account or by Octopus itself is recorded as `Agent`, `ServiceAccount`, or `System` to match. If the parent's API key has since expired or been deleted, the child deployment fails. |
| Automatic deployment to a lifecycle's first phase | A lifecycle phase configured to deploy automatically starts a deployment as soon as a release is created. | Only for an agent service account. The deployment is attributed to the account that created the release, but Octopus doesn't carry that account's API key. If an agent service account created the release, it's recorded as `Agent`. If another service account created it, it's recorded as `ServiceAccount`. If a user account created it, even with an agent API key, it's recorded as `Unknown`. If a trigger created the release, it's recorded as `System`. |
| Automatic deployment to a later lifecycle phase | A lifecycle phase configured to deploy automatically starts a deployment once an earlier phase's deployment succeeds. | Only for an agent service account, on the same terms as the first phase. The deployment is attributed to the account recorded against the earlier phase's deployment, not the account that created the release. An agent service account stays `Agent` through every automatic phase. A user account is recorded as `Unknown` for every automatic phase, even when the earlier deployment was recorded as `Agent` because it used an agent API key. |
| Automatic deployment to an ephemeral environment | A project configured to [deploy automatically to ephemeral environments](/docs/projects/ephemeral-environments) deploys each new release to its environment. | Only for an agent service account, on the same terms as an automatic deployment to a lifecycle's first phase. |
| Ephemeral environment provisioning | Octopus runs the [provisioning runbook](/docs/projects/ephemeral-environments#provisioning-infrastructure) when a deployment to an ephemeral environment is queued. | No. These always run as `System`. Retrying provisioning is a direct start, recorded against whoever retries it. |
| Automatic ephemeral environment deprovisioning | Octopus runs the deprovisioning runbook when an ephemeral environment meets its [automatic deprovisioning](/docs/projects/ephemeral-environments#automatic-deprovisioning-of-environments) rules. | No. These always run as `System`. |

## Trigger-started deployments and runbook runs

A configured trigger fires and starts the deployment or runbook run. Most of these run as scheduled background jobs with no user behind them, so Octopus can't tell whether the person who configured the trigger was an agent, only that the trigger itself fired.

| Start method | How it works | Is agent involvement recorded? |
| --- | --- | --- |
| A scheduled trigger | A [scheduled deployment trigger](/docs/projects/project-triggers/scheduled-deployment-trigger) or [scheduled runbook trigger](/docs/runbooks/scheduled-runbook-trigger) fires at its configured time. | No. These always run as `System`, including scheduled triggers that create a new release. |
| A deployment target trigger | A [deployment target trigger](/docs/projects/project-triggers/deployment-target-triggers) fires when a machine becomes available, or another machine-health event occurs. | Yes, from the original deployment. The trigger usually re-queues the most recent successful deployment to that environment (and tenant), updated to include the new machines, so it keeps that deployment's original `DeployedByActorType`, which can be `Agent`. It only creates a new deployment, recorded as `System`, when an auto-deploy release override points to a release that hasn't been deployed there successfully yet. |
| An external feed trigger | A configured [external feed](/docs/projects/project-triggers/external-feed-triggers), such as a Docker or Helm feed, has a new image or chart version. | No. The trigger creates the release as `System`, and any deployment that follows only comes from an automatic lifecycle phase, so it's also `System`. |
| A built-in package repository trigger | A new package version is pushed to the [built-in Octopus package repository](/docs/projects/project-triggers/built-in-package-repository-triggers). | No. The trigger creates the release as `System`, not as whoever pushed the package, and any deployment that follows only comes from an automatic lifecycle phase, so it's also `System`. |
| A Git repository trigger | A new commit lands on a branch used by a version-controlled project and a [Git trigger](/docs/projects/project-triggers/git-triggers) creates a release. | No. The trigger creates the release as `System`, and any deployment that follows only comes from an automatic lifecycle phase, so it's also `System`. |
| A webhook trigger | An external system calls a [webhook configured to run a runbook](/docs/runbooks/webhook-runbook-trigger). | Yes, if the webhook requires an API key. The runbook run is recorded against the API key the caller sent, on the same terms as the API or CLI. If the webhook doesn't require an API key, it runs as `System`. |

## What the audit log records {#what-the-audit-log-records}

The audit log records the identity Octopus was acting as when it wrote each event. It identifies agent activity when that identity is an agent service account or used an agent API key, and the **AI events only** filter shows those events.

For deployments and runbook runs started directly, the audit event and `DeployedByActorType` agree. For some deployments Octopus creates in the background, they can differ: the audit event is recorded as a system action, even when the deployment itself is recorded as `Agent`. This applies to:

- Child deployments from a Deploy a Release step
- Automatic deployments to a lifecycle phase or ephemeral environment
- Deployments re-queued by a deployment target trigger

Other trigger-started deployments and runbook runs are recorded as `System`, so the audit event agrees with them. Bulk deploy and API-key webhook triggers record the audit event under the original caller's identity, so they agree with `DeployedByActorType` too.

## Related links

- [Agent service accounts](/docs/security/users-and-teams/service-accounts#agent-service-accounts)
- [Auditing](/docs/security/users-and-teams/auditing)
- [Project triggers](/docs/projects/project-triggers)
