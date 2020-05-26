---
title: Execution containers for workers
description: How to set a step in your deployment/runbook process to run inside a container.
position: 15
---

For a [step](/docs/deployment-process/steps/index.md) running on a [worker](docs/infrastructure/workers/index.md) or on the [Octopus Server](docs/infrastructure/workers/built-in-worker.md), you can select a Docker image to execute the step inside of.

:::warning
Execution containers for workers are not currently supported for Octopus Cloud [Dynamic Worker pools](/docs/infrastructure/workers/dynamic-worker-pools.md).
The dynamic workers do not have Docker installed. This will be addressed in the near future. 
:::

When an execution container is configured for a step, Octopus will still connect to the worker machine via a [Tentacle or SSH](/docs/infrastructure/workers.md#register-a-worker-as-a-listening-tentacle), and [Calamari](/docs/octopus-rest-api/calamari.md) will still be pushed to the worker.  The difference is that the specified image will be run as a container and Calamari will be executed inside the container (using the [docker exec](https://docs.docker.com/engine/reference/commandline/exec/) command).

See the [blog post](https://octopus.com/blog/execution-containers) announcing this feature for some added context.

## Minimum requirements
You need Docker installed and running on the [worker](docs/infrastructure/workers/index.md)/Octopus Server ([built-in worker](/docs/infrastructure/workers/built-in-worker.md)), in order to use execution containers for workers


## How to use execution containers for workers 

- Configure a [feed](/docs/packaging-applications/package-repositories/docker-registries/index.md) in Octopus Deploy for a Docker registry.
  - [Add Docker Hub as an external feed](https://octopus.com/blog/build-a-real-world-docker-cicd-pipeline#add-docker-hub-as-an-external-feed).
- Add a project and define a deployment process (or add a [runbook](/docs/operations-runbooks.md)).
- Set the **Execution Location** for your step to **Run on a worker**.
- In **Container Image** select **Runs on a worker inside a container**.
- Choose the previously added container registry.
- Enter the name of the image (aka execution container) you want your step to run in. (e.g. !docker-image <octopusdeploy/worker-tools:ubuntu.18.04>).
- Click **Save**.
- Click **Create release & deploy**.

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

:::hint
We recommend using our `worker-tools` image as a starting point for your own custom image to run on a worker
:::

The canonical source for what is contained in the `octopusdeploy/worker-tools` images is the `Dockerfile`'s in the [GitHub repo](https://github.com/OctopusDeploy/WorkerTools). For example: 
- The [Ubuntu 18.04 Dockerfile](https://github.com/OctopusDeploy/WorkerTools/blob/master/ubuntu.18.04/Dockerfile)
- The [Windows 2019 Dockerfile](https://github.com/OctopusDeploy/WorkerTools/blob/master/windows.ltsc2019/Dockerfile)

Some of the tools included are:

- Octopus Deploy CLI and .NET client library
- .NET Core
- Java (JDK)  
- NodeJS
- Azure CLI 
- AWS CLI 
- Google Cloud CLI
- kubectl 
- Helm
- Terraform
- Python
