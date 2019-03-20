---
title: Deployment as code
description: With Octopus you can manage your deployments as code. This means you can define your deployment process, scripts, and variables in source code. You can store this configuration in the same source control repository as your application source code, or somewhere else. This page describes the different options available in Octopus to store your deployments as code.
position: 4
---

With Octopus you can manage your deployments as code. This means you can define your deployment process, scripts, and variables in source code. You can store this configuration in the same source control repository as your application source code, or somewhere else. This page describes the different options available in Octopus to store your deployments as code.

We recommend taking a two-phase approach when moving to **deployment as code**:

1. Start with [scripts as code](#scripts-as-code) - this method offers the best cost/reward ratio, is the simplest to implement and maintain over time.
2. Move towards [project as code](#project-as-code) - this method is more difficult to set up, but comes with the benefit of having your deployment managed as code.

!toc

## Scripts as code {#scripts-as-code}

The simplest way to get started with **deployment as code** is to manage your custom deployment **scripts as code**. When you deploy your application, Octopus can execute a script contained inside a package. You can colocate your deployment scripts with your application source code, leveraging all the benefits of source control including change tracking and branching, then package it all up for Octopus.

There is a downside to stopping here: your scripts are managed as code, but your deployment process and variables are still controlled by Octopus. Depending on your situation, this tradeoff might be quite acceptable.

### Move your scripts into source code

You can follow this process to move your custom scripts without interrupting deployments:

1. Move your deployment scripts from your Octopus deployment process into a file in your application source code.
1. Build your application as normal, but this time with the deployment scripts packaged up alongside your application.
  a. At this point your deployments will continue to work using the scripts stored in Octopus.
1. Update your deployment process to use the script from your application package.

Now your scripts are colocated with your application source code, all without changing your build pipeline.

Learn about [executing custom scripts in packages](/docs/deployment-examples/custom-scripts/scripts-in-packages/index.md).
Learn about [custom scripts](/docs/deployment-examples/custom-scripts/index.md).

### Consistency and repeatability using scripts as code

When you manage your **scripts as code**, Octopus still makes sure your deployments are consistent and repeatable. Whenever you modify a script, that change flows through the whole process just like the changes to your application code.

### Introducing changes safely using scripts as code {#scripts-as-code-change-safely}

Branches in source control let you test application code changes in isolation before integrating them with other code changes. You can use the exact same approach to introduce changes to your scripts as code. This lets you make changes to your scripts without breaking deployments from your `master` branch.

- **Modifying an existing script**: If you modify a script in a branch, that change flows through the whole process just like the changes to your application code. When you deploy a release from that branch, your modified script will be used. When you merge your branch into the `master` branch, your modified script will be used for deployments from the `master` branch.
- **Adding a new script**: Add an empty script to your `master` branch, configuring Octopus to execute the script, and then author the script content on your branch. This enables you to test your new script in isolation, and merge into `master` when you are ready to integrate.
- **Deleting a script**: Delete the content of your script in your branch, leaving the empty script file to be packaged. Now you can test your deployment still works with the empty script. When you are ready, you can configure Octopus to stop calling the script, and delete the script from your `master` branch.

## Project as code {#project-as-code}

The next level of **deployment as code** is to define the configuration of your Octopus **project as code**, primarly the deployment process and variables. You can colocate your Octopus project configuration with your application source code, adding a step to your build process which pushes the configuration changes to your Octopus project.

This approach is more complex since you need to change your build pipeline, and train people how to treat the code as the source of truth for these parts of your project.

### Move your project configuration to source code

Follow this process to move your Octopus project configuration to code:

1. Move your [deployment scripts to code](#scripts-as-code) and decide if you want to take this next step
1. Convert your project configuration to code - learn about [configuring Octopus using code](#configure-octopus-using-code)
1. Test your project configuration as code, targeting a dummy project so your real project continues to work uninterrupted
1. Once you are happy with your testing, update your build pipeline to target the real project
1. Train your people to make changes safely using **project as code**

The process flow using **project as code** looks similar to what you already have, with on additional step to push the configuration changes into Octopus. Here is a typical example:

1. Build and test application source code
1. Package application source code
1. **Push configuration changes to Octopus project treating the code as a source of truth**
1. Push application packages to deployment feed
1. Create a release in Octopus
1. Deploy the release via Octopus to your Dev/Test environment
1. Promote the release to other environments

### Configure Octopus using code {#configure-octopus-using-code}

Octopus has a comprehensive HTTP API and .NET SDK you can use to automate **everything** in Octopus - if you can do something through the user interface, you can automate it with code. You can create and update projects, variables, deployment processes, and more. Today, this is our only fully-supported **Octopus as Code** solution.

There is an [open source Terraform provider for Octopus](https://github.com/MattHodge/terraform-provider-octopusdeploy), which is built on top of the Octopus HTTP API. We are using this Terraform provider ourselves for [Octopus Cloud](https://octopus.com/cloud) (our SaaS product), and we are actively contributing to it. It doesn’t cover 100% of all Octopus features yet, and the structure of the Terraform resources are subject to change. We will be building first-class support for this into the Octopus ecosystem in the future.

If you want to do **Octopus configuration as code** today, we recommend using our .NET SDK which will always be supported. The Terraform provider will be a simpler, more declarative approach that we will support in the future.

### Consistency and repeatability using project as code

When manage your Octopus configuration as code, Octopus still makes sure your deployments are consistent and repeatable. Whenever you push a configuration change to your Octopus project via code, it's just like people using the user interface or API to make changes. When you create a release, Octopus takes a snapshot of the deployment process, variables, and packages making every deployment of that release consistent and repeatable, regardless of whether the project was configured by a person or by code.

This means you can push configuration changes to Octopus as code, and get the same consistent and repeatable experience you expect for your deployments.

### Introducing changes safely using project as code

This is where things get a bit more difficult compared to the [scripts as code](#scripts-as-code) pattern.

As a starting point, we recommend **pushing configuration changes from one specific branch into Octopus.** Using the example of git, you should only push changes from the `master` branch into Octopus, and use [Channels](/docs/deployment-process/channels/index.md) to safely introduce changes to your process and variables.

The general process should look something like this, tailored to your situation:

1. Create a channel to match your branch, with package version rules to enforce the integrity of the release process. _You can create channels manually, or automatically as part of your build pipeline if that suits._
1. Make the changes on your branch, making sure to scope your changes to your channel to avoid interrupting deployments from other branches. _You can scope each step/action and variable value to a specific channel for isolation._
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
