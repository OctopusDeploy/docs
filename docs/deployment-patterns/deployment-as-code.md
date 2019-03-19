---
title: Deployment as Code
description: You can define your entire Octopus configuration as code and track it all through source control. This page describes the different options available right now, and our plans to make this even better in the future.
position: 4
---

You are probably reading this page because you want to manage your **deployment as code**. You probably want to define your deployment process, scripts, and variables in code, perhaps colocating this with the application source code in your git repository. This page describes the different options available in Octopus right now, and our plans to make this even better in the future.

## Deployment scripts as code

The simplest way to get started with **deployment as code** is to manage your custom deployment scripts as code. When you deploy your application, Octopus can execute a script contained inside a package. You can colocate your deployment scripts with your application source code, leveraging all the benefits of source control including change tracking and branching, then package it all up for Octopus.

Learn about [executing custom scripts in packages](/docs/deployment-examples/custom-scripts/scripts-in-packages/index.md).
Learn about [custom scripts](/docs/deployment-examples/custom-scripts/index.md).

## Octopus configuration as code

The next level of automation is to define the configuration of your Octopus project as code, including the deployment process, variables, and more. You can colocate your Octopus project configuration with your application source code, adding a step to your build process which pushes the configuration changes to your Octopus project. The typical flow looks like this:

1. Build and Test application source code
1. Package application source code
1. Push configuration changes to Octopus project
1. Push application packages to deployment feed
1. Create release in Octopus
1. Deploy release via Octopus to your Dev/Test environment

### Now: HTTP API and .NET SDK

Octopus has a comprehensive HTTP API and .NET SDK you can use to automate **everything** in Octopus - if you can do something through the user interface, you can automate it with code. You can create and update projects, variables, deployment processes, and more. Today, this is our only fully-supported **Octopus as Code** solution.

## Future: Terraform provider

There’s also an [open source Terraform provider for Octopus](https://github.com/MattHodge/terraform-provider-octopusdeploy), which is built on top of the Octopus HTTP API. We are using this Terraform provider ourselves for [Octopus Cloud](https://octopus.com/cloud) (our SaaS product), and we are actively contributing to it. We will be building first-class support for this into Octopus in the future, but it doesn’t cover 100% of all Octopus features yet, and the API surface (HCL) is subject to change.

If you want to do **Octopus as Code** today, we’d recommend using our .NET client library which will always be supported. The Terraform provider will be a simpler, more declarative approach that we’ll support in the future.


