---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-01-7
title: Deploy a sample package
description: Step by step guide on how to deploy a sample package Octopus Deploy
navOrder: 80
hideInThisSection: true
---

Deploying software with Octopus often involves deploying packages, for example, `.zip`, `.nupkg`, `.jar`, `.tar`, etc. In this section, we'll walk you through the steps to deploy a sample hello world package to your deployment target.

:::div{.hint}
To learn about supported formats, versioning, and packaging applications, refer to the [packaging documentation](/docs/packaging-applications).
:::

## Before your start

Please download our sample package:

- [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

## Upload package

1. From the left Deploy menu, click **Packages**.

:::figure
![Packages page](/docs/img/getting-started/first-deployment/images/packages-page.png)
:::

2. Click **Upload Package**.
3. Select the package you want to upload.


## Add deploy package step

Add a step to the deployment process to push that package to your deployment target.

1. From the left Deploy menu, click **Projects**.
2. Select the **Hello world deployment** project.
3. Click **Process** in the left menu.
4. Click **Add Step**.
5. Select the **Package** category to filter the types of steps.
6. Locate the Deploy a Package card and click **Add Step**.

:::figure
![Add Deploy a Package step to deployment process](/docs/img/getting-started/first-deployment/images/deploy-package-step.png)
:::

### Step name

You can leave this as the default *Deploy a Package*.

### Target tags

7. Select **tutorial-target** from the **Target Tags** dropdown list.

:::div{.hint}
**Context for target tags**

When configuring your deployment process, you can click a target tag to see the deployment targets and environments the step will run on.

:::figure
![Target tags popover that shows correlating deployment targets](/docs/img/getting-started/first-deployment/images/target-tags-popover.png)
:::

### Package

8. Select **hello-world** from the **Package ID** dropdown list.

You can skip the other sections of this page for this tutorial.

**Save** your deployment process and you can move on to create and deploy a release.

:::figure
![Deploy a package step with target tag and package selected](/docs/img/getting-started/first-deployment/images/deploy-package-step-form.png)
:::

## Release and deploy

1. Create a new release and deploy it to the Development environment.

The release will deploy the *hello world* package to the *Hello world tutorial target*.

:::figure
![Task log of deploying a package to the Hello world tutorial target](/docs/img/getting-started/first-deployment/images/deploy-package-task-log.png)
:::

You completed the first deployment tutorial, well done! 🎉  

In this series you built a multi-step deployment process, used scoped variables, and deployed a sample package to a deployment target. It's now time to add your applications to Octopus Deploy.

### All guides in this tutorial series

1. [First deployment](/docs/getting-started/first-deployment)
2. [Define and use variables](/docs/getting-started/first-deployment/define-and-use-variables)
3. [Approvals with manual interventions](/docs/getting-started/first-deployment/approvals-with-manual-interventions)
4. [Add deployment targets](/docs/getting-started/first-deployment/add-deployment-targets)
5. Deploy a sample package (this page)

### Further reading for deploying packages and integrating your CI/CD pipeline

- [Packaging Applications](/docs/packaging-applications)
- [Deployment Processes](/docs/projects/deployment-process)
- [Deployments](/docs/deployments)
- [Patterns and Practices](/docs/deployments/patterns)
