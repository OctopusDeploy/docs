---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-11-20
title: Azure Cloud Service targets
description: Azure Cloud Service deployment targets allow you to reference existing classic Cloud Services in your Azure subscription, that you can then reference by role during deployments.
navOrder: 100
---

Azure Cloud Service deployment targets allow you to reference existing classic Cloud Services in your Azure subscription, that you can then reference by role during deployments.

:::div{.warning}
Microsoft [announced](https://blogs.msdn.microsoft.com/appserviceteam/2018/03/12/deprecating-service-management-apis-support-for-azure-app-services/) that from June 30th 2018 they are retiring support for Azure Service Management API (which indicates Cloud Services). Microsoft stated that _"Cloud Services is similar to Service Fabric in degree of control versus ease of use, but it's now a legacy service and Service Fabric is recommended for new development"_ ([source](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)).

Support for this feature will be deprecated in Octopus Server from the `2024.1` release.
:::

## Requirements

You can read more about all the PaaS targets [in our blog](https://octopus.com/blog/paas-targets).

- You will need an [Azure Management Certificate account](/docs/infrastructure/accounts/azure/#azure-management-certificate) that references your Azure subscription.

- Once your Azure account is setup, you will then need an existing Azure Cloud Service (classic) setup within your Azure subscription. To learn more about App Services, the Azure team provide [useful documentation on App Services](https://docs.microsoft.com/en-us/azure/cloud-services/) that can help you get started. If you are dynamically creating the cloud services during your deployment, check our section about [creating Cloud Service targets by scripts using service messages](#creating-cloud-service-targets-by-scripts).

## Creating Cloud Service targets

Once you have a Cloud Service setup within your Azure subscription, you are then ready to map that to an Octopus deployment target.

To create an Azure Cloud Service target within Octopus:

- Go to **Infrastructure ➜ Deployment Targets ➜ Add Deployment Target**.
- Select **Azure Cloud Service** from the list of available targets and click _Next_.
- Fill out the necessary fields, being sure to provide a unique role that clearly identifies your Azure Cloud Service target.

:::figure
![](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/create-azure-cloud-service-target.png)
:::

- After clicking _Save_, your deployment target will be added and go through a health check to ensure Octopus can connect to it.
- If all goes well, you should see your newly created target in your **Deployment Targets** list, with a status of _Healthy_.

### Creating Cloud Service targets by scripts

Azure Cloud Service targets can also be created via a PowerShell cmdlet within a Deployment Process, this can be especially handy if you are also creating the Azure Cloud Service via a script.

See [Creating Resources by script](/docs/infrastructure/deployment-targets/dynamic-infrastructure) for more information on creating Azure Cloud Services via a script.

## Deploying to Cloud Service targets

See our [documentation about this topic](/docs/deployments/azure/cloud-services)

## Troubleshooting

If your Azure Cloud Service target is not completing a health check successfully, you may need to check that your Octopus Server can communicate with Azure. It may be worth checking that your Azure Account is able to complete a _Save and Test_ to ensure Octopus can communicate with Azure and the management certificate referenced by the account is valid. If your Octopus Server is behind a proxy or firewall, you will need to consult with your Systems Administrator to ensure it is able to communicate with Azure.
