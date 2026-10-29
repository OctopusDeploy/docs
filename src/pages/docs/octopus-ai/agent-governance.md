---
layout: src/layouts/Default.astro
pubDate: 2026-10-20
modDate: 2026-10-20
title: Agent governance
sidebarLabel: Agent governance
navOrder: 5
description: How Octopus gives AI agents their own identity, records what they do, and lets you control the deployments they start.
subject: agent governance, AI agents, actor type, agent API keys, agent service accounts, audit log, policies
type: concept
audience: [admin, platform-eng, devops-eng]
image:
imageAlt:
---

AI agents can start deployments, run runbooks, and change configuration in Octopus. Agent identities let you track this activity separately from human activity and control which deployments and runbook runs agents can start.

## Agent identity

An agent identity tells Octopus that a credential belongs to an AI agent. Octopus uses this information to recognize agent activity in audit logs and apply policies based on who started a deployment or runbook run.

There are two ways to give an agent an identity:

- An [agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) belongs to a human owner and is marked for use by an AI agent. Use this when an agent works on someone's behalf.
- An [agent service account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) gives an agent a dedicated account for work that runs without a human session, such as the [Octopus MCP server](/docs/octopus-ai/mcp). Octopus automatically treats every API key created under this account as an agent key.

If an agent uses a regular API key from someone's account, Octopus records its actions as that person's activity. Marking the key as an agent key lets you distinguish between the two.

## Actor types

Octopus records an actor type for each deployment, runbook run, manual intervention, and audit event. The actor type is based on the credentials used.

| Actor type | Meaning |
| --- | --- |
| `User` | A person, or a script running under their credentials. The two are indistinguishable from the credential alone. |
| `Agent` | An AI agent API key, an AI agent service account, or an AI-agent-bound OAuth token. |
| `ServiceAccount` | A standard service account. |
| `System` | The built-in system user: scheduled triggers, automatic deployments, and other server-initiated work. |
| `Unknown` | The credential couldn't be determined, or the record predates actor types. |

## Agent activity in the audit log

Each audit event includes an actor type, so you can find agent activity without keeping track of individual API keys.

The **AI Agents** filter on the [audit page](/docs/security/users-and-teams/auditing) shows actions taken by agents. Octopus also records the API key name with each action, so you can trace it back to the credential and its owner.

If you forward audit events to a SIEM, the [audit stream](/docs/security/users-and-teams/auditing/audit-stream) includes the actor type and related details about the identity and credentials used. You can use these properties to identify agent activity in your detection rules and dashboards.

## Controls on agent actions

[Policies](/docs/platform-hub/policies) let you control deployments and runbook runs based on who started them.

Policies evaluate every deployment and runbook run before it executes. A Rego condition can read `input.Actor.Type` to block or flag a run based on its actor type. For example, you can require approval for production deployments started by agents. See the [policy schema](/docs/platform-hub/policies/schema#actor) for the full `Actor` object and an example.

Steps can also use the `Octopus.Deployment.CreatedBy.ActorType` [system variable](/docs/projects/variables/system-variables) to change their behavior when an agent starts a deployment or runbook run.

Agent identities use the same [teams and user roles](/docs/security/users-and-teams) as other Octopus identities. Give each agent only the permissions it needs.

## Version notes

- The `Actor` object in the policy input is available from Octopus Server 2026.4.5335+.
- Actor attribution on streamed audit events is available from Octopus Server 2026.4.6658.
- The `Octopus.Deployment.CreatedBy.ActorType` system variable is available from Octopus Server 2026.4.6961.

## Related links

- [Create an agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key)
- [Agent service accounts](/docs/security/users-and-teams/service-accounts#agent-service-accounts)
- [Auditing](/docs/security/users-and-teams/auditing)
- [Policies](/docs/platform-hub/policies)
- [Octopus MCP](/docs/octopus-ai/mcp)
