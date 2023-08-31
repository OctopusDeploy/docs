---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Creating and deploying a release
description: Create and deploy a release as part of a multi-tenant SaaS setup in Octopus Deploy.
navOrder: 80
hideInThisSectionHeader: true
---

In this section, we will create a release, and then deploy to development, test, staging and production.

Creating a release for a tenanted application is the same process as any other application. In your project, Click on the **CREATE RELEASE** button and click **SAVE**

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/creating-a-release.png)
:::

As part of our project lifecycle, we need to deploy our release to development first, followed by test using the `Internal` tenant.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/deploying-release-development.png)
:::

Once the deployment to development and test have completed, we now have the option of deploying to our staging environment for customers that have staging configured and available.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/deploying-release-staging.png)
:::

Once we have deployed to staging, we can deploy to the last environment in our lifecycle, production. 

One of our tenants, `Capital Animal Hospital` has the `Branding` tenant tag [we created earlier in the guide](/docs/tenants/guides/multi-tenant-saas-application/creating-tenant-tag-set) associated with them. As a result, the **Apply Custom Branding** step was applicable to them and we can see from the logs that it ran that step when we deployed to production for `Capital Animal Hospital`.

:::figure
![](/docs/tenants/guides/multi-tenant-saas-application/images/deploying-release-production.png)
:::

<span><a class="button btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process">Previous</a></span>