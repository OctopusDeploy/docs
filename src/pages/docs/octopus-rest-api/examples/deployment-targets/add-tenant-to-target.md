---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Add Tenants to targets
description: An example script to associate a list of tenants to one or more deployment targets.
---

This script demonstrates how to programmatically associate a list of tenants to one or more deployment targets.

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space you want to work in
- Octopus Tenanted Participation Type (`Tenanted` | `Untenanted` | `TenantedOrUntenanted`)
- List of deployment targets to associate with the Tenants
- List of Tenants to associate with the deployment targets

## Script

!include <add-tenants-to-targets-scripts>
