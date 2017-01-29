---
title: Troubleshooting multi-tenant deployments
position: 3
---

This page will help you diagnose and solve issues with multi-tenant deployments.

- Problem: I cannot select a specific tenant when deploying a project

## Problem: I cannot select a specific tenant when deploying a project {#Troubleshootingmulti-tenantdeployments-Problem:Icannotselectaspecifictenantwhendeployingaproject}

1. Ensure you have security access to this specific tenant by loading the tenant page. To see the tenant on the deployment screen you need to be part of a [team](/docs/administration/managing-users-and-teams/index.md) that has the *Tenant View* permission with a security scope that includes this tenant.
2. Check the tenant is connected to the project and the environment you are targeting for that deployment.
3. Take a look at the [lifecycle](/docs/key-concepts/lifecycles.md) this release is being promoted through (can be different for each release) and make sure you have met the prerequisites for deploying to this environment? Perhaps you need to promote the release through some earlier environments first?
4. If your tenant is connected to multiple environments for this project, the [lifecycle](/docs/key-concepts/lifecycles.md) for this release will force you to promote the release through each of the tenant's environments in the lifecycle in order. Perhaps you need to deploy the release into an earlier environment for the tenant before promoting to this environment?
5. For example: Deploy to the tenant's Test environment before promoting to the tenant's Production environment.
