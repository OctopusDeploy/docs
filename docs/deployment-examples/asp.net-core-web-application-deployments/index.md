---
title: ASP.NET Core Web Applications
description: This guide covers everything you need to perform your first ASP.NET Core webapp deployment.
position: 10
---

ASP.NET Core is the future of ASP.NET, and it contains many changes to how applications are built, and how they are run.

If you are new to ASP.NET Core you can start with the [Tutorial: Get Started ASP.Net Core tutorial](https://docs.asp.net/en/latest/getting-started.html).

## Publishing and Packing the Website {#DeployingASP.NETCoreWebApplications-PublishingandPackingtheWebsite}

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

For more information about packaging applications with Octo.exe see [Creating packages using Octo.exe](/docs/packaging-applications/creating-packages/nuget-packages/using-octo.exe.md).

If you are using the [built-in repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository) you can create a [zip file](/docs/packaging-applications/creating-packages/creating-zip-packages.md). 

When you have your generated nupkg or zip file it needs to be [pushed to a repository](/docs/packaging-applications/package-repositories/index.md).

If you are using TeamCity, you can use the [new TeamCity plugin for dotnet commands](https://github.com/JetBrains/teamcity-dnx-plugin).

:::warning
OctoPack is not compatible with ASP.NET Core applications. Please see [the OctoPack documentation](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md#UsingOctoPack-UsingNETCore) for more details.
:::

## Deployment {#DeployingASP.NETCoreWebApplications-Deployment}

ASP.NET Core applications can either run as a command line program with Kestrel, or under IIS ([which also uses Kestrel - check out the book for details](https://leanpub.com/aspnetdeployment)).

:::hint
See the [ASP.NET Core IIS documentation](https://docs.asp.net/en/latest/publishing/iis.html#install-the-http-platform-handler) for instructions on setting up IIS for ASP.NET Core.
:::

When running under IIS, ensure the .NET CLR Version is set to `No Managed Code`.

## Antiforgery Cookie {#DeployingASP.NETCoreWebApplications-AntiforgeryCookie}

The `.AspNetCore.Antiforgery` cookie created by ASP.NET Core uses the application path to generate its hash. By default Octopus will deploy to a new path every time, which causes a new cookie to be set every deploy. This results in many unneeded cookies in the browser. See this [blog post](http://blog.novanet.no/a-pile-of-anti-forgery-cookies/) for more details. To change this behavior, set the Antiforgery token in your `startup.cs` like this:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddAntiforgery(opts => opts.CookieName = "AntiForgery.MyAppName");
}
```

## Cookie Authentication in ASP.NET Core 2 {#DeployingASP.NETCoreWebApplications-AuthCookie}

Similar to antiforgery cookies, cookie authentication in ASP.NET Core 2 uses Microsoft's data protection API (DPAPI) which can use the application path to isolates applications from one another.  This can cause older cookies to simply not work. To change this behavior, you need to set the application name in your `startup.cs` like this:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddDataProtection().SetApplicationName("my application");
}
```

## Configuration {#DeployingASP.NETCoreWebApplications-Configuration}

!include <json-configuration-variables>
