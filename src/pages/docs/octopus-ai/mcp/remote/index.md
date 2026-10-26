---
layout: src/layouts/Default.astro
pubDate: 2026-08-17
modDate: 2026-10-26
title: Octopus Remote MCP
navTitle: Remote MCP
navSection: Octopus Remote MCP
description: Connect AI assistants to your Octopus instance with the hosted Octopus Remote MCP server.
navOrder: 1
---

Octopus Remote MCP lets the AI assistants you already use, such as Claude, GitHub Copilot, and Cursor, inspect, query, and make changes to resources in your Octopus instance and help diagnose deployment problems. It uses [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP), an open standard for connecting AI assistants to the tools and data they work with.

The MCP server runs in your Octopus instance, so there's nothing to install locally and no server versions to manage. New tools and features ship through Remote MCP. The [local Octopus MCP server](/docs/octopus-ai/mcp/local) remains available, but it won't receive new features.

:::figure
![Example of Claude answering a question about an Octopus deployment using Octopus Remote MCP tools](/docs/img/octopus-ai/mcp/claude-screenshot.webp)
:::

## Available tools

Octopus Remote MCP exposes a different set of tools from [Local MCP](/docs/octopus-ai/mcp/local). Its tools have 2 layers:

- Dedicated tools for common operations, such as `find_spaces` and `find_projects`.
- Contract tools that provide access to selected Octopus REST API operations. The AI assistant uses `search_contracts` to find a contract, `describe_contract` to inspect its schema, and then `execute_query` for read operations or `execute_command` for operations that make changes.

Octopus Remote MCP supports a set of core Octopus features. We'll add more operations to the contract tools over time.

## Getting started

### Requirements

- An Octopus Deploy instance reachable over HTTPS
- An Octopus Deploy API key
- An AI assistant that supports remote MCP servers over HTTP with a custom request header
- Remote MCP enabled in **Configuration > Settings > MCP Controls**

