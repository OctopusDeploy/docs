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

The Claude Agent Step runs [Claude Code](https://code.claude.com/docs/en/overview) (Anthropic's agentic developer tool) as a step in your deployment process or runbook. This page explains the step, both what it provides and why it runs inside the deployment. When you're ready to add the step to a process, start with [Getting started with the Claude Agent Step](/docs/octopus-ai/claude-agent-step/getting-started).

:::div{.warning}
The Claude Agent Step is an **alpha** release. The configuration and behavior may change between releases, and we're actively looking for feedback on how you use it. Don't build critical, unattended automation on it yet.
:::

## The Claude Agent Step

The Claude Agent Step runs an AI agent on a worker or deployment target, with access to your deployment's context. Understanding what the step provides, and what it deliberately leaves to you, helps you decide which jobs to hand the agent and how much access to grant it.

Octopus already holds the two things an agent needs to be useful during a deployment: the *context* (the target, the variables, the release, and the logs and output of earlier steps) and *access* to your targets. Until now, using an AI agent against that context meant either wiring up an agent outside Octopus by hand, or running an unsandboxed script step with no scoping and no audit trail.

The Claude Agent Step gives you a place to run an agent *inside* the deployment. You choose how much the agent can do, from a read-only investigation to running commands on the target, and you can sandbox the process so a mistake stays contained. Octopus hands the agent the deployment's context, so it knows which project, environment, and release it's working on. Every invocation of Claude streams to the task log, records its token usage and cost, and stores a full transcript you can review later.

## Models and API keys

This step provides no model of its own; you bring your own Anthropic API key and choose the Anthropic model based on your requirements. Octopus doesn't proxy the model or add its own key. The step runs Claude Code specifically; there's currently no option to use a different provider, like Amazon Bedrock or Azure AI Foundry.

Every run records its token usage and cost against the task, so you can see how much each agent run costs.

## Limitations

- Claude only, bring your own key. The step runs the Claude Code CLI against your own Anthropic API key. There's no support for other model providers, and Octopus doesn't supply or proxy the model.
- It runs non-interactively. There are no mid-run approval prompts. The agent runs with the tools you allowed and nothing else; if it tries to use a tool it wasn't allowed, that denial fails the step. Plan the permissions up front, or use Auto mode.
- A run that "gives up" can still pass. Octopus fails the step only on concrete signals: a non-zero exit, a terminal status other than success (which covers hitting the turn limit or budget cap), a denied tool call, or the explicit failure tag from the `octopus-fail-deployment` skill. It doesn't judge whether the agent actually achieved your goal. An agent that concludes it can't do the task, but exits cleanly, looks the same as success. For outcomes that matter, back the agent with a deterministic check.
- The sandbox modes are Linux/WSL2-only. Bash sandbox and Sandbox runtime run on Linux (and WSL2) workers. They aren't available on Windows. On other platforms you're limited to **None** plus whatever isolation you provide yourself.
- The prompt injection check and Auto mode add cost and latency. The injection check runs a model over your context before every run. Auto mode runs a second classifier model to judge each action. API Costs associated with the prompt injection check are not included as part of the cost estimate, and aren't included when determining if the agent is going to exceed the set budget limit. The tokens used, however, are reported back and displayed.

## Risks

AI, by design, is non-deterministic. You may find that it "completes" tasks in unexpected or dangerous ways. As an example, it may decide that to fix the database migration failing, it should *delete your database entirely*. Though we have built a [variety of safety nets](/docs/octopus-ai/claude-agent-step/security-and-compliance) into the Claude Agent Step, you should review the risks associated with non-deterministic behavior in your deployment pipeline to ensure that you have sufficient mitigations.

We'd love to hear how you use the step, what worked, and what you need next. Feedback during the alpha directly shapes what we build, so send it through your account team or [Octopus support](https://octopus.com/support).
