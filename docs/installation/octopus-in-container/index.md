---
title: Octopus as a Container
description: Running the Octopus Server or Tentacle from inside the official Docker container
position: 8
hideInThisSectionHeader: true
---

Octopus Server and Octopus Tentacle Docker containers are published and are now being made available for each release on [DockerHub](https://hub.docker.com/r/octopusdeploy/). Running Octopus from inside a container lets you avoid installing Octopus directly on top of your infrastructure and makes getting up and running with Octopus as simple as a one line command.

These documents assume some familiarity with Docker and containers and don't dive into all the details about using Docker and running containers. Read the [Docker docs](https://docs.docker.com/) for more in-depth and up to date information.

## Container image OS/Architecture {#container-image-os-architecture}

- For **Octopus Server**, we publish a `linux/amd64` image.
- For **Octopus Tentacle**, we publish both `windows/amd64` and `linux/amd64` images.

The images for both are available from [DockerHub](https://hub.docker.com/r/octopusdeploy/).

:::hint
We have deprecated Windows Docker images for **Octopus Server** and **Octopus CLI** as customer uptake was low and Microsoft no longer supports the OS versions we were publishing (Windows [1809](https://docs.microsoft.com/en-us/windows/release-health/status-windows-10-1809-and-windows-server-2019), [1903](https://docs.microsoft.com/en-us/lifecycle/announcements/windows-10-1903-end-of-servicing), and  [1909](https://docs.microsoft.com/en-us/windows/release-health/status-windows-10-1909)). 

Customers are encouraged to use the Linux Docker image instead. Existing Windows images for Octopus Server and Octopus CLI will remain available from our [Docker Hub repository](https://hub.docker.com/r/octopusdeploy/octopusdeploy), but those tagged as `latest` will no longer work on Windows. See our documentation for a guide to [Migrate to an Octopus Server Linux Container from a Windows Container](/docs/installation/octopus-in-container/migrate-to-server-container-linux-from-windows-container.md).

Octopus CLI is available as an exe, a .NET Core global tool, or via chocolatey. Please refer to our [downloads page](https://octopus.com/downloads/octopuscli).
:::

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker).
