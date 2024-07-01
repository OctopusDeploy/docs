---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Artifactory container registry
description: How to add Artifactory as an Octopus Deploy feed for use in Docker steps.
navOrder: 20
---

Artifactory offers both self hosted and cloud instances, both of which are capable of hosting [Docker registries](https://jfrog.com/help/r/jfrog-artifactory-documentation/jfrog-container-registry). The process for adding a Docker registry for either type is the same.

## Adding Artifactory as an Octopus External Feed

To use an Artifactory Docker registry in Octopus Deploy, create an external feed with the following settings:

- **Feed Type:** Docker Container Registry
- **Name:** Artifactory-Docker (or anything else that makes sense to you)
- **URL:** Artifactory registry URLs are constructed in 3 parts:
  - The base instance URL: e.g. `https://my-company.jfrog.io/artifactory`
  - The Docker API path: `/api/docker`
  - The repository name: e.g. `my-local-repo`
  
  The example values above would result in the value: `https://my-company.jfrog.io/artifactory/api/docker/my-local-repo` for use in the **URL** field.

- **Registry Path:** Artifactory registry paths are constructed in 2 parts:
  - The artifactory instance URL e.g. `my-company.jfrog.io`
  - The repository name e.g. `my-local-repo`

  The example values above would result in the value: `my-company.jfrog.io/my-local-repo` for use in the **Registry Path** field.
- **Credentials:** By default, Artifactory requires a valid username and password/[access token](https://jfrog.com/help/r/jfrog-platform-administration-documentation/access-tokens) combination to access the registry. However, anonymous authentication for reading from a registry [can be enabled](https://jfrog.com/help/r/how-to-perform-anonymous-pulls-but-require-authentication-for-pushing-to-a-docker-repository) with additional configuration in your Artifactory instance.

![Artifactory Registry Feed](/docs/packaging-applications/package-repositories/guides/container-registries/images/artifactory-docker-feed.png)
