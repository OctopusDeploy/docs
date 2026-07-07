---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-07-03
title: Claude Agent Step tools, MCP servers, and skills
navTitle: Tools
description: Configure MCP servers and skills to extend what the agent in the Claude Agent Step can do, and control the deployment context and files it works with.
navOrder: 3
---

The Claude Agent Step runs Claude Code, Anthropic's agentic tool, as a step in your deployment process or runbook. Out of the box the agent can read and write files, run commands, and reach the web, all subject to the permission and sandbox controls you set. In addition, the agent can see your non-sensitive deployment variables, has a way to save files back to Octopus, and a way to fail the step on a condition you describe. This page covers the ways you extend what the agent can do and what it knows about your deployment:

- **MCP servers** give the agent extra tools, such as querying an issue tracker or a database.
- **Skills** are focused instructions the agent loads only when they're relevant.

## The Octopus MCP server

Octopus publishes its own [MCP server](/docs/octopus-ai/mcp), which lets an AI agent query and act on your Octopus instance: its projects, releases, deployments, machines, and more. The Claude Agent Step can wire this server up for the agent automatically, so the agent can answer questions about your Octopus data and take Octopus actions without you configuring a server by hand.

### Turning it on

The step adds the Octopus MCP server automatically whenever the `Octopus.Action.Claude.OctopusToken` variable is set. The value is an Octopus API key that the server uses to authenticate to your instance; Octopus supplies the server URL for you.

Set it as a **sensitive variable** named `Octopus.Action.Claude.OctopusToken`, so the key is kept out of the task log and execution context. The Octopus MCP server runs as an `npx` package, so `npx` (Node.js) must be available on the worker or target that runs the step, the same as for any other stdio MCP server.

### Use a scoped agent token

The token is the agent's identity into Octopus, so its permissions *are* the agent's authority: whatever the token can do, the agent can do. Scope it deliberately.

