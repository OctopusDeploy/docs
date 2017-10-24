---
title: Getting started with Azure Web Apps
description: This guide will help you deploy your first Azure Web App with Octopus Deploy.
---

This guide will help you deploy your first Azure Web App using Octopus Deploy.  This guide assumes some familiarity with Octopus. If you are just starting out you please see the general [getting started guide](/docs/getting-started.md).

In order to complete this guide you will need to have an Azure account and create an Azure Web App. Please refer to the [Azure documentation](https://azure.microsoft.com/en-us/documentation/) for completing these steps.  In this guide the Web App is called hello-octopus-web.

## Create a package {#GettingstartedwithAzureWebApps-Createapackage}

You will need a NuGet package containing the web application that you want to deploy. Here is one we prepared earlier that you can use for this guide: [HelloWeb.1.0.0.nupkg](https://download.octopusdeploy.com/demo/HelloWeb.1.0.0.nupkg)

Upload your NuGet package to the Octopus [built-in package repository](/docs/packaging-applications/package-repositories/index.md):

![Package feed](package-feed.png "width=500")

!partial <content>