---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create and deploy a release
description: Example scripts to create and deploy a release.
---

These scripts create and deploy a release, including examples for choosing a channel and deploying to tenants.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Space Name
- Project Name
- Environment Name
- Channel Name
- (Optional) Tenant Names 

:::warning
**These scripts will create a release and deployments to the provided environments. Take care when running this script or one based on it.**
:::

## Create and deploy a release

!include <create-and-deploy-release-scripts>

## Create and deploy a release to a group of tenants

!include <create-and-deploy-release-with-tenants-scripts>
