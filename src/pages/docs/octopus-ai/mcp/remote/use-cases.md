---
layout: src/layouts/Default.astro
pubDate: 2026-08-17
modDate: 2026-09-04
title: Octopus Remote MCP use cases
navTitle: Use cases
description: Explore how Octopus Remote MCP helps teams track releases, diagnose failures, automate deployments, source packages, audit changes, and manage tenants.
navOrder: 2
---

Octopus Remote MCP lets your AI assistant work with the deployment information and operations in your Octopus instance. These use cases show how it can reduce investigation time, make release status easier to understand, and help teams act without manually piecing together information from different parts of Octopus.

## Release visibility

Release visibility connects a pull request (PR) or feature to its releases, deployments, environments, and tenants. This helps developers and support teams answer what shipped, where it shipped, and whether the deployment succeeded without tracing each item manually.

Example prompts:

- "Show me the deployment status for PR 1842 in the Payments API project. When was it deployed to the Acme tenant?"
- "When did the checkout timeout fix from PR 1842 reach Production?"
- "Which version of the Payments API is the Acme tenant running, and were there any problems with its latest deployment?"

## Incident diagnosis

Incident diagnosis brings together deployment and runbook task details, logs, and related Octopus resources. This gives responders a faster starting point for identifying the failed step, understanding the cause, and deciding what to investigate next.

Example prompts:

- "Investigate the latest failed deployment for the Payments API project and explain the likely cause."
- "Why did the Nightly database maintenance runbook fail, and which step should I investigate first?"
- "What changed in Production before the Payments API incident, when was each change deployed, and which deployment targets received it?"

## Release progression

Release progression covers the path from creating a release to promoting it through its lifecycle. Your assistant can explain lifecycle rules, preview a deployment before it starts, create and deploy releases, run runbooks, and generate release notes.

Example prompts:

- "Describe the Payments API lifecycle, including its phases and progression rules."
- "Preview release 2.4.1 of the Payments API for Test and summarize what will run."
- "Create release 2.4.1 of the Payments API and deploy it to Development."
- "Promote Payments API release 2.4.1 to the next lifecycle environment."
- "Generate release notes for release 2.4.1 and attach them to the release."
- "Run the Restart payment workers runbook in Production."

Operations that make changes run with the permissions of the API key used to connect the assistant. Use a dedicated [Agent Service Account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) and grant it only the permissions it needs.

## Package sourcing

Package sourcing reveals how a feed is configured, including the registry or source it points at, and which versions of a package are available. Your assistant can confirm where a package comes from and pick a version a channel's rules will accept, without opening each feed by hand.

Example prompts:

- "Which registry does the worker-tools feed point at? I need Renovate to compare container versions against the right source."
- "How is the Docker Hub feed configured, and what registry path does it use?"
- "List the available versions of the Payments API package in the Releases feed."
- "What's the latest version of the Payments API package the 2.x channel will accept?"

## Operational oversight

Operational oversight summarizes activity across projects, tasks, deployment targets, and audit events. This helps platform teams identify unhealthy infrastructure, blocked work, and unusual changes without reviewing each project separately.

Example prompts:

- "Report deployment health across all projects over the last 7 days. Highlight recurring failures and the projects most affected."
- "List running, queued, and failed tasks across the instance. Group them by state and show how long they have been in that state."
- "Review deployment targets in Production and summarize their health, roles, and environments."
- "What changed in the Payments space in the last hour? Summarize the relevant audit events."

## Tenant configuration

Tenant configuration combines tenant details, tags, and variable status to help teams manage deployments at scale. This makes it easier to find inconsistent configuration before it causes a tenant-specific deployment failure.

Example prompts:

- "Find tenants in the Payments space with incomplete variable configuration and list the missing values."
- "Show me the tenant tag sets used in the Payments space and summarize how tenants are grouped."
- "Find the Acme tenant and show its connected projects, environments, tags, and configuration status."

## Related links

- [Octopus Remote MCP](/docs/octopus-ai/mcp/remote)
- [Agent Service Accounts](/docs/security/users-and-teams/service-accounts#agent-service-accounts)
- [Agent API keys](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key)
