---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Docker Container Registry
description: A Docker Registry is treated in Octopus Deploy as a feed that supplies images that are run as containers on a Docker Engine host.
navOrder: 20
hideInThisSectionHeader: true
---

A [Docker Registry](https://docs.docker.com/registry/) is treated in Octopus Deploy as a feed that supplies images that are run as containers on a Docker Engine host.

:::div{.success}
See an example deployment using Docker Registries in our guide: [Docker run with networking](/docs/deployments/docker/docker-run-with-networking).
:::

## Using Docker registries in Octopus Deploy {#DockerRegistriesasFeeds-UsingDockerRegistriesinOctopusDeploy}

In Octopus Deploy, Docker registries are treated very similarly to [Package Repositories](/docs/packaging-applications/package-repositories), and Images are treated very similarly to Packages.

Octopus Deploy supports the Docker Registry [Version 1](https://docs.docker.com/v1.6/reference/api/registry_api/) and [Version 2](https://docs.docker.com/registry/spec/api/) API specifications as outlined in the Docker reference files. You can access Docker Registries with or without using credentials, depending on registry configuration. You can use one of the hosted public registries, like [Docker Hub](https://hub.docker.com/), or you can host your own [Private Registry](/docs/packaging-applications/package-repositories/docker-registries).

### How Octopus Server and deployment targets integrate with Docker Registries {#DockerRegistriesasFeeds-HowOctopusServerandDeploymentTargetsintegratewithDockerRegistries}

The Docker Registries you configure need to be accessed by both the Octopus Server  and your [deployment targets](/docs/infrastructure).

The Octopus Server will contact your registry to obtain information on available images while designing and maintaining your projects. During deployment the `docker pull` command will be executed on the deployment targets themselves and they will pull the Images directly from the Docker Registry.

## Docker registry API version discovery {#DockerRegistriesasFeeds-VersionDiscovery}
When you add your Docker Registry as a feed in Octopus Deploy, Octopus will attempt to detect and connect using the appropriate version based on specifications outlined in the relevant Docker API documentation. If your registry does not support the API correctly, it is possible that the connection will not be able to take place. We advise you to click _Save and Test_ once you have entered the registry details to allow the version detection to take place and confirm that your credentials are correct.

According to the Docker API documentation, the [version 1](https://docs.docker.com/v1.6/reference/api/registry_api/) API should have a `/_ping` endpoint which will respond with a `X-Docker-Registry-Version` HTTP header in the response.
Similarly, the [version 2](https://docs.docker.com/registry/spec/api/) API expects a `Docker-Distribution-API-Version` HTTP header with a value of `registry/2.0`. Both of these endpoints are expected to be located at an absolute path of either `/v1` or `/v2` from the host.


:::div{.success}
**Accessing Docker registries from different security zones**
It is possible that the URI to the Docker Registry will be different for the Octopus Server and the deployment targets. You can use the *Registry Path* field when configuring the Docker Registry in Octopus to provide an alternative URI to use on the deployment target.
:::

### Working with Docker container images in Octopus {#DockerRegistriesasFeeds-WorkingwithDockerContainerImagesinOctopus}

Docker images with the same name are grouped together and referred to (in Docker terminology) as a **repository**. This is very similar to how Octopus, and other package managers like NuGet, treat Packages with the same Name or ID. When you configure a Docker step in Octopus you choose an Image by its Name, just like you would choose a Package ID for any of the other [supported packages](/docs/packaging-applications/#supported-formats).

:::figure
![](/docs/packaging-applications/package-repositories/docker-registries/images/5865827.png)
:::

When you create a release in Octopus, you need to choose the "version" of the Image(s) you want as part of the release. Octopus will load the Tags for the Image(s) and attempt to parse them as an [Octopus Version](https://oc.to/OctopusVersionRegex/).

:::figure
![](/docs/packaging-applications/package-repositories/docker-registries/images/5865828.png)
:::

:::div{.hint}
**Container images are downloaded directly by the Deployment Target or Worker**
Octopus Deploy does not currently support functionality to push Images from the Octopus Server to the deployment targets in the same way that it does with other [supported packages](/docs/packaging-applications/#supported-formats). That being said, the [layered architecture of Images](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers) allows your deployment targets to retrieve only those pieces that have changed from previous versions that are locally available, which is behavior built in to the Docker Engine.
:::

## Private registry {#DockerRegistriesasFeeds-PrivateRegistry}

The simplest way to host your own private v2 Docker Registry is to run the run a container from the official registry image!

```bash
docker run -d -p 5000:5000 --name registry registry:2
```

This image supports custom storage locations, certificates for HTTPS and authentication. For more details on setting up the registry checkout the [official docs](https://docs.docker.com/registry/deploying/).

## Other registry options {#DockerRegistriesasFeeds-OtherOptions}
There are many other options for private registries such as self hosting through [Docker Trusted Registry](https://docs.docker.com/docker-trusted-registry/) or [Artifactory](https://www.jfrog.com/artifactory/), or using a cloud provider like [Azure](https://azure.microsoft.com/en-au/services/container-registry/), [Cloudsmith](https://www.cloudsmith.com), [AWS](https://aws.amazon.com/ecr/) or [Quay](https://quay.io/).

We have provided further details on setting up a Octopus Feed to the following Docker Registries:
- [Docker Hub](/docs/packaging-applications/package-repositories/guides/container-registries/docker-hub)
- [Azure Container Services](/docs/packaging-applications/package-repositories/guides/container-registries/azure-container-services)
- [Amazon EC2 Container Services](/docs/packaging-applications/package-repositories/guides/container-registries/amazon-ec2-container-services)
- [Cloudsmith](/docs/packaging-applications/package-repositories/guides/cloudsmith-feed)

Note that as of the current version of ProGet (version 4.6.7 (Build 2)), their Docker Registry Feed does not expose the full Docker API and is missing the [_catalog endpoint](https://docs.docker.com/registry/spec/api/#/listing-repositories) which is required to list the available packages for release selection. It has been indicated that this may change in a future release.

:::div{.problem}

**Searching in a v2 Registry**
Although a search feature is available in the v1 registry API, as of the time of writing there is no built-in search ability in the v2 specifications. There are ongoing discussions around an open [GitHub ticket](https://github.com/docker/distribution/issues/206) in the Docker registry GitHub repository however there is no clear indication if one will be provided due to changes in the philosophy behind the registry responsibilities. The current workaround, and one that Octopus Deploy uses when a v2 Docker registry is provided, is to retrieve the full catalog via the [/v2/\_catalog](https://docs.docker.com/registry/spec/api/#/listing-repositories) endpoint and search for the required image locally.
:::

## Troubleshooting Registry Connections ##
If your Octopus Deploy instance is having problems trying to connect with your Docker Registry when running the **Save and Test** operation, it may failing due to reasons outside the control of Octopus Deploy.

Try to connect to your registry directly through the browser from the same machine that Octopus is hosted on. Use the feed url you provided and ensure that either `/v1` or `/v2` is appended to the end of the path depending on what version of the Docker Registry API you are running. If the connection is valid then you should receive a `200` response, possibly receiving a user auth challenge (see API details above under [Docker Registry API version discovery](#DockerRegistriesasFeeds-VersionDiscovery)). If this does not occur then you may be having issues with your registry or network which you may need to fix before using through Octopus Deploy.

## Learn more

 - Generate an Octopus guide for [Docker Registries and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?packageRepository=Docker%20Registry).
 - [Docker blog posts](http://octopus.com/blog/tag/docker).
 - [Linux blog posts](https://octopus.com/blog/tag/linux).
