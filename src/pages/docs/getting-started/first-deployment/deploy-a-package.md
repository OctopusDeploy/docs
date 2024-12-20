---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-19
title: Deploy a sample package
description: Step by step guide on how to deploy a sample package Octopus Deploy
navOrder: 80
hideInThisSection: true
---

Octopus Deploy's primary purpose is to push software packages, .zip, .jar, .war, .tar, .nupkg, etc., to your deployment targets.  Octopus Deploy requires all your assets, binaries, configuration files, CSS files, and more to run your application to be packaged up.  Typically this is done by your build server.

Packages must have the following attributes:

- Package ID. i.e., `hello-world`.
- Version number, i.e., `1.0.0`. 
- Package format, i.e., `.zip`.

:::div{.success}
To learn more about supported formats, versioning, and packaging applications, refer to the [packaging documentation](/docs/packaging-applications).
:::

The following is a sample package that could be deployed with Octopus Deploy:

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

You can manually upload that package to the Octopus built-in repository in the Octopus Web Portal.

1. Navigating to the **Library** tab.
1. Click **UPLOAD PACKAGE**.
1. Select the package you want to upload and click **UPLOAD**.

Add a step to the hello world deployment process to push that package to the desired deployment target.

1. Click the **Projects** link in the top menu.
1. Select the **Hello World** project.
1. Click the **Process** link in the left menu.
1. Click the **ADD STEP** button.
1. Select the **Package** tile.
1. Click **ADD** on the **Deploy a Package** tile.
1. Leave the **Step Name** and the **Enabled** check-box as is.
1. Select *hello-world* as the tag in **Target Tags**.
1. Select *hello-world* as the **Package ID**.
1. Click the **SAVE** button.

:::figure
![Deploy a package step with target tag and package selected](/docs/getting-started/first-deployment/images/img-deploypackage.png)
:::

Please create a new release and deploy it to *Development*.  The release will deploy the *hello world* package to *dev-server-01*.

:::figure
![Deploy a package results](/docs/getting-started/first-deployment/images/img-releasehwpackage.png)
:::

You have now completed the deployment tutorial!  This tutorial has focused on running sample scripts and deploying sample packages to your servers.  It is now time to add your applications to Octopus Deploy.  

### All guides in this tutorial series

1. [First deployment](/docs/getting-started/first-deployment)
2. [Define and use variables](/docs/getting-started/first-deployment/define-and-use-variables)
3. [Approvals with manual interventions](/docs/getting-started/first-deployment/approvals-with-manual-interventions)
4. [Add deployment targets](/docs/getting-started/first-deployment/add-deployment-targets)
5. Deploy a sample package (this page)

### Further reading for deploying packages and integrating your CI/CD pipeline

- [Deployment Process Documentation](/docs/projects/deployment-process)
- [Deployment Documentation](/docs/deployments)
- [Patterns and Practices](/docs/deployments/patterns)
- [Customizable End to End CI/CD Tutorials](https://octopus.com/docs/guides)
