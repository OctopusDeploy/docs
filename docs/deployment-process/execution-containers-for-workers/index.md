---
title: Execution containers for workers
description: How to set a step in your deployment/runbook process to run inside a container.
position: 15
---

For a [step](/docs/deployment-process/steps/index.md) running on a [worker](docs/infrastructure/workers/index.md) or on the [Octopus Server](docs/infrastructure/workers/built-in-worker.md), you can select a container for the step's execution.

:::warning
Execution containers for workers are not supported for [Dynamic Worker pools](/docs/infrastructure/workers/dynamic-worker-pools.md).
:::

## Minimum requirements
You need Docker installed and running on the [worker](docs/infrastructure/workers/index.md)/Octopus Server ([built-in worker](/docs/infrastructure/workers/built-in-worker.md)), in order to use execution containers for workers


## How to use execution containers for workers 

- Configure a [feed](/docs/packaging-applications/package-repositories/docker-registries/index.md) in Octopus Deploy for a Docker registry.
  - [Add Docker Hub as an external feed](https://octopus.com/blog/build-a-real-world-docker-cicd-pipeline#add-docker-hub-as-an-external-feed).
- Add a project and define a deployment process.
- Set the **Execution Location** for your step to **Run on a worker**.
- In **Container Image** select **Runs on a worker inside a container**.
- Choose the previously added container registry.
- Enter the name of the image (aka execution container) you want your step to run in. (e.g. !docker-image <octopusdeploy/worker-tools:ubuntu.18.04>).
- Click **Save**.
- Click **Create release & deploy**.

:::hint
The same process can be repeated for a runbook.
:::

![](images/selector.png "width=500")

## First deployment on a docker container

:::hint
Pre-pulling your chosen image will save you time during deployments.
:::

When you choose to run one or more of your deployment steps in a container, your deployment process will `docker pull` the image you provide at the start of each deployment during package acquisition.

For your first deployment this may take a while since your docker image won't be cached. You can pre-pull the desired docker image on your worker before your first deployment to avoid any delays.

## What docker image should I use?

- You can use any image that meets the minimum tooling requirements to run your chosen step. 
- You can use our recommended images (see below).
- You can build your own based on the recommended images.

## The octopusdeploy/worker-tools docker images 

We provide recommended images on DockerHub [octopusdeploy/worker-tools](https://hub.docker.com/r/octopusdeploy/worker-tools) that include common tools used for octopus steps. 



The images include cross-platform support for Windows 2019 and Ubuntu 18.04, and you can select the `latest` image tag or a specific version based on major, minor, or specific patch versions. The following tools come pre-installed with the images:

- Powershell Core
- .NET Core SDK (3.1 LTS)
- Java SDK
- Azure CLI
- Az Powershell Core Modules
- AWS CLI
- Node.js
- kubectl
- Helm 3
- Terraform
- Python
- Azure Function Core Tools
- Google Cloud CLI
- ScriptCS (Window-only)
- F# (Windows-only)

:::hint
**Custom images:**
We highly recommend using our `worker-tools` image as a starting point for your own custom image to run on a worker.

The versions and tools used above are subject to change, this list is intended to represent the general configuration at the time of writing.

:::
