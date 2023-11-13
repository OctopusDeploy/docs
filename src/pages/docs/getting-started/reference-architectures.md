---
layout: src/layouts/Default.astro
pubDate: 2023-10-31
modDate: 2023-11-13
title: Reference architectures
description: Populate an Octopus space with example projects and supporting resources demonstrating reference architectures
navOrder: 55
---

Deployments are more than the sum of their parts, with well architected deployment processes empowering DevOps teams to release and maintain high quality software at a high velocity. The reference architecture steps provided by the [community step template library](/docs/projects/community-step-templates) allow DevOps teams to quickly populate an existing Octopus space with examples of well architected deployment projects, complete with all the supporting resources like environments, feeds, accounts, lifecycles etc.

## Common prerequisites

The reference architecture steps are typically run from a runbook. The runbook requires a small number of external resources to be defined:

1. A `Docker Container Registry` [feed](/docs/packaging-applications/package-repositories/guides/container-registries/docker-hub) called `Container Images` with the URL `https://index.docker.io`. This feed is used to access the [execution container for workers](/docs/projects/steps/execution-containers-for-workers) exposing a recent version of Terraform.
2. An [environment](/docs/infrastructure/environments) to execute runbooks in. This documentation assumes the environment is called `Admin`.
3. A [project](/docs/projects) to hold the runbooks. This documentation assumes the project is called `Reference Architecture`.

## Reference architecture steps

* [AWS EKS](reference-architectures/eks-reference-architecture)
* [Azure Web Apps](reference-architectures/webapp-reference-architecture)
