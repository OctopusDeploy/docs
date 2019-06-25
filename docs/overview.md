---
title: Overview
description: This section provides a conceptual overview of Octopus Deploy.
position: 0
---

Welcome!

This section provides a conceptual overview of Octopus Deploy.

As an Octopus user, you define the process for deploying your software. You specify the environments the software is deployed to and who on your team can deploy to which environments. For instance, you might want developers to deploy to the Dev environment, but not Test or Production, you might want the QA team to deploy to the Test environment, but not Dev or Production. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent and predictable.

When a release of your software is created in Octopus, you can deploy it as many times as needed.

## The Octopus Deploy Server

You can install your own [self-hosted](#self-hosted-octopus) instance of the Octopus Deploy Server or use [Octopus Cloud](#octopus-cloud).

## Self-Hosted Octopus {#self-hosted-octopus}

Installing the self-hosted [Octopus Deploy server](/docs/installation/index.md) configures the [Octopus Web Portal](/docs/getting-started/index.md#the-octopus-web-portal) and the [Octopus REST API](/docs/octopus-rest-api/index.md). The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your Octopus Deploy server.

### Octopus Cloud {#octopus-cloud}

Octopus Cloud is the hosted version of Octopus Deploy. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, upgrading the service, and maintaining and monitoring the underlying systems.

Learn more about [Octopus Cloud](/docs/octopus-cloud/index.md).

### The Octopus Web Portal

Whether you're self-hosting the Octopus Server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services you deploy software to) into groups called environments. Typical environments are **Development**, **Test**, and **Production**.

With Octopus Deploy your deployment targets could be Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or even an Offline Package Drop.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

Learn more about managing your [infrastructure](/docs/infrastructure/index.md).

## Packaging Applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository, but you can also host your packages in external repositories. We recommend configuring your existing tool chain to push packages automatically to the repository. Octopus supports a variety of package formats.

Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing tool chain to push packages to your Octopus Deploy server with our [Build Server Integrations](/docs/octopus-rest-api/index.md).

## The Deployment Process

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.

Before you can deploy your software, you need to create a project which will include your deployment process and all the information needed for your teams to successfully redeploy every time. The deployment process is a series of steps, each step contains a specific action (or set of actions) that is executed as part of the deployment process every time your software is deployed. Octopus Deploy includes a range of built in steps you can use in your deployment processes.

As part of the deployment process, you can define variables that change based on the scope of your deployments, this means, for instance, you can use different connection strings when you deploy to different environments.

After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

Learn more about the [deployment process](/docs/deployment-process/index.md), how you can set up [projects](/docs/deployment-process/projects/index.md), use [variables](/docs/deployment-process/variables/index.md) and [deploy releases](/docs/deployment-process/releases/index.md).

## Deploy your Software

Once you have access to an Octopus Server, your infrastructure is configured, your applications packaged, and the deployment process defined, you're ready to start deploying your software. To deploy your software, you first create a release.

A release is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from projects and deployed to your environments.

When you deploy a release, you are executing the deployment process with all the associated details, as they existed when the release was created. You can deploy a release as many times as you want to.

Learn more about how [deploying releases](/docs/deployment-process/releases/index.md), or see some [deployment examples](/docs/deployment-examples/index.md).

## Next

 - [Getting Started with Octopus Deploy](/docs/getting-started/index.md)
 - [Installing the self-hosted Octopus Deploy Server](/docs/installation/index.md)
 - [Octopus Cloud](/docs/octopus-cloud/index.md)
 - [Manage your Infrastructure](/docs/infrastructure/index.md)
 - [Packaging Applications](/docs/packaging-applications/index.md)
 - [Deployment Process](/docs/deployment-process/index.md)
