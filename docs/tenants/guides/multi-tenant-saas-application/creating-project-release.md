---
title: Creating and deploying a release
description: Create and deploy a release as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 80
hideInThisSectionHeader: true
---

In this section, we will create a release, and then deploy to development, test, staging and production.

Creating a release for a tenanted application is the same process as any other application. In your project, Click on the **CREATE RELEASE** button and click **SAVE**

![](images/creating-a-release.png "width=500")

As part of our project lifecycle, we need to deploy our release to development first, followed by test using the `Internal` tenant.

![](images/deploying-release-development.png "width=500")

Once the deployment to development and test have completed, we now have the option of deploying to our staging environment for customers that have staging configured and available.

![](images/deploying-release-staging.png "width=500")

Once we have deployed to staging, we can deploy to the last environment in our lifecycle, production. 

One of our tenants, `Capital Animal Hospital` has the `Branding` tenant tag [we created earlier in the guide](/docs/tenants/guides/multi-tenant-saas-application/creating-tenant-tag-set.md) associated with them. As a result, the **Apply Custom Branding** step was applicable to them and we can see from the logs that it ran that step when we deployed to production for `Capital Animal Hospital`.

![](images/deploying-release-production.png "width=500")

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process">Previous</a></span>