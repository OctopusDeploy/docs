---
title: IIS Websites and Application Pools
description: Octopus has built-in support for configuring IIS Web Sites, Applications and Virtual Directories.
position: 6
---

Configuring IIS is an essential part of deploying any ASP.NET web application. Octopus has built-in support for configuring IIS Web Sites, Applications and Virtual Directories.

To deploy an IIS Web Site, add a *Deploy an IIS Web Site* step. For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/adding-steps.md) section.

![](/docs/images/5671696/5865907.png "width=170")

:::hint
**Pre Octopus 3.4.7**
The *Deploy an IIS Web Site Step* was introduced in Octopus version **3.4.7**. Prior to this IIS Web Sites were deployed by enabling the *IIS web site and application pool* feature on a [Deploy a Package Step](/docs/deploying-applications/deploying-packages/index.md).

![](/docs/images/3048088/3277713.png "width=500")
:::

## Select a Package {#IISWebsitesandApplicationPools-SelectaPackage}

Use the *Package Feed* and *Package ID* fields to select the [package](/docs/packaging-applications/index.md) containing the web site content.

## Deployment Type {#IISWebsitesandApplicationPools-DeploymentType}

There are three options for how the Web Site is deployed:

- [Web Site](/docs/deploying-applications/iis-websites-and-application-pools.md)
- [Virtual Directory](/docs/deploying-applications/iis-websites-and-application-pools.md)
- [Web Application](/docs/deploying-applications/iis-websites-and-application-pools.md)

