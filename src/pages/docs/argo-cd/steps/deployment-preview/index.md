---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Argo CD Deployment Preview
description: Query affected applications before triggering the change
---
Argo CD Instances don't fall under the category of 'Deployment Target', and so 'Target Tags' can't be used by the associated
steps to specify which Argo application is to be updated by a given deployment.

Instead - Octopus-specific annotations are added to each Argo CD Application which is to be updated by a given Octopus
Project/Environment/Tenant deployment (where Tenant is optional).

As this data isn't readily visible during the step - we've added a drawer so you can see what applications will be updated
given current Argo CD Application annotations.

This data is also visible via the Octopus Infrastructure pages - but having it on hand can make the process simpler.
