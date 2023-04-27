---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Getting started
subtitle: An overview of Octopus Deploy concepts
navTitle: Overview
navSection: Getting started
description: This section provides an overview of Octopus Deploy concepts and links to the relevant documentation, which explore the concepts further and guide you through implementing them with Octopus Cloud or your own self-hosted Octopus Server
navOrder: 5
hideInThisSectionHeader: true
---

This section provides an overview of Octopus Deploy concepts and links to the relevant documentation, which explore the concepts further and guide you through implementing them with [Octopus Cloud](#octopus-cloud) or your own [self-hosted Octopus Server](#self-hosted-octopus). When you are ready, you can start a free trial and explore.

<span><a class="btn btn-success" href="https://octopus.com/start">Start a Trial</a></span>

## Consistent Releases

Octopus Deploy simplifies complex deployments.

Octopus Deploy sits between your build servers and the deployment targets your software will be deployed to, and gives you control over every step in the deployment process.

After your build server has compiled and packaged your software, Octopus progresses the software through your environments from **Dev** and **QA** all the way through to **Production**, whether your deployment targets are Windows servers, Linux servers, Azure, AWS, Kubernetes, or Google Cloud Platform.

## Octopus Deploy Server

You can install your own [self-hosted](#self-hosted-octopus) instance of the Octopus Deploy Server or use [Octopus Cloud](#octopus-cloud).

### Octopus Cloud

**Octopus Cloud** is the hosted version of Octopus Deploy. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/security/#responsibility) for taking backups, upgrading the service, and maintaining and monitoring the underlying systems.

Learn more about [Octopus Cloud](/docs/octopus-cloud).

### Self-Hosted Octopus

Installing the self-hosted [Octopus Server](/docs/installation/) sets up the [Octopus Web Portal](#the-octopus-web-portal) and the [Octopus REST API](/docs/octopus-rest-api).

The [installation documentation](/docs/installation) provides instructions for downloading, installing, and configuring your Octopus Deploy Server.

### The Octopus Web Portal

Whether you're self-hosting the Octopus Server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments and runbooks.

![Octopus Dashboard](/docs/getting-started/dashboard.png "width=500")

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services you deploy software to) into groups called environments. Typical environments are **Dev**, **Test**, and **Production**.

![The infrastructure tab of Octopus Deploy](/docs/getting-started/images/infrastructure.png "width=500")

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

Learn more about managing your [infrastructure](/docs/infrastructure).

## Packaging Applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository. You can configure you build server to push packages automatically to Octopus's built-in repository or to your existing [package repository](/docs/packaging-applications/package-repositories).

Learn more about [packaging your applications](/docs/packaging-applications).

## Projects

<!-- needs runbooks -->

Projects let you create and manage your deployment processes, releases, and runbooks from the Octopus REST API and Octopus Web Portal.

For each project, you can define a deployment process, runbooks to manage your infrastructure, variables, the environments where the software will be deployed, and releases of your software.

Learn more about [projects](/docs/projects).

## Deploying Applications

Octopus Deploy is designed to work with teams following modern DevOps methodologies, that is, continuously deploying software, getting feedback, making changes, and redeploying.

The deployment process is the steps the Octopus Server orchestrates to deploy your software.

Octopus Deploy provides a range of built-in step templates that can be included in your deployment processes, you can also add steps from the community step template library, and even create your own custom steps. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

Learn more about the [deployment process](/docs/projects/deployment-process/) and see some example [deployments](/docs/deployments).

### Variables

As you deploy your applications between different environments, you'll need to change their configuration files based on the scope of the deployment. Octopus has advance support for managing and scoping variables. For instance, your test environment shouldn't have access to your production database. Using variables, you can specify a different database for each environment, ensuring your production data won't be impacted by codes changes that are still in review.

Learn more about [variables](/docs/projects/variables/) and advanced [configuration features](/docs/projects/steps/configuration-features).

### Lifecycle

When you define a project, you also select a lifecycle. The lifecycle defines the rules around how releases of the project are deployed between environments, which projects are deployed to which environments.

Lifecycles are defined by phases, each phase can have one or more environments, and each environment can be defined as an automatic deployment environment or a manual deployment environment. Each phase can have a set number of environments that must be released to before the next phase is available for deployment.

Learn more about [lifecycles](/docs/releases/lifecycles).

### Releases

A release in Octopus, is a snapshot of the packaged software, variables, and the deployment process.

![Deploy release screen in the Octopus Web Portal](/docs/getting-started/deploy-release.png "width=500")

A release is deployed to the environments defined in the deployment process. Typically, releases are deployed to one environment and then promoted to the next environment when they are successful. Releases can be deployed manually each time or set up to deploy automatically, depending on your needs.

Learn more about [deploying releases](/docs/releases).

## Runbook automation {#octopus-runbooks}

A deployment is only one phase in the life of an application. There are many other tasks that are performed to keep an application operating. A large part of DevOps is running operations separate from deploying applications, and this is where runbooks helps.

Octopus Runbooks automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.

Learn more about [Octopus Runbooks](/docs/runbooks).

## Config as Code

Octopus now provides the option to host multiple branches of your deployment processes in Git. This feature enables you to track changes to your deployment process via commits directly to your Git repository. This provides greater control when testing changes to your projects, allowing you to branch your deployment process and test changes before altering your main branch.

Learn more about [Config as Code](/docs/projects/version-control).

## Tenants

Over time your software may become so successful that you on-sell it to some external customers, and due to the way the software is architected, you need to deploy slightly different versions of the software configured for each customer. For instance, you might deploy version 1.0.1 to Customer A with the software configured to display customer A's logo on their landing page, and version 1.1.0 to Customer B configured to display their logo on their landing page. The tenants feature in Octopus Deploy helps you manage deploying different versions of the same software to multiple customers.

Learn more about [tenants](/docs/tenants).

## Spaces

If you're a large organization with lots of teams working in Octopus, you can use the Spaces feature to provide each of your teams with a space for the projects, environments, and infrastructure they work with, while keeping other team's assets separate in their own spaces.

Learn more about [Octopus Spaces](/docs/administration/spaces).

## Next steps
