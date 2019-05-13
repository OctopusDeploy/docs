---
title: Getting Started
description: This section provides a conceptual overview of Octopus Deploy, and links to documentation that guides you through your own self-hosted or cloud-hosted Octopus server.
position: 0
---

Welcome!

This section provides an overview of Octopus Deploy concepts and links to the relevant documentation, which explore the concepts further and guides you through implementing them with your own [self-hosted](/docs/getting-started.md#self-hosted-octopus) or [cloud-hosted](/docs/getting-started.md#octopus-cloud) Octopus server.

**The videos can be phase two and the content below phase one. Need to workout how the videos are going to play inline.
![](/docs/TBC-gettingstartedvideos.png)

### 1. How Octopus Works

Octopus works by creating a Release and deploying it following the steps defined in a Projects Deployment Process. A project will have its own lifecycle which will control how the release moves through the environments which contain the locations you’re deploying to. Below outlines the main steps for doing your first deployment and some of the terms you will need to know.

### 2. Hosting the Octopus Deploy Server

You can install your own [self-hosted](/docs/getting-started.md#self-hosted-octopus) instance of the Octopus Deploy Server or use [Octopus Cloud](/docs/getting-started.md#octopus-cloud).

#### Self-Hosted Octopus

Installing the self-hosted [Octopus Deploy server](/docs/installation/index.md) sets up the [Octopus Web Portal](/docs/getting-started.md#the-octopus-web-portal) and the [Octopus REST API](/docs/api-and-integration/api/index.md). The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your Octopus Deploy server.

#### Octopus Cloud

Octopus Cloud is the hosted version of Octopus Deploy. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, upgrading the service, and maintaining and monitoring the underlying systems.

Learn more about [Octopus Cloud](/docs/octopus-cloud/index.md).

#### The Octopus Web Portal

Whether you're self-hosting the Octopus server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.

### 3. Setting up the locations to deploy to

With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, an Offline Package Drop, Cloud Regions, or Kubernetes. These are known as your deployment targets, and they are organized into environments so you can promote your software through your deployment pipeline, for instance, from Development to Testing and finally into Production.

#### Deployment Targets

Targets are where you will be deploying your application to -  physical servers or cloud services.

#### Environments

An Environment is a group of deployment targets. Your Development environment might be one server that hosts a web application, a service, and a database server.

#### Target Roles

Target roles allow you to “tag” deployment targets with a specific keyword which can be used in your deployments.

#### Tentacle Agent

When you deploy software to Windows servers, you need to install Tentacle Agent, a lightweight agent service, on your Windows servers so they can communicate with the Octopus server in either a listening or a polling mode.

#### Lifecycle

A Lifecycle defines which environments that you can deploy a release to and in what order. Environments are automatically added to the default lifecycle in the order they appear on the Environments page.

Learn more about managing your [Infrastructure](/docs/infrastructure)

### 4. Package and upload your software

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository. We recommend configuring your existing tool chain to push packages automatically to the built-in repository; however, you can push packages manually to the repository if you choose to.

#### Package

A Package is an archive (zip, tar, NuGet) that contains all the files needed to run your software. You can host Packages in external repositories or the built-in Octopus repository.

#### Naming a Package

The package will need to be named correctly with a packageID, version number and format, for Octopus to recognise it. For example MyPackage.1.0.1.zip

#### Creating a Package

There are many more tools you might choose to use to create your package, but as long as you can create one of our [supported packages](/docs/packaging-applications#supported-formats) you can deploy your applications with Octopus Deploy.

We've created the following tools to help package your applications for deployment with Octopus:

 - [Octo.exe](/docs/packaging-applications/octo.exe.md) to create Zip Archives and NuGet packages for **.NET Core** apps and full **.NET framework** applications.
 - [Octopack](/docs/packaging-applications/octopack/index.md) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
 - A [TeamCity plugin](/docs/api-and-integration/teamcity.md).
 - An [Azure DevOps plugin](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md).

#### Getting your package into Octopus

Most Octopus users push their package from their build server to Octopus. But you can manually upload the package or host it in an external repository.

Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing tool chain to push packages to your Octopus Deploy server with our [API and Integrations](/docs/api-and-integration/index.md).

### 5. Define your deployment process

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.
Before you can deploy, a Project will need to be created with a Deployment Process which will contain all the information needed to have your teams successfully redeploy every time.

#### Projects

Projects define your deployment process, configuration variables, and the deployment lifecycle. Think of it as a blueprint for releasing your Packages to Deployment Targets.

#### Deployment Process

The deployment process is made up of steps containing a specific action (or set of actions) and variables that are executed each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

#### Variables

Octopus lets you define variables with values that change based on the scope you've assigned to the variables and the scope of your deployments.

Learn more about the [deployment process](/docs/deployment-process/index.md), how you can set up [projects](/docs/deployment-process/projects/index.md), use [variables](/docs/deployment-process/variables/index.md) and [lifecycles](/docs/deployment-process/lifecycles/index.md) in your deployments, .

### 6. Deploy your release

Once you have access to an Octopus Server, your infrastructure is configured, your applications packaged, and the deployment process defined, you're ready to start deploying your software.

#### Creating a Release

A Release is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from Projects and deployed to the Environments defined in the Projects Lifecycle.

#### Deploying a Release

When you Deploy a release, you are executing the deployment process with all the associated details, as they existed when the release was created. You can Deploy a Release as many times as you want to.

Learn more about how you can [deploy releases](/docs/deployment-process/releases/index.md), or see some [deployment examples](/docs/deployment-examples/index.md).

### In this section

- [Delivery Pipeline](/docs/delivery-pipeline.md)
- [Terms](/docs/terms.md)
