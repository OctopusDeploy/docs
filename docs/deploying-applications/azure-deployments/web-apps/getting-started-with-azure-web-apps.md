---
title: Getting Started with Azure Web Apps
description: This guide will help you deploy your first Azure Web App with Octopus Deploy.
---

This guide will help you deploy your first Azure Web App using Octopus Deploy.  This guide assumes some familiarity with Octopus. If you are just starting out you please see the general [getting started guide](/docs/getting-started.md).

In order to complete this guide you will need to have an Azure account and create an Azure Web App. Please refer to the [Azure documentation](https://azure.microsoft.com/en-us/documentation/) for completing these steps.  In this guide the Web App is called hello-octopus-web.

## Create a Package {#GettingstartedwithAzureWebApps-Createapackage}

You will need a NuGet package containing the web application that you want to deploy. Here is one we prepared earlier that you can use for this guide: [HelloWeb.1.0.0.nupkg](https://download.octopusdeploy.com/demo/HelloWeb.1.0.0.nupkg)

Upload your NuGet package to the Octopus [built-in package repository](/docs/packaging-applications/package-repositories/index.md):

![Package feed](package-feed.png "width=500")


## Create an Account {#GettingstartedwithAzureWebApps-Createanaccount}

To set up a new Azure account, follow the directions in [Creating an Azure Account](/docs/infrastructure/azure/creating-an-azure-account/index.md).

## Create an Environment {#GettingstartedwithAzureWebApps-Createanenvironment}

In order to deploy a Web App we require an Octopus environment to deploy to. Under {{Infrastructure, Environments}}, create a new environment called "Staging":

![Create environment](create-env.png "width=500")

## Create a Project {#GettingstartedwithAzureWebApps-Createaproject}

We now have the NuGet package we want to deploy, the account we are going to use for the deployment and an environment to deploy to: all we need is a project to do all the work.  Create a new project:

![Create project](create-project.png "width=500")

In the new project's *Process* tab, add a new 'Deploy an Azure Web App' step. Select the NuGet package that you are going to deploy and the Azure account to use for the deployment. The settings for this step should look something like this:

![Azure Web App Step](web-app-step.png "width=500")

Save the step and create a release for your project. Deploy the release to the Staging environment:

![Deploy Web App](deploy-to-staging.png "width=500")

Grab a coffee and by the time you get back your application should be deployed to Azure Web Apps.
