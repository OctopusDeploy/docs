---
title: Octopus Terms
description: This section is a glossary of terms used within Octopus.
position: 5
---

## Self-Hosted Octopus

Installing the self-hosted Octopus Deploy server sets up the [Octopus Web Portal](/docs/getting-started/index.md#the-octopus-web-portal) and the [Octopus REST API](/docs/api-and-integration/api/index.md).

The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your Octopus Deploy server.

## Octopus Cloud

[Octopus Cloud](/docs/octopus-cloud/index.md) is the hosted version of Octopus Deploy. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, upgrading the service, and maintaining and monitoring the underlying systems.

## The Octopus Web Portal

Whether you're self-hosting the Octopus server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.

## Deployment Targets

[Deployment Targets](/docs/infrastructure/deployment-targets/index.md)  represent the servers, machines and cloud services where your software and services will be deployed.

## Environments

Octopus organizes your deployment targets into groups called [Environments](/docs/infrastructure/environments/index.md) so you can promote your software through your deployment pipeline, for instance, from Development to Test and finally into Production.

## Target Roles

[Target roles](/docs/infrastructure/deployment-targets/target-roles/index.md) allow you to “tag” deployment targets with a specific keyword which can be used in your deployments.

## Lifecycle

[Lifecycles](/docs/deployment-process/lifecycles) give you control over the way releases are promoted between environments.

## Package

A [Package](/docs/packaging-applications/index.md) is an archive (zip, tar, NuGet) that contains all the files needed to run your software. You can host Packages in external repositories or the built-in Octopus repository. The package will need to be named correctly with a packageID, version number and format, for Octopus to recognize it. For example MyPackage.1.0.1.zip

## Projects

[Projects](/docs/deployment-process/projects/index.md) let you manage multiple software projects from the Octopus Web Portal. For each project you have, you define a deployment process, configuration variables, and the environments the software will be deployed to.

## Deployment Process

The [deployment process](/docs/deployment-process) is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed.

## Variables

Octopus lets you define [variables](/docs/deployment-process/variables) for configuration values that change, so you can have a different value for each Environment or Deployment Target

## Creating a Release

A [Release](/docs/deployment-process/releases/index.md) is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from Projects and deployed via a Lifecycle to your Environments.

## Deploying a Release

When you [deploy a release](/docs/deployment-process/releases/index.md), you are executing the deployment process with all the associated details, as they existed when the release was created. You can Deploy a Release as many times as you want to.

## Spaces

With [Spaces](/docs/administration/spaces/index.md) you can partition your Octopus Deploy server so that each of your teams can only access the projects, environments, and infrastructure they work with from the spaces they are members of.
Users can be members of multiple teams and have access to multiple spaces, but the entities and infrastructure they work with will only be available in the space it is assigned to.
If you're a large organization with lots of teams working in Octopus, from **2019.1** you can use the [Spaces](/docs/administration/spaces/index.md) feature.

