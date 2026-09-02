---
layout: src/layouts/Default.astro
pubDate: 2025-04-04
modDate: 2026-08-17
title: Local MCP use cases
navTitle: Use cases
description: Example prompts for change management, troubleshooting, administration, audit, and compliance with Local MCP.
navOrder: 3
---

These examples are a starting point for using the local Octopus MCP server.

## Change management

Reason about which changes have been deployed and where. This can help you understand which software versions your customers use in production.

### Production version tracking

Find the software version that a customer, represented by a tenant, is running in Production. You can also identify issues with their most recent deployment.

**Example prompt**

```text
Customer X has submitted a support ticket reporting a bug in the latest release of App. Which release are they using, when was it deployed, and were there any issues with the deployment?
```

## Troubleshooting

Investigate failed deployments or unhealthy deployment targets to help restore service faster.

### Deployment health analysis

Check for failed deployments or unhealthy Kubernetes workloads, analyze the reasons for failure, and suggest solutions.

**Example prompt**

```text
Check the health of the {ServiceName} service in the {SpaceName} space and report any issues. Check the status of Kubernetes services to produce a comprehensive report.
```

Prompt for Kubernetes status to trigger a Kubernetes [live object status](/docs/kubernetes/live-object-status) check.

## Administration, audit, and compliance

Inspect your Octopus instance to help keep deployments healthy and configurations compliant.

### Certificate expiry monitoring

Identify unhealthy resources, expiring certificates, or unused projects in your Octopus instance.

**Example prompt**

```text
Find certificates in the {SpaceName} space that will expire soon.
```

### Resource access validation

Find configured resources in your Octopus instance and check whether they can access the required targets.

**Example prompt**

```text
Check the accounts configured in the {SpaceName} space in my Octopus instance. Find the preproduction Azure account, then use the Azure MCP server to check which resources are available in that subscription.
```

## Related links

- [Local Octopus MCP server](/docs/octopus-ai/mcp/local)
- [Octopus Remote MCP](/docs/octopus-ai/mcp/remote)
