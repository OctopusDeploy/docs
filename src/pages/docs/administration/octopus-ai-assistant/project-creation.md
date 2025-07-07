---
layout: src/layouts/Default.astro
pubDate: 2025-07-07
modDate: 2025-07-07
title: Project creation
description: 
navOrder: 10
---

The Octopus AI Assistant can create fully configured deployment projects from a simple text prompt, helping you get started with deployments quickly. Instead of manually setting up project configurations, deployment processes, targets, and environments, you can describe what you want to deploy and let the AI Assistant generate a complete project based on proven best practices. The assistant generates Terraform code which is provided to you in the chat interface to review, before approving or aborting the deployment.

We've trained the large language model used by the Octopus AI Assistant with hand-crafted template projects that bake in best practices for common deployment scenarios.

## Creating a project with Octopus AI Assistant

When you launch the Octopus AI Assistant, one of the examples is to create a new project:

![Octopus AI Assistant default prompt window](/docs/administration/octopus-ai-assistant/octopus-ai-assistant-project-creation-examples.png)

Selecting this will present you with our pre-configured project creation prompts, which use a scaffolded template with our best practices built in:

![Octopus AI Assistant pre-configured project options](/docs/administration/octopus-ai-assistant/octopus-ai-assistant-project-creation-examples-2.png)

Choose one of the example prompts to create an opinionated project. In the example (below), the prompt **Create an Azure Web App project called "Azure Web App"** is selected. This can be customized through the prompt based on your specific requirements. Check the [expanding on the example prompts](#expanding-on-the-example-prompts) section of the documentation.

The Octopus AI Assistant may take 60-90 seconds to generate plan for the project. When it has generated the resource configuration, the output of `terraform plan` will be displayed so you can see all resources that will be created. You can approve or abort.

![Deploying an Azure web app project with the Octopus AI Assistant](/docs/administration/octopus-ai-assistant/octopus-ai-assistant-project-create-azure-webapp.png)

After the project is created, the next step is to create and deploy a release to validate the project setup. The deployment logs provide instructions and links to help you customize your project further.

## Validating the project configuration

You'll find the newly deployed project in the list of projects on the dashboard. It's worth spending a few minutes in the project to look at what was created, especially in the process, runbooks, and variables. Some project deployments using the Octopus AI Assistant also deploy resources at the instance level of your Octopus instance, like Lifecycles and Accounts.

Each project deployed with our best practices has a step in the process to validate your configuration, which will help guide you through any final configurations before the project is deployable. One of the first steps you should take is to create and deploy a release, and review the deployment logs:

1. Open the project you deployed with the Octopus AI Assistant
2. Click **Releases**
3. Click **Create Release**
4. Click **Save**
5. Click **Deploy to Development**
6. Click **Deploy**

When the deployment completes, go to the **Task Summary** tab for the release. The important step to check is **Step 1: Validate setup**, and review the output. This step runs a predefined script to check the configuration of your Octopus Deploy environment, and highlights any steps you need to take before you can run a deployment using this project. If we tell you an element hasn't been configured, we also provide you with a link to the documentation on how to configure it.

![Octopus AI Assistant pre-configured project options](/docs/administration/octopus-ai-assistant/octopus-ai-assistant-project-create-validate-setup.png)

You can also use the Octopus AI Assistant to help guide you through these configuration items. Treat the assistant like any other large language model chatbot. For example, you could ask:

```text
Can you help me configure an azure service principal for use from Octopus Deploy
```

The Octopus AI Assistant will break down the steps you need to take in Azure and Octopus Deploy to create and configure the service principal.

## Expanding on the example prompts

We provide example prompts for project creation in the Octopus AI Assistant to help you get from zero to fully configured project quickly. Our default project prompts provide a starting point for what we believe great deployments look like, but we understand you will have variations on what we provide by default, for the project to work in your environment.

You can expand on the example prompts with variations to configure the project based on your requirements.

For example, you can ask the Octopus AI Assistant to configure an additional environment, and to place the project in an existing project group:

```text
Create an AWS Lambda project called "My Lambda App" in the project group "Banking". Create an environment called "QA". Include the "QA" environment in the project lifecycle before the "Production" environment.
```

You may want to modify the default steps in the deployment process:

```text
Create an AWS Lambda project called "Gift Card" in the project group "Retail". Create an additional step in the deployment process called "Run smoke tests". The step should be a bash script and should test a HTTP endpoint returns a 200 status code. Add the step after the Deploy a Lambda step in the deployment process. Ensure the new step doesn't run in the Security environment.
```

Using the Octopus AI Assistant to combine our predefined project configurations with your organization specific requirements, means you can have a fully functioning project in minutes, rather than hours.
