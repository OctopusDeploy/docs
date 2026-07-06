---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-07-03
title: Getting started with the Claude Agent Step
navTitle: Getting Started
navSection: Claude Agent Step
description: Run Claude Code as an audited, scoped step in an Octopus deployment process or runbook.
navOrder: 4
---

The Claude Agent Step runs an AI agent as a step in your deployment process or runbook. You write a prompt, Octopus runs [Claude Code](https://code.claude.com/docs/en/overview) (Anthropic's agentic developer tool) on a worker or deployment target with access to your deployment context, and the agent's work is streamed to the task log, costed, and recorded for auditing.

:::div{.warning}
The Claude Agent Step is an **alpha** release. The configuration and behavior may change between releases, and we're actively looking for feedback on how you use it. Don't build critical, unattended automation on it yet.
:::

## Overview

Octopus already holds the two things an agent needs to be useful during a deployment: the *context* (the target, the variables, the release, and the logs and output of earlier steps) and *access* to your targets. Until now, using an AI agent against that context meant either wiring up an agent outside Octopus by hand, or running an unsandboxed script step with no scoping and no audit trail.

The Claude Agent Step gives you a place to run an agent *inside* the deployment. You choose how much the agent can do, from a read-only investigation to running commands on the target, and you sandbox the process so a mistake stays contained. Octopus hands the agent the deployment's non-sensitive variables, so it knows which project, environment, and release it's working on. Every run streams to the task log, records its token usage and cost, and stores a full transcript you can review later.

We built it with two kinds of work in mind. The first is investigating and reacting to deployments: a DevOps engineer who owns a runbook and wants an agent to look at a failed deployment and explain what went wrong, or run a quick smoke test before a release is promoted. The second is building the step into templates: a platform engineer who wants to offer a safe, pre-scoped agent step to their teams. If that's you, read [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) next; it's written for the person who has to sign off on the scoping.

You bring your own Anthropic API key and choose your own model. Octopus doesn't proxy the model or add its own key. The step runs Claude Code specifically; there's no option to use a different provider.

<!-- SCREENSHOT: step-library-run-claude.png
Instance: local dev instance http://localhost:8065 (or https://claude-step.testoctopus.app)
Space: Default; Project: "Claude Agent Docs Demo" (create if absent); Process editor > Add step
Setup: Feature toggle claude-step enabled. Open the "Choose a step" library.
Navigate: Project > Process > Add step > search "claude" (or open the "AI" category)
Capture: the "Run Claude Agent" step-library card showing its description "Runs the Claude Code CLI tool." and the blue "Alpha" chip, light theme, 1440px viewport
Alt text: "The Run Claude Agent step card in the step library with an Alpha chip"

![The Run Claude Agent step card in the step library with an Alpha chip](/docs/img/octopus-ai/claude-agent-step/step-library-run-claude.png)
-->


## How to set it up

### Prerequisites

**Store an Anthropic API key.** Create an [Anthropic API key](https://console.anthropic.com/) and store it in Octopus as a **sensitive** project or library variable (for example `anthropic-api-key`). You reference it from the step as `#{anthropic-api-key}`. Storing it as a sensitive variable keeps it out of the task log and lets you scope it like any other Octopus secret.

**Provide the Claude Code CLI on the worker or target.** The step launches the `claude` executable as a child process. Octopus expects to find it on the `PATH` of whatever runs the step: a worker, a deployment target, or the Octopus Server if you run the step on the server.

:::div{.warning}
Octopus does **not** install, download, or bootstrap the Claude Code CLI for you. If `claude` isn't on the `PATH`, the step fails when it tries to start the process. Install [Claude Code](https://code.claude.com/docs/en/setup) on your worker or target, or bake it into your worker image, before you run the step.
:::

If you pick the **Sandbox runtime** sandbox mode (described below), the `srt` executable from Anthropic's [sandbox-runtime](https://code.claude.com/docs/en/sandboxing) (version 0.0.55 or later) must also be on the `PATH`; the step checks the version and fails if it's missing or too old.

### Configure the step

Open your deployment process or runbook, add a step, and choose **Run Claude Agent** from the step library (it's in the **AI** category, and you can find it by searching for `claude`). The card carries an **Alpha** chip.

1. **Write the prompt.** In the **Prompt** section, describe the task in plain language, the way you would prompt Claude Code. The prompt is required. It can use Octopus variables (for example `#{Octopus.Environment.Name}`), which are substituted before the agent runs. Be specific about what you want the agent to do and what "done" looks like.

2. **Set the API key.** In **Claude Settings ➜ API Key**, reference your sensitive variable, for example `#{anthropic-api-key}`.

3. **Choose a model and effort (optional).** Still under **Claude Settings**, pick a model such as `claude-opus-4-8` or `claude-haiku-4-5`, or leave the model blank to use the Claude Code CLI's current default. The **Effort** setting (Low, Medium, High, Extra High, Max) trades thoroughness against cost and latency; leave it unset to let the model decide.

4. **Choose a sandbox mode.** In the **Security** section, the **Sandboxing** control offers three options, and you must pick one. There's no default, and the step won't save until you choose.

   - **Bash sandbox** uses Claude Code's built-in sandbox. It confines the agent's `Bash` commands, but file operations and hooks still run on the host.
   - **Sandbox runtime** runs the whole agent process inside Anthropic's `sandbox-runtime`, for stronger, whole-process isolation.
   - **None** applies no sandboxing. The agent runs with the same permissions as the account running the step (the Tentacle service account). We don't recommend it unless you have your own isolation around the worker.

   Each mode and how to configure it is covered in [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance). For a first run on a Linux worker, **Sandbox runtime** is the safest starting point.

   :::div{.warning}
   The **Bash sandbox** and **Sandbox runtime** modes are supported on Linux (and WSL2) workers in this alpha. They aren't available on Windows workers. If you're evaluating the step on a Windows worker, use **None** and rely on your own isolation while you try it out.
   :::

5. **Choose a permission mode and allowed tools.** Also under **Security**, the **Permission mode** control offers **dontAsk mode** and **Auto mode**. The step runs non-interactively, with no way to approve an action mid-run, so `dontAsk` is the standard choice: the agent may use any tool you allow and is denied everything else. For your first run, select **dontAsk mode** and list the tools the agent needs in **Tool Permissions ➜ Allowed tools**, one per line, for example:

   ```text
   Read
   Glob
   Bash(pwd)
   Bash(ls *)
   ```

   Keep the list tight and add to it as you learn what the agent needs. A denied tool call fails the step, so a list that's too narrow is safer than one that's too broad. Auto mode (a classifier model that judges each action instead of relying only on the allowlist) and the full tool syntax are covered in [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance).

6. The **Agent Capabilities** section is where you add [skills](/docs/octopus-ai/claude-agent-step/tools) (reusable instructions) and [Model Context Protocol (MCP)](/docs/octopus-ai/claude-agent-step/tools) servers (extra tools). See [Tools](/docs/octopus-ai/claude-agent-step/tools) when you're ready to try them out.

7. **Set the limits.** In **Additional Configuration Options**, set the guardrails:
   - **Turn Limit** caps how many turns the agent can take before the step stops. One turn is a single request/response cycle with the model. The default is 10.
   - **Maximum Budget** sets a spend cap in USD. Leave it blank for no limit, or set a value like `1.50` to stop the agent once it has spent that much.
   - **Prompt Injection Check** should stay on. Before the agent runs, Octopus screens the prompt, deployment variables, MCP configuration, and skills with a fast model (`claude-haiku-4-5` by default) and, by default, blocks the step if it detects an injection attempt. It costs a little time and a few tokens per run.

   <!-- SCREENSHOT: step-editor-prompt-and-settings.png
   Instance: local dev instance http://localhost:8065 (or https://claude-step.testoctopus.app)
   Space: Default; Project: "Claude Agent Docs Demo"; a Run Claude Agent step named "Investigate the deployment"
   Setup: Prompt section filled with a short investigation prompt; Claude Settings ➜ API Key = #{anthropic-api-key}; Model = claude-haiku-4-5. Expand the Prompt and Claude Settings sections.
   Navigate: open the step editor and scroll so Prompt and Claude Settings are both visible
   Capture: the Prompt section (with prompt text) and the Claude Settings section (API Key + Model), light theme, 1440px viewport
   Alt text: "The Run Claude Agent step editor showing the Prompt and Claude Settings sections filled in"

   ![The Run Claude Agent step editor showing the Prompt and Claude Settings sections filled in](/docs/img/octopus-ai/claude-agent-step/step-editor-prompt-and-settings.png)
   -->


8. **Run it.** Save the step, then create a release and deploy it, or run your runbook, as you would for any other step. The step can run on the Octopus Server, a worker, or a deployment target, wherever the Claude Code CLI is installed.

### Read the output

While the step runs, the agent streams into the **task log** in real time. At the default log level you see the agent's narration and its final answer; switch the log to verbose (or download the raw log) to also see its thinking, each tool call, and the exact command Octopus ran. A run looks roughly like this (trimmed):

```text
Running prompt-injection check against the execution context using model 'claude-haiku-4-5'.
Prompt-injection check passed: no injection detected in the execution context.
I'll help you investigate the deployment state. Let me read the deployment variables and check the working directory.
## Deployment Investigation Complete
**Deployment Summary:**
- **Project:** ClaudeIsCool
- **Environment:** Development
- **Task:** RunbookRun (ServerTasks-975)
**Working Directory Status:**
- **Writability:** CONFIRMED - Successfully created findings.txt
Claude Code usage — Duration: 15527 ms, Turns: 6
Claude Code tokens — Input: 30, Output: 1476, Cache read: 55032, Cache creation: 34098
Claude Code invocation complete.
Collecting artifacts
```

When the task finishes, three more things are available on the task page:

- A **Claude Usage Summary** panel lists each Claude step with its model, token count, cost, and any budget cap, plus a total. Use it to keep an eye on what a run costs.
- If you asked the agent to attach a file (using the built-in `octopus-artifacts` skill described on the [Tools](/docs/octopus-ai/claude-agent-step/tools) page), it appears in the task's **artifacts**, ready to download.
- Octopus stores the full, verbose session as a **transcript** for auditing. See [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) for who can read it and how.

<!-- SCREENSHOT: task-log-streaming.png
Instance: local dev instance http://localhost:8065 (or https://claude-step.testoctopus.app)
Space: Default; Project: "Claude Agent Docs Demo"; deploy/run a Run Claude Agent step
Setup: run the step so the task log contains the injection-check lines, the agent narration, and the "Claude Code invocation complete." line
Navigate: open the completed task, expand the Run Claude Agent step in the task log
Capture: the task log for the step showing the agent's streamed output and the usage line, light theme, 1440px viewport
Alt text: "The task log showing the Claude agent streaming its output"

![The task log showing the Claude agent streaming its output](/docs/img/octopus-ai/claude-agent-step/task-log-streaming.png)
-->


<!-- SCREENSHOT: claude-usage-summary.png
Instance: local dev instance http://localhost:8065 (or https://claude-step.testoctopus.app)
Space: Default; Project: "Claude Agent Docs Demo"; a completed deployment/run with one or more Run Claude Agent steps
Setup: complete a run so usage is recorded
Navigate: open the completed task page and scroll to the "Claude Usage Summary" panel
Capture: the "Claude Usage Summary" panel with its Step / Max Budget (USD) / Cost (USD) / Tokens / Model columns and total row, light theme, 1440px viewport
Alt text: "The Claude Usage Summary panel on the task page"

![The Claude Usage Summary panel on the task page](/docs/img/octopus-ai/claude-agent-step/claude-usage-summary.png)
-->


## Examples

The examples below use short, focused prompts and tight permission lists. Start from one of these and adjust it to your process.

### Investigate a failed deployment

When a deployment fails, the fastest first responder is one that's already there. Add a Run Claude Agent step to your deployment process and set its [run condition](/docs/projects/steps/conditions#run-condition) to **Only if the previous step failed**. The agent then runs automatically the moment an earlier step fails, while the deployment is still in its failed state, and attaches a first-pass diagnosis to the failed task instead of waiting for someone to start digging.

- **Run condition:** Only if the previous step failed
- **Prompt:**

  ```text
  A previous step in this deployment has failed. Investigate the cause.

  Read ./deployment-variables.json to learn which project, environment, and
  release was being deployed. Then inspect the deployed infrastructure to work
  out why it failed: check whether the service is healthy, read the most recent
  application and container logs, and check the status of the pods or processes
  that were meant to be running.

  Report the single most likely root cause and the specific evidence you found
  for it. Do not attempt to fix anything.
  ```

- **Permission mode:** dontAsk
- **Allowed tools:** the read-only commands your investigation needs, for example `Read`, `Glob`, `Grep`, `Bash(cat *)`, `Bash(kubectl get *)`, `Bash(kubectl describe *)`, `Bash(kubectl logs *)`, `Bash(curl *)`
- **Sandbox mode:** Sandbox runtime on a Linux worker (or None while evaluating on Windows/macOS)

Two things make this work. First, Octopus writes the deployment's non-sensitive variables to a `deployment-variables.json` file in the agent's working directory (sensitive variables are filtered out), and the built-in `octopus-deployment-context` skill tells the agent to read it, so the agent knows what was being deployed without you spelling it out. Second, because diagnosing the failure means reaching the deployed service, the agent can only see what the worker or target it runs on can reach. Run this step where the deployment ran, and scope that worker's access deliberately; this is the host-interacting pattern covered under [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance).

Keep the allowlist to read-only inspection. The prompt tells the agent not to change anything, but the allowlist is what enforces it: with only read and query commands allowed, an agent that decides to "fix" the problem is denied the tool it reaches for, and the step fails rather than making the outage worse. Match the list to how your infrastructure is inspected. For a virtual machine you might allow `Bash(systemctl status *)` and `Bash(journalctl *)` in place of the `kubectl` commands above; whatever you add, keep it read-only.

<!-- NEEDS-HUMAN-VALIDATION: before publish, consider capturing a real task log of this failure-diagnosis example running against an actual failed Kubernetes (or VM) deployment, to show the diagnosis in context. Requires an environment with a reproducible deployment failure. -->

Because the step runs only on failure, the deployment still ends in a failed state, which is what you want: the agent explains the failure, it doesn't paper over it. Its summary appears in the task log next to the step that failed.

### Smoke-test a service before promotion

Before promoting a release, you want an agent to check that the deployed service is healthy, and to fail the step if it isn't so the promotion stops.

- **Prompt:**

  ```text
  Smoke-test the service that was just deployed. Send a request to its health endpoint
  and check for an HTTP 200 response. If it does not return 200 after a couple of retries,
  fail the deployment with a short reason describing what you saw.
  ```

- **Permission mode:** dontAsk
- **Allowed tools:** `Bash(curl *)` (plus any command your check needs)
- **Sandbox mode:** Sandbox runtime on a Linux worker

By default an agent run always *succeeds*: when the agent finishes normally, Octopus marks the step green regardless of what the agent concluded. To make a check like this stop a promotion, the agent has to explicitly signal failure. The built-in `octopus-fail-deployment` skill tells it how: when your prompt states a failure condition and the agent decides it's met, it emits a tagged block in its final message, and Octopus fails the step and surfaces the reason in the task log. You don't configure anything extra; stating the failure condition in the prompt is enough. See [Tools](/docs/octopus-ai/claude-agent-step/tools) for more on the built-in skills.

:::div{.hint}
This is a genuinely useful pattern, but be aware of its limits. Failure signaling is best-effort: it depends on the agent correctly deciding the condition was met and emitting a complete tag. An agent that gives up, or misjudges the result, can still finish "successfully" and let the promotion through. Treat the agent's verdict as a helpful check, not a hard gate, and pair it with deterministic checks where the outcome matters. See [Limitations](#limitations).
:::

## Limitations

The Claude Agent Step is an alpha. Knowing what it does *not* do will save you time.

- It's an alpha. Expect the configuration and behavior to change between releases, and don't rely on it for unattended, business-critical automation yet. We want your feedback.
- Claude only, bring your own key. The step runs the Claude Code CLI against your own Anthropic API key. There's no support for other model providers, and Octopus doesn't supply or proxy the model.
- It runs non-interactively. There are no mid-run approval prompts. The agent runs with the tools you allowed and nothing else; if it tries to use a tool it wasn't allowed, that denial fails the step. Plan the permissions up front.
- A run that "gives up" can still pass. Octopus fails the step only on concrete signals: a non-zero exit, a terminal status other than success (which covers hitting the turn limit or budget cap), a denied tool call, or the explicit failure tag from the `octopus-fail-deployment` skill. It doesn't judge whether the agent actually achieved your goal. An agent that concludes it can't do the task, but exits cleanly, looks the same as success. For outcomes that matter, back the agent with a deterministic check.
- The strong sandbox modes are Linux/WSL2-only. Bash sandbox and Sandbox runtime run on Linux (and WSL2) workers. They aren't available on Windows. On other platforms you're limited to **None** plus whatever isolation you provide yourself.
- No sandbox hides the agent's own credentials from itself. The Anthropic API key is injected into the agent so it can call the model, and it lives inside the agent boundary. Sandboxing contains what the agent can reach *outside* the process; it doesn't stop the agent from seeing the key it runs with. The controls around credentials are mitigations, not hard boundaries. [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) covers this.
- The prompt injection check and Auto mode add cost and latency. The injection check runs a model over your context before every run. Auto mode runs a second classifier model to judge each action. Both trade a little time and money for their safety; the injection check is on by default, Auto mode is opt-in.

We'd love to hear how you use the step, what worked, and what you need next. Feedback during the alpha directly shapes what we build, so send it through your account team or [Octopus support](https://octopus.com/support).
