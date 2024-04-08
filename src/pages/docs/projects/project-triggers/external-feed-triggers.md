---
layout: src/layouts/Default.astro
pubDate: 2024-03-21
modDate: 2024-03-21
title: External feed triggers
description: External feed triggers allow you to automatically create a new release as a result of new container images or helm charts being pushed to their respective repositories.
navOrder: 12
---

By configuring your Octopus project with container dependencies, you can now create triggers that watch those repositories for new packages pushed by your build tool. Based on tags and version rules, triggers detect if an image appears that is later than the image used in your previous release. Octopus then automatically creates a new release with all the latest container images or Helm chart dependencies. 

Your existing [lifecycles](/docs/releases/lifecycles/) will then promote that release through your [environments](/docs/infrastructure/environments) or [tenants](/docs/tenants), just like it does currently. If your lifecycle uses automatic release progression, then you've just set up a Continuous Delivery pipeline without explicitly letting Octopus know about your application changes! 

The details of these container images and Helm charts are already known in Octopus. This means we can use the registry locations, image names, chart names, and credentials to do this monitoring, without adding or maintaining this information anywhere else.

## Getting started {#ExternalFeedTriggers-GettingStarted}

Navigate to your project’s triggers page by selecting Projects and clicking on the project you are working with. Click **Triggers** option on the left, under **Deployments**.  You are now presented with an empty triggers list.  

Click the **ADD TRIGGER** on the right-hand side of the page, and select **External feed**

:::figure
![Project triggers list](/docs/projects/project-triggers/images/add-trigger-popup.png)
:::

Enter a name and description for your trigger.  The name should be short, memorable, and unique. Example: Create a release when nginx is updated in Docker.

## Channels and lifecycles

If your project contains multiple [channels](/docs/releases/channels), you have the option of selecting which channel this trigger will apply to.  Any pushed packages must satisfy the selected channel's [versioning rules](/docs/releases/channels#version-rules) to trigger a release creation. The releases created by the trigger will use this channel.

Unlike the existing [built-in package repository triggers](/docs/projects/project-triggers/built-in-package-respository-triggers) (formerly Automatic Release Creation), you can create multiple external feed triggers per project. This can enable you to automatically create releases for multiple channels.

:::figure
![Channel selection](/docs/projects/project-triggers/images/external-trigger-channel.png)
:::

A preview of the [lifecycle](/docs/releases/lifecycles) is also shown, to show how releases created by the trigger will be deployed.

If you combine external feed triggers with the automatic deployment feature within [Lifecycles phases](/docs/releases/lifecycles/#Lifecycles-LifecyclePhases), whenever a package is pushed to a selected external feed, the trigger can create a release, and have it be automatically deployed.

## Trigger sources

Any container images or helm charts referenced in your project's deployment process can be selected to trigger release creation.  Feeds or packages referenced using variable substitution are also options here, however they will only be used by the trigger if they are both evaluated as either container/helm chart repositories, and do not use variable unavailable at release creation time.  For example, using an environment name variable will not work, because that value is only available at deploy time.

:::figure
![Package selection](/docs/projects/project-triggers/images/external-feed-trigger-packages.png)
:::

:::div{.hint}
If you have a chain of dependencies with your external feed packages, make sure your trigger uses the package which will be pushed to its repository last.

The release number that is created is guided by the Release Versioning settings under **Deployments Settings**. It will use the rules defined there.
:::

## Troubleshooting {#ExternalFeedTriggers-Troubleshooting}

When you are using external feed triggers there are a few reasons why a release may not be created successfully. Take some time to consider the following troubleshooting steps:

1. **Inspect the task list** for errors in the **Task** menu - Octopus will log the reason why external feed triggers failed as errors or warnings.  Note that external feed triggers are system tasks, and do not display in the list by default.  Use the **SHOW ADVANCED FILTERS** option and select **Include system tasks** to show them.

2. Ensure you are pushing the package to a **supported external feed type**. While capability has been verified against most major docker providers, compatibility is not guaranteed - please contact octopus support if you encounter any problems. 

3. Ensure that packages in the external feed match the [channel rules](/docs/releases/channels#version-rules) if defined for the trigger's channel (or the default channel if your project doesn't have multiple channels).  **Triggers will only create a new release if the packages match channel rules.**

4. Ensure you are pushing a **new version** of the package - Octopus will not create a release where the package has already been used for creating a release.

5. Ensure you are pushing a package that Octopus will consider as the **latest available package**.  The trigger's version evaluator uses SemVer, and will not triggers off image tags such as 'latest'.

6. Make sure that the feed and package references **only use variables which are able to be evaluated** at release creation time.

7. If you have a **chain of package dependencies** with your external feed packages, make sure your trigger uses the package which will be **pushed to its repository last**.  Otherwise some of the packages required for the release may be missing.


## Learn more

Take a look at the [Octopus Guides](https://octopus.com/docs/guides) which covers building and packaging your application, creating releases and deploying to your environments for your CI/CD pipeline.
