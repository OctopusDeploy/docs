---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Samples instance
description: View real-world deployment and runbook examples in our Octopus Cloud samples instance - https://samples.octopus.app
navOrder: 50
---

Many deployment samples in our docs reference our Octopus Cloud [samples instance](https://samples.octopus.app), which contains real-world deployment and runbook examples. Each one highlights one or more available Octopus features, from deploying Java applications to upgrading a Helm chart in a Kubernetes cluster.

This page acts as a directory of features found in our samples instance.

:::hint
We're constantly adding to our samples instance. If you'd like to explore any of our samples further, just go to [https://samples.octopus.app](https://samples.octopus.app) and log in as a guest.
:::

## Deployment features {#deployment-features}

This section contains Octopus features that are found in Project [deployment processes](/docs/projects/deployment-process/) in the samples instance. Each feature list is categorized by the Octopus Space and Project in which it can be found.

### AWS {#deployments-aws}

Explore examples of Octopus Deploy's [AWS integration](/docs/deployments/aws/), including EC2, AWS RDS database, AWS CLI, Lambda and ECS deployments.

!include <samples-aws-deployment-feature-list>

### Azure {#deployments-azure}

Explore ways to use Octopus Deploy's built-in [Azure](/docs/deployments/azure/) steps, including Azure WebApp, Azure CLI, ARM template and Azure SQL deployments.

!include <samples-azure-deployment-feature-list>

### Google Cloud {#deployments-google-cloud}

Find out more about the new Octopus dedicated [Google Cloud](/docs/deployments/google-cloud/) support, including gcloud CLI, Google Container Registry (GCR), Terraform and Kubernetes deployments.

!include <samples-google-cloud-deployment-feature-list>

### IIS {#deployments-iis}

Learn more about the [IIS](/docs/deployments/windows/iis-websites-and-application-pools/) support that Octopus has to offer, including IIS deployments, and community step templates that allow fine-grain control of your IIS Websites and applications.

!include <samples-iis-deployment-feature-list>

### Java {#deployments-java}

Octopus has a range of [Java application](/docs/deployments/java/) deployment examples, from deploying to Tomcat via Manager, deployments to Wildfly EAP and community step templates that offer first-class database deployment options like Flyway.

!include <samples-java-deployment-feature-list>

### Kubernetes {#deployments-kubernetes}

View practical [Kubernetes](/docs/deployments/kubernetes/) examples, including deployment, service, ingress resources, and helm chart upgrades.

!include <samples-kubernetes-deployment-feature-list>

## Runbook features {#runbook-features}

This section contains features that are found in Octopus [runbooks](/docs/runbooks/) in our samples instance. Each feature list is categorized by the Octopus Space, Project and runbook in which it can be found.

### AWS {#runbooks-aws}

Explore examples of Octopus Deploy's [AWS integration](/docs/deployments/aws/), including EC2, AWS RDS database, AWS CLI, Lambda and ECS deployments.

!include <samples-aws-runbook-feature-list>

### Azure {#runbooks-azure}

Explore ways to use Octopus Deploy's built-in [Azure](/docs/deployments/azure/) steps, including Azure WebApp, Azure CLI, ARM template and Azure SQL deployments.

!include <samples-azure-runbook-feature-list>

### Google Cloud {#runbooks-google-cloud}

Find out more about the new Octopus dedicated [Google Cloud](/docs/deployments/google-cloud/) support, including gcloud CLI, Google Container Registry (GCR), Terraform and Kubernetes deployments.

!include <samples-google-cloud-runbook-feature-list>

### IIS {#runbooks-iis}

Learn more about the [IIS](/docs/deployments/windows/iis-websites-and-application-pools/) support that Octopus has to offer, including IIS deployments, and community step templates that allow fine-grain control of your IIS Websites and applications.

!include <samples-iis-runbook-feature-list>

### Java {#runbooks-java}

Octopus has a range of [Java application](/docs/deployments/java/) deployment examples, from deploying to Tomcat via Manager, deployments to Wildfly EAP and community step templates that offer first-class database deployment options like Flyway.

!include <samples-java-runbook-feature-list>

### Kubernetes {#runbooks-kubernetes}

View practical [Kubernetes](/docs/deployments/kubernetes/) examples, including deployment, service, ingress resources, and helm chart upgrades.

!include <samples-kubernetes-runbook-feature-list>

### Terraform {#runbooks-terraform}

See how to use Octopus built-in [Terraform](/docs/deployments/terraform/) steps to manage your infrastructure and resources in a convention-based, templated way. Our samples instance includes terraform `plan`, `apply` and `destroy` terraform steps.

!include <samples-terraform-runbook-feature-list>
