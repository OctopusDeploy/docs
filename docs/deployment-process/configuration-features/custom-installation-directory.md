---
title: Custom Installation Directory
description: The Custom Installation Directory feature deploys your package to a specific location on the server.
position: 10
---
You can specify a custom installation directory for [package](/docs/deployment-examples/deploying-packages/index.md) and [IIS](/docs/deployment-examples/iis-websites-and-application-pools.md) steps. The custom installation directory feature deploys your package to a specific location on the target server. This feature helps when you are using a Content Management System (CMS) or another coordinating application that requires your files to be in specific locations.

Only use the *custom installation directory* feature when you really need it.

The standard convention for deploying packages eliminates problems caused by file locks and stale files being left in the deployment folder. It also provides smoother deployments and less downtime for Windows Services and Web Applications, so before you configure a custom installation directory, review the [package deployment convention](/docs/deployment-examples/deploying-packages/index.md) and [package deployment feature ordering](/docs/deployment-examples/deploying-packages/package-deployment-feature-ordering.md) to be certain that you need to configure a custom installation directory.

## Add a Custom Installation Directory

1. From your *Package Deploy* or *IIS* [step](/docs/deployment-process/steps/index.md), click the **Configure Features** link.
2. Check the **Custom Installation Directory** checkbox and click **Ok**.

When you return to your deployment process, you will see the **Custom Install Directory** option had been added to the **Features** section.

3. Expand the **Custom Install Directory**.
4. You can enter the directory as the path to the directory, or you can insert a [variable](/docs/deployment-process/variables/index.md) if you have defined the path as a variable.

Defining a variable with the directory path, means you can scope different values to different environments. For instance:

 | Variable Name    | Value     | Scope    |
 | ----------------------- | --------------- | -------- |
 | CustomInstallDirectory | \path\to\test\directory\ | Test |
 | CustomInstallDirectory | \path\to\production\directory\ | production |

5. If you would like to remove existing files from the custom installation directory before your deployed files are copied to it, check the **Purge** checkbox.
6. If there are files you would like to exclude from the purge, add the files and directories you want to keep to the *Exclude from purge* list. This feature was introduced in `Octopus 3.13.8`.

The *Exclude from purge* list must be a newline-seperated list of file or directory names, relative to the installation directory. To exclude an entire directory specify it by name without a wildcard. Extended wildcard syntax is supported. for instance:

> appsettings.config
>
> Config

> Config\\*.config

> **\\*.config

## How the Packages are Deployed

Our Packages are extracted into a new directory each time (along the lines of C:\Octopus\Applications\\[Environment name\]\\[Package name\]\\[Package version\]\) , and this is no different for Custom Installation Directory.

![](/docs/images/3048085/3277682.png "width=1140")

We make the assumption that when you are using a Custom Installation Directory it has a working copy of an existing website or application. So to blindly extract the new package in your existing directory, without first completing any transformations, or variable substitutions could potentially break your application or website. So even when you are using the Custom Installation Directory feature, we extract the package to the above listed directory and perform all transformations and substitutions.

![](/docs/images/3048085/3277681.png "width=1032")

And after substitution and transformation your files are moved.

![](/docs/images/3048085/3277680.png "width=1205")

Read more about the [Ordering of Package Features](/docs/deployment-examples/deploying-packages/package-deployment-feature-ordering.md).
