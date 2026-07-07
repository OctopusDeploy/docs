---
layout: src/layouts/Default.astro
pubDate: 2026-07-03
modDate: 2026-07-07
title: How the Claude Agent Step works
navTitle: Overview
navSection: Claude Agent Step
description: What the Claude Agent Step is, how it fits into a deployment, and the limits to plan around before you build on it.
navOrder: 4
---

The Claude Agent Step runs [Claude Code](https://code.claude.com/docs/en/overview) (Anthropic's agentic developer tool) as a step in your deployment process or runbook. This page explains the model behind the step: what it provides, why it runs inside the deployment, and what the alpha does and doesn't do. When you're ready to add the step to a process, start with [Getting started with the Claude Agent Step](/docs/octopus-ai/claude-agent-step/getting-started).

:::div{.warning}
The Claude Agent Step is an **alpha** release. The configuration and behavior may change between releases, and we're actively looking for feedback on how you use it. Don't build critical, unattended automation on it yet.
:::

## The Claude Agent Step

The Claude Agent Step runs an AI agent on a worker or deployment target, with access to your deployment's context and scoped access to your infrastructure. Understanding what the step provides, and what it deliberately leaves to you, helps you decide which jobs to hand the agent and how much access to grant it.

Octopus already holds the two things an agent needs to be useful during a deployment: the *context* (the target, the variables, the release, and the logs and output of earlier steps) and *access* to your targets. Until now, using an AI agent against that context meant either wiring up an agent outside Octopus by hand, or running an unsandboxed script step with no scoping and no audit trail.

The Claude Agent Step gives you a place to run an agent *inside* the deployment. You choose how much the agent can do, from a read-only investigation to running commands on the target, and you can sandbox the process so a mistake stays contained. Octopus hands the agent the deployment's context, so it knows which project, environment, and release it's working on. Every run streams to the task log, records its token usage and cost, and stores a full transcript you can review later.

We built it with two kinds of work in mind. The first is investigating and reacting to deployments: a DevOps engineer who owns a runbook and wants an agent to look at a failed deployment and explain what went wrong, or run a quick smoke test before a release is promoted. The second is building the step into templates: a platform engineer who wants to offer a safe, pre-scoped agent step to their teams. If that's you, read [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) next; it's written for the person who has to sign off on the scoping.

## Models and API keys

The step brings no model of its own: you supply the credentials and choose the model the agent runs with. Knowing where the key comes from tells you what to budget for and what to protect.

You bring your own Anthropic API key and choose your own model. Octopus doesn't proxy the model or add its own key. The step runs Claude Code specifically; there's no option to use a different provider.

You store the API key in Octopus as a sensitive variable and reference it from the step, so it's encrypted, masked in logs, and scoped like any other Octopus secret. Every run records its token usage and cost against the task, so you can see what each agent run costs. [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) covers how to scope and bound the key.

## Limitations

The Claude Agent Step is an alpha. Expect the configuration and behavior to change between releases, and don't rely on it for unattended, business-critical automation yet.

- Claude only, bring your own key. The step runs the Claude Code CLI against your own Anthropic API key. There's no support for other model providers, and Octopus doesn't supply or proxy the model.
- It runs non-interactively. There are no mid-run approval prompts. The agent runs with the tools you allowed and nothing else; if it tries to use a tool it wasn't allowed, that denial fails the step. Plan the permissions up front.
- A run that "gives up" can still pass. Octopus fails the step only on concrete signals: a non-zero exit, a terminal status other than success (which covers hitting the turn limit or budget cap), a denied tool call, or the explicit failure tag from the `octopus-fail-deployment` skill. It doesn't judge whether the agent actually achieved your goal. An agent that concludes it can't do the task, but exits cleanly, looks the same as success. For outcomes that matter, back the agent with a deterministic check.
- The strong sandbox modes are Linux/WSL2-only. Bash sandbox and Sandbox runtime run on Linux (and WSL2) workers. They aren't available on Windows. On other platforms you're limited to **None** plus whatever isolation you provide yourself.
- No sandbox hides the agent's own credentials from itself. The Anthropic API key is injected into the agent so it can call the model, and it lives inside the agent boundary. Sandboxing contains what the agent can reach *outside* the process; it doesn't stop the agent from seeing the key it runs with. The controls around credentials are mitigations, not hard boundaries. [Security & Compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance) covers this.
- The prompt injection check and Auto mode add cost and latency. The injection check runs a model over your context before every run. Auto mode runs a second classifier model to judge each action. Both trade a little time and money for their safety; the injection check is on by default, Auto mode is opt-in.

We'd love to hear how you use the step, what worked, and what you need next. Feedback during the alpha directly shapes what we build, so send it through your account team or [Octopus support](https://octopus.com/support).

## Related links

- [Getting started with the Claude Agent Step](/docs/octopus-ai/claude-agent-step/getting-started)
- [Claude Agent Step security and compliance](/docs/octopus-ai/claude-agent-step/security-and-compliance)
- [Extending the Claude Agent Step](/docs/octopus-ai/claude-agent-step/tools)
- [Claude Code documentation](https://code.claude.com/docs/en/overview)
