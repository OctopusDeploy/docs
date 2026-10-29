---
layout: src/layouts/Default.astro
pubDate: 2026-10-29
modDate: 2026-10-30
title: Restricting what AI agents can do
navTitle: Restricting AI agents
sidebarLabel: Restricting AI agents
navOrder: 5
description: Limit what AI agents can do in Octopus, block or pause the runs they start, and respond when an agent runs something you didn't expect.
subject: AI agents, agent API keys, agent service accounts, runbooks, manual interventions, policies, permissions
type: guide
audience: [platform-eng, devops-eng, admin]
image:
imageAlt:
---

AI agents, such as assistants connected through the [Octopus MCP server](/docs/octopus-ai/mcp), can run runbooks, create deployments, and respond to manual interventions, the same as the people and accounts whose credentials they use. This page covers how to give an agent its own identity, limit its permissions, and add controls that block or pause the runs it starts. If an agent has already run something you didn't expect, start with [Investigate an unexpected AI agent run](#investigate-an-unexpected-ai-agent-run).

## AI agent identities

Octopus decides whether an AI agent made a request from the credential it uses, not from the tool or route it came through. Knowing which credentials count as an agent tells you whether the controls on this page apply to a run.

Octopus treats a request as coming from an AI agent when it uses:

- An [agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key)
- An API key that belongs to an [agent service account](/docs/security/users-and-teams/service-accounts#agent-service-accounts)
- [Octopus Remote MCP](/docs/octopus-ai/mcp/remote), which accepts only agent API keys and OAuth connections

An OAuth connection starts when a person signs in to Octopus from their AI tool and approves the connection. Octopus records the runs it starts as AI agent runs, so the agent controls apply. The agent has that person's permissions, or only read access if they approved the connection as **Read-only**. Only people can approve a connection, so an OAuth connection can't use an agent service account.

When an agent uses a person's regular API key, Octopus records it as that person, including when it calls Octopus through the [local Octopus MCP server](/docs/octopus-ai/mcp/local). None of the agent controls apply to its runs, and it has every permission that person has. Octopus records runs started by scheduled triggers, and by webhook triggers that use a shared secret, as the Octopus system user, so the agent controls don't apply to them either.

Octopus records who started each deployment and runbook run, including whether it was an AI agent. The audit log, the [`Octopus.Deployment.CreatedBy.ActorType`](/docs/projects/variables/system-variables) variable, and the `Actor` field in the [policy input](/docs/platform-hub/policies/schema#actor) all use this record.

The agent controls on this page are advisory, not a security boundary. They stop an agent from doing something directly, but an agent with permission to edit the runbook, deployment process, variables, or triggers can work around them. [Permissions](#permissions-that-let-ai-agents-work-around-controls) are the boundary. Use the controls as guard rails inside the permissions you grant.

## Investigate an unexpected AI agent run

When an agent runs something you didn't want run, find out which credential it used before you change anything. The credential tells you whether the agent controls could have applied, and which account's permissions to change.

To find the credential behind an AI agent run:

1. From **Configuration > Audit**, select **Show advanced filters**.
2. Select **AI events only**.
3. Find the event for the deployment or runbook run.
4. Expand the event, and note the user, the **Established with** value, and the masked **API key**, if the event has one.

If the event is in the filtered results, the agent used an agent credential:

- If the event shows a masked API key, the agent used an agent API key. From **Configuration > API Keys**, find the key with the same masked value to see its purpose and owner.
- If the event was established with an OAuth access token, the agent connected through Octopus Remote MCP using the account of the person shown on the event.

If the event isn't in the filtered results, clear **AI events only** and find the event again:

- If it shows a person or a regular service account, the agent is using that account's API key. Note the masked API key on the event, so you can delete that key after you move the agent to its own credentials with [Give an AI agent its own identity](#give-an-ai-agent-its-own-identity).
- If it shows the Octopus system user, a scheduled or webhook trigger started the run. Check the project's triggers for one the agent created.

## Fixes for unexpected AI agent runs

Each row matches what you found in the audit log to the change that stops it happening again. The fixes apply to both deployments and runbook runs.

| What you found | What to change |
| --- | --- |
| The run is recorded as a person, not an AI agent | [Give the AI agent its own identity](#give-an-ai-agent-its-own-identity) |
| The agent ran a runbook that agents should never run | [Block AI agents from running a runbook](#block-ai-agents-from-running-a-runbook) |
| The agent ran a runbook in an environment it shouldn't use | [Limit the AI agent's permissions](#limit-an-ai-agents-permissions) to the environments it needs |
| The agent excluded a manual intervention step, or responded to one itself | [Require a person to approve AI agent runs](#require-a-person-to-approve-ai-agent-runs) |
| The agent changed a setting, step, variable, or trigger to get around a control | Remove the permission it used. See [Permissions that let AI agents work around controls](#permissions-that-let-ai-agents-work-around-controls). |
| The run came from a trigger the agent created | Remove the agent's `TriggerCreate` and `TriggerEdit` permissions, and delete the trigger |
| The agent's credential has broader access than it needs | Create a new agent API key with read-only access, and delete the old key. See [Choosing an access level](/docs/api/authentication/create-an-api-key#choosing-an-access-level). |
| The agent connected through OAuth with **Full access** | [Revoke the person's sessions](/docs/security/users-and-teams/timeouts-and-invalidation#TimeoutsAndInvalidation-SessionInvalidation), then have them reconnect and approve the connection as **Read-only**. If the agent needs to make changes, give it its own identity instead. See [Limit an AI agent's permissions](#limit-an-ai-agents-permissions). |
| An AI tool you don't trust connected through OAuth | [Revoke the person's sessions](/docs/security/users-and-teams/timeouts-and-invalidation#TimeoutsAndInvalidation-SessionInvalidation), and limit which tools can connect. See [Limit an AI agent's permissions](#limit-an-ai-agents-permissions). |

## Give an AI agent its own identity

An agent service account gives an AI agent an identity separate from any person. Octopus labels its activity as AI agent activity, and the agent controls on this page apply to every run it starts. Do this before you add any other control, because they only apply to agent credentials.

**Before you begin**

You'll need:

- Permission to create [users and edit teams](/docs/security/users-and-teams)

To give an AI agent its own identity:

1. From **Configuration > Users**, select **Add AI service account**.
2. Enter a **Service Username** and **Service Display Name** for the agent.
3. Select **Save**.
4. Add the agent service account to a team that grants only the permissions the agent needs. See [Limit an AI agent's permissions](#limit-an-ai-agents-permissions).
5. [Create an agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) for the agent service account.
6. In your AI agent's configuration, such as its MCP server settings, replace the old API key with the new agent API key.
7. Delete the API key the agent used before.

The agent service account appears in the **Users** list labeled as an AI agent, and the runs it starts show an **AI agent** badge in their run history.

## Limit an AI agent's permissions

Scoping a team to the projects and environments the agent needs, with a role that can run runbooks but not edit them, stops the agent from removing the other controls on this page.

**Before you begin**

You'll need:

- An [agent service account](#give-an-ai-agent-its-own-identity) for the AI agent
- Permission to edit [teams](/docs/security/users-and-teams)

To limit an AI agent's permissions:

1. From **Configuration > Teams**, add a team for the space the agent works in.
2. On the **Members** tab, add the agent service account.
3. On the **User Roles** tab, include the **Runbook consumer** role.
4. Define the role's scope to the projects and environments the agent needs.
5. Save the team.

You can check the result with **Configuration > Test Permissions**, by selecting the agent service account.

:::div{.hint}
Read-only access stops an agent from running runbooks or deploying releases. Use it for agents that only need to look things up:

- For an agent API key, choose read-only access when you create the key. See [Choosing an access level](/docs/api/authentication/create-an-api-key#choosing-an-access-level).
- For an OAuth connection, approve the connection as **Read-only**.
:::

:::div{.hint}
To limit agents that connect to Octopus Remote MCP through OAuth:

- If the agent needs to run runbooks or deploy releases, give it its own identity instead of a **Full access** connection.
- Limit which AI tools can connect with the **Redirect URI allowlist** in **Configuration > Settings > Authorization Server**.
- To disconnect an agent, [revoke the person's sessions](/docs/security/users-and-teams/timeouts-and-invalidation#TimeoutsAndInvalidation-SessionInvalidation). This also signs the person out of every other session.
:::

## Permissions that let AI agents work around controls

This table lists the permissions and access that let an AI agent undo or get around the agent controls on this page. Don't grant them to an agent you want the controls to restrict. Built-in roles such as **Project contributor** include several of them.

| Permission or access | What an agent can do with it |
| --- | --- |
| `LibraryVariableSetEdit` | Add a library variable named `Octopus.Action.Manual.PreventAgentResponses` that lets AI agents respond to a manual intervention |
| `PlatformHubEdit` | Change or deactivate the policies that block AI agent runs |
| `ProcessEdit` | Remove a manual intervention step from a deployment process, clear its **Required** option, or let AI agents respond to it |
| `RunbookEdit` | Change a runbook's environments, clone a blocked runbook, or edit the process of a runbook it's allowed to run so it does the same work |
| `TriggerCreate` and `TriggerEdit` | Create a scheduled or shared-secret webhook trigger that runs a blocked runbook as the Octopus system user |
| `VariableEdit` | Add a project variable named `Octopus.Action.Manual.PreventAgentResponses` that lets AI agents respond to a manual intervention |
| Write access to a Config as Code project's Git repository | Change the AI agent access setting on a branch, then run the runbook from that branch |

For example, an agent that restarts services might get **Runbook consumer** scoped to the Operations project in Development and Test. It can run the restart runbook there, but it can't edit the runbook, add a trigger, or run anything in Production.

## AI agent run controls

This table lists the controls that block or pause deployments and runbook runs started by an AI agent. They apply only to runs that Octopus records as started by an AI agent. Combine them to suit each runbook. For example, block a database restore runbook outright, and require a person to approve agent runs of a service restart runbook.

| Control | What it does | Applies to | When it acts | Requirements |
| --- | --- | --- | --- | --- |
| [AI agent access](#block-ai-agents-from-running-a-runbook) | Rejects every agent run of the runbook | One runbook | When the run is created | None |
| [Agent Responses on a required manual intervention](#require-a-person-to-approve-ai-agent-runs) | Pauses the run until a person responds | One step in a deployment process or runbook | When the step runs | None |
| [Policy using the `Actor` input](#block-ai-agent-runs-with-a-policy) | Blocks or warns on agent runs that match the policy's scope | Any projects, environments, or runbooks in the policy's scope | When the run's task starts | Enterprise tier and Platform Hub |

## Block AI agents from running a runbook

Blocking AI agents from a runbook rejects every run an agent tries to start, before Octopus queues a task. Use it for runbooks that agents should never run, such as ones that restore databases or change production infrastructure.

To block AI agents from running a runbook:

1. From your project, select **Runbooks**, then select the runbook.
2. Select **Settings**.
3. In **Run Settings**, expand **AI agent access**.
4. Select **AI agents can't run this runbook**.
5. Select **Save**.

When an AI agent tries to run the runbook, Octopus rejects the run with an error, and the Octopus MCP server shows agents no environments for the runbook.

AI agents can turn this setting on but can't turn it off. For [Config as Code runbooks](/docs/runbooks/config-as-code-runbooks#ai-agent-access), each branch stores its own setting, so protect your default branch. Learn more about [AI agent access](/docs/runbooks/runbooks-vs-deployments#ai-agent-access).

## Require a person to approve AI agent runs

A manual intervention step that AI agents can't respond to pauses each agent-started run until a person approves it. Use it for runbooks and deployments agents can run, but where you want a person to check each agent run first.

**Before you begin**

You'll need:

- A [manual intervention step](/docs/projects/built-in-step-templates/manual-intervention-and-approvals) in the runbook or deployment process, placed before the steps that make changes

To require a person to approve AI agent runs:

1. From the runbook or deployment process, select the manual intervention step.
2. Expand **Agent Responses**, and select **Prevent AI agents from responding to this intervention**.
3. In **Conditions**, select **Required**.
4. In **Run Condition**, select **Variable**.
5. Enter the following expression:

   ```text
   #{if Octopus.Deployment.CreatedBy.ActorType == "Agent"}true#{/if}
   ```

6. Select **Save**.

Runs started by an AI agent pause at the step until a person responds, and runs started by a person skip the step. AI agents that try to respond are told a person needs to respond. Learn more about [preventing AI agents from responding](/docs/projects/built-in-step-templates/manual-intervention-and-approvals#prevent-ai-agents-from-responding).

## Block AI agent runs with a policy

A policy can block AI agent runs across many projects, environments, or runbooks at once, from Platform Hub. Use it when the same rule applies across your instance, such as blocking all agent runs in production.

Octopus evaluates policies when the run's task starts, not when the run is created. The agent's request to start the run succeeds, and the task then fails without running any steps.

**Before you begin**

You'll need:

- The Octopus Enterprise tier, with [Platform Hub](/docs/platform-hub) configured
- Permission to edit Platform Hub

To block AI agent runs with a policy:

1. From **Platform Hub > Policies**, create a policy. See [Build your first policy](/docs/platform-hub/policies#build-your-first-policy).
2. Copy the scope and conditions from the [Block AI agents from running a runbook in production](/docs/platform-hub/policies/examples#block-ai-agents-from-running-a-runbook-in-production) example.
3. Replace the placeholder values with your runbook ID and production environment slug.
4. Select **Evaluate** to preview the policy against past runs.
5. Save, publish, and activate the policy.

AI agent runs that match the policy's scope fail with the policy's violation message in the task log. You can review each evaluation in **Platform Hub > Policies > Evaluations**.

## Version notes

- The `Actor` field in the policy input is available from Octopus Server 2026.4.5335+.
- The `Octopus.Deployment.CreatedBy.ActorType` system variable is available from Octopus Server 2026.4.6961.
- AI agent access for runbooks is available from Octopus Server 2026.4.9164.
- OAuth connections to Octopus Remote MCP are available from Octopus Server 2026.4.9289.

## Related links

- [Octopus Remote MCP](/docs/octopus-ai/mcp/remote)
- [Auditing](/docs/security/users-and-teams/auditing)
- [Runbook permissions](/docs/runbooks/runbook-permissions)
- [Policy examples](/docs/platform-hub/policies/examples)
