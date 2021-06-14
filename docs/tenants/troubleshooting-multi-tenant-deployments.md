---
title: Troubleshooting multi-tenant deployments
description: Diagnose and solve issues with multi-tenant deployments.
position: 60
---

This page will help you diagnose and solve issues with multi-tenant deployments.

## Problem: I cannot connect a tenant to a project or environment {#cant-connect-tenant-project}

1. Ensure you have permissions to view to the specific project and environment. To view the projects and environments you need to be part of a [team](/docs/security/users-and-teams/index.md) that has the *Project View* and *Environment View* permissions with a security scope including those projects and environments. An easy way to prove you have view permissions is by navigating to each of the projects and environments in the web user interface - if that works, you have the right permissions.
2. Ensure the project uses at least one [lifecycle](/docs/releases/lifecycles/index.md) which includes the environment(s) you want to connect the tenant to. You can connect a tenant to any environment included in any of the project's lifecycles. Each [channel](/docs/releases/channels/index.md) can specify a different lifecycle.

## Problem: I cannot select a specific tenant when deploying a project {#cant-choose-specific-tenant}

1. Ensure you have security access to this specific tenant by loading the tenant page. To see the tenant on the deployment screen you need to be part of a [team](/docs/security/users-and-teams/index.md) that has the *Tenant View* permission with a security scope that includes this tenant.
2. Check the tenant is connected to the project and the environment you are targeting for that deployment.
3. Take a look at the [lifecycle](/docs/releases/lifecycles/index.md) this release is being promoted through (can be different for each release) and make sure you have met the prerequisites for deploying to this environment? Perhaps you need to promote the release through some earlier environments first?
4. If your tenant is connected to multiple environments for this project, the [lifecycle](/docs/releases/lifecycles/index.md) for this release will force you to promote the release through each of the tenant's environments in the lifecycle in order. Perhaps you need to deploy the release into an earlier environment for the tenant before promoting to this environment?  
  - For example: Deploy to the tenant's Test environment before promoting to the tenant's Production environment.

  ## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).
