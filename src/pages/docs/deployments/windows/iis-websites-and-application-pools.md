---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: IIS Websites and application pools
description: Octopus has built-in support for configuring IIS web sites, applications and virtual directories.
navOrder: 20
---

Configuring IIS is an essential part of deploying any ASP.NET web application. Octopus has built-in support for configuring IIS Web Sites, Applications, and Virtual Directories.

1. From your project's overview page, click **DEFINE YOUR DEPLOYMENT PROCESS**.
1. Click **ADD STEP**, and then select the **Deploy to IIS** step.
1. Give the step a name.
1. Select the package feed and enter the package ID of the package to be deployed.
1. Choose the IIS deployment type:
  - [Web Site](#IISWebsitesandApplicationPools-DeployIISWebSiteweb-site)
  - [Virtual Directory](#iiswebsitesandapplicationpools-DeployIISVirtualDirectoryvirtual-directory)
  - [Web Application](#IISWebsitesandApplicationPools-DeployIISWebApplicationweb-application)

  Understanding the difference between Sites, Applications, and Virtual Directories is important to understand how to use the IIS Websites and Application Pools features in Octopus. Learn more about [Sites, Applications, and Virtual Directories in IIS](https://www.iis.net/learn/get-started/planning-your-iis-architecture/understanding-sites-applications-and-virtual-directories-on-iis).

## Deploy IIS web site {#IISWebsitesandApplicationPools-DeployIISWebSiteweb-site}

You need to fill out the following fields for an IIS Web Site deployment:

| Field                     | Meaning                                  | Examples                                 | Notes                                    |
| ------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Web Site Name**         | The name of the IIS Web Site to create (or reconfigure, if the site already exists). | `MyWebSite`                              |                                          |
| **Physical path**         | The physical path on disk this Web Site will point to. | `/Path1/Path2/MySite` <br> `#{MyCustomInstallationDirectory}` | You can specify an absolute path, or a relative path inside the package installation directory. |
| **Application Pool name** | Name of the Application Pool in IIS to create (or reconfigure, if the application pool already exists). | `MyAppPool`                              |                                          |
| **.NET CLR version**      | The version of the .NET Common Language Runtime this Application Pool will use. | <ul> <li> `v2.0` </li> <li> `v4.0` </li> </ul> | Choose v2.0 for applications built against .NET 2.0, 3.0 or 3.5.  <br> Choose v4.0 for .NET 4.0 or 4.5. |
| **Identity**              | Which account the Application Pool will run under. | <ul> <li>`Application Pool Identity`</li> <li>`Local Service`</li> <li>`Local System`</li> <li> `Network Service` </li> <li> `Custom user (you specify the username/password)` </li> </ul> |                                          |
| **Start mode**            | Specifies whether the IIS Web Site and/or Application Pool are started after a successful release. | <ul> <li>`IIS Application Pool and IIS Web Site`</li> <li>`IIS Application Pool Only`</li> <li>`Do not start either`</li> </ul> |                                          |
| **Bindings**              | Specify any number of HTTP/HTTPS bindings that should be added to the IIS Web Site. |                                          |                                          |
| **Authentication modes**  | Choose which authentication mode(s) IIS should enable. | <ul> <li> `Anonymous` </li> <li> `Basic` </li> <li> `Windows` </li> </ul> | You can select more than one authentication mode. |

## Deploy IIS virtual directory {#iiswebsitesandapplicationpools-DeployIISVirtualDirectoryvirtual-directory}

:::div{.success}
The IIS Virtual Directory step requires a parent Web Site to exist in IIS before it runs. You can create a chain of steps like this:

1. Make sure the parent Web Site exists in IIS and is configured correctly.
2. Create any number of Web Applications and Virtual Directories as children of the parent Web Site.
  :::

You need to fill out the following fields for an IIS Virtual Directory deployment:

| Field                    | Meaning                                  | Examples                                 | Notes                                    |
| ------------------------ | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Parent Web Site name** | The name of the parent IIS Web Site.     | `Default Web Site`, `MyWebSite`          | The parent Web Site must exist in IIS before this step runs. This step will not create the Web Site for you. |
| **Virtual path**         | The relative path from the parent IIS Web Site to the Virtual Directory. | If you want a Virtual Directory called `MyDirectory` belonging to the Site `MySite` as part of the Application `MyApplication` you would set the Virtual Path to `/MyApplication/MyDirectory`. | All parent applications/directories must exist. Does not need to match the physical path. |
| **Physical path**        | The physical path on disk this Virtual Directory will point to. | `/Path1/Path2/MyDirectory`, `#{MyCustomInstallationDirectory}`. | You can specify an absolute path, or a relative path inside the package installation directory. |

:::div{.success}
The Virtual Path and Physical Path do not need to match which is one of the true benefits of IIS. You can create a virtual mapping from a URL to a completely unrelated physical path on disk. See [below](/docs/deployments/windows/iis-websites-and-application-pools) for more details.
:::

:::div{.warning}
We use PowerShell to create virtual and physical directories. There is a known limitation with PowerShell which prevents the creation of virtual directories with a leading dot directly under the parent website in IIS. There are two workarounds for this. First, you can manually create a virtual directory on the server using the IIS manager. Alternatively, you can create a physical directory with the same name as your virtual directory's target physical directory where your site or application will be installed. For example, you might create a physical directory in the website installation directory called `.well-known`, and then configure your IIS deployment step to create a virtual directory directly under the parent website directory. This issue has been documented [here](https://github.com/OctopusDeploy/Issues/issues/6586).
:::

## Deploy IIS web application {#IISWebsitesandApplicationPools-DeployIISWebApplicationweb-application}

:::div{.success}
The IIS Web Application step requires a parent Web Site to exist in IIS before it runs. You can create a chain of steps like this:

1. Make sure the parent Web Site exists in IIS and is configured correctly.
2. Create any number of Web Applications and Virtual Directories as children of the parent Web Site.
:::

You need to fill out the following fields for an IIS Web Application deployment:

:::div{.success}
The Virtual Path and Physical Path do not need to match which is one of the true benefits of IIS. You can create a virtual mapping from a URL to a completely unrelated physical path on disk. See [below](/docs/deployments/windows/iis-websites-and-application-pools) for more details.
:::

| Field                     | Meaning                                  | Examples                                 | Notes                                    |
| ------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Parent Web Site Name**  | The name of the parent IIS Web Site.     | `Default Web Site`, `MyWebSite`          | The parent Web Site must exist in IIS before this step runs. This step will not create the Web Site for you. |
| **Virtual Path**          | The relative path from the parent IIS Web Site to the Web Application. | If you want a Web Application called `MyApplication` belonging to the Site `MySite` you would set the Virtual Path to `/MyApplication`. | All parent applications/directories must exist. Does not need to match the physical path. |
| **Physical path**         | The physical path on disk this Web Application will point to. | `/Path1/Path2/MyApplication`, `#{MyCustomInstallationDirectory}`. | You can specify an absolute path, or a relative path inside the package installation directory. |
| **Application Pool name** | Name of the Application Pool in IIS to create (or reconfigure, if the Application Pool already exists). |                                          |                                          |
| **.NET CLR version**      | The version of the .NET Common Language Runtime this Application Pool will use. | `v2.0`, `v4.0`                           | Choose v2.0 for applications built against .NET 2.0, 3.0 or 3.5. Choose v4.0 for .NET 4.0 or 4.5. |
| **Identity**              | Which account the Application Pool will run under. | `Application Pool Identity`, `Local Service`, `Local System`, `Network Service`, `Custom user (you specify the username/password)` |                                          |

## How Octopus Deploys your web site {#IISWebsitesandApplicationPools-HowOctopusDeploysyourWebSite}

Out of the box, Octopus will do the right thing to deploy your Web Site using IIS, and the conventions we have chosen will eliminate a lot of problems with file locks, leaving stale files behind, and causing multiple Application Pool restarts. By default Octopus will follow the conventions described in [Deploying packages](/docs/deployments/packages/) and apply the different features you select in the order described in [Package deployment feature ordering](/docs/deployments/packages/package-deployment-feature-ordering).

:::div{.success}
Avoid using the [Custom Installation Directory](/docs/projects/steps/configuration-features/custom-installation-directory) feature unless you are absolutely required to put your packaged files into a specific physical location on disk.
:::

Octopus performs the following steps:

1. Acquire the package as optimally as possible (local package cache and [delta compression](/docs/deployments/packages/delta-compression-for-package-transfers)).
2. Create a new folder for the deployment (which avoids many common problems like file locks, leaving stale files behind, and multiple Application Pool restarts).
3. Example: `C:\Octopus\Applications\[Tenant name]\[Environment name]\[Package name]\[Package version]\` where `C:\Octopus\Applications` is the Tentacle application directory you configured when installing Tentacle).
4. Extract the package into the newly created folder.
5. Execute each of your [custom scripts](/docs/deployments/custom-scripts/) and the [deployment features](/docs/projects/steps/configuration-features/) you've configured will be executed to perform the deployment [following this order by convention](/docs/deployments/packages/package-deployment-feature-ordering).
6. As part of this process the IIS Web Site, Web Application, or Virtual Directory will be configured in a single transaction with IIS, including updating the Physical Path to point to this folder.
7. [Output variables](/docs/projects/variables/output-variables/) and deployment [artifacts](/docs/projects/deployment-process/artifacts) from this step are sent back to the Octopus Server.

:::div{.success}
You can see exactly how Octopus integrates with IIS in the [open-source Calamari library](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari/Scripts/Octopus.Features.IISWebSite_BeforePostDeploy.ps1).
:::

## How to Take Your Website Offline During Deployment

A IIS Website can be taken offline by placing a `app_offline.htm` file into the root directory of the website. The contents of that file will be shown to anyone accessing the site. This is useful if you do not want to users to access the site while the deployment is being performed. It recycles the App Pool, releasing any file locks the site may have.

This can be done by including an `app_online.htm` file in your website and then renaming it to `app_offline.htm` at the
start of the deployment. This can be done via a script or the `IIS - Change App Offline` step in the
[community library](/docs/projects/community-step-templates).

## Learn more

- Generate an Octopus guide for [IIS and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=IIS).
