---
layout: src/layouts/Default.astro
pubDate: 2025-09-22
modDate: 2025-09-22
title: IP address allow list
navOrder: 68
description: How to configure and enjoy the security benefits of IP address allow lists in Octopus Cloud
---

Customers may restrict the IP addresses that can initiate traffic with their Octopus Cloud.

IP address allow listing provides you with an effective tool to enforce internal access policies and add another layer of protection against some forms of cyber attack.
When activated, only traffic from the IPv4 address ranges you configure, or from sources required by Octopus Deploy, will be allowed to connect to your Octopus Cloud instance.

## Configuration

IP address allow list is configured in [Control Center](https://billing.octopus.com/). Users with ```Cloud Subscription Owner``` role can administer the feature from the **Configuration** menu.

:::div{.hint}
Changes to IP address allow list content or activation status can take up to 60 seconds to apply.
:::

### Activation

To enforce traffic restrictions, your allow list must be activated. You can activate your IP address allow list by clicking the **Activate** link. IP address allow listing can only be activated when at least one IP address or range is listed.

### Deactivation

You can deactivate IP address allow listing by clicking the **Deactivate** link. Deactivating the feature will not modify your IP address allow list content.

### Adding an IP address or range

You can add an IPv4 address or range by clicking **Add a new IP address or range**. This will show a modal dialog which accepts a mandatory IP address or range in CIDR format, and an optional description. If the IP address or range provided already appears on your allow list, the description will be updated to this latest value, or removed if no description is provided.

### Updating or deleting IP addresses or ranges

When an IP address or range has been added to the allow list, it can be updated or deleted by clicking the **Edit** or **Delete** links on the relevant row.

### CSV import

You can import a CSV file of IP addresses or ranges, with optional descriptions, by selecting **Import a CSV file**. The CSV file must have a header row with two fields in this order, named: **ip_address** and **description**. If any IP address or range provided in the CSV file already appears on your allow list, the description will be updated to the value specified in the file, or removed if no description is provided.

## Dynamic workers

Dynamic workers leased by your Octopus Cloud are not protected by your IP address allow list.

If you require a dynamic worker to have access to your Octopus Cloud instance when IP address allow list is activated, you need to include the IP address used for egress from the dynamic worker in your allow list.

You can determine the egress IP address of a dynamic worker by running a script on it like ```curl -s https://api.ipify.org```.

Please note:

- Dynamic workers do not have static IP addresses
- You may need to adjust your allow list if a dynamic worker's IP address changes
- Dynamic workers in your Octopus Cloud Azure region can be leased by any customer in that region

## Azure Private Links

Customers with Azure Private Link access to their Octopus Cloud can have IP address allow list enabled with zero public IP addresses allowed by contacting [our support team](mailto:support@octopus.com). The combination of Azure Private Links and IP address allow list allows customers to achieve the highest standard of privacy available for Octopus Cloud.

## Exclusions

When activated, the IP addresses or ranges specified on your allow list retain access to your Octopus Cloud.

In addition, access is retained for the IPs and services that:

- Octopus Cloud requires for successful function
- Octopus Deploy requires to perform our maintenance
- Our Support staff use for access to your instance when needed

These API endpoints retain public access in order to correctly function:

- ```/.well-known```
- ```/api/serverstatus/health```
- ```/api/serverstatus/hosted/external```
- ```/token/v1```

Polling tentacle access is not restricted by an activated IP address allow list.

## Troubleshooting

If you suspect an activated IP address allow list is causing access issues, consider deactivating the feature, waiting 60 seconds, then testing if the access issue is now resolved. If the issue persists beyond 60 seconds, it is likely unrelated to IP address allow list. If the issue is resolved when your allow list is deactivated, consider if additional IP addresses are required on your allow list.

If this approach has not resolved the issue, please contact [our support team](mailto:support@octopus.com) for further assistance.
