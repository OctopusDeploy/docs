---
title: Isolated Octopus Deploy Servers
description: Working with isolated Octopus Deploy Servers due to infrastructure or governance requirements.
position: 3
---

Octopus was designed to be a single, central point of truth for application deployments. In an ideal world, you would only need one Octopus Server, and then many Tentacles. Octopus uses a [secure communication channel](/docs/administration/security/octopus-tentacle-communication/index.md) when communicating with remote endpoints, and can work in both [listening and polling mode](/docs/infrastructure/deployment-targets/windows-targets/index.md), giving you multiple options to work around firewall issues.

Of course, the real world and the ideal world don't always overlap, and you might need to have separate Octopus Servers. Common examples are:

- Solution providers with an internal Octopus Server for pre-production deployments while developing a solution, and then Octopus Servers managed by the client for production deployments, on different networks
- When company policies require production and pre-production environments to be on completely isolated networks, like PCI compliant environments. Learn about [PCI Compliance and Octopus Deploy](/docs/administration/security/pci-compliance-and-octopus-deploy.md).

On this page, we discuss two different scenarios, and the features and options that exist for dealing with them.

## Tentacle Can't be Installed (Offline Deployments) {#IsolatedOctopusDeployservers-Tentaclecan&#39;tbeinstalled(offlinedeployments)}

> Chris's Consulting are developing an application for a government client. They're using Octopus internally to manage pre-production deployments (dev, UAT, and so-on). However, the client have advised that they won't allow the consultancy to install the Tentacle agent on their production servers, nor the Octopus Server. They'd prefer the consultancy to provide them with a something they can run from a USB stick.

In **Octopus 3.0**, you can configure an [Offline Package Drop deployment target](/docs/infrastructure/deployment-targets/offline-package-drop.md). This allows you to "deploy" to a location on the filesystem and take that deployment offline to be used elsewhere. The dropped package contains everything you need to deploy to a location offsite.

## Tentacle Can be Installed (Isolated Octopus Servers) {#IsolatedOctopusDeployservers-Tentaclecanbeinstalled(isolatedOctopusservers)}

> A credit card processing gateway have decided to use Octopus to manage deployments. For PCI-compliance reasons, the production environment is required to be on a different network to the pre-production environments, and very little is shared. Since they own the servers, they can install the Octopus Servers and Tentacles on each environment, but they just can't share an Octopus Server between environments.

In this scenario, the customer would install different instances of Octopus in both environments. To keep settings in sync and to automate between environments, they can use a combination of strategies:

- They could use the new [data migration tool](/docs/administration/data-migration.md) to export the internal Octopus Deploy configuration to a folder. The resulting folder tree could be imported into the production Octopus instance. This will result in a duplicate configuration in the production environment.
- The migration tool could be reused periodically to keep both servers in sync. Because the resulting export is simply a collection of JSON files in folders, a source control system like Git could be used for this purpose. Any imports subsequent to the initial import would result in a merge of any changes.
- They can manually keep some additional settings in sync, such as common Nuget feeds.
- Packages can be moved between environments using [NuGet.exe](http://docs.nuget.org/docs/reference/command-line-reference) to push packages to both Octopus Servers. For example, the CI server could publish packages to both the pre-production and production Octopus Server after a build, or they could manually use Nuget to push them when ready to promote.
- Finally, to automate anything else that isn't possible above, the [REST API](/docs/api-and-integration/api/index.md) or [Octopus.Client](/docs/api-and-integration/octopus.client.md) can be used.

:::success
**Friendly multi-instance licensing model**
Your Octopus Deploy license includes the ability to install and configure up to three (3) separate instances of Octopus Server to support scenarios like this one.
:::

## Tentacle Can Be Installed But Communication Must Go Via a Proxy {#IsolatedOctopusDeployservers-Tentaclecanbeinstalledbutcommunicationmustgoviaaproxy}

> An agency manages lots of small applications on behalf of their customers, and wants to use Octopus to manage deployments. Quite often the production environment is managed by the customer and even after being convinced to allow the Tentacle agent to be installed on their servers, they want communication to be controlled by a proxy server.

In this scenario you would install Tentacle onto the customer's servers, but configure all communication to go via the customer's proxy server. Learn about [proxy support](/docs/infrastructure/deployment-targets/windows-targets/proxy-support.md) in Octopus Deploy.
