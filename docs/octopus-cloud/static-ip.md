---
title: Static IP address
position: 20
description: How to find the list of static IP addresses for your Octopus Cloud instance
---

The Octopus Cloud is a multi-tenant service with several static IP addresses shared among customers in the same Azure region.

Each Azure region uses a pool of 10 static IP addresses, and the static IP for an Octopus Cloud instance will use one from the pool and may change to another static IP from the pool under certain situations.

A list of static IP addresses your instance could be using can be found within the technical section of the instance details page.
