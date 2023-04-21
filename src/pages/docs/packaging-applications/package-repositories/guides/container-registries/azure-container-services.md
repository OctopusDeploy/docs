---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Azure Container Registry
description: How to add an Azure Container Registry as an Octopus Deploy feed
navOrder: 40
---

Microsoft Azure provides a docker image registry known as [Azure Container Registry](https://azure.microsoft.com/en-au/services/container-registry/).

## Configuring an Azure Container Registry  

Select **Azure Container Registry** from the Azure marketplace and select **create** to create a new registry.

Provide the unique registry name that all your repositories (packages) will be stored in.

Make sure you select **Enable** under the **Admin user** option. This is what will expose the credentials that are needed by Octopus to connect to the API.

![Azure Container Services Access Key blade](/docs/packaging-applications/package-repositories/guides/container-registries/images/azure-blade.png "width=500")

Azure Container Registries can be configured as an external feed in Octopus by navigation to **Library ➜ External Feeds** and adding an new feed of type `Docker`. 

Once the service has been provisioned, go to the Container Registry details and load the **Access Key** blade. The login server indicates the HTTPS url that needs to be supplied into the Octopus Registry feed. In the case above this will be `https:\\myoctoregistry-on.azurecr.io`.

With the Admin user toggle enabled, you will be provided with username and password credentials, these will needed these when you create the Octopus Deploy feed. The password can be regenerated at any time so long as you keep your Octopus instance updated with the new credentials.

## Adding an Azure Container Registry as an Octopus External Feed
Create a new Octopus Feed (**Library ➜ External Feeds**) and select the `Docker Container Registry` Feed type. With this selected you will need to provide the credentials configured above.

![Azure Container Services Registry Feed](/docs/packaging-applications/package-repositories/guides/container-registries/images/azure-feed.png "width=500")

Save and test your registry to ensure that the connection is authorized successfully.
