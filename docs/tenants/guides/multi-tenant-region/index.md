---
title: Multi-Tenant regions
description: Guides showing you how to use tenants to deploy an application to regions using different release rings.
position: 10
hideInThisSectionHeader: true
---

This guide introduces the concept of using geographic locations as tenants for an application as well as different upgrade rings.  In this guide, we are a fictitious Car Rental company that has three locations; Los Angeles Internaltional Airport (LAX), De Moines Iowa, and Norfolk Virginia.  In this scenario, the De Moines location is used as a pilot facility, with Norfolk testing beta features.  LAX is their busiest location so it uses only stable releases.

The Car Rental company utlizes Azure to host the application for its stores.  To minimize latency, the application is deployed to the closest Azure datacenter known as regions; LAX uses West US, De Moines uses Central US, and the Norfolk location uses East US.  