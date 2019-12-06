---
title: Getting Started with Azure Cloud Services
description: This guide will help you deploy your first Azure Cloud Service application with Octopus Deploy.
position: 0
---

This guide will help you deploy your first Azure Cloud Service application using Octopus Deploy.  This guide assumes some familiarity with Octopus. If you are just starting out please see the general [getting started guide](/docs/getting-started.md).

In order to complete this guide you will need to have an Azure account and create an Azure Cloud Service and Azure Storage Account. Please refer to the [Azure documentation](https://azure.microsoft.com/en-us/documentation/) for completing these steps.  In this guide the Cloud Service is called hello-octopus and the storage account is called octostore.

## Create a Package {#GettingstartedwithAzureCloudServices-Createapackage}

You will need a NuGet package containing the Azure Cloud Service application you want to deploy.  The NuGet package contains the .cspkg and .cscfg files that are published from Visual Studio. Here is one we prepared earlier that you can use for this guide: [HelloCloud.1.0.0.nupkg](https://download.octopus.com/demo/HelloCloud.1.0.0.nupkg)

Upload your NuGet package to the Octopus [built-in package repository](/docs/packaging-applications/package-repositories/index.md):

![Package feed](package-feed.png)

## Create an Account {#GettingstartedwithAzureCloudServices-Createanaccount}

To set up a new Azure Management Certificate account, follow the directions in [Creating an Azure Management Certificate  Account](/docs/infrastructure/deployment-targets/azure/index.md#azure-management-certificate).

## Create an Environment {#GettingstartedwithAzureCloudServices-Createanenvironment}

In order to deploy a Cloud Service we require an Octopus environment to deploy to. Cloud Services have slots which map nicely to environments. Create a new environment called "Staging":

![Create environment](create-env.png)

## Create a Project {#GettingstartedwithAzureCloudServices-Createaproject}

Now have the NuGet package we want to deploy, the account we are going to use for the deployment and an environment to deploy to, all we need is a project to do all the work.  Create a new project:

![Create project](create-project.png)

In the project's process add a new Deploy an Azure Cloud Service step:

![Cloud Service step template](5865904.png "width=170")

Select the NuGet package that you are going to deploy and the Azure account to use for the deployment. The settings for this step should look something like this:

![Cloud Service Step Template](cloud-service-step.png)

Save the step and create a release for your project. Deploy the release to the Staging environment:

![Deploy Cloud Service](deploy-cloud-service.png)

Grab a coffee and by the time you get back your application should be deployed to the staging slot of your Azure Cloud Service.
