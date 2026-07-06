---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-07-03
title: Claude Agent Step tools, MCP servers, and skills
navTitle: Tools
description: Configure MCP servers and skills to extend what the agent in the Claude Agent Step can do, and control the deployment context and files it works with.
navOrder: 3
---

The Claude Agent Step runs Claude Code, Anthropic's agentic tool, as a step in your deployment process or runbook. Out of the box the agent can read and write files, run commands, and reach the web, all subject to the permission and sandbox controls you set. This page covers the three ways you extend what the agent can do and what it knows about your deployment:

- **MCP servers** give the agent extra tools, such as querying an issue tracker or a database.
- **Skills** are focused instructions the agent loads only when they're relevant.
- **Built-in context** is what every run gets for free: your deployment variables, a way to save files back to Octopus, and a way to fail the step on a condition you describe.

The step is an alpha release. In the step picker it currently appears as **Run Claude Agent**, described as "Runs the Claude Code CLI tool."

## The Octopus MCP server

Octopus publishes its own [MCP server](/docs/octopus-ai/mcp), which lets an AI assistant query and work with your Octopus instance, its projects, releases, deployments, and more.

Octopus also plans a built-in version that the step wires up for you automatically, using a scoped token issued just for the run. That version is **not yet available** in the Claude Agent Step, so don't rely on the agent reaching your Octopus instance unless you configure access yourself.

