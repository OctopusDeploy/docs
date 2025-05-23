---
title: Azure Inbound Private Links
layout: src/layouts/Default.astro
navOrder: 65
description: This page guides users through the Azure Inbound Private Links feature, including how to access and configure it
pubDate: 2025-05-26
---


# Azure Inbound Private Links
:::div{.info}
Azure Inbound Private Links are currently in early access.
We are actively recruiting users to test out the feature to ensure we meet your expectations of this functionality.
:::

Azure Inbound Private Links provide private connectivity from your virtual network to your Octopus Cloud Instance.
It simplifies network architecture and secures the connection between endpoints in Azure by eliminating data exposure to the public Internet.


## How to access this feature

For now, this feature is only for customers on an Enterprise plan.
If you would like to access this feature before it is made available to all Enterprise customers, reach out to [our support team](mailto:support@octopus.com) so we can enable it for your account.


## Configuring an Azure Private Endpoint

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
5. Select "Connect to an Azure resource by resource ID or alias" and paste the provided alias into the displayed field.
6. Enter your Octopus Cloud instance's DNS prefix into the Request message field. Click "Next".
7. Select the virtual network and subnet for the Private Endpoint to use. Click "Next".
8. Complete the remainder of the Private Endpoint creation according to your requirements.

Now that you have a Private Endpoint created and a request issued to your Octopus Cloud instance's Private Link Service, you'll need to retrieve the Private Endpoint's resource GUID.
By sharing this value with us, we can ensure that we only approve Private Link requests that you configure.
Retrieving this value can also be done through the Azure Portal by doing the following:
1. Navigate to the newly created Private Endpoint.
2. Click the "JSON View" link on the right of the page.
3. In the Resource JSON pane that appears, the value you will want to retrieve is under `properties` and then `resourceGuid`

With these details available, get in touch with [our support team](mailto:support@octopus.com) and ask that the Private Endpoint be approved.
Once approved, you will be able to begin using your new Azure Inbound Private Link.