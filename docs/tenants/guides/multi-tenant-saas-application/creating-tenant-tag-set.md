---
title: Creating new tenant tags
description: Create tenant tags as part of a multi-tenant SaaS setup in Octopus Deploy.
position: 30
hideInThisSectionHeader: true
---

We need two tenant tag sets, one for selecting the Azure cloud region where the application will be hosted and one for application custimiztions. One offering from Vet Clinic is the ability to allow customers to apply custom branding to there instance and we can use tenant tags to ensure our deployment process stays the same even if customers choose to have custom branding.

To create Tenant Tags Sets navigate to **{{Library, Tenant Tag Sets, Add ADD TAG SET}}**.

![](/images/enable-tenanted-deployments.png "width=500")

First, we need to create a tag set for our Azure regions and the following tags;

* West US 
* West US 2
* Central US 
* East US
* East US 2

![](/images/creating-new-tenant-tag.png "width=500")


For further reading on tenant tages in Octopus Deploy please see:

- [Tenant Tags](/docs/tenants/tenant-tags.md)


<span><a class="btn btn-secondary" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-project">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants">Next</a></span>