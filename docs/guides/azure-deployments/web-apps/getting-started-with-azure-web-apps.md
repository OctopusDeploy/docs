---
title: Getting started with Azure Web Apps

---


This guide will help you deploy your first Azure Web App using Octopus Deploy.  This guide assumes some familiarity with Octopus. If you are just starting out you please see the general [getting started guide](http://docs.octopusdeploy.com/display/OD/Getting+started).


In order to complete this guide you will need to have an Azure account and create an Azure Web App. Please refer to the [Azure documentation](https://azure.microsoft.com/en-us/documentation/) for completing these steps.  In this guide the Web App is called hello-octopus-web.

## Create a package


You will need a NuGet package containing the web application that you want to deploy. Here is one we prepared earlier that you can use for this guide: [HelloWeb.1.0.0.nupkg](https://download.octopusdeploy.com/demo/HelloWeb.1.0.0.nupkg)


Upload your NuGet package to the Octopus [built-in package repository](/docs/home/packaging-applications/package-repositories.md):


![](/docs/images/3049356/3278535.png)

## Create an account


In Octopus Deploy, go to the Environments tab and select Accounts:


![](/docs/images/3049331/3278521.png)


Add an Azure Subscription account and fill in your account details:


![](/docs/images/3049356/3278536.png)


If you are allowing Octopus to generate a management certificate for you, first save the account and then upload the generated certificate to your Azure management certificates in the Azure Portal.  At the time of writing this setting is available in the classic portal:


![](/docs/images/3049331/3278522.png)

## Create an environment


In order to deploy a Web App we require an Octopus environment to deploy to. Create a new environment called "Staging":


![](/docs/images/3049356/3278537.png)

## Create a project


Now have the NuGet package we want to deploy, the account we are going to use for the deployment and an environment to deploy to.  Now all we need is a project to do all the work.  Create a new project:


![](/docs/images/3049356/3278538.png)


In the project's process add a new Deploy an Azure Web App step. Select the NuGet package that you are going to deploy and the Azure account to use for the deployment. The settings for this step should look something like this:

![](/docs/images/3049356/3278539.png)

Save the step and create a release for your project. Deploy the release to the Staging environment:

![](/docs/images/3049356/3278540.png)

Grab a coffee and by the time you get back your application should be deployed to Azure Web Apps.
