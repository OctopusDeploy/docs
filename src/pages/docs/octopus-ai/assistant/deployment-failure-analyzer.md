---
layout: src/layouts/Default.astro
pubDate: 2025-07-09
modDate: 2025-07-09
title: Deployment failure analyzer
description: 
navOrder: 10
---

Every failed deployment is a blocker for DevOps teams. You can use the Octopus AI Assistant to analyze failed deployments, reducing the time you spend troubleshooting by providing immediate, context-aware analysis and remediation steps based on your specific deployment scenario. When a deployment fails, the analyzer gathers context about the deployment including logs, process configuration, and script content, and provides actionable suggestions to get your team unblocked faster.

## How the deployment failure analyzer works

The Deployment Failure Analyzer captures detailed information about deployments, including:

- Deployment logs and error messages
- Deployment process configuration
- Script content from deployment steps
- Build information and artifacts
- Environment and target details

This context is analyzed by the Octopus AI Assistant to identify the root cause of the failure and provide specific suggestions for resolution.

## Using the deployment failure analyzer

When a deployment fails, you can launch the Octopus AI Assistant from the deployment page. The analyzer will present a suggested prompt for analyzing the failed deployment:

```text
Help me understand why the deployment failed. If the deployment didn't fail, say so. Provide suggestions for resolving the issue.
```

The Octopus AI Assistant will analyze the deployment context and provide:

1. **Reason for failure** - The specific step and error that caused the deployment to fail
2. **What happened** - A detailed breakdown of the deployment process and where it went wrong
3. **Suggestions for resolving the issue** - Actionable remediation steps with specific commands and configuration changes
4. **Next steps** - Recommended actions to investigate further and prevent future failures

## Example analysis

Below is a basic example of how the Deployment Failure Analyzer works in practice. The analyzer identified that an Azure Resource Group could not be found during deployment and provided troubleshooting guidance, including verifying the resource group exists, checking Azure account permissions, looking for typos in the configuration, and enabling step retries for intermittent issues.

![Deployment failure analysis example](/docs/img/octopus-ai-assistant/deployment-failure-analyzer-example.png)

## Adding business logic using custom prompts

For organizations with specific internal processes and troubleshooting procedures, you can enhance the Deployment Failure Analyzer with custom business logic using [custom prompts](/docs/octopus-ai/assistant/custom-prompts). Custom prompts are defined as variables in Library Variable Sets within Octopus Deploy, allowing you to embed organization-specific guidance and next steps directly into the failure analysis responses.

Custom prompts work by combining a user-facing prompt (`PageName[#].Prompt`) with an optional system prompt (`PageName[#].SystemPrompt`) that contains your business logic. The `.Prompt` variable defines what users see and interact with, while the `.SystemPrompt` variable provides behind-the-scenes instructions that guide the AI's analysis without being visible to users.

### Example: Missing Azure resource group

Here's an example of how to configure custom business logic for deployment failures where an Azure resource group cannot be found. While this is a basic example, it shows how you can embed custom business logic for known issues, instruct the LLM on how to respond, and whether to also include general troubleshooting steps from the LLM or not.

Custom logic is defined by configuring variables in a variable set named `OctoAI Prompts` in Octopus Deploy.

| Variable name | Variable value |
|-----------|-------------|
| Project.Deployment[0].Prompt | Why did the deployment fail? If the deployment didn't fail, say so. Provide suggestions for resolving the issue. |
| Project.Deployment[0].SystemPrompt | If the logs indicate that an Azure resource group could not be located, find the team responsible for the project in the project descriptions and return the instruction to create a support ticket using the Slack workflow in the team slack channel. Don't provide general troubleshooting steps in the response.|

In this example, when the analyzer detects an issue related to a missing Azure Resource Group in the deployment logs, it will:

1. Look up the responsible team from the project description
2. Provide specific instructions to create a support ticket via the team's Slack workflow
3. Direct users to the appropriate team channel rather than providing generic troubleshooting steps

![Deployment failure analysis example with custom prompt](/docs/img/octopus-ai-assistant/deployment-failure-analyzer-custom-prompt-example.png)

This approach ensures users get immediate, actionable guidance that follows your organization's established support processes, reducing resolution time and ensuring consistency across teams.

For detailed instructions on setting up custom prompts, including variable naming conventions and supported pages, see the [custom prompts documentation](/docs/octopus-ai/assistant/custom-prompts).
