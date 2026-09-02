---
layout: src/layouts/Default.astro
pubDate: 2026-08-17
modDate: 2026-08-17
title: Octopus Remote MCP
navTitle: Remote MCP
navSection: Octopus Remote MCP
description: Connect AI assistants to your Octopus instance with the hosted Octopus Remote MCP server.
navOrder: 1
---

Octopus Remote MCP connects the AI assistants you use in your day-to-day work to your Octopus Deploy instance. It gives those assistants access to Octopus tools and information through a standardized protocol.

## Model Context Protocol

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is an open standard that connects AI assistants, such as Claude Code and ChatGPT, to the systems and services you own. These connections let assistants retrieve information and perform tasks across those systems and services.

## Octopus Remote MCP server

The Octopus Remote MCP server provides tools that let an AI assistant inspect and query resources in your Octopus instance and help diagnose problems. This turns your assistant into a DevOps partner that can work with the deployment information already in Octopus.

The remote server runs in your Octopus Deploy instance, so you don't need to install the MCP server locally or manage server versions. New tools and features will be delivered through the remote server.

The [local Octopus MCP server](/docs/octopus-ai/mcp/local) will remain available for the foreseeable future, but it won't receive new features.

:::figure
![Sample MCP session](/docs/img/octopus-ai/mcp/claude-screenshot.webp)
:::

## Available tools

Octopus Remote MCP exposes a different set of tools from [Local MCP](/docs/octopus-ai/mcp/local). Its tools have two layers:

- Dedicated tools for common operations, such as `find_spaces` and `find_projects`.
- Contract tools that provide access to selected Octopus REST API operations. The AI assistant uses `search_contracts` to find a contract, `describe_contract` to inspect its schema, and then `execute_query` for read operations or `execute_command` for operations that make changes.

Octopus Remote MCP initially supports a selected set of core Octopus features. We'll add more operations to the contract tools over time.

## Getting Started

### Requirements

- An Octopus Deploy instance that can be accessed over HTTPS
- An Octopus Deploy API key. We recommend creating a dedicated [Agent Service Account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) and generating an [Agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) for it. This gives the MCP server its own identity, limits its permissions, and identifies its activity in the audit log and on the API Keys page.

Set the `OCTOPUS_API_KEY` environment variable to your Agent API key, then run:

```bash
claude mcp add --transport http \
  --header "X-Octopus-ApiKey:${OCTOPUS_API_KEY}" \
  octopus-deploy https://your-octopus-instance.com/mcp
```

Or in JSON format:

```json
"mcpServers": {
  "octopus-deploy": {
    "type": "http",
    "url": "https://your-octopus-instance.com/mcp",
    "headers": {
      "X-Octopus-ApiKey": "${OCTOPUS_API_KEY}"
    }
  }
},
```

### OAuth Support

OAuth authentication flow is planned for a future release.

## Security

The Octopus MCP server operates within the same security boundary as our Rest API - user permissions still apply the same way.

## Governance

Use dedicated [Agent API keys](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) and [Agent Service Accounts](/docs/security/users-and-teams/service-accounts#agent-service-accounts) for agents connecting to your Octopus instance. These make agent actions identifiable and filterable in the audit log.

## Configuration

Optionally, both the Remote MCP and the Local MCP can be disabled from **Configuration -> Settings -> MCP Controls** page.

:::figure
![MCP Settings](/docs/img/octopus-ai/mcp/mcp-settings.png)
:::

:::div{.warning}
Disabling the Local MCP will block incoming requests with the specific user agent string. A rogue AI agent could potentially replace this string with a different value and bypass the restriction.
:::

## Related links

- [Octopus Remote MCP use cases](/docs/octopus-ai/mcp/remote/use-cases)
- [Local MCP](/docs/octopus-ai/mcp/local)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
