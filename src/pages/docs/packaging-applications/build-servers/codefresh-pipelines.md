---
layout: src/layouts/Default.astro
pubDate: 2024-10-01
modDate: 2024-10-01
title: Codefresh Pipelines
description: Codefresh pipelines can leverage the Octopus CLI to build, push, and create releases for Octopus Deploy.
navOrder: 50
---

Codefresh is a docker-native CI/CD platform

[Codefresh Pipelines](https://codefresh.io/docs/docs/pipelines/introduction-to-codefresh-pipelines/) are workflows that form Codefresh's continuous integration (CI) platform. 

# Integrating with Codefresh Pipelines
Codefresh pipelines allow you to customize steps to create, deploy and promote releases to your Octopus Deploy [environments](/docs/infrastructure/environments/). The steps do this by running the [Octopus CLI](/docs/octopus-rest-api/octopus-cli) inside a docker container.

Octopus Deploy has several custom pipeline steps available: 

- [Login to Octopus](https://codefresh.io/steps/step/octopusdeploy%2Flogin)
- [Create a package](https://codefresh.io/steps/step/octopusdeploy%2Fcreate-package)
- [Push a package](https://codefresh.io/steps/step/octopusdeploy%2Fpush-package)
- [Create a release](https://codefresh.io/steps/step/octopusdeploy%2Fcreate-release)
- [Deploy a release](https://codefresh.io/steps/step/octopusdeploy%2Fdeploy-release)
- [Deploy a tenanted release](https://codefresh.io/steps/step/octopusdeploy%2Fdeploy-release-tenanted)
- [Await Task](https://codefresh.io/steps/step/octopusdeploy%2Fawait-task)
- [Run a Runbook](https://codefresh.io/steps/step/octopusdeploy%2Frun-runbook)
- [Push Build Information](https://codefresh.io/steps/step/octopusdeploy%2Fpush-build-information)


## Codefresh Pipeline step configuration

When creating your first Codefresh Pipeline, the pipeline workflow can be defined in the codefresh UI or within a git-based repository. The workflow yaml defines the steps to run and any arguments required to run each step. 

The details of an Octopus instance are required to run all Octopus Codefresh steps:

| Variable name       | Description|
| ------------- | ------- |
| `OCTOPUS_URL` | The Octopus Server URL you wish to run your steps on |
| `OCTOPUS_API_KEY` | The Octopus Deploy API Key required for authentication |
| `OCTOPUS_SPACE` | The Space to run steps on |

## Codefresh variables 

It is recommended to use codefresh variables to set the `OCTOPUS_URL` and an encrypted variable to set the `OCTOPUS_API_KEY`. This way, you can simply insert the variable for all octopus deploy steps in your workflow.

These can be set by clicking **Add Variable** from the **Variable** menu of your Codefresh Pipeline.

Enter your variable name and value. To insert the variable in your workflow, use the codefresh variable syntax `${{YOUR_VARIABLE_NAME}}`

:::figure
![Use variables in your codefresh workflow](/docs/packaging-applications/build-servers/codefresh-pipelines/codefresh-variables.png)
:::

For more details on codefresh pipeline variables, see the Codefresh documentation on [Variables in pipelines](https://codefresh.io/docs/docs/pipelines/variables/).

## Codefresh encrypted variables

To store sensitive information such as Octopus Deploy API keys, you can use Codefresh's encrypted variables in your workflow. To encrypt the variable, click on the lock next to the variable value. 

:::figure
![Encrypt variables in your codefresh workflow](/docs/packaging-applications/build-servers/codefresh-pipelines/codefresh-variables-encrypt.png)
:::

## Triggering a build

A build can be triggered in a few different ways such as:
- Push commits
- Pull requests 
- On-demand

And others depending on your git provider. Please see the [Codefresh documentation on supported git trigger events](https://codefresh.io/docs/docs/pipelines/triggers/git-triggers/).

For details on how to configure git triggers, see the [Codefresh documentation on Git Triggers](https://codefresh.io/docs/docs/pipelines/triggers/git-triggers/).


# Codefresh Pipeline stages

Codefresh Pipelines are workflows that consist of ***steps***. By default, the Codefresh execution engine will execute sequentially from the first defined step in the `codefresh.yml` file. To [configure parallel steps in your pipeline](https://codefresh.io/docs/docs/pipelines/advanced-workflows/), see the Codefresh documentation for more details. 

Before defining the steps in your workflow, you can configure in ***stages***. You can then assign a stage for each of the steps in your pipeline. Stages are groups used to define how the steps will be visualized in the UI, and have no effect on the execution of the steps.

```yaml
version: "1.0"
stages:
  - "Deploy project"
  - "Run the runbook"

steps:
  create-release:
    type: octopusdeploy/create-release
    stage: "Deploy project"
    arguments:
      ...

  deploy:
    type: octopusdeploy/deploy-release
    stage: "Deploy project"
    arguments:
      ...

  run-runbook:
    type: octopusdeploy/run-runbook
    stage: "Run the runbook"
    arguments:
      ...
```

#### Example Pipeline build

The following example demonstrates a Codefresh Pipeline build of our example application, [OctoPetShop](https://github.com/OctopusSamples/OctoPetShop).  This application is written in .NET Core and consists of four components:

- OctopusSamples.OctoPetShop.Database - Database updates using DBUp
- OctopusSamples.OctoPetShop.Web - Web front end
- OctopusSamples.OctoPetShop.ProductService - Product service API
- OctopusSamples.OctoPetShop.ShoppingCartService - Shopping cart service API

To build this application, you'll need the following steps:

- Checkout the source code
- Clone the source code

Below is an example Codefresh Pipeline workflow which includes these steps:


```yaml
version: "1.0"
stages:
  - "Deploy project"
  - "Run the runbook"

steps:
  create-release:
    type: octopusdeploy/create-release
    stage: "Deploy project"
    arguments:
      OCTOPUS_API_KEY: <<YOUR_API_KEY>>
      OCTOPUS_URL: "https://example.octopustest.app/"
      OCTOPUS_SPACE: "Spaces-1"
      PROJECT: "Create Release Test"
      RELEASE_NUMBER: "1.0.2"
      PACKAGES:
       - "Hello:1.0.0"
      RELEASE_NOTES: This is a release note

  deploy:
    type: octopusdeploy/deploy-release
    stage: "Deploy project"
    arguments:
      OCTOPUS_API_KEY: <<YOUR_API_KEY>>
      OCTOPUS_URL: "https://example.octopustest.app/"
      OCTOPUS_SPACE: "Spaces-1"
      PROJECT: "Create Release Test"
      RELEASE_NUMBER: "1.0.2"
      ENVIRONMENTS:
        - "Development"
```

# Octopus Deploy steps

Octopus Deploy steps and examples are available from the [Codefresh Marketplace](https://codefresh.io/steps/).

Each step includes one or two examples to help with setting up a workflow. Basic examples include only required arguments, and complex examples include both required and optional arguments.

## Run a runbook

To run a runbook, use the `octopusdeploy/run-runbook` step. Provide the name of the runbook that you want to run, as well as the project and environment name(s).

```yaml
run-runbook:
  type: octopusdeploy/run-runbook
  arguments:
    OCTOPUS_API_KEY: '${{OCTOPUS_API_KEY}}'
    OCTOPUS_URL: '${{OCTOPUS_URL}}'
    OCTOPUS_SPACE: Spaces 1
    PROJECT: Project Name
    NAME: Runbook Name
    ENVIRONMENTS:
      - Development
      - Production
```

Optional arguments include variables to use within the runbook, the option to run for specific tenants or tenant tags, as well as the option to use guided failure mode.

```yaml
run-runbook:
  type: octopusdeploy/run-runbook
  arguments:
    OCTOPUS_API_KEY: '${{OCTOPUS_API_KEY}}'
    OCTOPUS_URL: '${{OCTOPUS_URL}}'
    OCTOPUS_SPACE: Spaces 1
    PROJECT: Project Name
    NAME: Runbook Name
    ENVIRONMENTS:
      - Development
      - Production
    VARIABLES:
      - 'Label:Value'
    TENANTS:
      - Tenant 1
    TENANT_TAGS:
      - Tenant tag 1
    USE_GUIDED_FAILURE: 'false'

```
