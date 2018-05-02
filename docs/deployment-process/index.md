---
title: Deployment Process
description: Deploying applications starts with defining a project's deployment process.
hideInThisSection: true
position: 5
---

Now that you have [Octopus installed](docs/installation/index.md), your [infrastructure configured](docs/infrastructure/index.md), and your [applications packaged](docs/packaging-applications/index.md), you are ready to start deploying your software. This section explains the process and explores the options that are available.

The deployment process is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

To define your deployment process, your must:

1. Create a [project](docs/deployment-process/projects.md).
1. Add [steps](docs/deployment-process/steps/index.md) to the project.
1. Add [configuration variables](docs/deployment-process/variables/index.md) to the project.
1. Create a [release](docs/deployment-process/releases/index.md).

## Hello World Deployment Process

For this example process, we've configured a **Test** environment with one **Deployment Target**. We'll use Octopus Deploy to design a simple process with only one step that runs a script on the Deployment Target.

If you need a refresher on **Environments**, **Deployment Targets**, or how to configure them, review the [Infrastructure docs](docs/infrastructure/index.md).

### Define the Project

A project is a collection of deployment steps and configuration variables that define how your software is deployed.

Before we can define our deployment process we need to create a project.

1. If you're not already logged into the Octopus Web Portal, do that now.
2. Select **Projects** from the main navigation, and click **ADD PROJECT**.
3. Give the project a name that's meaning to you, and anybody else who'll work on the project. I've called this one *Hello World*.
4. Click **Save** and you will be taken to the newly created project's overview page.

If you are likely to have a lot of projects, in addition to giving them meaningful names you can also add a project logo. From the project's overview page, select settings and click logo. From there you can add your image.

### Define Your Deployment Process



## Working with the Octopus API {#DeploymentProcesses-WorkingwiththeOctopusAPI}

Octopus Deploy is built API-first, which means everything you can do through the Octopus UI can be done with the API. In the API we model the deployment process the same way, starting at the Project:

- Project
- Deployment Process
- Steps
- Actions

We have provided lots of helpful functions for building your deployment process in the [.NET SDK](/docs/api-and-integration/octopus.client.md), or you can use the raw HTTP API if that suits your needs better.

Learn about using the [Octopus REST API](/docs/api-and-integration/api/index.md).

:::success
Record the HTTP requests made by the Octopus UI to see how we build your deployment processes using the Octopus API. You can do this in the Chrome developer tools, or using a tool like Fiddler.
:::
