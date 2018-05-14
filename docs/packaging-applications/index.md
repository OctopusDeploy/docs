---
title: Packaging Applications
description: Packaging applications for deployment with Octopus Deploy.
position: 3
---

Deploying software with Octopus Deploy involves defining your deployment process with predictable and repeatable steps. That process starts with packaging the software you are deploying.

Before you can deploy your software you need to:

1. Decide which [format](/docs/packaging-applications/supported-packages.md) to use to package your software.
1. Give your package a [package ID](/docs/packaging-applications/package-id.md).
1. Choose and apply a [versioning](/docs/packaging-applications/versioning.md) scheme for your software.
1. [Create the package](/docs/packaging-applications/creating-packages/index.md) with all the files your software needs to run.
1. Host the package in a [package repository](/docs/packaging-applications/package-repositories/index.md).

The combination of a **package format**, **package ID**, and **version number** makes deploying your software across different environments repeatable, reliable, and predictable. This means that once the deployment process has been defined, your software can be deployed again and again. Octopus makes it easy to track which software has been deployed to which environments and isolate specific changes within the software.

## Example Package

One of the simplest examples of a package that is deployable by Octopus looks like this:

> hello-world.1.0.0.zip

In this example we've used **zip** as the format, **hello-world** as the package ID, and **1.0.0** represents the version number for this version of the package. Read on to learn more about these concepts and how to implement them with Octopus.
