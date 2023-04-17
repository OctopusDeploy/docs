---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Custom installation directory
description: The Custom Installation Directory feature deploys your package to a specific location on the server.
navOrder: 10
---

The custom installation directory feature is one of the [configuration features](/docs/projects/steps/configuration-features/) you can enable as you define the [steps](/docs/projects/steps/) in your [deployment process](/docs/projects/deployment-process).

You can specify a custom installation directory for [package](/docs/deployments/packages/) and [IIS](/docs/deployments/windows/iis-websites-and-application-pools) steps. The custom installation directory feature deploys your package to a specified location on the target server. This feature helps when you are using an application that requires your files be in specific locations, such as many Content Management Systems (CMS).

Only use the *custom installation directory* feature when you really need it.

The standard convention for deploying packages is often the best and simplest way to deploy your packages, and it eliminates problems caused by file locks and stale files being left in the deployment folder. It also provides smoother deployments and less downtime for Windows Services and Web Applications, so before you configure a custom installation directory, review the [package deployment convention](/docs/deployments/packages/) and [package deployment feature ordering](/docs/deployments/packages/package-deployment-feature-ordering) to be certain that you really need to configure a custom installation directory.

## Add a custom installation directory

1. From your *Package Deploy* or *IIS* [step](/docs/projects/steps), click the **Configure Features** link.
2. Check the **Custom Installation Directory** check-box and click **Ok**.

![Custom Installation Directory option](/docs/projects/steps/configuration-features/images/custom-installation-directory.png "width=500")

When you return to your deployment process, you will see the **Custom Install Directory** option has been added to the **Features** section of the deployment process.

3. Add the [step](/docs/projects/steps) details:
  - Enter a name for the step.
  - Select the targets where the step should run.
  - Select the [package feed](/docs/packaging-applications/package-repositories/) where the [package](/docs/packaging-applications) will be available.
  - Enter the [package ID](/docs/packaging-applications/#package-id) for the package to be deployed.
4. Enter the path for the **custom installation directory**, or you can insert a [variable](/docs/projects/variables) if you have defined the path as a variable.

Defining a [variable](/docs/projects/variables) with the directory path, means you can scope different values to different environments. For instance:

 | Variable Name    | Value     | Scope    |
 | ----------------------- | --------------- | -------- |
 | CustomInstallDirectory | \path\to\test\directory\ | Test |
 | CustomInstallDirectory | \path\to\production\directory\ | Production |

 Read more about [variables](/docs/projects/variables).

5. If you would like to remove existing files from the custom installation directory before your deployed files are copied to it, check the **Purge** check-box.
6. If there are files you would like to exclude from the purge, add the files and directories you want to keep to the **Exclude from purge** list.

The **Exclude from purge** list must be a newline-separated list of file or directory names, relative to the installation directory. To exclude an entire directory specify it by name without a wildcard. Extended wildcard syntax is supported. For instance:

> appsettings.config
>
> Config
>
> Config\\*.config
>
> **\\*.config

7. Add any [conditions](/docs/projects/steps/conditions) you need to specify for the step, and then click **SAVE**.

This will save and display the step you've just created. From here you can use the project overview menu to continue defining your [deployment process](/docs/projects/deployment-process/), or click **CREATE RELEASE** to create a [release](/docs/releases) and deploy your application.

Packages deployed to a custom installation directory are deployed in the same way as other package deploy steps. Read about [how packages are deployed](/docs/deployments/packages/#how-packages-are-deployed) for more information.
