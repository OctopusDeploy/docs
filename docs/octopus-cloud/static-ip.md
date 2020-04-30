---
title: Static IP address
position: 20
description: How to find the list of static IP addresses for your Octopus Cloud instance
---

The Octopus Cloud is a multi-tenant service with several static IP addresses shared among customers in the same Azure region.

Each Azure region uses a pool of 10 static IP addresses. The static IP for an Octopus Cloud instance will use one from the pool and may change to another static IP from the pool under certain situations.

With a static IP address, you can lock down the ingress and egress communications between a Tentacle in your infrastructure and your Octopus Cloud instance. The built-in worker for your Octopus Cloud instance does not use an IP address from the pool of static IP addresses.

A list of static IP addresses your instance could be using can be found within the technical section of the instance details page. This page can be found by going to Octopus.com, logging in, clicking your profile in the upper right, then click the company name under Organization. On the next page, find the Octopus Cloud instance you want to get the IP addresses for and click Manage. On this page you will be able to scroll down and get the list of static IP addresses that your instance could possibly use.


