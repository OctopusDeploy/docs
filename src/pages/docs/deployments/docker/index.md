---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Docker Containers
description: Octopus allows you to treat Docker images as immutable build artifacts that are moved through each stage of deployment by running them as containers with deploy-time specific configuration.
navOrder: 60
hideInThisSectionHeader: true
---

Following on from the original [Octopus-Docker blog post](https://octopus.com/blog/docker-windows-octopus) and subsequent [RFC](https://octopus.com/blog/rfc-docker-integration), Octopus Deploy is taking the approach to treat Docker images as immutable build artifacts that are moved through each stage of deployment by running them as containers with deploy-time specific configuration. We feel this best follows the container mentality and avoids trying to re-invent container build and orchestration tools that already exist. We feel however, that Octopus Deploy still plays a crucial part in this process to allow your container deployments to integrate into your full deployment pipeline, through a staged environment lifecycle and alongside other non-container phases. Maintaining centralized auditing, configuration and orchestration of the whole deployment process from start to finish is not a problem solved by containers, and this is where our focus and expertise at Octopus Deploy lies.

## Windows Containers on Windows Server**
While Docker Containers on Windows Server (not Docker for Windows through Docker Toolbox) are now generally available, this feature appears to still have some issues with key areas such as networking. This is an area that the Docker and Windows team are actively improving. While deploying a Windows Container to a Tentacle target on Windows should work, you may experience issues trying to use custom networks or volumes. We would suggest using Linux targets via SSH for the time being until this feature stabilizes.

## How Docker Containers Map to Octopus concepts {#DockerContainers-HowDockercontainersmaptoOctopusconcepts}

In Octopus Deploy, a deployment usually involves a versioned instance of package that is obtained from some package feed. Prior to 3.5.0, this was typically modeled by defining a NuGet server (e.g. MyGet, TeamCity) as the package repository, which exposes a list of named packages to be deployed. Each instance of this package existed as a versioned .nupkg file which would be obtained by the target at deployment time and extracted.

:::figure
![](/docs/deployments/docker/images/5865809.png)
:::

With the introduction of support for Docker, a similar concept exists whereby a Docker Registry (e.g. DockerHub, Artifactory) exposes a list of Images (unfortunately in Docker terminology these are known as repositories) which can be tagged with one (or more) values. By treating and interpreting the tags as version descriptions for a given Image, a Docker deployment can map to a similar versioned process flow.

:::figure
![](/docs/deployments/docker/images/5865811.png)
:::

The Octopus concepts of feeds, packages and versions can be mapped to the Docker concepts of registries, images and tags. There is a slight caveat to this similarity since Octopus does not currently intend to self-host a Docker registry in the server, so there is no Docker equivalent of the built-in feed. Also the targets currently need to have access to the repository to pull down images as there is no push process from the Octopus Server.

:::figure
![](/docs/deployments/docker/images/5865808.png)
:::


## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
 - [Docker registries as feeds](/docs/packaging-applications/package-repositories/docker-registries)
 - [Accessing container details](/docs/deployments/docker/accessing-container-details)