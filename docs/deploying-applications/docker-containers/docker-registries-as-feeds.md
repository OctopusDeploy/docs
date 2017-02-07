---
title: Docker Registries as Feeds
description: A Docker Registry is treated in Octopus Deploy as a feed that supplies images that are run as containers on a Docker Engine host.
position: 0
---

A [Docker Registry](https://docs.docker.com/registry/) is treated in Octopus Deploy as a feed that supplies images that are run as containers on a Docker Engine host.

:::success
Learn more about using Docker Registries in our guide: [Docker run with networking](/docs/guides/docker/docker-run-with-networking.md)
:::

## Using Docker Registries in Octopus Deploy {#DockerRegistriesasFeeds-UsingDockerRegistriesinOctopusDeploy}

In Octopus Deploy, Docker Registries are treated very similarly to [Package Repositories](/docs/packaging-applications/package-repositories/index.md), and Images are treated very similarly to Packages.

Octopus Deploy supports the Docker Registry [Version 1](https://docs.docker.com/v1.6/reference/api/registry_api/) and [Version 2](https://docs.docker.com/registry/spec/api/) API specifications as outlined in the Docker reference files. You can access Docker Registries with or without using credentials, depending on registry configuration. You can use one of the hosted public registries, like [Docker Hub](https://hub.docker.com/), or you can host your own [Private Registry](/docs/deploying-applications/docker-containers/docker-registries-as-feeds.md).

### How Octopus Server and Deployment Targets integrate with Docker Registries {#DockerRegistriesasFeeds-HowOctopusServerandDeploymentTargetsintegratewithDockerRegistries}

The Docker Registries you configure need to be accessed by both the Octopus Server and your [Deployment Targets](/docs/deployment-targets/index.md).

The Octopus Server will contact your registry to obtain information on available images while designing and maintaining your projects. During deployment the `docker pull` command will be executed on the Deployment Targets themselves and they will pull the Images directly from the Docker Registry.

:::hint
**Container images are downloaded directly by the Deployment Target**
Octopus Deploy does not currently support functionality to push Images from the Octopus Deploy Server to the Deployment Targets in the same way that it does with other [supported packages](/docs/packaging-applications/supported-packages.md). That being said, the [layered architecture of Images](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/) allows your Deployment Targets to retrieve only those pieces that have changed from previous versions that are locally available, which is behaviour built in to the Docker Engine.
:::

:::success
**Accessing Docker Registries from different security zones**
It is possible that the URI to the Docker Registry will be different for the Octopus Server and the Deployment Targets. You can use the *Registry Path* field when configuring the Docker Registry in Octopus to provide an alternative URI to use on the Deployment Target.
:::

### Working with Docker Container Images in Octopus {#DockerRegistriesasFeeds-WorkingwithDockerContainerImagesinOctopus}

Docker Images with the same name are grouped together and referred to (in Docker terminology) as a **repository**. This is very similar to how Octopus, and other package managers like NuGet, treat Packages with the same Name or ID. When you configure a Docker step in Octopus you choose an Image by its Name, just like you would choose a Package ID for any of the other [supported packages](/docs/packaging-applications/supported-packages.md).

![](/docs/images/5671031/5865827.png "width=500")

When you create a release in Octopus, you need to choose the "version" of the Image(s) you want as part of the release. Octopus will load the Tags for the Image(s) and attempt to parse them as a [Semantic Version](http://semver.org/). The tags that can be parsed as a valid [Semantic Version](http://semver.org/) will be available to be selected for deployment as the "version" of the Container Image(s).

![](/docs/images/5671031/5865828.png "width=500")

## Docker Hub {#DockerRegistriesasFeeds-DockerHub}

The default Docker Registry, which is maintained by the Docker organisation, is the cloud-hosted [Docker Hub Registry](https://hub.docker.com/). This is the Registry which is used by docker engine when it is first installed and you call `docker search`.

Searching for official public repositories do not require credentials. However searching for repositories of a non-official repository will require you to provide your Docker Hub username and password.

:::problem
**DockerHub private repository limitations**
By design, Docker Hub **does not support [searching for private repositories](https://docs.docker.com/docker-hub/#/explore-repositories)** even with valid credentials. Additionally, while you will be able to search for a non-official repository, Docker Hub *will not return any tags for unofficial images*. If you are using an unofficial image, you will be able to select this when configuring your run step, but you will need to manually enter the version that you wish to deploy. So long as it exists in the registry, your Docker Engine will be able to pull it down. 
The Docker Hub API endpoint [https://index.docker.io/v1](https://index.docker.io/v1) provides access to repositories with different levels of access

| Repository | Shows In Search | Lists Tags |
| --- | --- | --- |
| Public + Official  | Yes | Yes |
| Public + Unofficial | Yes | No |
| Private | No | No |

We suggest using alternative registry when trying to manage your own private images. See below for more details on hosting your own [Private Registry](/docs/deploying-applications/docker-containers/docker-registries-as-feeds.md).
:::

:::success
**Using Docker Hub in Octopus Deploy**
To use the Docker Hub registry in Octopus Deploy, create an external feed with the following settings:
- **Feed Type:** Docker Container Registry
- **Name:** DockerHub (or anything else that makes sense to you)
- **URL:**[https://index.docker.io/v1](https://index.docker.io/v1)
- **API Version:** v1
- **Registry Path:** *leave blank*

*![](/docs/images/5671031/5865826.png "width=500")*
:::

## Private Registry {#DockerRegistriesasFeeds-PrivateRegistry}

The simplest way to host your own private v2 Docker Registry is to run the run a container from the official registry image!

```bash
docker run -d -p 5000:5000 --name registry registry:2
```

This image supports custom storage locations, certificates for HTTPS and authentication. For more details on setting up the registry checkout the [official docs](https://docs.docker.com/registry/deploying/).

There are many other options for private registries such as self hosting through [Docker Trusted Registry](https://docs.docker.com/docker-trusted-registry/) or [Artifactory](https://www.jfrog.com/artifactory/), or using a cloud provider like [Quay](https://quay.io/). If using Amazon's [EC2 Container Registry](https://aws.amazon.com/ecr/), keep in mind that it exposes a v2 feed, and that you must generate the username and password using the *aws ecr get-login* command and set these details into your Octopus Deploy feed configuration.

Note that as of the current version of ProGet (version 4.6.7 (Build 2)), their Docker Registry Feed does not expose the full Docker API and is missing the [_catalog endpoint](https://docs.docker.com/registry/spec/api/#/listing-repositories) which is required to list the available pacakges for release selection. It has been indicated that this may change in a future release.

:::problem
**Searching in a v2 registry**
Although a search feature is available in the v1 registry API, as of the time of writing there is no built-in search ability in the v2 specifications. There are ongoing discussions around an open [GitHub ticket](https://github.com/docker/distribution/issues/206) in the Docker registry Github repository however there is no clear indication if one will be provided due to changes in the philosophy behind the registry responsibilities. The current workaround, and one one that Octopus Deploy uses when a v2 Docker registry is provided, is to retrieve the full catalog via the [/v2/\_catalog](https://docs.docker.com/registry/spec/api/#/listing-repositories) endpoint and search for the required image locally.
:::