- Create a dedicated [agent service account](/docs/security/users-and-teams/service-accounts#agent-service-accounts) and generate an [agent API key](/docs/octopus-rest-api/how-to-create-an-api-key#creating-an-agent-api-key) under it. This gives the agent its own identity, keeps its activity identifiable in the audit log, and lets you revoke it on its own.
- Grant that account the least privilege the task needs. For investigation and reporting, read-only access is usually enough, and it's what we recommend for a first run.
- Store the key as the sensitive `Octopus.Action.Claude.OctopusToken` variable described above.

All of the MCP tools are allowed, so ensure that the API token is scoped properly. For how this fits the step's security model, see [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance#mcp-server-security).

## Additional MCP servers

The **Model Context Protocol (MCP)** is an open standard for connecting an AI agent to external tools and data. An MCP server is a program the agent talks to; it advertises a set of tools (for example "create an issue" or "run a query"), and the agent can call them during the run. Configuring an MCP server is how you let the agent reach systems that Octopus and Claude Code don't know about on their own.

### Configuring an MCP server

You configure MCP servers on the step, under **Agent Capabilities (optional)** > **MCP**. Select **Add MCP** and complete the form:

- **Type**: `stdio` or `http` (see below).
- **Name**: a unique identifier for this server, such as `github` or `jira`.
- For a **stdio** server, **Command** (the executable that starts the server, such as `npx`, `node`, or `python`) and **Arguments** (one per line, passed to the command).
- For an **http** server, **URL** (the server's endpoint) and **Headers** (name/value pairs sent with each request, for example an `Authorization` header).
- **Environment Variables**: name/value pairs set in the server process. Use [variable substitution](/docs/projects/variables) for secrets, for example a value of `#{GitHubToken}`, so the token is never stored in plain text on the step.
- **Tools**: which of the server's tools the agent may call. See [choosing which tools the agent can use](#choose-which-tools-the-agent-can-use) below.

A **stdio** server is a command Octopus runs on the worker or target and talks to over standard input and output; use it for a server you install and run locally, such as an `npx` package. The command must be installed and resolvable on the machine the step runs on, and because stdio servers start without a login shell, a command such as `npx` resolves using the worker's `PATH`. An **http** server is a remote endpoint Octopus connects to by URL; use it for a hosted server.

Each entry must have a unique `name` and either a `stdio` type with a non-empty `command` or an `http` type with a non-empty `url`.

### Choose which tools the agent can use

The **Tools** field on each server controls which of that server's tools the agent may call. Enter one tool name or pattern per line, without the `mcp__<name>__` prefix, or `*` to allow every tool the server offers. A newly added server allows all tools (`*`) by default.

```text
list_issues
create_issue
```

Octopus turns these into the underlying `mcp__<name>__<tool>` permissions and adds them to the agent's allowed tools for you.

If you clear the **Tools** field entirely, the agent can't call any of that server's tools. Permission modes and tool allowlisting are covered in full on the [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) page.

### A complete example

This example gives the agent read access to files in its working directory using the reference filesystem MCP server. In the **Add MCP** drawer:

- **Type**: `stdio`
- **Name**: `filesystem`
- **Command**: `npx`
- **Arguments**:
  ```
  -y
  @modelcontextprotocol/server-filesystem
  .
  ```
- **Environment Variables**: none
- **Tools**: `*` (the default)

With this in place, a prompt such as "Use the filesystem tools to list the configuration files in the working directory and summarize them" will let the agent call the server's tools. The `npx` command must be available on the worker or target that runs the step.

<!-- SCREENSHOT: mcp-server-drawer.png
Instance: local dev instance (http://localhost:8065) or https://claude-step.testoctopus.app
Space: Default; Project: "Claude Agent Docs Demo" (create if absent); Process > a Claude Agent Step (step name "Investigate deployment failure")
Setup: On the step, expand "Agent Capabilities (optional)" > MCP, select "Add MCP". In the drawer set Type = stdio, Name = filesystem, Command = npx, Arguments = "-y", "@modelcontextprotocol/server-filesystem", "." (one per line). Leave Environment Variables empty and Tools at the default "*".
Navigate: Open the Add MCP drawer with the fields filled in as above.
Capture: the Add MCP drawer showing Type, Name, Command, Arguments, Environment Variables, and Tools, light theme, 1440px viewport
Alt text: "The Add MCP drawer with the filesystem stdio MCP server configured"

![The Add MCP drawer with the filesystem stdio MCP server configured](/docs/img/octopus-ai/claude-agent-step/mcp-server-drawer.png)
-->


## Skills and context

### What a skill is

A skill is a markdown file of instructions that the agent loads on demand. Instead of putting everything in the prompt, you write focused guidance (how your team formats release notes, say, or the steps of a smoke test) and the agent reads it only when the task calls for it. Each skill has a short description, and the agent decides from that description whether the skill is relevant to what you've asked.

### Built-in skills and context

Every run of the step includes three skills that connect the agent to Octopus.

#### Deployment context

The `octopus-deployment-context` skill tells the agent how to read the deployment's variables. Before the run, Octopus writes the non-sensitive deployment variables to a `deployment-variables.json` file in the agent's working directory. From this, the agent can learn the environment, project, tenant, release version, and any custom variables scoped to the step. When the agent needs more information around the deployment, the agent reads this file rather than guessing.

#### Saving files as artifacts

The `octopus-artifacts` skill is how you get files out of a run and into Octopus as [artifacts](/docs/projects/deployment-process/artifacts), so they're downloadable from the deployment or task afterward.

The agent uses this skill only when your prompt explicitly asks for a file to be attached, uploaded, published, or saved to Octopus. To trigger the behavior, say so in the prompt, for example "generate a report and attach it to the deployment as an artifact."

By default the combined size of all captured artifacts is capped at 5 GB. To raise or lower it, set the `Octopus.Action.Claude.MaxArtifactSizeInMegaBytes` variable (its value is in megabytes). Exceeding the cap fails the step.

#### Failing the step on a condition

By default the step succeeds whenever the agent finishes normally, regardless of what it found. The `octopus-fail-deployment` skill is how you make the step fail on a condition you describe, such as "fail the deployment if the smoke test does not pass."

When your prompt states a failure condition and the agent decides it has been met, the agent writes a sentinel block in its final message:

```text
<octopus-task-failed>
Smoke test returned HTTP 500 from /health after 3 retries.
</octopus-task-failed>
```

Octopus detects the closed block and fails the step, surfacing the reason in the task log.

:::div{.hint}
This is a best-effort signal. It depends on the agent correctly following the skill and deciding the condition is met, so it isn't a deterministic guarantee the way the step's built-in failure checks are (a non-zero exit, a denied tool call, or a budget or turn limit reached always fail the step). Use it for conditions only the agent can judge, and keep prompts specific about what should count as failure. Deterministic failure handling is covered on the [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) page.
:::

### Providing your own skills

You can add your own skills to guide the agent for a particular task. On the step, under **Agent Capabilities (optional)** > **Skills**, select **Add Skill** and provide:

- **Name**: a unique name for the skill, such as `code-review` or `release-notes`.
- **Content**: the skill's instructions, written in markdown.

Give the content a clear opening line describing when the skill applies; the agent uses that to decide whether to load it.

When the step runs, each skill you provide is written to a file the agent can discover, alongside the built-in skills. Skill names must be valid file names: a name containing `/`, `\`, or `..` is rejected when you save the step.

<!-- SCREENSHOT: skills-drawer.png
Instance: local dev instance (http://localhost:8065) or https://claude-step.testoctopus.app
Space: Default; Project: "Claude Agent Docs Demo" (create if absent); Process > a Claude Agent Step (step name "Investigate deployment failure")
Setup: On the step, expand "Agent Capabilities (optional)" > Skills, select "Add Skill". In the drawer set Name = release-notes and Content = a short markdown skill (e.g. a heading and two bullet points describing how the team writes release notes).
Navigate: Open the Add Skill drawer with Name and Content filled in.
Capture: the Add Skill drawer showing the Name and Content fields, light theme, 1440px viewport
Alt text: "The Add Skill drawer with a custom skill name and markdown content"

![The Add Skill drawer with a custom skill name and markdown content](/docs/img/octopus-ai/claude-agent-step/skills-drawer.png)
-->


## Related pages

- [Getting started with the Claude Agent Step](/docs/octopus-ai/claude-agent-step)
- [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance)
- [Octopus MCP server](/docs/octopus-ai/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
