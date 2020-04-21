---
title: Execution containers for workers
description: How to set a step in your deployment process to run inside a container.
position: 15
---

For a [step](/docs/deployment-process/steps/index.md) running on a [worker](docs/infrastructure/workers/index.md) or on [Octopus server](docs/infrastructure/workers/built-in-worker.md) that you define in your [deployment processes](/docs/deployment-process/index.md), you can select a container for the step's execution. 

## Setup a container 

- Set a [feed](/docs/packaging-applications/package-repositories/docker-registries/index.md) in Octopus Deploy for a Docker registry. 
- Add a project and define a deployment process. 
- Select a worker pool. 
- Select to run on a container for worker. 
- Choose the previously added container registry. 
- Enter an image name if already known. (e.g. !docker-image <octopusdeploy/worker-tools:ubuntu.18.04>)
- Save.
- Create release & deploy.

## First deployment on a docker container
Your first deployment on a Docker container might take a while as it will download all the dependencies on the docker image. These dependencies will be installed as a part of deployment process execution automatically. Alternatively, you can pre-pull the desired docker image before your first deployment to avoid any delays.

## Minimum requirements for your custom image to run as a worker

## Document how to build a docker image, using the example of our image

## How to construct an image name
Point to docker hub page with Octopus image. 

Some of the choices to pick an image suitable to your needs based on:
- OS + distribution

Supports version format:
- Major
- Major.Minor
- Major.Minor.Patch
