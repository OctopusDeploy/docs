---
title: Create an Azure service principal
description: An example script to create an Azure service principal in Octopus.
---

This script provides an example of how to programmatically create an [Azure Service Principal account](/docs/infrastructure/accounts/azure/index.md#azure-service-principal).

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Azure Client ID
- Azure Secret/Password
- Azure Subscription Number
- Azure Tenant ID
- Octopus Account Name
- (Optional) Octopus Account Description
- Octopus Account Participation Type (Tenanted|Untenanted|TenantedOrUntenanted)
- (Optional) Array of Tenant Tags
- (Optional) Array of Tenant IDs
- (Optional) Array of Environment IDs

## Script

!include <create-azure-service-principal-scripts>
