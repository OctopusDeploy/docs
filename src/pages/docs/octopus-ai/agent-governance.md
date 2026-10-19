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

AI agents can now start deployments, run runbooks, and change configuration in Octopus. This page explains how Octopus tells agent activity apart from human activity, where that signal shows up, and how you use it to keep agents inside the boundaries you set.

## Agent identity

An agent identity is a credential that belongs to an AI agent rather than to a person. Giving each agent its own identity is what makes everything else on this page possible: Octopus can only report on agent activity, or act on it, if the agent arrives as something other than one of your users.

Octopus has two kinds of agent identity. An [agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) is a key marked as held by an AI agent acting for a human owner, and it's the right choice when an agent works on one person's behalf. An [agent service account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) is a dedicated identity for an agent that runs without a human session, such as the [Octopus MCP server](/docs/octopus-ai/mcp). Every API key created under an agent service account is automatically treated as an agent key.

The distinction matters most when an agent uses a key on someone's own account. Without an agent identity, the agent's actions are recorded against that person and look exactly like work the person did themselves.

## Actor types

This topic lists the actor types Octopus records. Every deployment, runbook run, manual intervention, and audit event carries one, and the value reflects what the credential tells Octopus and nothing more.

| Actor type | Meaning |
| --- | --- |
| `User` | A person, or a script running under their credentials. The two are indistinguishable from the credential alone. |
| `Agent` | An AI agent API key, an AI agent service account, or an AI-agent-bound OAuth token. |
| `ServiceAccount` | A standard service account. |
| `System` | The built-in system user: scheduled triggers, automatic deployments, and other server-initiated work. |
| `Unknown` | The credential couldn't be determined, or the record predates actor types. |

## Agent activity in the audit log

The audit log is where you see what agents have done. Because every audit event carries an actor type, agent activity is reportable without you having to know which API keys belong to agents.

The [audit page](/docs/security/users-and-teams/auditing) has an **AI Agents** filter that narrows the log to actions taken by agents. Octopus also captures the API key name alongside each action; an action therefore traces back to a specific credential and its owner.

If you forward audit events to a SIEM, the [audit stream](/docs/security/users-and-teams/auditing/audit-stream) carries the actor type and the related attribution properties on every event; use the properties to build the same separation into your own detection rules and dashboards.

## Controls on agent actions

Identity and audit tell you what agents did. [Policies](/docs/platform-hub/policies) are how you decide what they're allowed to do in the first place.

Policies evaluate every deployment and runbook run before it executes, and the policy input includes the actor that started it. A Rego condition reads `input.Actor.Type` and can block or flag an execution on that basis; require approval for agent-started production deployments while leaving human-started ones alone. See the [policy schema](/docs/platform-hub/policies/schema#actor) for the full `Actor` object and a worked example.

Deployments and runbook runs also expose the actor type to the deployment process itself through the `Octopus.Deployment.CreatedBy.ActorType` [system variable](/docs/projects/variables/system-variables); a step can therefore behave differently when an agent started the run.

Agent identities are ordinary Octopus identities in every other respect; the permissions you grant through [teams and user roles](/docs/security/users-and-teams) apply to agent identities unchanged. Scope an agent to the smallest set of permissions it needs.

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
