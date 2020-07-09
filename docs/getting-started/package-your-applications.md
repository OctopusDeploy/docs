---
title: Package your applications
description: Learn how to package your applications for deployment with Octopus Deploy.
position: 60
---

Deploying software with Octopus Deploy often involves packaging your software into a supported package format and making it available from a package feed.

The following is a sample package that could be deployed with Octopus Deploy:

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Packages must have the following attributes:

- Package ID. i.e., `hello-world`.
- Version number, i.e., `1.0.0`. 
- Package format, i.e., `.zip`.

:::success
To learn more about supported formats, versioning, and packaging applications, refer to the [packaging documentation](/docs/packaging-applications/index.md).
:::

## Package repository

After your software has been packaged it must be available to Octopus in a package repository. 

You can manually upload your package to the Octopus built-in repository in the Octopus Web Portal

1. Navigating to the **Library** tab.
1. Click **UPLOAD PACKAGE**.
1. Select the package you want to upload and click **UPLOAD**.

The package is now available in the built-in repository and is ready to be deployed. We recommend your configure your build server to automatically package your software and make it available in a package repository for Octopus to consume.

:::success
To learn more about packaging applications, build server integrations, and package repositories, refer to the [packaging applications documentation](/docs/packaging-applications/index.md).
:::

Next, learn how to [define your deployment process](/docs/getting-started/define-your-deployment-process.md).
