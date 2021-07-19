---
title: Static IP address
position: 20
description: How to find the list of static IP addresses for your Octopus Cloud instance
---

The Octopus Cloud is a multi-tenant service with several static IP addresses shared among customers in the same Azure region.

Each Azure region uses a range of static IP addresses. The static IP address for an Octopus Cloud Server will be one from the range and may change to another static IP address within the range under certain situations.

With a static IP address, you can lock down the ingress and egress communications between a Tentacle in your infrastructure and your Octopus Cloud Server. 

:::hint
**Note:**
The built-in worker for your Octopus Cloud Server does not use an IP address from the range of static IP addresses.
:::

The range of IP Addresses that your Octopus Cloud Server will use can be found within the technical section of the instance details page. 

1. Log in to [Octopus.com](https://octopus.com).
1. Click your profile in the upper right.
1. Click the company name under Organization. 
1. On the next page, find the Octopus Cloud instance you want to get the IP addresses for and click **Manage**. 
1. Scroll down to the **Technical** section of the page, and you will see the static IP addresses your instance can use. 
