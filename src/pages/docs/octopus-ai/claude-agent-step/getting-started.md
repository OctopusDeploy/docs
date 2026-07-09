---
layout: src/layouts/Default.astro
pubDate: 2026-07-07
modDate: 2026-07-07
title: Getting started with the Claude Agent Step
navTitle: Getting Started
navSection: Claude Agent Step
description: Add the Run Claude Agent step to a deployment process or runbook, run it, and read the agent's output.
navOrder: 1
---

The Claude Agent Step runs [Claude Code](https://code.claude.com/docs/en/overview) as a step in your deployment process or runbook. This page walks through adding the **Run Claude Agent** step to a process, running it, and reading what the agent did, then gives you two examples you can start from: a failure investigation and a pre-promotion smoke test.

## Add a Run Claude Agent step

Follow these steps to add the step to a deployment process or runbook and configure the prompt, credentials, and security controls it runs with.

Before you begin, you'll need:

- An [Anthropic API key](https://console.anthropic.com/), stored in Octopus as a **sensitive** project or library variable (for example `anthropic-api-key`). You reference it from the step as `#{anthropic-api-key}`. Storing it as a [sensitive variable](/docs/projects/variables/sensitive-variables) keeps it out of the task log.
- The [Claude Code](https://code.claude.com/docs/en/setup) CLI on the `PATH` of whatever runs the step: a worker, a deployment target, or the Octopus Server if you run the step on the server. The step launches the `claude` executable as a child process.
- If you pick the **Sandbox runtime** sandbox mode: the `srt` executable from Anthropic's [sandbox-runtime](https://code.claude.com/docs/en/sandboxing) (version 0.0.55 or later) on the `PATH`. The step checks the version and fails if it's missing or too old.

To add and configure the step:

1. Open your deployment process or runbook and select **Add step**.
2. Search for `claude` and choose **Run Claude Agent** from the step library.

   :::figure
   ![The Run Claude Agent step card in the step library](/docs/img/octopus-ai/claude-agent-step/step-library-run-claude.png)
   :::

3. In **Prompt**, describe the task in plain language, the way you would prompt Claude Code. The prompt can use Octopus variables (for example `#{Octopus.Environment.Name}`), which are substituted before the agent runs. Be specific about what you want the agent to do and what "success" looks like.
4. In **Claude Settings**, set **API Key** to a reference to your sensitive variable, for example `#{anthropic-api-key}`.
5. Optionally, set **Model Version** to a model such as `claude-opus-4-8` or `claude-haiku-4-5`, or leave it blank to use the Claude Code CLI's current default. The **Effort** setting trades thoroughness against cost and latency; leave it blank to use the default.

   :::figure
   ![The Run Claude Agent step editor showing the Prompt and Claude Settings sections filled in](/docs/img/octopus-ai/claude-agent-step/step-editor-prompt-and-settings.png)
   :::

6. In **Security**, select a **Sandboxing** mode. You must pick one of the three values to save the step:
   - **Bash sandbox** uses Claude Code's built-in sandbox. It confines the agent's `Bash` commands, but file operations and hooks still run on the host.
   - **Sandbox runtime** runs the whole agent process inside Anthropic's `sandbox-runtime`, for stronger, whole-process isolation.
   - **None** applies no sandboxing. The agent runs with the same permissions as the account running the step (the Tentacle/Kubernetes Agent service account). We don't recommend it unless you have your own isolation around the worker.

   For a first run on a Linux worker, **Sandbox runtime** is the safest starting point. Each mode and how to configure it is covered in [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance).

   :::div{.warning}
   The **Bash sandbox** and **Sandbox runtime** modes are supported on Linux (and WSL2) workers. They aren't available on Windows workers. If you're evaluating the step on a Windows worker, use **None** and rely on isolation such as the account Tentacle runs under.
   :::

7. Select a **Permission Mode**. For your first run, select **dontAsk mode**. The step runs non-interactively, with no way to approve an action mid-run, so `dontAsk` is the standard choice: the agent may use any tool you allow and is denied everything else. The other option, Auto mode (a mode that uses a classifier model to determine whether to run a tool), is covered in [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance).
8. In **Tool Permissions**, list the tools the agent needs, one per line. For example:

   ```text
   Read
   Glob
   Bash(pwd)
   Bash(ls *)
   ```

   Start with minimal permissions and add to it as you learn what the agent needs. See [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance#tool-permissions) for more information.
9. Optionally, under **Agent Capabilities**, add **Skills** or **MCP** servers. See [Extending the Claude Agent Step](/docs/octopus-ai/claude-agent-step/tools).
10. Under **Additional Configuration Options**, set a **Turn Limit** to cap how many turns the agent can take before the step stops. One turn is a single request/response cycle with the model. The default is 10.
11. Optionally, set a **Maximum Budget** as a spend cap in USD. Leave it blank for no limit.
12. Leave **Prompt Injection Check** switched on. Before the agent runs, Octopus screens the prompt, deployment variables, MCP configuration, and skills with a fast model (`claude-haiku-4-5` by default) and blocks the step if it detects an injection attempt.
13. Save the step.

The **Run Claude Agent** step appears in your deployment process or runbook, ready to run.

## Run the step

A Run Claude Agent step runs like any other step. Run the process that contains it, then watch what the agent does in the task log.

To run the step and watch its output:

1. Create a release and deploy it, as you would for any other step.
2. Open the task and expand the step in the **task log**. While the step runs, the agent streams its output in real time. At the default log level you see the agent's narration and its final answer.
3. To also see the agent's thinking, each tool call, and the exact command Octopus ran, switch the log to verbose (or download the raw log).

:::figure
![The task log showing the Claude agent streaming its output](/docs/img/octopus-ai/claude-agent-step/task-log-streaming.png)
:::

When the task finishes, the step's log ends with its usage lines and `Claude Code invocation complete.`, and the task page shows a **Claude Usage Summary** panel.

## Run outputs

Every completed run leaves the following outputs on the task page.

| Output | Where it appears | What it contains |
| --- | --- | --- |
| Task log | The step's section of the task log | The agent's streamed narration and final answer. The verbose level adds its thinking and each tool call. |
| Claude Usage Summary | A panel on the task page | Each Claude step with its model, token count, cost, and any budget cap, plus a total. Use it to keep an eye on what a run costs. |
| Artifacts | The task's artifacts | Files the agent attached using the built-in `octopus-artifacts` skill, ready to download. See [Built-in skills](/docs/octopus-ai/claude-agent-step/tools#built-in-skills). |
| Transcript | Stored on the Octopus Server, gated behind a dedicated permission | The full, verbose session, recorded for auditing. See [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) for who can read it and how. |

:::figure
![The Claude Usage Summary panel on the task page](/docs/img/octopus-ai/claude-agent-step/claude-usage-summary.png)
:::

## Investigate a failed deployment

When a deployment fails, the fastest first responder is one that's already there. Add an agent step that runs only when an earlier step fails, and it attaches a first-pass diagnosis to the failed task, while the deployment is still in its failed state, instead of waiting for someone to start digging.

To add an automatic failure investigation to a deployment process:

1. Add a **Run Claude Agent** step to your deployment process (see [Add a Run Claude Agent step](#add-a-run-claude-agent-step)).
2. Set the step's [run condition](/docs/projects/steps/conditions#run-condition) to **Only if the previous step failed**.
3. Set the **Prompt** to:

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

4. Set **Permission Mode** to **dontAsk mode**.
5. In **Tool Permissions**, allow only the read-only commands your investigation needs, for example `Read`, `Glob`, `Grep`, `Bash(cat *)`, `Bash(kubectl get *)`, `Bash(kubectl describe *)`, `Bash(kubectl logs *)`, and `Bash(curl *)`.
6. Select **Sandbox runtime** as the sandbox mode on a Linux worker (or **None** while evaluating on Windows or macOS).

:::div{.hint}
Keep the allowlist to read-only tools. The prompt tells the agent not to change anything, but the allowlist helps to enforces that. With only read and query commands allowed, an agent that decides to "fix" the problem anyway is denied the tool it reaches for, and the step fails rather than making the outage worse. Match the list to how your infrastructure is inspected. For a virtual machine you might allow `Bash(systemctl status *)` and `Bash(journalctl *)` in place of the `kubectl` commands above.
:::

Because the step runs only on failure, the deployment still ends in a failed state, which is what you want: the agent explains the failure, it doesn't paper over it. Its summary appears in the task log next to the step that failed.

## Smoke-test a service before promotion

Before promoting a release, you want an agent to check that the deployed service is healthy, and to fail the step if it isn't so the promotion stops. By default an agent run always *succeeds* when the agent finishes normally, so the agent has to explicitly signal failure; the built-in `octopus-fail-deployment` skill handles this when your prompt states a failure condition.

To add a smoke test to a deployment process:

1. Add a **Run Claude Agent** step after the steps that deploy the service.
2. Set the **Prompt** to:

   ```text
   Smoke-test the service that was just deployed. Send a request to its health endpoint
   and check for an HTTP 200 response. If it does not return 200 after a couple of retries,
   fail the deployment with a short reason describing what you saw.
   ```

3. Set **Permission Mode** to **dontAsk mode**.
4. In **Tool Permissions**, allow `Bash(curl *)`, plus any other command your check needs.
5. Select **Sandbox runtime** as the sandbox mode on a Linux worker.

If the health check doesn't pass, the agent emits the failure tag from the `octopus-fail-deployment` skill in its final message, and Octopus fails the step and surfaces the agent's reason in the task log, stopping the promotion. Stating the failure condition in the prompt is enough. See [Built-in skills](/docs/octopus-ai/claude-agent-step/tools#built-in-skills) for how the skill works.

:::div{.hint}
As with any AI tool, the outcome of a check like this is not deterministic. Treat the agent's verdict as a helpful check, not a hard gate, and pair it with deterministic checks where the outcome matters. See [Limitations](/docs/octopus-ai/claude-agent-step#limitations) for more information.
:::

## Related links

- [How the Claude Agent Step works](/docs/octopus-ai/claude-agent-step)
- [Claude Agent Step security and compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance)
- [Extending the Claude Agent Step](/docs/octopus-ai/claude-agent-step/tools)
- [Step run conditions](/docs/projects/steps/conditions)
