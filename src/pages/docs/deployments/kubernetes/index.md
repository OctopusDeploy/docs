---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-07-28
title: Kubernetes
description: Octopus Deploy provides support for deploying Kubernetes resources.
navOrder: 80
hideInThisSectionHeader: true
---

Octopus Deploy makes it easy to manage your Kubernetes resources, whether you're starting simple or want complete control over a complex setup. You can [deploy Kubernetes resources](https://octopus.com/use-case/kubernetes) such as [deployments](/docs/deployments/kubernetes/deploy-container/), [services](/docs/deployments/kubernetes/deploy-service/), and [ingress](/docs/deployments/kubernetes/deploy-ingress), and run scripts against a Kubernetes cluster.

- Centralize your Kubernetes clusters and resources in a single place so you can focus on your applications and customers
- Adopt development best practices:
  - Deploy to development, test, and production environments with automatic configuration updates ([variable substitution](/docs/projects/variables/variable-substitutions))
  - Use built-in service accounts for simple and secure authentication
  - Implement deployment patterns like blue/green, canary, and rolling deployments
- Automate routine maintenance and respond more quickly to emergencies:
  - Octopus [runbooks](/docs/runbooks/) and [projects](/docs/projects) share the same variables and accounts to interact with your clusters
  - Use pre-approved [kubectl](/docs/deployments/kubernetes/kubectl) scripts

:::figure
![Three screenshots from Octopus, showing the Google Cloud account configuration, Kubernetes deployment process, and a successful deployment to production.](/docs/deployments/kubernetes/image-octopus-gcp-kubernetes-2021-q3.png)
:::

## Get started with Kubernetes and Octopus or manage a complex setup

Our Kubernetes automation supports three approaches:

1. A structured UI step that guides you through the configuration without any YAML input
2. A fully flexible step configured with raw YAML
3. Helm chart automation steps

All three methods:

- Are compatible with runbooks, [environments](/docs/infrastructure/environments), and shared variables in Octopus
- Include robust config file support for repeatable and reliable deployments across multiple environments

### Structured UI step without YAML input

If you're getting started with Kubernetes, we recommend the structured UI step. Octopus prompts you for the required properties and provides deep links to the official Kubernetes documentation so you can learn how Kubernetes works.

### Helm chart automation steps

Helm is the de facto Kubernetes package manager, so our [Helm chart steps](/docs/deployments/kubernetes/helm-update) are a popular option. Again, you have the full power of Octopus at your disposal, but there's less raw YAML to configure.

## Kubernetes targets

Kubernetes targets are used by the Kubernetes steps to define the context in which deployments and scripts are run. Learn how to configure [Kubernetes deployment targets](/docs/infrastructure/deployment-targets/kubernetes-target).

## Learn more

- Generate an Octopus guide for [Kubernetes and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Kubernetes)
- [Kubernetes blog posts](https://octopus.com/blog/tag/kubernetes)