We recommend creating a dedicated [Agent Service Account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) and generating an [Agent API key](/docs/octopus-rest-api/how-to-create-an-api-key#creating-an-agent-api-key) for it. This gives the MCP server its own identity, limits its permissions, and identifies its activity in the audit log and on the API Keys page.

### Connection details

Every AI assistant needs the same 3 values to connect to Octopus Remote MCP. Only the place you enter them changes.

| Setting | Value |
| --- | --- |
| Server URL | `https://your-octopus-instance.com/mcp` |
| Transport | Streamable HTTP (often labeled `http`) |
| Authentication header | `X-Octopus-ApiKey`, set to your Agent API key |

The following sections show where these values go in popular AI assistants. In each example, replace `your-octopus-instance.com` with the address of your Octopus instance.

:::div{.hint}
Don't commit API keys to source control. Where an assistant supports it, reference an environment variable or a secure prompt instead of pasting the key into a configuration file.
:::

## Connect your AI assistant

### Connect Claude Code

Add Octopus Remote MCP to Claude Code from the command line so Claude Code can use Octopus tools in your sessions.

To connect Claude Code:

1. Set the `OCTOPUS_API_KEY` environment variable to your Agent API key.
2. Run the following command:

    ```bash
    claude mcp add --transport http octopus-deploy https://your-octopus-instance.com/mcp --header "X-Octopus-ApiKey: ${OCTOPUS_API_KEY}"
    ```

Alternatively, add the following `octopus-deploy` entry to the top-level `mcpServers` object in your `~/.claude.json` file:

```json
{
  "mcpServers": {
    "octopus-deploy": {
      "type": "http",
      "url": "https://your-octopus-instance.com/mcp",
      "headers": {
        "X-Octopus-ApiKey": "${OCTOPUS_API_KEY}"
      }
    }
  }
}
```

### Connect Claude Desktop through a local proxy

Connect Claude Desktop through the [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) proxy. The proxy runs locally and forwards requests to Octopus with your API key attached, so it works with any Octopus instance your computer can reach, including instances on a private network. You need [Node.js](https://nodejs.org/) 18 or later installed on your computer.

To connect Claude Desktop through a local proxy:

1. In Claude Desktop, go to **Settings > Developer** and select **Edit Config**.
2. Add the following to `claude_desktop_config.json`, replacing `API-XXXXXXXX` with your Agent API key:

    ```json
    {
      "mcpServers": {
        "octopus-deploy": {
          "command": "npx",
          "args": [
            "-y",
            "mcp-remote",
            "https://your-octopus-instance.com/mcp",
            "--header",
            "X-Octopus-ApiKey:${OCTOPUS_API_KEY}"
          ],
          "env": {
            "OCTOPUS_API_KEY": "API-XXXXXXXX"
          }
        }
      }
    }
    ```

3. Save the file, then quit and restart Claude Desktop.

To check the connection, select **+** in the chat input, go to **Connectors**, and confirm `octopus-deploy` is listed.

### Connect GitHub Copilot in VS Code

Add Octopus Remote MCP to VS Code so GitHub Copilot can use Octopus tools in agent mode.

To connect GitHub Copilot in VS Code:

1. Create a `.vscode/mcp.json` file in your workspace.
2. Add the following configuration:

    ```json
    {
      "inputs": [
        {
          "type": "promptString",
          "id": "octopus-api-key",
          "description": "Octopus Agent API key",
          "password": true
        }
      ],
      "servers": {
        "octopus-deploy": {
          "type": "http",
          "url": "https://your-octopus-instance.com/mcp",
          "headers": {
            "X-Octopus-ApiKey": "${input:octopus-api-key}"
          }
        }
      }
    }
    ```

3. Save the file. VS Code shows a **Start** action above the `octopus-deploy` entry. Select it and enter your Agent API key when prompted.
4. Open Copilot Chat in agent mode and check that the Octopus tools appear in the tools picker. Try a read-only request first, such as asking Copilot to list your spaces, to confirm the connection works and the API key has the permissions you expect.

### Connect Cursor

Add Octopus Remote MCP to Cursor so its agent can use Octopus tools.

To connect Cursor:

1. Set the `OCTOPUS_API_KEY` environment variable to your Agent API key.
2. Open or create `~/.cursor/mcp.json`, or `.cursor/mcp.json` in your project to limit the server to that project.
3. Add the following configuration:

    ```json
    {
      "mcpServers": {
        "octopus-deploy": {
          "url": "https://your-octopus-instance.com/mcp",
          "headers": {
            "X-Octopus-ApiKey": "${env:OCTOPUS_API_KEY}"
          }
        }
      }
    }
    ```

4. Restart Cursor.
5. Go to **Customize** (called **Tools & MCP** in some Cursor versions) and confirm that `octopus-deploy` connects and lists its tools.

### Connect other AI assistants

Any AI assistant that supports remote MCP servers over HTTP with custom headers can connect to Octopus Remote MCP. Follow your assistant's documentation for adding a remote MCP server, and use the values in [Connection details](#connection-details).

If your assistant only supports local MCP servers that run as a command on your computer, use the [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) proxy as shown in [Connect Claude Desktop through a local proxy](#connect-claude-desktop-through-a-local-proxy).

### OAuth support

We plan to add OAuth authentication in a future release. Until then, AI assistants that only support OAuth for remote MCP servers can't connect to Octopus Remote MCP directly.

## Security

Octopus Remote MCP uses the same security boundary as the Octopus REST API. Permissions for the user or service account that owns the API key apply in the same way.

To stop agents from running a runbook, use the runbook's [AI agent access](/docs/runbooks/runbooks-vs-deployments#ai-agent-access) setting. The MCP server returns no environments for a blocked runbook, so agents don't try runs that would fail.

## Turn off Remote MCP

To turn off Remote MCP, go to **Configuration > Settings > MCP Controls**. Clear the **Enable Remote MCP** checkbox, then select **Save**.

:::figure
![The MCP Controls settings page with checkboxes to enable Remote MCP and Local MCP](/docs/img/octopus-ai/mcp/mcp-settings.png)
:::

## Related links

- [Octopus Remote MCP use cases](/docs/octopus-ai/mcp/remote/use-cases)
- [Local MCP](/docs/octopus-ai/mcp/local)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
