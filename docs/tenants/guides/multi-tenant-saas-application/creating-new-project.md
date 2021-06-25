---
title: Creating the project
description: Create the project used as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 20
hideInThisSectionHeader: true
---

The first step in this guide is to create a project that will be deployed to our tenants.

!include <tenants-create-project>

3. Next, you need to make sure the project has [tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments.md) enabled

    ![](images/enable-tenanted-deployments.png "width=500")

The next step will define the [Tenant tag set](/docs/tenants/guides/multi-tenant-saas-application/creating-new-project.md) needed for this scenario.

<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-tenant-tag-set">Next</a></span>