<!-- NEEDS-HUMAN-VALIDATION: Built-in Octopus MCP server is still NOT wired up end-to-end as of 2026-07-03. The executor (Calamari origin/main, McpWriter.cs) adds `@octopusdeploy/mcp-server` when an `Octopus.Action.Claude.OctopusToken` variable is present, but nothing on the Server issues, scopes, or passes that token. Branch em/claude-mcp-ui (PR #44873, unmerged as of 2026-07-03) was examined: it is the EXTERNAL MCP UI redesign (adds http server type + per-server tool allowlists + moves the validator to Octopus.Core) and does NOT add OctopusToken issuance or otherwise wire up the built-in Octopus MCP server. So even after PR #44873 merges, no built-in Octopus MCP server connects in a run. Re-check when a separate change issues the scoped token end-to-end, then document what it exposes, how the token is scoped, and how to turn it on, and live-verify in a real run's task log. -->

If you want the agent to work with Octopus data now, you have two options:

- Configure the Octopus MCP server yourself as an [additional MCP server](#additional-mcp-servers), using an Octopus API key you supply as a variable. Follow the [Octopus MCP server documentation](/docs/octopus-ai/mcp) for the command and setup, then allowlist its tools as described below.
- Put the context the agent needs into the prompt, or rely on the [built-in deployment context](#deployment-context) for variables that Octopus already knows about.

## Additional MCP servers

The **Model Context Protocol (MCP)** is an open standard for connecting an AI agent to external tools and data. An MCP server is a program the agent talks to; it advertises a set of tools (for example "create an issue" or "run a query"), and the agent can call them during the run. Configuring an MCP server is how you let the agent reach systems that Octopus and Claude Code don't know about on their own.

### Configuring an MCP server

You configure MCP servers on the step, under **Agent Capabilities (optional)** > **MCP**. Select **Add MCP Server** and complete the drawer:

- **Name**: a unique identifier for this server, such as `github` or `jira`. The agent's tools from this server are named `mcp__<name>__<tool>`, so keep the name short and stable.
- **Command**: the executable that starts the server, such as `npx`, `node`, or `python`.
- **Arguments**: one argument per line, passed to the command.
- **Environment Variables**: name/value pairs set in the server process. Use [variable substitution](/docs/projects/variables) for secrets, for example a value of `#{GitHubToken}`, so the token is never stored in plain text on the step.

The step launches MCP servers over standard input/output (stdio): Octopus starts the command you specify on the worker or target and talks to it directly. The command must be installed and resolvable on the machine the step runs on. Because stdio servers start without a login shell, a command such as `npx` resolves using the worker's `PATH`. Remote (HTTP) MCP servers can't be configured in this alpha; if you need one, front it with a local stdio proxy such as `mcp-remote`.

<!-- NEEDS-HUMAN-VALIDATION: in-flight change — monorepo PR #44873 (branch em/claude-mcp-ui, unmerged as of 2026-07-03) redesigns this drawer: adds an http server type (URL + Headers), renames the button to "Add MCP", adds a per-server Tools allowlist field defaulting to * (all tools), auto-generates the mcp__<name>__* allow entries (which makes the "MCP server tools are added automatically" UI note accurate and removes the manual-allowlisting step below), and moves the validator to Octopus.Core. If merged by publish time, swap this section and "Allow the agent to call the server's tools" for the prepared text in scratchpad file tools-mcp-section-pr44873.md, re-verify the allowedTools default survived PR review, and update the matching paragraphs on Security & Compliance. -->

The servers you configure are stored on the step as a JSON array in the `Octopus.Action.Claude.McpServers` property. Each entry has this shape, which is useful if you set the property directly or through a variable:

```json
[
  {
    "name": "filesystem",
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
    "env": {}
  }
]
```

Octopus validates the configuration when you save the step. Each entry must have a non-empty `name`, `type`, and `command`, an `args` array of strings, and an `env` object of string values, and every server name must be unique. An invalid configuration blocks saving.

### Only the servers you configure are loaded

The step runs Claude Code with strict MCP configuration (`--strict-mcp-config`). Only the servers you configure on the step are loaded; the agent picks up nothing from MCP configuration files that happen to exist on the worker or in a user's home directory. This keeps the set of tools available to the agent predictable and under your control. For how this fits the step's wider security model, see [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance).

### Allow the agent to call the server's tools

Configuring a server makes its tools *available* to the agent, but with the default **dontAsk** permission mode the agent may only call tools you've explicitly allowed. Any tool call that isn't allowed is denied, and a denied tool call fails the step. So after adding an MCP server you must also allow its tools, or the agent won't be able to use them.

Add the server's tools to **Allowed tools**, under **Security** > **Tool Permissions**. Use the `mcp__<name>__*` pattern to allow every tool from a server, or name individual tools:

```text
mcp__filesystem__*
mcp__github__list_issues
```

The server name in the pattern must match the **Name** you gave the server exactly.

:::div{.warning}
The Tool Permissions field notes that "MCP server tools are added automatically." In the current alpha this doesn't happen for servers you configure: their tools aren't allowlisted for you, so you must add the `mcp__<name>__*` patterns yourself. Without them, the agent's calls to the server are denied and the step fails.
:::

Permission modes and tool allowlisting are explained in full on the [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) page.

### A complete example

This example gives the agent read access to files in its working directory using the reference filesystem MCP server. The MCP server entry:

- **Name**: `filesystem`
- **Command**: `npx`
- **Arguments** (one per line): `-y`, then `@modelcontextprotocol/server-filesystem`, then `.`
- **Environment Variables**: none

And the matching entry in **Allowed tools**:

```text
mcp__filesystem__*
```

With this in place, a prompt such as "Use the filesystem tools to list the configuration files in the working directory and summarize them" will let the agent call the server's tools. The `npx` command must be available on the worker or target that runs the step.

<!-- SCREENSHOT: mcp-server-drawer.png
Instance: local dev instance (http://localhost:8065) or https://claude-step.testoctopus.app
Space: Default; Project: "Claude Agent Docs Demo" (create if absent); Process > a Claude Agent Step (step name "Investigate deployment failure")
Setup: On the step, expand "Agent Capabilities (optional)" > MCP, select "Add MCP Server". In the drawer set Name = filesystem, Command = npx, Arguments = "-y", "@modelcontextprotocol/server-filesystem", "." (one per line). Leave Environment Variables empty.
Navigate: Open the Add MCP Server drawer with the fields filled in as above.
Capture: the Add MCP Server drawer showing Name, Command, Arguments, and Environment Variables, light theme, 1440px viewport
Alt text: "The Add MCP Server drawer with the filesystem MCP server configured"
NOTE: if PR #44873 has merged by capture time, the drawer gains Type and Tools fields and the button is renamed "Add MCP" — recheck the docs text first (see in-flight note above).

![The Add MCP Server drawer with the filesystem MCP server configured](/docs/img/octopus-ai/claude-agent-step/mcp-server-drawer.png)
-->


## Skills and context

### What a skill is

A skill is a markdown file of instructions that the agent loads on demand. Instead of putting everything in the prompt, you write focused guidance (how your team formats release notes, say, or the steps of a smoke test) and the agent reads it only when the task calls for it. Each skill has a short description, and the agent decides from that description whether the skill is relevant to what you've asked.

### Built-in skills and context

Every run of the step includes three skills that connect the agent to Octopus. You don't configure them; they're always present.

#### Deployment context

The `octopus-deployment-context` skill tells the agent how to read the deployment's variables. Before the run, Octopus writes the non-sensitive deployment variables to a `deployment-variables.json` file in the agent's working directory; sensitive variables (passwords, tokens, and API keys) are filtered out. From this the agent can learn the environment, project, tenant, release version, and any custom variables scoped to the step. When your prompt asks about the deployment, the agent reads this file rather than guessing.

<!-- NEEDS-HUMAN-VALIDATION: The octopus-deployment-context SKILL.md file (Calamari origin/main) still tells the agent that variables are "available via the get_deployment_variables tool", but the shipped mechanism is the deployment-variables.json file described above and in system-prompt.md; there is no get_deployment_variables tool in a run without the (not-yet-shipped) Octopus MCP server. Documented the file-based mechanism as the truth. Confirm the skill text is corrected before GA. -->

#### Saving files as artifacts

The `octopus-artifacts` skill is how you get files out of a run and into Octopus as [artifacts](/docs/projects/deployment-process/artifacts), so they're downloadable from the deployment or task afterward.

The agent uses this skill only when your prompt explicitly asks for a file to be attached, uploaded, published, or saved to Octopus. Creating a file doesn't attach it. To trigger the behavior, say so in the prompt, for example "generate a report and attach it to the deployment as an artifact."

When it does, the agent records each file it wants to attach in a manifest at `.octopus/artifacts.jsonl` in its working directory, one JSON object per line. Octopus then reads the manifest and captures the files. A few things worth knowing:

- If the agent attaches a directory, Octopus zips it into a single artifact.
- An invalid manifest entry fails the step: an entry that points at a file that doesn't exist, at a path outside the working directory, or at the working directory itself.
- There's a size cap. By default the combined size of all captured artifacts is capped at 5 GB. To raise or lower it, set the `Octopus.Action.Claude.MaxArtifactSizeInMegaBytes` variable (its value is in megabytes). Exceeding the cap fails the step.

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

Give the content a clear opening line describing when the skill applies; the agent uses that to decide whether to load it. Reference secrets through Octopus variables rather than writing them into the content.

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
