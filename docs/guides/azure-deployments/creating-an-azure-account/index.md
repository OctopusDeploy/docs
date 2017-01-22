---
title: Creating an Azure Account

---


An Azure Account in Octopus Deploy contains the details of your Azure subscription.  It is used to authenticate with Azure when deploying or executing scripts.


To create an Azure Account, navigate to *Environments -> Accounts* and click *Add Account* in the *Azure Subscriptions* section.


![](/docs/images/3702887/3964985.png "width=500")

## Authentication Method


Octopus Deploy authenticates with Azure in one of two methods: using a *Management Certificate* or a *Service Principal*.


The divide in authentication-methods in Octopus reflects the divide within Azure itself: There are two distinct interfaces for interacting with Azure, Service Management (ASM) and Resource Manager (ARM).  [This document](https://azure.microsoft.com/en-us/documentation/articles/resource-manager-deployment-model/) explains the differences.

- If you wish to use Resource Manager mode, then you will need to [create a Service Principal account](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md).
- If you wish to Service Management mode, then you will need to create a [Management Certificate account](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-management-certificate-account.md).



![](/docs/images/3702887/3964986.png "width=500")
