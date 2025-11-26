---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-09-04
title: Azure Container Registry
description: How to add an Azure Container Registry as an Octopus Deploy feed
navOrder: 40
---

Microsoft Azure provides a docker image registry known as [Azure Container Registry](https://azure.microsoft.com/en-au/services/container-registry/).

## Configuring an Azure Container Registry  

Select **Azure Container Registry** from the Azure marketplace and select **create** to create a new registry.

Provide the unique registry name that all your repositories (packages) will be stored in.

Make sure you select **Enable** under the **Admin user** option. This is what will expose the credentials that are needed by Octopus to connect to the API.

:::figure
![Azure Container Services Access Key blade](/docs/img/packaging-applications/package-repositories/guides/container-registries/images/azure-blade.png)
:::

Azure Container Registries can be configured as an external feed in Octopus by navigating to **Library ➜ External Feeds** and adding an new feed of type `Azure Container Registry`.

Once the service has been provisioned, go to the Container Registry details and load the **Access Key** blade. The login server indicates the HTTPS url that needs to be supplied into the Octopus Registry feed. In the case above this will be `https:\\myoctoregistry-on.azurecr.io`.

With the Admin user toggle enabled, you will be provided with username and password credentials, these will needed these when you create the Octopus Deploy feed. The password can be regenerated at any time so long as you keep your Octopus instance updated with the new credentials.

## Adding an Azure Container Registry as an Octopus External Feed

Create a new Octopus Feed (**Library ➜ External Feeds**) and select the `Azure Container Registry` Feed type. With this selected you will need to provide the username and password credentials configured above.

:::figure
![Azure Container Services Registry Feed](/docs/img/packaging-applications/package-repositories/guides/container-registries/images/azure-feed.png)
:::

Save and test your registry to ensure that the connection is authorized successfully.

## Adding an Azure Container Registry with OpenID Connect as an Octopus External Feed

Octopus Server `2025.2` adds support for OpenID Connect to ACR feeds. To use OpenID Connect authentication you have to follow the [required minimum configuration](/docs/infrastructure/accounts/openid-connect#configuration). 

Before creating an OpenID Connect Azure Container Registry feed, you will need an Microsoft Entra ID App Registration and a Federated Credential.

If you do not currently have an Microsoft Entra ID App Registration follow the [App Registration](https://oc.to/create-azure-app-registration) guide.

To manually create a Federated Credential follow the [Add a federated credential](https://oc.to/create-azure-federated-credentials) section in the Microsoft Entra ID documentation. The federated credential will need the **Issuer** value set to the configured Octopus Server URI. This URI must be publicly available and the value must not have a trailing slash (/). For example `https://samples.octopus.app`. For more information on configuring external identity providers see [Configure an app to trust an external identity provider](https://oc.to/configure-azure-identity-providers).

Create a new Octopus Feed (**Library ➜ External Feeds**) and select the `Azure Container Registry` Feed type. With this selected you will need choose OpenID Connect as the authentication type.

Add the following properties to the feed credentials:

- **Client ID:** *{{The Azure Active Directory Application ID (Client ID)}}*
- **Tenant ID:** *{{The Azure Active Directory Tenant ID}}*
- **Subject:** *Please read [OpenID Connect Subject Identifier](/docs/infrastructure/accounts/openid-connect#subject-keys) for how to customize the **Subject** value*
- **Audience**  *{{The audience set on the Federated Credential}}* *This can be set to the default of* `api://AzureADTokenExchange` *or a custom value if needed*

:::div{.warning}
At this time, OpenID Connect external feeds are not supported for use with Kubernetes containers. This is because the short-lived credentials they generate are not suitable for long-running workloads.
:::
