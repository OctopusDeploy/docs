---
title: Infrastructure tenant tags
description: Add tenant tags to your infrastructure as part of a multi-tenant region setup in Octopus Deploy.
position: 50
hideInThisSectionHeader: true
---

Car Rental consists of a PHP web UI and a MySQL database back end.  To support this, an Azure App Service and MySQL database server is provisioned in each Azure region.  The Azure Region tenant tags can be associated to infrastructure so that Octopus knows where to deploy.

## Adding Tenant Tags to Infrastructure
