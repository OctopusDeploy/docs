---
title: Deployment process as code
description: With Octopus you can manage your deployment process as code. This means you can define your deployment process, scripts, and variables in source code. You can store this configuration in the same source control repository as your application source code, or somewhere else. This page describes the different options available in Octopus to store your deployment process as code.
position: 70
---

With Octopus you can manage your deployment process as code. This means you can define your deployment process, scripts, and variables in source code. You can store this configuration in the same source control repository as your application source code, or somewhere else.

This page describes the different options available in Octopus to store your deployment process as code.

We recommend taking a two-phase approach when moving to **deployment process as code**:

1. Start with [scripts as code](#scripts-as-code): this method offers the best cost/reward ratio, and it is the simplest to implement and maintain over time.
2. Move towards [project as code](#project-as-code): this method is more difficult to set up but comes with the benefit of having your entire Octopus project managed as code.

:::hint
We use **git** at Octopus and the rest of this pattern provides examples using **git** concepts. The same principles apply regardless of your source control tool of choice.
:::

## Scripts as code {#scripts-as-code}

The simplest way to get started with **deployment process as code** is to manage your custom deployment **scripts as code**. When you deploy your application, Octopus can execute a script contained inside a package. You can colocate your deployment scripts with your application source code, leveraging all the benefits of source control including change tracking and branching, then package it all up for Octopus.

There is a downside to stopping here: your scripts are managed as code, but your deployment process and variables are still controlled by Octopus. Depending on your situation, this trade off might be quite acceptable.

### Move your scripts into source code

You can follow this process to move your custom scripts without interrupting deployments:

1. Move your deployment scripts from your Octopus deployment process into a file in your application source code.
1. Build your application as normal, but this time with the deployment scripts packaged up alongside your application.
    a. At this point your deployments will continue to work using the scripts stored in Octopus.
1. Update your deployment process to use the script from your application package.

Now your scripts are colocated with your application source code, all without changing your build pipeline.

Learn about [custom scripts](/docs/deployments/custom-scripts/index.md) and [executing custom scripts in packages](/docs/deployments/custom-scripts/scripts-in-packages/index.md).

### Consistency and repeatability using scripts as code

When you manage your **scripts as code**, Octopus still makes sure your deployments are consistent and repeatable. Whenever you modify a script, that change flows through the whole process just like the changes to your application code.

### Introducing changes safely using scripts as code {#scripts-as-code-change-safely}

Branches in source control let you test application code changes in isolation before integrating them with other code changes. You can use the exact same approach to introduce changes to your scripts as code. This lets you make changes to your scripts without breaking deployments from your `master` branch.

- **Modifying an existing script**: If you modify a script in a branch, that change flows through the whole process just like the changes to your application code. When you deploy a release from that branch, your modified script will be used. When you merge your branch into the `master` branch, your modified script will be used for deployments from the `master` branch.
- **Adding a new script**: Add an empty script to your `master` branch, configure Octopus to execute the script, and then author the script content on your branch. This enables you to test your new script in isolation. Merge into `master` when you are ready to integrate.
- **Deleting a script**: Delete the content of your script in your branch, leaving the empty script file to be packaged. Now you can test your deployment still works with the empty script. When you are ready, you can configure Octopus to stop calling the script, and delete the script from your `master` branch.

## Project as code {#project-as-code}

Another approach to **deployment process as code** is to define the configuration of your Octopus **project as code**, primarily the deployment process and variables. You can colocate your Octopus project configuration with your application source code, adding a step to your build process which pushes the configuration changes to your Octopus project.

This approach is more complex since you need to change your build pipeline, and train people how to treat the code as the source of truth for these parts of your project.

### Move your project configuration to source code

Follow this process to move your Octopus project configuration to code:

1. Move your [deployment scripts to code](#scripts-as-code) and decide if you want to take this next step.
1. Convert your project configuration to code: learn about [configuring Octopus using code](#configure-octopus-using-code).
1. Test your project configuration as code, targeting a dummy project so your real project continues to work uninterrupted.
1. When you are happy with your testing, update your build pipeline to target the real project.
1. Train your people to make changes safely using **project as code**.

The process flow of using **project as code** looks similar to what you already have, with on additional step to push the configuration changes into Octopus. Here is a typical example:

1. Build and test application source code.
1. Package the application source code.
1. **Push configuration changes to an Octopus project treating the code as a source of truth**.
1. Push application packages to deployment feed.
1. Create a release in Octopus.
1. Deploy the release via Octopus to your Dev or Test environment.
1. Promote the release to other environments.

### Configure Octopus using code {#configure-octopus-using-code}

Octopus has a comprehensive HTTP API and .NET SDK you can use to automate **everything** in Octopus. If you can do something through the user interface, you can automate it with code. You can create and update projects, variables, deployment processes, and more. A downside of this approach is how work is involved: you need to write code that detects drift and applies deltas, or is idempotent. Today, this is our only fully-supported solution to define your Octopus configuration as code.

There is an [open source Terraform provider for Octopus](https://github.com/OctopusDeploy/terraform-provider-octopusdeploy), which is built on top of the Octopus HTTP API. The Terraform provider for Octopus detects drift and applies deltas. We are using this Terraform provider ourselves for [Octopus Cloud](https://octopus.com/cloud) (our SaaS product), and we are actively contributing to the provider. It doesn’t cover 100% of all Octopus features yet, and the structure of the Terraform resources are subject to change. We will be building first-class support for this into the Octopus ecosystem in the future.

If you want to do **Octopus configuration as code** today, we recommend using our .NET SDK which will always be supported. The Terraform provider will be a simpler, more declarative approach, that we will support in the future.

### Consistency and repeatability using project as code

When managing your Octopus configuration as code, Octopus still makes sure your deployments are consistent and repeatable. Whenever you push a configuration change to your Octopus project via code, it's just like people using the user interface or API to make changes. When you create a release, Octopus takes a snapshot of the deployment process, variables, and packages making every deployment of that release consistent and repeatable, regardless of whether the project was configured by a person or by code.

This means you can push configuration changes to Octopus as code, and get the same consistent and repeatable experience you expect for your deployments.

### Introducing changes safely using project as code

This is where things get a bit more difficult compared to the [scripts as code](#scripts-as-code) pattern. You can approach this problem in several ways, where one approach will suit your scenario better than others:

1. **Space-per-branch**: In this approach you push your configuration changes from each branch in your source control repository into a unique space in Octopus. A space is a sandbox containing all the things you need for your application or set of applications. By using a space-per-branch you dynamically create little "parallel universes" in the same Octopus Server, safely isolated from each other, then tear them down when you are done. This approach is suitable in most situations since it offers the best isolation and most flexibility. It is especially appropriate for service-oriented architectures and microservice architectures where you may have many projects interacting with each other.
2. **Blessed branch**: In this approach you only push configuration changes from a specific branch, like `master` in most git repositories. This approach is suitable in some simpler scenarios where you don't expect to change your deployment process very often.

#### Space-per-branch approach

In this approach you will be pushing configuration changes from **any branch** into a unique space in Octopus, using a naming convention. Here is one potential naming convention you could use:

- `master` targets the space called `MySpace-master` (or `MySpace` if you don't like the suffix).
- `feature-rocksville` targets the space called `MySpace-rocksville`.
- `feature-planetside` targets the space called `MySpace-planetside`.

The general process should look something like this, tailored to your situation:

1. Create a new branch to isolate your changes, named something like `feature-rocksville`.
1. Make the changes on your branch.
1. In your build pipeline, push the changes to the correct space like `MySpace-rocksville`, creating the space if it doesn't exist already.
1. Test your changes in your space.
1. When you are happy the changes are safe to share, merge the `feature-rocksville` branch into `master` allowing those changes to flow through to the `MySpace-master` space.
1. Clean up by deleting the `feature-rocksville` space.

#### Blessed branch approach

In this approach you will be pushing configuration changes from **one specific branch** into Octopus. Using the example of git, you should only push changes from the `master` branch into Octopus, and use [Channels](/docs/releases/channels/index.md) to safely introduce changes to your process and variables.

The general process should look something like this, tailored to your situation:

1. Create a channel to match your branch, with package version rules to enforce the integrity of the release process. _You can create channels manually, or automatically as part of your build pipeline if that suits._
1. Make the changes on your branch, making sure to scope your changes to your channel to avoid interrupting deployments from other branches. _You can scope each step, action and variable value to a specific channel for isolation._
1. Get a peer to review your configuration change on your branch.
1. Merge your configuration change to the `master` branch so your changes are actually pushed into Octopus.
1. Test your change by deploying releases through your channel.

    a. If you are unhappy with your change, fix it in your branch, get a peer to review your new commits, merge the new commits to `master`, and repeat your testing.
1. When you are happy the changes are safe to share:

    a. Remove the channel scoping from your changes in your branch.
    b. Get a peer to review this final change.
    c. Merge your changes to the `master` branch.
    d. Test your brand new deployment through the `master` branch and your main channel.
    e. If something goes wrong, you can revert the single commit, isolating your changes back to your channel.

:::hint
If you have thoughts about how deployment as code could better support your organization, we would like to [talk with you about your dream scenario](https://octopus.com/support)!
:::

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).
