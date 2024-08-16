---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-13
title: Blue-green deployments in IIS
description: Implementing blue-green deployments in IIS with Octopus.
navOrder: 20
---

With some custom scripting you can achieve reduced downtime deployments in IIS on a single server, without the need for an external load-balancer. This might help if you only deploy a single instance of your application, or you cannot control the load-balancer itself but you can control IIS and your deployments.

In this case the blue/green are not separate environments, they are different web site and application pool instances, but the basic premise is exactly the same. The general idea is:

1. Deploy a new instance of your web application and warm it up.
2. Use an on-server reverse-proxy to seamlessly switch new incoming requests to the new instance.
3. Delete the old instance once it has finished processing outstanding requests.

:::div{.hint}
**A reverse-proxy or some kind of router is required**
Changing the configuration of a web site in IIS (like physical path or bindings) **always** results in the application pool being recycled. The default [IIS websites and application pools](/docs/deployments/windows/iis-websites-and-application-pools) step in Octopus will try to reuse an existing web site in IIS (or create one for you), and as the last step it will [update the physical path in IIS](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari/Scripts/Octopus.Features.IISWebSite_BeforePostDeploy.ps1). This causes a minimum of downtime, especially if you have [allowed overlapping rotation on your application pool](https://msdn.microsoft.com/en-us/library/microsoft.web.administration.applicationpoolrecycling.disallowoverlappingrotation(v=vs.90).aspx). However, to achieve truly zero-downtime deployments of IIS Web Applications, you must use a reverse-proxy or some kind of routing technology.
:::

## General steps for zero-downtime deployments in IIS

:::div{.hint}
Every scenario is slightly different which is why this page is written more as a general guide than a step-by-step walk-through. This rough example should provide a strong starting point to reduce downtime for your deployments to IIS.
:::

The general steps for this kind of deployment would be:

1. Use a [custom script](/docs/deployments/custom-scripts) step to calculate a new port number so we can configure a binding you can use to warm up the new instance of your application. See this [blog post](https://octopus.com/blog/changing-website-port-on-each-deployment) for more details.
  * The new port number should end up in a variable like `#{Octopus.Action[Calculate port number].Output.Port}`.
2. Use the [IIS Websites and Application Pools](/docs/deployments/windows/iis-websites-and-application-pools) step to deploy a new instance of your web application into a new Web Site and Application Pool.
  * Use an expression like `MyApp-#{Octopus.Release.CurrentForEnvironment.Number}` for the Web Site Name and Application Pool Name.
  * Configure a binding to `http://localhost:#{Octopus.Action[Calculate port number].Output.Port}`.
3. Make sure your new instance is warmed up and completely ready to process requests.
  * This may involve making some requests to the localhost binding you configured earlier.
4. Start routing new requests to the new instance.
  * You might decide to perform on-the-fly reconfiguration of your on-server reverse-proxy (ARR, IIS Web Farm, NGINX, etc).
  * Alternatively you might configure the on-server reverse-proxy to use health checks to determine which instances are able handle requests.
5. Use a custom script step to delete the old Web Site and Application Pool.
  * The name for the previous instance can be calculated by an expression like this: `MyApp-#{Octopus.Release.PreviousForEnvironment.Number}`.
  * You may want to wait for outstanding web requests to finish processing using something like this: `Get-Item IIS:\AppPools\MyApp-#{Octopus.Release.PreviousForEnvironment.Number} | Get-WebRequest`.

### Using application request routing (ARR)

You can achieve this kind of result by using [ARR](https://www.iis.net/downloads/microsoft/application-request-routing) as a reverse proxy to your Web Site. You will need to configure a [Web Farm](https://www.iis.net/learn/web-hosting/scenario-build-a-web-farm-with-iis-servers/overview-build-a-web-farm-with-iis-servers) in IIS and use ARR to route requests to the Web Farm. You can then choose how you want to switch between active instances of your application. [Kevin Reed](https://kevinareed.com/) has written a nice blog post on how he achieves [Blue/Green deployments using ARR](https://kevinareed.com/2015/11/07/how-to-deploy-anything-in-iis-with-zero-downtime-on-a-single-server/).

### Using NGINX

You can achieve this kind of result using an NGINX server as a reverse proxy to your Web Site. The latest versions of NGINX provide easier support for [on-the-fly reconfiguration](https://www.nginx.com/products/on-the-fly-reconfiguration/).

## Learn more

- [View Blue/Green deployment examples on our samples instance](https://oc.to/PatternBlueGreenSamplesSpace).
- [Blue/Green deployment knowledge base articles](https://oc.to/BlueGreenTaggedKBArticles).
- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).