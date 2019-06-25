---
title: Getting Started
description: This section provides instructions to help you do your first deployment quickly.
position: 1
---

## Getting Started with Octopus Deploy

Below outlines the main steps for doing your first deployment:

### 1. Hosting the Octopus Deploy Server

The first thing you will need to do is decide where you want to host your [Octopus Deploy server](/docs/installation/index.md). You can install your own [self-hosted](#self-hosted-octopus) instance or use [Octopus Cloud](/docs/octopus-cloud/index.md) which is hosted and maintained by Octopus Deploy.

### 2. Set up deployment environments

Octopus will need to know the [Infrastructure](/docs/infrastructure/index.md) you are going to deploy to. You can deploy to Windows servers, Linux servers, Microsoft Azure, an Offline Package Drop, Cloud Regions, or Kubernetes. These are known as your deployment targets, and they are organized into environments so you can promote your software through your deployment pipeline, for instance, from Development to Testing and finally into Production.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VnXGAJP_SXY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Creating environments** (0:06)
1. Navigate to **{{Infrastructure,Environments}}** and click **ADD ENVIRONMENT**.
1. Give your new environment a meaningful name and click **SAVE**.
1. Add a description for the environment.
1. Select the checkbox in the **Default Guided Failure Mode** section if you want Octopus Deploy to prompt users for intervention if a deployment to this environment fails. Learn more about [guided failure mode](#guided-failure-mode).
1. Select the checkbox in the **Dynamic Infrastructure** section if deployments to this environment are allowed to create infrastructure such as targets and accounts. Learn more about [Dynamic Infrastructure](#dynamic-infrastructure).
1. Click **SAVE**.

**Creating deployment targets** (2:08)
1. Navigate to **{{Infrastructure,Deployment Targets}}** and click **ADD DEPLOYMENT TARGET**.
1. TO DO

:::hint
**Learn more**

**[Deployment Targets]()**

Deployment targets represent the servers, machines and cloud services where your software and services will be deployed.

**[Environments]()**

Octopus organizes your deployment targets into groups called environments so you can promote your software through your deployment pipeline, for instance, from Development to Test and finally into Production.

**[Target Roles]()**

Target roles allow you to “tag” deployment targets with a specific keyword which can be used in your deployments.

**[Tentacle Agent]()**

When you deploy to servers, running either Windows, Linux or Mac, you need to install the Tentacle Agent, a lightweight agent service, on your servers so they can communicate with the Octopus server in either a listening or a polling mode.
A Tentacle Agent isn't required for deploying to Azure Web Apps, Kubernetes clusters, Azure Service Fabric and Azure Cloud Service targets.

**[Lifecycles](/docs/deployment-process/lifecycles/index.md)**

Lifecycles give you control over the way releases are promoted between environments.
:::

### 3. Package and upload your software

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository. We recommend configuring your existing tool chain to push packages automatically to the built-in repository; however, you can push packages manually to the repository if you choose to. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/ujMBpvQUOrg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Packaging software** (0:56)

1. TODO

**Uploading a package** (1:28)

1. TODO

:::hint
**Learn more**

**What is a Package**

A Package is an archive (zip, tar, NuGet) that contains all the files needed to run your software. You can host Packages in external repositories or the built-in Octopus repository.

**Naming a Package**

The package will need to be named correctly with a packageID, version number and format, for Octopus to recognize it. For example MyPackage.1.0.1.zip

**[Packaging your applications](/docs/packaging-applications/index.md)**

There are many more tools you might choose to use to create your package, but as long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats) you can deploy your applications with Octopus Deploy.

**Getting your package into Octopus**

Most Octopus users automate their existing tool chain to push packages to their Octopus Deploy server with our [API and Integrations](/docs/octopus-rest-api/index.md). But you can manually upload the package or host it in an external repository.  
:::

:::hint
**New to Octopus and don’t have a package?**

Use our example package to quickly create your first deployment. [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)
:::

### 4. Define your deployment process

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying. Before you can deploy, a Project will need to be created with a Deployment Process which will contain all the information needed to have your teams successfully redeploy every time.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Rec3aR8wnwk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Create a project** (0:06)

1. Select Projects from the main navigation, and click **ADD PROJECT**.
1. Give the project a name that's meaningful to you, and anybody else who'll work on the project.
1. Add a description for the project.
1. If you want to change the Project group select the project group from the dropdown menu.
1. If you want to change the Lifecycle select the lifecycle from the dropdown menu.
1. Click **SAVE** and you will be taken to the newly created project's overview page.

**Setting up variables** (0:41)

1. To add a variable to your project, navigate to the Project's Overview page, and click **Variables** to access the variable editor.
1. Give the variable a name, for instance, *Greeting*.
1. Enter the first value for the variable, for instance, *Hello*, *Test*, in the value field.
1. Define the scope for the value, for instance, by selecting the *Test* environment.
1. Click **ADD ANOTHER VALUE** and enter the second value for the variable, for instance, *Hello*, *Production*.
1. Define the scope for this value, for instance, by selecting the *Production* environment.
1. Save the variable by clicking **SAVE**.
1. In this example, we'll reference this variable from a Run a Script step.
1. 

**Define the deployment process** (8:45)

1. From your new project's overview page, click **DEFINE YOUR DEPLOYMENT PROCESS**.
1. Click **ADD STEP**, 
1. To create a simple step for your first deployment select the **Run a Script** step. 
1. Give the step a name, for instance, *Say Hello*.
1. For the execution plan, leave the selection at the default *Deployment targets* and select a target role.
1. For the script section, expand the *Script content* section by clicking on it. Paste the following PowerShell script into the text box:
​   Write-Host ​
1. Select the variable Greeting from the insert variable tool (#{}) next to the script editor, and click **SAVE**.

:::Hint
**Learn more about**

**[Projects](/docs/deployment-process/projects/index.md)**

Projects let you manage multiple software projects from the Octopus Web Portal. For each project you have, you define a deployment process, configuration variables, and the environments the software will be deployed to.

**[Deployment process](/docs/deployment-process/index.md)**

The deployment process is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed.

**[Variables](/docs/deployment-process/variables/index.md)**

Octopus lets you define variables for configuration values that change, so you can have a different value for each environment or deployment target.
:::

### 5. Deploy your release

Once you have access to an Octopus Server, your infrastructure is configured, your applications packaged, and the deployment process defined, you're ready to start deploying your software.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BPyWHOeR97w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Creating a release** (0:06)

1. With your deployment process defined, you can create a release on the Project's Overview page, by clicking **CREATE RELEASE**.
1. Give the release a version number, add any release notes you'd like to include, and click **SAVE**.

**Deploying a release** (1:16)

1. Select the release you want to deploy.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. If you selected **DEPLOY TO...**, select the environment to be deployed to.
1. Click **DEPLOY**.

:::Hint
**Learn more**

**[Creating a Releas](/docs/deployment-process/releases/index.md#creating-a-release)**

A Release is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from Projects and deployed via a Lifecycle to your Environments.

**[Deploy releases](/docs/deployment-process/releases/index.md)**

When you deploy a release, you are executing the deployment process with all the associated details, as they existed when the release was created. You can deploy a release as many times as you want to.
:::

**[Deployment examples](/docs/deployment-examples/index.md)**

## Next

- [Common Terms](/docs/getting-started/terms.md)