:::success
Understanding the difference between Sites, Applications and Virtual Directories is important to understand how to use the IIS Websites and Application Pools features in Octopus. Learn more about [Sites, Applications and Virtual Directories in IIS](https://www.iis.net/learn/get-started/planning-your-iis-architecture/understanding-sites-applications-and-virtual-directories-on-iis).
:::

### Deploy IIS Web Site {#IISWebsitesandApplicationPools-DeployIISWebSiteweb-site}

![](/docs/images/3048088/5865719.png "width=500")


| Field                     | Meaning | Examples | Notes |
| ------------------------- | ------- | -------- | ----- |
| **Web Site Name**         | The name of the IIS Web Site to create (or reconfigure, if the site already exists). | `MyWebSite` | | 
| **Physical path**         | The physical path on disk this Web Site will point to | `/Path1/Path2/MySite` <br> `#{MyCustomInstallationDirectory}` | You can specify an absolute path, or a relative path inside the package installation directory. | 
| **Application Pool name** | Name of the Application Pool in IIS to create (or reconfigure, if the application pool already exists) | `MyAppPool` | | 
| **.NET CLR version**      | The version of the .NET Common Language Runtime this Application Pool will use. | <ul> <li> `v2.0` </li> <li> `v4.0` </li> </ul> | Choose v2.0 for applications built against .NET 2.0, 3.0 or 3.5.  <br> Choose v4.0 for .NET 4.0 or 4.5. | 
| **Identity**              | Which account the Application Pool will run under. | <ul> <li>`Application Pool Identity`</li> <li>`Local Service`</li> <li>`Local System`</li> <li> `Network Service` </li> <li> `Custom user (you specify the username/password)` </li> </ul> | | 
| **Bindings**              | Specify any number of HTTP/HTTPS bindings that should be added to the IIS Web Site | | | 
| **Authentication modes**  | Choose which authentication mode(s) IIS should enable | <ul> <li> `Anonymous` </li> <li> `Basic` </li> <li> `Windows` </li> </ul> | You can select more than one authentication mode | 

### Deploy IIS Virtual Directory {#IISWebsitesandApplicationPools-DeployIISVirtualDirectoryvirtual-directory}

:::success
The IIS Virtual Directory step requires a parent Web Site to exist in IIS before it runs. You can create a chain of steps like this:

1. Make sure the parent Web Site exists in IIS and is configured correctly
2. Create any number of Web Applications and Virtual Directories as children of the parent Web Site
   :::

![](/docs/images/3048088/5865718.png "width=500")

| Field                    | Meaning                                  | Examples                                 | Notes                                    |
| ------------------------ | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Parent Web Site name** | The name of the parent IIS Web Site.     | `Default Web Site`, `MyWebSite`          | The parent Web Site must exist in IIS before this step runs. This step will not create the Web Site for you. |
| **Virtual path**         | The relative path from the parent IIS Web Site to the Virtual Directory | If you want a Virtual Directory called `MyDirectory` belonging to the Site `MySite` as part of the Application `MyApplication` you would set the Virtual Path to `/MyApplication/MyDirectory` | All parent applications/directories must exist. Does not need to match the physical path |
| **Physical path**        | The physical path on disk this Virtual Directory will point to | `/Path1/Path2/MyDirectory`, `#{MyCustomInstallationDirectory}` | You can specify an absolute path, or a relative path inside the package installation directory. |

:::success
The Virtual Path and Physical Path do not need to match which is one of the true benefits of IIS. You can create a virtual mapping from a URL to a completely unrelated physical path on disk. See [below](/docs/deploying-applications/iis-websites-and-application-pools.md) for more details.
:::

### Deploy IIS Web Application {#IISWebsitesandApplicationPools-DeployIISWebApplicationweb-application}

:::success
The IIS Web Application step requires a parent Web Site to exist in IIS before it runs. You can create a chain of steps like this:

1. Make sure the parent Web Site exists in IIS and is configured correctly
2. Create any number of Web Applications and Virtual Directories as children of the parent Web Site

:::

![](/docs/images/3048088/5865720.png "width=500")

:::success
The Virtual Path and Physical Path do not need to match which is one of the true benefits of IIS. You can create a virtual mapping from a URL to a completely unrelated physical path on disk. See [below](/docs/deploying-applications/iis-websites-and-application-pools.md) for more details.
:::

| Field                    | Meaning | Examples | Notes |
| ------------------------ | ------- | -------- | ----- |
| **Parent Web Site Name** | The name of the parent IIS Web Site. | `Default Web Site`, `MyWebSite` | The parent Web Site must exist in IIS before this step runs. This step will not create the Web Site for you. |
| **Virtual Path** | The relative path from the parent IIS Web Site to the Web Application
 | If you want a Web Application called `MyApplication` belonging to the Site `MySite` you would set the Virtual Path to `/MyApplication` | All parent applications/directories must exist. Does not need to match the physical path. | 
| **Physical path** | The physical path on disk this Web Application will point to | `/Path1/Path2/MyApplication`, `#{MyCustomInstallationDirectory}` | You can specify an absolute path, or a relative path inside the package installation directory. |
| **Application Pool name** | Name of the Application Pool in IIS to create (or reconfigure, if the Application Pool already exists) |  |  |
| **.NET CLR version** | The version of the .NET Common Language Runtime this Application Pool will use. | `v2.0`, `v4.0` | Choose v2.0 for applications built against .NET 2.0, 3.0 or 3.5. Choose v4.0 for .NET 4.0 or 4.5. |
| **Identity** | Which account the Application Pool will run under. | `Application Pool Identity`, `Local Service`, `Local System`, `Network Service`, `Custom user (you specify the username/password)` |  |

## How Octopus Deploys your Web Site {#IISWebsitesandApplicationPools-HowOctopusDeploysyourWebSite}

Out of the box, Octopus will do the right thing to deploy your Web Site using IIS, and the conventions we have chosen will eliminate a lot of problems with file locks, leaving stale files behind, and causing multiple Application Pool restarts. By default Octopus will follow the conventions described in [Deploying packages](/docs/deploying-applications/deploying-packages/index.md) and apply the different features you select in the order described in [Package deployment feature ordering](/docs/reference/package-deployment-feature-ordering.md).

:::success
Avoid using the [Custom Installation Directory](/docs/deploying-applications/custom-installation-directory.md) feature unless you are absolutely required to put your packaged files into a specific physical location on disk.
:::

As an approximation including the IIS integration:

1. Acquire the package as optimally as possible (local package cache and [delta compression](/docs/deploying-applications/delta-compression-for-package-transfers.md))
2. Create a new folder for the deployment (which avoids many common problems like file locks, leaving stale files behind, and multiple Application Pool restarts)
3. Example: `C:\Octopus\Applications\[Tenant name]\[Environment name]\[Package name]\[Package version]\` where `C:\Octopus\Applications` is the Tentacle application directory you configured when installing Tentacle)
4. Extract the package into the newly created folder
5. Execute each of your [custom scripts](/docs/deploying-applications/custom-scripts/index.md) and the [deployment features](/docs/deploying-applications/index.md) you've configured will be executed to perform the deployment [following this order by convention](/docs/reference/package-deployment-feature-ordering.md).
6. As part of this process the IIS Web Site, Web Application or Virtual Directory will be configured in a single transaction with IIS, including updating the Physical Path to point to this folder
7. [Output variables](/docs/deploying-applications/variables/output-variables.md) and deployment [artifacts](/docs/deploying-applications/artifacts.md) from this step are sent back to the Octopus Server

:::success
You can see exactly how Octopus integrates with IIS in the [open-source Calamari library](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari/Scripts/Octopus.Features.IISWebSite_BeforePostDeploy.ps1).
:::

## IIS configuration in action {#IISWebsitesandApplicationPools-IISconfigurationinaction}

This five minute video (with captions) demonstrates how Octopus can be used to deploy an ASP.NET MVC web application to remote IIS servers.

<iframe src="//fast.wistia.net/embed/iframe/7wfdk4vtge" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="360" style="margin: 30px"></iframe>

## How to take your website offline during deployment

A IIS Website can be taken offline by placing a `app_offline.htm` file into the root directory of the website. The contents of
that file will be shown to anyone accessing the site. This is useful if you do not want to users to access the site while
the deployment is being performed. It recycles the App Pool, releasing any file locks the site may have.

This can be done by including an `app_online.htm` file in your website and then renaming it to `app_offline.htm` at the 
start of the deployment. This can be done via a script or the `IIS - Change App Offline` step in the 
[community library](/docs/deploying-applications/step-templates/community-step-templates).