---
title: Overview
description: This section provides a conceptual overview of Octopus Deploy.
position: 0
---

Welcome!

This section provides a conceptual overview of Octopus Deploy.

As an Octopus user, you define the process for deploying your software. You specify the environments where you will deploy your software, and you specify which teams can deploy to those environments. For instance, you might want developers to deploy to the Development environment, but not the Test or Production environments, you might want the QA team to deploy to the Test environment, but not the Development or Production environments. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent and predictable.

When a release of your software is created in Octopus, you can deploy it as many times as needed.

## The Octopus Deploy Server

The Octopus Deploy server includes the [Octopus Web Portal](/docs/getting-started/index.md#the-octopus-web-portal) and the [Octopus REST API](/docs/octopus-rest-api/index.md). You can install your own [self-hosted](/docs/installation/index.md) instance of the Octopus Deploy Server or use [Octopus Cloud](/docs/octopus-cloud/index.md).

## The Octopus Web Portal

Whether you're self-hosting the Octopus Server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services that host your deployed software) into groups called environments. Typical environments are **Development**, **Test**, and **Production**, but you can configure as many as you need.

With Octopus Deploy your deployment targets could be Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or even an Offline Package Drop.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

Learn more about managing your [infrastructure](/docs/infrastructure/index.md).

## Packaging Applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository, but you can also host your packages in external repositories. We recommend configuring your existing tool chain to push packages automatically to the repository. Octopus supports a variety of package formats.

Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing toolchain to push packages to your Octopus Deploy server with our [Build Server Integrations](/docs/octopus-rest-api/index.md).

## The Deployment Process

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.

Before you can deploy your software, you need to create a project which will include your deployment process and all the information needed for your teams to successfully deploy your software every time. The deployment process is a series of steps, each step contains specific actions that are executed as part of the deployment process every time your software is deployed. Octopus Deploy includes a range of built-in steps you can use in your deployment processes.

As part of the deployment process, you can define variables that change based on the scope of your deployments. This means, for instance, you can use different connection strings when you deploy to different environments.

After the initial setup, you can deploy your software as often as makes sense for you and your customers. You can even update the deployment process over time as the needs of the project change.

Learn more about the [deployment process](/docs/deployment-process/index.md), how you can set up [projects](/docs/deployment-process/projects/index.md), use [variables](/docs/deployment-process/variables/index.md) and [deploy releases](/docs/deployment-process/releases/index.md).

## The Delivery Pipeline

A typical workflow using Octopus Deploy could something like the following:

1. **Commit Code to Your Existing Source Control System.**

   You might be using Git, Team Foundation Server, Subversion, or Mercurial. The choice is yours.

1. **Your CI/Build Server Compiles the Code and Runs Unit Tests.**

   You might be using TeamCity, Jenkins, Bamboo, Azure DevOps, Team Foundation Server (TFS), or CruiseControl.NET, or your preferred CI server.

1. **Package Your Application.**

   When the build is ready, your CI/build server takes all the files your software needs to run and bundles them up ready for deployment.

1. **Octopus Deploy Deploys Your Software to Your Infrastructure.**

   Octopus deploys your software to the infrastructure you've configured, whether that's on-premises servers or cloud services. Octopus promotes releases of your software through your environments from **Development**, to **Test**, and finally into **Production**, and because each environment has slightly different configurations, Octopus manages those for you too.

## Next

 - [Installing the self-hosted Octopus Deploy Server](/docs/installation/index.md)
 - [Octopus Cloud](/docs/octopus-cloud/index.md)
 - [Manage your Infrastructure](/docs/infrastructure/index.md)
 - [Packaging Applications](/docs/packaging-applications/index.md)
 - [Deployment Process](/docs/deployment-process/index.md)
