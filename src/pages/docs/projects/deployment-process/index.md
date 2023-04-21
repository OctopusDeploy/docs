---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deployment process
description: Deploying applications starts with defining a project's deployment process.
hideInThisSection: false
navOrder: 10
---

Now that you have access to an Octopus Server, your [infrastructure is configured](/docs/infrastructure/), and your [applications packaged](/docs/packaging-applications), you're ready to start deploying your software.

!include <deployment-process>

!include <hello-world-deployment-process>

## Create a release

1. From the project's overview page, click **CREATE RELEASE**, and then click **Save**.
1. Click **DEPLOY TO TEST**, then click **DEPLOY**.

This will deploy the release. In the task summary, you'll see the release was deployed to your *Test* environment, and the step *Hello world* ran on the deployment target, in this case *TWeb01*.

![Hello world task summary](/docs/projects/deployment-process/images/hello-world.png "width=500")

This is an example of a very simple process, the following sections go into more detail about each part of the process.

## Projects

Before you can define how your software is deployed, you must create a project for the deployment process. Projects contain the deployment steps and configuration variables that define how your software is deployed.

Learn more about managing [projects](/docs/projects).

## Lifecycles

Lifecycles control how your software is promoted through your environments and which projects are associated with which environments.

Learn more about [Lifecycles](/docs/releases/lifecycles).

## Deployment steps

Steps contain the actions your deployment process will execute each time your software is deployed.

Deployment processes can have one or many steps, steps can run in sequence or parallel, in addition to a variety of deployment steps, you can include manual intervention steps to get sign off before deployment, email notification steps to keep everybody informed about your process, or even skip steps under different circumstances.

Learn more about [steps](/docs/projects/steps).

## Configuration features

When you deploy your software, it needs to be configured for the specific environments it will be deployed to. Configuration files let you define custom installation directories, database connections, and other settings that make it possible to deploy your software.

Learn more about [configuration features](/docs/projects/steps/configuration-features).

## Variables

Octopus supports variables to make it easier to define application settings for your deployment processes without the need to hardcode them. For instance, you might use different connection strings for apps deployed to Test and Production. Variables let you define these settings and then refer to them by the variable name throughout the deployment process, meaning you don't have to manually change them between deployments, or even give them much thought after the variables and deployment process have been defined.

Learn more about [variables](/docs/projects/variables).

## Conditions

You can specify run conditions on the steps that you define to give you greater control over the deployment process.

Learn more about [conditions](/docs/projects/steps/conditions).

## Deploying releases

In Octopus you create releases to be deployed. Projects have multiple releases and releases can be deployed multiple times to across different infrastructure.

Learn more about [releases](/docs/releases).

## Working with the Octopus API

Octopus Deploy is built API-first, which means everything you can do through the Octopus UI can be done with the API. In the API we model the deployment process the same way, starting at the Project:

- Project
- Deployment process
- Steps
- Actions

We have provided lots of helpful functions for building your deployment process in the [.NET SDK](/docs/octopus-rest-api/octopus.client), or you can use the raw HTTP API if that suits your needs better.

Learn about using the [Octopus REST API](/docs/octopus-rest-api).

:::div{.success}
Record the HTTP requests made by the Octopus UI to see how we build your deployment processes using the Octopus API. You can do this in the Chrome developer tools, or using a tool like Fiddler.
:::
