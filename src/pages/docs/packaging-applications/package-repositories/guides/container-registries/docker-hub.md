---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Docker Hub
description: How to add Docker Hub as an Octopus Deploy feed for use in Docker steps.
navOrder: 50
---

The default Docker Registry, which is maintained by the Docker organization, is the cloud-hosted [Docker Hub Registry](https://hub.docker.com/). This is the Registry which is used by docker engine when it is first installed and you call `docker search`.

From September 5th 2022, the Docker Hub Registry is [deprecating v1 endpoints](https://www.docker.com/blog/docker-hub-v1-api-deprecation) to retrieve tags and images. The equivalent v2 endpoints require authentication. Therefore external feeds will require a username and password to access the Docker Hub API. Searching for repositories of a non-official repository will also require you to provide your Docker Hub username and password. Searching for official public repositories does not require credentials.

:::problem
**DockerHub Private Repository Limitations**

By design, Docker Hub **does not support** [searching for private repositories](https://docs.docker.com/docker-hub/#/explore-repositories), even with valid credentials. Additionally, while you will be able to search for a non-official repository, Docker Hub *will not return any tags for unofficial images*. If you are using an unofficial image, you will be able to select this when configuring your run step, but you will need to manually enter the version that you wish to deploy. So long as it exists in the registry, your Docker Engine will be able to pull it down.
The Docker Hub API endpoint [https://index.docker.io/v1](https://index.docker.io/v1) provides access to repositories with different levels of access

| Repository | Shows In Search | Lists Tags |
| --- | --- | --- |
| Public + Official  | Yes | Yes |
| Public + Unofficial | Yes | No |
| Private | No | No |

We suggest using alternative registry when trying to manage your own private images. See here for more details on hosting your own [Private Registry](/docs/packaging-applications/package-repositories/docker-registries/index.md#DockerRegistriesasFeeds-PrivateRegistry).
:::

## Adding Docker Hub as an Octopus External Feed

To use the Docker Hub registry in Octopus Deploy, create an external feed with the following settings:

- **Feed Type:** Docker Container Registry
- **Name:** DockerHub (or anything else that makes sense to you)
- **URL:** [https://index.docker.io](https://index.docker.io)
- **Registry Path:** *leave blank*
- **Credentials:** Username and Password (Login for your DockerHub account, this is required for accessing public repositories)

![Docker Hub Registry Feed](images/dockerhub-feed.png "width=500")
