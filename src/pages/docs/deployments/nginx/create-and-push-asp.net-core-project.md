---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create and push an ASP.NET Core project
description: This guide describes how to package and publish an ASP.NET Core project to Octopus from your development workstation.
navOrder: 1
---

The sample project for this guide is the [Angular project template with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-2.1) application. The template consists of an ASP.NET Core project to act as an API backend and an Angular CLI project to act as a UI. The base project has been modified slightly to host the Angular CLI project outside of the ASP.NET Core project to enable us to configure NGINX both as a reverse proxy to the ASP.NET Core project while also serving the Angular CLI project as static content from the file system.

## Upload the package to the built-in repository {#Create&PushASP.NETCoreProject-Uploadthepackagetothebuilt-inrepository}

Firstly we need to make the package available for Octopus to deploy.

:::div{.success}
We've crafted and packaged v1.0.0 of this sample application for you to try out (see the link below). Alternatively you can create your own application and [package the application](/docs/packaging-applications) yourself to try it out. Click [here](#Create&PushASP.NETCoreProject-PublishingandPackingtheWebsite) for steps to publish and package the ASP.NET Core project.
:::

1. Download [NginxSampleWebApp.1.0.0.zip](/docs/attachments/nginxsamplewebapp.1.0.0.zip).
2. [Upload it to the Octopus Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/#pushing-packages-to-the-built-in-repository) (you can do this by going to **{{Library > Packages}}** and clicking the **Upload package** button).

## Publishing and packing the website {#Create&PushASP.NETCoreProject-PublishingandPackingtheWebsite}

```powershell
# Publish the application to a folder
dotnet publish source/NginxSampleWebApp --output published-app --configuration Release

# Package the folder into a ZIP
octo pack --id NginxSampleWebApp --version 1.0.0 --basePath published-app
```

:::div{.hint}
If you are using the built-in repository, you can create a [zip file](/docs/packaging-applications/create-packages/octopus-cli/#create-zip-packages) instead. The generated nupkg or zip file should then be then be [pushed to a repository](/docs/packaging-applications/package-repositories).
:::

## Learn more

- Generate an Octopus guide for [NGINX and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=NGINX).
