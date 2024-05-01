---
layout: src/layouts/Default.astro
pubDate: 2024-01-01
modDate: 2024-05-01
title: Kubernetes
navTitle: Kubernetes
navSection: Kubernetes
description: Octopus Deploy provides support for deploying Kubernetes resources.
navOrder: 570
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

## Get started

Octopus supports multiple approaches for deploying to Kubernetes. 

 - Deploying a Helm Chart 
 - Deploying Kubernetes YAML files
 - A UI-driven step that guides you through the Kubernetes configuration without requiring any YAML 