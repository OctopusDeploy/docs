---
title: Elastic and Transient Environments
position: 6
---


:::hint
The features in Elastic and transient environments are available in Octopus 3.4 and newer.
:::


Elastic and transient environments is a group of features to facilitate deploying to machines that are intermittently available for deployment.

### Scenarios

#### Auto-scaling infrastructure


OctoFX has become so popular that additional servers are required to manage peak load. At peak times servers are provisioned and the latest version of OctoFX is deployed to those servers.  When demand wanes the additional servers are terminated.

#### Intermittent connectivity


OctoFX is being deployed to trading desks in offices around the world.  Occasionally, unbeknownst to the deployment team, the machines that host OctoFX are taken down for maintenance. OctoFX must be kept up to date when a machine comes back online.

## Elastic and Transient Environment features


Starting in Octopus 3.4 you can:

- Automatically keep deployment targets up to date with the latest releases
- Automatically reflect infrastructure changes in your environments
- Deploy to environments where deployment target status may change during the deployment


## Guides
