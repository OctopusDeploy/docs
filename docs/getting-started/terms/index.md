---
title: Terms
description: Terms and definitions that will help when working with Octopus Deploy.
hideInThisSectionHeader: true
---

## Environments

Octopus organizes your deployment targets into groups called [Environments](/docs/infrastructure/environments/index.md) so you can promote your software through your deployment pipeline. For instance, from Development to Test and finally into Production.

## Target Roles

[Target roles](/docs/infrastructure/deployment-targets/target-roles/index.md) allow you to “tag” deployment targets with a specific keyword which can be used in your deployments.

## Lifecycle

[Lifecycles](/docs/deployment-process/lifecycles/index.md) give you control over the way releases are promoted between environments.

## Package

A [Package](/docs/packaging-applications/index.md) is an archive (zip, tar, NuGet) that contains all the files needed to run your software. You can host Packages in external repositories or the built-in Octopus repository. The package will need to be named correctly with a [package ID](/docs/packaging-applications/index.md#package-id), [version number](/docs/packaging-applications/index.md#version-numbers) and as a [supported format](/docs/packaging-applications/index.md#supported-formats), for Octopus to recognize it. For example MyPackage.1.0.1.zip

## Projects

[Projects](/docs/deployment-process/projects/index.md) let you manage multiple software projects from the Octopus Web Portal. For each project you have, you define a deployment process, configuration variables, and the environments the software will be deployed to.

## Deployment Process

The [deployment process](/docs/deployment-process/index.md) is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed.

## Variables

Octopus lets you define [variables](/docs/deployment-process/variables/index.md) for configuration values that change, so you can have a different value for each Environment or Deployment Target

## Creating a Release

A [Release](/docs/deployment-process/releases/index.md) is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from Projects and deployed via a Lifecycle to your Environments.

## Deploying a Release

When you [deploy a release](/docs/deployment-process/releases/index.md), you are executing the deployment process with all the associated details, as they existed when the release was created. You can deploy a release as many times as you want to.

## Spaces

With [Spaces](/docs/administration/spaces/index.md) you can give each team their own set of projects, environments, and infrastructure that is separate from the other teams.
Users can be members of multiple teams and have access to multiple spaces, but the entities and infrastructure they work with will only be available in the space it is assigned to.
If you're a large organization with lots of teams working in Octopus, from **2019.1** you can use the [Spaces](/docs/administration/spaces/index.md) feature.
