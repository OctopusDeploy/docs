---
layout: src/layouts/Default.astro
pubDate: 2025-06-20
modDate: 2025-06-20
title: Azure Private Links
navOrder: 65
description: Guides users through the Azure Private Links feature, including how to access and configure it
---

## Inbound Azure Private Links

Inbound Azure Private Links provide private connectivity from your virtual network to your Octopus Cloud instance.
They simplify network architecture and secures the connection between endpoints in Azure by eliminating data exposure to the public Internet.

:::div{.hint}
[Azure Private Link](https://azure.microsoft.com/en-us/products/private-link) is not a service provided by Octopus Deploy. It is a Microsoft service that Octopus Deploy enables for use with your Octopus Cloud instance. 

Customers maintain configuration within their own network in order to use Azure Private Links. Octopus Deploy is not responsible for customer configuration. For issues with configuration, please contact Microsoft Support.
:::

### How to access this feature

Inbound Azure Private Links are available to Octopus Cloud customers on an Enterprise plan.

If you would like to access this feature, please reach out to [our support team](https://octopus.com/support) so we can discuss how best to meet your private networking requirements.

### Configuring an Azure Private Endpoint

Once you have the feature enabled for your account, you can start using your private link by getting your Azure Private Endpoint set up.
To do this, you'll need the following:

1. The alias previously provided by us when configuring the feature for your account.
2. The DNS prefix that your Octopus Cloud instance uses.
3. A virtual network, subnet and resource group for the Azure Private Endpoint to reside in.

With all of the above available, you can create your Private Endpoint by:

1. In the Azure Portal, navigate to your target resource group.
2. Click "Create" and search for "Private Endpoint", clicking the result from Microsoft.
3. Ensure the pre-filled Subscription and resource group are correct.
4. Give the new Private Endpoint a name and either accept or customize the generated Network Interface Name. Click "Next".

:::figure
![An example of how to fill in the basics tab while creating a private endpoint in the Azure Portal](/docs/img/octopus-cloud/images/create-private-endpoint-basics.png)
:::

5. Select "Connect to an Azure resource by resource ID or alias" and paste the provided alias into the displayed field.
6. Enter your Octopus Cloud instance's DNS prefix into the Request message field. Click "Next".

:::figure
![An example of how to fill in the resource tab while creating a private endpoint in the Azure Portal](/docs/img/octopus-cloud/images/create-private-endpoint-resource.png)
:::

7. Select the virtual network and subnet for the Private Endpoint to use. Click "Next".
8. Complete the remainder of the Private Endpoint creation according to your requirements.

Now that you have a Private Endpoint created and a request issued to your Octopus Cloud instance's Private Link Service, you'll need to retrieve the Private Endpoint's resource GUID.
By sharing this value with us, we can ensure that we only approve Private Link requests that you configure.

Retrieving this value can also be done through the Azure Portal by doing the following:

1. Navigate to the newly created Private Endpoint.
2. Click the "JSON View" button on the right of the page.

:::figure
![A screenshot of a Private Endpoint in the Azure Portal showing where the JSON View button is](/docs/img/octopus-cloud/images/private-endpoint-json-view-button.png)
:::

3. In the Resource JSON pane that appears, the value you will want to retrieve is under `properties` and then `resourceGuid`

:::figure
![A screenshot of a Private Endpoint's JSON View in the Azure Portal highlighting the ResourceGuid field](/docs/img/octopus-cloud/images/private-endpoint-json-resource-guid.png)
:::

With these details available, get in touch with [our support team](https://octopus.com/support) and ask that the Private Endpoint be approved.
Once approved, you will be able to begin accessing your Octopus Cloud instance using your new Azure Private Link Endpoint.

### Additional information

Configuring your Octopus Cloud instance to support Azure Private Links brings a higher degree of privacy and security to your networking.  

Activating this feature introduces the following considerations:

#### Static IP address change

Depending on your requirements for Azure Private Links, we may need to change the IP address range your Octopus Cloud instance uses. This has an additional benefit of moving your instance to an exclusive set of IP addresses, rather than sharing an IP range with other customers.

#### Dynamic workers

To avoid any possibility of unintentional access, Azure Private Links are not available on Dynamic Workers we provide to Octopus Cloud.

#### Logged IP addresses

When we configure your instance to allow access via Azure Private Links, client IP addresses displayed in internal logs will be replaced by the local IP addresses used by Azure’s Private Link Service. This ensures the IP address shown in your audit logs accurately identifies the Private Link Service infrastructure making the connection. Other information logged such as username, date, time, and action taken continues to be recorded for audit and verification purposes.

#### Kubernetes cluster upgrades

As part of keeping your Octopus Cloud fully maintained, we upgrade the Kubernetes cluster your instance is hosted within approximately quarterly. To ensure minimal disruption during the Kubernetes cluster upgrade, for a few minutes, we will proxy the Private Link service traffic through a load balancer with an Azure public IP address. During this short period traffic does not leave Azure. 

#### Public access maintained

Adding Azure Private Links makes it possible to privately and securely connect to your Octopus Cloud from your Azure virtual network without traversing the public internet. Access to your instance from the public internet is still permitted to ensure other use cases remain supported. 

## Outbound Azure Private Links

Outbound Azure Private Links will provide private connectivity from your Octopus Cloud instance to your virtual network. This feature is under consideration and isn't yet available. If you are interested in this feature, please reach out to [our support team](https://octopus.com/support).