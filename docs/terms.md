---
title: Octopus Terms
description: This section is a glossary of terms used within Octopus.
position: 0
---

### [Self-Hosted Octopus](/docs/installation/index.md)

Installing the self-hosted Octopus Deploy server sets up the [Octopus Web Portal](/docs/getting-started.md#the-octopus-web-portal) and the [Octopus REST API](/docs/api-and-integration/api/index.md).

The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your Octopus Deploy server.

### [Octopus Cloud](/docs/octopus-cloud/index.md)

Octopus Cloud is the hosted version of Octopus Deploy. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, upgrading the service, and maintaining and monitoring the underlying systems.

### Octopus Deploy Server

You can install your own [self-hosted](/docs/getting-started.md#self-hosted-octopus) instance of the Octopus Deploy Server or use [Octopus Cloud](/docs/getting-started.md#octopus-cloud).

### The Octopus Web Portal

Whether you're self-hosting the Octopus server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.

### Deployment Targets

Targets are where you will be deploying your application to -  physical servers or cloud services.

### Environments

An Environment is a group of deployment targets. Your Development environment might be one server that hosts a web application, a service, and a database server.

### Target Roles

Target roles allow you to “tag” deployment targets with a specific keyword which can be used in your deployments.

### Lifecycle

A Lifecycle defines which environments that you can deploy a release to and in what order. Environments are automatically added to the default lifecycle in the order they appear on the Environments page.

### Package

A Package is an archive (zip, tar, NuGet) that contains all the files needed to run your software. You can host Packages in external repositories or the built-in Octopus repository. The package will need to be named correctly with a packageID, version number and format, for Octopus to recognise it. For example MyPackage.1.0.1.zip

### Projects

Projects define your deployment process, configuration variables, and the deployment lifecycle. Think of it as a blueprint for releasing your Packages to Deployment Targets.

### Deployment Process

The deployment process is made up of steps containing a specific action (or set of actions) and variables that are executed each time your software is deployed. After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process.

### Variables

Octopus lets you define variables with values that change based on the scope you've assigned to the variables and the scope of your deployments.

### Creating a Release

A Release is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from Projects and deployed to the Environments defined in the Projects Lifecycle.

### [Deploying a Release](/docs/deployment-process/releases/index.md)

When you Deploy a release, you are executing the deployment process with all the associated details, as they existed when the release was created. You can Deploy a Release as many times as you want to.

### [Spaces](/docs/administration/spaces/index.md)

With Spaces you can partition your Octopus Deploy server so that each of your teams can only access the projects, environments, and infrastructure they work with from the spaces they are members of.
Users can be members of multiple teams and have access to multiple spaces, but the entities and infrastructure they work with will only be available in the space it is assigned to.
If you're a large organization with lots of teams working in Octopus, from **2019.1** you can use the [Spaces](/docs/administration/spaces/index.md) feature.
