---
title: Azure App Service Environments
description: This guide covers deploying to Azure App Service Environments.
position: 7
---

This guide covers deploying apps to Azure [App Service Environments](https://docs.microsoft.com/en-au/azure/app-service/environment/intro). It does not cover how to deploy/setup an ASE itself.

From an Octopus user perspective, deploying to an ASE is usually no different to deploying to any other app service in Azure. While the app services within an ASE are isolated, the management interface for managing them and deploying to them is usually the same as for any other app service.

## Internal App Service Environments

Internal ASEs are where the wheels usually come off for deploying from Octopus. An [internal ASE](https://docs.microsoft.com/en-us/azure/app-service/environment/create-ilb-ase) is one that has an Internal Load Balancer (ILB). By definition it cannot be accessed from the Internet because it's designed to host internal apps (i.e. intranet apps).

Given that you can't access the app, or its management endpoint (Kudu), from the Internet you can't deploy to it from Octopus without some network setup. To help explain what's required let's look at what happens when you deploy to a web app in Azure from Octopus.

1. Octopus Server creates a deployment task.
2. Task scheduler picks up the task and hands the work over to Calamari.
3. Calamari picks up all the information about the deployment and connects to Azure.
4. Calamari locates the resource group that's being deployed to (there's a reason we do it this way, see [below](#resource_groups)).
5. Calamari locates the web app within the resource group and requests its publish profile from Azure.
6. Calamari then hands over to the [DeploymentManager](https://msdn.microsoft.com/en-us/library/microsoft.web.deployment.deploymentmanager(v=vs.90).aspx).[SyncTo](https://msdn.microsoft.com/en-us/library/dd543271(v=vs.90).aspx) method to actually do the deployment.

Contained in the publish profile is the URI of the deployment endpoint (Kudu) for the web app. This is the critical piece here.

For an external ASE that URI will be publicly accessible (e.g. https://yourapp.scm.aseName.p.azurewebsites.net).

For an internal ASE the URI will not be publicly accessible, it will be something like https://yourapp.scm.yourdomain  This is where the deployments will fail, they will be able to see all of the other Urls required but when they get to step 6 Octopus won't be able to resolve the address for the URI.

To fix that you need 2 things to happen. First, the network the Octopus Server is on has to be connected to the ASE's VNet, e.g. using ExpressRoute or a VPN. Second, the Octopus Server needs to be able to resolve `yourapp.scm.yourdomain` to the Internal Load Balancer IP address of your Azure ILB (found in the **IP addresses** for the ASE in the Azure portal), e.g. through DNS configuration.

Exactly how to do those 2 things will depend on your organization, what infrastructure you might already have in place and is beyond the scope of this guide.

## Resource Groups

We mentioned above that Calamari locates the resource group first and then locates the web app. If you're familiar with the Azure API then you may know that you can also list the web apps for a subscription directly. So why don't we just do that and save a step? It's because of a side effect of the isolation provided by an ASE.

Usually when you create a web app in Azure its name must be unique. This isn't the case when the web app is in an ASE, it only has to be unique within the ASE. If you call for the list of web apps then you get back 2 or more with the same name that you can't distinguish between. By having the resource group we can call a different API that lets us list just the web apps in that resource groups, which we know must be uniquely named.

This is the reason why you see a resource group and a web app name when using binding on the Octopus Web App step, we need the resource group to differentiate web apps with the same name. When you aren't using binding the drop down list is doing this too behind the scenes.

This is also why using a [principal of least privilege on a Service Principal](/docs/infrastructure/azure/creating-an-azure-account/creating-an-azure-service-principal-account.md#note_on_lease_privilege) is a little complicated.
