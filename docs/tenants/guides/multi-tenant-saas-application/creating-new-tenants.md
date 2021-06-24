---
title: Creating new tenants
description: Create tenants as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 40
hideInThisSectionHeader: true
---

The first step in this guide is to create the tenants needed for this scenario:

- Internal 
- Capital Animal Hospital
- Companion Care Vets
- Midland Veterinary


Each customer is modelled as a tenant and will have two environments, staging and production. We also create a tenant called Internal for internal developing and testing before new releases get pushed to staging.

To create your tenants follow these steps:

!include <tenants-create-tenant>

Once the tenant is create you need to assosiate the tenant with a project and environment. You can choose to assoisate the project with many projects and environments, for the first tenant, Internal we only need to be able to deploy Vet Clinic to development and test environments but the customer tenants need staging an production but not development and test.

![](/images/enable-tenanted-deployments.png "width=500")

Repeat this process for each of the tenants, and then move on to the next section in the guide.

We set the Azure Region tag to this tenant, this is where the tenant will be hosted in Azure.

![](/images/manage-tenant-tag-set.png "width=500")


<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-tenant-tag-set">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-azure-infrastrucure">Next</a></span>