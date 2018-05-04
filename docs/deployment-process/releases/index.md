---
title: Releases
description: Releases allow you to capture everything required to deploy a project in a repeatable and reliable manner.
position: 106
---

## Releases and Deployments

There are two important concepts involved in deploying your Octopus projects:  **releases** and **deployments**.  Recall that a project is like a recipe that describes the steps (instructions) and variables (ingredients) required to deploy your apps and services.  

- A _release_ captures all the project and package details so it be deployed over and over in a safe and repeatable way.  
- A _deployment_ is the execution of the steps to deploy a release to an environment.  

An individual _release_ can be _deployed_ numerous times to different environments.  

For example, suppose you have a financial services web app called OctoFX and you're ready to deploy and test a new update, it would look something like the following.  

![OctoFX deployment process](octofx-deployment-process.png "width=500")

The OctoFX deployment process includes a package step which installs the web application on Windows servers running IIS.  The deployment process also includes steps to add and remove the machine from a load balancer in a rolling deployment.

![Creating a release](octofx-create-release.png "width=500")

![Deploying a release to an evironment](octofx-deploy-release.png "width=500")

You can create a new release by selecting the _Create release_ button on the project details page.  This allows you to specify the version for the release, which packages are required and optional release notes.  Once you save this new release, you can simply select deploy and then promote it through the environments for this project.

NOTE: If you had a fully automated build and deployment pipeline, the releases are generally created automatically.  For more information on this topic, see our [API and Integration](/docs/api-and-integration/index.md) documentation.

## Snapshots

Octopus releases should be considered read-only.  When you create a new release, Octopus takes a snapshot (i.e. a complete copy) of your project's deployment process, variables, and package details (package IDs and versions) so that release can deployed over and over.  This enables you to modify your deployment process for newer versions of your app (i.e. 1.1, 1.2, 2.0 etc) without affecting the reliability of your existing releases.  This is a large part of the safety and reliablility of your Octopus deployments.

### Updating release variables
There is one common ‘gotcha’ involving creating releases and snapshots.  If you modify your deployment process and try to redeploy it, you’ll find the latest changes aren’t included.  This is because the release snapshot details are captured when you create a release.
That said, you can modify the variables of a release, but be aware, you cannot reverse this operation.  
![Edit release  variables](update-variables.png "width=500")
