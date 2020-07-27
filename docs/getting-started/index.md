---
title: Getting started
description: This section provides a conceptual overview of Octopus Deploy and provides step-by-step instructions to help you master the fundamentals of Octopus Deploy whether you are using the self-hosted Octopus Server or Octopus Cloud.
position: 0
hideInThisSection: true
---

This section provides a conceptual overview of Octopus Deploy and provides step-by-step instructions to help you master the fundamentals of Octopus Deploy whether you are using the self-hosted Octopus Server or Octopus Cloud.

## Consistent releases

As an Octopus user, you define the process for deploying your applications. You specify the environments the applications are deployed to and who on your team can deploy to which environments. For instance, you might want developers to deploy to dev environments but not testing or production, and members of QA to deploy to test environments, but not to production. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent. After releases have been created, they can be deployed as many times as you need.

## Octopus Server

You can install your own self-hosted instance of the **Octopus Server** or use the hosted version **Octopus Cloud**. Small teams can get started with either Octopus Server or Octopus Cloud for [free](https://octopus.com/free).

Learn how to [setup Octopus Deploy](/docs/getting-started/setup-octopus-deploy.md).

## The Octopus Web Portal

!include <octopus-web-portal>

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services you deploy software to) into groups called environments. Typical environments are **dev**, **test**, and **production**.

With Octopus Deploy your deployment targets can be Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or even an offline package drop.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps, environments, or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

You can also use [Octopus Runbooks](#octopus-runbooks) to manage the same infrastructure your software is deployed to.

Learn how to [connect your deployment targets to Octopus](/docs/getting-started/connect-your-deployment-targets-to-octopus.md)

## Packaging applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository. We recommend configuring your existing tool chain to push packages automatically to the built-in repository or an external feed; however, you can push packages manually to the repository if you choose to.

Learn how to [package your software](/docs/getting-started/package-your-software.md).

## Deploying applications

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.

The deployment process that Octopus executes is a series of steps and a set of variables that you define with the Octopus Web Portal or the Octopus REST API. Octopus Deploy provides a range of built-in step templates that can be included in your deployment processes, you can also use steps from the community-contributed step template library, and even create your own custom steps. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

Learn how to [define deployment process](/docs/getting-started/define-your-deployment-process.md).

## Runbook automation {#octopus-runbooks}

A deployment is only one phase in the life of an application. There are typically many other tasks that are performed to keep an application operating. A large part of DevOps is running operations separate from deploying applications, and this is where runbooks helps.

Runbooks are used to automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration.

Learn more about [Octopus Runbooks](/docs/runbooks/index.md).

## Hello World!

We've created a Getting Started: Hello World [YouTube playlist](https://www.youtube.com/playlist?list=PLAGskdGvlaw1hVRHZRxpke1X2pkKwQptA) that covers the basics:

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLAGskdGvlaw370oBEZgWwC3f3egJ3P9Uf" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Getting started guides

The rest of this section includes the following guides that are designed to familiarize you with Octopus Deploy by providing simple step-by-step instructions to achieve and understand the following common scenarios:

### Hello World!

- [Deploy a hello world script](/docs/getting-started/hello-world.md)

### Before you start {#before-you-start}

- [What is a CI/CD pipeline?](/docs/getting-started/the-cicd-pipeline.md)
- [Setup Octopus Deploy](/docs/getting-started/setup-octopus-deploy.md)
- [Get to know the Octopus Web Portal](/docs/getting-started/the-octopus-web-portal.md)

### The Basics {#the-basics}

- [Connect your deployment targets to Octopus](/docs/getting-started/connect-your-deployment-targets-to-octopus.md)
- [Package your software](/docs/getting-started/package-your-software.md)
- [Define your deployment process](/docs/getting-started/define-your-deployment-process.md)
- [Create a release](/docs/getting-started/create-a-release.md)
