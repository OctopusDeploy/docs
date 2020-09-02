---
title: Create an Azure service principal
description: Example scripts to create an Azure service principal in Octopus.
position: 20
---

## Description

These scripts provide an example of how to programatically create an Azure Service Principal account](/docs/infrastructure/deployment-targets/azure/index.md#azure-service-principal).

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Azure Client Id
- Azure Secret/Password
- Azure Subscription Number
- Azure Tenant Id
- Octopus Account Name
- (Optional) Octopus Account Description
- Octopus Account Participation Type (Tenanted|Untenanted|TenantedOrUntenanted)
- (Optional) Array of Tenant Tags
- (Optional) Array of Tenant Ids
- (Optional) Array of Environment Ids

## Create Azure account

!include <create-azure-service-principal-scripts>
