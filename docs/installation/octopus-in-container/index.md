---
title: Octopus as a Container
description: Running the Octopus Server or Tentacle from inside the official Docker container
position: 8
---

Octopus server and Octopus Tentacle Docker containers are published and are now being made available for each release. Running Octopus from inside a container lets you avoid installing Octopus directly on top of your infrastructure and makes getting up and running with Octopus as simple as a one line command.

These documents assume some familiarity with Docker and containers and don't dive into all the details about using Docker and running containers. Read the [Docker docs](https://docs.docker.com/) for more in-depth and up to date information.

:::info
Both of the containers are built on top of the `microsoft/windowsservercore:latest` (non 1709) base image so at the time of writing they will only run on Windows where the [Windows Containers](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) feature has been enabled. The images are available from [DockerHub](https://hub.docker.com/r/octopusdeploy/), and the DockerFiles can be accessed via the open source [Octopus-Docker GitHub repository](https://github.com/OctopusDeploy/Octopus-Docker).
:::
