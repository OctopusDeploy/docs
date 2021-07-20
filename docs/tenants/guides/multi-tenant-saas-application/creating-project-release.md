---
title: Creating project deployment process
description: Create the project deployment process used as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 80
hideInThisSectionHeader: true
---

In this section, we will create a release, deploy to development, test, staging and production.

Creating a release for a tenanted application is the same process as any other application.  Click on the **CREATE RELEASE** button and **SAVE**

![](images/creating-a-release.png "width=500")


We first need to deploy our release to our development and test enviroments using the Internal tenant.

![](images/deploying-release-development.png "width=500")

Next, we now have the option of deploying to our staging environment for customers that have staging available.

![](images/deploying-release-staging.png "width=500")

next, we can deploy to production and Captial Anmial Hospital had the custom branding step enabled and we can see from the logs that is ran that step when we deployed to that tenant.


![](images/deploying-release-production.png "width=500")


<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process">Previous</a></span>