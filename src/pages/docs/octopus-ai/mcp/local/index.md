---
layout: src/layouts/Default.astro
pubDate: 2025-04-04
modDate: 2026-08-17
title: Local Octopus MCP server
navTitle: Overview
navSection: Local MCP
description: Install and run the local Octopus MCP server to connect AI clients to Octopus Deploy.
navOrder: 2
---

The local Octopus MCP server connects AI assistants to your Octopus Deploy infrastructure. It uses [Model Context Protocol](https://modelcontextprotocol.io/introduction), an open standard for connecting AI assistants to external data sources and tools.

The local MCP server provides similar capabilities to the Octopus AI Assistant, with some additional benefits:

- You can use it with your client and model of choice.
- It can work alongside other MCP servers to coordinate tasks across Octopus and your other software services.

The server provides tools for change management, troubleshooting, administration, audit and compliance, and standardization at scale.

The local Octopus MCP server remains available for existing workflows, but it won't receive new features. For the latest tools and features without a local installation, use [Octopus Remote MCP](/docs/octopus-ai/mcp/remote).

The local Octopus MCP server is open source and available from the [Octopus MCP server GitHub repository](https://github.com/OctopusDeploy/mcp-server).

## Security

The local Octopus MCP server communicates with your Octopus instance's REST API over HTTPS. It uses Octopus Server's API key security, so interactions are authenticated, limited to the permissions associated with the API key, and audited.

For more information, see the [Octopus REST API](/docs/octopus-rest-api) documentation.

## Governance

Use dedicated [Agent API keys](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) and [Agent Service Accounts](/docs/security/users-and-teams/service-accounts#agent-service-accounts) for agents connecting to your Octopus instance. These make agent actions identifiable and filterable in the audit log.

## Installation

### Requirements

- Node.js 20 or later
- An Octopus Deploy instance that the MCP server can access over HTTPS
- An Octopus Deploy API key. We recommend creating a dedicated [Agent Service Account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) and generating an [Agent API key](/docs/api/authentication/create-an-api-key#creating-an-agent-api-key) for it. This gives the MCP server its own identity, limits its permissions, and identifies its activity in the audit log and on the API Keys page.

### Configuration

The following example configures the server for Claude Desktop, Claude Code, and Cursor:

```json
{
  "mcpServers": {
    "octopusdeploy": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@octopusdeploy/mcp-server"],
      "env": {
        "OCTOPUS_SERVER_URL": "https://your-octopus.com",
        "OCTOPUS_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Configure the local Octopus MCP server in your chosen AI client. The server is published as an npm package and runs through Node.js with `npx`. The configuration must provide the Octopus Server URL and API key as environment variables or command-line arguments.

Run the server with configuration supplied through environment variables:

```bash
OCTOPUS_API_KEY=API-KEY \
OCTOPUS_SERVER_URL=https://your-octopus.com \
npx -y @octopusdeploy/mcp-server
```

Alternatively, supply the server URL as a command-line argument:

```bash
OCTOPUS_API_KEY=API-KEY \
npx -y @octopusdeploy/mcp-server --server-url https://your-octopus.com
```

For detailed configuration information, see the [Octopus MCP server GitHub repository](https://github.com/OctopusDeploy/mcp-server).

## Related links

- [Local MCP use cases](/docs/octopus-ai/mcp/local/use-cases)
- [Octopus Remote MCP](/docs/octopus-ai/mcp/remote)
