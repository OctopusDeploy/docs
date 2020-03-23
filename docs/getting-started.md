---
title: Getting started
description: This section provides a conceptual overview of Octopus Deploy, and links to documentation that guides you through your own self-hosted or cloud-hosted Octopus Server.
position: 0
---

This section provides an overview of Octopus Deploy concepts and links to the relevant documentation, which explore the concepts further and guides you through implementing them with your own [self-hosted Octopus Server](/docs/getting-started.md#self-hosted-octopus) or the hosted version [Octopus Cloud](/docs/getting-started.md#octopus-cloud).

## Consistent releases

As an Octopus user, you define the process for deploying your software. You specify the environments the applications are deployed to and who on your team can deploy to which environments. For instance, you might want developers to deploy to dev environments but not testing or production, and members of QA to deploy to test environments, but not to production. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent. After releases have been created, they can be deployed as many times as you need.

## Octopus Server

You can install your own [self-hosted](/docs/getting-started.md#self-hosted-octopus) instance of the Octopus Server or use [Octopus Cloud](/docs/getting-started.md#octopus-cloud). Small teams can get started with either Octopus Server or Octopus Cloud for [free](https://octopus.com/free).

## Self-hosted Octopus

Installing the self-hosted [Octopus Server](/docs/installation/index.md) gives you access to the [Octopus REST API](/docs/octopus-rest-api/index.md) and [Octopus Web Portal](/docs/getting-started.md#the-octopus-web-portal), both of which let you manage you deployment process, releases, and operations processes.

The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your self-hosted Octopus Server.

## Octopus Cloud

!include <octopus-cloud>

## The Octopus Web Portal

!include <octopus-web-portal>

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services you deploy software to) into groups called environments. Typical environments are **development**, **test**, and **production**.

With Octopus Deploy your deployment targets can be Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or an offline package drop.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps, environments, or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

You can also use [Octopus Runbooks](#octopus-runbooks) to manage the same infrastructure you're deploying your software to.

Learn more about managing your [infrastructure](/docs/infrastructure/index.md).

## Packaging applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository. We recommend configuring your existing tool chain to push packages automatically to the built-in repository or an external feed; however, you can push packages manually to the repository if you choose to.

Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing tool chain to push packages to your Octopus Server with our [REST API](/docs/octopus-rest-api/index.md).

## Deploying applications

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.

The deployment process that Octopus executes is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Octopus Deploy provides a range of built-in step templates that can be included in your deployment processes, you can also use steps from the community-contributed step template library, and even create your own custom steps. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

Learn more about the [deployment process](/docs/deployment-process/index.md), how you can set up [projects](/docs/projects/index.md), use [variables](/docs/projects/variables/index.md), and [lifecycles](/docs/deployment-process/lifecycles/index.md) in your deployments, how you can [deploy releases](/docs/managing-releases/index.md) or see some [deployment examples](/docs/deployment-examples/index.md).

## Octopus Runbooks {#octopus-runbooks}

A deployment is only one phase in the life of an application. There are typically many other tasks that are performed to keep an application operating. A large part of DevOps is running operations separate from deploying applications, and this is where runbooks helps.

Runbooks are used to automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.

Learn more about [Octopus Runbooks](/docs/operations-runbooks/index.md).

## Spaces

If you're a large organization with lots of teams working in Octopus, from **2019.1** you can use the [Spaces](/docs/administration/spaces/index.md) feature to provide each of your teams with a space for the projects, environments, and infrastructure they work with, while keeping other team's assets separate in their own spaces.

Learn more about [spaces](/docs/administration/spaces/index.md).

## The delivery pipeline

We designed Octopus Deploy for teams that follow agile delivery practices. A typical workflow could be:

1. **Commit code to your existing source control system.**

   You might be using Git, Team Foundation Server, Subversion, or Mercurial. The choice is yours.

1. **Your CI/build server compiles the code and runs unit tests.**

   You might be using TeamCity, Jenkins, Bamboo, Azure DevOps, Team Foundation Server (TFS), or CruiseControl.NET. Again, the choice is yours.

1. **Package your application.**

   When the build is ready, your CI/build server takes all the files your software needs to run and bundles them up ready for deployment.

1. **Octopus Deploy deploys your software to your infrastructure.**

   Octopus deploys your software to the infrastructure you've configured, whether this is on-premises servers or cloud services. Because you likely want to deploy your software into a testing environment before deploying into production, Octopus promotes releases of your software through your environments, for instance, to dev, testing, staging, and production, and because each environment has slightly different configurations, Octopus manages those for you too.
