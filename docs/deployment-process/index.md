---
title: Deployment Process
description: Deploying applications starts with defining a project's deployment process.
hideInThisSection: true
position: 5
---

Now that you have [Octopus installed](docs/installation/index.com), your [infrastructure configured](docs/infrastructure/index.com), and your [applications packaged](docs/packaging-applications/index.md), you are ready to start deploying your software. This section explains the process and explores the options that are available.

The deployment process is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

To define your deployment process your must:

1. Create a [project](docs/deployment-process/projects.md).
1. Add [steps](docs/deployment-process/steps/index.md) to the project.
1. Add [configuration variables](docs/deployment-process/variables/index.md) to the project.
1. Create a [release](docs/deployment-process/releases/index.md).

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
