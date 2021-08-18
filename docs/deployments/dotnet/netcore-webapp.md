---
title: ASP.NET Core webapp
description: This guide covers everything you need to perform your first ASP.NET Core webapp deployment.
position: 0
---

ASP.NET Core is fast becoming the de-facto web framework in .NET. Compared to earlier versions of ASP.NET, it contains many changes to how applications are built, and how they are run.

If you are new to ASP.NET Core you can start with the [Tutorial: Get Started ASP.Net Core tutorial](https://docs.microsoft.com/en-us/aspnet/core/getting-started/?view=aspnetcore-5.0).

## Publishing and packing the website {#DeployingASP.NETCoreWebApplications-PublishingandPackingtheWebsite}

When your application is ready, it needs to be published:

```powershell
# Publish the application to a folder
dotnet publish source/MyApp.Web --output published-app --configuration Release
```

When your application has been published you need to package it:

```powershell
# Package the folder into a ZIP
octo pack --id MyApp.Web --version 1.0.0 --basePath published-app
```

For more information about packaging applications see [Creating packages using the Octopus CLI](/docs/packaging-applications/create-packages/octopus-cli.md).

If you are using the [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md#pushing-packages-to-the-built-in-repository) you can create a [zip file](/docs/packaging-applications/create-packages/octopus-cli.md#create-zip-packages). 

When you have your generated nupkg or zip file it needs to be [pushed to a repository](/docs/packaging-applications/package-repositories/index.md).

If you are using TeamCity, you can use the [new TeamCity plugin for dotnet commands](https://github.com/JetBrains/teamcity-dnx-plugin).

:::warning
**OctoPack and .NET Core**
OctoPack is not compatible with .NET Core applications. If you want to package .NET Core applications see [create packages with the Octopus CLI](/docs/packaging-applications/create-packages/octopus-cli.md).
:::

## Deployment {#DeployingASP.NETCoreWebApplications-Deployment}

ASP.NET Core applications can either run as a command line program with Kestrel, or under IIS ([which also uses Kestrel - check out the book for details](https://leanpub.com/aspnetdeployment)).

:::hint
See the [ASP.NET Core IIS documentation](https://docs.asp.net/en/latest/publishing/iis.html#install-the-http-platform-handler) for instructions on setting up IIS for ASP.NET Core.
:::

When running under IIS, ensure the .NET CLR Version is set to `No Managed Code`.

## Antiforgery cookie {#DeployingASP.NETCoreWebApplications-AntiforgeryCookie}

The `.AspNetCore.Antiforgery` cookie created by ASP.NET Core uses the application path to generate its hash. By default Octopus will deploy to a new path every time, which causes a new cookie to be set every deploy. This results in many unneeded cookies in the browser. See this [blog post](http://blog.novanet.no/a-pile-of-anti-forgery-cookies/) for more details. To change this behavior, set the Antiforgery token in your `startup.cs` like this:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddAntiforgery(opts => opts.CookieName = "AntiForgery.MyAppName");
}
```

## Cookie authentication in ASP.NET Core 2 {#DeployingASP.NETCoreWebApplications-AuthCookie}

Similar to antiforgery cookies, cookie authentication in ASP.NET Core 2 uses Microsoft's data protection API (DPAPI) which can use the application path to isolates applications from one another.  This can cause older cookies to simply not work. To change this behavior, you need to set the application name in your `startup.cs` like this:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddDataProtection().SetApplicationName("my application");
}
```

## Configuration {#DeployingASP.NETCoreWebApplications-Configuration}

Refer to [structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature.md) on how to setup configuration.


## Learn more

- Generate an Octopus guide for [ASP.NET Core and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?application=ASP.NET%20Core).
