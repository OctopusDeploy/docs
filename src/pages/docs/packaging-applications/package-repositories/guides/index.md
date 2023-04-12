---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Guides
description: Instructions on how to set-up third-party external package feeds for Octopus to consume for use in deployments and runbooks.
navOrder: 60
hideInThisSection: true
---

Octopus can consume package feeds from the [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/), and supports the following external repositories:

 - [Docker feeds](/docs/packaging-applications/package-repositories/docker-registries/).
 - [GitHub feeds](/docs/packaging-applications/package-repositories/github-feeds.md).
 - [Maven feeds](/docs/packaging-applications/package-repositories/maven-feeds.md).
 - [NuGet feeds](/docs/packaging-applications/package-repositories/nuget-feeds.md).
 - Helm feeds.
 - AWS ECR feeds.
 
This section provides instructions on how to set-up a number of these external feeds from third-parties for use within Octopus.

- [Configuring Container registries as external feeds in Octopus](/docs/packaging-applications/package-repositories/guides/container-registries/)
- [Configuring NuGet repositories as external feeds in Octopus](/docs/packaging-applications/package-repositories/guides/nuget-repositories/)
- [Configuring Maven repositories as external feeds in Octopus](/docs/packaging-applications/package-repositories/guides/maven-repositories/)
- [Cloudsmith Multi-format repositories](/docs/packaging-applications/package-repositories/guides/cloudsmith-feed.md)