---
layout: src/layouts/Default.astro
pubDate: 2024-10-01
modDate: 2024-10-01
title: Codefresh Pipelines
description: Codefresh pipelines can leverage the Octopus CLI to build, push, and create releases for Octopus Deploy.
navOrder: 50
---

Codefresh is a cloud-native ...

[Codefresh Pipelines](https://codefresh.io/docs/docs/pipelines/introduction-to-codefresh-pipelines/) are workflows that for Codefresh's continuous integration (CI) platform. 

# Integrating with Codefresh Pipelines
Codefresh steps allows creating, deploying and promoting releases to your Octopus Deploy [environments](/docs/infrastructure/environments/). The steps do this by running the [Octopus CLI](/docs/octopus-rest-api/octopus-cli) inside a docker container.

Octopus Deploy has several custom pipeline steps available: 

- [Login to Octopus](https://codefresh.io/steps/step/octopusdeploy%2Flogin)
- [Create a release](https://codefresh.io/steps/step/octopusdeploy%2Fcreate-release)
- [Deploy a release](https://codefresh.io/steps/step/octopusdeploy%2Fdeploy-release)
- [Deploy a tenanted release](https://codefresh.io/steps/step/octopusdeploy%2Fdeploy-release-tenanted)
- [Run a Runbook](https://codefresh.io/steps/step/octopusdeploy%2Frun-runbook)
- [Push Build Information](https://codefresh.io/steps/step/octopusdeploy%2Fpush-build-information)


# Codefresh Step secrets

For example:

| Variable name       | Description|
| ------------- | ------- |
| `OCTOPUS_SERVER_URL` | The Octopus Server URL you wish to push the final package to |
| `OCTOPUS_SERVER_API_KEY` | The Octopus Deploy API Key required for authentication |
| `OCTOPUS_SERVER_SPACE` | The Space to push packages to |


# Building with Codefresh Pipelines

Codefresh Pipelines are workflows that consist of ***steps***. By default, the Codefresh execution engine will execute sequentially from the first defined step in the `codefresh.yml` file. To [configure parallel steps in your pipeline](https://codefresh.io/docs/docs/pipelines/advanced-workflows/), see the Codefresh documentation for more details. 

Before defining the steps in your workflow, in ***stages***. Stages are groups used to define how the steps will be visualized in the UI, and have no effect on the execution of the steps.

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

  run-runbook:
    type: octopusdeploy/run-runbook
    stage: "Run the runbook"
    arguments:
      OCTOPUS_API_KEY: <<YOUR_API_KEY>>
      OCTOPUS_URL: "https://example.octopustest.app/"
      OCTOPUS_SPACE: "Spaces-1"
      PROJECT: "Runbook Test"
      NAME: "Voila"
      ENVIRONMENTS:
        - "Development"
        - "Production"
      USE_GUIDED_FAILURE: 'false'
```


# Octopus Deploy steps

Octopus Deploy steps and examples are available from the [Codefresh Marketplace](https://codefresh.io/steps/).

Each step includes one or two examples to help with setting up a workflow. Basic examples include only required arguments, and complex examples include both required and optional arguments.

## Run a runbook

In addition to common build steps, we also have an action that can Run a Runbook.

### Basic example

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

### Complex example

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
