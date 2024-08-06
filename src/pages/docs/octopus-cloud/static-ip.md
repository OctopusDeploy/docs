---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-06
title: Static IP address
navOrder: 10
description: How to find the list of static IP addresses for your Octopus Cloud instance
---

The Octopus Cloud is a multi-tenant service with several static IP addresses shared among customers in the same Azure region.

Each Azure region uses a range of static IP addresses. The static IP address for an Octopus Cloud Server will be one from the range and may change to another static IP address within the range under certain situations.

With a static IP address, you can lock down the ingress and egress communications between a Tentacle in your infrastructure and your Octopus Cloud Server. 

:::div{.hint}
**Note:**
The Octopus-hosted [Dynamic Workers](/docs/infrastructure/workers/dynamic-worker-pools) do not fall within the static IP range of your Octopus Cloud Server. If a known/static IP is required for your worker, please consider provisioning your own [external worker](/docs/infrastructure/workers/index.mdx#external-workers-external-workers).
:::

The range of IP Addresses that your Octopus Cloud Server will use is listed in the technical section of the instance details page. 

1. Log in to [Octopus.com](https://octopus.com).
1. Click your profile in the upper right, followed by clicking **Control Center**.
1. Click on Cloud Instances under the Products subheading from the control center menu.
1. Click on the  Octopus Cloud instance you want to get the IP addresses for and click **Configuration**. 
1. Scroll down to the **Static IP addresses** entry, and you will see the static IP addresses your instance can use. 
