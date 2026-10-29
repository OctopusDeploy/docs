---
layout: src/layouts/Default.astro
pubDate: 2026-10-28
modDate: 2026-10-29
title: Connecting AI assistants with OAuth
navTitle: OAuth sign-in
sidebarLabel: OAuth sign-in
navOrder: 2
description: Connect Claude Code, Codex, Claude, ChatGPT, GitHub Copilot, and other AI assistants to Octopus Remote MCP by signing in with your Octopus account.
subject: Remote MCP, OAuth, AI assistants, Claude Code, GitHub Copilot, Codex, ChatGPT, MCP authentication
type: guide
audience: [app-dev, devops-eng, admin]
image:
imageAlt:
---

With OAuth, you connect an AI assistant to [Octopus Remote MCP](/docs/octopus-ai/mcp/remote) by signing in with your Octopus account, so there's no API key to create or store. The assistant acts as you, with the access level you choose, and can never do more than your account can.

| Access level | What the assistant can do |
| --- | --- |
| **Read-only** | Use your permissions, excluding any that make changes |
| **Full access** | Everything you can do, in every space you have access to |

Supported assistants include Claude Code, Claude, ChatGPT, Codex, GitHub Copilot, Google Antigravity, Zed, and Grok. Cursor doesn't support Octopus OAuth, so use an [Agent API key](/docs/octopus-ai/mcp/remote#connect-cursor) instead.

## Connect your AI assistant

**Before you begin**

You'll need:

- Octopus Cloud, or Octopus Server 2026.4.9289 or later.
- **Enable Remote MCP** turned on in **Configuration > Settings > MCP Controls**. It's on by default.
- An Octopus user account. Service accounts and the guest account can't sign in this way.
- For Claude, ChatGPT, and Grok, an Octopus instance that's reachable from the internet.

In each example, replace `your-octopus-url` with your Octopus address.

<details data-group="remote-mcp-oauth-assistant">
<summary>Claude Code</summary>

To connect Claude Code:

1. Run the following commands:

    ```bash
    claude mcp add --transport http octopus-deploy --scope user https://your-octopus-url/mcp
    claude mcp login octopus-deploy
    ```

2. [Approve access in Octopus](#approve-access-in-octopus).

</details>
<details data-group="remote-mcp-oauth-assistant">
<summary>Codex</summary>

The Codex CLI, IDE extension, and ChatGPT desktop app share the same configuration, so you only connect once.

To connect Codex:

1. Run the following commands:

    ```bash
    codex mcp add octopus-deploy --url https://your-octopus-url/mcp
    codex mcp login octopus-deploy
    ```

2. [Approve access in Octopus](#approve-access-in-octopus).

</details>
<details data-group="remote-mcp-oauth-assistant">
<summary>Other assistants</summary>

Use these steps for Claude on the web, Claude Desktop, ChatGPT, GitHub Copilot, and other assistants that support remote MCP servers with OAuth.

To connect another AI assistant:

1. Add a remote MCP server with the URL `https://your-octopus-url/mcp`. See your assistant's documentation for where to do this.
2. Choose OAuth if your assistant asks how to authenticate.
3. [Approve access in Octopus](#approve-access-in-octopus).

</details>

### Approve access in Octopus

Your assistant opens Octopus in your browser.

To approve access in Octopus:

1. Sign in, if you aren't already.
2. Check that the application and the address under **Authorization will be sent to** match your assistant.

    :::figure
    ![The Octopus consent page showing the application name, the Authorization will be sent to address, and the Read-only and Full access options](/docs/img/octopus-ai/mcp/oauth/consent-page.png)
    :::

3. Choose **Read-only** or **Full access**.
4. Select **Approve**.

To check the connection, ask your assistant to list your Octopus spaces. The connection lasts up to 20 days. After that, your assistant asks you to sign in again.

### Check the connection in Claude Code

In Claude Code, run `/mcp` to see the connection status:

:::figure
![The Claude Code /mcp panel showing octopus-deploy as connected](/docs/img/octopus-ai/mcp/oauth/claude-connected.png)
:::

## Disconnect an AI assistant

To disconnect Claude Code, run `claude mcp logout octopus-deploy`. This also ends its access in Octopus.

Most other assistants don't end their access in Octopus when you remove the server or sign out. To end it, revoke your sessions.

:::div{.warning}
**Revoke Sessions** disconnects all your AI assistants and signs you out of Octopus everywhere.
:::

To disconnect another AI assistant:

1. Remove the Octopus server from your assistant.
2. In Octopus, select your profile image.
3. Select **Profile**.
4. Select the overflow menu (`...`).
5. Select **Revoke Sessions**.

Administrators can revoke another user's sessions from **Configuration > Users**.

## Allow an AI assistant's redirect address

Octopus only returns you to an assistant on your computer (`localhost`) or on an allowed host. By default, the allowed hosts are `claude.ai`, `chatgpt.com`, `vscode.dev`, `grok.com`, and `console.x.ai`.

**Before you begin**

You'll need:

- The **ConfigureServer** permission.

To allow an AI assistant's redirect address:

1. Go to **Configuration > Settings > Authorization Server**.

    :::figure
    ![The Authorization Server settings page showing the Redirect URI allowlist and the Allow clients that redirect back to localhost setting](/docs/img/octopus-ai/mcp/oauth/authorization-server-settings.png)
    :::

2. Under **Redirect URI allowlist**, select **Add host**.
3. Enter the host shown on the "This request was blocked" page, such as `example.com`. It must match exactly.
4. Select **Save**.

Removing a host, or clearing **Allow clients that redirect back to localhost**, disconnects the affected assistants in up to 60 minutes.

## MCP OAuth audit events

Octopus records sign-ins and refused requests in the [audit log](/docs/security/users-and-teams/auditing). To see them, filter **Configuration > Audit** by one of these event groups.

| Event group | Events |
| --- | --- |
| **MCP OAuth events** | MCP OAuth authorization code issued, MCP OAuth authorization code issuance failed, MCP OAuth access token issued, MCP OAuth access token issuance failed, MCP OAuth access token revoked, MCP OAuth token revocation refused, MCP OAuth authorization request refused, OAuth redirect URI not allowed |
| **MCP OAuth critical-events** | MCP OAuth authorization code issuance failed, MCP OAuth access token issuance failed, MCP OAuth token revocation refused, MCP OAuth authorization request refused |

## Version notes

- OAuth sign-in for Octopus Remote MCP is available from Octopus Server 2026.4.9289.

## Related links

- [Octopus Remote MCP](/docs/octopus-ai/mcp/remote)
- [Octopus Remote MCP use cases](/docs/octopus-ai/mcp/remote/use-cases)
- [Configurable timeouts and session invalidation](/docs/security/users-and-teams/timeouts-and-invalidation)
