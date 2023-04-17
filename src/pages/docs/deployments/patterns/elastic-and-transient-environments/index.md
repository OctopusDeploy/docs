---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Elastic and transient environments
description: Elastic and transient environments are a group of features that facilitate deploying to machines that are intermittently available for deployment.
navOrder: 40
hideInThisSectionHeader: true
---

Elastic and transient environments is a group of features to facilitate deploying to machines that are intermittently available for deployment.

## Scenarios {#ElasticandTransientEnvironments-Scenarios}

### Auto-scaling infrastructure {#ElasticandTransientEnvironments-Auto-scalinginfrastructure}

OctoFX has become so popular that additional servers are required to manage peak load. At peak times servers are provisioned and the latest version of OctoFX is deployed to those servers.  When demand wanes the additional servers are terminated.

### Intermittent connectivity {#ElasticandTransientEnvironments-Intermittentconnectivity}

OctoFX is being deployed to trading desks in offices around the world.  Occasionally, unknown to the deployment team, the machines that host OctoFX are taken down for maintenance. OctoFX must be kept up to date when a machine comes back online.

## Elastic and transient environment features {#ElasticandTransientEnvironments-ElasticandTransientEnvironmentfeatures}

- Automatically keep deployment targets up to date with the latest releases.
- Automatically reflect infrastructure changes in your environments.
- Deploy to environments where deployment target status may change during the deployment.

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).
