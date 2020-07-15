---
title: Deploying a Hello World script
description: Learn how to deploy a simple hello world script with Octopus Deploy.
position: 10
---

Octopus Deploy can help with your complex deployment scenarios, but it can also deploy simple projects. 

This sections walks you through the simplest deployment possible to help you familiarize yourself with the process and the Octopus Web Portal.

TODO: Add this is a cloud instance, but the process is... 

## Environments

Octopus organizes the servers and services where you deploy your software into environments. Typical environments are **Dev**, **Test**, and **Production**, and they represent the stages of your deployment pipeline.

### Add an environment

1. To create an environment, in the Octopus Web Portal, navigate to **{{Infrastructure,Environments}}** and click **ADD ENVIRONMENT**.
1. Give your new environment a meaningful name, for instance, *Test*, and click **SAVE**.

You now have your first environment.

<!-- 1. Add a description for the environment.
1. Select the check-box in the **Default Guided Failure Mode** section if you want Octopus Deploy to prompt users for intervention if a deployment to this environment fails. Learn more about [guided failure mode](/docs/managing-releases/guided-failures.md).
1. Select the check-box in the **Dynamic Infrastructure** section if deployments to this environment are allowed to create infrastructure such as targets and accounts. Learn more about [Dynamic Infrastructure](docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).
1. Click **SAVE**. -->

## Projects

Projects are used to collect all the assets that make up your deployment processes. To deploy our simple hello world script, we first need a project. 

## Create a project

1. Navigate to the **Projects** tab, and click **ADD PROJECT**.
1. Give the project a name, for instance, *Hello world*, and click **Save**.

You now have your first project and are ready to define your deployment process.

## Deployment process

The deployment process is the steps the Octopus Server orchestrates to deploy your software. For our simple hello world script, we will only have one step.

### Define the deployment process

1. From the *Hello world* project you created in the previous section, click **DEFINE YOUR DEPLOYMENT PROCESS**.
1. Click **ADD STEP**.
1. Select the **Script** tile to filter the types of steps.
1. Click **ADD** on the **Run a Script** tile.
1. Accept the default name for the script and leave the **Enabled** checkbox ticked.
1. In the **Execution Location** section, select **Run once on a worker**.
1. Scroll down to the **Script** and enter the following PowerShell script in the **Inline Source Code** section:

```PowerShell
Write-Host "Hello, World!"
​```

1. Click **SAVE**.

## Releases

### Create and deploy a release 